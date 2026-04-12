"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface ServiceOverviewProps {
  service: {
    title: string;
    desc: string;
    details: string;
    techStack?: string[];
  };
}

export default function ServiceOverview({ service }: ServiceOverviewProps) {
  return (
    <section className="py-20 container mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="prose prose-lg max-w-none text-muted-foreground"
        >
          <h2 className="text-3xl font-bold text-foreground mb-6">Overview</h2>
          <p className="text-lg leading-relaxed mb-8">{service.details}</p>

          <div className="bg-card p-8 rounded-2xl border border-border shadow-sm">
            <h3 className="text-xl font-bold text-foreground mb-4">Why Choose Our {service.title}?</h3>
            <ul className="space-y-4">
              {[
                "Proven track record of success",
                "Dedicated team of experts",
                "Customized strategies for your business",
                "Transparent reporting and analytics"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-foreground mb-8">Technologies We Use</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {service.techStack?.map((tech, i) => (
              <div
                key={i}
                className="bg-card p-4 rounded-xl border border-border shadow-sm flex items-center justify-center text-center font-medium text-muted-foreground hover:border-primary/50 hover:shadow-md transition-all"
              >
                {tech}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
