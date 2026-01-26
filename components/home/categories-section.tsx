import { getAllCategories } from "@/actions/categories";
import { getSession } from "@/lib/auth-utils";
import { CategoryActions } from "../admin/category-actions";

export async function CategoriesSection() {
  const allCategories = await getAllCategories();

  const userIsTurah = await getSession();
  console.log("User is admin:", userIsTurah?.user?.name);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-secondary font-medium mb-2 tracking-wide uppercase text-sm">
            Explore Our Range
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            Shop by Category
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {allCategories.map((category) => (
            <CategoryActions key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
