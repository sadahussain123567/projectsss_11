import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  title: string;
  kicker?: string;
  subtitle?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
  id?: string;
}

export function SectionHeading({ title, kicker, subtitle, align = "center", tone = "light", id }: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <Reveal className={cn("flex flex-col gap-3", align === "center" ? "items-center text-center" : "items-start text-left")}>
      {kicker && (
        <p className={cn("flex items-center gap-2.5 font-display text-lg italic sm:text-xl", dark ? "text-champagne" : "text-mauve")}>
          <Heart className={cn("size-3.5", dark ? "fill-champagne text-champagne" : "fill-dusty text-dusty")} aria-hidden />
          {kicker}
        </p>
      )}
      <h2
        id={id}
        className={cn(
          "max-w-3xl font-display text-[2rem] font-medium leading-[1.08] tracking-tight sm:text-5xl",
          dark ? "text-cream" : "text-burgundy",
        )}
      >
        {title}
      </h2>
      {subtitle && <p className={cn("max-w-xl text-base leading-relaxed sm:text-lg", dark ? "text-cream/75" : "text-mauve")}>{subtitle}</p>}
    </Reveal>
  );
}
