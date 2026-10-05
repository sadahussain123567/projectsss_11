"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";
import { birthdayData, type TimelineEntry } from "@/data/birthday";
import { EASE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { InsideJokes } from "./InsideJokes";
import { Reveal } from "./ui/Reveal";
import { SafeImage } from "./ui/SafeImage";
import { SectionHeading } from "./ui/SectionHeading";

type View = "story" | "jokes";

/** Screen 4: the friendship timeline, with the inside jokes one tap away. */
export function StoryTimeline() {
  const { story, insideJokes } = birthdayData;
  const timeline: TimelineEntry[] = birthdayData.timeline;
  const [view, setView] = useState<View>("story");

  const tabs: Array<{ id: View; label: string }> = [
    { id: "story", label: story.tabLabel },
    { id: "jokes", label: insideJokes.tabLabel },
  ];

  return (
    <div className="flex flex-col gap-4 py-1">
      <div role="tablist" aria-label="Friendship" className="mx-auto flex rounded-full border border-wine/10 bg-cream/70 p-1 shadow-soft backdrop-blur-md">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={view === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => setView(tab.id)}
            className={cn(
              "relative rounded-full px-4 py-2 text-sm transition-colors duration-300 focus-visible:outline-offset-2",
              view === tab.id ? "text-cream" : "text-mauve hover:text-burgundy",
            )}
          >
            {view === tab.id && (
              <motion.span layoutId="friend-tab" className="absolute inset-0 rounded-full bg-burgundy" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
            )}
            <span className="relative">{tab.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {view === "story" ? (
          <motion.div
            key="story"
            role="tabpanel"
            id="panel-story"
            aria-labelledby="tab-story"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <SectionHeading title={story.title} />

            <div className="relative mt-4">
              {/* the line draws itself in */}
              <div aria-hidden className="absolute bottom-0 left-4 top-0 w-px -translate-x-1/2 bg-dusty/25" />
              <motion.div
                aria-hidden
                className="absolute bottom-0 left-4 top-0 w-px origin-top -translate-x-1/2 bg-linear-to-b from-rose via-dusty to-rose"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.8, delay: 0.5, ease: EASE }}
              />

              <ol className="flex flex-col gap-3">
                {timeline.map((entry, i) => (
                  <li key={entry.title} className="relative pl-12">
                    <span aria-hidden className="absolute left-4 top-3.5 flex size-7 -translate-x-1/2 items-center justify-center rounded-full border border-dusty/50 bg-cream shadow-soft">
                      <Heart className="size-3 fill-rose text-rose" />
                    </span>

                    <Reveal x={18} y={8} delay={i * 0.1}>
                      <article className="rounded-card border border-wine/10 bg-paper/85 px-4 py-3 shadow-soft backdrop-blur-sm sm:p-5">
                        <p className="inline-flex rounded-full bg-petal px-2.5 py-0.5 font-display text-[0.95rem] italic text-wine">{entry.date}</p>
                        <h3 className="mt-1 font-display text-[1.3rem] font-medium leading-tight text-burgundy sm:text-2xl">{entry.title}</h3>
                        <p className="mt-0.5 text-[0.85rem] leading-snug text-mauve sm:text-base">{entry.description}</p>
                        {entry.image && (
                          <div className="relative mt-3 aspect-[4/3] overflow-hidden rounded-soft bg-blush">
                            <SafeImage src={entry.image} alt={entry.imageAlt ?? entry.title} sizes="(min-width:640px) 520px, 80vw" />
                          </div>
                        )}
                      </article>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="jokes"
            role="tabpanel"
            id="panel-jokes"
            aria-labelledby="tab-jokes"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <InsideJokes />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
