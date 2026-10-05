"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { INTRO_MS } from "@/lib/constants";

/** A short, calm opening moment. The page underneath is already loading. */
export function IntroLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    const timer = window.setTimeout(() => setVisible(false), INTRO_MS);
    return () => {
      window.clearTimeout(timer);
      root.style.overflow = previous;
    };
  }, []);

  // Release scroll as soon as the screen starts leaving.
  useEffect(() => {
    if (!visible) document.documentElement.style.overflow = "";
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          role="status"
          aria-live="polite"
          className="intro-screen fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-cream px-6 text-center"
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            animate={{ scale: [1, 1.18, 1, 1.12, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart className="size-9 fill-rose text-rose" aria-hidden />
          </motion.div>
          <motion.p
            className="font-display text-2xl italic text-wine sm:text-3xl"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
          >
            Something special is waiting for you...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
