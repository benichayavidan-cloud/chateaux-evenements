/**
 * HERO SLIDER COMPONENT - Slider hero professionnel
 * Hero avec slider d'images, auto-play, et navigation
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
}

export function HeroSlider({
  slides,
  autoPlay = true,
  autoPlayDuration = 5000,
  height = '100vh',
  showNavigation = true,
  showIndicators = true,
}: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Navigation
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
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
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            inset: 0,
          }}
        >
          {/* Image */}
          <Image
            src={currentSlide.image}
            alt={currentSlide.title}
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            priority={currentIndex === 0}
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

          {/* Content */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: `0 ${theme.spacing.md}`,
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
              {/* Badge */}
              {currentSlide.badge && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  style={{ marginBottom: theme.spacing.md }}
                >
                  <Badge variant="glass" size="md">
                    {currentSlide.badge}
                  </Badge>
                </motion.div>
              )}

              {/* Title - H2 car le H1 SEO est dans la page parente */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
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
              </motion.h2>

              {/* Subtitle */}
              {currentSlide.subtitle && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  style={{
                    fontSize: theme.typography.fontSize.xl,
                    color: theme.colors.neutral.white,
                    marginBottom: theme.spacing.xl,
                    lineHeight: theme.typography.lineHeight.relaxed,
                    textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  }}
                >
                  {currentSlide.subtitle}
                </motion.p>
              )}

              {/* CTA */}
              {currentSlide.cta && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <Link href={currentSlide.cta.href}>
                    <Button variant="primary" size="lg">
                      {currentSlide.cta.label}
                    </Button>
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

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

      {/* Indicators */}
      {showIndicators && slides.length > 1 && (
        <div
          style={{
            position: 'absolute',
            bottom: theme.spacing.xl,
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
    </section>
  );
}
