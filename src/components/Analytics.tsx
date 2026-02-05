/**
 * GOOGLE ANALYTICS & TAG MANAGER - SEO 2026
 * Composant pour tracking et analytics
 */

"use client";

import Script from "next/script";
import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// Configuration - IDs Google
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "";

/**
 * Google Analytics 4 Component - Internal
 */
function GoogleAnalyticsInternal() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views on route change
  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      if (GA_MEASUREMENT_ID) {
        window.gtag("config", GA_MEASUREMENT_ID, {
          page_path: pathname + searchParams.toString(),
        });
      }
      if (GOOGLE_ADS_ID) {
        window.gtag("config", GOOGLE_ADS_ID, {
          page_path: pathname + searchParams.toString(),
        });
      }
    }
  }, [pathname, searchParams]);

  if (process.env.NODE_ENV !== "production") {
    return null; // Désactivé en dev
  }

  // Utiliser Google Ads ID comme fallback si pas de GA4
  const primaryId = GA_MEASUREMENT_ID || GOOGLE_ADS_ID;
  if (!primaryId) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${primaryId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            ${GA_MEASUREMENT_ID ? `gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure'
            });` : ''}
            ${GOOGLE_ADS_ID ? `gtag('config', '${GOOGLE_ADS_ID}');` : ''}
          `,
        }}
      />
    </>
  );
}

/**
 * Google Analytics 4 Component - Wrapped with Suspense
 */
export function GoogleAnalytics() {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsInternal />
    </Suspense>
  );
}

/**
 * Google Tag Manager Component
 */
export function GoogleTagManager() {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <>
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
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
