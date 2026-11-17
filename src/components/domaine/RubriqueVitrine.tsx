/**
 * Haut de page + section sticky d'une rubrique de domaine, au design EXACT de
 * la fiche château (demande PO du 16/11/2026) :
 *  - en-tête : badges lieu/réf, H1, chiffres, grille photos « Airbnb »
 *    (1 grande + 4 petites, « Toutes les photos »), barre devis/téléphone ;
 *  - bandeau des chiffres clés en pastilles ;
 *  - section « photos sticky à gauche, cartes de texte à droite ».
 * Pas de grande photo pleine largeur au milieu de la page.
 *
 * Briques communes avec la fiche : Diaporama, Visionneuse, StickySlider et
 * ParaCard (src/components/domaine). La grille du haut reprend son markup.
 */
'use client';

import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import { FileText, MapPin, Phone, Sparkles } from "lucide-react";
import { Section, Container } from "@/components/layout-v2";
import { Text } from "@/components/ui-v2";
import { BOUTON_DEVIS, BOUTON_TELEPHONE } from "@/components/domaine/boutons-cta";
import { theme } from "@/design-system/tokens";
import { trackPhoneClick } from "@/components/Analytics";
import { StickyCtaBar } from "@/components/StickyCtaBar";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_E164 } from "@/lib/contact";
import { ParaCard, StickySlider } from "@/components/domaine/briques-fiche";
import { Diaporama } from "@/components/domaine/Diaporama";
import type { Chateau } from "@/types";
import type { Rubrique, RubriqueId } from "@/types/rubriques";

/** Visionneuse chargée seulement au premier clic sur une photo. */
const Visionneuse = dynamic(() => import("@/components/domaine/Visionneuse").then((m) => m.Visionneuse), { ssr: false });

/** Titre de la section sticky, commun à tous les domaines (le contenu, lui, est propre au lieu). */
const TITRE_SECTION: Record<RubriqueId, string> = {
  salles: "Des espaces pour chaque format",
  chambres: "Un séjour qui prolonge le séminaire",
  exterieurs: "Le domaine à ciel ouvert",
  restauration: "Une table pour chaque moment",
  soirees: "Des soirées sans quitter le domaine",
  activites: "Bouger, se retrouver, récupérer",
  acces: "Comment venir",
};

const ETIQUETTE: Record<RubriqueId, string> = {
  salles: "Réunions",
  chambres: "Hébergement",
  exterieurs: "Le parc",
  restauration: "Restauration",
  soirees: "Soirées",
  activites: "Activités",
  acces: "Accès",
};

/** Seuls champs du château envoyés au navigateur (le reste de la fiche n'a rien à faire dans le payload). */
export type ChateauVitrine = Pick<Chateau, "nom" | "region" | "ref" | "images">;

interface RubriqueVitrineProps {
  chateau: ChateauVitrine;
  id: RubriqueId;
  /** H1, ligne 1 : mot-clé de la rubrique. Passé en props : importer lib/rubriques ici enverrait toutes les données (et leurs sources) au navigateur. */
  titre: string;
  /** H1, ligne 2 dorée : « à l'Ancienne Abbaye Cistercienne ». */
  lieu?: string;
  r: Rubrique;
  /** Fil d'Ariane (Server Component). */
  filAriane: React.ReactNode;
  /** Menu des rubriques (Server Component). */
  navRubriques: React.ReactNode;
}

interface Photo {
  src: string;
  alt: string;
}

/** Photos de la rubrique, complétées par celles du domaine pour remplir la grille de 5. */
function photosGrille(r: Rubrique, chateau: ChateauVitrine): Photo[] {
  const toutes: Photo[] = [
    ...r.photos.map((p) => ({ src: p.src, alt: p.legende })),
    ...[...chateau.images.hero, ...chateau.images.galerie].map((src) => ({ src, alt: `${chateau.nom} — le domaine` })),
  ];
  // Une photo n'apparaît qu'une fois (grille, curseur, visionneuse) : la première légende gagne.
  const vues = new Set<string>();
  return toutes.filter((p) => (vues.has(p.src) ? false : (vues.add(p.src), true)));
}

export function RubriqueVitrine({ chateau, id, titre, lieu, r, filAriane, navRubriques }: RubriqueVitrineProps) {
  const photos = photosGrille(r, chateau);
  const grille = photos.slice(0, 5);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const ouvrir = (i: number) => setLightboxIndex(i);
  const fermer = () => setLightboxIndex(null);

  return (
    <>
      {/* En-tête — même gabarit que la fiche château */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "clamp(1rem, 3vw, 1.5rem) clamp(1rem, 4vw, 2rem) 0" }}>
        {filAriane}

        <div style={{ marginBottom: "clamp(1rem, 2vw, 1.5rem)" }}>
          <div className="flex flex-wrap items-center gap-2" style={{ marginBottom: "0.5rem" }}>
            <div
              className="inline-flex items-center gap-2"
              style={{
                padding: "0.375rem 0.75rem",
                background: `linear-gradient(135deg, ${theme.colors.primary.bronze}12, ${theme.colors.primary.gold}08)`,
                border: `1px solid ${theme.colors.primary.bronze}40`,
                borderRadius: theme.effects.borderRadius.full,
              }}
            >
              <MapPin className="w-3.5 h-3.5" style={{ color: theme.colors.primary.bronze }} />
              <span style={{ fontSize: "0.8125rem", fontWeight: theme.typography.fontWeight.semibold, color: theme.colors.primary.bronze }}>
                {chateau.region}
              </span>
            </div>
            <div
              className="inline-flex items-center gap-1.5"
              style={{
                padding: "0.375rem 0.75rem",
                background: `${theme.colors.primary.bronze}08`,
                border: `1px solid ${theme.colors.primary.bronze}25`,
                borderRadius: theme.effects.borderRadius.full,
              }}
            >
              <span style={{ fontSize: "0.6875rem", fontWeight: theme.typography.fontWeight.bold, color: theme.colors.primary.bronze, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Réf.
              </span>
              <span style={{ fontSize: "0.75rem", fontWeight: theme.typography.fontWeight.semibold, color: theme.colors.primary.bronzeDark, fontFamily: "monospace" }}>
                {chateau.ref}
              </span>
            </div>
          </div>

          <h1
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
              fontWeight: theme.typography.fontWeight.semibold,
              fontFamily: theme.typography.fonts.heading,
              lineHeight: 1.2,
              color: theme.colors.neutral.gray900,
              marginBottom: "0.5rem",
            }}
          >
            {titre}
            {lieu && (
              <span
                style={{
                  display: "block",
                  fontSize: "0.72em",
                  fontStyle: "italic",
                  color: theme.colors.primary.bronze,
                  marginTop: "0.15em",
                }}
              >
                {lieu}
              </span>
            )}
          </h1>

          <div className="flex flex-wrap items-center" style={{ color: theme.colors.neutral.gray600, fontSize: "0.9375rem", columnGap: "1.25rem", rowGap: "0.25rem" }}>
            {r.faits.slice(0, 3).map((f) => (
              <span key={f.label} className="inline-flex items-center gap-1.5">
                <strong style={{ color: theme.colors.neutral.gray900, fontWeight: 600 }}>{f.valeur}</strong>
                <span>{f.label}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Grille photos style Airbnb — classes partagées avec la fiche (responsive dans globals.css) */}
        <div
          className="hero-grid-listing rounded-2xl overflow-hidden"
          style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "1fr 1fr", gap: "4px", height: "clamp(300px, 55vh, 500px)" }}
        >
          {grille.map((p, i) => (
            <div
              key={p.src}
              className="relative cursor-pointer group overflow-hidden"
              style={i === 0 ? { gridRow: "1 / 3", gridColumn: "1 / 2" } : undefined}
              onClick={() => ouvrir(i)}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                {...(i === 0 ? { priority: true, fetchPriority: "high" as const } : { loading: "lazy" as const })}
                quality={i === 0 ? 85 : 80}
                sizes={i === 0 ? "(max-width: 768px) 100vw, 50vw" : "25vw"}
              />
              {i === grille.length - 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); ouvrir(0); }}
                  style={{
                    position: "absolute", bottom: "0.75rem", right: "0.75rem",
                    display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 16px",
                    background: "rgba(255, 255, 255, 0.95)", border: `1px solid ${theme.colors.neutral.gray300}`,
                    borderRadius: theme.effects.borderRadius.lg, fontSize: "0.8125rem",
                    fontWeight: theme.typography.fontWeight.semibold, color: theme.colors.neutral.gray900,
                    cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", zIndex: 10,
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                  Toutes les photos
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Barre devis sous les photos */}
        <div
          style={{
            display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between",
            gap: "1rem", marginTop: "clamp(1rem, 2vw, 1.25rem)", padding: "clamp(1rem, 2vw, 1.25rem)",
            background: theme.colors.neutral.gray50, borderRadius: theme.effects.borderRadius.xl,
            border: `1px solid ${theme.colors.neutral.gray200}`, flexWrap: "wrap",
          }}
        >
          <p style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)", color: theme.colors.neutral.gray600, fontStyle: "italic", margin: 0, flex: "1 1 auto", minWidth: 0 }}>
            {r.resume}
          </p>
          <div className="flex flex-wrap gap-2.5 items-center" style={{ maxWidth: "100%" }}>
            <a
              href="#devis-express"
              style={BOUTON_DEVIS}
            >
              <FileText className="w-4 h-4" />
              Devis Gratuit en 24h
            </a>
            <a
              href={`tel:${CONTACT_PHONE_E164}`}
              onClick={() => trackPhoneClick()}
              className="hover:opacity-90"
              style={BOUTON_TELEPHONE}
            >
              <Phone className="w-4 h-4" style={{ color: "white" }} />
              {CONTACT_PHONE_DISPLAY}
            </a>
          </div>
        </div>

        <div style={{ marginTop: "clamp(0.75rem, 2vw, 1rem)", borderBottom: `1px solid ${theme.colors.neutral.gray200}` }}>{navRubriques}</div>
      </div>

      {/* Bandeau chiffres clés de la rubrique */}
      {r.faits.length > 0 && (
        <div style={{ background: `${theme.colors.primary.bronze}05`, borderBottom: `1px solid ${theme.colors.primary.bronze}15`, padding: "clamp(12px, 2vw, 16px) 0", marginTop: "clamp(1rem, 2vw, 1.5rem)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(16px, 4vw, 32px)" }}>
            <ul style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "clamp(8px, 2vw, 16px)", listStyle: "none" }}>
              {r.faits.map((f) => (
                <li
                  key={f.label}
                  style={{
                    display: "inline-flex", alignItems: "baseline", gap: "6px", padding: "8px 14px",
                    background: `${theme.colors.primary.bronze}08`, border: `1px solid ${theme.colors.primary.bronze}20`,
                    borderRadius: theme.effects.borderRadius.full,
                  }}
                >
                  <span style={{ fontSize: "clamp(12px, 1.6vw, 14px)", fontWeight: 700, color: theme.colors.primary.bronzeDark }}>{f.valeur}</span>
                  <span style={{ fontSize: "clamp(10px, 1.5vw, 12px)", fontWeight: theme.typography.fontWeight.semibold, color: theme.colors.primary.bronze, textTransform: "uppercase", letterSpacing: theme.typography.letterSpacing.wide }}>
                    {f.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Section — photos sticky à gauche, cartes à droite (comme « Le lieu » de la fiche) */}
      <Section spacing="lg" background="gray" style={{ padding: "clamp(2.5rem, 5vw, 4rem) 0" }}>
        <Container size="xl">
          <div className="responsive-grid" style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: "clamp(2rem, 4vw, 3rem)" }}>
            <StickySlider>
              <Diaporama photos={r.photos.length >= 2 ? r.photos.map((p) => ({ src: p.src, alt: p.legende })) : grille} />
            </StickySlider>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px", background: `${theme.colors.primary.bronze}10`, borderRadius: theme.effects.borderRadius.full, border: `1px solid ${theme.colors.primary.bronze}30`, marginBottom: "1rem" }}>
                <Sparkles className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                <span style={{ fontSize: "0.75rem", fontWeight: 600, color: theme.colors.primary.bronze, textTransform: "uppercase", letterSpacing: "0.05em" }}>{ETIQUETTE[id]}</span>
              </div>
              <Text variant="h2" style={{ marginBottom: "1.5rem", textAlign: "left" }}>
                {TITRE_SECTION[id]}
              </Text>
              <ParaCard text={r.intro} sectionBg="gray" />
              {r.blocs.map((b) => (
                <ParaCard key={`${b.titre}-${b.texte.slice(0, 20)}`} text={`${b.titre} : ${b.texte}`} sectionBg="gray" />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <StickyCtaBar cible="#devis-express" />

      {/* Visionneuse plein écran, chargée au premier clic */}
      {lightboxIndex !== null && (
        <Visionneuse photos={photos} index={lightboxIndex} onIndex={setLightboxIndex} onFermer={fermer} legendes />
      )}
    </>
  );
}
