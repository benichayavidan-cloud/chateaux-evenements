"use client";

import * as React from "react";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface CookieConsentProps {
  variant?: "default" | "small" | "mini";
  onAcceptCallback?: () => void;
  onDeclineCallback?: () => void;
}

export function CookieConsent({
  variant = "default",
  onAcceptCallback,
  onDeclineCallback,
}: CookieConsentProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [hide, setHide] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  const handleAccept = React.useCallback(() => {
    // Google Consent Mode v2
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
      });
    }

    localStorage.setItem("cookie-consent", "accepted");
    setIsOpen(false);
    setTimeout(() => {
      setHide(true);
    }, 700);
    onAcceptCallback?.();
  }, [onAcceptCallback]);

  const handleDecline = React.useCallback(() => {
    // Google Consent Mode v2
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    }

    localStorage.setItem("cookie-consent", "rejected");
    setIsOpen(false);
    setTimeout(() => {
      setHide(true);
    }, 700);
    onDeclineCallback?.();
  }, [onDeclineCallback]);

  React.useEffect(() => {
    try {
      const consent = localStorage.getItem("cookie-consent");
      if (!consent) {
        const timer = setTimeout(() => setIsOpen(true), 1000);
        return () => clearTimeout(timer);
      }
    } catch (error) {
      console.warn("Cookie consent error:", error);
    }
  }, []);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (hide) return null;

  const containerClasses = `fixed z-[9999] transition-all duration-700 ${
    !isOpen ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
  }`;

  // VARIANT DEFAULT - Version complète avec header et contenu détaillé
  if (variant === "default") {
    return (
      <div
        className={`${containerClasses} bottom-0 left-0 right-0 sm:left-4 sm:bottom-4 w-full sm:max-w-md`}
      >
        <Card variant="default" padding="lg" className="m-3 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Cookie className="h-6 w-6 text-[var(--gold)]" />
              <h3 className="text-lg font-bold text-gray-900">
                Nous utilisons des cookies
              </h3>
            </div>
            <button
              onClick={handleDecline}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-3 mb-6">
            <p className="text-sm text-gray-600 leading-relaxed">
              Nous utilisons des cookies pour améliorer votre expérience et
              mesurer l'efficacité de nos campagnes. Vos données sont traitées
              de manière <strong>anonyme et sécurisée</strong>.
            </p>
            <p className="text-xs text-gray-500">
              En cliquant sur{" "}
              <span className="font-semibold">&quot;Accepter&quot;</span>, vous
              acceptez notre utilisation des cookies.
            </p>
            <a
              href="/mentions-legales"
              className="text-xs text-[var(--gold)] hover:text-[var(--bronze-antique)] underline inline-block"
            >
              En savoir plus
            </a>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleDecline}
              variant="secondary"
              size="md"
              className="flex-1"
            >
              Refuser
            </Button>
            <Button
              onClick={handleAccept}
              variant="primary"
              size="md"
              className="flex-1"
            >
              Accepter
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // VARIANT SMALL - Version compacte avec boutons arrondis
  if (variant === "small") {
    return (
      <div
        className={`${containerClasses} bottom-0 left-0 right-0 sm:left-4 sm:bottom-4 w-full sm:max-w-md`}
      >
        <Card variant="default" padding="md" className="m-3 shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-2 mb-3">
            <Cookie className="h-5 w-5 text-[var(--gold)]" />
            <h3 className="text-base font-semibold text-gray-900">
              Nous utilisons des cookies
            </h3>
          </div>

          {/* Content */}
          <p className="text-sm text-gray-600 mb-4">
            Nous utilisons des cookies pour améliorer votre expérience et
            mesurer l'efficacité de nos campagnes.
          </p>

          {/* Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={handleDecline}
              variant="secondary"
              size="sm"
              className="flex-1 rounded-full"
            >
              Refuser
            </Button>
            <Button
              onClick={handleAccept}
              variant="primary"
              size="sm"
              className="flex-1 rounded-full"
            >
              Accepter
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // VARIANT MINI - Version minimale inline pour notifications subtiles
  if (variant === "mini") {
    const cookieText = "Nous utilisons des cookies pour améliorer votre expérience et mesurer l'efficacité de nos campagnes.";

    return (
      <div
        className={containerClasses}
        style={{
          bottom: '16px',
          left: '12px',
          transform: !isOpen ? 'translateY(100%)' : 'translateY(0)',
          width: 'auto',
        }}
      >
        <div
          style={{
            padding: '8px 12px',
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(12px)',
            borderRadius: '10px',
            border: '1px solid rgba(163, 126, 44, 0.1)',
            boxShadow: '0 8px 32px -8px rgba(0, 0, 0, 0.15)',
            width: 'max-content',
            maxWidth: 'calc(100vw - 24px)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div className="flex flex-row items-center gap-3">
            <p
              style={{
                fontSize: '11px',
                lineHeight: '1',
                color: '#374151',
                whiteSpace: 'nowrap',
                margin: 0,
                padding: 0,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {cookieText}
            </p>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                onClick={handleDecline}
                variant="secondary"
                size="sm"
                style={{
                  fontSize: '10px',
                  height: '28px',
                  padding: '0 10px',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                Refuser
              </Button>
              <Button
                onClick={handleAccept}
                variant="primary"
                size="sm"
                style={{
                  fontSize: '10px',
                  height: '28px',
                  padding: '0 10px',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                Accepter
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
