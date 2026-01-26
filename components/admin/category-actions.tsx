"use client";

import { EditCategoryDialog } from "./edit-category-dialog";
import { DeleteCategoryButton } from "./delete-category-button";

interface CategoryActionsProps {
  category: any; // Ideally use your Category type here
}

export function CategoryActions({ category }: CategoryActionsProps) {
  return (
    <div
      className="flex items-center gap-1 bg-white/10 backdrop-blur-md p-1 rounded-lg border border-white/20"
      // This is now safe because this is a Client Component
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <EditCategoryDialog category={category} />
      <div className="w-px h-4 bg-white/20 mx-0.5" />
      <DeleteCategoryButton id={category.id} name={category.name} />
    </div>
  );
}