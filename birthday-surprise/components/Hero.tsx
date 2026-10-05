"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { birthdayData } from "@/data/birthday";
import { EASE, INTRO_MS } from "@/lib/constants";
import { SafeImage } from "./ui/SafeImage";

// The first visit waits for the intro screen to lift; coming back is quicker.
let introPlayed = false;

export function Hero() {
  const { hero } = birthdayData;
  const [start] = useState(() => (introPlayed ? 0.35 : INTRO_MS / 1000 - 0.3));

  useEffect(() => {
    introPlayed = true;
  }, []);

  const rise = (i: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay: start + i * 0.12, ease: EASE },
  });

  return (
    <div className="flex flex-col items-center gap-5 text-center sm:gap-6">
      <div className="flex flex-col items-center">
        <motion.p {...rise(0)} className="flex max-w-[19rem] items-center gap-3 font-display text-[1.05rem] italic leading-snug text-mauve sm:max-w-none sm:text-xl">
          {hero.eyebrow}
        </motion.p>

        <motion.h1
          {...rise(1)}
          className="mt-3 font-display text-[clamp(2.4rem,11.5vw,4.75rem)] font-medium leading-[1] tracking-tight text-burgundy"
        >
          <span className="block">{hero.title}</span>
          <span className="relative mt-0.5 inline-block pb-2.5 italic text-rose">
            {hero.accent}
            <svg viewBox="0 0 300 20" preserveAspectRatio="none" className="absolute -bottom-0.5 left-0 h-3.5 w-full text-dusty" fill="none" aria-hidden>
              <motion.path
                d="M4 12C60 4 120 18 180 9S270 6 296 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: start + 1.1, duration: 1.4, ease: EASE }}
              />
            </svg>
          </span>
        </motion.h1>

        <motion.p {...rise(2)} className="mt-4 max-w-xs font-display text-[1.3rem] leading-snug text-wine sm:max-w-md sm:text-2xl">
          {hero.subtitle}
        </motion.p>
      </div>

      {/* A printed photograph, taped down. Its size follows the screen height so everything fits. */}
      <motion.figure
        initial={{ opacity: 0, y: 36, rotate: 0 }}
        animate={{ opacity: 1, y: 0, rotate: 2.5 }}
        transition={{ duration: 1.3, delay: start + 0.4, ease: EASE }}
        className="relative mt-1"
        style={{ width: "clamp(6.75rem, 22svh, 15rem)" }}
      >
        <div aria-hidden className="absolute inset-0 -z-10 translate-x-2.5 translate-y-1.5 -rotate-6 rounded-soft border border-dusty/30 bg-blush/80" />
        <div aria-hidden className="absolute -top-3 left-1/2 z-10 h-6 w-20 -translate-x-1/2 -rotate-3 border border-white/50 bg-blush/70 shadow-sm backdrop-blur-sm" />

        <div className="relative rounded-soft border border-wine/10 bg-paper p-2 pb-11 shadow-photo sm:p-3 sm:pb-14">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[0.5rem] bg-blush">
            <SafeImage src={hero.photo.image} alt={hero.photo.alt} priority sizes="240px" />
            <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[0.5rem] ring-1 ring-inset ring-burgundy/10" />
          </div>
          <figcaption className="absolute inset-x-0 bottom-2 whitespace-nowrap text-center font-script text-xl text-wine sm:bottom-3 sm:text-3xl">{hero.photo.caption}</figcaption>
        </div>

        <Heart aria-hidden className="absolute -bottom-4 -right-3 size-9 rotate-12 fill-rose text-rose drop-shadow-[0_10px_14px_rgb(181_88_111/0.35)]" />
      </motion.figure>
    </div>
  );
}
