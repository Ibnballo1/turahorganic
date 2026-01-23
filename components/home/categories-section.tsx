import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Package } from "lucide-react";
import { getAllCategories } from "@/actions/categories";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { EditCategoryDialog } from "../admin/edit-category-dialog";
import { DeleteCategoryButton } from "../admin/delete-category-button";
import { getSession } from "@/lib/auth-utils";

// const categories = [s
//   {
//     name: "Organic Soaps",
//     slug: "organic-soaps",
//     description: "Nourishing natural soaps for radiant skin",
//     image: "/organic-black-soap-shea-butter-soap-natural-handma.jpg",
//     productCount: "12 Products",
//   },
//   {
//     name: "Organic Spices",
//     slug: "organic-spices",
//     description: "Aromatic spices for culinary delight",
//     image: "/organic-african-spices-colorful-turmeric-ginger-na.jpg",
//     productCount: "8 Products",
//   },
//   {
//     name: "Aphrodisiacs",
//     slug: "aphrodisiacs",
//     description: "Traditional wellness enhancers",
//     image: "/natural-herbs-aphrodisiac-wellness-organic-bottles.jpg",
//     productCount: "6 Products",
//   },
// ];

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
            <Link
              key={category.slug}
              href={`/products?category=${category.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:shadow-xl transition-all duration-300"
            >
              <Card
                key={category.id}
                className="border-border shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    {/* Left Side: Title & Count */}
                    <div className="space-y-1">
                      <CardTitle className="font-serif text-xl leading-tight">
                        {category.name}
                      </CardTitle>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        <Package className="h-3.5 w-3.5" />
                        <span>
                          {category.productCount}{" "}
                          {category.productCount === 1 ? "Product" : "Products"}
                        </span>
                      </div>
                    </div>

                    {/* Right Side: Actions in a Row */}
                    {userIsTurah?.user?.name === "Turah" && (
                      <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg border border-border/50">
                        <EditCategoryDialog category={category} />
                        <div className="w-px h-4 bg-border mx-0.5" />{" "}
                        {/* Small Separator */}
                        <DeleteCategoryButton
                          id={category.id}
                          name={category.name}
                        />
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="grow">
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {category.description ||
                      "No description provided for this category."}
                  </p>
                </CardContent>

                {/* Visual Footer showing Last Updated */}
                <div className="px-6 py-3 bg-muted/30 border-t border-border/40 mt-auto">
                  <p className="text-[10px] text-muted-foreground/60 uppercase font-semibold">
                    Last Updated: {new Date().toLocaleDateString()}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
