import Image from "next/image";
import { Leaf, Heart, Award, Users, Target, Eye } from "lucide-react";

export const metadata = {
  title: "About Us | Turah Organics",
  description:
    "Learn about Turah Organics Beauty Ventures - our story, mission, and commitment to authentic African organic beauty products.",
};

const values = [
  {
    icon: Leaf,
    title: "Natural Ingredients",
    description:
      "We use only the finest organic ingredients sourced directly from Nigerian farmers and suppliers.",
  },
  {
    icon: Heart,
    title: "Handcrafted with Love",
    description:
      "Every product is carefully handmade using traditional techniques passed down through generations.",
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description:
      "We maintain strict quality standards to ensure every product meets our high expectations.",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "We support local communities by sourcing locally and providing employment opportunities.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-muted py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-secondary font-medium mb-4 tracking-wide uppercase text-sm">
              Our Story
            </p>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">
              Preserving African Beauty Traditions
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Turah Organics Beauty Ventures is dedicated to bringing the finest
              organic beauty products from Nigeria to the world, honoring the
              wisdom of our ancestors.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] relative rounded-2xl overflow-hidden">
                <Image
                  src="/nigerian-woman-entrepreneur-organic-beauty-busines.jpg"
                  alt="Turah Organics founder"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-secondary rounded-2xl -z-10 hidden lg:block" />
            </div>
            <div>
              <h2 className="font-serif text-4xl font-bold text-foreground mb-6">
                How It All Began
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Turah Organics was born from a deep appreciation for
                  traditional African beauty secrets and a desire to share these
                  treasures with the world. Our founder grew up watching her
                  grandmother create natural remedies and beauty products using
                  locally sourced ingredients.
                </p>
                <p>
                  What started as a passion project making soaps for family and
                  friends quickly grew into a mission to preserve and promote
                  authentic African organic beauty practices. Today, we continue
                  to honor these traditions while meeting modern quality
                  standards.
                </p>
                <p>
                  Every product we create carries the essence of our heritage -
                  from the nutrient-rich African black soap to our aromatic
                  spice blends. We believe that nature provides everything we
                  need for health, beauty, and wellness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-card rounded-2xl p-8 border border-border">
              <div className="p-3 rounded-lg bg-primary/10 w-fit mb-6">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
                Our Mission
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To provide high-quality, authentic organic beauty and wellness
                products that celebrate African heritage while empowering local
                communities and promoting sustainable practices.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-8 border border-border">
              <div className="p-3 rounded-lg bg-primary/10 w-fit mb-6">
                <Eye className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
                Our Vision
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To become a leading voice in the global organic beauty industry,
                showcasing the richness of African natural ingredients and
                traditional knowledge to customers worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-secondary font-medium mb-2 tracking-wide uppercase text-sm">
              What We Stand For
            </p>
            <h2 className="font-serif text-4xl font-bold text-foreground">
              Our Core Values
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
