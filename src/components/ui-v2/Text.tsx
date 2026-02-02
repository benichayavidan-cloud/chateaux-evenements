/**
 * TEXT COMPONENT - Typography professionnel
 * Composant texte réutilisable avec toutes les variantes typographiques
 */

import { HTMLAttributes, ElementType, forwardRef } from 'react';
import { theme } from '@/design-system/tokens';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /** Variante typographique */
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'bodyLarge'
    | 'body'
    | 'bodySmall'
    | 'label'
    | 'caption';

  /** Élément HTML à rendre */
  as?: ElementType;

  /** Couleur du texte */
  color?: 'primary' | 'secondary' | 'muted' | 'bronze' | 'white' | 'black';

  /** Alignement du texte */
  align?: 'left' | 'center' | 'right' | 'justify';

  /** Poids de la police (override) */
  weight?: 300 | 400 | 500 | 600 | 700;

  /** Italique */
  italic?: boolean;

  /** Texte tronqué avec ellipsis */
  truncate?: boolean;

  /** Nombre maximum de lignes (line-clamp) */
  lineClamp?: number;

  /** Enfants */
  children: React.ReactNode;
}

/**
 * Composant Text avec variants typographiques
 *
 * @example
 * ```tsx
 * <Text variant="h1" color="bronze">
 *   Titre principal
 * </Text>
 *
 * <Text variant="body" color="muted">
 *   Paragraphe de texte
 * </Text>
 * ```
 */
export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      variant = 'body',
      as,
      color = 'primary',
      align = 'left',
      weight,
      italic = false,
      truncate = false,
      lineClamp,
      className = '',
      style = {},
      children,
      ...props
    },
    ref
  ) => {
    // === MAP VARIANT → ÉLÉMENT HTML ===
    const defaultElement: Record<string, ElementType> = {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      bodyLarge: 'p',
      body: 'p',
      bodySmall: 'p',
      label: 'span',
      caption: 'span',
    };

    const Component = as || defaultElement[variant];

    // === COULEURS ===
    const colorMap = {
      primary: theme.colors.neutral.gray900,
      secondary: theme.colors.neutral.gray700,
      muted: theme.colors.neutral.gray600,
      bronze: theme.colors.primary.bronze,
      white: theme.colors.neutral.white,
      black: theme.colors.neutral.black,
    };

    // === STYLES PAR VARIANT ===
    const variantStyles = theme.typography.textStyles[variant as keyof typeof theme.typography.textStyles] || {};

    // === STYLES DE BASE ===
    const baseStyles = {
      ...variantStyles,
      color: colorMap[color],
      textAlign: align,
      fontWeight: weight || variantStyles.fontWeight,
      fontStyle: italic ? 'italic' : ((variantStyles as any).fontStyle || 'normal'),
      margin: 0,
      padding: 0,
    };

    // === TRUNCATE ===
    if (truncate) {
      Object.assign(baseStyles, {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap' as const,
      });
    }

    // === LINE CLAMP ===
    if (lineClamp) {
      Object.assign(baseStyles, {
        display: '-webkit-box',
        WebkitLineClamp: lineClamp,
        WebkitBoxOrient: 'vertical' as const,
        overflow: 'hidden',
      });
    }

    return (
      <Component
        ref={ref}
        className={className}
        style={{ ...baseStyles, ...style }}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';
