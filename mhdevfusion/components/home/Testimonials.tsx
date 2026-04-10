"use client";

import { motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

// Testimonials Data
const testimonials = [
  {
    content: "MHDEVFUSION transformed our website into a modern, user-friendly platform that truly represents our brand. Their attention to detail and dedication to quality are unmatched.",
    name: "James Thompson",
    role: "Marketing Head",
    company: "NextGen Enterprises"
  },
  {
    content: "From discovery to implementation, MHDEVFUSION guided us at every step. Their data-driven approach helped us reach new customers and increase conversions significantly.",
    name: "Olivia Martin",
    role: "Founder",
    company: "EcoStyle"
  },
  {
    content: "The team at MHDEVFUSION is highly professional and creative. They delivered our project on time, and the results have positively impacted our business growth and online engagement.",
    name: "Harshell Modi",
    role: "Director",
    company: "Technova Solutions"
  },
  {
    content: "Working with MHDEVFUSION was a game-changer for our business. Their team understood our needs from day one and delivered a solution that exceeded our expectations.",
    name: "Ayesha Khan",
    role: "CEO",
    company: "BrightTech Solutions"
  },
  {
    content: "MHDEVFUSION's expertise in digital strategy and development is outstanding. Their collaborative approach and commitment to excellence make them a reliable partner.",
    name: "Sophia Johnson",
    role: "COO",
    company: "Stellar Ventures"
  }
];

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-4"
            >
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Client Success Stories</h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              Don't just take our word for it. Here's what our partners have to say about working with us.
            </motion.p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 border-border/50 hover:bg-muted"
              onClick={scrollPrev}
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous slide</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 border-border/50 hover:bg-muted"
              onClick={scrollNext}
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next slide</span>
            </Button>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-8 py-4"> {/* Negative margin to handle gap */}
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-8 min-w-0" // Slide width & padding for gap
              >
                <div className="bg-card text-card-foreground p-10 rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-all relative flex flex-col justify-between h-full min-h-[320px]">
                  {/* Quote Icon */}
                  <div className="mb-6">
                    <Quote className="w-12 h-12 text-blue-100 fill-blue-100 dark:text-blue-900/30 dark:fill-blue-900/30" />
                  </div>

                  <p className="text-lg leading-relaxed text-foreground/80 mb-8 italic">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center gap-4 mt-auto">
                    <div className="flex flex-col">
                      <h4 className="font-bold text-foreground text-base uppercase tracking-wide">{testimonial.name}</h4>
                      <span className="text-sm text-primary font-medium">{testimonial.role}, {testimonial.company}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
