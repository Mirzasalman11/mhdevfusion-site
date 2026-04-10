"use client";

import { services, processOverview } from "@/lib/data";
import { projects } from "@/lib/data/projects";
import Testimonials from "@/components/home/Testimonials";
import Link from "next/link";
import CTASection from "@/components/ui/CTASection";

import PageHero from "@/components/ui/PageHero";
import ServiceCard from "@/components/services/ServiceCard";
import ProjectCard from "@/components/services/ProjectCard";

import { useState, useEffect } from "react";

export default function ServicesClient() {
  const [featuredProjects, setFeaturedProjects] = useState(projects.slice(0, 3));

  useEffect(() => {
    // Randomize projects on client-side mount
    const shuffled = [...projects].sort(() => 0.5 - Math.random());
    setFeaturedProjects(shuffled.slice(0, 3));
  }, []);

  return (
    <>
      <PageHero
        title={<>Our <span className="text-primary">Services</span></>}
        subtitle="We offer a comprehensive suite of digital solutions to help your business thrive in the modern age."
        bgImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
        align="center"
      />

      <main className="pb-16 bg-muted min-h-screen">
        <section className="container mx-auto px-6 py-12">
          {/* Title content removed, keeping for grid */}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <ServiceCard
                key={s.id}
                id={s.id}
                title={s.title}
                desc={s.desc}
                icon={s.icon}
                index={i}
              />
            ))}
          </div>
        </section>

        {/* Process Overview */}
        <section className="py-20 bg-slate-950 text-white">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Process</h2>
              <p className="text-slate-400 leading-relaxed">How we bring your vision to life.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processOverview.map((step, i) => (
                <div key={i} className="relative">
                  <div className="text-6xl font-bold text-white mb-4 opacity-90">{step.step}</div>
                  <h3 className="text-xl font-bold mb-3 text-blue-500">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Work</h2>
              <p className="text-muted-foreground font-lg">Success stories from our portfolio.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, i) => (
                <ProjectCard key={i} project={project} index={i} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                View All Case Studies
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials />

        <CTASection />
      </main>
    </>
  );
}
