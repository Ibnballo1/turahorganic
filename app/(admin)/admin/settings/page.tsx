import { getSession } from "@/lib/auth-utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, Store } from "lucide-react";

export default async function SettingsPage() {
  const session = await getSession();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account and store settings
        </p>
      </div>

      <Card className="border-border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <CardTitle>Account Details</CardTitle>
          </div>
          <CardDescription>Your personal account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              defaultValue={session?.user.name}
              disabled
              className="border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              defaultValue={session?.user.email}
              disabled
              className="border-border"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Store className="h-5 w-5 text-primary" />
            <CardTitle>Store Information</CardTitle>
          </div>
          <CardDescription>Configure your store details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="storeName">Store Name</Label>
            <Input
              id="storeName"
              defaultValue="Turah Organics Beauty Ventures"
              className="border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="storeEmail">Store Email</Label>
            <Input
              id="storeEmail"
              defaultValue="hello@turahorganics.com"
              className="border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="storePhone">Phone Number</Label>
            <Input
              id="storePhone"
              placeholder="+234 XXX XXX XXXX"
              className="border-border"
            />
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
