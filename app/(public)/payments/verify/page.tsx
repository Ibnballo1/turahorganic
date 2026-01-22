import { redirect } from "next/navigation";
import { verifyPayment } from "@/actions/payments";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle, ShoppingBag } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Payment Verification | Turah Organics",
};

export default async function PaymentVerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string; trxref?: string }>;
}) {
  const params = await searchParams;
  const reference = params.reference || params.trxref;

  if (!reference) {
    redirect("/");
  }

  const result = await verifyPayment(reference);

  if (result.success) {
    return (
      <div className="min-h-screen bg-background py-24">
        <div className="container mx-auto px-4">
          <Card className="max-w-md mx-auto border-border">
            <CardContent className="pt-8 text-center">
              <CheckCircle2 className="h-20 w-20 text-primary mx-auto mb-6" />
              <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
                Payment Successful!
              </h1>
              <p className="text-muted-foreground mb-2">
                Thank you for your order.
              </p>
              <p className="text-muted-foreground mb-8">
                Order ID:{" "}
                <span className="font-mono font-medium">{result.orderId}</span>
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                We&apos;ve sent a confirmation email to your inbox with your
                order details.
              </p>
              <div className="space-y-3">
                <Button
                  asChild
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Link href="/products">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-4">
        <Card className="max-w-md mx-auto border-border">
          <CardContent className="pt-8 text-center">
            <XCircle className="h-20 w-20 text-destructive mx-auto mb-6" />
            <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
              Payment Failed
            </h1>
            <p className="text-muted-foreground mb-8">
              {result.error ||
                "Something went wrong with your payment. Please try again."}
            </p>
            <div className="space-y-3">
              <Button
                asChild
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Link href="/checkout">Try Again</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full bg-transparent"
              >
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
