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
              className="group relative block overflow-hidden rounded-2xl border border-border transition-all duration-300 hover:shadow-xl"
            >
              <Card className="relative flex aspect-square flex-col justify-end overflow-hidden border-none">
                {/* 1. Background Image */}
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* 2. Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />

                {/* 3. Content Layer (Above the image and gradient) */}
                <div className="relative z-20 p-6 text-white w-full">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="space-y-1">
                      <h3 className="font-serif text-2xl font-bold leading-tight">
                        {category.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-white/80 uppercase tracking-wider">
                        <Package className="h-3.5 w-3.5" />
                        <span>
                          {category.productCount}{" "}
                          {category.productCount === 1 ? "Product" : "Products"}
                        </span>
                      </div>
                    </div>

                    {/* Admin Actions - Using stopPropagation to prevent Link click */}
                    {userIsTurah?.user?.name === "Turah" && (
                      <div
                        className="flex items-center gap-1 bg-white/10 backdrop-blur-md p-1 rounded-lg border border-white/20"
                        onClick={(e) => e.preventDefault()} // Prevents the link from firing when clicking buttons
                      >
                        <EditCategoryDialog category={category} />
                        <div className="w-px h-4 bg-white/20 mx-0.5" />
                        <DeleteCategoryButton
                          id={category.id}
                          name={category.name}
                        />
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-white/90 leading-relaxed line-clamp-2">
                    {category.description || "No description provided."}
                  </p>

                  <div className="mt-4 flex items-center text-[10px] text-white/60 uppercase font-semibold tracking-widest">
                    Last Updated: {new Date().toLocaleDateString()}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
