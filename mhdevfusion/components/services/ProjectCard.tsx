"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
// Define minimal Project interface needed
interface Project {
  id: string;
  meta: { title: string };
  categories: string[];
  overview: { summary: string };
  images: { cover?: string };
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="overflow-hidden h-full border-none shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col">
        <div className="relative aspect-video w-full overflow-hidden border-b border-border">
          <PlaceholderImage
            src={project.images?.cover || '/placeholder.jpg'}
            alt={project.meta.title}
            fill
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            containerClassName="h-full"
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
  );
}
