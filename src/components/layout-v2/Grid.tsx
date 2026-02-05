/**
 * GRID COMPONENTS - Système de grid Tailwind-compatible
 * Composants Row et Col remplacent Bootstrap grid par flexbox natif
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
    const gapMap = {
      none: '0',
      sm: theme.spacing.sm,
      md: theme.spacing.md,
      lg: theme.spacing.lg,
      xl: theme.spacing.xl,
    };

    const justifyMap: Record<string, string> = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      between: 'space-between',
      around: 'space-around',
    };

    const baseStyles: React.CSSProperties = {
      display: 'flex',
      flexWrap: 'wrap',
      marginLeft: '-12px',
      marginRight: '-12px',
      rowGap: gapMap[gap],
      alignItems: align,
      justifyContent: justify ? justifyMap[justify] : undefined,
    };

    return (
      <div
        ref={ref}
        className={className}
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
  /** Colonnes sur mobile (xs) - sur 12 */
  xs?: number | 'auto';
  /** Colonnes sur mobile large (sm) - sur 12 */
  sm?: number | 'auto';
  /** Colonnes sur tablette (md) - sur 12 */
  md?: number | 'auto';
  /** Colonnes sur desktop (lg) - sur 12 */
  lg?: number | 'auto';
  /** Colonnes sur desktop large (xl) - sur 12 */
  xl?: number | 'auto';
  /** Colonnes sur widescreen (xxl) - sur 12 */
  xxl?: number | 'auto';
  /** Enfants */
  children: React.ReactNode;
}

/**
 * Convert col number (1-12) to a percentage width, or 'auto'.
 */
function colWidth(n: number | 'auto'): string {
  if (n === 'auto') return 'auto';
  return `${(n / 12) * 100}%`;
}

/**
 * Col component that mimics Bootstrap's 12-column grid using inline styles + media queries via CSS class.
 * Uses the largest breakpoint provided as the inline style, and renders a <style> tag for responsive overrides.
 */
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
    // Determine width for each breakpoint
    // Default: full width (col-12)
    const xsWidth = xs ? colWidth(xs) : '100%';

    // Build responsive class names using Tailwind-like approach
    // We use inline styles with CSS custom properties for responsive behavior
    const baseWidth = xxl ? colWidth(xxl) : xl ? colWidth(xl) : lg ? colWidth(lg) : md ? colWidth(md) : sm ? colWidth(sm) : xsWidth;

    // Generate a unique-ish ID for scoped styles
    const breakpoints: { query: string; width: string }[] = [];

    if (sm && sm !== xs) {
      breakpoints.push({ query: '(min-width: 576px)', width: colWidth(sm) });
    }
    if (md) {
      breakpoints.push({ query: '(min-width: 768px)', width: colWidth(md) });
    }
    if (lg) {
      breakpoints.push({ query: '(min-width: 992px)', width: colWidth(lg) });
    }
    if (xl) {
      breakpoints.push({ query: '(min-width: 1200px)', width: colWidth(xl) });
    }
    if (xxl) {
      breakpoints.push({ query: '(min-width: 1400px)', width: colWidth(xxl) });
    }

    const colStyle: React.CSSProperties = {
      paddingLeft: '12px',
      paddingRight: '12px',
      flex: '0 0 auto',
      width: xsWidth,
      maxWidth: '100%',
      boxSizing: 'border-box' as const,
      ...style,
    };

    // If we have responsive breakpoints, use CSS custom properties
    if (breakpoints.length > 0) {
      // Use Tailwind utility classes for responsive widths
      const twClasses: string[] = [];

      // Map col sizes to Tailwind width classes
      const colToTw = (n: number | 'auto'): string => {
        if (n === 'auto') return 'w-auto';
        switch (n) {
          case 12: return 'w-full';
          case 6: return 'w-1/2';
          case 4: return 'w-1/3';
          case 3: return 'w-1/4';
          case 8: return 'w-2/3';
          case 9: return 'w-3/4';
          default: return `w-[${colWidth(n)}]`;
        }
      };

      // xs (default)
      if (xs) twClasses.push(colToTw(xs));
      else twClasses.push('w-full');

      // sm
      if (sm) twClasses.push(`sm:${colToTw(sm)}`);
      // md
      if (md) twClasses.push(`md:${colToTw(md)}`);
      // lg
      if (lg) twClasses.push(`lg:${colToTw(lg)}`);
      // xl
      if (xl) twClasses.push(`xl:${colToTw(xl)}`);

      return (
        <div
          ref={ref}
          className={`${twClasses.join(' ')} ${className}`}
          style={{
            paddingLeft: '12px',
            paddingRight: '12px',
            boxSizing: 'border-box' as const,
            ...style,
          }}
          {...props}
        >
          {children}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={className}
        style={colStyle}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Col.displayName = 'Col';
