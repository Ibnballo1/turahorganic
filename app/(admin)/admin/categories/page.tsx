import { getAllCategories } from "@/actions/categories"; // Import your central action
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderTree, Package } from "lucide-react";
import { AddCategoryDialog } from "@/components/admin/add-category-dialog";
import { EditCategoryDialog } from "@/components/admin/edit-category-dialog";
import { DeleteCategoryButton } from "@/components/admin/delete-category-button";

export default async function CategoriesPage() {
  // Use the action directly
  const allCategories = await getAllCategories();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Categories
          </h1>
          <p className="text-muted-foreground">Manage product categories</p>
        </div>
        <AddCategoryDialog />
      </div>

      {allCategories.length === 0 ? (
        <Card className="border-border">
          <CardContent className="py-16 text-center">
            <FolderTree className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No categories yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Get started by adding your first category.
            </p>
            <AddCategoryDialog />
          </CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allCategories.map((category) => (
            <Card key={category.id} className="border-border">
              <CardHeader className="pb-2 flex items-center justify-between">
                <CardTitle className="font-serif text-xl">
                  {category.name}
                </CardTitle>
                <div className="flex items-center gap-2">
                  {/* Pass the category object directly to the Edit dialog */}
                  <EditCategoryDialog category={category} />
                  <DeleteCategoryButton id={category.id} name={category.name} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {category.description || "No description"}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Package className="h-4 w-4" />
                  <span>{category.productCount} products</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
