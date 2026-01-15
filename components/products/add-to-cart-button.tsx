"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { ShoppingCart, Minus, Plus, Check } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: string;
  images: string[];
  stockQuantity: number;
}

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        image: product.images[0] || "/diverse-products-still-life.png",
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center border border-border rounded-lg">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-r-none"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            value={quantity}
            onChange={(e) =>
              setQuantity(
                Math.max(
                  1,
                  Math.min(
                    product.stockQuantity,
                    Number.parseInt(e.target.value) || 1
                  )
                )
              )
            }
            className="h-10 w-16 text-center border-0 rounded-none focus-visible:ring-0"
            min={1}
            max={product.stockQuantity}
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-l-none"
            onClick={() =>
              setQuantity(Math.min(product.stockQuantity, quantity + 1))
            }
            disabled={quantity >= product.stockQuantity}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Button
        onClick={handleAddToCart}
        disabled={product.stockQuantity === 0}
        className="w-full h-12 text-lg bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        {added ? (
          <>
            <Check className="mr-2 h-5 w-5" />
            Added to Cart!
          </>
        ) : (
          <>
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </>
        )}
      </Button>
    </div>
  );
}
