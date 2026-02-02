/**
 * LINK COMPONENT - Liens professionnels avec Next.js
 * Composant lien avec hover states et variantes
 */

import { forwardRef, AnchorHTMLAttributes } from 'react';
import NextLink from 'next/link';
import { theme } from '@/design-system/tokens';

export interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  /** URL de destination */
  href: string;

  /** Variante visuelle */
  variant?: 'default' | 'bronze' | 'underline' | 'subtle' | 'button';

  /** Ouvrir dans un nouvel onglet */
  external?: boolean;

  /** Icône à gauche */
  leftIcon?: React.ReactNode;

  /** Icône à droite */
  rightIcon?: React.ReactNode;

  /** Enfants */
  children: React.ReactNode;
}

/**
 * Composant Link avec Next.js et hover states
 *
 * @example
 * ```tsx
 * <Link href="/chateaux" variant="bronze">
 *   Découvrir nos châteaux
 * </Link>
 *
 * <Link href="https://example.com" external>
 *   Site externe
 * </Link>
 * ```
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href,
      variant = 'default',
      external = false,
      leftIcon,
      rightIcon,
      className = '',
      style = {},
      children,
      ...props
    },
    ref
  ) => {
    // === STYLES PAR VARIANTE ===
    const variantStyles = {
      default: {
        color: theme.colors.primary.bronze,
        textDecoration: 'none',
        transition: `color ${theme.effects.transitions.base} ${theme.effects.easings.smooth}`,
        ':hover': {
          color: theme.colors.primary.bronzeDark,
        },
      },
      bronze: {
        color: theme.colors.primary.bronze,
        textDecoration: 'none',
        fontWeight: theme.typography.fontWeight.medium,
        transition: `all ${theme.effects.transitions.base} ${theme.effects.easings.smooth}`,
        ':hover': {
          color: theme.colors.primary.bronzeDark,
          transform: 'translateX(2px)',
        },
      },
      underline: {
        color: theme.colors.neutral.gray900,
        textDecoration: 'none',
        borderBottom: `1px solid ${theme.colors.neutral.gray300}`,
        transition: `border-color ${theme.effects.transitions.base} ${theme.effects.easings.smooth}`,
        ':hover': {
          borderBottomColor: theme.colors.primary.bronze,
        },
      },
      subtle: {
        color: theme.colors.neutral.gray600,
        textDecoration: 'none',
        transition: `color ${theme.effects.transitions.base} ${theme.effects.easings.smooth}`,
        ':hover': {
          color: theme.colors.neutral.gray900,
        },
      },
      button: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing.sm,
        padding: theme.components.button.padding.md,
        background: theme.colors.primary.bronze,
        color: theme.colors.neutral.white,
        borderRadius: theme.components.button.borderRadius,
        textDecoration: 'none',
        fontWeight: theme.typography.fontWeight.medium,
        transition: `all ${theme.effects.transitions.smooth} ${theme.effects.easings.smooth}`,
        ':hover': {
          background: theme.colors.primary.bronzeDark,
          color: theme.colors.neutral.white,
          transform: 'translateY(-2px)',
          boxShadow: theme.effects.shadows.lg,
        },
      },
    };

    // === STYLES DE BASE ===
    const baseStyles = {
      display: leftIcon || rightIcon ? 'inline-flex' : 'inline',
      alignItems: 'center',
      gap: theme.spacing.xs,
      cursor: 'pointer',
      fontFamily: theme.typography.fonts.body,
      ...variantStyles[variant],
    };

    // === PROPS EXTERNES ===
    const externalProps = external
      ? {
          target: '_blank',
          rel: 'noopener noreferrer',
        }
      : {};

    // === CONTENU ===
    const content = (
      <>
        {leftIcon && <span style={{ display: 'flex', alignItems: 'center' }}>{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span style={{ display: 'flex', alignItems: 'center' }}>{rightIcon}</span>}
      </>
    );

    // === LIEN EXTERNE ===
    if (external || href.startsWith('http')) {
      return (
        <a
          ref={ref}
          href={href}
          className={`link-${variant} ${className}`}
          style={{ ...baseStyles, ...style }}
          {...externalProps}
          {...props}
        >
          {content}
        </a>
      );
    }

    // === LIEN INTERNE (Next.js) ===
    return (
      <NextLink
        ref={ref}
        href={href}
        className={`link-${variant} ${className}`}
        style={{ ...baseStyles, ...style }}
        {...props}
      >
        {content}
      </NextLink>
    );
  }
);

Link.displayName = 'Link';
