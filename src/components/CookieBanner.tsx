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
      <div className="pointer-events-auto w-full max-w-4xl bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-200">
        {/* Header élégant */}
        <div className="bg-[var(--gold)] px-8 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-900 font-bold text-lg tracking-tight">
              🍪 Gestion des cookies
            </h3>
            <button
              onClick={handleReject}
              className="text-gray-900 hover:text-gray-700 transition-colors p-1"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Contenu avec marges internes */}
        <div className="px-8 py-6">
          <p className="text-gray-800 text-base leading-relaxed mb-4">
            Nous utilisons des <strong>cookies et technologies similaires</strong> pour améliorer votre expérience,
            analyser notre trafic et mesurer l'efficacité de nos campagnes publicitaires.
            Vos données sont traitées de manière <strong>anonyme et sécurisée</strong>.
          </p>

          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            En acceptant, vous nous aidez à optimiser nos services pour mieux répondre à vos besoins
            en séminaires d'entreprise. Vous pouvez modifier vos préférences à tout moment.
          </p>

          {/* Boutons d'action avec padding correct */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Bouton ACCEPTER - mis en avant */}
            <button
              onClick={handleAccept}
              className="flex-1 bg-gradient-to-r from-[var(--gold)] to-[var(--bronze-antique)] text-gray-900 font-bold py-4 px-8 rounded-lg hover:shadow-xl transition-shadow duration-200 text-base"
            >
              ✓ Accepter tous les cookies
            </button>

            {/* Bouton REFUSER - avec padding interne */}
            <button
              onClick={handleReject}
              className="flex-1 bg-gray-100 text-gray-700 font-semibold py-4 px-8 rounded-lg hover:bg-gray-200 transition-colors text-base border border-gray-300"
            >
              Refuser
            </button>
          </div>

          {/* Footer avec lien vers politique */}
          <div className="mt-6 pt-5 border-t border-gray-200">
            <p className="text-sm text-gray-500 leading-relaxed">
              Pour en savoir plus, consultez notre{" "}
              <a
                href="/confidentialite"
                className="text-[var(--gold)] hover:underline font-semibold"
              >
                Politique de confidentialité
              </a>
              {" "}et nos{" "}
              <a
                href="/cgv"
                className="text-[var(--gold)] hover:underline font-semibold"
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
