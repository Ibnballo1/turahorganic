import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { products, categories } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { Plus, Pencil, Package } from "lucide-react";
import { DeleteProductButton } from "@/components/admin/delete-product-button";

async function getProducts() {
  try {
    const allProducts = await db
      .select({
        product: products,
        categoryName: categories.name,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .orderBy(desc(products.createdAt));

    return allProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function ProductsPage() {
  const allProducts = await getProducts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Products
          </h1>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
        <Button
          asChild
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Link href="/admin/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      {allProducts.length === 0 ? (
        <Card className="border-border">
          <CardContent className="py-16 text-center">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No products yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Get started by adding your first product.
            </p>
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Link href="/admin/products/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Product
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {allProducts.map(({ product, categoryName }) => (
            <Card key={product.id} className="border-border">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-muted shrink-0">
                    <Image
                      src={
                        product.images[0] ||
                        "/placeholder.svg?height=80&width=80&query=product"
                      }
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-medium text-foreground truncate">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {product.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          {categoryName && (
                            <Badge variant="secondary" className="text-xs">
                              {categoryName}
                            </Badge>
                          )}
                          {product.featured && (
                            <Badge
                              variant="outline"
                              className="text-xs border-primary text-primary"
                            >
                              Featured
                            </Badge>
                          )}
                          <span className="text-sm text-muted-foreground">
                            Stock: {product.stockQuantity}
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bold text-foreground">
                          {formatPrice(Number(product.price))}
                        </p>
                        {product.compareAtPrice && (
                          <p className="text-sm text-muted-foreground line-through">
                            {formatPrice(Number(product.compareAtPrice))}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      asChild
                      variant="outline"
                      size="icon"
                      className="bg-transparent"
                    >
                      <Link href={`/admin/products/${product.id}/edit`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <DeleteProductButton
                      productId={product.id}
                      productName={product.name}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
