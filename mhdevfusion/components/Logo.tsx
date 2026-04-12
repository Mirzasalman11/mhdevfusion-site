"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string; // Container class
  textClassName?: string; // Text class
  iconClassName?: string; // Icon class
  showText?: boolean; // Toggle text visibility (useful for mobile if needed, though usually always shown)
  isFooter?: boolean; // Prop to adjust styling for footer context if needed
  forceWhite?: boolean; // Force white text (e.g. for transparent header)
}

export default function Logo({
  className,
  textClassName,
  iconClassName,
  showText = true,
  isFooter = false,
  forceWhite = false
}: LogoProps) {
  const shouldUseWhite = isFooter || forceWhite;

  return (
    <Link
      href="/"
      className={cn("flex items-center gap-3 group", className)}
    >
      {/* Logo Icon */}
      <div
        className={cn(
          "relative transition-transform duration-300",
          isFooter
            ? "w-12 h-12 drop-shadow-sm group-hover:drop-shadow-md"
            : "w-12 h-12 group-hover:scale-105",
          iconClassName
        )}
      >
        <img
          src="/logo.png"
          alt="MHDEVFUSION Logo"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Logo Text */}
      {showText && (
        <div className={cn("flex justify-center items-center", isFooter ? "hidden lg:flex" : "")}>
          <h1
            className={cn(
              "text-lg font-bold leading-none tracking-[3px] logoText transition-colors",
              shouldUseWhite ? "text-white" : "text-foreground",
              textClassName
            )}
          >
            MHDEVFUSION
          </h1>
        </div>
      )}
    </Link>
  );
}
