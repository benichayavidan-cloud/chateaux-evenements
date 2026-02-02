/**
 * GRID COMPONENTS - Système de grid Bootstrap wrapper
 * Composants Row et Col pour faciliter l'utilisation du grid
 */

import { HTMLAttributes, forwardRef } from 'react';
import { theme } from '@/design-system/tokens';

// ============================================
// ROW COMPONENT
// ============================================

export interface RowProps extends HTMLAttributes<HTMLDivElement> {
  /** Gap entre les colonnes */
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';

  /** Alignement vertical */
  align?: 'start' | 'center' | 'end' | 'stretch';

  /** Justification horizontale */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';

  /** Enfants */
  children: React.ReactNode;
}

export const Row = forwardRef<HTMLDivElement, RowProps>(
  (
    {
      gap = 'md',
      align,
      justify,
      className = '',
      style = {},
      children,
      ...props
    },
    ref
  ) => {
    // === GAP MAPPING ===
    const gapMap = {
      none: '0',
      sm: theme.spacing.sm,
      md: theme.spacing.md,
      lg: theme.spacing.lg,
      xl: theme.spacing.xl,
    };

    // === STYLES DE BASE ===
    const baseStyles = {
      rowGap: gapMap[gap],
      alignItems: align,
      justifyContent: justify,
    };

    return (
      <div
        ref={ref}
        className={`row ${className}`}
        style={{ ...baseStyles, ...style }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Row.displayName = 'Row';

// ============================================
// COL COMPONENT
// ============================================

export interface ColProps extends HTMLAttributes<HTMLDivElement> {
  /** Colonnes sur mobile (xs) */
  xs?: number | 'auto';

  /** Colonnes sur mobile large (sm) */
  sm?: number | 'auto';

  /** Colonnes sur tablette (md) */
  md?: number | 'auto';

  /** Colonnes sur desktop (lg) */
  lg?: number | 'auto';

  /** Colonnes sur desktop large (xl) */
  xl?: number | 'auto';

  /** Colonnes sur widescreen (xxl) */
  xxl?: number | 'auto';

  /** Enfants */
  children: React.ReactNode;
}

export const Col = forwardRef<HTMLDivElement, ColProps>(
  (
    {
      xs,
      sm,
      md,
      lg,
      xl,
      xxl,
      className = '',
      style = {},
      children,
      ...props
    },
    ref
  ) => {
    // === CONSTRUIRE LES CLASSES BOOTSTRAP ===
    const colClasses = [
      xs && (xs === 'auto' ? 'col-auto' : `col-${xs}`),
      sm && (sm === 'auto' ? 'col-sm-auto' : `col-sm-${sm}`),
      md && (md === 'auto' ? 'col-md-auto' : `col-md-${md}`),
      lg && (lg === 'auto' ? 'col-lg-auto' : `col-lg-${lg}`),
      xl && (xl === 'auto' ? 'col-xl-auto' : `col-xl-${xl}`),
      xxl && (xxl === 'auto' ? 'col-xxl-auto' : `col-xxl-${xxl}`),
    ].filter(Boolean).join(' ');

    // Par défaut, col-12 si aucune taille spécifiée
    const finalClasses = colClasses || 'col-12';

    return (
      <div
        ref={ref}
        className={`${finalClasses} ${className}`}
        style={style}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Col.displayName = 'Col';
