"use client";

import dynamic from "next/dynamic";

const CookieConsent = dynamic(
  () => import("@/components/CookieConsent").then(mod => ({ default: mod.CookieConsent })),
  { ssr: false }
);

export function CookieConsentLazy({ variant }: { variant?: "default" | "small" | "mini" }) {
  return <CookieConsent variant={variant} />;
}
