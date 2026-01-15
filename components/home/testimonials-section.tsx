import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Adaeze Okonkwo",
    location: "Lagos, Nigeria",
    image: "/nigerian-woman-portrait-professional.jpg",
    quote:
      "The African black soap transformed my skin! After years of struggling with uneven skin tone, I finally found a natural solution. Highly recommend!",
  },
  {
    name: "Chidinma Eze",
    location: "Abuja, Nigeria",
    image: "/african-woman-portrait-smiling-professional.jpg",
    quote:
      "I love how Turah Organics stays true to traditional methods. The shea butter soap is incredibly moisturizing and the scent is divine.",
  },
  {
    name: "Blessing Adeyemi",
    location: "Port Harcourt, Nigeria",
    image: "/nigerian-woman-portrait-elegant.jpg",
    quote:
      "The organic spices are of exceptional quality. You can taste the difference in every dish. My family loves the turmeric and ginger blend!",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-secondary font-medium mb-2 tracking-wide uppercase text-sm">
            Customer Love
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            What Our Customers Say
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card border-border">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary/30 mb-4" />
                <p className="text-muted-foreground leading-relaxed mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
