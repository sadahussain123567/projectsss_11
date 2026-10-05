import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

/** A small ornament: hairline, heart, hairline. */
export function HeartDivider({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <div className={cn("flex items-center justify-center gap-4", className)} aria-hidden>
      <span className={cn("h-px w-12 sm:w-20", tone === "light" ? "bg-linear-to-r from-transparent to-dusty/60" : "bg-linear-to-r from-transparent to-cream/40")} />
      <Heart className={cn("size-4", tone === "light" ? "fill-dusty text-dusty" : "fill-champagne text-champagne")} />
      <span className={cn("h-px w-12 sm:w-20", tone === "light" ? "bg-linear-to-l from-transparent to-dusty/60" : "bg-linear-to-l from-transparent to-cream/40")} />
    </div>
  );
}
