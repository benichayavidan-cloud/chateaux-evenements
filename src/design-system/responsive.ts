/**
 * SYSTÈME DE TOKENS RESPONSIVE
 *
 * Principe : clamp(min, fluid, max)
 * - min = valeur mobile
 * - fluid = valeur qui scale avec viewport
 * - max = valeur desktop (ACTUELLE, ne change pas)
 *
 * Desktop (>1024px) = valeurs max (design actuel préservé)
 * Tablet (768-1024px) = valeurs intermédiaires
 * Mobile (<768px) = valeurs min
 */

export const responsive = {
  /**
   * TYPOGRAPHY - Tailles de texte responsive
   */
  text: {
    // Headings
    display: 'clamp(2rem, 5vw + 1rem, 4rem)',           // 32px → 64px (hero titles)
    h1: 'clamp(1.75rem, 4vw + 0.5rem, 3rem)',          // 28px → 48px
    h2: 'clamp(1.5rem, 3vw + 0.5rem, 2.25rem)',        // 24px → 36px
    h3: 'clamp(1.25rem, 2.5vw + 0.5rem, 1.875rem)',    // 20px → 30px
    h4: 'clamp(1.125rem, 2vw + 0.25rem, 1.5rem)',      // 18px → 24px
    h5: 'clamp(1rem, 1.5vw + 0.25rem, 1.25rem)',       // 16px → 20px

    // Body text
    bodyXl: 'clamp(1.125rem, 2vw, 1.25rem)',           // 18px → 20px
    bodyLg: 'clamp(1rem, 1.5vw, 1.125rem)',            // 16px → 18px
    body: 'clamp(0.9375rem, 1.2vw, 1rem)',             // 15px → 16px
    bodySm: 'clamp(0.875rem, 1vw, 0.9375rem)',         // 14px → 15px

    // Captions & labels
    caption: 'clamp(0.8125rem, 1vw, 0.875rem)',        // 13px → 14px
    label: 'clamp(0.75rem, 0.8vw, 0.8125rem)',         // 12px → 13px

    // Special
    hero: 'clamp(2.5rem, 6vw + 1rem, 4.5rem)',         // 40px → 72px (grand hero)
    stat: 'clamp(2rem, 4vw, 3rem)',                    // 32px → 48px (chiffres stats)
  },

  /**
   * SPACING - Espacements responsive
   */
  spacing: {
    // Sections
    sectionXl: 'clamp(3rem, 8vw, 6rem)',               // 48px → 96px
    sectionLg: 'clamp(2.5rem, 6vw, 5rem)',             // 40px → 80px
    section: 'clamp(2rem, 5vw, 3.75rem)',              // 32px → 60px
    sectionSm: 'clamp(1.5rem, 4vw, 2.5rem)',           // 24px → 40px

    // Containers
    containerXl: 'clamp(1.5rem, 4vw, 2.5rem)',         // 24px → 40px
    container: 'clamp(1rem, 3vw, 2rem)',               // 16px → 32px
    containerSm: 'clamp(0.75rem, 2vw, 1.5rem)',        // 12px → 24px

    // Gaps
    gapXl: 'clamp(2rem, 4vw, 3rem)',                   // 32px → 48px
    gapLg: 'clamp(1.5rem, 3vw, 2rem)',                 // 24px → 32px
    gap: 'clamp(1rem, 2vw, 1.5rem)',                   // 16px → 24px
    gapMd: 'clamp(0.75rem, 1.5vw, 1rem)',              // 12px → 16px
    gapSm: 'clamp(0.5rem, 1vw, 0.75rem)',              // 8px → 12px

    // Buttons & interactive
    button: 'clamp(0.875rem, 2vw, 1.125rem) clamp(1.5rem, 3vw, 2.5rem)', // padding Y X
    buttonLg: 'clamp(1rem, 2.5vw, 1.5rem) clamp(2rem, 4vw, 3rem)',       // large buttons
    buttonSm: 'clamp(0.625rem, 1.5vw, 0.875rem) clamp(1rem, 2vw, 1.5rem)', // small buttons

    // Cards
    card: 'clamp(1.25rem, 3vw, 2rem)',                 // 20px → 32px (card padding)
    cardLg: 'clamp(1.5rem, 3.5vw, 2.5rem)',            // 24px → 40px
  },

  /**
   * SIZES - Dimensions responsive
   */
  sizes: {
    // Touch targets (WCAG minimum 44px)
    touchMin: '44px',
    touchComfortable: '48px',

    // Headers
    headerDesktop: '96px',
    headerTablet: '72px',
    headerMobile: '64px',

    // Icons
    iconXl: 'clamp(2rem, 4vw, 3rem)',                  // 32px → 48px
    iconLg: 'clamp(1.5rem, 3vw, 2rem)',                // 24px → 32px
    icon: 'clamp(1.25rem, 2vw, 1.5rem)',               // 20px → 24px
    iconSm: 'clamp(1rem, 1.5vw, 1.25rem)',             // 16px → 20px

    // Images heights
    heroHeight: 'clamp(400px, 60vh, 600px)',
    cardHeight: 'clamp(250px, 35vw, 450px)',
    imageCard: 'clamp(200px, 30vw, 350px)',
  },

  /**
   * WIDTHS - Largeurs responsive
   */
  widths: {
    // Cards min-width
    cardMin: 'clamp(280px, 35vw, 450px)',
    cardMinSm: 'clamp(250px, 30vw, 350px)',

    // Containers max-width
    containerSm: '640px',
    container: '768px',
    containerMd: '1024px',
    containerLg: '1280px',
    containerXl: '1400px',
    containerFull: '100%',
  },

  /**
   * GRID - Configurations de grilles responsive
   */
  grid: {
    // Colonnes selon breakpoint
    cols1: 'grid-cols-1',
    cols2: 'grid-cols-1 md:grid-cols-2',
    cols3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    cols4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    cols6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',

    // Gaps responsive
    gapSm: 'gap-2 md:gap-3 lg:gap-4',      // 8px → 12px → 16px
    gap: 'gap-4 md:gap-6 lg:gap-8',        // 16px → 24px → 32px
    gapLg: 'gap-6 md:gap-8 lg:gap-12',     // 24px → 32px → 48px
  },

  /**
   * BREAKPOINTS - Points de rupture
   */
  breakpoints: {
    xs: '0px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    '2xl': '1400px',
    '3xl': '1920px',
  },

  /**
   * MEDIA QUERIES - Helpers
   */
  media: {
    mobile: '@media (max-width: 767px)',
    tablet: '@media (min-width: 768px) and (max-width: 1023px)',
    desktop: '@media (min-width: 1024px)',
    mobileOnly: '@media (max-width: 767px)',
    tabletUp: '@media (min-width: 768px)',
    desktopUp: '@media (min-width: 1024px)',
  },
};

/**
 * HELPER FUNCTIONS
 */

/**
 * Retourne une valeur responsive basée sur le breakpoint
 */
export function getResponsiveValue<T>(values: {
  mobile?: T;
  tablet?: T;
  desktop: T;
}): T {
  // En SSR ou par défaut, retourne desktop
  if (typeof window === 'undefined') return values.desktop;

  const width = window.innerWidth;

  if (width < 768 && values.mobile) return values.mobile;
  if (width < 1024 && values.tablet) return values.tablet;
  return values.desktop;
}

/**
 * Génère un clamp() personnalisé
 */
export function clamp(min: string, preferred: string, max: string): string {
  return `clamp(${min}, ${preferred}, ${max})`;
}

/**
 * Génère des colonnes de grille responsive
 */
export function gridCols(mobile: number, tablet: number, desktop: number): string {
  return `grid-cols-${mobile} md:grid-cols-${tablet} lg:grid-cols-${desktop}`;
}

/**
 * Padding responsive standard
 */
export const padding = {
  section: {
    mobile: '2rem 1rem',
    tablet: '3rem 2rem',
    desktop: '4rem 2.5rem',
  },
  container: {
    mobile: '1rem',
    tablet: '2rem',
    desktop: '2.5rem',
  },
  card: {
    mobile: '1.25rem',
    tablet: '1.5rem',
    desktop: '2rem',
  },
};

export default responsive;
