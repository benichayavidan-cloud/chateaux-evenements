"use client";

import { CookieConsent } from "@/components/CookieConsent";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export default function CookieDemoPage() {
  const [showDefault, setShowDefault] = useState(false);
  const [showSmall, setShowSmall] = useState(false);
  const [showMini, setShowMini] = useState(false);

  const resetAll = () => {
    localStorage.removeItem("cookie-consent");
    setShowDefault(false);
    setShowSmall(false);
    setShowMini(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-32">
      <div className="container mx-auto px-8 max-w-5xl">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Démo Cookie Consent
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          Testez les 3 variantes de la bannière de cookies
        </p>

        <div className="space-y-8">
          {/* Variant Default */}
          <div className="border border-gray-200 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              1. Variante &quot;Default&quot;
            </h2>
            <p className="text-gray-600 mb-6">
              Version complète avec header, contenu détaillé et lien &quot;En savoir plus&quot;.
              Parfait pour informer complètement l&apos;utilisateur.
            </p>
            <div className="flex gap-4">
              <Button
                onClick={() => {
                  resetAll();
                  setShowDefault(true);
                }}
                variant="primary"
                size="md"
              >
                Afficher Default
              </Button>
              {showDefault && (
                <div className="relative">
                  <CookieConsent
                    variant="default"
                    onAcceptCallback={() => setShowDefault(false)}
                    onDeclineCallback={() => setShowDefault(false)}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Variant Small */}
          <div className="border border-gray-200 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              2. Variante &quot;Small&quot;
            </h2>
            <p className="text-gray-600 mb-6">
              Version compacte avec boutons arrondis. Design moderne et épuré
              pour une expérience discrète.
            </p>
            <div className="flex gap-4">
              <Button
                onClick={() => {
                  resetAll();
                  setShowSmall(true);
                }}
                variant="primary"
                size="md"
              >
                Afficher Small
              </Button>
              {showSmall && (
                <div className="relative">
                  <CookieConsent
                    variant="small"
                    onAcceptCallback={() => setShowSmall(false)}
                    onDeclineCallback={() => setShowSmall(false)}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Variant Mini */}
          <div className="border border-gray-200 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              3. Variante &quot;Mini&quot;
            </h2>
            <p className="text-gray-600 mb-6">
              Version minimale inline pour notifications subtiles. Parfait pour
              ne pas gêner l&apos;expérience utilisateur.
            </p>
            <div className="flex gap-4">
              <Button
                onClick={() => {
                  resetAll();
                  setShowMini(true);
                }}
                variant="primary"
                size="md"
              >
                Afficher Mini
              </Button>
              {showMini && (
                <div className="relative">
                  <CookieConsent
                    variant="mini"
                    onAcceptCallback={() => setShowMini(false)}
                    onDeclineCallback={() => setShowMini(false)}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Reset Button */}
          <div className="pt-8 border-t border-gray-200">
            <Button onClick={resetAll} variant="secondary" size="md">
              Réinitialiser tout
            </Button>
          </div>
        </div>

        {/* Info */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-2">
            ✓ Google Consent Mode v2 intégré
          </h3>
          <p className="text-sm text-blue-800">
            Toutes les variantes incluent automatiquement le Google Consent Mode
            v2 en mode Advanced. Les signaux anonymisés sont envoyés à Google
            même en cas de refus.
          </p>
        </div>
      </div>
    </main>
  );
}
