/**
 * 🛠️ Theme Helpers - Utilitaires pour le système de design
 *
 * Fonctions helpers pour faciliter l'utilisation des tokens
 */

import { theme } from "./theme";

/**
 * Récupère une couleur du thème
 * @example getColor("primary", "bronze") => "#A37E2C"
 */
export function getColor(category: keyof typeof theme.colors, key: string): string {
  const colorCategory = theme.colors[category] as any;
  return colorCategory[key] || "";
}

/**
 * Récupère un espacement du thème
 * @example getSpacing("xl") => "20px"
 */
export function getSpacing(key: keyof typeof theme.spacing): string {
  return theme.spacing[key] as string;
}

/**
 * Récupère une shadow du thème
 * @example getShadow("glow") => "0 0 40px rgba(163, 126, 44, 0.3)"
 */
export function getShadow(key: keyof typeof theme.effects.shadows): string {
  return theme.effects.shadows[key];
}

/**
 * Récupère un border radius du thème
 * @example getBorderRadius("2xl") => "1.5rem"
 */
export function getBorderRadius(key: keyof typeof theme.effects.borderRadius): string {
  return theme.effects.borderRadius[key];
}

/**
 * Récupère une transition du thème
 * @example getTransition("smooth") => "0.3s cubic-bezier(0.4, 0, 0.2, 1)"
 */
export function getTransition(key: keyof typeof theme.effects.transitions): string {
  return theme.effects.transitions[key];
}

/**
 * Crée un style inline complet à partir des tokens
 */
export const styleBuilder = {
  /**
   * Style de bouton primaire
   */
  buttonPrimary: (size: "sm" | "md" | "lg" = "md") => ({
    padding: theme.components.button.padding[size],
    height: theme.components.button.height[size],
    backgroundColor: theme.colors.primary.bronze,
    color: theme.colors.neutral.white,
    borderRadius: theme.effects.borderRadius.full,
    border: "2px solid transparent",
    fontWeight: theme.typography.fontWeight.bold,
    transition: theme.effects.transitions.smooth,
    filter: "drop-shadow(0 8px 16px rgba(163, 126, 44, 0.4))",
    textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
  }),

  /**
   * Style de bouton secondaire
   */
  buttonSecondary: (size: "sm" | "md" | "lg" = "md") => ({
    padding: theme.components.button.padding[size],
    height: theme.components.button.height[size],
    backgroundColor: theme.colors.overlay.white95,
    color: theme.colors.text.primary,
    borderRadius: theme.effects.borderRadius.full,
    border: "2px solid rgba(255, 255, 255, 0.5)",
    fontWeight: theme.typography.fontWeight.bold,
    transition: theme.effects.transitions.smooth,
    filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2))",
    boxShadow: theme.effects.shadows.lg,
  }),

  /**
   * Style de badge
   */
  badge: (size: "sm" | "md" | "lg" = "md") => ({
    padding: theme.components.badge.padding[size],
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.medium,
    textTransform: "uppercase" as const,
    letterSpacing: theme.typography.letterSpacing.wider,
    borderRadius: theme.effects.borderRadius.full,
  }),

  /**
   * Style de carte
   */
  card: (padding: "sm" | "md" | "lg" = "md") => ({
    padding: theme.components.card.padding[padding],
    borderRadius: theme.effects.borderRadius["2xl"],
    border: `1px solid ${theme.colors.neutral.gray200}`,
    backgroundColor: theme.colors.neutral.white,
    boxShadow: theme.effects.shadows.sm,
  }),

  /**
   * Style de section
   */
  section: (padding: "sm" | "md" | "lg" = "md") => ({
    padding: `${theme.spacing.section[padding]} 0`,
    width: "100%",
  }),

  /**
   * Style de container
   */
  container: {
    width: "100%",
    maxWidth: theme.dimensions.maxWidth.content,
    margin: "0 auto",
    padding: `0 ${theme.spacing.container}`,
  },
};

/**
 * Classes CSS utilitaires pré-construites
 */
export const cssClasses = {
  // Texte gradient bronze
  textGradientBronze: "text-gradient-bronze animate-shimmer",

  // Glass morphism
  glassPremium: "glass-premium",

  // Grayscale hover
  grayscaleHover: "grayscale-hover",

  // Animations
  animateReveal: "animate-reveal",
  animateGlow: "animate-glow",
  animateShimmer: "animate-shimmer",
};

/**
 * Raccourcis pour les couleurs les plus utilisées
 */
export const colors = {
  bronze: theme.colors.primary.bronze,
  bronzeLight: theme.colors.primary.bronzeLight,
  bronzeDark: theme.colors.primary.bronzeDark,
  gold: theme.colors.primary.gold,
  darkGold: theme.colors.primary.darkGold,
  black: theme.colors.primary.black,
  white: theme.colors.neutral.white,
};

/**
 * Raccourcis pour les espacements les plus utilisés
 */
export const spacing = {
  xs: theme.spacing.xs,
  sm: theme.spacing.sm,
  md: theme.spacing.md,
  lg: theme.spacing.lg,
  xl: theme.spacing.xl,
  "2xl": theme.spacing["2xl"],
  "3xl": theme.spacing["3xl"],
  "4xl": theme.spacing["4xl"],
  "5xl": theme.spacing["5xl"],
  "6xl": theme.spacing["6xl"],
  "7xl": theme.spacing["7xl"],
  "8xl": theme.spacing["8xl"],
};
