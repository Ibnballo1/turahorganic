import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/product-card";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

async function getFeaturedProducts() {
  try {
    const featuredProducts = await db
      .select()
      .from(products)
      .where(eq(products.featured, true))
      .limit(4);

    return featuredProducts;
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

export async function FeaturedProducts() {
  const featuredProducts = await getFeaturedProducts();

  // Show placeholder products if no real products exist yet
  const displayProducts =
    featuredProducts.length > 0 ? featuredProducts : placeholderProducts;

  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
          <div>
            <p className="text-secondary font-medium mb-2 tracking-wide uppercase text-sm">
              Bestsellers
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
              Featured Products
            </h2>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
          >
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Placeholder products for initial display
const placeholderProducts = [
  {
    id: "1",
    name: "African Black Soap",
    slug: "african-black-soap",
    description: "Traditional handmade black soap for deep cleansing",
    price: "2500",
    compareAtPrice: "3000",
    images: ["/african-black-soap-natural-handmade-organic-beauty.jpg"],
    categoryId: "1",
    inStock: true,
    stock: 50,
    stockQuantity: 50,
    featured: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Shea Butter Soap",
    slug: "shea-butter-soap",
    description: "Moisturizing soap enriched with pure shea butter",
    price: "2000",
    compareAtPrice: null,
    images: ["/shea-butter-soap-cream-colored-natural-organic.jpg"],
    categoryId: "1",
    inStock: true,
    stockQuantity: 35,
    featured: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Organic Turmeric Powder",
    slug: "organic-turmeric-powder",
    description: "Pure organic turmeric for cooking and wellness",
    price: "1500",
    compareAtPrice: null,
    images: ["/organic-turmeric-powder-yellow-spice-jar-natural.jpg"],
    categoryId: "2",
    inStock: true,
    stockQuantity: 100,
    featured: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    name: "Natural Honey Mix",
    slug: "natural-honey-mix",
    description: "Traditional honey blend with natural herbs",
    price: "5000",
    compareAtPrice: "6000",
    images: ["/natural-honey-jar-organic-golden-wellness-herbs.jpg"],
    categoryId: "3",
    inStock: true,
    stockQuantity: 25,
    featured: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
