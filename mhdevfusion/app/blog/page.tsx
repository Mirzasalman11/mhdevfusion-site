import { blogPosts } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, User } from "lucide-react";
import CTASection from "@/components/ui/CTASection";

export default function BlogPage() {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-muted/30">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Our <span className="text-blue-600">Blog</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Insights, trends, and strategies from the world of digital.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden border-slate-100 hover:shadow-xl transition duration-300 flex flex-col">
              <div className="relative aspect-video bg-muted border-b border-border">
                <PlaceholderImage
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                  <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                </div>
                <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="link" className="px-0 text-blue-600">
                  <Link href={`/blog/${post.id}`}>Read More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
      <CTASection />
    </div>
  );
}
