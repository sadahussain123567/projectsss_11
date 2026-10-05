"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/lib/constants";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  x?: number;
  y?: number;
  className?: string;
}

/**
 * Gentle fade + drift when a screen arrives. Each screen is mounted fresh on
 * navigation, so this plays once per visit; the base delay lets the screen
 * transition settle first.
 */
export function Reveal({ children, delay = 0, x = 0, y = 16, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.25 + delay }}
    >
      {children}
    </motion.div>
  );
}
