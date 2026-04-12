"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // wrapped in setTimeout to ensure it runs after any browser scroll restoration
    const timeoutId = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant", // Force instant jump to avoid smooth scroll conflicts
      });
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}
