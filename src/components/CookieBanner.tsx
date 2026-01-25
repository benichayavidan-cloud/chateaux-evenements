"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà fait un choix
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Afficher la bannière après 1 seconde (pour meilleure UX)
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    // Mettre à jour le consentement
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
    // Refuser les cookies (seuls les cookies essentiels)
    updateConsent({
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });

    localStorage.setItem("cookie-consent", "rejected");
    setIsVisible(false);
  };

  const handleCustomize = () => {
    // Pour l'instant, rediriger vers la page de confidentialité
    window.location.href = "/confidentialite#cookies";
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center p-4 sm:p-6 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-4xl bg-white border-2 border-[var(--gold)] shadow-2xl rounded-lg overflow-hidden">
        {/* Header avec couleur gold */}
        <div className="bg-gradient-to-r from-[var(--gold)] to-[var(--bronze-antique)] px-6 py-3">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold text-lg">
              🍪 Consentement aux cookies
            </h3>
            <button
              onClick={handleReject}
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Contenu */}
        <div className="px-6 py-5">
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            Nous utilisons des <strong>cookies et technologies similaires</strong> pour améliorer votre expérience,
            analyser notre trafic et mesurer l'efficacité de nos campagnes Google Ads.
            Vos données sont traitées de manière <strong>anonyme et sécurisée</strong>.
          </p>

          <p className="text-gray-600 text-xs mb-6">
            En acceptant, vous nous aidez à optimiser nos services pour mieux répondre à vos besoins
            en séminaires d'entreprise. Vous pouvez modifier vos préférences à tout moment.
          </p>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Bouton ACCEPTER - mis en avant */}
            <button
              onClick={handleAccept}
              className="flex-1 bg-gradient-to-r from-[var(--gold)] to-[var(--bronze-antique)] text-white font-semibold py-3 px-6 rounded-md hover:shadow-lg hover:scale-105 transform transition-all duration-200 text-sm"
            >
              ✓ Accepter tous les cookies
            </button>

            {/* Bouton REFUSER - discret */}
            <button
              onClick={handleReject}
              className="flex-1 sm:flex-initial bg-gray-100 text-gray-700 font-medium py-3 px-6 rounded-md hover:bg-gray-200 transition-colors text-sm border border-gray-300"
            >
              Refuser
            </button>

            {/* Bouton PERSONNALISER - discret */}
            <button
              onClick={handleCustomize}
              className="flex-1 sm:flex-initial text-gray-600 font-medium py-3 px-6 rounded-md hover:bg-gray-50 transition-colors text-sm underline"
            >
              Personnaliser
            </button>
          </div>

          {/* Footer avec lien vers politique */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Pour en savoir plus, consultez notre{" "}
              <a
                href="/confidentialite"
                className="text-[var(--gold)] hover:underline font-medium"
              >
                Politique de confidentialité
              </a>
              {" "}et nos{" "}
              <a
                href="/cgv"
                className="text-[var(--gold)] hover:underline font-medium"
              >
                CGV
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Fonction pour mettre à jour le consentement Google
function updateConsent(params: {
  analytics_storage: "granted" | "denied";
  ad_storage: "granted" | "denied";
  ad_user_data: "granted" | "denied";
  ad_personalization: "granted" | "denied";
}) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("consent", "update", params);

    // Log pour debugging
    console.log("✅ Consent mis à jour:", params);
  }
}
