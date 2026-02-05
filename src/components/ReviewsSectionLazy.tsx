"use client";

import dynamic from "next/dynamic";

const ReviewsSection = dynamic(
  () => import("@/components/ReviewsSection").then(mod => ({ default: mod.ReviewsSection })),
  { ssr: false }
);

export function ReviewsSectionLazy() {
  return <ReviewsSection />;
}
