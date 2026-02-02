/**
 * THEME - Système de design complet
 * Combine tous les tokens en un seul objet
 */

import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';
import { breakpoints } from './breakpoints';
import { effects } from './effects';

export const theme = {
  colors,
  spacing,
  typography,
  breakpoints,
  effects,

  // === COMPOSANTS SPÉCIFIQUES ===
  components: {
    button: {
      padding: {
        sm: `${spacing.sm} ${spacing.lg}`,     // 12px 24px
        md: `${spacing.md} ${spacing.xl}`,     // 16px 32px
        lg: `${spacing.lg} ${spacing['2xl']}`, // 24px 40px
      },
      fontSize: {
        sm: typography.fontSize.sm,
        md: typography.fontSize.base,
        lg: typography.fontSize.lg,
      },
      borderRadius: effects.borderRadius.full,
      transition: `all ${effects.transitions.smooth} ${effects.easings.smooth}`,
    },

    card: {
      padding: {
        sm: spacing.md,      // 16px
        md: spacing.lg,      // 24px
        lg: spacing.xl,      // 32px
      },
      borderRadius: effects.borderRadius.xl,
      shadow: effects.shadows.md,
      hoverShadow: effects.shadows.xl,
      transition: `all ${effects.transitions.smooth} ${effects.easings.smooth}`,
    },

    input: {
      padding: spacing.md,
      borderRadius: effects.borderRadius.md,
      borderWidth: effects.borderWidth.thin,
      fontSize: typography.fontSize.base,
      transition: `all ${effects.transitions.base} ${effects.easings.smooth}`,
    },

    container: {
      maxWidth: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      padding: spacing.container,
    },
  },

  // === GRADIENTS PRÉDÉFINIS ===
  gradients: {
    primary: `linear-gradient(135deg, ${colors.primary.bronze} 0%, ${colors.primary.bronzeDark} 100%)`,
    overlay: `linear-gradient(180deg, ${colors.overlay.black10} 0%, ${colors.overlay.black50} 100%)`,
    overlayBottom: `linear-gradient(to bottom, transparent 0%, ${colors.overlay.black80} 100%)`,
    shimmer: `linear-gradient(90deg, transparent, ${colors.overlay.white20}, transparent)`,
  },
} as const;

export type Theme = typeof theme;
