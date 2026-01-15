import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Award, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Training Programs | Turah Organics",
  description:
    "Learn organic soap making, spice blending, and more with our comprehensive training programs.",
};

const programs = [
  {
    title: "Organic Soap Making Masterclass",
    duration: "2 Weeks",
    students: "Max 10",
    price: "₦75,000",
    description:
      "Learn the art of creating organic soaps from scratch, including black soap, shea butter soap, and specialty blends.",
    features: [
      "Cold process soap making",
      "Hot process techniques",
      "Natural colorants and fragrances",
      "Packaging and branding basics",
      "Business startup guide",
    ],
    image: "/soap-making-class-workshop-organic-handmade.jpg",
    popular: true,
  },
  {
    title: "Organic Spice Processing",
    duration: "1 Week",
    students: "Max 15",
    price: "₦45,000",
    description:
      "Discover the secrets of processing and packaging organic spices for commercial sale.",
    features: [
      "Spice sourcing and selection",
      "Processing and preservation",
      "Quality control",
      "Packaging techniques",
      "Market strategies",
    ],
    image: "/spice-processing-grinding-packaging-organic.jpg",
    popular: false,
  },
  {
    title: "Complete Beauty Business Course",
    duration: "4 Weeks",
    students: "Max 8",
    price: "₦150,000",
    description:
      "A comprehensive program covering all aspects of starting and running an organic beauty business.",
    features: [
      "All soap making techniques",
      "Product formulation",
      "Branding and marketing",
      "Business registration",
      "E-commerce setup",
      "Mentorship support",
    ],
    image: "/beauty-business-training-entrepreneurship-women.jpg",
    popular: false,
  },
];

export default function TrainingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-secondary font-medium mb-4 tracking-wide uppercase text-sm">
              Learn From Experts
            </p>
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
              Start Your Organic Beauty Journey
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Join our hands-on training programs and learn to create premium
              organic beauty products. Turn your passion into a profitable
              business.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="font-serif text-4xl font-bold text-primary">500+</p>
              <p className="text-muted-foreground">Graduates</p>
            </div>
            <div>
              <p className="font-serif text-4xl font-bold text-primary">95%</p>
              <p className="text-muted-foreground">Success Rate</p>
            </div>
            <div>
              <p className="font-serif text-4xl font-bold text-primary">50+</p>
              <p className="text-muted-foreground">Businesses Started</p>
            </div>
            <div>
              <p className="font-serif text-4xl font-bold text-primary">5+</p>
              <p className="text-muted-foreground">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-secondary font-medium mb-2 tracking-wide uppercase text-sm">
              Our Programs
            </p>
            <h2 className="font-serif text-4xl font-bold text-foreground">
              Choose Your Path
            </h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <Card
                key={program.title}
                className="relative overflow-hidden border-border"
              >
                {program.popular && (
                  <Badge className="absolute top-4 right-4 z-10 bg-secondary text-secondary-foreground">
                    Most Popular
                  </Badge>
                )}
                <div className="aspect-video relative">
                  <Image
                    src={program.image || "/placeholder.svg"}
                    alt={program.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-serif text-2xl">
                    {program.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" /> {program.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" /> {program.students}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{program.description}</p>
                  <ul className="space-y-2">
                    {program.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <span className="font-serif text-2xl font-bold text-foreground">
                      {program.price}
                    </span>
                    <Button
                      asChild
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <Link href="/contact">
                        Enroll Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-accent">
        <div className="container mx-auto px-4 text-center">
          <Award className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
            Get Certified
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            All our graduates receive a certificate of completion, recognizing
            their skills and knowledge in organic beauty product creation.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Link href="/contact">
              Contact Us to Learn More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
