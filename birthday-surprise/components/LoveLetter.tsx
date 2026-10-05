"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Heart, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { birthdayData } from "@/data/birthday";
import { EASE } from "@/lib/constants";
import { primaryButton } from "@/lib/styles";
import { useDialog } from "@/lib/useDialog";
import { useIsClient } from "@/lib/useIsClient";
import { Reveal } from "./ui/Reveal";
import { RichText } from "./ui/RichText";

/**
 * closed  -> envelope resting
 * lift    -> envelope lifts slightly
 * flap    -> flap opens
 * rise    -> letter slides out, background darkens
 * reading -> full letter appears in the center and its words fade in
 */
type Phase = "closed" | "lift" | "flap" | "rise" | "reading";

// Envelope width follows the screen height too, so it always fits above the buttons.
const ENVELOPE_VARS = { "--env": "min(64vw, 300px, 30svh)" } as CSSProperties;

export function LoveLetter() {
  const { letter } = birthdayData;
  const reduce = useReducedMotion();
  const isClient = useIsClient();
  const [phase, setPhase] = useState<Phase>("closed");
  const timers = useRef<number[]>([]);
  const veilRef = useRef<HTMLDivElement>(null);

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const openLetter = () => {
    if (phase !== "closed") return;
    const steps: Array<[Phase, number]> = reduce
      ? [["lift", 0], ["flap", 150], ["rise", 300], ["reading", 600]]
      : [["lift", 0], ["flap", 500], ["rise", 1250], ["reading", 2300]];
    steps.forEach(([next, delay]) => {
      timers.current.push(window.setTimeout(() => setPhase(next), delay));
    });
  };

  const closeLetter = useCallback(() => {
    clearTimers();
    setPhase("closed");
  }, [clearTimers]);

  useDialog(phase === "reading", closeLetter, veilRef);

  const lifted = phase !== "closed";
  const flapOpen = phase === "flap" || phase === "rise" || phase === "reading";
  const risen = phase === "rise" || phase === "reading";
  const veil = phase === "rise" || phase === "reading";

  // Words appear one paragraph at a time.
  const wordIn = (order: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 12, filter: "blur(6px)" },
    animate: reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 1.1, delay: 0.9 + order * (reduce ? 0.2 : 0.95), ease: EASE },
  });

  return (
    <div className="flex flex-col items-center text-center" style={ENVELOPE_VARS}>
      <Reveal>
        <h2 id="letter-title" className="font-display text-[2rem] font-medium leading-[1.08] tracking-tight text-burgundy sm:text-5xl">
          {letter.title}
        </h2>
        <p className="mt-2 font-display text-xl italic text-mauve">{letter.teaser}</p>
      </Reveal>

      {/* The envelope. The top margin leaves room for the letter to slide up out of it. */}
      <motion.div
        aria-hidden
        style={{ marginTop: "calc(var(--env) * 0.42)" }}
        animate={reduce || lifted ? { y: 0 } : { y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: lifted ? 0 : Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="relative aspect-[3/2]"
          style={{ perspective: 1100, width: "var(--env)" }}
          animate={{ y: lifted ? -8 : 0, rotate: lifted ? -1.5 : 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {/* inside back */}
          <div className="absolute inset-0 rounded-[0.7rem] bg-[#d79aa7] shadow-lift" />

          {/* the letter inside */}
          <motion.div
            className="paper absolute inset-x-[6%] bottom-[7%] top-[7%] z-[2] rounded-[0.4rem] border border-dusty/30 px-5 pt-4 shadow-soft"
            animate={{ y: risen ? "-62%" : "0%", opacity: phase === "reading" ? 0 : 1 }}
            transition={{ y: { duration: 1, ease: EASE }, opacity: { duration: 0.6 } }}
          >
            <div className="mx-auto h-1.5 w-1/3 rounded-full bg-dusty/40" />
            <div className="mx-auto mt-3 h-1 w-4/5 rounded-full bg-dusty/25" />
            <div className="mx-auto mt-2 h-1 w-3/5 rounded-full bg-dusty/25" />
            <Heart className="mx-auto mt-3 size-4 fill-rose text-rose" />
          </motion.div>

          {/* front pocket: the whole rectangle minus the V where the flap sits */}
          <div
            className="absolute inset-0 z-[3] rounded-[0.7rem] bg-linear-to-br from-[#f3cdd4] to-[#e6aab6]"
            style={{ clipPath: "polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)" }}
          />

          {/* flap */}
          <motion.div
            className="absolute inset-x-0 top-0 h-[55%] origin-top bg-linear-to-b from-[#ecb8c2] to-[#e0a0ae]"
            style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)", transformStyle: "preserve-3d" }}
            animate={{ rotateX: flapOpen ? 180 : 0, zIndex: flapOpen ? 1 : 4 }}
            transition={{ rotateX: { duration: 0.7, ease: EASE }, zIndex: { delay: flapOpen ? 0.3 : 0.35, duration: 0 } }}
          />

          {/* wax seal */}
          <motion.div
            className="absolute left-1/2 top-[55%] z-[5] flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-wine shadow-[0_6px_14px_-4px_rgb(78_26_45/0.6)] ring-2 ring-burgundy/20"
            animate={{ scale: flapOpen ? 0.3 : 1, opacity: flapOpen ? 0 : 1 }}
            transition={{ duration: 0.35 }}
          >
            <Heart className="size-5 fill-cream text-cream" />
          </motion.div>
        </motion.div>
      </motion.div>

      <button
        type="button"
        onClick={openLetter}
        aria-disabled={phase !== "closed"}
        aria-haspopup="dialog"
        className={`${primaryButton} mt-8 w-full max-w-xs`}
      >
        {letter.openLabel}
      </button>

      {/* The darkened room and the letter itself, rendered above the whole app */}
      {isClient &&
        createPortal(
          <AnimatePresence>
            {veil && (
              <motion.div
                key="veil"
                ref={veilRef}
                role={phase === "reading" ? "dialog" : undefined}
                aria-modal={phase === "reading" ? true : undefined}
                aria-labelledby="letter-greeting"
                tabIndex={-1}
                className="fixed inset-0 z-[80] flex items-center justify-center bg-burgundy/80 p-3 outline-none backdrop-blur-[3px] sm:p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9 }}
                onClick={(event) => {
                  if (event.target === event.currentTarget && phase === "reading") closeLetter();
                }}
              >
                {phase === "reading" && (
                  <>
                    <button
                      type="button"
                      onClick={closeLetter}
                      aria-label="Close letter"
                      className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full border border-cream/30 bg-cream/10 text-cream transition duration-300 hover:bg-cream/20 active:scale-95 focus-visible:outline-champagne"
                    >
                      <X className="size-5" aria-hidden />
                    </button>

                    <motion.div
                      className="paper relative max-h-[86dvh] w-[min(92vw,660px)] overflow-y-auto overscroll-contain rounded-panel shadow-[0_50px_100px_-30px_rgb(0_0_0/0.75)]"
                      initial={{ opacity: 0, scale: 0.9, y: 40 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 1, ease: EASE }}
                    >
                      <div className="m-2.5 rounded-[1.4rem] border border-dusty/40 px-6 pb-10 pt-9 sm:m-3.5 sm:px-14 sm:pb-14 sm:pt-14">
                        <motion.div {...wordIn(0)} className="mb-5 flex justify-center">
                          <Heart className="size-5 fill-dusty text-dusty" aria-hidden />
                        </motion.div>

                        <motion.h3 {...wordIn(0)} id="letter-greeting" className="font-script text-[2.6rem] leading-none text-wine sm:text-6xl">
                          {letter.greeting}
                        </motion.h3>

                        {letter.paragraphs.map((paragraph, i) => (
                          <motion.p
                            key={paragraph}
                            {...wordIn(i + 1)}
                            className="mt-5 text-left font-display text-[1.2rem] leading-[1.65] text-ink sm:text-[1.45rem]"
                          >
                            <RichText text={paragraph} />
                          </motion.p>
                        ))}

                        <motion.div {...wordIn(letter.paragraphs.length + 1)} className="mt-9">
                          {letter.closing.map((line) => (
                            <p key={line} className="font-display text-xl italic text-wine sm:text-3xl">
                              {line}
                            </p>
                          ))}
                          <p className="mt-5 font-script text-[1.9rem] leading-tight text-rose sm:text-4xl">{letter.signature}</p>
                        </motion.div>
                      </div>
                    </motion.div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
