/**
 * HERO SLIDER COMPONENT - Slider hero professionnel
 * Hero avec slider d'images, auto-play, et navigation
 * framer-motion removed — CSS transitions for max performance
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button, Badge } from '@/components/ui-v2';
import { theme } from '@/design-system/tokens';

export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  badge?: string;
  cta?: {
    label: string;
    href: string;
  };
}

export interface HeroSliderProps {
  /** Slides */
  slides: HeroSlide[];

  /** Auto-play */
  autoPlay?: boolean;

  /** Durée auto-play (ms) */
  autoPlayDuration?: number;

  /** Hauteur du hero */
  height?: string;

  /** Afficher les boutons de navigation */
  showNavigation?: boolean;

  /** Afficher les indicateurs */
  showIndicators?: boolean;

  /** H1 visible au-dessus du contenu du slider */
  heading?: string;
}

export function HeroSlider({
  slides,
  autoPlay = true,
  autoPlayDuration = 5000,
  height = '100vh',
  showNavigation = true,
  showIndicators = true,
  heading,
}: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [contentKey, setContentKey] = useState(0);

  // Navigation
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setContentKey((k) => k + 1);
  }, [slides.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setContentKey((k) => k + 1);
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setContentKey((k) => k + 1);
  }, []);

  // Auto-play
  useEffect(() => {
    if (!autoPlay || isPaused) return;

    const timer = setInterval(goToNext, autoPlayDuration);
    return () => clearInterval(timer);
  }, [autoPlay, isPaused, autoPlayDuration, goToNext]);

  const currentSlide = slides[currentIndex];

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height,
        minHeight: '600px',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides — all rendered, only current is visible */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: index === currentIndex ? 1 : 0,
            transition: 'opacity 0.7s ease-in-out',
            zIndex: index === currentIndex ? 1 : 0,
          }}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            priority={index === 0}
            sizes="100vw"
            quality={75}
          />

          {/* Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: theme.gradients.overlayBottom,
              opacity: 0.6,
            }}
          />
        </div>
      ))}

      {/* Content — re-animated on slide change via key */}
      <div
        key={contentKey}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: `0 ${theme.spacing.md}`,
          zIndex: 2,
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            textAlign: 'center',
            width: '100%',
            transform: 'translateY(-46px)',
          }}
        >
          {/* H1 - Visible main heading */}
          {heading && (
            <h1
              className="animate-fade-in delay-100"
              style={{
                fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)',
                fontFamily: theme.typography.fonts.body,
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.85)',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                marginBottom: theme.spacing.lg,
                textShadow: '0 2px 8px rgba(0,0,0,0.4)',
              }}
            >
              {heading}
            </h1>
          )}

          {/* Badge */}
          {currentSlide.badge && (
            <div
              className="animate-fade-in delay-200"
              style={{ marginBottom: theme.spacing.md }}
            >
              <Badge variant="glass" size="md">
                {currentSlide.badge}
              </Badge>
            </div>
          )}

          {/* Title - H2 car le H1 SEO est dans la page parente */}
          <h2
            className="animate-fade-in delay-300"
            style={{
              fontSize: theme.typography.fontSize.display.md,
              fontFamily: theme.typography.fonts.heading,
              fontWeight: theme.typography.fontWeight.light,
              fontStyle: 'italic',
              color: theme.colors.neutral.white,
              marginBottom: theme.spacing.md,
              textShadow: '0 2px 10px rgba(0,0,0,0.3)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical' as const,
              overflow: 'hidden',
              lineHeight: '1.2',
            }}
          >
            {currentSlide.title}
          </h2>

          {/* Subtitle */}
          {currentSlide.subtitle && (
            <p
              className="animate-fade-in delay-400"
              style={{
                fontSize: theme.typography.fontSize.xl,
                color: theme.colors.neutral.white,
                marginBottom: theme.spacing.xl,
                lineHeight: theme.typography.lineHeight.relaxed,
                textShadow: '0 2px 8px rgba(0,0,0,0.3)',
              }}
            >
              {currentSlide.subtitle}
            </p>
          )}

          {/* CTA */}
          {currentSlide.cta && (
            <div className="animate-fade-in delay-500">
              <Link href={currentSlide.cta.href}>
                <Button variant="primary" size="lg">
                  {currentSlide.cta.label}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      {showNavigation && slides.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            style={{
              position: 'absolute',
              left: theme.spacing.lg,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: theme.colors.overlay.white20,
              backdropFilter: `blur(${theme.effects.blur.sm})`,
              border: 'none',
              borderRadius: theme.effects.borderRadius.full,
              color: theme.colors.neutral.white,
              cursor: 'pointer',
              transition: `all ${theme.effects.transitions.base}`,
              zIndex: 10,
            }}
            aria-label="Slide précédent"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goToNext}
            style={{
              position: 'absolute',
              right: theme.spacing.lg,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: theme.colors.overlay.white20,
              backdropFilter: `blur(${theme.effects.blur.sm})`,
              border: 'none',
              borderRadius: theme.effects.borderRadius.full,
              color: theme.colors.neutral.white,
              cursor: 'pointer',
              transition: `all ${theme.effects.transitions.base}`,
              zIndex: 10,
            }}
            aria-label="Slide suivant"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Scroll Indicator - "Découvrir" */}
      <div
        className="animate-fade-only hero-scroll-indicator"
        style={{
          position: 'absolute',
          bottom: '5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          animationDelay: '1.5s',
        }}
      >
        <div
          className="animate-bounce-gentle"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span
            style={{
              color: '#ffffff',
              fontSize: '0.65rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              fontWeight: 600,
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            Découvrir
          </span>
          <div
            style={{
              width: '24px',
              height: '40px',
              borderRadius: '9999px',
              border: '2px solid rgba(255,255,255,0.6)',
              background: 'rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              padding: '8px 0',
            }}
          >
            <div
              className="animate-bounce-gentle"
              style={{
                width: '4px',
                height: '12px',
                borderRadius: '9999px',
                background: theme.colors.primary.bronze,
                animationDuration: '1.5s',
              }}
            />
          </div>
        </div>
      </div>

      {/* Indicators */}
      {showIndicators && slides.length > 1 && (
        <div
          style={{
            position: 'absolute',
            bottom: theme.spacing.lg,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: theme.spacing.xs,
            zIndex: 10,
          }}
        >
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: index === currentIndex ? '32px' : '8px',
                height: '8px',
                background: index === currentIndex
                  ? theme.colors.primary.bronze
                  : theme.colors.overlay.white50,
                border: 'none',
                borderRadius: theme.effects.borderRadius.full,
                cursor: 'pointer',
                transition: `all ${theme.effects.transitions.smooth}`,
              }}
              aria-label={`Aller au slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .hero-scroll-indicator {
            bottom: 4rem !important;
          }
          .hero-scroll-indicator span {
            font-size: 0.55rem !important;
          }
        }
      `}</style>
    </section>
  );
}
