'use client';

import { motion, useInView } from 'framer-motion';
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
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

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
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              delay: index * 0.15,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              y: -6,
              boxShadow: '0 12px 40px rgba(163, 126, 44, 0.15)',
            }}
            style={{
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
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .stats-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        @media (min-width: 768px) {
          .stats-row {
            grid-template-columns: repeat(4, 1fr);
            gap: 1.5rem;
            padding: 0 2rem;
          }
        }
      `}</style>
    </section>
  );
}
