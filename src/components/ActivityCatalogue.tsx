'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Clock, MapPin, Check } from 'lucide-react';
import { theme } from '@/design-system/tokens';
import { teamBuildingActivities, tbActivities, soireeActivities } from '@/data/team-building-activities';
import type { Activity } from '@/data/team-building-activities';

// ─── Flip Card ───────────────────────────────────────────────
function useIsTouch() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);
  return isTouch;
}

function FlipCard({ activity }: { activity: Activity }) {
  const [flipped, setFlipped] = useState(false);
  const isSoiree = activity.category === 'soiree';
  const isTouch = useIsTouch();

  return (
    <div
      className="flip-card"
      onMouseEnter={isTouch ? undefined : () => setFlipped(true)}
      onMouseLeave={isTouch ? undefined : () => setFlipped(false)}
      onClick={() => setFlipped(f => !f)}
      style={{ perspective: '1200px', height: '440px', cursor: 'pointer' }}
    >
      <div
        className={`flip-card-inner ${flipped ? 'flipped' : ''}`}
        style={{
          position: 'relative', width: '100%', height: '100%',
          transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* ── FRONT ── */}
        <div style={{
          position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
          borderRadius: '20px', overflow: 'hidden',
        }}>
          <Image
            src={activity.image}
            alt={`${activity.name} — ${isSoiree ? 'animation soirée entreprise' : 'activité team building'} en château`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
            loading="lazy"
            quality={80}
          />
          {/* Overlay gradient */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.05) 70%)',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            padding: '28px',
          }}>
            {/* Badge catégorie */}
            <div style={{
              position: 'absolute', top: '16px', left: '16px',
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '6px 14px', borderRadius: '100px',
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em',
              textTransform: 'uppercase' as const,
              background: isSoiree ? 'rgba(108,63,160,0.92)' : 'rgba(14,124,134,0.92)',
              color: 'white',
            }}>
              {isSoiree ? 'Soirée' : 'Team Building'}
            </div>
            {/* Flip hint */}
            <div style={{
              position: 'absolute', top: '16px', right: '16px',
              width: '38px', height: '38px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: '14px', fontWeight: 600,
              border: '1px solid rgba(255,255,255,0.25)',
            }}>
              ↻
            </div>
            {/* Titre */}
            <h3 style={{
              fontFamily: theme.typography.fonts.heading,
              fontSize: '26px', fontWeight: 600, color: 'white',
              lineHeight: 1.15, marginBottom: '10px',
              textShadow: '0 2px 12px rgba(0,0,0,0.3)',
            }}>
              {activity.name}
            </h3>
            {/* Meta */}
            <div style={{ display: 'flex', gap: '14px', fontSize: '12px', color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Clock style={{ width: '13px', height: '13px' }} /> {activity.duration}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <MapPin style={{ width: '13px', height: '13px' }} /> {activity.location}
              </span>
            </div>
          </div>
        </div>

        {/* ── BACK ── */}
        <div style={{
          position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          borderRadius: '20px', overflow: 'hidden',
          background: 'white', border: '1px solid #E2E8F0',
          display: 'flex', flexDirection: 'column',
          padding: '28px 28px 24px',
        }}>
          <div style={{
            fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' as const,
            letterSpacing: '0.1em', marginBottom: '8px',
            color: isSoiree ? '#6C3FA0' : '#0E7C86',
          }}>
            {isSoiree ? 'Soirée & Afterwork' : 'Team Building'}
          </div>
          <h3 style={{
            fontFamily: theme.typography.fonts.heading,
            fontSize: '26px', fontWeight: 600, color: '#0F172A',
            marginBottom: '14px', lineHeight: 1.2,
          }}>
            {activity.name}
          </h3>
          <p style={{
            fontSize: '13.5px', lineHeight: 1.75, color: '#475569',
            flex: 1, overflowY: 'auto', marginBottom: '16px',
          }}>
            {activity.description}
          </p>
          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
            {activity.tags.map((tag, i) => (
              <span key={i} style={{
                padding: '4px 12px', borderRadius: '100px',
                fontSize: '11px', fontWeight: 600,
                background: '#F8FAFC', color: '#475569',
                border: '1px solid #E2E8F0',
              }}>
                {tag}
              </span>
            ))}
          </div>
          {/* Footer */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            paddingTop: '14px', borderTop: '1px solid #F1F5F9',
            fontSize: '12px', color: '#64748B',
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Clock style={{ width: '13px', height: '13px' }} /> {activity.duration} · {activity.location}
            </span>
            <Link
              href="/devis#formulaire"
              onClick={(e) => e.stopPropagation()}
              style={{
                padding: '10px 22px', borderRadius: '100px',
                background: `linear-gradient(135deg, ${theme.colors.primary.gold}, ${theme.colors.primary.bronze})`,
                color: 'white', fontSize: '13px', fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(163,126,44,0.25)',
                transition: 'all 0.3s',
              }}
            >
              Devis gratuit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Section Catalogue ───────────────────────────────────────
type FilterType = 'all' | 'tb' | 'soiree';

export default function ActivityCatalogue() {
  const [filter, setFilter] = useState<FilterType>('all');

  const counts = {
    all: teamBuildingActivities.length,
    tb: tbActivities.length,
    soiree: soireeActivities.length,
  };

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'Toutes les activités' },
    { key: 'tb', label: 'Team Building' },
    { key: 'soiree', label: 'Soirées & Afterwork' },
  ];

  const showTB = filter === 'all' || filter === 'tb';
  const showSoiree = filter === 'all' || filter === 'soiree';

  return (
    <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(16px, 3vw, 40px)' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 14px',
            background: `${theme.colors.primary.bronze}10`,
            borderRadius: theme.effects.borderRadius.full,
            border: `1px solid ${theme.colors.primary.bronze}30`,
            marginBottom: '1rem',
          }}>
            <Check className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: theme.colors.primary.bronze, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              +40 animations
            </span>
          </div>
          <h2 style={{
            fontFamily: theme.typography.fonts.heading,
            fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
            fontWeight: 600, color: '#0F172A',
            marginBottom: '0.75rem', lineHeight: 1.2,
          }}>
            +40 Activités Team Building & Soirées en Château
          </h2>
          <p style={{ fontSize: '1rem', color: '#64748B', maxWidth: '600px', margin: '0 auto' }}>
            Séminaire cohésion d&apos;équipe en Île-de-France — activités outdoor, indoor et soirées d&apos;entreprise
          </p>
        </div>

        {/* Filtres */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: '8px',
          marginBottom: '2.5rem', flexWrap: 'wrap',
        }}>
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              style={{
                padding: '10px 22px', borderRadius: '100px',
                fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                transition: 'all 0.3s',
                fontFamily: 'inherit',
                border: filter === f.key ? '1px solid transparent' : '1px solid #E2E8F0',
                background: filter === f.key
                  ? `linear-gradient(135deg, ${theme.colors.primary.gold}, ${theme.colors.primary.bronze})`
                  : 'white',
                color: filter === f.key ? 'white' : '#64748B',
                boxShadow: filter === f.key ? '0 4px 16px rgba(163,126,44,0.3)' : 'none',
              }}
            >
              {f.label}
              <span style={{ fontSize: '11px', opacity: 0.7, marginLeft: '4px' }}>
                ({counts[f.key]})
              </span>
            </button>
          ))}
        </div>

        {/* Team Building */}
        {showTB && (
          <>
            {filter === 'all' && (
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#0E7C86', marginBottom: '6px' }}>
                  Journée · Séminaire
                </div>
                <h3 style={{
                  fontFamily: theme.typography.fonts.heading,
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                  fontWeight: 600, color: '#0F172A',
                  position: 'relative', display: 'inline-block',
                }}>
                  Team Building
                  <span style={{
                    position: 'absolute', bottom: '-8px', left: '15%', right: '15%',
                    height: '2px',
                    background: `linear-gradient(90deg, transparent, ${theme.colors.primary.bronze}, transparent)`,
                  }} />
                </h3>
              </div>
            )}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px',
              marginBottom: filter === 'all' ? '3.5rem' : '0',
            }}>
              {tbActivities.map((a, i) => <FlipCard key={i} activity={a} />)}
            </div>
          </>
        )}

        {/* Soirées */}
        {showSoiree && (
          <>
            {filter === 'all' && (
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#6C3FA0', marginBottom: '6px' }}>
                  Afterwork · Soirée
                </div>
                <h3 style={{
                  fontFamily: theme.typography.fonts.heading,
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                  fontWeight: 600, color: '#0F172A',
                  position: 'relative', display: 'inline-block',
                }}>
                  Soirées & Animations
                  <span style={{
                    position: 'absolute', bottom: '-8px', left: '15%', right: '15%',
                    height: '2px',
                    background: `linear-gradient(90deg, transparent, ${theme.colors.primary.bronze}, transparent)`,
                  }} />
                </h3>
              </div>
            )}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px',
            }}>
              {soireeActivities.map((a, i) => <FlipCard key={i} activity={a} />)}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
