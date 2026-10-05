"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

interface SafeImageProps {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  /** Classes for the <img> itself (object-fit, hover zoom...). */
  className?: string;
}

const TINTS = [
  "from-petal via-blush to-lavender",
  "from-lavender via-petal to-blush",
  "from-blush via-paper to-petal",
];

/**
 * Fills its (relatively positioned) parent. If the photo file is missing it
 * shows a soft placeholder naming the file to add, instead of a broken image.
 */
export function SafeImage({ src, alt, sizes, priority, className }: SafeImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  // onError can fire before React hydrates, so also check the DOM node itself.
  const ref = useCallback(
    (img: HTMLImageElement | null) => {
      if (img && img.complete && img.naturalWidth === 0) setFailedSrc(src);
    },
    [src],
  );

  if (failedSrc === src) {
    const file = src.split("/").pop() ?? src;
    const tint = TINTS[src.length % TINTS.length];
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center gap-2 bg-linear-to-br p-3 text-center text-wine/70",
          tint,
        )}
      >
        <Heart className="size-6 fill-dusty/40 text-dusty" aria-hidden />
        <span className="font-display text-base italic leading-tight">Your photo goes here</span>
        <span className="max-w-full truncate text-[0.7rem] text-mauve">{file}</span>
      </div>
    );
  }

  return (
    <Image
      ref={ref}
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={src.endsWith(".svg")}
      onError={() => setFailedSrc(src)}
      className={cn("object-cover", className)}
    />
  );
}
