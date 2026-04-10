import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KeyFeature {
  title: string;
  desc: string;
  icon: LucideIcon;
}

interface KeyFeaturesProps {
  features: KeyFeature[];
  serviceTitle: string;
}

export default function KeyFeatures({ features, serviceTitle }: KeyFeaturesProps) {
  if (!features || features.length === 0) return null;

  return (
    <section className="py-24 relative overflow-hidden bg-slate-550">
      {/* Background Elements */}
      <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-100 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] opacity-100 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="bg-background rounded-[2.5rem] shadow-2xl border border-border p-8 md:p-16 relative overflow-hidden">
          {/* Decorative Corner Blob inside card for continuity if needed, or keeping it clean */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary/50 via-primary to-primary/50 opacity-20" />

          <div className="text-center max-w-4xl mx-auto mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase mb-4">
              {serviceTitle}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
              Key Features of <span className="text-primary">Successful {serviceTitle} Apps</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              A successful {serviceTitle.toLowerCase()} combines easy-to-use design, smooth performance, and strong security to give users a great experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-12 max-w-4xl mx-auto">
            {features.map((feature, idx) => (
              <div key={idx} className="flex flex-col items-start text-left group">
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
