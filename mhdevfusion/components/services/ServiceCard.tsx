"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  id: string;
  title: string;
  desc: string;
  icon: LucideIcon; // Adjust based on your icon type
  index: number;
}

export default function ServiceCard({ id, title, desc, icon: Icon, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/services/${id}`}>
        <Card className="h-full hover:shadow-xl transition-all duration-300 border-border hover:-translate-y-1 group bg-card cursor-pointer">
          <CardHeader>
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
              <Icon className="w-7 h-7" />
            </div>
            <CardTitle className="text-xl font-bold text-foreground">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{desc}</p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
