'use client';
/**
 * Diaporama des fiches et rubriques château : carte 420 px, fondu, flèches et
 * points. Brique UNIQUE (16/11/2026) : remplace 5 copies quasi identiques de
 * ChateauPageClient. Autoplay et rendu limité : voir useDiaporama.
 */
import Image from "next/image";
import { useDiaporama } from "@/hooks/useDiaporama";

export interface PhotoDiaporama {
  src: string;
  alt: string;
}

interface DiaporamaProps {
  photos: PhotoDiaporama[];
  /** Durée du fondu entre deux photos. */
  fonduMs?: number;
  /** Début du libellé accessible des points : « Photo 3 ». */
  libellePoint?: string;
}

const FLECHE: React.CSSProperties = {
  position: "absolute", top: "50%", transform: "translateY(-50%)", width: "40px", height: "40px",
  borderRadius: "50%", background: "rgba(255,255,255,0.85)", border: "none", cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", color: "#333",
  boxShadow: "0 2px 8px rgba(0,0,0,0.15)", zIndex: 2,
};

export function Diaporama({ photos, fonduMs = 600, libellePoint = "Photo" }: DiaporamaProps) {
  const nb = photos.length;
  const { current, goTo, zone, proche } = useDiaporama(nb);

  return (
    <div ref={zone} style={{ position: "relative", height: "420px", borderRadius: "1rem", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}>
      {photos.map((p, i) => proche(i) && (
        <div key={i} style={{ position: "absolute", inset: 0, opacity: current === i ? 1 : 0, transition: `opacity ${fonduMs}ms ease-in-out` }}>
          <Image src={p.src} alt={p.alt} fill sizes="50vw" className="object-cover" loading="lazy" quality={80} />
        </div>
      ))}
      {nb > 1 && (
        <>
          <button onClick={() => goTo(current - 1)} style={{ ...FLECHE, left: "0.75rem" }} aria-label="Précédent">‹</button>
          <button onClick={() => goTo(current + 1)} style={{ ...FLECHE, right: "0.75rem" }} aria-label="Suivant">›</button>
          <div style={{ position: "absolute", bottom: "0.75rem", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "6px", zIndex: 2 }}>
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: current === i ? "20px" : "8px", height: "8px", borderRadius: "4px", border: "none", cursor: "pointer",
                  background: current === i ? "white" : "rgba(255,255,255,0.5)", transition: "all 0.3s ease",
                }}
                aria-label={`${libellePoint} ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
