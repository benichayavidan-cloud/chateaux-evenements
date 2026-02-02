import { DevisForm } from "@/components/DevisForm";
import { theme } from "@/config/theme";
import Image from "next/image";
import { Check, Clock, Building2, Star } from "lucide-react";

export default function DevisPage() {
  return (
    <>

      <div style={{ minHeight: "100vh", background: "#FFFFFF", display: "flex", flexDirection: "column" }}>
        {/* Hero avec Image d'ambiance */}
        <div style={{
          position: "relative",
          background: "linear-gradient(135deg, rgba(249, 250, 251, 0.95) 0%, rgba(255, 255, 255, 0.95) 100%)",
          color: "#1F2937",
          padding: "clamp(1.5rem, 4vw, 2rem) clamp(1.5rem, 5vw, 2.5rem)",
          paddingTop: "calc(80px + clamp(1.5rem, 4vw, 2rem))",
          textAlign: "center",
          minHeight: "clamp(160px, 28vh, 200px)",
          overflow: "hidden"
        }}>
          {/* Image d'ambiance en arrière-plan */}
          <div style={{
            position: "absolute",
            inset: 0,
            opacity: 0.25,
            zIndex: 0
          }}>
            <Image
              src="/images/seminaires-soirees-entreprise-hero.webp"
              alt="Devis location château séminaire Île-de-France - Salle de réunion lumineuse"
              fill
              className="object-cover"
              priority
              sizes="100vw"
              quality={75}
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
              gap: "clamp(0.75rem, 2vw, 1rem)",
              marginTop: "clamp(1rem, 3vw, 1.5rem)"
            }}>
              {/* 4 Châteaux */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(163, 126, 44, 0.1)",
                padding: "0.5rem 1rem",
                borderRadius: "50px",
                border: "1px solid rgba(163, 126, 44, 0.2)",
                color: "#78350F"
              }}>
                <Building2 className="w-4 h-4" />
                <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>4 Châteaux d'exception</span>
              </div>

              {/* Réponse 24h */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(163, 126, 44, 0.1)",
                padding: "0.5rem 1rem",
                borderRadius: "50px",
                border: "1px solid rgba(163, 126, 44, 0.2)",
                color: "#78350F"
              }}>
                <Clock className="w-4 h-4" />
                <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>Réponse sous 24h</span>
              </div>

              {/* Gratuit */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(163, 126, 44, 0.1)",
                padding: "0.5rem 1rem",
                borderRadius: "50px",
                border: "1px solid rgba(163, 126, 44, 0.2)",
                color: "#78350F"
              }}>
                <Check className="w-4 h-4" />
                <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>Gratuit & Sans engagement</span>
              </div>

              {/* Note */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.375rem",
                background: "rgba(163, 126, 44, 0.1)",
                padding: "0.5rem 1rem",
                borderRadius: "50px",
                border: "1px solid rgba(163, 126, 44, 0.2)",
                color: "#78350F"
              }}>
                <div style={{ display: "flex", gap: "2px", color: "#EAB308" }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>4.9/5</span>
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
