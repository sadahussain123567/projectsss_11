"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { birthdayData } from "@/data/birthday";
import { EASE } from "@/lib/constants";
import { celebrate } from "@/lib/confetti";
import { cn } from "@/lib/utils";
import { Reveal } from "./ui/Reveal";

const DAY = 86_400_000;

/** Ticks once a second. The server snapshot is 0, which avoids hydration mismatches. */
function subscribe(callback: () => void) {
  const id = window.setInterval(callback, 1000);
  return () => window.clearInterval(id);
}
const getNow = () => Math.floor(Date.now() / 1000) * 1000;
const getServerNow = () => 0;

/**
 * Finds the birthday to count toward. If the configured date is long past,
 * it rolls forward to the next anniversary. For 24 hours after it begins,
 * `celebrating` is true.
 */
function resolveTarget(iso: string, now: number) {
  const base = new Date(iso);
  if (Number.isNaN(base.getTime())) return { target: now + DAY, celebrating: false };

  const target = new Date(base);
  while (target.getTime() + DAY <= now) target.setFullYear(target.getFullYear() + 1);

  const celebrating = now >= target.getTime();
  return { target: target.getTime(), celebrating };
}

function Digits({ value }: { value: number }) {
  const text = String(value).padStart(2, "0");
  return (
    <span className="inline-flex lining-nums" aria-hidden>
      {text.split("").map((digit, i) => (
        <span key={i} className="relative inline-block h-[1.15em] w-[0.58em] overflow-hidden text-center">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span
              key={digit}
              className="absolute inset-0"
              initial={{ y: "65%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-65%", opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              {digit}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </span>
  );
}

export function Countdown({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const { countdown, birthday } = birthdayData;
  const now = useSyncExternalStore(subscribe, getNow, getServerNow);
  const ready = now !== 0;

  const { target, celebrating } = ready ? resolveTarget(birthday, now) : { target: 0, celebrating: false };
  const remaining = Math.max(0, target - now);

  const units = [
    { label: "Days", value: Math.floor(remaining / DAY) },
    { label: "Hours", value: Math.floor((remaining / 3_600_000) % 24) },
    { label: "Minutes", value: Math.floor((remaining / 60_000) % 60) },
    { label: "Seconds", value: Math.floor((remaining / 1000) % 60) },
  ];

  // A single soft burst the first time we notice it's the day.
  const celebrated = useRef(false);
  useEffect(() => {
    if (celebrating && !celebrated.current) {
      celebrated.current = true;
      void celebrate("soft");
    }
  }, [celebrating]);

  const dateLabel = ready
    ? new Date(target).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "\u00a0";

  const spoken = `${units[0].value} days, ${units[1].value} hours, ${units[2].value} minutes`;

  return (
    <div className="w-full">
      <Reveal delay={0.1} y={10}>
        <h3 className={cn("font-display text-[1.35rem] italic leading-tight sm:text-3xl", dark ? "text-cream/90" : "text-burgundy")}>{countdown.title}</h3>
        <p className={cn("mt-1 text-xs", dark ? "text-cream/60" : "text-mauve")}>{dateLabel}</p>
      </Reveal>

      <div className="mt-4">
        {celebrating ? (
          <Reveal>
            <motion.p
              role="status"
              className={cn("font-display text-[2.2rem] font-medium italic leading-tight sm:text-6xl", dark ? "text-champagne" : "text-rose")}
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            >
              {countdown.celebration}
            </motion.p>
          </Reveal>
        ) : (
          <>
            <p className="sr-only" role="timer">
              {ready ? `${spoken} until the big day` : "Counting down"}
            </p>
            <ul className="grid grid-cols-4 gap-2 sm:gap-4">
              {units.map((unit, i) => (
                <li key={unit.label}>
                  <Reveal delay={0.15 + i * 0.07} y={10}>
                    <div
                      className={cn(
                        "flex flex-col items-center rounded-card border px-1 py-3 shadow-soft backdrop-blur-md sm:py-6",
                        dark ? "border-cream/20 bg-cream/10" : "border-white/70 bg-white/55",
                      )}
                    >
                      <span className={cn("font-display text-[1.85rem] font-medium leading-none sm:text-6xl", dark ? "text-cream" : "text-burgundy")}>
                        <Digits value={unit.value} />
                      </span>
                      <span className={cn("mt-2 text-[0.68rem] tracking-wide sm:text-sm", dark ? "text-cream/65" : "text-mauve")}>{unit.label}</span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
