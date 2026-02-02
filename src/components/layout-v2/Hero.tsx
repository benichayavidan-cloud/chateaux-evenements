/**
 * HERO COMPONENT - Section hero professionnelle
 * Composant hero responsive avec image de fond et overlay
 */

import { HTMLAttributes, forwardRef, ReactNode } from 'react';
import { theme } from '@/design-system/tokens';
import { Container } from './Container';

export interface HeroProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Taille du hero */
  size?: 'small' | 'medium' | 'large' | 'fullscreen';

  /** Image de fond */
  backgroundImage?: string;

  /** Vidéo de fond */
  backgroundVideo?: string;

  /** Overlay gradient */
  overlay?: boolean;

  /** Intensité de l'overlay (0-1) */
  overlayOpacity?: number;

  /** Alignement vertical du contenu */
  align?: 'start' | 'center' | 'end';

  /** Alignement horizontal du contenu */
  justify?: 'start' | 'center' | 'end';

  /** Taille du container de contenu */
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';

  /** Enfants (contenu du hero) */
  children: ReactNode;
}

/**
 * Composant Hero pour headers de page
 *
 * @example
 * ```tsx
 * <Hero
 *   size="fullscreen"
 *   backgroundImage="/hero.jpg"
 *   overlay
 *   align="center"
 * >
 *   <Text variant="h1" color="white">
 *     Bienvenue
 *   </Text>
 *   <Button variant="primary">
 *     Découvrir
 *   </Button>
 * </Hero>
 * ```
 */
export const Hero = forwardRef<HTMLElement, HeroProps>(
  (
    {
      size = 'large',
      backgroundImage,
      backgroundVideo,
      overlay = true,
      overlayOpacity = 0.5,
      align = 'center',
      justify = 'center',
      containerSize = 'lg',
      className = '',
      style = {},
      children,
      ...props
    },
    ref
  ) => {
    // === HAUTEURS PAR TAILLE ===
    const heightMap = {
      small: '40vh',
      medium: '60vh',
      large: '80vh',
      fullscreen: '100vh',
    };

    // === MIN-HEIGHT (pour contenu) ===
    const minHeightMap = {
      small: '400px',
      medium: '500px',
      large: '600px',
      fullscreen: '100vh',
    };

    // === ALIGNEMENT VERTICAL ===
    const alignMap = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
    };

    // === ALIGNEMENT HORIZONTAL ===
    const justifyMap = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
    };

    // === STYLES DE BASE ===
    const baseStyles = {
      position: 'relative' as const,
      width: '100%',
      height: heightMap[size],
      minHeight: minHeightMap[size],
      display: 'flex',
      alignItems: alignMap[align],
      justifyContent: justifyMap[justify],
      overflow: 'hidden',
    };

    return (
      <section
        ref={ref}
        className={`hero hero-${size} ${className}`}
        style={{ ...baseStyles, ...style }}
        {...props}
      >
        {/* Background Image */}
        {backgroundImage && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              zIndex: 0,
            }}
          />
        )}

        {/* Background Video */}
        {backgroundVideo && (
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
            }}
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        )}

        {/* Overlay */}
        {overlay && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: theme.gradients.overlayBottom,
              opacity: overlayOpacity,
              zIndex: 1,
            }}
          />
        )}

        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            padding: `${theme.spacing.xl} ${theme.spacing.md}`,
          }}
        >
          <Container size={containerSize} padding={false}>
            {children}
          </Container>
        </div>
      </section>
    );
  }
);

Hero.displayName = 'Hero';
