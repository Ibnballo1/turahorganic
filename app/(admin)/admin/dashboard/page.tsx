import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { products, orders, categories } from "@/lib/db/schema";
import { count, sum, eq } from "drizzle-orm";
import { formatPrice } from "@/lib/utils";
import { Package, ShoppingCart, FolderTree, TrendingUp } from "lucide-react";
import { RecentOrders } from "@/components/admin/recent-orders";

async function getStats() {
  try {
    const [productCount] = await db.select({ count: count() }).from(products);
    const [categoryCount] = await db
      .select({ count: count() })
      .from(categories);
    const [orderCount] = await db.select({ count: count() }).from(orders);
    const [revenueResult] = await db
      .select({ total: sum(orders.total) })
      .from(orders)
      .where(eq(orders.paymentStatus, "paid"));

    return {
      products: productCount?.count || 0,
      categories: categoryCount?.count || 0,
      orders: orderCount?.count || 0,
      revenue: Number(revenueResult?.total) || 0,
    };
  } catch (error) {
    console.error("Error fetching stats:", error);
    return { products: 0, categories: 3, orders: 0, revenue: 0 };
  }
}

export default async function DashboardPage() {
  const stats = await getStats();

  const statCards = [
    {
      title: "Total Products",
      value: stats.products,
      icon: Package,
      description: "Products in store",
    },
    {
      title: "Categories",
      value: stats.categories,
      icon: FolderTree,
      description: "Product categories",
    },
    {
      title: "Total Orders",
      value: stats.orders,
      icon: ShoppingCart,
      description: "Orders received",
    },
    {
      title: "Revenue",
      value: formatPrice(stats.revenue),
      icon: TrendingUp,
      description: "Total revenue",
      isPrice: true,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your store.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title} className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {stat.isPrice ? stat.value : stat.value}
              </div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <RecentOrders />
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="font-serif">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <a
              href="/admin/products/new"
              className="flex items-center gap-4 rounded-lg border border-border p-4 hover:bg-muted transition-colors"
            >
              <Package className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium text-foreground">Add New Product</p>
                <p className="text-sm text-muted-foreground">
                  Create a new product listing
                </p>
              </div>
            </a>
            <a
              href="/admin/orders"
              className="flex items-center gap-4 rounded-lg border border-border p-4 hover:bg-muted transition-colors"
            >
              <ShoppingCart className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium text-foreground">View Orders</p>
                <p className="text-sm text-muted-foreground">
                  Manage customer orders
                </p>
              </div>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
