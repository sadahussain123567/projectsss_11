"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { Memory, MemoryShape } from "@/data/birthday";
import { useDialog } from "@/lib/useDialog";
import { useIsClient } from "@/lib/useIsClient";
import { SafeImage } from "./ui/SafeImage";

const RATIO: Record<MemoryShape, number> = { portrait: 3 / 4, landscape: 4 / 3, square: 1, tall: 2 / 3 };

interface MemoryModalProps {
  memories: Memory[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function MemoryModal({ memories, index, onClose, onNavigate }: MemoryModalProps) {
  const isClient = useIsClient();
  if (!isClient) return null;
  // Rendered into <body> so it always sits above the header and bottom navigation.
  return createPortal(
    <AnimatePresence>
      {index !== null && <ModalBody key="memory-modal" memories={memories} index={index} onClose={onClose} onNavigate={onNavigate} />}
    </AnimatePresence>,
    document.body,
  );
}

function ModalBody({ memories, index, onClose, onNavigate }: MemoryModalProps & { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const total = memories.length;
  const memory = memories[index];

  useDialog(true, onClose, ref);

  const go = useCallback((step: number) => onNavigate((index + step + total) % total), [index, total, onNavigate]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [go]);

  // Size the frame by width so it always matches the photo's proportions.
  const ratio = RATIO[memory.shape];
  const frameWidth = `min(90vw, calc(min(64dvh, 680px) * ${ratio}))`;

  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo: ${memory.caption}`}
      tabIndex={-1}
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-5 bg-burgundy/90 px-4 py-6 outline-none backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close photo"
        className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full border border-cream/25 bg-cream/10 text-cream transition duration-300 hover:bg-cream/20 active:scale-95 focus-visible:outline-champagne"
      >
        <X className="size-5" aria-hidden />
      </button>

      <AnimatePresence mode="wait" initial={false}>
        <motion.figure
          key={index}
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.25}
          onDragEnd={(_, info) => {
            if (info.offset.x < -80) go(1);
            else if (info.offset.x > 80) go(-1);
          }}
        >
          <div
            className="relative overflow-hidden rounded-card bg-blush shadow-[0_40px_90px_-30px_rgb(0_0_0/0.7)]"
            style={{ width: frameWidth, aspectRatio: ratio }}
          >
            <SafeImage src={memory.image} alt={memory.alt} sizes="90vw" priority />
          </div>
          <figcaption className="max-w-[90vw] text-center font-display text-2xl italic text-cream sm:text-3xl">{memory.caption}</figcaption>
        </motion.figure>
      </AnimatePresence>

      <div className="flex items-center gap-5">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous photo"
          className="flex size-12 items-center justify-center rounded-full border border-cream/25 bg-cream/10 text-cream transition duration-300 hover:bg-cream/20 active:scale-95 focus-visible:outline-champagne"
        >
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <p className="min-w-14 text-center text-sm tabular-nums text-cream/70" aria-live="polite">
          {index + 1} / {total}
        </p>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next photo"
          className="flex size-12 items-center justify-center rounded-full border border-cream/25 bg-cream/10 text-cream transition duration-300 hover:bg-cream/20 active:scale-95 focus-visible:outline-champagne"
        >
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>
    </motion.div>
  );
}
