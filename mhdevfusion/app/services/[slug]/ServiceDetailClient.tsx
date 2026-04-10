"use client";

import { use } from "react";
import { services, faqs } from "@/lib/data";
import { projects } from "@/lib/data/projects";
import { notFound } from "next/navigation";
import FAQSection from "@/components/ui/FAQSection";
import PageHero from "@/components/ui/PageHero";
import KeyFeatures from "@/components/services/KeyFeatures";
import ServiceOverview from "@/components/services/detail/ServiceOverview";
import ServiceProcess from "@/components/services/detail/ServiceProcess";
import RelatedProjects from "@/components/services/detail/RelatedProjects";
import ServiceCTA from "@/components/services/detail/ServiceCTA";

export default function ServiceDetailClient({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const service = services.find((s) => s.id === slug);

  if (!service) {
    notFound();
  }

  // Filter projects based on service category
  const filteredProjects = projects.filter((p) => {
    return p.categories?.some((cat) => {
      // Exact match with Service Title
      if (cat === service.title) return true;
      // Handle known variations (e.g. AI Services vs AI Development)
      if (service.id === 'ai-services' && cat === 'AI Services') return true;
      return false;
    });
  });

  const relatedProjects = filteredProjects.length > 0 ? filteredProjects.slice(0, 3) : projects.slice(0, 3);

  return (
    <>
      <main className="min-h-screen bg-muted">
        {/* Hero Section */}
        <PageHero
          title={service.title}
          subtitle={service.desc}
          bgImage={service.image}
          align="center"
        />

        {/* Detailed Overview */}
        <ServiceOverview service={service} />

        {/* Key Features */}
        <KeyFeatures features={service.keyFeatures} serviceTitle={service.title} />

        {/* Our Process */}
        <ServiceProcess process={service.process} />

        {/* Related Projects */}
        <RelatedProjects projects={relatedProjects} />

        {/* FAQ Section */}
        <FAQSection
          title="Frequently Asked"
          titleHighlight="Questions"
          description={`Find answers to common questions about our ${service.title} services.`}
          items={service.faqs || faqs}
          showLink={false}
        />

        {/* CTA Section */}
        <ServiceCTA serviceTitle={service.title} />

      </main>
    </>
  );
}
