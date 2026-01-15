import { LoginForm } from "@/components/auth/login-form";
import { getSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin Login | Turah Organics",
  description: "Login to the Turah Organics admin dashboard",
};

export default async function LoginPage() {
  const session = await getSession();

  if (session) {
    redirect("/admin/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-amber-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-800">Turah Organics</h1>
          <p className="text-muted-foreground mt-2">Admin Dashboard Login</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
