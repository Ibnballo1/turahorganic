import { db } from "@/lib/db";
import { products, categories } from "@/lib/db/schema";
import { eq, ilike, and } from "drizzle-orm";
import { ProductCard } from "./product-card";
import { PackageX } from "lucide-react";

interface ProductsGridProps {
  category?: string;
  search?: string;
}

async function getProducts(category?: string, search?: string) {
  try {
    const query = db.select().from(products);

    const conditions = [];

    if (category && category !== "all") {
      const categoryData = await db
        .select()
        .from(categories)
        .where(eq(categories.slug, category))
        .limit(1);

      if (categoryData.length > 0) {
        conditions.push(eq(products.categoryId, categoryData[0].id));
      }
    }

    if (search) {
      conditions.push(ilike(products.name, `%${search}%`));
    }

    if (conditions.length > 0) {
      return await db
        .select()
        .from(products)
        .where(and(...conditions))
        .orderBy(products.createdAt);
    }

    return await db.select().from(products).orderBy(products.createdAt);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function ProductsGrid({ category, search }: ProductsGridProps) {
  const allProducts = await getProducts(category, search);

  // Show placeholder products if no real products exist yet
  const displayProducts =
    allProducts.length > 0 ? allProducts : placeholderProducts;

  if (displayProducts.length === 0) {
    return (
      <div className="text-center py-16">
        <PackageX className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">
          No products found
        </h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filter to find what you&apos;re looking
          for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

const placeholderProducts = [
  {
    id: "1",
    name: "African Black Soap",
    slug: "african-black-soap",
    description:
      "Traditional handmade black soap for deep cleansing and radiant skin",
    price: "2500",
    compareAtPrice: "3000",
    images: ["/african-black-soap-natural-handmade-organic-beauty.jpg"],
    categoryId: "1",
    stockQuantity: 50,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Shea Butter Soap",
    slug: "shea-butter-soap",
    description: "Moisturizing soap enriched with pure unrefined shea butter",
    price: "2000",
    compareAtPrice: null,
    images: ["/shea-butter-soap-cream-colored-natural-organic.jpg"],
    categoryId: "1",
    stockQuantity: 35,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Organic Turmeric Powder",
    slug: "organic-turmeric-powder",
    description: "Pure organic turmeric for cooking and wellness applications",
    price: "1500",
    compareAtPrice: null,
    images: ["/organic-turmeric-powder-yellow-spice-jar-natural.jpg"],
    categoryId: "2",
    stockQuantity: 100,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    name: "Natural Honey Mix",
    slug: "natural-honey-mix",
    description: "Traditional honey blend with natural herbs for wellness",
    price: "5000",
    compareAtPrice: "6000",
    images: ["/natural-honey-jar-organic-golden-wellness-herbs.jpg"],
    categoryId: "3",
    stockQuantity: 25,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    name: "Neem Soap",
    slug: "neem-soap",
    description: "Antibacterial neem soap for problem skin and acne control",
    price: "1800",
    compareAtPrice: null,
    images: ["/neem-soap-green-natural-antibacterial-organic.jpg"],
    categoryId: "1",
    stockQuantity: 40,
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "6",
    name: "Ginger Powder",
    slug: "ginger-powder",
    description: "Pure organic ginger powder for cooking and health benefits",
    price: "1200",
    compareAtPrice: null,
    images: ["/ginger-powder-organic-spice-natural-jar.jpg"],
    categoryId: "2",
    stockQuantity: 80,
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
