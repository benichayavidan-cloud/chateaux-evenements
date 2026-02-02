/**
 * SPACING TOKENS - Système d'espacement cohérent
 * Basé sur une échelle de 4px (0.25rem)
 */

export const spacing = {
  // === BASE SCALE (multiples de 4px) ===
  '0': '0',
  '1': '0.25rem',   // 4px
  '2': '0.5rem',    // 8px
  '3': '0.75rem',   // 12px
  '4': '1rem',      // 16px
  '5': '1.25rem',   // 20px
  '6': '1.5rem',    // 24px
  '8': '2rem',      // 32px
  '10': '2.5rem',   // 40px
  '12': '3rem',     // 48px
  '16': '4rem',     // 64px
  '20': '5rem',     // 80px
  '24': '6rem',     // 96px
  '32': '8rem',     // 128px
  '40': '10rem',    // 160px
  '48': '12rem',    // 192px
  '56': '14rem',    // 224px
  '64': '16rem',    // 256px

  // === SEMANTIC SPACING (noms parlants) ===
  xs: '0.5rem',     // 8px
  sm: '0.75rem',    // 12px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '2.5rem',  // 40px
  '3xl': '3rem',    // 48px
  '4xl': '4rem',    // 64px
  '5xl': '5rem',    // 80px
  '6xl': '6rem',    // 96px

  // === SECTION SPACING (responsive avec clamp) ===
  section: {
    xs: 'clamp(2rem, 4vw, 3rem)',      // 32px → 48px
    sm: 'clamp(3rem, 6vw, 4rem)',      // 48px → 64px
    md: 'clamp(4rem, 8vw, 6rem)',      // 64px → 96px
    lg: 'clamp(5rem, 10vw, 8rem)',     // 80px → 128px
    xl: 'clamp(6rem, 12vw, 10rem)',    // 96px → 160px
  },

  // === CONTAINER PADDING (responsive) ===
  container: {
    mobile: '1rem',              // 16px
    tablet: 'clamp(1.5rem, 3vw, 2rem)',    // 24px → 32px
    desktop: 'clamp(2rem, 4vw, 3rem)',     // 32px → 48px
  },
} as const;

export type Spacing = typeof spacing;
