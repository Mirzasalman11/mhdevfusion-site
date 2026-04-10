import { services } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ServicePage() {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-slate-50">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Our <span className="text-blue-600">Services</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Comprehensive digital solutions tailored to your business needs.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s) => (
            <Card key={s.id} className="hover:shadow-xl transition duration-300 border-slate-100 flex flex-col">
              <CardHeader>
                <s.icon className="w-12 h-12 text-blue-600 mb-4" />
                <CardTitle className="text-xl">{s.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-slate-600 mb-6">{s.desc}</p>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/case-studies/${s.id}`}>View Case Studies</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 text-center">
        <div className="bg-slate-900 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve your digital goals.
          </p>
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8">
            <Link href="/contact">Get a Quote</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
