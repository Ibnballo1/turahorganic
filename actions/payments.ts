"use server";

import { randomUUID } from "crypto";
import { db } from "@/lib/db";
import { orders, orderItems } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { sendOrderConfirmationEmail } from "@/lib/email";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!;
const PAYSTACK_CALLBACK_URL = process.env.PAYSTACK_CALLBACK_URL!;

interface PaymentData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;

  shippingAddress: string;
  shippingCity: string;
  shippingState: string;

  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];

  subtotal: number;
  shipping: number; // input name is fine
  total: number;
}

export async function initiatePayment(data: PaymentData) {
  try {
    // Create order in database with pending status
    type OrderInsert = typeof orders.$inferInsert;

    const orderValues: OrderInsert = {
      orderNumber: randomUUID(),

      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,

      shippingAddress: data.shippingAddress,
      shippingCity: data.shippingCity,
      shippingState: data.shippingState,

      subtotal: data.subtotal.toString(),
      shippingCost: data.shipping.toString(),
      total: data.total.toString(),

      orderStatus: "pending",
      paymentStatus: "pending",
    };

    const [order] = await db.insert(orders).values(orderValues).returning();

    // Create order items
    await db.insert(orderItems).values(
      data.items.map((item) => ({
        orderId: order.id,
        productId: item.productId,
        productName: item.name,
        unitPrice: String(item.price),
        totalPrice: String(item.price * item.quantity),
        quantity: item.quantity,
      }))
    );

    // Initialize Paystack transaction
    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.customerEmail,
          amount: data.total * 100, // Paystack expects amount in kobo
          reference: order.id,
          callback_url: `${PAYSTACK_CALLBACK_URL}verify`,
          metadata: {
            orderId: order.id,
            customerName: data.customerName,
            customerPhone: data.customerPhone,
          },
        }),
      }
    );

    const result = await response.json();

    if (!result.status) {
      // Delete the order if payment initialization fails
      await db.delete(orders).where(eq(orders.id, order.id));
      return { error: result.message || "Failed to initialize payment" };
    }

    // Update order with payment reference
    await db
      .update(orders)
      .set({ paystackReference: result.data.reference })
      .where(eq(orders.id, order.id));

    return {
      authorizationUrl: result.data.authorization_url,
      reference: result.data.reference,
    };
  } catch (error) {
    console.error("Payment initialization error:", error);
    return { error: "Failed to process payment. Please try again." };
  }
}

export async function verifyPayment(reference: string) {
  try {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const result = await response.json();

    if (!result.status) {
      return { success: false, error: result.message };
    }

    const { status: transactionStatus, metadata } = result.data;

    if (transactionStatus === "success") {
      // Update order payment status
      await db
        .update(orders)
        .set({
          paymentStatus: "paid",
          orderStatus: "processing",
          updatedAt: new Date(),
        })
        .where(eq(orders.id, metadata.orderId));

      // Get order details for email
      const [order] = await db
        .select()
        .from(orders)
        .where(eq(orders.id, metadata.orderId))
        .limit(1);
      const items = await db
        .select()
        .from(orderItems)
        .where(eq(orderItems.orderId, metadata.orderId));

      // Send confirmation email
      if (order) {
        await sendOrderConfirmationEmail({
          to: order.customerEmail,
          customerName: order.customerName,
          orderId: order.id,
          orderNumber: order.orderNumber,
          subtotal:
            typeof order.subtotal === "string"
              ? parseFloat(order.subtotal)
              : order.subtotal,
          shipping:
            typeof order.shippingCost === "string"
              ? parseFloat(order.shippingCost)
              : order.shippingCost,
          items: items.map((item) => ({
            name: item.productName,
            price: parseFloat(item.unitPrice),
            quantity: item.quantity,
          })),
          total:
            typeof order.total === "string"
              ? parseFloat(order.total)
              : order.total,
        });
      }

      return { success: true, orderId: metadata.orderId };
    }

    return { success: false, error: "Payment was not successful" };
  } catch (error) {
    console.error("Payment verification error:", error);
    return { success: false, error: "Failed to verify payment" };
  }
}
