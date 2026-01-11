/**
 * 🎨 SYSTÈME DE DESIGN TOKENS - Châteaux Prestige
 *
 * Ce fichier centralise TOUTES les variables visuelles du site.
 * Modifiez ici pour changer l'apparence globale.
 *
 * @version 2.0.0
 * @author Claude Code
 */

// ============================================
// 🎨 PALETTE DE COULEURS
// ============================================

export const colors = {
  // Couleurs principales
  primary: {
    black: "#050505",        // Noir absolu
    bronze: "#A37E2C",       // Bronze antique
    bronzeLight: "#C09448",  // Bronze clair
    bronzeDark: "#8A6823",   // Bronze foncé
    gold: "#B8860B",         // Or (accent principal)
    darkGold: "#8B6914",     // Or foncé
  },

  // Couleurs neutres
  neutral: {
    white: "#FFFFFF",
    gray50: "#F8FAFC",
    gray100: "#F1F5F9",
    gray200: "#E2E8F0",
    gray300: "#CBD5E1",
    gray400: "#94A3B8",
    gray600: "#475569",
    gray700: "#334155",
    gray800: "#1E293B",
    gray900: "#0F172A",
  },

  // Couleurs de texte
  text: {
    primary: "#000000",
    secondary: "#1a1a1a",
    tertiary: "#2C1810",
    muted: "#4a4a4a",
    light: "#6b7280",
  },

  // Overlays et transparences
  overlay: {
    white5: "rgba(255, 255, 255, 0.05)",
    white10: "rgba(255, 255, 255, 0.1)",
    white20: "rgba(255, 255, 255, 0.2)",
    white30: "rgba(255, 255, 255, 0.3)",
    white60: "rgba(255, 255, 255, 0.6)",
    white70: "rgba(255, 255, 255, 0.7)",
    white80: "rgba(255, 255, 255, 0.8)",
    white90: "rgba(255, 255, 255, 0.9)",
    white95: "rgba(255, 255, 255, 0.95)",
    black5: "rgba(5, 5, 5, 0.05)",
    black10: "rgba(5, 5, 5, 0.1)",
    black20: "rgba(5, 5, 5, 0.2)",
    black80: "rgba(5, 5, 5, 0.8)",
    black90: "rgba(5, 5, 5, 0.9)",
  },
} as const;

// ============================================
// 📏 SPACING (Échelle harmonique base 4px)
// ============================================

export const spacing = {
  // Micro spacing (4-16px)
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",

  // Standard spacing (20-40px)
  xl: "20px",
  "2xl": "24px",
  "3xl": "32px",
  "4xl": "40px",

  // Large spacing (48-100px)
  "5xl": "48px",
  "6xl": "64px",
  "7xl": "80px",
  "8xl": "100px",

  // Section padding
  section: {
    sm: "30px",
    md: "60px",
    lg: "100px",
  },

  // Container padding
  container: "40px",
} as const;

// ============================================
// 🔤 TYPOGRAPHIE
// ============================================

export const typography = {
  // Familles de polices
  fonts: {
    heading: "var(--font-cormorant), serif",
    body: "var(--font-inter), system-ui, sans-serif",
  },

  // Tailles de texte
  fontSize: {
    xs: "0.75rem",    // 12px
    sm: "0.875rem",   // 14px
    base: "1rem",     // 16px
    lg: "1.125rem",   // 18px
    xl: "1.25rem",    // 20px
    "2xl": "1.5rem",  // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem",    // 48px
    "6xl": "3.75rem", // 60px
    "7xl": "4.5rem",  // 72px
  },

  // Poids de police
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Hauteurs de ligne
  lineHeight: {
    none: 1,
    tight: 1.2,
    snug: 1.375,
    normal: 1.6,
    relaxed: 1.75,
  },

  // Espacement des lettres
  letterSpacing: {
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.2em",
    ultra: "0.3em",
  },
} as const;

// ============================================
// 🎭 EFFETS & ANIMATIONS
// ============================================

export const effects = {
  // Ombres
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    glow: "0 0 40px rgba(163, 126, 44, 0.3)",
    glowSoft: "0 0 20px rgba(163, 126, 44, 0.2)",
    deep: "0 20px 60px rgba(0, 0, 0, 0.5)",
    subtle: "0 2px 20px rgba(0, 0, 0, 0.2)",
    dropdown: "0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 0 15px rgba(184, 134, 11, 0.08)",
  },

  // Bordures arrondies
  borderRadius: {
    none: "0",
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.5rem",
    full: "9999px",
  },

  // Transitions
  transitions: {
    fast: "0.15s cubic-bezier(0.4, 0, 0.2, 1)",
    base: "0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    smooth: "0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "0.5s cubic-bezier(0.4, 0, 0.2, 1)",
    slower: "0.6s cubic-bezier(0.4, 0, 0.2, 1)",
    ultra: "0.8s cubic-bezier(0.4, 0, 0.2, 1)",
    easeOut: "0.6s ease-out",
  },

  // Durées d'animation
  durations: {
    "100": "100ms",
    "200": "200ms",
    "300": "300ms",
    "500": "500ms",
    "800": "800ms",
  },

  // Backdrop blur
  blur: {
    none: "0",
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
  },
} as const;

// ============================================
// 📐 DIMENSIONS
// ============================================

export const dimensions = {
  // Largeurs maximales
  maxWidth: {
    sm: "600px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1440px",
    content: "1280px",
    full: "100%",
  },

  // Hauteurs
  height: {
    imageCard: "500px",
    imageCardLg: "28rem",  // 448px
    heroMin: "100vh",
    icon: {
      sm: "16px",
      md: "24px",
      lg: "90px",
    },
    button: {
      md: "48px",
      lg: "56px",
    },
  },

  // Gaps (espacement entre éléments flex/grid)
  gap: {
    xs: "4px",
    sm: "12px",
    md: "16px",
    lg: "20px",
    xl: "24px",
    "2xl": "32px",
    "3xl": "40px",
  },
} as const;

// ============================================
// 🔘 COMPOSANTS
// ============================================

export const components = {
  // Boutons
  button: {
    padding: {
      sm: "16px",
      md: "20px",
      lg: "24px",
    },
    height: {
      sm: "40px",
      md: "48px",
      lg: "56px",
    },
  },

  // Badges
  badge: {
    padding: {
      sm: "12px",
      md: "16px",
      lg: "20px",
    },
  },

  // Cartes
  card: {
    padding: {
      sm: "16px",
      md: "24px",
      lg: "32px",
    },
  },

  // Navigation
  navigation: {
    height: "64px",
    gap: "2.5rem",
  },
} as const;

// ============================================
// 🎨 GRADIENTS
// ============================================

export const gradients = {
  // Gradients de bronze
  bronzeText: "linear-gradient(135deg, #D4AF37 0%, #C09448 20%, #A37E2C 40%, #8A6823 60%, #A37E2C 80%, #D4AF37 100%)",

  // Gradients d'overlay
  overlayBottom: "linear-gradient(180deg, transparent 0%, rgba(5, 5, 5, 0.9) 100%)",
  overlayTop: "linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, transparent 100%)",
  overlayWhite: "linear-gradient(to-br, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.10), transparent)",

  // Gradients de fond
  bgSubtle: "linear-gradient(to-b, #FFFFFF, #F8FAFC, #FFFFFF)",

  // Gradients pour hover
  hoverWhite: "linear-gradient(to-t, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.90) 50%, rgba(255, 255, 255, 0.70) 100%)",
} as const;

// ============================================
// 🌐 BREAKPOINTS (Responsive)
// ============================================

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// ============================================
// 🎯 DESIGN SYSTEM COMPLET (Export principal)
// ============================================

export const theme = {
  colors,
  spacing,
  typography,
  effects,
  dimensions,
  components,
  gradients,
  breakpoints,
} as const;

export default theme;

// ============================================
// 📝 TYPE HELPERS (pour TypeScript)
// ============================================

export type Theme = typeof theme;
export type ThemeColors = typeof colors;
export type ThemeSpacing = typeof spacing;
export type ThemeTypography = typeof typography;
export type ThemeEffects = typeof effects;
