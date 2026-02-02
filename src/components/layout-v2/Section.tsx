/**
 * SECTION COMPONENT - Wrapper de section
 * Composant section avec spacing et backgrounds
 */

import { HTMLAttributes, forwardRef } from 'react';
import { theme } from '@/design-system/tokens';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Élément HTML à rendre */
  as?: 'section' | 'div' | 'article' | 'aside';

  /** Spacing vertical (padding top/bottom) */
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /** Background */
  background?: 'white' | 'gray' | 'gradient' | 'transparent';

  /** Largeur pleine */
  fullWidth?: boolean;

  /** Enfants */
  children: React.ReactNode;
}

/**
 * Composant Section pour structurer les pages
 *
 * @example
 * ```tsx
 * <Section spacing="lg" background="gray">
 *   <Container>
 *     <Text variant="h2">Titre de section</Text>
 *   </Container>
 * </Section>
 * ```
 */
export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      as: Component = 'section',
      spacing = 'md',
      background = 'white',
      fullWidth = false,
      className = '',
      style = {},
      children,
      ...props
    },
    ref
  ) => {
    // === SPACING VERTICAL ===
    const spacingMap = {
      none: '0',
      xs: theme.spacing.section.xs,    // clamp(2rem, 4vw, 3rem)
      sm: theme.spacing.section.sm,    // clamp(3rem, 6vw, 4rem)
      md: theme.spacing.section.md,    // clamp(4rem, 8vw, 6rem)
      lg: theme.spacing.section.lg,    // clamp(5rem, 10vw, 8rem)
      xl: theme.spacing.section.xl,    // clamp(6rem, 12vw, 10rem)
    };

    // === BACKGROUNDS ===
    const backgroundMap = {
      white: theme.colors.neutral.white,
      gray: `linear-gradient(to bottom, ${theme.colors.neutral.gray50}, ${theme.colors.neutral.white})`,
      gradient: `linear-gradient(to bottom, ${theme.colors.neutral.white} 0%, ${theme.colors.neutral.gray50} 50%, ${theme.colors.neutral.white} 100%)`,
      transparent: 'transparent',
    };

    // === STYLES DE BASE ===
    const baseStyles = {
      position: 'relative' as const,
      width: fullWidth ? '100%' : undefined,
      paddingTop: spacingMap[spacing],
      paddingBottom: spacingMap[spacing],
      background: backgroundMap[background],
    };

    return (
      <Component
        ref={ref as any}
        className={`section section-${spacing} ${className}`}
        style={{ ...baseStyles, ...style }}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Section.displayName = 'Section';
