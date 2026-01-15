import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Heart, Award, Users } from "lucide-react";

const values = [
  {
    icon: Leaf,
    title: "100% Natural",
    description: "All ingredients sourced from nature",
  },
  {
    icon: Heart,
    title: "Handcrafted",
    description: "Made with love and care",
  },
  {
    icon: Award,
    title: "Quality First",
    description: "Premium ingredients only",
  },
  {
    icon: Users,
    title: "Community",
    description: "Supporting local artisans",
  },
];

export function AboutPreview() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] relative rounded-2xl overflow-hidden">
              <Image
                src="/nigerian-woman-making-organic-soap-shea-butter-nat.jpg"
                alt="Turah Organics production"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-secondary rounded-2xl hidden lg:block" />
          </div>
          <div>
            <p className="text-secondary font-medium mb-2 tracking-wide uppercase text-sm">
              Our Story
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Rooted in African tradition
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Turah Organics Beauty Ventures was born from a passion for
              preserving traditional African beauty secrets. We believe that
              nature provides everything we need for healthy, glowing skin and
              overall wellness.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Every product we create is handcrafted using time-honored
              techniques passed down through generations, combined with the
              finest organic ingredients sourced directly from Nigerian farmers.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              {values.map((value) => (
                <div key={value.title} className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <value.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">
                      {value.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Link href="/about">
                Learn More About Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
