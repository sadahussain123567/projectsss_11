"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Heart, RotateCcw } from "lucide-react";
import { useState } from "react";
import { birthdayData } from "@/data/birthday";
import { celebrate } from "@/lib/confetti";
import { EASE } from "@/lib/constants";
import { ghostButton, lightButton, navPrimaryDark } from "@/lib/styles";
import { Countdown } from "./Countdown";

const STAR = "M12 0C12.8 7.2 16.8 11.2 24 12 16.8 12.8 12.8 16.8 12 24 11.2 16.8 7.2 12.8 0 12 7.2 11.2 11.2 7.2 12 0Z";
const HEART = "M12 21.5C3 14.5 2 9 4.7 6.2 7 3.9 10.4 4.3 12 7.1c1.6-2.8 5-3.2 7.3-.9C22 9 21 14.5 12 21.5z";

/** A one-time burst of hearts and sparkles rising from the middle of the screen. */
function Burst() {
  return (
    <div aria-hidden className="pointer-events-none fixed left-1/2 top-1/2 z-20">
      {Array.from({ length: 22 }, (_, i) => {
        const side = i % 2 ? 1 : -1;
        const x = side * (24 + ((i * 37) % 150));
        const y = -(120 + ((i * 53) % 300));
        const size = 12 + ((i * 5) % 18);
        const isStar = i % 3 === 0;
        return (
          <motion.svg
            key={i}
            viewBox="0 0 24 24"
            className={isStar ? "absolute fill-champagne" : "absolute fill-rose"}
            style={{ width: size, height: size, left: -size / 2, top: -size / 2 }}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.3, rotate: 0 }}
            animate={{ x, y, opacity: [0, 1, 1, 0], scale: [0.3, 1, 1, 0.8], rotate: side * 25 }}
            transition={{ duration: 2.6 + (i % 5) * 0.25, delay: i * 0.06, ease: EASE }}
          >
            <path d={isStar ? STAR : HEART} />
          </motion.svg>
        );
      })}
    </div>
  );
}

export function Surprise({ onReplay }: { onReplay: () => void }) {
  const { surprise, footer } = birthdayData;
  const reduce = useReducedMotion();
  const [opened, setOpened] = useState(false);
  const [burstKey, setBurstKey] = useState(0);

  const reveal = () => {
    setOpened(true);
    setBurstKey((k) => k + 1);
    void celebrate("finale");
  };

  const again = () => {
    setBurstKey((k) => k + 1);
    void celebrate("finale");
  };

  const afterText = 0.9 + surprise.finalParagraphs.length * 0.9;

  return (
    <>
      {/* the glow that rises when the surprise opens (pinned to the screen, not the scroll area) */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-1/2 top-1/2 -z-10 size-[min(150vw,56rem)] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgb(232 150 175 / 0.5) 0%, rgb(181 88 111 / 0.18) 40%, transparent 68%)" }}
        initial={{ opacity: 0.25, scale: 0.8 }}
        animate={opened ? { opacity: reduce ? 0.8 : [0.6, 1, 0.7], scale: 1 } : { opacity: 0.25, scale: 0.8 }}
        transition={opened ? { duration: 5, repeat: reduce ? 0 : Infinity, repeatType: "mirror", ease: "easeInOut" } : { duration: 0.6 }}
      />

      <div className="relative flex flex-col items-center text-center text-cream">
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.div
              key="teaser"
              className="flex w-full max-w-md flex-col items-center"
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <Heart className="mb-4 size-5 fill-champagne text-champagne" aria-hidden />
              <h2 id="surprise-title" className="font-display text-[2.3rem] font-medium leading-[1.04] tracking-tight sm:text-6xl">
                {surprise.title}
              </h2>
              <p className="mt-3 font-display text-lg italic text-cream/80 sm:text-2xl">{surprise.subtitle}</p>

              <div className="mt-7 w-full">
                <Countdown tone="dark" />
              </div>

              <button type="button" onClick={reveal} className={`${lightButton} mt-7 w-full px-6 py-4 text-center`}>
                {surprise.button}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="finale"
              className="flex max-w-xl flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <h2 id="surprise-title" className="sr-only">
                {surprise.title}
              </h2>
              <motion.p
                className="font-display text-[2.2rem] font-medium italic leading-[1.06] sm:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
              >
                {surprise.finalTitle}
              </motion.p>

              {surprise.finalParagraphs.map((text, i) => (
                <motion.p
                  key={text}
                  className="mt-4 font-display text-[1.15rem] leading-relaxed text-cream/90 text-balance sm:mt-6 sm:text-[1.6rem]"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.1, delay: 1.2 + i * 0.9, ease: EASE }}
                >
                  {text}
                </motion.p>
              ))}

              <motion.div
                className="mt-7 flex flex-col items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 + afterText, duration: 1 }}
              >
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button type="button" onClick={again} className={ghostButton}>
                    Celebrate again
                  </button>
                  <button type="button" onClick={onReplay} className={navPrimaryDark}>
                    {surprise.replayLabel}
                    <RotateCcw className="size-4 transition-transform duration-500 ease-silk group-hover:-rotate-180" aria-hidden />
                  </button>
                </div>
                <p className="text-xs text-cream/55">{footer.line}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {opened && !reduce && <Burst key={burstKey} />}
    </>
  );
}
