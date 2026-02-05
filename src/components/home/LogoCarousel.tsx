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
  );
}
