import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "Turah Organics <noreply@turahorganics.com>";

interface OrderConfirmationEmailProps {
  orderId: string;
  to: string;
  customerName: string;
  orderNumber: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  shipping: number;
  total: number;
}

export async function sendOrderConfirmationEmail({
  orderId,
  to,
  customerName,
  orderNumber,
  items,
  subtotal,
  shipping,
  total,
}: OrderConfirmationEmailProps) {
  const itemsHtml = items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e5e5;">${
          item.name
        }</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e5e5; text-align: center;">${
          item.quantity
        }</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e5e5; text-align: right;">₦${item.price.toLocaleString()}</td>
      </tr>
    `
    )
    .join("");

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `Order Confirmed - ${orderNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #faf7f2;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
              <!-- Header -->
              <div style="background-color: #2d5a3d; padding: 30px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Turah Organics</h1>
                <p style="color: #d4a574; margin: 10px 0 0 0; font-size: 14px;">Natural Beauty, Rooted in Tradition</p>
              </div>
              
              <!-- Content -->
              <div style="padding: 40px 30px;">
                <h2 style="color: #2d5a3d; margin: 0 0 20px 0; font-size: 24px;">Thank You for Your Order!</h2>
                
                <p style="color: #4a4a4a; line-height: 1.6; margin: 0 0 20px 0;">
                  Dear ${customerName},
                </p>
                
                <p style="color: #4a4a4a; line-height: 1.6; margin: 0 0 30px 0;">
                  We've received your order and are preparing it for shipment. Here's a summary of your purchase:
                </p>
                
                <div style="background-color: #faf7f2; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                  <p style="color: #2d5a3d; font-weight: 600; margin: 0 0 5px 0;">Order Number</p>
                  <p style="color: #4a4a4a; margin: 0; font-family: monospace; font-size: 16px;">${orderNumber}</p>
                </div>
                
                <!-- Order Items -->
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                  <thead>
                    <tr style="background-color: #f5f5f5;">
                      <th style="padding: 12px; text-align: left; color: #2d5a3d; font-weight: 600;">Item</th>
                      <th style="padding: 12px; text-align: center; color: #2d5a3d; font-weight: 600;">Qty</th>
                      <th style="padding: 12px; text-align: right; color: #2d5a3d; font-weight: 600;">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsHtml}
                  </tbody>
                </table>
                
                <!-- Totals -->
                <div style="border-top: 2px solid #2d5a3d; padding-top: 20px;">
                  <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span style="color: #666;">Subtotal:</span>
                    <span style="color: #4a4a4a;">₦${subtotal.toLocaleString()}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span style="color: #666;">Shipping:</span>
                    <span style="color: #4a4a4a;">${
                      shipping === 0 ? "Free" : `₦${shipping.toLocaleString()}`
                    }</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: 600; margin-top: 15px; padding-top: 15px; border-top: 1px solid #e5e5e5;">
                    <span style="color: #2d5a3d;">Total:</span>
                    <span style="color: #2d5a3d;">₦${total.toLocaleString()}</span>
                  </div>
                </div>
                
                <p style="color: #4a4a4a; line-height: 1.6; margin: 30px 0 0 0;">
                  We'll send you another email when your order ships. If you have any questions, feel free to reach out to us.
                </p>
              </div>
              
              <!-- Footer -->
              <div style="background-color: #faf7f2; padding: 20px 30px; text-align: center;">
                <p style="color: #666; font-size: 14px; margin: 0;">
                  © ${new Date().getFullYear()} Turah Organics Beauty Ventures. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Error sending order confirmation email:", error);
    return { success: false, error };
  }
}

interface OrderStatusEmailProps {
  to: string;
  customerName: string;
  orderNumber: string;
  status: string;
}

export async function sendOrderStatusEmail({
  to,
  customerName,
  orderNumber,
  status,
}: OrderStatusEmailProps) {
  const statusMessages: Record<string, { title: string; message: string }> = {
    processing: {
      title: "Your Order is Being Processed",
      message:
        "We're preparing your items for shipment. You'll receive another update when your order ships.",
    },
    shipped: {
      title: "Your Order Has Shipped!",
      message:
        "Great news! Your order is on its way. You should receive it within 3-5 business days depending on your location.",
    },
    delivered: {
      title: "Your Order Has Been Delivered",
      message:
        "Your order has been delivered. We hope you love your new products! Please don't hesitate to reach out if you have any questions.",
    },
    cancelled: {
      title: "Your Order Has Been Cancelled",
      message:
        "Your order has been cancelled. If you did not request this cancellation or have any questions, please contact us immediately.",
    },
  };

  const statusInfo = statusMessages[status] || {
    title: `Order Status Update: ${status}`,
    message: `Your order status has been updated to: ${status}`,
  };

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `${statusInfo.title} - ${orderNumber}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #faf7f2;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
              <!-- Header -->
              <div style="background-color: #2d5a3d; padding: 30px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Turah Organics</h1>
                <p style="color: #d4a574; margin: 10px 0 0 0; font-size: 14px;">Natural Beauty, Rooted in Tradition</p>
              </div>
              
              <!-- Content -->
              <div style="padding: 40px 30px;">
                <h2 style="color: #2d5a3d; margin: 0 0 20px 0; font-size: 24px;">${
                  statusInfo.title
                }</h2>
                
                <p style="color: #4a4a4a; line-height: 1.6; margin: 0 0 20px 0;">
                  Dear ${customerName},
                </p>
                
                <div style="background-color: #faf7f2; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                  <p style="color: #2d5a3d; font-weight: 600; margin: 0 0 5px 0;">Order Number</p>
                  <p style="color: #4a4a4a; margin: 0; font-family: monospace; font-size: 16px;">${orderNumber}</p>
                </div>
                
                <div style="background-color: ${
                  status === "cancelled" ? "#fef2f2" : "#f0fdf4"
                }; border-left: 4px solid ${
        status === "cancelled" ? "#ef4444" : "#22c55e"
      }; padding: 15px 20px; margin-bottom: 30px;">
                  <p style="color: #4a4a4a; line-height: 1.6; margin: 0;">
                    ${statusInfo.message}
                  </p>
                </div>
                
                <p style="color: #4a4a4a; line-height: 1.6; margin: 0;">
                  Thank you for choosing Turah Organics!
                </p>
              </div>
              
              <!-- Footer -->
              <div style="background-color: #faf7f2; padding: 20px 30px; text-align: center;">
                <p style="color: #666; font-size: 14px; margin: 0;">
                  © ${new Date().getFullYear()} Turah Organics Beauty Ventures. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Error sending order status email:", error);
    return { success: false, error };
  }
}
