"use client";

import { motion, MotionValue } from "framer-motion";

interface ReadingProgressBarProps {
  scrollYProgress: MotionValue<number>;
}

export function ReadingProgressBar({ scrollYProgress }: ReadingProgressBarProps) {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-50 origin-left bg-gradient-to-l from-amber-600 to-[#d4af37]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
