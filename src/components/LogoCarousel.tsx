"use client";

import Image from "next/image";
import { theme } from "@/design-system/tokens";
import { clientLogos } from "@/data/chateaux";

export function LogoCarousel() {
  // Dupliquer les logos 3x pour un défilement infini fluide (identique à la homepage)
  const duplicatedLogos = [...clientLogos, ...clientLogos, ...clientLogos];

  return (
    <section
      style={{
        background: '#f6f9fc',
        padding: 'clamp(1.5rem, 4vw, 2.5rem) 0',
        borderTop: `1px solid ${theme.colors.neutral.gray200}`,
        borderBottom: `1px solid ${theme.colors.neutral.gray200}`,
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(1rem, 3vw, 2rem)' }}>
        <p
          style={{
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: theme.typography.letterSpacing.wider,
            fontSize: theme.typography.fontSize.xs,
            color: theme.colors.neutral.gray600,
            margin: `0 auto ${theme.spacing['3xl']} auto`,
            width: '100%',
          }}
        >
          Ils nous font confiance
        </p>

        <div style={{ overflow: 'hidden', width: '100%' }}>
          <div
            className="animate-scroll-third"
            style={{
              display: 'flex',
              gap: theme.spacing['3xl'],
              alignItems: 'center',
              width: 'max-content',
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.nom}-${index}`}
                style={{
                  width: '140px',
                  height: '80px',
                  position: 'relative',
                  flexShrink: 0,
                  opacity: 0.8,
                  transition: `opacity ${theme.effects.transitions.smooth}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '0.8';
                }}
              >
                <Image
                  src={logo.url}
                  alt={`Logo ${logo.nom} - Client Select Châteaux`}
                  fill
                  sizes="140px"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
