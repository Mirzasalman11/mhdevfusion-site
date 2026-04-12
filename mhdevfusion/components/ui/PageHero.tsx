"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, CheckCircle2 } from "lucide-react";
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: React.ReactNode;
  subtitle?: string;
  bgImage?: string;
  align?: "center" | "left";
  showBadge?: boolean;
  buttons?: {
    primary?: {
      text: string;
      action?: "link" | "modal";
      href?: string;
    };
    secondary?: {
      text: string;
      href: string;
    };
  } | null;
}

export default function PageHero({
  title,
  subtitle,
  bgImage = "/mainBg.jpeg",
  align = "center",
  showBadge = false,
  buttons
}: PageHeroProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({});
      cal("ui", { styles: { branding: { brandColor: "#000000" } }, hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  const isCenter = align === "center";

  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-slate-900/75 z-10" />
        <img
          src={bgImage}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 pb-10">
        <div className={cn(
          "flex flex-col mx-auto",
          isCenter ? "items-center text-center max-w-5xl" : "items-start text-left max-w-4xl"
        )}>
          {showBadge && (
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
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-tight"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={cn(
                "text-xl text-slate-200 mb-12 leading-relaxed",
                isCenter ? "max-w-2xl" : "max-w-3xl"
              )}
            >
              {subtitle}
            </motion.p>
          )}

          {buttons && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              {buttons.primary && (
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 h-12 md:h-14 text-base md:text-lg shadow-lg shadow-primary/20"
                  onClick={async () => {
                    if (buttons.primary?.action === "modal") {
                      const cal = await getCalApi({});
                      cal("modal", { calLink: process.env.NEXT_PUBLIC_CAL_LINK || "mhdevfusion/30min" });
                    }
                  }}
                  asChild={buttons.primary.action !== "modal"}
                >
                  {buttons.primary.action !== "modal" && buttons.primary.href ? (
                    <Link href={buttons.primary.href}>{buttons.primary.text}</Link>
                  ) : (
                    <span>{buttons.primary.text} <Calendar className="ml-2 w-5 h-5" /></span>
                  )}
                </Button>
              )}

              {buttons.secondary && (
                <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-12 md:h-14 text-base md:text-lg border-white/20 hover:bg-white/10 text-white hover:text-white bg-transparent">
                  <Link href={buttons.secondary.href}>{buttons.secondary.text}</Link>
                </Button>
              )}
            </motion.div>
          )}

          {showBadge && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={cn("mt-16 flex flex-wrap gap-8 text-sm font-medium text-slate-400", isCenter ? "justify-center" : "justify-start")}
            >
              {["Verified Expert Team", "100% Client Satisfaction", "Award Winning Agency"].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  {item}
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
