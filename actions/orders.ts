"use server";

import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { sendOrderStatusEmail } from "@/lib/email";

export async function updateOrderStatus(orderId: string, status: string) {
  const [order] = await db
    .select()
    .from(orders)
    .where(eq(orders.id, orderId))
    .limit(1);

  if (!order) {
    throw new Error("Order not found");
  }

  await db
    .update(orders)
    .set({
      orderStatus: status as
        | "pending"
        | "processing"
        | "shipped"
        | "delivered"
        | "cancelled",
      updatedAt: new Date(),
    })
    .where(eq(orders.id, orderId));

  // Send email notification to customer
  await sendOrderStatusEmail({
    to: order.customerEmail,
    customerName: order.customerName,
    orderNumber: order.orderNumber,
    status,
  });

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);

  return { success: true };
}
