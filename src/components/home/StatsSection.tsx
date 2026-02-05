'use client';

import { useInView } from '@/hooks/useInView';
import { useRef, useEffect, useState } from 'react';
import { theme } from '@/design-system/tokens';

interface ChiffreCle {
  valeur: number;
  label: string;
  suffix?: string;
  unite?: string;
}

function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const { ref, isInView } = useInView<HTMLSpanElement>();

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const stepTime = (duration * 1000) / end;
    const increment = Math.max(1, Math.floor(end / 60));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime * increment);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

export function StatsSection({ chiffres }: { chiffres: ChiffreCle[] }) {
  return (
    <section
      style={{
        background: theme.colors.neutral.white,
        padding: 'clamp(2rem, 5vw, 3.75rem) 0',
        borderBottom: `1px solid ${theme.colors.neutral.gray200}`,
      }}
    >
      <div className="stats-row">
        {chiffres.map((chiffre, index) => (
          <div
            key={index}
            className="animate-fade-in hover-lift"
            style={{
              animationDelay: `${index * 0.15}s`,
              textAlign: 'center',
              padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1rem, 2vw, 2rem)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: theme.colors.neutral.white,
              borderRadius: '16px',
              border: `1px solid ${theme.colors.neutral.gray200}`,
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              cursor: 'default',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            <div
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontFamily: theme.typography.fonts.heading,
                fontWeight: 300,
                fontStyle: 'italic',
                color: theme.colors.primary.bronze,
                marginBottom: '0.25rem',
                lineHeight: 1.1,
              }}
            >
              {chiffre.unite || ''}
              <AnimatedCounter value={chiffre.valeur} />
              {chiffre.suffix || ''}
            </div>
            <div
              style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.neutral.gray600,
                letterSpacing: theme.typography.letterSpacing.wide,
                textTransform: 'uppercase',
              }}
            >
              {chiffre.label}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
