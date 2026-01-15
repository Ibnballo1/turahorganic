"use client";

import type React from "react";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Search } from "lucide-react";
import { useTransition } from "react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ProductsFilterProps {
  categories: Category[];
}

export function ProductsFilter({ categories }: ProductsFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentCategory = searchParams.get("category") || "all";
  const currentSearch = searchParams.get("search") || "";

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }
    startTransition(() => {
      router.push(`/products?${params.toString()}`);
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    startTransition(() => {
      router.push(`/products?${params.toString()}`);
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <Label
          htmlFor="search"
          className="text-sm font-medium text-foreground mb-2 block"
        >
          Search Products
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="search"
            type="search"
            placeholder="Search..."
            defaultValue={currentSearch}
            onChange={handleSearch}
            className="pl-9 border-border"
          />
        </div>
      </div>

      <div>
        <h3 className="font-medium text-foreground mb-4">Categories</h3>
        <RadioGroup
          value={currentCategory}
          onValueChange={handleCategoryChange}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <Label
              htmlFor="all"
              className="text-muted-foreground cursor-pointer"
            >
              All Products
            </Label>
          </div>
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <RadioGroupItem value={category.slug} id={category.slug} />
              <Label
                htmlFor={category.slug}
                className="text-muted-foreground cursor-pointer"
              >
                {category.name}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
