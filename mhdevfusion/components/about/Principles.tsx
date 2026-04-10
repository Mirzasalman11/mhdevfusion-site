"use client";

import { motion } from "framer-motion";
import { Search, Star, Users } from "lucide-react";

const principles = [
  {
    title: "Innovation",
    icon: Search,
    desc: "We test fast and learn faster, RAG, agents, on-chain automations, always tied to a business metric."
  },
  {
    title: "Integrity",
    icon: Star,
    desc: "Security, privacy, and compliance by default. Audits, monitoring, and data governance from day one."
  },
  {
    title: "Collaboration",
    icon: Users,
    desc: "One integrated team with clear comms, shared dashboards, and transparent delivery."
  }
];

export default function Principles() {
  return (
    <section className="relative">
      {/* Split Background */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-primary/5 dark:bg-primary/5 transition-colors duration-300 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-slate-950 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-background rounded-3xl p-8 md:p-16 shadow-2xl border border-border/50 text-foreground"
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-handwriting text-muted-foreground mb-2 block font-medium tracking-wider uppercase">Our Values</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
              Principles That Drive Every Action
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Our core values aren't just words on a page; they are the principles that anchor our decisions, shape our strategies, and define how we interact with our clients and each other.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {principles.map((p, i) => (
              <div key={i} className="flex flex-col items-start gap-4">
                <div className="mb-2">
                  <p.icon className="w-8 h-8 text-foreground" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-foreground">{p.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
