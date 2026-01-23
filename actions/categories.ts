"use server";

import { db } from "@/lib/db";
import { categories, products } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/utils";
import { eq, sql } from "drizzle-orm";

export async function createCategory(data: {
  name: string;
  description: string;
  image?: string;
}) {
  const slug = slugify(data.name);

  await db.insert(categories).values({
    name: data.name,
    slug,
    description: data.description || null,
    image: data.image || null,
  });

  revalidatePath("/admin/categories");
  revalidatePath("/products");
}

export async function getAllCategories() {
  const result = await db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
      description: categories.description,
      image: categories.image,
      productCount: sql<number>`count(${products.id})`.mapWith(Number),
    })
    .from(categories)
    .leftJoin(products, eq(categories.id, products.categoryId))
    .groupBy(
      categories.id,
      categories.name,
      categories.slug,
      categories.description,
      categories.image,
    )
    .orderBy(categories.name);

  return result;
}

export async function updateCategory(
  id: string,
  data: {
    name: string;
    description: string;
    image?: string;
  },
) {
  const slug = slugify(data.name);

  await db
    .update(categories)
    .set({
      name: data.name,
      slug,
      description: data.description || null,
      image: data.image || null,
      updatedAt: new Date(),
    })
    .where(eq(categories.id, id));

  revalidatePath("/admin/categories");
  revalidatePath("/products");
}

export async function deleteCategory(id: string) {
  try {
    await db.delete(categories).where(eq(categories.id, id));

    revalidatePath("/admin/categories");
    revalidatePath("/products");

    return { success: true };
  } catch (error) {
    console.error("Delete category error:", error);
    return {
      success: false,
      error: "Failed to delete category. Check if it's being used.",
    };
  }
}
