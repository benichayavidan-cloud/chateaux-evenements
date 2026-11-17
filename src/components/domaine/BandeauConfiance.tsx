/**
 * Bande de badges de confiance sous la galerie (« 500+ événements », « Devis
 * sous 24h »…), commune à la fiche château et à ses pages détaillées.
 * Server Component.
 */
import { Check, Clock, Lock, Package } from "lucide-react";
import { theme } from "@/design-system/tokens";
import { Medaillon } from "@/components/domaine/Medaillon";

export function BandeauConfiance() {
  return (
    <div
      style={{
        background: `${theme.colors.primary.bronze}05`,
        borderBottom: `1px solid ${theme.colors.primary.bronze}15`,
        padding: 'clamp(12px, 2vw, 16px) 0',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 'clamp(8px, 2vw, 16px)',
          }}
        >
          {[
            { icone: Check, label: '500+ Événements' },
            { icone: Clock, label: 'Devis sous 24h' },
            { icone: Lock, label: 'Privatisation Totale' },
            { icone: Package, label: 'Tout Inclus' },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '5px 14px 5px 5px',
                background: '#FFFFFF',
                border: `1px solid ${theme.colors.primary.bronze}20`,
                borderRadius: theme.effects.borderRadius.full,
              }}
            >
              <Medaillon icone={item.icone} taille="petit" />
              <span
                style={{
                  fontSize: 'clamp(10px, 1.5vw, 12px)',
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.primary.bronze,
                  textTransform: 'uppercase',
                  letterSpacing: theme.typography.letterSpacing.wide,
                  whiteSpace: 'nowrap',
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
