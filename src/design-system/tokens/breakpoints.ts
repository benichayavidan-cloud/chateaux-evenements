/**
 * BREAKPOINTS - Système responsive standardisé
 * Compatible Bootstrap 5 + noms parlants
 */

export const breakpoints = {
  // === VALEURS EN PIXELS ===
  values: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    '2xl': 1400,
    '3xl': 1920,
  },

  // === MEDIA QUERIES (min-width) ===
  up: {
    xs: '@media (min-width: 0px)',
    sm: '@media (min-width: 576px)',
    md: '@media (min-width: 768px)',
    lg: '@media (min-width: 992px)',
    xl: '@media (min-width: 1200px)',
    '2xl': '@media (min-width: 1400px)',
    '3xl': '@media (min-width: 1920px)',
  },

  // === MEDIA QUERIES (max-width) ===
  down: {
    xs: '@media (max-width: 575px)',
    sm: '@media (max-width: 767px)',
    md: '@media (max-width: 991px)',
    lg: '@media (max-width: 1199px)',
    xl: '@media (max-width: 1399px)',
    '2xl': '@media (max-width: 1919px)',
  },

  // === MEDIA QUERIES (between) ===
  between: {
    smMd: '@media (min-width: 576px) and (max-width: 767px)',
    mdLg: '@media (min-width: 768px) and (max-width: 991px)',
    lgXl: '@media (min-width: 992px) and (max-width: 1199px)',
    xl2xl: '@media (min-width: 1200px) and (max-width: 1399px)',
  },

  // === DEVICE TYPES (pour clarté) ===
  device: {
    mobile: '@media (max-width: 767px)',
    tablet: '@media (min-width: 768px) and (max-width: 991px)',
    desktop: '@media (min-width: 992px)',
    widescreen: '@media (min-width: 1400px)',
  },

  // === ORIENTATION ===
  orientation: {
    portrait: '@media (orientation: portrait)',
    landscape: '@media (orientation: landscape)',
  },
} as const;

// Helper pour utiliser dans JS
export const isMobile = (width: number) => width < 768;
export const isTablet = (width: number) => width >= 768 && width < 992;
export const isDesktop = (width: number) => width >= 992;

export type Breakpoints = typeof breakpoints;
