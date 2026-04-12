"use client";

import { motion } from "framer-motion";

interface ServiceProcessProps {
  process?: {
    title: string;
    desc: string;
  }[];
}

export default function ServiceProcess({ process }: ServiceProcessProps) {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Process</h2>
          <p className="text-muted-foreground">A systematic approach to ensuring high-quality delivery.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {process?.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group"
            >
              <div className="bg-muted p-8 rounded-2xl border border-border h-full hover:bg-primary/10 hover:border-primary/30 transition-all duration-300">
                <div className="text-5xl font-bold text-muted-foreground/20 mb-6 group-hover:text-primary/30 transition-colors">
                  0{i + 1}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
