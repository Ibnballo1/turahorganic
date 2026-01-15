"use server";

import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/utils";

export async function createCategory(data: {
  name: string;
  description: string;
}) {
  const slug = slugify(data.name);

  await db.insert(categories).values({
    name: data.name,
    slug,
    description: data.description || null,
  });

  revalidatePath("/admin/categories");
  revalidatePath("/products");
}
