/**
 * CARD COMPONENT - Carte professionnelle
 * Carte réutilisable avec image, overlay, et hover states
 */

'use client';

import { forwardRef, ReactNode } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link, Text, Badge } from '@/components/ui-v2';
import { theme } from '@/design-system/tokens';

export interface CardProps {
  /** Image de la carte */
  image: string;

  /** Titre */
  title: string;

  /** Description */
  description?: string;

  /** Badge (coin supérieur droit) */
  badge?: string;

  /** Liste de points (features) */
  features?: string[];

  /** Informations du footer */
  footer?: ReactNode;

  /** Lien */
  href?: string;

  /** Variante */
  variant?: 'default' | 'hover-overlay' | 'minimal';

  /** Hauteur de l'image */
  imageHeight?: string;

  /** CTA label */
  ctaLabel?: string;
}

/**
 * Composant Card pour afficher du contenu
 *
 * @example
 * ```tsx
 * <Card
 *   image="/chateau.jpg"
 *   title="Château Example"
 *   description="Un château magnifique"
 *   badge="Vallée de Chevreuse"
 *   features={['100 personnes', '20 chambres', 'Parc 5ha']}
 *   href="/chateaux/example"
 * />
 * ```
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      image,
      title,
      description,
      badge,
      features = [],
      footer,
      href,
      variant = 'hover-overlay',
      imageHeight = '400px',
      ctaLabel = 'Découvrir',
    },
    ref
  ) => {
    const content = (
      <motion.div
        ref={ref}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'relative',
          borderRadius: theme.components.card.borderRadius,
          overflow: 'hidden',
          boxShadow: theme.components.card.shadow,
          background: theme.colors.neutral.white,
          transition: theme.components.card.transition,
          cursor: href ? 'pointer' : 'default',
        }}
        className="card-component group"
      >
        {/* Image Container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: imageHeight,
            overflow: 'hidden',
          }}
        >
          {/* Image */}
          <Image
            src={image}
            alt={title}
            fill
            style={{
              objectFit: 'cover',
              transition: `transform ${theme.effects.transitions.ultra} ${theme.effects.easings.smooth}`,
            }}
            className="group-hover:scale-105"
          />

          {/* Badge */}
          {badge && variant !== 'minimal' && (
            <div
              style={{
                position: 'absolute',
                top: theme.spacing.lg,
                right: theme.spacing.lg,
                zIndex: 2,
                transition: `opacity ${theme.effects.transitions.smooth}`,
              }}
              className="group-hover:opacity-0"
            >
              <Badge variant="glass" size="md">
                {badge}
              </Badge>
            </div>
          )}

          {/* Hover Overlay (variant hover-overlay) */}
          {variant === 'hover-overlay' && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: theme.colors.overlay.white90,
                opacity: 0,
                transition: `opacity ${theme.effects.transitions.ultra}`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: theme.spacing.xl,
                zIndex: 1,
              }}
              className="group-hover:opacity-100"
            >
              {/* Title */}
              <Text
                variant="h3"
                style={{
                  marginBottom: theme.spacing.md,
                  transform: 'translateY(20px)',
                  transition: `transform ${theme.effects.transitions.slower}`,
                }}
                className="group-hover:translate-y-0"
              >
                {title}
              </Text>

              {/* Description */}
              {description && (
                <Text
                  variant="body"
                  color="muted"
                  lineClamp={2}
                  style={{
                    marginBottom: theme.spacing.md,
                    transform: 'translateY(20px)',
                    transition: `transform ${theme.effects.transitions.slower} 75ms`,
                  }}
                  className="group-hover:translate-y-0"
                >
                  {description}
                </Text>
              )}

              {/* Features */}
              {features.length > 0 && (
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: `0 0 ${theme.spacing.md} 0`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: theme.spacing.xs,
                    transform: 'translateY(20px)',
                    transition: `transform ${theme.effects.transitions.slower} 150ms`,
                  }}
                  className="group-hover:translate-y-0"
                >
                  {features.slice(0, 3).map((feature, index) => (
                    <li
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'start',
                        gap: theme.spacing.sm,
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.neutral.gray800,
                      }}
                    >
                      <span style={{ color: theme.colors.primary.bronze, fontWeight: 700 }}>•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Footer Info */}
              {footer && (
                <div
                  style={{
                    paddingTop: theme.spacing.md,
                    borderTop: `1px solid ${theme.colors.neutral.gray300}`,
                    marginBottom: theme.spacing.md,
                    transform: 'translateY(20px)',
                    transition: `transform ${theme.effects.transitions.slower} 150ms`,
                  }}
                  className="group-hover:translate-y-0"
                >
                  {footer}
                </div>
              )}

              {/* CTA */}
              {href && (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: theme.spacing.sm,
                    color: theme.colors.primary.bronze,
                    fontWeight: theme.typography.fontWeight.medium,
                    fontSize: theme.typography.fontSize.sm,
                    textTransform: 'uppercase',
                    letterSpacing: theme.typography.letterSpacing.wider,
                    transform: 'translateY(20px)',
                    transition: `transform ${theme.effects.transitions.slower} 200ms`,
                  }}
                  className="group-hover:translate-y-0"
                >
                  <span>{ctaLabel}</span>
                  <ArrowRight
                    className="w-4 h-4"
                    style={{
                      transition: `transform ${theme.effects.transitions.smooth}`,
                    }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Gradient Overlay (variant default) */}
          {variant === 'default' && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: theme.gradients.overlayBottom.replace('0.9', '0.3'),
              }}
            />
          )}
        </div>

        {/* Content (variant default & minimal) */}
        {(variant === 'default' || variant === 'minimal') && (
          <div style={{ padding: theme.components.card.padding.md }}>
            <Text variant="h4" style={{ marginBottom: theme.spacing.sm }}>
              {title}
            </Text>

            {description && (
              <Text variant="body" color="muted" lineClamp={3} style={{ marginBottom: theme.spacing.md }}>
                {description}
              </Text>
            )}

            {features.length > 0 && (
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: `0 0 ${theme.spacing.md} 0`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: theme.spacing.xs,
                }}
              >
                {features.map((feature, index) => (
                  <li
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'start',
                      gap: theme.spacing.sm,
                      fontSize: theme.typography.fontSize.sm,
                      color: theme.colors.neutral.gray700,
                    }}
                  >
                    <span style={{ color: theme.colors.primary.bronze }}>•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            {footer && (
              <div
                style={{
                  paddingTop: theme.spacing.md,
                  borderTop: `1px solid ${theme.colors.neutral.gray200}`,
                }}
              >
                {footer}
              </div>
            )}
          </div>
        )}

        {/* Hover Border Effect */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0,
            transition: `opacity ${theme.effects.transitions.ultra}`,
            pointerEvents: 'none',
          }}
          className="group-hover:opacity-100"
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: `linear-gradient(to right, transparent, ${theme.colors.primary.bronze}, transparent)`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: `linear-gradient(to right, transparent, ${theme.colors.primary.bronze}, transparent)`,
            }}
          />
        </div>
      </motion.div>
    );

    // Wrapper avec Link si href fourni
    if (href) {
      return (
        <Link href={href} variant="default" style={{ textDecoration: 'none', display: 'block' }}>
          {content}
        </Link>
      );
    }

    return content;
  }
);

Card.displayName = 'Card';
