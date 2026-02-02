/**
 * CONTAINER COMPONENT - Wrapper responsive
 * Composant container avec max-width responsive
 */

import { HTMLAttributes, forwardRef } from 'react';
import { theme } from '@/design-system/tokens';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Taille du container */
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'fluid';

  /** Padding responsive */
  padding?: boolean;

  /** Centrer le contenu */
  center?: boolean;

  /** Enfants */
  children: React.ReactNode;
}

/**
 * Composant Container pour wrapper le contenu
 *
 * @example
 * ```tsx
 * <Container size="lg">
 *   <Text variant="h1">Contenu centré</Text>
 * </Container>
 * ```
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      size = 'xl',
      padding = true,
      center = true,
      className = '',
      style = {},
      children,
      ...props
    },
    ref
  ) => {
    // === MAX-WIDTH PAR TAILLE ===
    const maxWidths = {
      sm: theme.components.container.maxWidth.sm,    // 640px
      md: theme.components.container.maxWidth.md,    // 768px
      lg: theme.components.container.maxWidth.lg,    // 1024px
      xl: theme.components.container.maxWidth.xl,    // 1280px
      '2xl': theme.components.container.maxWidth['2xl'], // 1536px
      fluid: '100%',
    };

    // === STYLES DE BASE ===
    const baseStyles = {
      width: '100%',
      maxWidth: maxWidths[size],
      marginLeft: center ? 'auto' : undefined,
      marginRight: center ? 'auto' : undefined,
      paddingLeft: padding ? theme.components.container.padding.mobile : undefined,
      paddingRight: padding ? theme.components.container.padding.mobile : undefined,
    };

    return (
      <div
        ref={ref}
        className={`container-${size} ${className}`}
        style={{ ...baseStyles, ...style }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';
