import { Metadata } from 'next';
import CaseStudiesClient from './CaseStudiesClient';

export const metadata: Metadata = {
  title: "Case Studies | MHDEVFUSION Showcases Real Business Success",
  description: "See how MHDEVFUSION has transformed businesses with web, app, AI, and marketing solutions. Explore our case studies for real results and success stories.",
  keywords: "case studies, success stories, MHDEVFUSION projects, web development results, app development case studies, AI solutions, marketing success",
};

export default function CaseStudiesPage() {
  return <CaseStudiesClient />;
}
