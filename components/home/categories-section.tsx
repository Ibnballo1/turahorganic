import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Organic Soaps",
    slug: "organic-soaps",
    description: "Nourishing natural soaps for radiant skin",
    image: "/organic-black-soap-shea-butter-soap-natural-handma.jpg",
    productCount: "12 Products",
  },
  {
    name: "Organic Spices",
    slug: "organic-spices",
    description: "Aromatic spices for culinary delight",
    image: "/organic-african-spices-colorful-turmeric-ginger-na.jpg",
    productCount: "8 Products",
  },
  {
    name: "Aphrodisiacs",
    slug: "aphrodisiacs",
    description: "Traditional wellness enhancers",
    image: "/natural-herbs-aphrodisiac-wellness-organic-bottles.jpg",
    productCount: "6 Products",
  },
];

export function CategoriesSection() {
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
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/products?category=${category.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-square relative">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-card">
                <p className="text-sm text-card/70 mb-1">
                  {category.productCount}
                </p>
                <h3 className="font-serif text-2xl font-bold mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-card/80 mb-4">
                  {category.description}
                </p>
                <span className="inline-flex items-center text-sm font-medium text-secondary group-hover:gap-2 transition-all">
                  Shop Now <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
