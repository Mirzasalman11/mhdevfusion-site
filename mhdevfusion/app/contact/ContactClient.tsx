"use client";

import { useState } from "react";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Mail,
  MapPin,
  Clock,
  Phone,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CalInline from "@/components/CalInline";
// import BookMeetingButton from "@/components/BookMeetingButton";

const SERVICES = [
  {
    value: "web-development",
    label: "Web Development",
    description: "Modern, high-performance websites.",
  },
  {
    value: "app-development",
    label: "App Development",
    description: "Native and cross-platform mobile applications.",
  },
  {
    value: "ai-services",
    label: "AI Development and Services",
    description: "Machine learning and automation solutions.",
  },
  {
    value: "digital-marketing",
    label: "Digital Marketing",
    description: "Strategic marketing campaigns to grow your brand online.",
  },
  {
    value: "seo",
    label: "Search Engine Optimization",
    description: "Improve rankings & organic traffic.",
  },
];

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [open, setOpen] = useState(false);

  const validateForm = () => {
    console.log('Form data validation:', formData);
    const isValid = 
      formData.name.trim() &&
      formData.email.trim() &&
      formData.phone.trim() &&
      formData.service.trim() &&
      formData.message.trim();
    console.log('Validation result:', isValid);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("success");
      setOpen(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
      });

      setTimeout(() => {
        setOpen(false);
        setStatus("idle");
      }, 3000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <>


      <main className="min-h-screen bg-background">
        {/* HERO */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6 text-primary-foreground"
            >
              Let’s Start a{" "}
              <span className="text-white/90 decoration-4">Conversation</span>
            </motion.h1>
            <p className="text-lg md:text-xl text-primary-foreground/80">
              Tell us about your idea and we’ll help bring it to life.
            </p>
          </div>
        </section>

        {/* CONTENT */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid gap-10 lg:grid-cols-3 max-w-6xl mx-auto">
            {/* CONTACT INFO */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-secondary text-secondary-foreground p-8 rounded-2xl h-full shadow-lg flex flex-col justify-between">
                <div className="space-y-8 divide-y divide-border/20">
                  <h3 className="text-xl font-semibold pb-5">
                    Contact Information
                  </h3>

                  <div className="pt-6 space-y-6">
                    <InfoItem
                      icon={<Phone />}
                      title="Phone"
                      value="+92 328 8482486"
                      link="tel:+923288482486"
                    />
                    <InfoItem
                      icon={<Mail />}
                      title="Email"
                      value="mhdevfusion@gmail.com"
                      link="mailto:mhdevfusion@gmail.com"
                    />
                    <InfoItem
                      icon={<MapPin />}
                      title="Address"
                      value="31 Rue Didot, Paris 75014, France"
                    />
                    <InfoItem
                      icon={<Clock />}
                      title="Working Hours"
                      value="Mon – Fri, 9am – 6pm CET"
                    />
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mt-10">
                  We usually respond within 24 hours.
                </p>
              </div>
            </motion.div>

            {/* FORM */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2"
            >
              <Card className="shadow-lg">
                <CardContent className="p-8 md:px-10 py-6">
                  <p className="text-muted-foreground mb-10 max-w-lg italic">
                    Have questions or need support? Our team is ready to help. Drop us a message, and we&apos;ll get back to you shortly.
                  </p>
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            name: e.target.value,
                          })
                        }
                        className="bg-background"
                      />
                      <Input
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: e.target.value,
                          })
                        }
                        className="bg-background"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phone: e.target.value,
                          })
                        }
                        className="bg-background"
                      />
                      <Input
                        placeholder="Company Name"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            company: e.target.value,
                          })
                        }
                        className="bg-background"
                      />
                    </div>

                    <Select
                      value={formData.service}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          service: value,
                        })
                      }
                    >
                      <SelectTrigger className="h-12 text-left bg-background text-foreground border-input">
                        <SelectValue placeholder="Select a Service" />
                      </SelectTrigger>
                      <SelectContent className="bg-background text-foreground border-border">
                        {SERVICES.map((s) => (
                          <SelectItem key={s.value} value={s.value} className="focus:bg-accent focus:text-accent-foreground">
                            <div className="flex flex-col">
                              <span className="font-medium">
                                {s.label}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {s.description}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Textarea
                      rows={20}
                      placeholder="Tell us about your project..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          message: e.target.value,
                        })
                      }
                      className="bg-background h-40 resize-none"
                    />

                    <Button
                      type="submit"
                      disabled={status === "loading"}
                      className="h-12 w-full sm:w-auto px-10 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {status === "loading"
                        ? "Sending..."
                        : "Send Message"}
                      <Send className="ml-2" size={18} />
                    </Button>

                    {status === "error" && (
                      <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-lg">
                        <AlertCircle size={16} />
                        Please fill all fields correctly.
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* MAP SECTION */}
        <section className="w-full h-[400px] bg-muted">
          <iframe
            title="MHDEVFUSION Location"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src="https://maps.google.com/maps?q=31%20Rue%20Didot%2C%20Paris%2C%20France&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="filter grayscale hover:grayscale-0 transition-all duration-300"
          ></iframe>
        </section>
        {/* CAL.COM INLINE */}
        <CalInline />
      </main>

      {/* SUCCESS MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md text-center">
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center gap-4">
              <CheckCircle size={52} className="text-green-500" />
              Message Sent!
            </DialogTitle>
          </DialogHeader>
          <p className="text-slate-600">
            Thanks for reaching out. We’ll contact you shortly.
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}

/* ---------------- Helper Component ---------------- */
function InfoItem({
  icon,
  title,
  value,
  link,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  link?: string;
}) {
  return (
    <div className="flex gap-4 items-start">
      <div className="text-primary">{icon}</div>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        {link ? (
          <a
            href={link}
            className="font-medium hover:text-primary"
          >
            {value}
          </a>
        ) : (
          <p className="font-medium">{value}</p>
        )}
      </div>
    </div>
  );
}
