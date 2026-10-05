"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "hero" | "soft" | "finale";

interface Props {
  variant?: Variant;
  /** "dark" is for the burgundy finale. */
  tone?: "light" | "dark";
  className?: string;
}

const COUNTS: Record<Variant, { hearts: number; sparkles: number }> = {
  hero: { hearts: 9, sparkles: 10 },
  soft: { hearts: 4, sparkles: 5 },
  finale: { hearts: 12, sparkles: 14 },
};

/*
 * Positions come from simple integer math instead of Math.random(), so the
 * server and browser render identical markup (no hydration warnings).
 */
const pick = (i: number, mul: number, add: number, mod: number) => ((i * mul + add) % mod);

const STAR = "M12 0C12.8 7.2 16.8 11.2 24 12 16.8 12.8 12.8 16.8 12 24 11.2 16.8 7.2 12.8 0 12 7.2 11.2 11.2 7.2 12 0Z";

export function FloatingDecorations({ variant = "soft", tone = "light", className }: Props) {
  const reduce = useReducedMotion();
  const dark = tone === "dark";
  const { hearts, sparkles } = COUNTS[variant];

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      {/* Soft glowing blobs: static shapes with a very slow breath */}
      <motion.div
        className={cn("absolute -left-24 -top-24 size-72 rounded-full blur-3xl sm:size-96", dark ? "bg-rose/30" : "bg-blush")}
        animate={reduce ? undefined : { scale: [1, 1.12, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={cn("absolute -right-28 top-1/3 size-72 rounded-full blur-3xl sm:size-[26rem]", dark ? "bg-wine/60" : "bg-lavender/80")}
        animate={reduce ? undefined : { scale: [1.08, 1, 1.08] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className={cn("absolute -bottom-28 left-1/4 size-72 rounded-full blur-3xl", dark ? "bg-champagne/10" : "bg-petal")} />

      {!reduce &&
        Array.from({ length: hearts }, (_, i) => {
          const size = 10 + pick(i, 7, 3, 14);
          const duration = 18 + pick(i, 3, 5, 12);
          const peak = 0.22 + pick(i, 13, 7, 22) / 100;
          const drift = (i % 2 ? 1 : -1) * (14 + pick(i, 5, 2, 30));
          return (
            <motion.span
              key={`h-${i}`}
              className="absolute bottom-0 will-change-transform"
              style={{ left: `${pick(i, 37, 11, 96)}%` }}
              initial={{ y: "3vh", opacity: 0 }}
              animate={{ y: "-105vh", x: [0, drift, 0], opacity: [0, peak, peak, 0] }}
              transition={{
                duration,
                delay: pick(i, 17, 1, 14) * 0.9,
                repeat: Infinity,
                ease: "linear",
                opacity: { duration, times: [0, 0.12, 0.8, 1], repeat: Infinity, delay: pick(i, 17, 1, 14) * 0.9, ease: "linear" },
                x: { duration, repeat: Infinity, delay: pick(i, 17, 1, 14) * 0.9, ease: "easeInOut" },
              }}
            >
              <Heart style={{ width: size, height: size }} className={dark ? "fill-champagne/70 text-champagne/70" : "fill-dusty text-dusty"} />
            </motion.span>
          );
        })}

      {Array.from({ length: sparkles }, (_, i) => {
        const size = 7 + pick(i, 5, 1, 9);
        const delay = pick(i, 11, 3, 9) * 0.55;
        return (
          <motion.svg
            key={`s-${i}`}
            viewBox="0 0 24 24"
            className={cn("absolute", dark ? "fill-champagne" : "fill-champagne")}
            style={{ left: `${pick(i, 29, 7, 94)}%`, top: `${pick(i, 41, 5, 88)}%`, width: size, height: size }}
            initial={{ opacity: reduce ? 0.35 : 0, scale: 0.5 }}
            animate={reduce ? undefined : { opacity: [0, 0.9, 0], scale: [0.5, 1, 0.5], rotate: [0, 45, 90] }}
            transition={{ duration: 4.5 + pick(i, 3, 1, 4), delay, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d={STAR} />
          </motion.svg>
        );
      })}
    </div>
  );
}
