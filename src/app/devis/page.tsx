import { Metadata } from "next";
import { DevisForm } from "@/components/DevisForm";
import { theme } from "@/config/theme";

export const metadata: Metadata = {
  title: "Demande de Devis | ChâteauxPrestige",
  description:
    "Obtenez un devis personnalisé pour votre événement d'entreprise dans l'un de nos 3 châteaux d'exception en France.",
};

export default function DevisPage() {
  return (
    <div style={{ minHeight: "100vh", background: theme.colors.neutral.gray50, paddingTop: "64px" }}>
      {/* Hero */}
      <div style={{
        background: theme.colors.primary.bronze,
        color: "white",
        padding: "clamp(1.5rem, 5vw, 2.5rem) clamp(1rem, 4vw, 2.5rem)",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "clamp(160px, 30vh, 200px)"
      }}>
        <div>
          <h1 style={{
            fontSize: "clamp(1.75rem, 5vw, 3.5rem)",
            fontWeight: theme.typography.fontWeight.light,
            fontStyle: "italic",
            fontFamily: theme.typography.fonts.heading,
            marginBottom: "clamp(0.75rem, 2vw, 1rem)"
          }}>
            Demandez votre Devis Personnalisé
          </h1>
          <p style={{
            fontSize: "clamp(0.875rem, 2.5vw, 1.25rem)",
            opacity: 0.9,
            maxWidth: "800px",
            margin: "0 auto"
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
        padding: "clamp(0.5rem, 2vw, 0.625rem) clamp(1rem, 4vw, 2.5rem) clamp(2rem, 6vw, 3.75rem)"
      }}>
        <DevisForm />
      </div>
    </div>
  );
}
