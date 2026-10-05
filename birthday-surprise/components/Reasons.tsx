import { Heart } from "lucide-react";
import { birthdayData } from "@/data/birthday";
import { ICONS } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const TINTS = ["bg-paper", "bg-petal", "bg-mist", "bg-paper"];

export function Reasons() {
  const { reasons, reasonsSection } = birthdayData;

  return (
    <div className="py-1">
      <SectionHeading title={reasonsSection.title} />

      <ul className="mt-5 grid grid-cols-2 gap-2.5 sm:mt-8 sm:grid-cols-3 sm:gap-4">
        {reasons.map((reason, i) => {
          const Icon = ICONS[reason.icon];
          return (
            // an odd last card spans the row so the grid never looks unfinished on phones
            <li key={reason.title} className="max-sm:last:odd:col-span-2">
              <Reveal delay={i * 0.07} y={12} className="h-full">
                <article
                  className={cn(
                    "group relative flex h-full flex-col gap-2 overflow-hidden rounded-card border border-wine/10 p-3.5 shadow-soft transition duration-500 ease-silk hover:-translate-y-1.5 hover:shadow-lift sm:gap-3 sm:p-5 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                    TINTS[i % TINTS.length],
                  )}
                >
                  <Heart
                    aria-hidden
                    strokeWidth={1}
                    className="absolute -right-3 -top-3 size-14 rotate-12 text-dusty/25 transition-transform duration-700 ease-silk group-hover:rotate-[24deg] group-hover:scale-110"
                  />
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blush text-rose transition duration-500 ease-silk group-hover:rotate-12 group-hover:scale-110 motion-reduce:transition-none sm:size-11">
                    <Icon className="size-4 sm:size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-[1.12rem] font-medium leading-tight text-burgundy sm:text-2xl">{reason.title}</h3>
                    <p className="mt-1 text-[0.78rem] leading-snug text-mauve sm:text-[0.95rem] sm:leading-relaxed">{reason.description}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
