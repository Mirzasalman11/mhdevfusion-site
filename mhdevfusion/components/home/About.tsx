"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const values = [
  {
    title: "Transparency",
    desc: "We believe in complete honesty and clear communication, with full visibility into progress and no unexpected surprises throughout the project."
  },
  {
    title: "Innovation",
    desc: "We embrace complexity and confidently tackle challenging initiatives that others shy away from."
  },
  {
    title: "Agility",
    desc: "We work quickly and adapt effortlessly, collaborating closely with you to prioritize effectively and deliver meaningful results early and consistently."
  },
  {
    title: "Evolution",
    desc: "For us, go-live is just the beginning. We continuously measure, improve, and optimize to drive sustained success over time."
  }
];

export default function About() {
  return (
    <section className="py-24 bg-card text-card-foreground overflow-hidden relative border-y border-border/50">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="h-0.5 w-12 bg-primary"></div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Who We Are</h2>
            <div className="h-0.5 w-12 bg-primary"></div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground font-medium"
          >
            Clients trust us for our deep product expertise, tailored approach, and unwavering focus on long-term results.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-16 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <h3 className="text-3xl font-bold mb-6 text-foreground">Why Partner With Us?</h3>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              We provide premium digital solutions with exceptional service—delivering more value at a more competitive cost.
            </p>
            <Button asChild size="lg" className="rounded-md bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 font-semibold tracking-wide uppercase text-sm shadow-md">
              <Link href="/about">
                Learn More <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>

          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-x-12 gap-y-16">
            {values.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group p-6 rounded-2xl hover:bg-muted/50 transition-colors"
              >
                <div className="absolute top-0 left-0 w-12 h-1 bg-gradient-to-r from-primary to-blue-400 rounded-full mb-6"></div>
                <h4 className="text-xl font-bold mb-4 mt-8 text-foreground group-hover:text-primary transition-colors">{item.title}</h4>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
