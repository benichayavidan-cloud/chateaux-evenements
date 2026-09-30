"use client";

/**
 * Page merci après une demande de devis.
 *
 * Refaite le 30/09/2026 (plan conversion, phase 2). L'ancienne version affichait
 * un faux numéro de dossier tiré au hasard par le navigateur : il
 * n'existait ni dans le CRM ni dans les emails. Elle dit maintenant ce qui va
 * se passer, quand, et donne le téléphone à qui ne veut pas attendre.
 */

import Link from "next/link";
import { Check, Phone, Mail, CalendarCheck, FileText, ArrowRight } from "lucide-react";
import { trackPhoneClick } from "@/components/Analytics";

const ETAPES = [
  {
    icone: Mail,
    titre: "Un email de confirmation vient de partir",
    texte: "Il reprend votre demande. Rien reçu d'ici quelques minutes ? Regardez vos indésirables.",
  },
  {
    icone: Phone,
    titre: "Un conseiller vous rappelle sous 24 h",
    texte: "Pour préciser votre programme : horaires, hébergement, restauration, activités, budget.",
  },
  {
    icone: CalendarCheck,
    titre: "Nous vérifions les disponibilités",
    texte: "Nous interrogeons les châteaux adaptés à vos dates et à votre effectif.",
  },
  {
    icone: FileText,
    titre: "Vous recevez vos devis chiffrés",
    texte: "Sous 48 h, sans engagement : vous comparez et choisissez à votre rythme.",
  },
] as const;

const BRONZE = "#A37E2C";
const GRADIENT_OR = "linear-gradient(135deg, #D4AF37 0%, #A37E2C 100%)";
// Styles en ligne, comme le reste de la page d'origine : la feuille globale
// remet à zéro les paddings des classes utilitaires et colore en blanc les
// paragraphes des listes (règle du pied de page).
const texte = (taille: string, couleur: string, poids = 400): React.CSSProperties => ({
  fontSize: taille, color: couleur, fontWeight: poids, lineHeight: 1.55, margin: 0,
});

export default function MerciContent() {
  return (
    <div style={{ minHeight: "100vh", background: "#FFFFFF", paddingTop: "80px" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "clamp(1.5rem, 5vw, 4rem) 16px" }}>
        <div
          className="animate-scale-in"
          style={{
            padding: "clamp(1.5rem, 5vw, 3rem) clamp(1rem, 4vw, 2.5rem)",
            background: "linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%)",
            borderRadius: "1.5rem",
            boxShadow: "0 20px 60px rgba(163, 126, 44, 0.12), 0 0 0 1px rgba(163, 126, 44, 0.1)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "76px", height: "76px", margin: "0 auto 1.25rem", borderRadius: "9999px",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
              boxShadow: "0 10px 30px rgba(16, 185, 129, 0.35)",
            }}
          >
            <Check style={{ width: "40px", height: "40px", color: "#FFFFFF" }} strokeWidth={3} />
          </div>

          <h1 style={{ fontSize: "clamp(1.625rem, 5vw, 2.5rem)", fontWeight: 700, color: "#1F2937", margin: "0 0 0.5rem" }}>
            Demande bien reçue, merci !
          </h1>
          <p style={texte("clamp(1rem, 2.5vw, 1.125rem)", "#4B5563")}>Voici ce qui se passe maintenant.</p>

          <ol style={{ listStyle: "none", margin: "1.75rem auto 0", padding: 0, maxWidth: "560px", display: "flex", flexDirection: "column", gap: "12px", textAlign: "left" }}>
            {ETAPES.map((e, i) => (
              <li
                key={e.titre}
                style={{
                  display: "flex", gap: "14px", padding: "14px 16px", background: "#FFFFFF",
                  border: "1px solid #F3F4F6", borderRadius: "1rem", boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  style={{
                    width: "40px", height: "40px", flexShrink: 0, borderRadius: "9999px",
                    display: "flex", alignItems: "center", justifyContent: "center", background: "#FFFBEB", color: BRONZE,
                  }}
                >
                  <e.icone style={{ width: "20px", height: "20px" }} />
                </div>
                <div>
                  <p style={texte("1rem", "#111827", 600)}>
                    <span style={{ color: BRONZE }}>{i + 1}.</span> {e.titre}
                  </p>
                  <p style={{ ...texte("0.875rem", "#4B5563"), marginTop: "4px" }}>{e.texte}</p>
                </div>
              </li>
            ))}
          </ol>

          <div style={{ margin: "1.75rem auto 0", maxWidth: "560px", padding: "1.25rem", borderRadius: "1rem", background: "#FFFBEB" }}>
            <p style={texte("1rem", "#111827", 600)}>Une date qui presse ? Appelez-nous directement.</p>
            <a
              href="tel:+33757991146"
              onClick={() => trackPhoneClick("page-merci")}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "12px",
                padding: "12px 24px", borderRadius: "9999px", background: GRADIENT_OR, color: "#FFFFFF",
                fontWeight: 700, fontSize: "1rem", textDecoration: "none", boxShadow: "0 4px 16px rgba(163, 126, 44, 0.3)",
              }}
            >
              <Phone style={{ width: "20px", height: "20px" }} />
              07 57 99 11 46
            </a>
          </div>

          <div style={{ marginTop: "1.75rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "12px 24px" }}>
            <Link href="/chateaux" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontWeight: 600, color: BRONZE, textDecoration: "none" }}>
              Découvrir nos châteaux <ArrowRight style={{ width: "16px", height: "16px" }} />
            </Link>
            <Link href="/" style={{ fontSize: "0.875rem", color: "#6B7280", textDecoration: "none" }}>
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
