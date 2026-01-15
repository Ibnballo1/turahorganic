import { Suspense } from "react";
import { ProductsGrid } from "@/components/products/products-grid";
import { ProductsFilter } from "@/components/products/products-filter";
import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";

async function getCategories() {
  try {
    return await db.select().from(categories).orderBy(categories.name);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export const metadata = {
  title: "Products | Turah Organics",
  description:
    "Shop our collection of organic soaps, spices, and natural aphrodisiacs. Handcrafted with traditional African ingredients.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const params = await searchParams;
  const allCategories = await getCategories();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-center mb-4">
            Our Products
          </h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Discover our collection of handcrafted organic products, made with
            love using traditional African ingredients.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 shrink-0">
            <ProductsFilter categories={allCategories} />
          </aside>
          <main className="flex-1">
            <Suspense fallback={<ProductsGridSkeleton />}>
              <ProductsGrid category={params.category} search={params.search} />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}

function ProductsGridSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-muted rounded-xl animate-pulse">
          <div className="aspect-square bg-muted-foreground/10 rounded-t-xl" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-muted-foreground/10 rounded w-3/4" />
            <div className="h-3 bg-muted-foreground/10 rounded w-full" />
            <div className="h-4 bg-muted-foreground/10 rounded w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
