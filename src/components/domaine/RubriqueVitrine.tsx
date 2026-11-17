/**
 * Galerie du haut d'une page détaillée de domaine : grille « Airbnb »
 * (1 grande + 4 petites, « Toutes les photos »), visionneuse plein écran et
 * barre fixe de contact. Seul îlot client de la page : l'en-tête, la bande de
 * badges, le menu et la section de texte sont rendus par le serveur avec les
 * briques de la fiche château (RubriquePage).
 *
 * Avant le 17/11/2026, ce composant portait toute la page, en copie de la
 * fiche : il n'avait pas suivi ses changements (médaillons, espacements,
 * cadre devis retiré, chiffres en cases).
 */
'use client';

import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Sparkles } from "lucide-react";
import { theme } from "@/design-system/tokens";
import { StickyCtaBar } from "@/components/StickyCtaBar";
import type { Chateau } from "@/types";

/** Visionneuse chargée seulement au premier clic sur une photo. */
const Visionneuse = dynamic(() => import("@/components/domaine/Visionneuse").then((m) => m.Visionneuse), { ssr: false });

/** Seuls champs du château envoyés au navigateur (le reste de la fiche n'a rien à faire dans le payload). */
export type ChateauVitrine = Pick<Chateau, "nom" | "images">;

interface Photo {
  src: string;
  alt: string;
}

interface RubriqueVitrineProps {
  chateau: ChateauVitrine;
  /** Photos de la rubrique, avec leur légende. */
  photosRubrique: Photo[];
  /** Fil d'Ariane puis en-tête (Server Components), au-dessus de la galerie. */
  enTete: React.ReactNode;
}

/** Photos de la rubrique, complétées par celles du domaine pour remplir la grille de 5. */
function photosGrille(photosRubrique: Photo[], chateau: ChateauVitrine): Photo[] {
  const toutes: Photo[] = [
    ...photosRubrique,
    ...[...chateau.images.hero, ...chateau.images.galerie].map((src) => ({ src, alt: `${chateau.nom} — le domaine` })),
  ];
  // Une photo n'apparaît qu'une fois (grille, visionneuse) : la première légende gagne.
  const vues = new Set<string>();
  return toutes.filter((p) => (vues.has(p.src) ? false : (vues.add(p.src), true)));
}

export function RubriqueVitrine({ chateau, photosRubrique, enTete }: RubriqueVitrineProps) {
  const photos = photosGrille(photosRubrique, chateau);
  const grille = photos.slice(0, 5);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const ouvrir = (i: number) => setLightboxIndex(i);
  const fermer = () => setLightboxIndex(null);

  return (
    <>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "clamp(1.5rem, 4vw, 3rem) clamp(1rem, 4vw, 2rem) clamp(1rem, 2vw, 1.5rem)" }}>
        {enTete}

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
      </div>

      <StickyCtaBar cible="#devis-express" />

      {/* Visionneuse plein écran, chargée au premier clic */}
      {lightboxIndex !== null && (
        <Visionneuse photos={photos} index={lightboxIndex} onIndex={setLightboxIndex} onFermer={fermer} legendes />
      )}
    </>
  );
}
