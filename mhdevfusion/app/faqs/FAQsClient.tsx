"use client";

import { motion } from "framer-motion";
import { services, faqs } from "@/lib/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQsClient() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* HERO */}
      <section className="bg-primary text-primary-foreground py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-0" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Frequently Asked <span className="text-white/90">Questions</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto"
          >
            Find answers to common questions about our services, process, and how we can help your business grow.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* GENERAL FAQS */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="bg-card rounded-2xl p-8 shadow-lg border border-border"
          >
            <motion.h2 variants={item} className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="bg-primary/10 text-primary p-2 rounded-lg">🚀</span>
              General Questions
            </motion.h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={`general-${index}`} value={`general-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-medium hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* SERVICE SPECIFIC FAQS */}
          {services.map((service, sIndex) => {
            if (!service.faqs || service.faqs.length === 0) return null;
            const Icon = service.icon;

            return (
              <motion.div
                key={service.id}
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="bg-card rounded-2xl p-8 shadow-lg border border-border"
              >
                <motion.h2 variants={item} className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <div className="bg-secondary/50 p-2 rounded-lg text-primary">
                    <Icon size={24} />
                  </div>
                  {service.title}
                </motion.h2>
                <Accordion type="single" collapsible className="w-full">
                  {service.faqs.map((faq, fIndex) => (
                    <AccordionItem key={`${service.id}-${fIndex}`} value={`${service.id}-${fIndex}`}>
                      <AccordionTrigger className="text-left text-lg font-medium hover:text-primary transition-colors">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            );
          })}

        </div>
      </div>
    </main>
  );
}
