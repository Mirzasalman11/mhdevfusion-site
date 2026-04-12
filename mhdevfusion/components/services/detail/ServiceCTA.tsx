"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ServiceCTAProps {
  serviceTitle: string;
}

export default function ServiceCTA({ serviceTitle }: ServiceCTAProps) {
  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="container mx-auto px-6 text-center max-w-4xl">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Transform Your Business?</h2>
        <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Let's discuss how our {serviceTitle} services can help you achieve your goals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 rounded-full">
            <Link href="/contact">Start Your Project</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white text-black text-lg px-8 py-6 rounded-full">
            <Link href="/case-studies">View Our Work</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
