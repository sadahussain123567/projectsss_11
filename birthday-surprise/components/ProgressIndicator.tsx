import { SCREENS, type Tone } from "@/lib/screens";
import { cn } from "@/lib/utils";

/** "03 / 07" over a row of small pills. Quiet on purpose. */
export function ProgressIndicator({ step, tone }: { step: number; tone: Tone }) {
  const dark = tone === "dark";
  const total = SCREENS.length;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-2 pt-1" role="img" aria-label={`Screen ${step + 1} of ${total}: ${SCREENS[step].label}`}>
      <p className={cn("font-display text-[0.95rem] italic leading-none tabular-nums tracking-wider transition-colors duration-500", dark ? "text-cream/85" : "text-wine")}>
        {pad(step + 1)} / {pad(total)}
      </p>
      <div className="flex items-center gap-1.5" aria-hidden>
        {SCREENS.map((screen, i) => (
          <span
            key={screen.id}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500 ease-silk motion-reduce:transition-none",
              i === step ? "w-6" : "w-1.5",
              i <= step ? (dark ? "bg-champagne" : "bg-rose") : dark ? "bg-cream/25" : "bg-dusty/30",
            )}
          />
        ))}
      </div>
    </div>
  );
}
