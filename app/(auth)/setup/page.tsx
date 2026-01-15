import { SetupForm } from "@/components/auth/setup-form";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin Setup | Turah Organics",
  description: "Set up the initial admin account",
};

export default async function SetupPage() {
  // Check if any admin user already exists
  const existingUsers = await db.select().from(users).limit(1);

  if (existingUsers.length > 0) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-amber-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-800">Turah Organics</h1>
          <p className="text-muted-foreground mt-2">Create Admin Account</p>
        </div>
        <SetupForm />
      </div>
    </div>
  );
}
