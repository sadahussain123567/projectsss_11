"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Menu, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useState, type ComponentType, type CSSProperties } from "react";
import { birthdayData } from "@/data/birthday";
import { EASE } from "@/lib/constants";
import { SCREENS, type ScreenId } from "@/lib/screens";
import { navGhost, navGhostDark, navPrimary, navPrimaryDark } from "@/lib/styles";
import { cn } from "@/lib/utils";
import { BirthdayMessage } from "./BirthdayMessage";
import { FloatingDecorations } from "./FloatingDecorations";
import { Hero } from "./Hero";
import { LoveLetter } from "./LoveLetter";
import { MemoryGallery } from "./MemoryGallery";
import { MusicPlayer } from "./MusicPlayer";
import { ProgressIndicator } from "./ProgressIndicator";
import { Reasons } from "./Reasons";
import { ScreenMenu } from "./ScreenMenu";
import { StoryTimeline } from "./StoryTimeline";
import { Surprise } from "./Surprise";

const COMPONENTS: Record<ScreenId, ComponentType<{ onReplay: () => void }>> = {
  welcome: Hero,
  message: BirthdayMessage,
  memories: MemoryGallery,
  friendship: StoryTimeline,
  bestfriend: Reasons,
  letter: LoveLetter,
  surprise: Surprise,
};

/** Forward: old screen leaves left, new one arrives from the right. Back: the reverse. */
const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 56 : -56 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -56 : 56 }),
};

/*
 * Header and footer are overlaid on every screen; each screen's scroll area is
 * inset by exactly their height, so content can never sit underneath a button.
 */
const FRAME_VARS = {
  "--hdr": "calc(max(0.75rem, env(safe-area-inset-top, 0px)) + 3.5rem)",
  "--ftr": "calc(max(1rem, env(safe-area-inset-bottom, 0px)) + 4.25rem)",
} as CSSProperties;

export function Experience() {
  const { hero, music } = birthdayData;
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [runKey, setRunKey] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const last = SCREENS.length - 1;
  const screen = SCREENS[step];
  const dark = screen.tone === "dark";

  const goTo = useCallback(
    (index: number) => {
      setMenuOpen(false);
      if (index === step) return;
      setDirection(index > step ? 1 : -1);
      setStep(index);
    },
    [step],
  );

  const next = useCallback(() => {
    if (step < last) goTo(step + 1);
  }, [step, last, goTo]);

  const back = useCallback(() => {
    if (step > 0) goTo(step - 1);
  }, [step, goTo]);

  /** Back to the very beginning. Remounting every screen resets the letter, gallery and surprise. */
  const replay = useCallback(() => {
    setMenuOpen(false);
    setDirection(-1);
    setRunKey((k) => k + 1);
    setStep(0);
  }, []);

  // Arrow keys move between screens (unless a dialog is open).
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (menuOpen || document.querySelector('[aria-modal="true"]')) return;
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") back();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen, next, back]);

  const Screen = COMPONENTS[screen.id];

  return (
    <div className="fixed inset-0 overflow-hidden" style={FRAME_VARS}>
      {/* One screen at a time */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={`${screen.id}-${runKey}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.55, ease: EASE }}
          className={cn("absolute inset-0 isolate", screen.bg)}
        >
          <FloatingDecorations variant={screen.decor} tone={screen.tone} />
          {screen.grain && <div aria-hidden className={cn("grain-fill", dark && "grain-dark")} />}

          <div
            role="region"
            aria-label={screen.label}
            tabIndex={0}
            className="absolute inset-x-0 top-(--hdr) bottom-(--ftr) scroll-fade overflow-y-auto overflow-x-hidden overscroll-contain outline-offset-[-4px]"
          >
            <div className="mx-auto flex min-h-full w-full max-w-2xl flex-col justify-center px-5 py-4 sm:px-8">
              <Screen onReplay={replay} />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <p className="sr-only" aria-live="polite">
        Screen {step + 1} of {SCREENS.length}: {screen.label}
      </p>

      {/* Top: music, progress, menu */}
      <header className="absolute inset-x-0 top-0 z-30 px-4 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <div className="mx-auto flex max-w-2xl items-start justify-between">
          {music.enabled ? <MusicPlayer /> : <span className="size-11" aria-hidden />}
          <ProgressIndicator step={step} tone={screen.tone} />
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open screen menu"
            aria-haspopup="dialog"
            className="flex size-11 items-center justify-center rounded-full border border-white/60 bg-cream/75 text-burgundy shadow-soft backdrop-blur-xl transition duration-300 ease-silk hover:scale-105 active:scale-95"
          >
            <Menu className="size-5" aria-hidden />
          </button>
        </div>
      </header>

      {/* Bottom: back / next */}
      <footer className="absolute inset-x-0 bottom-0 z-30 px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
        <nav aria-label="Screens" className="mx-auto flex max-w-2xl items-center justify-between gap-3">
          {step > 0 && (
            <button type="button" onClick={back} aria-label="Previous screen" className={dark ? navGhostDark : navGhost}>
              <ArrowLeft className="size-4 transition-transform duration-300 ease-silk group-hover:-translate-x-1" aria-hidden />
              Back
            </button>
          )}

          {step === last ? (
            <button type="button" onClick={replay} className={cn(dark ? navPrimaryDark : navPrimary, "ml-auto")}>
              Replay
              <RotateCcw className="size-4 transition-transform duration-500 ease-silk group-hover:-rotate-180" aria-hidden />
            </button>
          ) : (
            <button
              type="button"
              onClick={next}
              aria-label={step === 0 ? hero.cta : "Next screen"}
              className={cn(dark ? navPrimaryDark : navPrimary, step === 0 ? "w-full" : "ml-auto")}
            >
              {step === 0 ? hero.cta : "Next"}
              <ArrowRight className="size-4 transition-transform duration-300 ease-silk group-hover:translate-x-1" aria-hidden />
            </button>
          )}
        </nav>
      </footer>

      <ScreenMenu open={menuOpen} current={step} onSelect={goTo} onClose={() => setMenuOpen(false)} />
    </div>
  );
}
