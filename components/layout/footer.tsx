import Link from "next/link";
import {
  Leaf,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const footerLinks = {
  shop: [
    { name: "Organic Soaps", href: "/products?category=organic-soaps" },
    { name: "Organic Spices", href: "/products?category=organic-spices" },
    { name: "Aphrodisiacs", href: "/products?category=aphrodisiacs" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Training Programs", href: "/training" },
    { name: "Contact", href: "/contact" },
  ],
  support: [
    { name: "Shipping Info", href: "/shipping" },
    { name: "Returns Policy", href: "/returns" },
    { name: "FAQs", href: "/faqs" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="h-8 w-8" />
              <span className="font-serif text-xl font-bold">
                Turah Organics
              </span>
            </Link>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Handcrafted organic beauty products from Nigeria. Made with love
              using traditional African ingredients.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="hover:text-secondary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="hover:text-secondary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="hover:text-secondary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">
              Newsletter
            </h3>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Subscribe to get 10% off your first order and exclusive updates.
            </p>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Button variant="secondary" className="shrink-0">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap items-center gap-4 text-sm text-primary-foreground/60">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> Lagos, Nigeria
              </span>
              <span className="flex items-center gap-1">
                <Phone className="h-4 w-4" /> +234 XXX XXX XXXX
              </span>
              <span className="flex items-center gap-1">
                <Mail className="h-4 w-4" /> hello@turahorganics.com
              </span>
            </div>
            <p className="text-sm text-primary-foreground/60">
              © {new Date().getFullYear()} Turah Organics Beauty Ventures. All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
