"use client";

import { stats } from "@/lib/data";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState } from "react";

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

  return <span ref={ref} className="text-4xl md:text-5xl font-bold text-foreground block mb-2 tracking-tight" />;
}

export default function Journey() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <section className="py-24 bg-primary/5 dark:bg-primary/5">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          {/* Illustration Area */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex justify-center items-center"
          >
            {mounted && (
              <div className="relative w-full max-w-[250px] lg:max-w-[300px] xl:max-w-[400px] aspect-square bg-transparent">
                <Image
                  src={resolvedTheme === 'dark' ? '/about/dark.png' : '/about/light.png'}
                  alt="MHDEVFUSION Journey Illustration"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            )}
            {!mounted && (
              <div className="relative w-full max-w-sm aspect-square bg-slate-100 dark:bg-slate-800 rounded-3xl animate-pulse" />
            )}
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-handwriting text-primary text-lg mb-2 block">our Story</span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-foreground tracking-tight">Journey of a Vision</h2>

            <div className="grid md:grid-cols-2 gap-8 text-muted-foreground leading-relaxed">
              <div>
                From a small distributed team in 2020 to a remote-first studio across the UK and USA, <span className="text-primary font-semibold">MHDEVFUSION</span> was built to close the gap between product, engineering, and growth. We focus on outcomes, activation, retention, CAC/LTV, and uptime, not vanity launches.
              </div>
              <div>
                Today, our operators include ML engineers, smart-contract auditors, and performance marketers who work as one cohesive team. We model the goal, build the system, and optimize what matters.
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-background border border-border/50 rounded-3xl p-8 text-center hover:bg-primary/5 transition-colors duration-300 shadow-sm"
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}
