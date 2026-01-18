import { Metadata } from "next";
import { DevisForm } from "@/components/DevisForm";
import { theme } from "@/config/theme";
import Image from "next/image";
import { Check, Clock, Building2, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Devis Séminaire Gratuit & Réponse 24h | Select Châteaux",
  description:
    "Obtenez votre devis gratuit pour votre séminaire en château. Réponse sous 24h, 4 châteaux d'exception en Île-de-France. Sans engagement.",
  keywords: [
    "devis séminaire château",
    "devis gratuit séminaire",
    "location château entreprise",
    "devis 24h séminaire",
  ],
};

export default function DevisPage() {
  const quoteActionSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Demande de Devis Séminaire Château",
    "description": "Recevez votre devis personnalisé sous 24h pour votre séminaire en Île-de-France.",
    "mainEntity": {
      "@type": "Service",
      "name": "Organisation de Séminaires d'Entreprise",
      "provider": {
        "@type": "Organization",
        "name": "Select Châteaux",
        "image": "https://www.selectchateaux.com/logo.png"
      },
      "potentialAction": {
        "@type": "QuoteAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.selectchateaux.com/devis",
          "inLanguage": "fr-FR",
          "actionPlatform": [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform"
          ]
        },
        "result": {
          "@type": "Quote",
          "availability": "https://schema.org/InStock"
        }
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quoteActionSchema) }}
      />

      <div style={{ minHeight: "100vh", background: theme.colors.neutral.gray50, paddingTop: "64px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {/* Hero avec Image d'ambiance */}
        <div style={{
          position: "relative",
          background: theme.colors.primary.bronze,
          color: "white",
          padding: "clamp(2.5rem, 6vw, 3rem) clamp(1.5rem, 5vw, 2.5rem)",
          textAlign: "center",
          minHeight: "clamp(240px, 38vh, 280px)",
          marginTop: "clamp(0.75rem, 2vw, 1rem)",
          overflow: "hidden"
        }}>
          {/* Image d'ambiance en arrière-plan */}
          <div style={{
            position: "absolute",
            inset: 0,
            opacity: 0.15,
            zIndex: 0
          }}>
            <Image
              src="/images/accueil/hero/chateau-1.jpg"
              alt="Devis location château séminaire Île-de-France - Salle de réunion lumineuse"
              fill
              className="object-cover"
              priority
              sizes="100vw"
              quality={80}
            />
          </div>

          {/* Contenu Hero */}
          <div style={{ position: "relative", zIndex: 1, maxWidth: "900px", margin: "0 auto", padding: "0 1rem" }}>
            <h1 style={{
              fontSize: "clamp(1.75rem, 6vw, 3.75rem)",
              fontWeight: theme.typography.fontWeight.light,
              fontStyle: "italic",
              fontFamily: theme.typography.fonts.heading,
              marginBottom: "clamp(1rem, 3vw, 1.5rem)",
              lineHeight: 1.2
            }}>
              Devis Séminaire Gratuit & Réponse 24h
            </h1>
            <p style={{
              fontSize: "clamp(1rem, 3vw, 1.375rem)",
              opacity: 0.95,
              lineHeight: 1.5,
              margin: "0 auto",
              padding: "0 0.5rem",
              maxWidth: "700px"
            }}>
              Remplissez le formulaire en 4 étapes et recevez votre devis personnalisé pour votre séminaire en château
            </p>

            {/* Éléments de Réassurance */}
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "clamp(1rem, 3vw, 2rem)",
              marginTop: "clamp(1.5rem, 4vw, 2.5rem)"
            }}>
              {/* 4 Châteaux */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(255,255,255,0.15)",
                padding: "0.75rem 1.25rem",
                borderRadius: "50px",
                backdropFilter: "blur(10px)"
              }}>
                <Building2 className="w-5 h-5" />
                <span style={{ fontSize: "0.9375rem", fontWeight: 600 }}>4 Châteaux d'exception</span>
              </div>

              {/* Réponse 24h */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(255,255,255,0.15)",
                padding: "0.75rem 1.25rem",
                borderRadius: "50px",
                backdropFilter: "blur(10px)"
              }}>
                <Clock className="w-5 h-5" />
                <span style={{ fontSize: "0.9375rem", fontWeight: 600 }}>Réponse sous 24h</span>
              </div>

              {/* Gratuit */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(255,255,255,0.15)",
                padding: "0.75rem 1.25rem",
                borderRadius: "50px",
                backdropFilter: "blur(10px)"
              }}>
                <Check className="w-5 h-5" />
                <span style={{ fontSize: "0.9375rem", fontWeight: 600 }}>Gratuit & Sans engagement</span>
              </div>

              {/* Note */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.375rem",
                background: "rgba(255,255,255,0.15)",
                padding: "0.75rem 1.25rem",
                borderRadius: "50px",
                backdropFilter: "blur(10px)"
              }}>
                <div style={{ display: "flex", gap: "2px" }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span style={{ fontSize: "0.9375rem", fontWeight: 600 }}>4.9/5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "clamp(2rem, 5vw, 3rem) clamp(1.25rem, 5vw, 2.5rem) clamp(2.5rem, 7vw, 4rem)"
        }}>
          <DevisForm />
        </div>
      </div>
    </>
  );
}
