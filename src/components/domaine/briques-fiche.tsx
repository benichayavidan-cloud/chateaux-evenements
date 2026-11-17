'use client';
/**
 * Briques de mise en page partagées par la fiche château et les rubriques
 * (sorties de ChateauPageClient le 16/11/2026 : les rubriques importaient
 * tout le fichier de la fiche pour ces deux composants).
 */
import { useState } from "react";
import { theme } from "@/design-system/tokens";

// Wrapper Sticky CSS — hardware-accelerated, pas de JS scroll listener
export function StickySlider({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: 'sticky', top: '100px', alignSelf: 'flex-start' }}>
      {children}
    </div>
  );
}

// Paragraph Card — Design Cards avec bordure dorée
/** `icone` : remplace l'étoile devant le titre (ex. le moyen de transport dans la section Accès). */
export function ParaCard({ text, sectionBg = 'gray', icone }: { text: string; sectionBg?: 'gray' | 'white'; icone?: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);

  // Détecte "Label : Contenu" pour extraire un titre de carte
  const colonMatch = text.match(/^(.{5,55}?)\s:\s/);
  const label = colonMatch ? colonMatch[1] : null;
  const body = colonMatch && label ? text.substring(colonMatch[0].length) : text;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: sectionBg === 'gray' ? 'white' : theme.colors.neutral.gray50,
        borderRadius: '16px',
        padding: 'clamp(16px, 3vw, 24px) clamp(18px, 3vw, 28px)',
        marginBottom: '12px',
        borderLeft: `3px solid ${theme.colors.primary.gold}`,
        boxShadow: hovered ? '0 8px 30px rgba(0,0,0,0.08)' : '0 2px 12px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateX(4px)' : 'translateX(0)',
        transition: 'all 0.3s ease',
      }}
    >
      {label && (
        <div style={{
          fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase' as const,
          letterSpacing: '0.08em', color: theme.colors.primary.bronze,
          marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px',
        }}>
          {icone ?? (
            <div style={{
              width: '18px', height: '18px', borderRadius: '50%',
              background: `${theme.colors.primary.bronze}10`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '9px', color: theme.colors.primary.bronze,
            }}>✦</div>
          )}
          {label}
        </div>
      )}
      <p style={{
        fontSize: 'clamp(0.8125rem, 1.5vw, 0.9375rem)', lineHeight: 1.8,
        color: theme.colors.neutral.gray600, margin: 0,
      }}>
        {body}
      </p>
    </div>
  );
}
