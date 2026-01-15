import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-muted">
      <div className="absolute inset-0 z-0">
        <Image
          src="/organic-natural-soap-shea-butter-black-soap-africa.jpg"
          alt="Turah Organics natural beauty products"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-3xl">
          <p className="text-secondary font-medium mb-4 tracking-wide uppercase text-sm">
            Handcrafted in Nigeria
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground leading-tight mb-6">
            Natural beauty,{" "}
            <span className="text-primary">rooted in tradition</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
            Discover authentic organic beauty products crafted with traditional
            African ingredients. From nourishing black soap to aromatic spices,
            each product tells a story of wellness and heritage.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Link href="/products">
                Shop Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            >
              <Link href="/about">Our Story</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
