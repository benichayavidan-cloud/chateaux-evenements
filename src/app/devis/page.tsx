import { Metadata } from "next";
import { DevisForm } from "@/components/DevisForm";
import { theme } from "@/config/theme";

export const metadata: Metadata = {
  title: "Demande de Devis | ChâteauxPrestige",
  description:
    "Obtenez un devis personnalisé pour votre événement d'entreprise dans l'un de nos 4 châteaux d'exception en France.",
};

export default function DevisPage() {
  return (
    <div style={{ minHeight: "100vh", background: theme.colors.neutral.gray50, paddingTop: "64px" }}>
      {/* Hero */}
      <div style={{
        background: theme.colors.primary.bronze,
        color: "white",
        padding: "40px 40px",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "200px"
      }}>
        <div>
          <h1 style={{
            fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
            fontWeight: theme.typography.fontWeight.light,
            fontStyle: "italic",
            fontFamily: theme.typography.fonts.heading,
            marginBottom: "16px"
          }}>
            Demandez votre Devis Personnalisé
          </h1>
          <p style={{
            fontSize: "20px",
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
        padding: "10px 40px 60px"
      }}>
        <DevisForm />
      </div>
    </div>
  );
}
