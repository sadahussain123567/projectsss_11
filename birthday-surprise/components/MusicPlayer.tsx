"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Music, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { birthdayData } from "@/data/birthday";
import { cn } from "@/lib/utils";

type Status = "idle" | "playing" | "paused" | "unavailable";

export function MusicPlayer() {
  const { music } = birthdayData;
  const reduce = useReducedMotion();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [note, setNote] = useState(false);

  // Briefly explain if the song can't be played, then tuck the note away.
  useEffect(() => {
    if (status !== "unavailable") return;
    const show = window.setTimeout(() => setNote(true), 0);
    const hide = window.setTimeout(() => setNote(false), 4000);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, [status]);

  if (!music.enabled) return null;

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (status === "unavailable") {
      setNote(true);
      window.setTimeout(() => setNote(false), 4000);
      return;
    }
    if (!audio.paused) {
      audio.pause();
      return;
    }
    try {
      await audio.play();
    } catch {
      // Missing or unsupported file, or the browser blocked playback.
      setStatus("unavailable");
    }
  };

  const playing = status === "playing";

  return (
    <div className="relative">
      {/* preload="none": nothing is downloaded until she presses play */}
      <audio
        ref={audioRef}
        src={music.src}
        loop
        preload="none"
        onPlay={() => setStatus("playing")}
        onPause={() => setStatus((s) => (s === "unavailable" ? s : "paused"))}
        onError={() => setStatus("unavailable")}
      />

      <AnimatePresence>
        {(playing || note) && (
          <motion.div
            key={note ? "note" : "title"}
            role="status"
            className="absolute left-0 top-full mt-2 flex w-max max-w-[10.5rem] items-center gap-2.5 rounded-full border border-white/60 bg-cream/90 py-2 pl-4 pr-4 text-sm text-burgundy shadow-soft backdrop-blur-xl sm:max-w-[16rem]"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.35 }}
          >
            {note ? (
              <span className="truncate">Song not found yet</span>
            ) : (
              <>
                <span className="flex h-3.5 items-end gap-0.5" aria-hidden>
                  {[0, 1, 2].map((bar) => (
                    <motion.span
                      key={bar}
                      className="w-0.5 origin-bottom rounded-full bg-rose"
                      style={{ height: "100%" }}
                      animate={reduce ? { scaleY: 0.6 } : { scaleY: [0.3, 1, 0.45, 0.9, 0.3] }}
                      transition={{ duration: 1.1 + bar * 0.15, repeat: Infinity, ease: "easeInOut" }}
                    />
                  ))}
                </span>
                <span className="truncate font-display text-base italic">{music.title}</span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? `Pause ${music.title}` : `Play ${music.title}`}
        className={cn(
          "relative flex size-11 items-center justify-center rounded-full border border-white/60 bg-cream/70 text-burgundy shadow-soft backdrop-blur-xl transition duration-300 ease-silk hover:scale-105 hover:shadow-lift active:scale-95 ",
          status === "unavailable" && "opacity-70",
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={playing ? "pause" : status === "idle" ? "music" : "play"}
            initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.6, rotate: 30 }}
            transition={{ duration: 0.2 }}
            className="flex"
          >
            {playing ? (
              <Pause className="size-5 fill-current" aria-hidden />
            ) : status === "idle" ? (
              <Music className="size-5" aria-hidden />
            ) : (
              <Play className="size-5 translate-x-px fill-current" aria-hidden />
            )}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}
