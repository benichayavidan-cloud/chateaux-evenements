'use client';

import Image from 'next/image';
import { theme } from '@/design-system/tokens';

interface LogoItem {
  nom: string;
  url: string;
}

interface LogoCarouselProps {
  logos: LogoItem[];
}

export function LogoCarousel({ logos }: LogoCarouselProps) {
  // Dupliquer les logos pour créer un effet de défilement infini
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          gap: theme.spacing['3xl'],
          alignItems: 'center',
          animation: 'scroll 30s linear infinite',
          width: 'max-content',
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.nom}-${index}`}
            style={{
              width: '140px',
              height: '50px',
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
              alt={logo.nom}
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }
      `}</style>
    </div>
  );
}
