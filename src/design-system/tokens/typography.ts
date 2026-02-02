/**
 * TYPOGRAPHY TOKENS - Système typographique professionnel
 * Responsive fluid typography avec clamp()
 */

export const typography = {
  // === FONT FAMILIES ===
  fonts: {
    heading: "'Playfair Display', 'Georgia', serif",
    body: "'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', sans-serif",
    mono: "'Fira Code', 'Consolas', monospace",
  },

  // === FONT SIZES (Responsive avec clamp) ===
  fontSize: {
    // Textes
    xs: 'clamp(0.75rem, 1.5vw, 0.8125rem)',       // 12px → 13px
    sm: 'clamp(0.875rem, 1.8vw, 0.9375rem)',      // 14px → 15px
    base: 'clamp(1rem, 2vw, 1.0625rem)',          // 16px → 17px
    lg: 'clamp(1.125rem, 2.2vw, 1.25rem)',        // 18px → 20px
    xl: 'clamp(1.25rem, 2.5vw, 1.5rem)',          // 20px → 24px

    // Headings
    h6: 'clamp(1rem, 2vw, 1.125rem)',             // 16px → 18px
    h5: 'clamp(1.125rem, 2.5vw, 1.25rem)',        // 18px → 20px
    h4: 'clamp(1.25rem, 3vw, 1.5rem)',            // 20px → 24px
    h3: 'clamp(1.5rem, 4vw, 2rem)',               // 24px → 32px
    h2: 'clamp(2rem, 5vw, 3rem)',                 // 32px → 48px
    h1: 'clamp(2.5rem, 6vw, 4rem)',               // 40px → 64px

    // Display (très grands titres)
    display: {
      sm: 'clamp(3rem, 7vw, 4.5rem)',             // 48px → 72px
      md: 'clamp(3.5rem, 8vw, 5.5rem)',           // 56px → 88px
      lg: 'clamp(4rem, 10vw, 7rem)',              // 64px → 112px
      xl: 'clamp(4.5rem, 12vw, 9rem)',            // 72px → 144px
    },
  },

  // === FONT WEIGHTS ===
  fontWeight: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  // === LINE HEIGHTS ===
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },

  // === LETTER SPACING ===
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  // === TEXT STYLES PRÉDEFINIS ===
  textStyles: {
    // Headings
    h1: {
      fontSize: 'clamp(2.5rem, 6vw, 4rem)',
      fontWeight: 300,
      lineHeight: '1.2',
      fontStyle: 'italic',
      letterSpacing: '-0.025em',
    },
    h2: {
      fontSize: 'clamp(2rem, 5vw, 3rem)',
      fontWeight: 300,
      lineHeight: '1.25',
      fontStyle: 'italic',
      letterSpacing: '-0.025em',
    },
    h3: {
      fontSize: 'clamp(1.5rem, 4vw, 2rem)',
      fontWeight: 400,
      lineHeight: '1.3',
      letterSpacing: '-0.025em',
    },

    // Body
    bodyLarge: {
      fontSize: 'clamp(1.125rem, 2.2vw, 1.25rem)',
      fontWeight: 400,
      lineHeight: '1.625',
      letterSpacing: '0',
    },
    body: {
      fontSize: 'clamp(1rem, 2vw, 1.0625rem)',
      fontWeight: 400,
      lineHeight: '1.5',
      letterSpacing: '0',
    },
    bodySmall: {
      fontSize: 'clamp(0.875rem, 1.8vw, 0.9375rem)',
      fontWeight: 400,
      lineHeight: '1.5',
      letterSpacing: '0',
    },

    // Labels
    label: {
      fontSize: 'clamp(0.8125rem, 2vw, 0.875rem)',
      fontWeight: 600,
      lineHeight: '1.5',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
    },

    // Caption
    caption: {
      fontSize: 'clamp(0.75rem, 1.5vw, 0.8125rem)',
      fontWeight: 400,
      lineHeight: '1.5',
      letterSpacing: '0',
    },
  },
} as const;

export type Typography = typeof typography;
