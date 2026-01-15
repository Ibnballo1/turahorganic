"use client";

import type React from "react";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: string;
  compareAtPrice: string | null;
  images: string[];
  stockQuantity: number;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const hasDiscount =
    product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(
        ((parseFloat(product.compareAtPrice!) - parseFloat(product.price)) /
          parseFloat(product.compareAtPrice!)) *
          100
      )
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      image: product.images[0] || "/diverse-products-still-life.png",
    });
  };

  return (
    <Card className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={
              product.images[0] ||
              "/placeholder.svg?height=400&width=400&query=product"
            }
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {hasDiscount && (
            <span className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-xs font-medium px-2 py-1 rounded">
              -{discountPercent}%
            </span>
          )}
          {product.stockQuantity <= 5 && product.stockQuantity > 0 && (
            <span className="absolute top-3 right-3 bg-secondary text-secondary-foreground text-xs font-medium px-2 py-1 rounded">
              Low Stock
            </span>
          )}
          {product.stockQuantity === 0 && (
            <span className="absolute top-3 right-3 bg-muted-foreground text-background text-xs font-medium px-2 py-1 rounded">
              Out of Stock
            </span>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-foreground">
                {formatPrice(parseFloat(product.price))}
              </span>
              {hasDiscount && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(parseFloat(product.compareAtPrice!))}
                </span>
              )}
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={handleAddToCart}
              disabled={product.stockQuantity === 0}
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="sr-only">Add to cart</span>
            </Button>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
