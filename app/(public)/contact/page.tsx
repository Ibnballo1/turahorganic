import { ContactForm } from "@/components/contact/contact-form";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata = {
  title: "Contact Us | Turah Organics",
  description:
    "Get in touch with Turah Organics Beauty Ventures. We'd love to hear from you!",
};

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["123 Organic Way", "Ikeja, Lagos", "Nigeria"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+234 903 681 6382", "+234 817 435 5135"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["hello@turahorganics.com", "support@turahorganics.com"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon - Fri: 9am - 6pm", "Sat: 10am - 4pm", "Sun: Closed"],
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-muted py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-secondary font-medium mb-4 tracking-wide uppercase text-sm">
              Get In Touch
            </p>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">
              We&apos;d Love to Hear From You
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Have questions about our products, training programs, or wholesale
              opportunities? Reach out to us and we&apos;ll get back to you
              promptly.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              {contactInfo.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 h-fit">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-2">
                      {item.title}
                    </h3>
                    {item.details.map((detail) => (
                      <p key={detail} className="text-muted-foreground">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
