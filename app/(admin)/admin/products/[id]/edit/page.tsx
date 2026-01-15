import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { products, categories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { ProductForm } from "@/components/admin/product-form";

async function getProduct(id: string) {
  try {
    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1);
    return product[0] || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

async function getCategories() {
  try {
    return await db.select().from(categories).orderBy(categories.name);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export const metadata = {
  title: "Edit Product | Turah Organics Admin",
};

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, allCategories] = await Promise.all([
    getProduct(id),
    getCategories(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Edit Product
        </h1>
        <p className="text-muted-foreground">Update product details</p>
      </div>
      <ProductForm categories={allCategories} product={product} />
    </div>
  );
}
