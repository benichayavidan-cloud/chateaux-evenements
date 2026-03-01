/**
 * GOOGLE ANALYTICS & TRACKING - SEO 2026
 * Le script gtag.js et les configs GA4/Ads sont chargés dans layout.tsx <head>
 * Ce composant gère uniquement le tracking de navigation SPA (changements de route)
 */

"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { captureGclid } from "@/lib/gclid";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "";

/**
 * Track SPA page views on route change
 */
function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Capturer le GCLID Google Ads depuis l'URL (stocké en cookie 90j)
    captureGclid();

    if (typeof window === "undefined" || !window.gtag) return;

    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");

    if (GA_MEASUREMENT_ID) {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: url,
      });
    }
    if (GOOGLE_ADS_ID) {
      window.gtag("config", GOOGLE_ADS_ID, {
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
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "phone_click", {
      event_category: "engagement",
      event_label: "07 57 99 11 46",
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

export const trackDevisRequest = (chateauIds: string[]) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "generate_lead", {
      event_category: "conversion",
      chateaux_selected: chateauIds.join(","),
      value: 1,
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
