/**
 * EFFECTS TOKENS - Ombres, bordures, animations
 */

export const effects = {
  // === SHADOWS (niveaux d'élévation) ===
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',

    // Shadows spéciales
    glow: '0 0 20px rgba(163, 126, 44, 0.3)',
    glowStrong: '0 0 30px rgba(163, 126, 44, 0.5)',
  },

  // === BORDER RADIUS ===
  borderRadius: {
    none: '0',
    sm: '0.125rem',    // 2px
    base: '0.25rem',   // 4px
    md: '0.375rem',    // 6px
    lg: '0.5rem',      // 8px
    xl: '0.75rem',     // 12px
    '2xl': '1rem',     // 16px
    '3xl': '1.5rem',   // 24px
    full: '9999px',    // Circle
  },

  // === BORDER WIDTH ===
  borderWidth: {
    none: '0',
    thin: '1px',
    base: '2px',
    thick: '4px',
  },

  // === TRANSITIONS (durées) ===
  transitions: {
    instant: '0s',
    fast: '150ms',
    base: '200ms',
    smooth: '300ms',
    slow: '500ms',
    slower: '700ms',
    ultra: '1000ms',
  },

  // === EASINGS ===
  easings: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
  },

  // === ANIMATIONS PRÉDÉFINIES ===
  animations: {
    fadeIn: {
      duration: '300ms',
      easing: 'cubic-bezier(0, 0, 0.2, 1)',
      keyframes: {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
    },
    fadeOut: {
      duration: '300ms',
      easing: 'cubic-bezier(0.4, 0, 1, 1)',
      keyframes: {
        from: { opacity: 1 },
        to: { opacity: 0 },
      },
    },
    slideUp: {
      duration: '300ms',
      easing: 'cubic-bezier(0, 0, 0.2, 1)',
      keyframes: {
        from: { transform: 'translateY(20px)', opacity: 0 },
        to: { transform: 'translateY(0)', opacity: 1 },
      },
    },
    slideDown: {
      duration: '300ms',
      easing: 'cubic-bezier(0, 0, 0.2, 1)',
      keyframes: {
        from: { transform: 'translateY(-20px)', opacity: 0 },
        to: { transform: 'translateY(0)', opacity: 1 },
      },
    },
    scaleIn: {
      duration: '300ms',
      easing: 'cubic-bezier(0, 0, 0.2, 1)',
      keyframes: {
        from: { transform: 'scale(0.95)', opacity: 0 },
        to: { transform: 'scale(1)', opacity: 1 },
      },
    },
  },

  // === BLUR ===
  blur: {
    none: '0',
    sm: '4px',
    base: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '40px',
    '3xl': '64px',
  },

  // === Z-INDEX (hiérarchie d'empilement) ===
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
} as const;

export type Effects = typeof effects;
