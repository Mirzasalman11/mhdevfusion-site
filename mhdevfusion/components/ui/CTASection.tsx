"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  className?: string;
}

export default function CTASection({
  title = "Ready to Transform Your Business?",
  description = "Let's discuss how we can help you achieve your digital goals with our cutting-edge solutions.",
  primaryButtonText = "Get a Quote",
  primaryButtonLink = "/contact",
  secondaryButtonText,
  secondaryButtonLink,
  className
}: CTASectionProps) {
  return (
    <section className={`py-6 md:py-12 container mx-auto px-6 ${className}`}>
      {/* 
        Using bg-slate-950 and text-white to ensure this section remains dark 
        regardless of the theme (Light/Dark mode) as per user request.
      */}
      <div className="bg-slate-950 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl text-white">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[80%] bg-blue-600/20 blur-3xl rounded-full animate-blob"></div>
          <div className="absolute bottom-[-50%] right-[-20%] w-[80%] h-[80%] bg-purple-600/20 blur-3xl rounded-full animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
            {title}
          </h2>
          <p className="text-slate-300 mb-10 text-lg md:text-xl leading-relaxed">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 h-14 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Link href={primaryButtonLink}>
                {primaryButtonText} <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            {secondaryButtonText && secondaryButtonLink && (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-white/20 text-white hover:bg-white hover:text-slate-950 text-lg px-8 h-14 rounded-full"
              >
                <Link href={secondaryButtonLink}>
                  {secondaryButtonText}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
