import { Metadata } from 'next';
import FAQsClient from './FAQsClient';

export const metadata: Metadata = {
  title: "FAQs | MHDEVFUSION Answers Your Web, App & Marketing Questions",
  description: "Find answers to common questions about MHDEVFUSION’s web, app, AI, and marketing services. Get the insights you need to make informed decisions.",
  keywords: "FAQs, MHDEVFUSION questions, web development FAQs, app development FAQs, AI services answers, digital marketing questions, business solutions",
};

export default function FAQsPage() {
  return <FAQsClient />;
}
