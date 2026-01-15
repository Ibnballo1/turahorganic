import { db } from "@/lib/db";
import { categories, products } from "@/lib/db/schema";
import { eq, count } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderTree, Package } from "lucide-react";
import { AddCategoryDialog } from "@/components/admin/add-category-dialog";

async function getCategoriesWithCounts() {
  try {
    const allCategories = await db
      .select()
      .from(categories)
      .orderBy(categories.name);

    const categoriesWithCounts = await Promise.all(
      allCategories.map(async (category) => {
        const [productCount] = await db
          .select({ count: count() })
          .from(products)
          .where(eq(products.categoryId, category.id));
        return {
          ...category,
          productCount: productCount?.count || 0,
        };
      })
    );

    return categoriesWithCounts;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function CategoriesPage() {
  const allCategories = await getCategoriesWithCounts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Categories
          </h1>
          <p className="text-muted-foreground">Manage product categories</p>
        </div>
        <AddCategoryDialog />
      </div>

      {allCategories.length === 0 ? (
        <Card className="border-border">
          <CardContent className="py-16 text-center">
            <FolderTree className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No categories yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Get started by adding your first category.
            </p>
            <AddCategoryDialog />
          </CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allCategories.map((category) => (
            <Card key={category.id} className="border-border">
              <CardHeader className="pb-2">
                <CardTitle className="font-serif text-xl">
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {category.description || "No description"}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Package className="h-4 w-4" />
                  <span>{category.productCount} products</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
