"use client";
/**
 * Îlots interactifs de la fiche château (16/11/2026). La fiche elle-même est
 * rendue par le serveur : seuls ces éléments partent dans le JavaScript du
 * navigateur (avant, toute la fiche, ses données et le fichier des photos
 * renommées y partaient).
 */
import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Minus, Plus, Sparkles } from "lucide-react";
import { Text } from "@/components/ui-v2";
import { theme } from "@/design-system/tokens";
import { trackChateauView } from "@/components/Analytics";
import { useInView } from "@/hooks/useInView";
import type { PhotoDiaporama } from "@/components/domaine/Diaporama";

const Visionneuse = dynamic(() => import("@/components/domaine/Visionneuse").then((m) => m.Visionneuse), { ssr: false });

/** Grille « Airbnb » (1 grande + 4 petites) et visionneuse plein écran. */
export function GaleriePhotosFiche({ grille, toutes }: { grille: PhotoDiaporama[]; toutes: PhotoDiaporama[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const ouvrir = (src: string) => {
    const i = toutes.findIndex((p) => p.src === src);
    setIndex(i >= 0 ? i : 0);
  };
  const [principale, ...petites] = grille;

  return (
    <>
      <div
        className="hero-grid-listing rounded-2xl overflow-hidden"
        style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "1fr 1fr", gap: "4px", height: "clamp(300px, 55vh, 500px)" }}
      >
        <div className="relative cursor-pointer group overflow-hidden" style={{ gridRow: "1 / 3", gridColumn: "1 / 2" }} onClick={() => ouvrir(principale.src)}>
          <Image src={principale.src} alt={principale.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" priority fetchPriority="high" quality={85} sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
        {petites.map((p, i) => (
          <div key={i} className="relative cursor-pointer group overflow-hidden" onClick={() => ouvrir(p.src)}>
            <Image src={p.src} alt={p.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" quality={80} sizes="25vw" />
            {i === petites.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setIndex(0); }}
                style={{
                  position: "absolute", bottom: "0.75rem", right: "0.75rem", display: "inline-flex", alignItems: "center", gap: "6px",
                  padding: "8px 16px", background: "rgba(255, 255, 255, 0.95)", border: `1px solid ${theme.colors.neutral.gray300}`,
                  borderRadius: theme.effects.borderRadius.lg, fontSize: "0.8125rem", fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.neutral.gray900, cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", zIndex: 10,
                }}
              >
                <Sparkles className="w-4 h-4" />
                Toutes les photos
              </button>
            )}
          </div>
        ))}
      </div>
      {index !== null && <Visionneuse photos={toutes} index={index} onIndex={setIndex} onFermer={() => setIndex(null)} />}
    </>
  );
}

/** Questions fréquentes dépliables (le texte est dans le HTML dès le serveur). */
export function FaqAccordeon({ faq }: { faq: Array<{ question: string; answer: string }> }) {
  const [ouverte, setOuverte] = useState<number | null>(null);
  return (
    <div>
                {faq.map((item, index) => {
                  const isOpen = ouverte === index;
                  return (
                    <div key={index} style={{ marginBottom: '0.75rem' }}>
                      <button
                        onClick={() => setOuverte(isOpen ? null : index)}
                        className="w-full text-left group"
                        style={{
                          display: 'flex', alignItems: 'center', gap: '1rem',
                          padding: '1rem 1.25rem',
                          background: isOpen ? 'white' : 'transparent',
                          borderRadius: '0.75rem',
                          border: `1px solid ${isOpen ? theme.colors.primary.bronze + '40' : 'transparent'}`,
                          boxShadow: isOpen ? '0 4px 16px rgba(0,0,0,0.06)' : 'none',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                        }}
                      >
                        <div style={{
                          width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                          background: isOpen ? theme.colors.primary.bronze : `${theme.colors.primary.bronze}10`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'all 0.3s ease',
                        }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: isOpen ? 'white' : theme.colors.primary.bronze }}>
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <span style={{ flex: 1, fontSize: '0.9375rem', fontWeight: 600, color: theme.colors.neutral.gray800, lineHeight: 1.4 }}>
                          {item.question}
                        </span>
                        <div style={{ flexShrink: 0, transition: 'transform 0.3s ease', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                          {isOpen ? (
                            <Minus className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                          ) : (
                            <Plus className="w-4 h-4" style={{ color: theme.colors.neutral.gray500 }} />
                          )}
                        </div>
                      </button>
                      <div style={{
                        overflow: 'hidden',
                        maxHeight: isOpen ? '300px' : '0px',
                        opacity: isOpen ? 1 : 0,
                        transition: 'max-height 0.4s ease, opacity 0.3s ease',
                      }}>
                        <div style={{ padding: '0.75rem 1.25rem 0.75rem 4.25rem' }}>
                          <Text variant="body" color="muted" style={{ lineHeight: 1.7, fontSize: '0.9rem' }}>
                            {item.answer}
                          </Text>
                        </div>
                      </div>
                    </div>
                  );
                })}
    </div>
  );
}

/** Apparition au défilement (classe animate-on-scroll de globals.css). */
export function Apparition({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  const { ref, isInView } = useInView();
  return (
    <div ref={ref} className={`animate-on-scroll ${isInView ? "is-visible" : ""}`} style={style}>
      {children}
    </div>
  );
}

/** Compte la vue de la fiche dans les statistiques. */
export function SuiviVueChateau({ nom }: { nom: string }) {
  useEffect(() => {
    trackChateauView(nom);
  }, [nom]);
  return null;
}
