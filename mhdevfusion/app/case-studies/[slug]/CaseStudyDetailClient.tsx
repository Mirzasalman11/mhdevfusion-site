"use client";

import { use } from "react";
import { projects } from "@/lib/data/projects";
import { notFound } from "next/navigation";

import { motion } from "framer-motion";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Share2, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import CTASection from "@/components/ui/CTASection";

export default function CaseStudyDetailClient({ params }: { params: Promise<{ slug: string }> }) {

  const { slug } = use(params);
  const project = projects.find((p) => p.meta.slug === slug || p.id === slug);

  if (!project) {
    notFound();
  }

  // Find next project for navigation
  const currentIndex = projects.findIndex(p => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <>

      <main className="bg-background min-h-screen">

        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] flex items-center border-b border-border/10">
          <PlaceholderImage
            src={project.images?.cover || project.images?.thumbnail || '/placeholder.jpg'}
            alt={project.meta.title}
            fill
            className="object-cover"
            containerClassName="absolute inset-0 w-full h-full z-0"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />

          <div className="container mx-auto px-6 relative z-10 text-white">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft size={20} />
              All Projects
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-4 text-primary font-medium mb-4">
                <span>{project.categories?.[0]}</span>
                <span>•</span>
                <span>{project.client.name}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-3xl">
                {project.meta.title}
              </h1>
              <p className="text-xl text-white/90 max-w-2xl">
                {project.overview.summary}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-24 container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-16">

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-foreground mb-6">The Challenge</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {project.overview.problem}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-foreground mb-6">Our Solution</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {project.overview.solution}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-primary/5 p-8 rounded-2xl border border-primary/10"
              >
                <h2 className="text-2xl font-bold text-primary mb-4">Key Outcome</h2>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  {project.overview.outcome}
                </p>
              </motion.div>

              {/* Gallery */}
              {project.images?.gallery && project.images.gallery.length > 0 && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold text-foreground">Project Gallery</h3>
                  <div className="grid gap-8">
                    {project.images.gallery.map((img: string, i: number) => (
                      <div key={i} className="relative aspect-video rounded-xl overflow-hidden shadow-lg border border-border/50">
                        <PlaceholderImage
                          src={img}
                          alt={`${project.meta.title} gallery ${i + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-12">
              <div className="bg-card p-8 rounded-2xl border border-border">
                <h3 className="text-lg font-bold text-foreground mb-6">Project Info</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Client</div>
                    <div className="font-medium text-foreground">{project.client.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Categories</div>
                    <div className="font-medium text-foreground">{project.categories?.join(", ")}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Services Provided</div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.services?.map((svc: string, i: number) => (
                        <span key={i} className="text-xs font-medium bg-muted border border-border px-2.5 py-1 rounded-md text-muted-foreground">
                          {svc}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Date</div>
                    <div className="font-medium text-foreground">{project.meta.date}</div>
                  </div>
                </div>
              </div>

              <div className="bg-foreground text-background p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-4">Have a similar project?</h3>
                <p className="text-muted-foreground/80 mb-6 text-sm">
                  Let's discuss how we can help you achieve similar results.
                </p>
                <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>

          </div>
        </section>

        {/* Next Project Nav */}
        <section className="border-t border-border py-20 bg-muted/30">
          <div className="container mx-auto px-6 text-center">
            <p className="text-muted-foreground uppercase tracking-widest text-sm mb-4">Next Case Study</p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-8 max-w-4xl mx-auto">
              {nextProject.meta.title}
            </h2>
            <Link
              href={`/case-studies/${nextProject.id}`}
              className="inline-flex items-center justify-center rounded-full bg-foreground px-8 py-3 text-lg font-medium text-background shadow transition-colors hover:bg-foreground/90"
            >
              View Project
            </Link>
          </div>
        </section>

        <CTASection />

      </main>
    </>
  );
}
