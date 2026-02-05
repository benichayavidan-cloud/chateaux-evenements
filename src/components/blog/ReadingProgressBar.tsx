"use client";

interface ReadingProgressBarProps {
  progress: number;
}

export function ReadingProgressBar({ progress }: ReadingProgressBarProps) {
  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 z-50 origin-left bg-gradient-to-l from-amber-600 to-[#d4af37]"
      style={{ transform: `scaleX(${progress})` }}
    />
  );
}
