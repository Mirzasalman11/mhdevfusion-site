"use client";

import { projects } from "@/lib/data/projects";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

import CTASection from "@/components/ui/CTASection";
import PageHero from "@/components/ui/PageHero";

export default function CaseStudiesClient() {
  return (
    <>
      <main className="bg-background min-h-screen">
        {/* Hero Section */}
        <PageHero
          title={<>Our <span className="text-primary">Success Stories</span></>}
          subtitle="Discover how we've helped businesses transform and grow through digital innovation."
          bgImage="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop"
          align="center"
        />

        {/* Projects Grid */}
        <section className="container mx-auto px-6 py-24">
          <div className="grid gap-16 md:gap-24">
            {projects.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
              >
                <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group ${i % 2 === 1 ? 'lg:col-start-2' : ''} border border-border/50`}>
                  <PlaceholderImage
                    src={p.images?.cover || '/placeholder.jpg'}
                    alt={p.meta.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                </div>

                <div className={`${i % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-4 block">
                    {p.categories?.[0]}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                    {p.meta.title}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {p.overview.summary}
                  </p>

                  {p.overview.outcome && (
                    <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 mb-8 max-w-lg">
                      <p className="font-semibold text-primary mb-2">Key Outcome</p>
                      <p className="text-foreground/80 text-sm leading-relaxed">{p.overview.outcome}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-4 mt-8">
                    <Link
                      href={`/case-studies/${p.id}`}
                      className="inline-flex items-center gap-2 text-foreground font-medium hover:text-primary hover:gap-4 transition-all"
                    >
                      View Case Study <ArrowRight size={20} />
                    </Link>

                    {p.links?.website && (
                      <Link
                        href={p.links.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium"
                      >
                        Visit Site <ExternalLink size={16} />
                      </Link>
                    )}

                    {p.links?.appStore && (
                      <Link
                        href={p.links.appStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium"
                      >
                        Get App <ExternalLink size={16} />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        <CTASection />
      </main>
    </>
  );
}
