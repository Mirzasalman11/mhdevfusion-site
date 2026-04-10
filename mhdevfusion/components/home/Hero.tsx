"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Calendar } from "lucide-react";
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

import Image from "next/image";

export default function Hero() {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-slate-900/70 z-10" />
        <Image
          src="/mainBg.jpeg"
          alt="Office Background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={85}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 pb-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-300 text-sm font-medium mb-8 border border-blue-500/20"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            #1 Digital Agency in France & Pakistan
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-tight"
          >
            Transforming Ideas into <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">
              Digital Reality
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-slate-200 mb-12 max-w-2xl leading-relaxed"
          >
            We are MHDEVFUSION. A full-service agency delivering smart, creative, and result-driven solutions to help your business grow online.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 h-14 text-lg shadow-lg shadow-primary/20"
              onClick={async () => {
                const cal = await getCalApi({});
                cal("modal", { calLink: process.env.NEXT_PUBLIC_CAL_LINK || "mhdevfusion/30min" });
              }}
            >
              Book Meeting <Calendar className="ml-2 w-5 h-5" />
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg border-white/20 hover:bg-white/10 text-white hover:text-white bg-transparent">
              <Link href="/case-studies">View Our Work</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 flex flex-wrap justify-center gap-8 text-sm font-medium text-slate-400"
          >
            {["Verified Expert Team", "100% Client Satisfaction", "Award Winning Agency"].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                {item}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
