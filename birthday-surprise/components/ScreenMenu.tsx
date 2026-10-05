"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart, X } from "lucide-react";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { EASE } from "@/lib/constants";
import { SCREENS } from "@/lib/screens";
import { useDialog } from "@/lib/useDialog";
import { useIsClient } from "@/lib/useIsClient";
import { cn } from "@/lib/utils";

interface ScreenMenuProps {
  open: boolean;
  current: number;
  onSelect: (index: number) => void;
  onClose: () => void;
}

/** A bottom sheet that jumps straight to any screen. */
export function ScreenMenu(props: ScreenMenuProps) {
  const isClient = useIsClient();
  if (!isClient) return null;
  return createPortal(<AnimatePresence>{props.open && <Sheet key="sheet" {...props} />}</AnimatePresence>, document.body);
}

function Sheet({ current, onSelect, onClose }: ScreenMenuProps) {
  const ref = useRef<HTMLDivElement>(null);
  useDialog(true, onClose, ref);

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-burgundy/45 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Jump to a screen"
        tabIndex={-1}
        className="paper relative w-full max-w-md rounded-t-[2rem] border border-b-0 border-white/70 px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-30px_80px_-30px_rgb(78_26_45/0.55)] outline-none"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.5, ease: EASE }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.6 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 90 || info.velocity.y > 500) onClose();
        }}
      >
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-dusty/50" aria-hidden />

        <div className="mb-2 flex items-center justify-between">
          <p className="flex items-center gap-2 font-display text-xl italic text-mauve">
            <Heart className="size-3.5 fill-dusty text-dusty" aria-hidden />
            Jump to
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex size-10 items-center justify-center rounded-full border border-dusty/40 text-burgundy transition active:scale-95"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>

        <ul>
          {SCREENS.map((screen, i) => {
            const active = i === current;
            return (
              <li key={screen.id}>
                <button
                  type="button"
                  onClick={() => onSelect(i)}
                  aria-current={active ? "step" : undefined}
                  className={cn(
                    "flex w-full items-center gap-4 rounded-soft px-3 py-2.5 text-left transition-colors duration-300 active:bg-blush/60",
                    active ? "bg-petal/80" : "hover:bg-petal/50",
                  )}
                >
                  <span className="w-6 font-display text-base italic tabular-nums text-mauve">{String(i + 1).padStart(2, "0")}</span>
                  <span className={cn("flex-1 font-display text-[1.65rem] leading-tight", active ? "italic text-rose" : "text-burgundy")}>
                    {screen.label}
                  </span>
                  {active && <Heart className="size-4 fill-rose text-rose" aria-hidden />}
                </button>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </motion.div>
  );
}
