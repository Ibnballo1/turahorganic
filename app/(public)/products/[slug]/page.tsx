import { notFound } from "next/navigation";
import Image from "next/image";
import { db } from "@/lib/db";
import { products, categories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { AddToCartButton } from "@/components/products/add-to-cart-button";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Truck, Shield, RefreshCw } from "lucide-react";

async function getProduct(slug: string) {
  try {
    const product = await db
      .select()
      .from(products)
      .where(eq(products.slug, slug))
      .limit(1);

    if (product.length === 0) {
      // Check placeholder products
      const placeholder = placeholderProducts.find((p) => p.slug === slug);
      return placeholder || null;
    }

    return product[0];
  } catch (error) {
    console.error("Error fetching product:", error);
    return placeholderProducts.find((p) => p.slug === slug) || null;
  }
}

async function getCategory(categoryId: string) {
  try {
    const category = await db
      .select()
      .from(categories)
      .where(eq(categories.id, categoryId))
      .limit(1);

    return category[0] || null;
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return { title: "Product Not Found | Turah Organics" };
  }

  return {
    title: `${product.name} | Turah Organics`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const category = product.categoryId
    ? await getCategory(product.categoryId)
    : null;
  const hasDiscount =
    product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(
        ((Number(product.compareAtPrice!) - Number(product.price)) /
          Number(product.compareAtPrice!)) *
          100
      )
    : 0;

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
              <Image
                src={
                  product.images[0] ||
                  "/placeholder.svg?height=600&width=600&query=product"
                }
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {hasDiscount && (
                <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">
                  -{discountPercent}% OFF
                </Badge>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.slice(1, 5).map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-lg overflow-hidden bg-muted"
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} - Image ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {category && (
              <Badge
                variant="secondary"
                className="bg-secondary/20 text-secondary-foreground"
              >
                {category.name}
              </Badge>
            )}
            <h1 className="font-serif text-4xl font-bold text-foreground">
              {product.name}
            </h1>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-foreground">
                {formatPrice(Number(product.price))}
              </span>
              {hasDiscount && (
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrice(Number(product.compareAtPrice!))}
                </span>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed text-lg">
              {product.description}
            </p>

            <div className="flex items-center gap-2">
              {product.stockQuantity > 10 && (
                <Badge
                  variant="outline"
                  className="text-primary border-primary"
                >
                  In Stock
                </Badge>
              )}
              {product.stockQuantity <= 10 && product.stockQuantity > 0 && (
                <Badge
                  variant="outline"
                  className="text-secondary border-secondary"
                >
                  Only {product.stockQuantity} left
                </Badge>
              )}
              {product.stockQuantity === 0 && (
                <Badge
                  variant="outline"
                  className="text-destructive border-destructive"
                >
                  Out of Stock
                </Badge>
              )}
            </div>

            <AddToCartButton product={product} />

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="flex flex-col items-center text-center">
                <Truck className="h-6 w-6 text-primary mb-2" />
                <span className="text-xs text-muted-foreground">
                  Free Shipping over ₦10,000
                </span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Shield className="h-6 w-6 text-primary mb-2" />
                <span className="text-xs text-muted-foreground">
                  100% Natural Ingredients
                </span>
              </div>
              <div className="flex flex-col items-center text-center">
                <RefreshCw className="h-6 w-6 text-primary mb-2" />
                <span className="text-xs text-muted-foreground">
                  30-Day Returns
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const placeholderProducts = [
  {
    id: "1",
    name: "African Black Soap",
    slug: "african-black-soap",
    description:
      "Our traditional African black soap is handcrafted using ancient methods passed down through generations. Made with plantain skins, cocoa pods, and shea butter, this soap deeply cleanses while maintaining your skin's natural moisture. Perfect for all skin types, especially those with acne-prone or sensitive skin.",
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
    description:
      "Experience the luxurious moisturizing power of pure unrefined shea butter. This creamy soap nourishes and protects your skin, leaving it soft, supple, and deeply hydrated. Ideal for dry skin and perfect for the harsh harmattan season.",
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
    description:
      "Pure organic turmeric powder sourced directly from Nigerian farms. Rich in curcumin, this golden spice adds vibrant color and authentic flavor to your dishes while providing numerous health benefits. Perfect for cooking, smoothies, and traditional remedies.",
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
    description:
      "Our signature natural honey blend combines pure Nigerian honey with traditional herbs known for their wellness properties. This potent mix supports energy, vitality, and overall well-being. A treasured recipe passed down through generations.",
    price: "5000",
    compareAtPrice: "6000",
    images: ["/natural-honey-jar-organic-golden-wellness-herbs.jpg"],
    categoryId: "3",
    stockQuantity: 25,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
