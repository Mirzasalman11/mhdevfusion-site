"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import Logo from "@/components/Logo";
import { Menu, X, Mail, MapPin, ChevronDown } from "lucide-react";
import { services } from "@/lib/data";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";

/* ================= ROUTE LOGIC ================= */

const isTransparentRoute = (pathname: string) => {
  return pathname === "/";
};

/* ================= COMPONENT ================= */

export default function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();

  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  /* ---------- HEADER BEHAVIOR (SCROLL ONLY) ---------- */

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    // Hide header on scroll down
    if (latest > previous && latest > 120) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    // Solid background after scroll
    setScrolled(latest > 50);
  });

  /* ---------- ROUTE STYLING (NO LAYOUT IMPACT) ---------- */

  const isTransparentPage = isTransparentRoute(pathname);

  const navTextClass =
    isTransparentPage && !scrolled
      ? "text-white hover:text-white/80"
      : "text-foreground hover:text-primary";

  /* ---------- CLOSE MOBILE MENU ON ROUTE CHANGE ---------- */

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  /* ---------- NAV LINKS ---------- */

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Case Studies", href: "/case-studies" },
  ];

  return (
    <>
      {/* ================= HEADER ================= */}
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-screen",
          scrolled
            ? "bg-background/80 backdrop-blur-md shadow-sm border-b border-border"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          {/* ---------- LOGO ---------- */}
          <Logo forceWhite={isTransparentPage && !scrolled} />

          {/* ---------- DESKTOP NAV ---------- */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              if (link.name === "Services") {
                return (
                  <div key={link.name} className="relative group">
                    <Link
                      href={link.href}
                      className={cn(
                        "text-sm font-medium flex items-center gap-1 py-4 relative",
                        navTextClass
                      )}
                    >
                      Services
                      <ChevronDown
                        size={14}
                        className="transition-transform group-hover:rotate-180"
                      />
                      <span className="absolute bottom-3 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                    </Link>

                    {/* Dropdown */}
                    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      <div className="w-64 bg-card border border-border rounded-xl shadow-xl p-2">
                        {services.map((service) => (
                          <Link
                            key={service.id}
                            href={`/services/${service.id}`}
                            className="block px-4 py-3 rounded-lg hover:bg-muted transition"
                          >
                            <div className="text-sm font-medium text-foreground">
                              {service.title}
                            </div>
                            <div className="text-xs text-muted-foreground line-clamp-1">
                              {service.desc}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium py-2 relative group",
                    navTextClass
                  )}
                >
                  {link.name}
                  <span className="absolute bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </Link>
              );
            })}
          </nav>

          {/* ---------- CTA & MOBILE ---------- */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            <Button
              asChild
              className="hidden md:inline-flex rounded-full px-6"
            >
              <Link href="/contact">Get a Quote</Link>
            </Button>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className={cn("md:hidden p-2", navTextClass)}
              aria-label="Open mobile menu"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="fixed inset-0 z-[60] bg-background md:hidden flex flex-col"
          >
            {/* Top */}
            <div className="p-6 flex justify-between items-center border-b">
              <span className="font-bold text-lg">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={28} />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 p-6 flex flex-col gap-6">
              {navLinks.map((link) => {
                if (link.name === "Services") {
                  return (
                    <div key={link.name}>
                      <button
                        onClick={() =>
                          setMobileServicesOpen(!mobileServicesOpen)
                        }
                        className="flex justify-between w-full text-2xl font-bold"
                      >
                        Services
                        <ChevronDown
                          className={cn(
                            "transition-transform",
                            mobileServicesOpen && "rotate-180"
                          )}
                        />
                      </button>

                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden mt-4 pl-4 flex flex-col gap-3"
                          >
                            {services.map((service) => (
                              <Link
                                key={service.id}
                                href={`/services/${service.id}`}
                                className="text-muted-foreground hover:text-primary"
                              >
                                {service.title}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-2xl font-bold"
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
