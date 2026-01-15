import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { formatPrice } from "@/lib/utils";

async function getRecentOrders() {
  try {
    return await db
      .select()
      .from(orders)
      .orderBy(desc(orders.createdAt))
      .limit(5);
  } catch (error) {
    console.error("Error fetching recent orders:", error);
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

export async function RecentOrders() {
  const recentOrders = await getRecentOrders();

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="font-serif">Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        {recentOrders.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No orders yet
          </p>
        ) : (
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between border-b border-border pb-4 last:border-0"
              >
                <div>
                  <p className="font-medium text-foreground">
                    {order.customerName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.customerEmail}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">
                    {formatPrice(Number(order.total))}
                  </p>
                  <Badge
                    variant="outline"
                    className={statusColors[order.orderStatus] || ""}
                  >
                    {order.orderStatus}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
