"use client";

import { faqs } from "@/lib/data";
import FAQSection from "@/components/ui/FAQSection";

export default function FAQ() {
  return (
    <FAQSection
      title="Frequently Asked"
      titleHighlight="Questions"
      description="Find answers to common questions about our services, process, and how we can help your business grow."
      items={faqs}
      showLink={true}
    />
  );
}
