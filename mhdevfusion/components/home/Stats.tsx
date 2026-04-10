"use client";

import { stats } from "@/lib/data";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 50, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toString() + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref} className="text-4xl md:text-5xl font-bold text-white block mb-2" />;
}

export default function Stats() {
  return (
    <section className="py-20 relative overflow-hidden bg-primary">
      {/* <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000"
          alt="Stats Background"
          fill
          className="object-cover opacity-20 mix-blend-overlay"
          priority
        />
      </div> */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="text-white">
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="text-blue-100 font-medium text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
