/**
 * Google Consent Mode v2 - Advanced Implementation
 *
 * Ce script initialise le Consent Mode v2 en mode "Advanced".
 * Même sans consentement, Google reçoit des signaux anonymes (pings)
 * pour optimiser les campagnes tout en respectant le RGPD.
 *
 * Documentation : https://developers.google.com/tag-platform/security/guides/consent
 */

export const initConsentMode = () => {
  if (typeof window === "undefined") return;

  // Initialiser le dataLayer si nécessaire
  window.dataLayer = window.dataLayer || [];

  function gtag(...args: any[]) {
    window.dataLayer.push(arguments);
  }

  // IMPORTANT : Consent Mode v2 par défaut AVANT le chargement des tags
  // En mode "Advanced", même avec "denied", Google reçoit des pings anonymes
  gtag("consent", "default", {
    // Analytics
    analytics_storage: "denied", // Google Analytics

    // Publicité (Google Ads)
    ad_storage: "denied", // Stockage cookies publicitaires
    ad_user_data: "denied", // Envoi données utilisateur à Google
    ad_personalization: "denied", // Personnalisation des annonces

    // Paramètres additionnels v2
    functionality_storage: "granted", // Cookies fonctionnels (nécessaires)
    personalization_storage: "denied", // Personnalisation du site
    security_storage: "granted", // Cookies de sécurité (nécessaires)

    // Région (EEE + UK)
    region: ["FR", "BE", "CH", "LU", "CA"], // France, Belgique, Suisse, Luxembourg, Canada

    // Mode Advanced : envoie des pings même en "denied"
    wait_for_update: 500, // Attendre max 500ms pour le consentement utilisateur
  });

  // Log pour debugging (dev uniquement)
  if (process.env.NODE_ENV === "development") {
    console.log("✅ Google Consent Mode v2 initialisé en mode Advanced");
  }
};

/**
 * Fonction pour vérifier si l'utilisateur a déjà donné son consentement
 */
export const hasConsent = (): boolean => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("cookie-consent") !== null;
};

/**
 * Fonction pour obtenir le statut du consentement
 */
export const getConsentStatus = (): "accepted" | "rejected" | null => {
  if (typeof window === "undefined") return null;
  const consent = localStorage.getItem("cookie-consent");
  return consent as "accepted" | "rejected" | null;
};
