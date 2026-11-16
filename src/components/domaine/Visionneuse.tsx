'use client';
/**
 * Visionneuse plein écran des photos (fiche château et rubriques). Brique
 * UNIQUE (16/11/2026), chargée seulement au premier clic sur une photo
 * (next/dynamic côté appelant) : elle ne pèse rien au chargement de la page.
 *
 * Focus donné une fois à l'ouverture et rendu au déclencheur à la fermeture ;
 * défilement de la page bloqué tant qu'elle est ouverte.
 */
import Image from "next/image";
import { useEffect, useRef } from "react";
import type { PhotoDiaporama } from "@/components/domaine/Diaporama";

interface VisionneuseProps {
  photos: PhotoDiaporama[];
  index: number;
  onIndex: (i: number) => void;
  onFermer: () => void;
  /** Affiche le texte de la photo sous l'image (rubriques). */
  legendes?: boolean;
}

const BOUTON: React.CSSProperties = {
  position: "absolute", width: "52px", height: "52px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.15)",
  border: "2px solid rgba(255, 255, 255, 0.3)", color: "white", fontSize: "1.5rem", cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10000,
};

export function Visionneuse({ photos, index, onIndex, onFermer, legendes = false }: VisionneuseProps) {
  const cadre = useRef<HTMLDivElement>(null);
  const nb = photos.length;
  const precedente = () => onIndex((index - 1 + nb) % nb);
  const suivante = () => onIndex((index + 1) % nb);

  useEffect(() => {
    const declencheur = document.activeElement as HTMLElement | null;
    cadre.current?.focus();
    const defilement = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = defilement;
      declencheur?.focus();
    };
  }, []);

  const photo = photos[index];
  if (!photo) return null;

  return (
    <div
      ref={cadre}
      className="animate-fade-only"
      onClick={onFermer}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") precedente();
        if (e.key === "ArrowRight") suivante();
        if (e.key === "Escape") onFermer();
      }}
      tabIndex={0}
      role="dialog"
      aria-label="Photos du domaine"
      aria-modal="true"
      style={{ position: "fixed", inset: 0, background: "rgba(0, 0, 0, 0.95)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", outline: "none" }}
    >
      <button onClick={onFermer} style={{ ...BOUTON, top: "1.5rem", right: "1.5rem", width: "48px", height: "48px", background: "rgba(255, 255, 255, 0.1)", border: "2px solid rgba(255, 255, 255, 0.2)", fontSize: "24px" }} aria-label="Fermer">
        ✕
      </button>
      <div style={{ position: "absolute", top: "1.5rem", left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.8)", fontSize: "0.9375rem", fontWeight: 600, zIndex: 10000 }}>
        {index + 1} / {nb}
      </div>
      <button onClick={(e) => { e.stopPropagation(); precedente(); }} style={{ ...BOUTON, left: "clamp(0.5rem, 2vw, 1.5rem)", top: "50%", transform: "translateY(-50%)" }} aria-label="Image précédente">
        ‹
      </button>
      <button onClick={(e) => { e.stopPropagation(); suivante(); }} style={{ ...BOUTON, right: "clamp(0.5rem, 2vw, 1.5rem)", top: "50%", transform: "translateY(-50%)" }} aria-label="Image suivante">
        ›
      </button>
      <figure onClick={(e) => e.stopPropagation()} style={{ position: "relative", width: "100%", height: "100%", maxWidth: "1400px", maxHeight: "85vh", cursor: "default" }}>
        <Image src={photo.src} alt={photo.alt} fill sizes="100vw" className="object-contain" quality={85} priority />
        {legendes && (
          <figcaption style={{ position: "absolute", bottom: "-2rem", left: 0, right: 0, textAlign: "center", color: "rgba(255,255,255,0.85)", fontSize: "0.875rem" }}>
            {photo.alt}
          </figcaption>
        )}
      </figure>
    </div>
  );
}
