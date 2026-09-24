"use client";

import { useEffect, useState, type ComponentType } from "react";

type CookieConsentProps = { variant?: "default" | "small" | "mini" };

/**
 * Bandeau cookies chargé APRÈS le montage, hors du bundle initial.
 *
 * Remplace `next/dynamic(..., { ssr: false })` (24/09/2026) : cette option
 * inscrivait un marqueur BAILOUT_TO_CLIENT_SIDE_RENDERING dans le HTML de
 * CHAQUE page. Le bandeau n'a de toute façon rien à rendre côté serveur (il
 * dépend de localStorage). Garde-fou : scripts/verif-rendu-main.mjs.
 */
export function CookieConsentLazy({ variant }: CookieConsentProps) {
  const [Banner, setBanner] = useState<ComponentType<CookieConsentProps> | null>(null);

  useEffect(() => {
    let actif = true;
    import("@/components/CookieConsent").then((mod) => {
      if (actif) setBanner(() => mod.CookieConsent);
    });
    return () => {
      actif = false;
    };
  }, []);

  return Banner ? <Banner variant={variant} /> : null;
}
