import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

async function getOrders() {
  try {
    return await db.select().from(orders).orderBy(desc(orders.createdAt));
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
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

export default async function OrdersPage() {
  const allOrders = await getOrders();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Orders
        </h1>
        <p className="text-muted-foreground">Manage customer orders</p>
      </div>

      {allOrders.length === 0 ? (
        <Card className="border-border">
          <CardContent className="py-16 text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No orders yet
            </h3>
            <p className="text-muted-foreground">
              Orders will appear here once customers start purchasing.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {allOrders.map((order) => (
            <Link key={order.id} href={`/admin/orders/${order.id}`}>
              <Card className="border-border hover:shadow-md transition-shadow cursor-pointer mb-4">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-foreground">
                        {order.customerName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {order.customerEmail}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {order.customerPhone}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant="outline"
                        className={statusColors[order.orderStatus] || ""}
                      >
                        {order.orderStatus}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={
                          paymentStatusColors[order.paymentStatus] || ""
                        }
                      >
                        {order.paymentStatus}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">
                        {formatPrice(Number(order.total))}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
