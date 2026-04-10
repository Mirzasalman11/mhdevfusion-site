"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlaceholderImageProps extends Omit<ImageProps, "onError" | "onLoad"> {
  containerClassName?: string;
}

export default function PlaceholderImage({
  src,
  alt,
  className,
  containerClassName,
  ...props
}: PlaceholderImageProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden bg-muted flex items-center justify-center",
        containerClassName
      )}
    >
      {!error ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={cn(
            "object-cover transition-all duration-700",
            loading ? "scale-110 blur-2xl grayscale" : "scale-100 blur-0 grayscale-0",
            className
          )}
          onLoad={() => setLoading(false)}
          onError={() => setError(true)}
          {...props}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
          <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
          <span className="text-xs opacity-75">{alt || "Image not found"}</span>
        </div>
      )}
    </div>
  );
}
