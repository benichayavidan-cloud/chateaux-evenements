/**
 * Haut de page + section sticky d'une rubrique de domaine, au design EXACT de
 * la fiche château (demande PO du 16/11/2026) :
 *  - en-tête : badges lieu/réf, H1, chiffres, grille photos « Airbnb »
 *    (1 grande + 4 petites, « Toutes les photos »), barre devis/téléphone ;
 *  - bandeau des chiffres clés en pastilles ;
 *  - section « photos sticky à gauche, cartes de texte à droite ».
 * Pas de grande photo pleine largeur au milieu de la page.
 *
 * Les briques StickySlider, OverviewSlider et ParaCard sont celles de la fiche
 * (exportées telles quelles) ; la grille du haut et la visionneuse reprennent
 * son markup. Leur extraction commune de la fiche est un chantier à part.
 */
'use client';

import Image from "next/image";
import { useState } from "react";
import { FileText, MapPin, Phone, Sparkles } from "lucide-react";
import { Section, Container } from "@/components/layout-v2";
import { Text } from "@/components/ui-v2";
import { theme } from "@/design-system/tokens";
import { trackPhoneClick } from "@/components/Analytics";
import { StickyCtaBar } from "@/components/StickyCtaBar";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_E164 } from "@/lib/contact";
import { OverviewSlider, ParaCard, StickySlider } from "@/app/chateaux/[slug]/ChateauPageClient";
import type { Chateau } from "@/types";
import type { Rubrique, RubriqueId } from "@/types/rubriques";

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

interface RubriqueVitrineProps {
  chateau: Chateau;
  id: RubriqueId;
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
function photosGrille(r: Rubrique, chateau: Chateau): Photo[] {
  const propres: Photo[] = r.photos.map((p) => ({ src: p.src, alt: p.legende }));
  const vues = new Set(propres.map((p) => p.src));
  const domaine: Photo[] = [...chateau.images.hero, ...chateau.images.galerie]
    .filter((src) => !vues.has(src))
    .map((src) => ({ src, alt: `${chateau.nom} — le domaine` }));
  return [...propres, ...domaine];
}

export function RubriqueVitrine({ chateau, id, r, filAriane, navRubriques }: RubriqueVitrineProps) {
  const photos = photosGrille(r, chateau);
  const grille = photos.slice(0, 5);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const ouvrir = (i: number) => setLightboxIndex(i);
  const fermer = () => setLightboxIndex(null);
  const precedente = () => setLightboxIndex((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null));
  const suivante = () => setLightboxIndex((i) => (i !== null ? (i + 1) % photos.length : null));

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
            {r.titre}
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
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px",
                borderRadius: theme.effects.borderRadius.full,
                background: `linear-gradient(135deg, ${theme.colors.primary.gold} 0%, ${theme.colors.primary.bronze} 100%)`,
                color: "#FFFFFF", fontWeight: theme.typography.fontWeight.bold, fontSize: "0.875rem",
                textDecoration: "none", boxShadow: `0 4px 16px ${theme.colors.primary.bronze}40`, whiteSpace: "nowrap",
              }}
            >
              <FileText className="w-4 h-4" />
              Devis Gratuit en 24h
            </a>
            <a
              href={`tel:${CONTACT_PHONE_E164}`}
              onClick={() => trackPhoneClick()}
              className="badge-lg border-2 border-white/40 bg-black/40 backdrop-blur-md text-white font-semibold text-sm hover:bg-black/50 transition-all"
              style={{ textDecoration: "none", whiteSpace: "nowrap", color: "white" }}
            >
              <Phone className="w-4 h-4" style={{ color: "white" }} />
              {CONTACT_PHONE_DISPLAY}
            </a>
          </div>
        </div>

        <div style={{ marginTop: "clamp(0.75rem, 2vw, 1rem)" }}>{navRubriques}</div>
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
              <OverviewSlider images={(r.photos.length >= 2 ? r.photos.map((p) => p.src) : grille.map((p) => p.src))} nom={chateau.nom} />
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
                <ParaCard key={b.titre} text={`${b.titre} : ${b.texte}`} sectionBg="gray" />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <StickyCtaBar cible="#devis-express" />

      {/* Visionneuse — même comportement que la fiche */}
      {lightboxIndex !== null && (
        <div
          className="animate-fade-only"
          onClick={fermer}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") precedente();
            if (e.key === "ArrowRight") suivante();
            if (e.key === "Escape") fermer();
          }}
          tabIndex={0}
          role="dialog"
          aria-label="Photos du domaine"
          ref={(el) => el?.focus()}
          style={{ position: "fixed", inset: 0, background: "rgba(0, 0, 0, 0.95)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", outline: "none" }}
        >
          <button
            onClick={fermer}
            style={{ position: "absolute", top: "1.5rem", right: "1.5rem", width: "48px", height: "48px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.1)", border: "2px solid rgba(255, 255, 255, 0.2)", color: "white", fontSize: "24px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10000 }}
            aria-label="Fermer"
          >
            ✕
          </button>
          <div style={{ position: "absolute", top: "1.5rem", left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.8)", fontSize: "0.9375rem", fontWeight: 600, zIndex: 10000 }}>
            {lightboxIndex + 1} / {photos.length}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); precedente(); }}
            style={{ position: "absolute", left: "clamp(0.5rem, 2vw, 1.5rem)", top: "50%", transform: "translateY(-50%)", width: "52px", height: "52px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.15)", border: "2px solid rgba(255, 255, 255, 0.3)", color: "white", fontSize: "1.5rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10000 }}
            aria-label="Image précédente"
          >
            ‹
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); suivante(); }}
            style={{ position: "absolute", right: "clamp(0.5rem, 2vw, 1.5rem)", top: "50%", transform: "translateY(-50%)", width: "52px", height: "52px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.15)", border: "2px solid rgba(255, 255, 255, 0.3)", color: "white", fontSize: "1.5rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10000 }}
            aria-label="Image suivante"
          >
            ›
          </button>
          <figure onClick={(e) => e.stopPropagation()} style={{ position: "relative", width: "100%", height: "100%", maxWidth: "1400px", maxHeight: "85vh", cursor: "default" }}>
            <Image src={photos[lightboxIndex].src} alt={photos[lightboxIndex].alt} fill sizes="100vw" className="object-contain" quality={85} priority />
            <figcaption style={{ position: "absolute", bottom: "-2rem", left: 0, right: 0, textAlign: "center", color: "rgba(255,255,255,0.85)", fontSize: "0.875rem" }}>
              {photos[lightboxIndex].alt}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
