"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    updateConsent({
      analytics_storage: "granted",
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    });
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleReject = () => {
    updateConsent({
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    localStorage.setItem("cookie-consent", "rejected");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-8 pointer-events-none">
      <div className="pointer-events-auto max-w-6xl mx-auto bg-white shadow-xl rounded-lg border border-gray-300">
        <div className="p-6">
          <div className="flex items-start gap-6">
            {/* Icône */}
            <div className="flex-shrink-0 text-3xl mt-1">🍪</div>

            {/* Contenu */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                Gestion des cookies
              </h3>
              <div className="text-sm text-gray-600 leading-relaxed">
                Nous utilisons des cookies pour améliorer votre expérience et mesurer l'efficacité de nos campagnes.
                Vos données sont traitées de manière <strong>anonyme et sécurisée</strong>.{" "}
                <button
                  onClick={handleAccept}
                  className="inline-block bg-[var(--gold)] hover:bg-[var(--bronze-antique)] text-gray-900 font-medium text-xs py-1.5 px-3 rounded transition-colors whitespace-nowrap ml-4"
                >
                  ✓ Accepter
                </button>{" "}
                <button
                  onClick={handleReject}
                  className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-xs py-1.5 px-3 rounded border border-gray-300 transition-colors whitespace-nowrap"
                >
                  Refuser
                </button>{" "}
                <a
                  href="/mentions-legales"
                  className="inline-block text-xs text-gray-600 hover:text-gray-900 underline py-1.5 px-2 whitespace-nowrap"
                >
                  En savoir plus
                </a>
              </div>
            </div>

            {/* Bouton fermer */}
            <button
              onClick={handleReject}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors p-2"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function updateConsent(params: {
  analytics_storage: "granted" | "denied";
  ad_storage: "granted" | "denied";
  ad_user_data: "granted" | "denied";
  ad_personalization: "granted" | "denied";
}) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("consent", "update", params);
    console.log("✅ Consent mis à jour:", params);
  }
}
