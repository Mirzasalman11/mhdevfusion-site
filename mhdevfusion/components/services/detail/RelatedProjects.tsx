"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { Button } from "@/components/ui/button";

// Defining a minimal interface for Project based on usage
interface Project {
  id: string;
  meta: {
    title: string;
  };
  overview: {
    summary: string;
  };
  categories?: string[];
  images?: {
    cover?: string;
  };
}

interface RelatedProjectsProps {
  projects: Project[];
}

export default function RelatedProjects({ projects }: RelatedProjectsProps) {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Related Projects</h2>
            <p className="text-muted-foreground">See what we've built for others.</p>
          </div>
          <Link href="/case-studies" className="hidden md:flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
            View All Projects <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 group h-full flex flex-col pb-6 !pt-0">
                <div className="relative aspect-video w-full overflow-hidden">
                  <PlaceholderImage
                    src={project.images?.cover || '/placeholder.jpg'}
                    alt={project.meta.title}
                    fill
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <Link href={`/case-studies/${project.id}`} className="pointer-events-auto">
                      <span className="text-white font-medium px-4 py-2 border border-white/30 rounded-full backdrop-blur-sm hover:bg-white/20 transition-colors">
                        View Case Study
                      </span>
                    </Link>
                  </div>
                </div>
                <CardHeader>
                  <div className="text-sm text-primary font-light tracking-wider uppercase mb-2">{project.categories?.[0]}</div>
                  <CardTitle className="text-xl">{project.meta.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{project.overview.summary}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Button variant="outline" asChild>
            <Link href="/case-studies">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
