"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export type FAQItem = {
  question: string;
  answer: string;
};

interface FAQSectionProps {
  title: string;
  titleHighlight?: string;
  description: string;
  items: FAQItem[];
  showLink?: boolean;
}

function AccordionItem({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className={`text-lg font-semibold transition-colors ${isOpen ? "text-primary" : "text-foreground group-hover:text-primary"}`}>
          {question}
        </span>
        <span className={`p-2 rounded-full transition-colors ${isOpen ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"}`}>
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-muted-foreground leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection({ title, titleHighlight, description, items, showLink = false }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">FAQ</span>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              {title} <br />
              {titleHighlight && <span className="text-primary">{titleHighlight}</span>}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              {description}
            </p>
            {showLink && (
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8">
                <Link href="/faqs">
                  View All FAQs <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            )}
          </div>

          <div className="bg-card rounded-3xl p-8 shadow-sm border border-border">
            {items.map((faq, i) => (
              <AccordionItem
                key={i}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
