import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { orders, orderItems } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { ArrowLeft, User, MapPin, CreditCard } from "lucide-react";
import Link from "next/link";
import { UpdateOrderStatus } from "@/components/admin/update-order-status";

async function getOrder(id: string) {
  try {
    const order = await db
      .select()
      .from(orders)
      .where(eq(orders.id, id))
      .limit(1);
    if (order.length === 0) return null;

    const items = await db
      .select()
      .from(orderItems)
      .where(eq(orderItems.orderId, id));

    return { ...order[0], items };
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  processing: "bg-blue-100 text-blue-800 border-blue-200",
  shipped: "bg-purple-100 text-purple-800 border-purple-200",
  delivered: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

const paymentStatusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  paid: "bg-green-100 text-green-800 border-green-200",
  failed: "bg-red-100 text-red-800 border-red-200",
  refunded: "bg-gray-100 text-gray-800 border-gray-200",
};

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/orders"
          className="text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Order <span className="font-mono text-xl">{order.orderNumber}</span>
          </h1>
          <p className="text-muted-foreground">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-serif">Order Status</CardTitle>
              <div className="flex gap-2">
                <Badge
                  variant="outline"
                  className={statusColors[order.orderStatus] || ""}
                >
                  {order.orderStatus}
                </Badge>
                <Badge
                  variant="outline"
                  className={paymentStatusColors[order.paymentStatus] || ""}
                >
                  {order.paymentStatus}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <UpdateOrderStatus
                orderId={order.id}
                currentStatus={order.orderStatus}
              />
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="font-serif">Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-3 border-b border-border last:border-0"
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        {item.productName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(Number(item.unitPrice))} x {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium text-foreground">
                      {formatPrice(Number(item.totalPrice))}
                    </p>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="space-y-2">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatPrice(Number(order.subtotal))}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>
                    {Number(order.shippingCost) === 0
                      ? "Free"
                      : formatPrice(Number(order.shippingCost))}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(Number(order.total))}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer Info */}
        <div className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="font-serif flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Customer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="font-medium text-foreground">
                {order.customerName}
              </p>
              <p className="text-muted-foreground">{order.customerEmail}</p>
              <p className="text-muted-foreground">{order.customerPhone}</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="font-serif flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground space-y-1">
                <p>{order.shippingAddress}</p>
                <p>
                  {order.shippingCity}, {order.shippingState}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="font-serif flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Payment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge
                  variant="outline"
                  className={paymentStatusColors[order.paymentStatus] || ""}
                >
                  {order.paymentStatus}
                </Badge>
              </div>
              {order.paystackReference && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reference</span>
                  <span className="font-mono text-sm">
                    {order.paystackReference.slice(0, 12)}...
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
