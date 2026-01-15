import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Clock, Award } from "lucide-react";

export function TrainingCTA() {
  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-secondary font-medium mb-2 tracking-wide uppercase text-sm">
              Learn From Us
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Start Your Own Organic Beauty Business
            </h2>
            <p className="text-primary-foreground/80 leading-relaxed mb-8">
              Join our comprehensive training program and learn the art of
              creating organic beauty products. From soap making to spice
              blending, we&apos;ll teach you everything you need to start your
              own successful business.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-3">
                <GraduationCap className="h-6 w-6 text-secondary" />
                <span className="text-sm">Hands-on Training</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-secondary" />
                <span className="text-sm">Flexible Schedule</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="h-6 w-6 text-secondary" />
                <span className="text-sm">Certificate</span>
              </div>
            </div>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              <Link href="/training">
                Explore Training Programs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="relative">
            <div className="aspect-video relative rounded-2xl overflow-hidden">
              <Image
                src="/organic-soap-making-training-class-workshop-africa.jpg"
                alt="Turah Organics training program"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
