"use client";

import { projects } from "@/lib/data/projects";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bot, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function AIProjects() {
  const aiProjects = projects.filter((p) =>
    p.categories.includes("AI Development and Services")
  );

  return (
    <section className="py-20 relative overflow-hidden bg-slate-50 dark:bg-slate-900/50">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium mb-6"
            >
              <Sparkles size={14} />
              <span>Artificial Intelligence</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 mb-6"
            >
              Building the Future with AI
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground"
            >
              Explore our latest AI-driven solutions, from intelligent voice assistants to privacy-focused search engines.
            </motion.p>
          </div>
          <div className="hidden md:block">
            <Button variant="outline" asChild>
              <Link href="/case-studies">View All Projects</Link>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aiProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white dark:bg-slate-800/80 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/50 hover:border-blue-500/50 transition-colors shadow-lg hover:shadow-xl"
            >
              {/* Image */}
              <div className="aspect-video relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                <Image
                  src={project.images.thumbnail}
                  alt={project.meta.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <Link href={`/case-studies/${project.id}`} className="text-white font-medium inline-flex items-center gap-2 hover:gap-3 transition-all">
                    View Case Study <ArrowRight size={18} />
                  </Link>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.services.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-500 transition-colors">
                  <Link href={`/case-studies/${project.id}`}>
                    {project.meta.title}
                  </Link>
                </h3>

                <p className="text-muted-foreground text-sm line-clamp-3 mb-6">
                  {project.overview.summary}
                </p>
              </div>
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
