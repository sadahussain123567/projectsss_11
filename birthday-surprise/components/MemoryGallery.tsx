"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { birthdayData, type Memory, type MemoryShape } from "@/data/birthday";
import { EASE } from "@/lib/constants";
import { navGhost } from "@/lib/styles";
import { cn } from "@/lib/utils";
import { MemoryModal } from "./MemoryModal";
import { SafeImage } from "./ui/SafeImage";
import { SectionHeading } from "./ui/SectionHeading";

const ASPECT: Record<MemoryShape, string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  tall: "aspect-[2/3]",
};

const fade = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.4, ease: EASE },
};

function Caption({ children }: { children: string }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-burgundy/75 via-burgundy/25 to-transparent px-3 pb-2.5 pt-10">
      <p className="font-display text-[0.95rem] leading-snug text-cream sm:text-lg">{children}</p>
    </div>
  );
}

const tileButton =
  "group relative block w-full overflow-hidden rounded-card bg-blush text-left shadow-soft transition-shadow duration-500 ease-silk hover:shadow-lift focus-visible:outline-offset-4";

export function MemoryGallery() {
  const { memories, gallery } = birthdayData;
  const [view, setView] = useState<"featured" | "all">("featured");
  const [active, setActive] = useState<number | null>(null);

  const featured: Memory[] = memories.slice(0, gallery.featuredCount);

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {view === "featured" ? (
          <motion.div key="featured" {...fade} className="flex flex-1 flex-col gap-4">
            <SectionHeading title={gallery.title} subtitle={gallery.subtitle} />

            {/* Two staggered columns that stretch to fill whatever height the phone has */}
            <div className="flex min-h-[16rem] flex-1 gap-3">
              {[0, 1].map((col) => (
                <div key={col} className="flex min-h-0 flex-1 flex-col gap-3">
                  {featured.map((memory, i) => {
                    if (i % 2 !== col) return null;
                    const row = Math.floor(i / 2);
                    const grow = (col + row) % 2 === 0 ? 1.3 : 1;
                    return (
                      <button
                        key={memory.image}
                        type="button"
                        onClick={() => setActive(i)}
                        aria-label={`Open photo: ${memory.caption}`}
                        aria-haspopup="dialog"
                        className={cn(tileButton, "min-h-24")}
                        style={{ flex: `${grow} 1 0%` }}
                      >
                        <SafeImage
                          src={memory.image}
                          alt={memory.alt}
                          sizes="(min-width:640px) 320px, 45vw"
                          className="transition-transform duration-[900ms] ease-silk group-hover:scale-[1.06] motion-reduce:transition-none"
                        />
                        <Caption>{memory.caption}</Caption>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {memories.length > featured.length && (
              <button type="button" onClick={() => setView("all")} className={cn(navGhost, "w-full")}>
                {gallery.moreLabel}
                <ArrowRight className="size-4 transition-transform duration-300 ease-silk group-hover:translate-x-1" aria-hidden />
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div key="all" {...fade} className="flex flex-col gap-5 pb-2">
            <div className="flex items-center justify-between gap-3">
              <button type="button" onClick={() => setView("featured")} className={cn(navGhost, "!px-4 !py-2.5 text-sm")}>
                <ArrowLeft className="size-4 transition-transform duration-300 ease-silk group-hover:-translate-x-1" aria-hidden />
                Back
              </button>
              <p className="font-display text-xl italic text-mauve">
                {memories.length} memories
              </p>
            </div>

            {/* Editorial masonry via CSS columns */}
            <ul className="columns-2 gap-3 sm:columns-3 sm:gap-4">
              {memories.map((memory, i) => (
                <motion.li
                  key={memory.image}
                  className="mb-3 break-inside-avoid sm:mb-4"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.1 + (i % 4) * 0.07 }}
                >
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Open photo: ${memory.caption}`}
                    aria-haspopup="dialog"
                    className={tileButton}
                  >
                    <div className={cn("relative", ASPECT[memory.shape])}>
                      <SafeImage
                        src={memory.image}
                        alt={memory.alt}
                        sizes="(min-width:640px) 220px, 45vw"
                        className="transition-transform duration-[900ms] ease-silk group-hover:scale-[1.06] motion-reduce:transition-none"
                      />
                      <Caption>{memory.caption}</Caption>
                    </div>
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <MemoryModal memories={memories} index={active} onClose={() => setActive(null)} onNavigate={setActive} />
    </>
  );
}
