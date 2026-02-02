/**
 * BUTTON COMPONENT - Ultra Professionnel
 * Composant bouton réutilisable avec toutes les variantes
 * Accessibilité WCAG 2.1 AA intégrée
 */

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { theme } from '@/design-system/tokens';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Variante visuelle du bouton */
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';

  /** Taille du bouton */
  size?: 'sm' | 'md' | 'lg';

  /** Bouton en pleine largeur */
  fullWidth?: boolean;

  /** État de chargement */
  loading?: boolean;

  /** Icône à gauche */
  leftIcon?: React.ReactNode;

  /** Icône à droite */
  rightIcon?: React.ReactNode;

  /** Enfants (texte du bouton) */
  children: React.ReactNode;
}

/**
 * Composant Button avec support complet des variantes et accessibilité
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="lg">
 *   Demander un devis
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    // === STYLES PAR VARIANTE ===
    const variantStyles = {
      primary: {
        background: theme.colors.primary.bronze,
        color: theme.colors.neutral.white,
        border: 'none',
        ':hover': {
          background: theme.colors.primary.bronzeDark,
          transform: 'translateY(-2px)',
          boxShadow: theme.effects.shadows.lg,
        },
        ':active': {
          transform: 'translateY(0)',
        },
      },
      secondary: {
        background: theme.colors.neutral.gray100,
        color: theme.colors.neutral.gray900,
        border: 'none',
        ':hover': {
          background: theme.colors.neutral.gray200,
          transform: 'translateY(-2px)',
        },
      },
      ghost: {
        background: 'transparent',
        color: theme.colors.primary.bronze,
        border: 'none',
        ':hover': {
          background: `${theme.colors.primary.bronze}10`,
        },
      },
      outline: {
        background: 'transparent',
        color: theme.colors.primary.bronze,
        border: `${theme.effects.borderWidth.base} solid ${theme.colors.primary.bronze}`,
        ':hover': {
          background: theme.colors.primary.bronze,
          color: theme.colors.neutral.white,
          transform: 'translateY(-2px)',
        },
      },
      danger: {
        background: theme.colors.semantic.error,
        color: theme.colors.neutral.white,
        border: 'none',
        ':hover': {
          background: '#DC2626',
          transform: 'translateY(-2px)',
        },
      },
    };

    // === STYLES PAR TAILLE ===
    const sizeStyles = {
      sm: {
        padding: theme.components.button.padding.sm,
        fontSize: theme.components.button.fontSize.sm,
        height: '36px',
      },
      md: {
        padding: theme.components.button.padding.md,
        fontSize: theme.components.button.fontSize.md,
        height: '44px',
      },
      lg: {
        padding: theme.components.button.padding.lg,
        fontSize: theme.components.button.fontSize.lg,
        height: '52px',
      },
    };

    // === STYLES DE BASE ===
    const baseStyles = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing.sm,
      fontFamily: theme.typography.fonts.body,
      fontWeight: theme.typography.fontWeight.medium,
      borderRadius: theme.components.button.borderRadius,
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      opacity: disabled || loading ? 0.6 : 1,
      transition: theme.components.button.transition,
      width: fullWidth ? '100%' : 'auto',
      textDecoration: 'none',
      userSelect: 'none' as const,
      whiteSpace: 'nowrap' as const,
      ...variantStyles[variant],
      ...sizeStyles[size],
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={className}
        style={baseStyles}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin"
            style={{
              width: size === 'sm' ? '14px' : size === 'lg' ? '18px' : '16px',
              height: size === 'sm' ? '14px' : size === 'lg' ? '18px' : '16px',
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              style={{ opacity: 0.25 }}
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              style={{ opacity: 0.75 }}
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {!loading && leftIcon && <span style={{ display: 'flex' }}>{leftIcon}</span>}

        <span>{children}</span>

        {!loading && rightIcon && <span style={{ display: 'flex' }}>{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
