/**
 * BADGE COMPONENT - Labels et tags professionnels
 * Composant badge réutilisable avec variantes
 */

import { HTMLAttributes, forwardRef } from 'react';
import { theme } from '@/design-system/tokens';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Variante visuelle */
  variant?: 'default' | 'glass' | 'solid' | 'outline' | 'success' | 'warning' | 'error';

  /** Taille du badge */
  size?: 'sm' | 'md' | 'lg';

  /** Badge arrondi */
  rounded?: boolean;

  /** Icône à gauche */
  leftIcon?: React.ReactNode;

  /** Icône à droite */
  rightIcon?: React.ReactNode;

  /** Enfants */
  children: React.ReactNode;
}

/**
 * Composant Badge pour labels et tags
 *
 * @example
 * ```tsx
 * <Badge variant="glass" size="md">
 *   Vallée de Chevreuse
 * </Badge>
 *
 * <Badge variant="success" leftIcon={<Check />}>
 *   Disponible
 * </Badge>
 * ```
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'md',
      rounded = true,
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
        background: theme.colors.neutral.gray100,
        color: theme.colors.neutral.gray900,
        border: `1px solid ${theme.colors.neutral.gray200}`,
      },
      glass: {
        background: theme.colors.overlay.white80,
        color: theme.colors.neutral.gray900,
        border: `1px solid ${theme.colors.overlay.white30}`,
        backdropFilter: `blur(${theme.effects.blur.md})`,
      },
      solid: {
        background: theme.colors.primary.bronze,
        color: theme.colors.neutral.white,
        border: 'none',
      },
      outline: {
        background: 'transparent',
        color: theme.colors.primary.bronze,
        border: `1px solid ${theme.colors.primary.bronze}`,
      },
      success: {
        background: `${theme.colors.semantic.success}15`,
        color: theme.colors.semantic.success,
        border: `1px solid ${theme.colors.semantic.success}30`,
      },
      warning: {
        background: `${theme.colors.semantic.warning}15`,
        color: theme.colors.semantic.warning,
        border: `1px solid ${theme.colors.semantic.warning}30`,
      },
      error: {
        background: `${theme.colors.semantic.error}15`,
        color: theme.colors.semantic.error,
        border: `1px solid ${theme.colors.semantic.error}30`,
      },
    };

    // === STYLES PAR TAILLE ===
    const sizeStyles = {
      sm: {
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        fontSize: theme.typography.fontSize.xs,
        gap: theme.spacing.xs,
        height: '24px',
      },
      md: {
        padding: `${theme.spacing.sm} ${theme.spacing.md}`,
        fontSize: theme.typography.fontSize.sm,
        gap: theme.spacing.sm,
        height: '28px',
      },
      lg: {
        padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
        fontSize: theme.typography.fontSize.base,
        gap: theme.spacing.sm,
        height: '32px',
      },
    };

    // === STYLES DE BASE ===
    const baseStyles = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: theme.typography.fonts.body,
      fontWeight: theme.typography.fontWeight.medium,
      borderRadius: rounded ? theme.effects.borderRadius.full : theme.effects.borderRadius.md,
      whiteSpace: 'nowrap' as const,
      userSelect: 'none' as const,
      transition: theme.components.button.transition,
      ...variantStyles[variant],
      ...sizeStyles[size],
    };

    return (
      <span
        ref={ref}
        className={className}
        style={{ ...baseStyles, ...style }}
        {...props}
      >
        {leftIcon && <span style={{ display: 'flex', alignItems: 'center' }}>{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span style={{ display: 'flex', alignItems: 'center' }}>{rightIcon}</span>}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
