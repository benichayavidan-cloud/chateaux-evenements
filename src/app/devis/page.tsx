import { Metadata } from "next";
import { DevisForm } from "@/components/DevisForm";
import { theme } from "@/config/theme";

export const metadata: Metadata = {
  title: "Demande de Devis | Select Châteaux",
  description:
    "Obtenez un devis personnalisé pour votre événement d'entreprise dans l'un de nos 3 châteaux d'exception en Île-de-France.",
};

export default function DevisPage() {
  return (
    <div style={{ minHeight: "100vh", background: theme.colors.neutral.gray50, paddingTop: "64px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      {/* Hero */}
      <div style={{
        background: theme.colors.primary.bronze,
        color: "white",
        padding: "clamp(2rem, 6vw, 2.5rem) clamp(1.5rem, 5vw, 2.5rem)",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "clamp(180px, 32vh, 220px)",
        marginTop: "clamp(0.75rem, 2vw, 1rem)"
      }}>
        <div style={{ maxWidth: "900px", padding: "0 1rem" }}>
          <h1 style={{
            fontSize: "clamp(1.625rem, 5.5vw, 3.5rem)",
            fontWeight: theme.typography.fontWeight.light,
            fontStyle: "italic",
            fontFamily: theme.typography.fonts.heading,
            marginBottom: "clamp(0.875rem, 2.5vw, 1.25rem)",
            lineHeight: 1.2
          }}>
            Demandez votre Devis Personnalisé
          </h1>
          <p style={{
            fontSize: "clamp(0.9375rem, 2.8vw, 1.25rem)",
            opacity: 0.95,
            lineHeight: 1.5,
            margin: "0 auto",
            padding: "0 0.5rem"
          }}>
            Remplissez ce formulaire en 4 étapes simples et recevez votre devis
            sur-mesure dans les 24 heures
          </p>
        </div>
      </div>

      {/* Formulaire */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "clamp(1.5rem, 4vw, 2rem) clamp(1.25rem, 5vw, 2.5rem) clamp(2.5rem, 7vw, 4rem)"
      }}>
        <DevisForm />
      </div>
    </div>
  );
}
