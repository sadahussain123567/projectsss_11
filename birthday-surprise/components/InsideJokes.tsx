import { birthdayData } from "@/data/birthday";
import { ICONS } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const TINTS = ["bg-petal", "bg-mist", "bg-paper", "bg-blush/70"];
const TILTS = [-1.2, 0.9, -0.6, 1.1, -0.9];

/** "Things Only We Would Understand": the old pill style, now carrying the inside jokes. */
export function InsideJokes() {
  const { insideJokes } = birthdayData;

  return (
    <div>
      <SectionHeading title={insideJokes.title} />

      <ul className="mt-6 flex flex-col gap-3">
        {insideJokes.items.map((item, i) => {
          const Icon = ICONS[item.icon];
          return (
            <li key={item.text}>
              <Reveal delay={i * 0.09} x={i % 2 ? 16 : -16} y={6}>
                <div
                  className={cn(
                    "group flex items-center gap-3.5 rounded-card border border-wine/10 p-3 pr-5 shadow-soft transition duration-500 ease-silk hover:-translate-y-1 hover:shadow-lift motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                    TINTS[i % TINTS.length],
                  )}
                  style={{ rotate: `${TILTS[i % TILTS.length]}deg` }}
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-cream text-rose transition-transform duration-500 ease-silk group-hover:-rotate-12 group-hover:scale-110 motion-reduce:transition-none">
                    <Icon className="size-4.5" aria-hidden />
                  </span>
                  <span className="font-display text-[1.25rem] leading-snug text-burgundy sm:text-2xl">{item.text}</span>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
