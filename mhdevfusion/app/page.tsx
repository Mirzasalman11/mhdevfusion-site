import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Services from "@/components/home/Services";
import Stats from "@/components/home/Stats";
import FAQ from "@/components/home/FAQ";
// import BlogPreview from "@/components/home/BlogPreview";
import Testimonials from "@/components/home/Testimonials";
import CalInline from "@/components/CalInline";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MHDEVFUSION Agency | Transform Ideas Into Digital Success",
  description: "Grow your business with MHDEVFUSION Agency! Expert web, mobile, AI & marketing solutions designed to boost visibility, engagement & results.",
  keywords: "digital agency, web & app development, AI solutions, marketing strategies, business growth, online success",
};

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      <Services />
      <Stats />
      <FAQ />
      <Testimonials />
      <CalInline />
      {/* <BlogPreview /> */}
    </div>
  );
}
