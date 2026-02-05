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
          color: "#ffffff",
          padding: "clamp(2rem, 5vw, 3rem) clamp(1.5rem, 5vw, 2.5rem)",
          paddingTop: "calc(80px + clamp(2rem, 5vw, 3rem))",
          textAlign: "center",
          minHeight: "clamp(200px, 35vh, 280px)",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {/* Image d'ambiance en arrière-plan */}
          <div style={{
            position: "absolute",
            inset: 0,
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

          {/* Overlay sombre */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.5) 100%)",
            zIndex: 1,
          }} />

          {/* Contenu Hero */}
          <div style={{ position: "relative", zIndex: 2, maxWidth: "900px", margin: "0 auto", padding: "0 1rem" }}>
            <h1 style={{
              fontSize: "clamp(1.75rem, 6vw, 3.75rem)",
              fontWeight: theme.typography.fontWeight.light,
              fontStyle: "italic",
              fontFamily: theme.typography.fonts.heading,
              marginBottom: "clamp(1rem, 3vw, 1.5rem)",
              lineHeight: 1.2,
              color: "#ffffff",
              textShadow: "0 2px 20px rgba(0,0,0,0.4)",
            }}>
              Devis Séminaire Gratuit & Réponse 24h
            </h1>
            <p style={{
              fontSize: "clamp(1rem, 3vw, 1.375rem)",
              lineHeight: 1.5,
              margin: "0 auto",
              padding: "0 0.5rem",
              maxWidth: "700px",
              color: "rgba(255,255,255,0.92)",
              textShadow: "0 1px 8px rgba(0,0,0,0.3)",
            }}>
              Remplissez le formulaire en 4 étapes et recevez votre devis personnalisé pour votre séminaire en château
            </p>

            {/* Éléments de Réassurance */}
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "clamp(0.5rem, 1.5vw, 0.75rem)",
              marginTop: "clamp(1rem, 3vw, 1.5rem)"
            }}>
              {/* 4 Châteaux */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                padding: "0.5rem 1rem",
                borderRadius: "50px",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#ffffff"
              }}>
                <Building2 className="w-4 h-4" />
                <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>4 Châteaux d'exception</span>
              </div>

              {/* Réponse 24h */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                padding: "0.5rem 1rem",
                borderRadius: "50px",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#ffffff"
              }}>
                <Clock className="w-4 h-4" />
                <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>Réponse sous 24h</span>
              </div>

              {/* Gratuit */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                padding: "0.5rem 1rem",
                borderRadius: "50px",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#ffffff"
              }}>
                <Check className="w-4 h-4" />
                <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>Gratuit & Sans engagement</span>
              </div>

              {/* Note */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.375rem",
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                padding: "0.5rem 1rem",
                borderRadius: "50px",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#ffffff"
              }}>
                <div style={{ display: "flex", gap: "2px", color: "#FBBF24" }}>
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
          padding: "clamp(2rem, 5vw, 3rem) clamp(1.25rem, 5vw, 2.5rem) 5rem"
        }}>
          <DevisForm />
        </div>
      </div>
    </>
  );
}
