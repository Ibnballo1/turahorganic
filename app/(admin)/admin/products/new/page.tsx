import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";
import { ProductForm } from "@/components/admin/product-form";

async function getCategories() {
  try {
    return await db.select().from(categories).orderBy(categories.name);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export const metadata = {
  title: "Add Product | Turah Organics Admin",
};

export default async function NewProductPage() {
  const allCategories = await getCategories();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Add New Product
        </h1>
        <p className="text-muted-foreground">
          Create a new product listing for your store
        </p>
      </div>
      <ProductForm categories={allCategories} />
    </div>
  );
}
