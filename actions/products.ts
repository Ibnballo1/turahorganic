"use server";

import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/utils";

export async function createProduct(data: {
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  categoryId: string;
  stockQuantity: number;
  featured: boolean;
  images: string[];
}) {
  const slug = slugify(data.name);

  await db.insert(products).values({
    ...data,
    slug,
    price: data.price.toString(),
    compareAtPrice: data.compareAtPrice ? data.compareAtPrice.toString() : null,
  });

  revalidatePath("/admin/products");
  revalidatePath("/products");
}

export async function updateProduct(
  id: string,
  data: {
    name: string;
    description: string;
    price: number;
    compareAtPrice?: number;
    categoryId: string;
    stockQuantity: number;
    featured: boolean;
    images: string[];
  }
) {
  const slug = slugify(data.name);

  await db
    .update(products)
    .set({
      ...data,
      slug,
      price: data.price.toString(),
      compareAtPrice: data.compareAtPrice
        ? data.compareAtPrice.toString()
        : null,
      updatedAt: new Date(),
    })
    .where(eq(products.id, id));

  revalidatePath("/admin/products");
  revalidatePath("/products");
}

export async function deleteProduct(id: string) {
  await db.delete(products).where(eq(products.id, id));

  revalidatePath("/admin/products");
  revalidatePath("/products");
}
