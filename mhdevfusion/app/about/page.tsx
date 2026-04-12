import { team, processOverview, benefits } from "@/lib/data";
import Image from "next/image";
import { CheckCircle2, ChevronRight, Zap, Target, Users, Search, PenTool, Code, ShieldCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import CTASection from "@/components/ui/CTASection";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Principles from "@/components/about/Principles";
import Journey from "@/components/about/Journey";
import PageHero from "@/components/ui/PageHero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About MHDEVFUSION | Driving Innovation & Business Growth",
  description: "MHDEVFUSION’s mission is to help businesses of all sizes deliver innovative web, mobile, AI, and marketing solutions tailored to customer needs. Learn about our company here.",
  keywords: "MHDEVFUSION, digital agency, business growth, innovation, web development, AI solutions, digital marketing",
};

const values = [
  {
    title: "Transparency",
    desc: "We believe in complete honesty and clear communication, with full visibility into progress and no unexpected surprises throughout the project."
  },
  {
    title: "Innovation",
    desc: "We embrace complexity and confidently tackle challenging initiatives that others shy away from."
  },
  {
    title: "Agility",
    desc: "We work quickly and adapt effortlessly, collaborating closely with you to prioritize effectively and deliver meaningful results early and consistently."
  },
  {
    title: "Evolution",
    desc: "For us, go-live is just the beginning. We continuously measure, improve, and optimize to drive sustained success over time."
  }
];

export default function AboutPage() {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero */}
      <div>
        <PageHero
          title={<>About <span className="text-primary">MHDEVFUSION</span></>}
          subtitle="We are a team of passionate creators, developers, and strategists dedicated to transforming your digital presence."
          bgImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000"
          align="center"
          buttons={{
            primary: { text: "Explore More", href: "#explore", action: "link" }
          }}
        />

        {/* Story / Journey Section */}
        <div id="explore">
          <Journey />
          {/* Principles Section */}
          <Principles />
        </div>
      </div>
      {/* Process Section - Redesigned Zigzag/Timeline */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">Transforming IT, One Step at a Time</h2>
            <p className="text-muted-foreground text-lg">
              Every business is unique, and so are our solutions. Here’s how we tailor our expertise to your needs.
            </p>
          </div>

          <div className="space-y-24 relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-border/50 hidden lg:block rounded-full" />

            {processOverview.map((item, i) => {
              // Icons map for process steps
              const icons = [Search, PenTool, Code, ShieldCheck];
              const StepIcon = icons[i] || Target;

              return (
                <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center relative`}>

                  {/* Text Content */}
                  <div className={`flex-1 space-y-6 ${i % 2 === 0 ? 'lg:text-right lg:items-end' : 'lg:text-left lg:items-start'} flex flex-col`}>

                    <div className={`flex items-center gap-4 mb-2 ${i % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg relative z-10 shrink-0 ${i === 0 ? 'bg-emerald-500 shadow-emerald-500/20' :
                        i === 1 ? 'bg-blue-500 shadow-blue-500/20' :
                          i === 2 ? 'bg-purple-500 shadow-purple-500/20' :
                            'bg-orange-500 shadow-orange-500/20'
                        }`}>
                        <StepIcon className="w-6 h-6" />
                      </div>
                      <span className={`text-xl font-bold ${i === 0 ? 'text-emerald-500' :
                        i === 1 ? 'text-blue-500' :
                          i === 2 ? 'text-purple-500' :
                            'text-orange-500'
                        }`}>
                        {item.step}.
                      </span>
                    </div>

                    <h3 className="text-3xl font-bold text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {item.desc}
                    </p>

                    <div className={`bg-muted/50 rounded-xl p-6 border border-border/50 max-w-md ${i % 2 === 0 ? 'self-end' : 'self-start'}`}>
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Target className="w-4 h-4 text-primary" /> Outcome:
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {item.outcome}
                      </p>
                    </div>
                  </div>

                  {/* Image Content */}
                  <div className="flex-1 relative w-full">
                    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-border group">
                      <Image
                        src={item.image || "/placeholder.jpg"}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Decorative Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                    </div>

                    {/* Decorative Background Blob */}
                    <div className={`absolute -z-10 w-[80%] h-[80%] rounded-full blur-3xl opacity-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${i === 0 ? 'bg-emerald-500' :
                      i === 1 ? 'bg-blue-500' :
                        i === 2 ? 'bg-purple-500' :
                          'bg-orange-500'
                      }`} />
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-10 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800&h=1000"
              alt="Team Collaboration"
              fill
              className="object-cover"
            />
            <div className="absolute top-8 left-8 bg-background/90 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2 shadow-lg border border-border/50">
              <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-semibold text-foreground">Benefits</span>
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-8 leading-tight">
              Delivering more than just Solutions - We offer Transformation
            </h2>

            <div className="space-y-8">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-foreground mb-2">{benefit.title}</h4>
                    <p className="text-muted-foreground text-lg">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section >
      <CTASection />
    </div >
  );
}
