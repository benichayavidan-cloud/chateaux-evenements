/**
 * COLOR TOKENS - Système de couleurs professionnel
 * Toutes les couleurs du site centralisées ici
 */

export const colors = {
  // === COULEURS PRINCIPALES (Brand) ===
  primary: {
    bronze: '#A37E2C',
    bronzeDark: '#8B6A24',
    bronzeLight: '#C4A053',
    gold: '#D4AF37',
  },

  // === COULEURS NEUTRES ===
  neutral: {
    white: '#FFFFFF',
    black: '#000000',
    gray50: '#FAFAFA',
    gray100: '#F5F5F5',
    gray200: '#E5E5E5',
    gray300: '#D4D4D4',
    gray400: '#A3A3A3',
    gray500: '#737373',
    gray600: '#525252',
    gray700: '#404040',
    gray800: '#262626',
    gray900: '#171717',
  },

  // === COULEURS SÉMANTIQUES ===
  semantic: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },

  // === OVERLAYS ===
  overlay: {
    black10: 'rgba(0, 0, 0, 0.1)',
    black20: 'rgba(0, 0, 0, 0.2)',
    black30: 'rgba(0, 0, 0, 0.3)',
    black50: 'rgba(0, 0, 0, 0.5)',
    black80: 'rgba(0, 0, 0, 0.8)',
    white10: 'rgba(255, 255, 255, 0.1)',
    white20: 'rgba(255, 255, 255, 0.2)',
    white30: 'rgba(255, 255, 255, 0.3)',
    white50: 'rgba(255, 255, 255, 0.5)',
    white80: 'rgba(255, 255, 255, 0.8)',
    white90: 'rgba(255, 255, 255, 0.9)',
  },
} as const;

export type Color = typeof colors;
