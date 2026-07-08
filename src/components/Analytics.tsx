/**
 * GOOGLE ANALYTICS (GA4) & TRACKING - SEO/GEO 2026
 * Le script gtag.js et la config GA4 sont chargés dans layout.tsx <head>.
 * Ce composant gère le tracking de navigation SPA (changements de route)
 * et la détection des référents IA (GEO).
 */

"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

/**
 * Sources de trafic IA (GEO) — hostname du référent → libellé de source.
 * Permet de mesurer explicitement le trafic venu des moteurs de réponse IA
 * (au-delà du canal "AI Assistant" auto de GA4) via un événement dédié.
 */
const AI_REFERRERS: { match: RegExp; source: string }[] = [
  { match: /(^|\.)chatgpt\.com$|(^|\.)chat\.openai\.com$/, source: "chatgpt" },
  { match: /(^|\.)perplexity\.ai$/, source: "perplexity" },
  { match: /(^|\.)gemini\.google\.com$|(^|\.)bard\.google\.com$/, source: "gemini" },
  { match: /(^|\.)copilot\.microsoft\.com$|(^|\.)copilot\.cloud\.microsoft$/, source: "copilot" },
  { match: /(^|\.)claude\.ai$/, source: "claude" },
  { match: /(^|\.)you\.com$/, source: "you" },
  { match: /(^|\.)poe\.com$/, source: "poe" },
];

/**
 * Détecte une arrivée depuis un assistant IA et émet un événement GA4 `ai_referral`
 * (une seule fois par session). À exposer en dimension/segment dans GA4.
 */
function trackAiReferral() {
  if (typeof window === "undefined" || !window.gtag || !document.referrer) return;
  try {
    if (sessionStorage.getItem("sc_ai_ref")) return;
    const host = new URL(document.referrer).hostname;
    const hit = AI_REFERRERS.find((r) => r.match.test(host));
    if (!hit) return;
    sessionStorage.setItem("sc_ai_ref", hit.source);
    window.gtag("event", "ai_referral", {
      event_category: "acquisition",
      ai_source: hit.source,
      page_referrer: document.referrer,
    });
  } catch {
    // URL invalide ou sessionStorage indisponible — sans impact.
  }
}

/**
 * Track SPA page views on route change
 */
function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Mesurer le trafic venu des assistants IA (GEO) — 1×/session
    trackAiReferral();

    if (typeof window === "undefined" || !window.gtag) return;

    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");

    if (GA_MEASUREMENT_ID) {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}

/**
 * Google Analytics - SPA page view tracker (wrapped with Suspense)
 */
export function GoogleAnalytics() {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <PageViewTracker />
    </Suspense>
  );
}

/**
 * Google Tag Manager Component
 */
export function GoogleTagManager() {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";

  if (process.env.NODE_ENV !== "production" || !GTM_ID) {
    return null;
  }

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}

/**
 * Hook pour tracker les événements personnalisés
 */
export function useTrackEvent() {
  const trackEvent = (
    eventName: string,
    eventParams?: Record<string, any>
  ) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", eventName, eventParams);
    }
  };

  return { trackEvent };
}

/**
 * Helper functions pour événements courants
 */
export const trackFormSubmit = (formName: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "form_submit", {
      form_name: formName,
      event_category: "engagement",
    });
  }
  try { const { trackSiteEvent } = require("./SiteTracker"); trackSiteEvent("FORM_SUBMIT", formName); } catch {}
};

export const trackDownload = (fileName: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "file_download", {
      file_name: fileName,
      event_category: "engagement",
    });
  }
};

export const trackPhoneClick = () => {
  try { const { trackSiteEvent } = require("./SiteTracker"); trackSiteEvent("CLICK_PHONE", "header-phone"); } catch {}
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "phone_click", {
      event_category: "engagement",
      event_label: "07 57 99 11 46",
    });
  }
};

/**
 * Micro-conversion : l'utilisateur commence à remplir un formulaire (signal d'engagement GA4).
 */
export const trackFormStart = (formName: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "form_start", {
      event_category: "engagement",
      event_label: formName,
    });
  }
};

export const trackChateauView = (chateauName: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "view_item", {
      item_name: chateauName,
      item_category: "chateau",
      event_category: "engagement",
    });
  }
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}
