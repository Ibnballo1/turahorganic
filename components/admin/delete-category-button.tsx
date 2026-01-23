// components/admin/DeleteCategoryButton.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import { deleteCategory } from "@/actions/categories";
import { useRouter } from "next/navigation";

export function DeleteCategoryButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (
      confirm(
        `Delete "${name}"? This will affect all products in this category.`,
      )
    ) {
      setIsDeleting(true);
      const result = await deleteCategory(id);
      if (result.success) {
        router.refresh();
      } else {
        alert(result.error);
      }
      setIsDeleting(false);
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleDelete}
      disabled={isDeleting}
      className="hover:text-destructive"
    >
      {isDeleting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </Button>
  );
}
