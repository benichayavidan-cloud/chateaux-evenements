/**
 * CONFIGURATION CENTRALISÉE DU DESIGN DU BLOG
 *
 * Ce fichier permet de modifier rapidement tous les aspects visuels du blog
 * sans toucher aux composants individuels.
 */

export const BLOG_DESIGN = {
  // ============================================
  // COULEURS
  // ============================================
  colors: {
    primary: '#d4af37',        // Or doré (bronze antique)
    primaryHover: '#b8941f',   // Or foncé au hover
    primaryLight: 'rgba(212, 175, 55, 0.1)',  // Fond léger

    text: {
      primary: '#111827',      // Gris très foncé
      secondary: '#4b5563',    // Gris moyen
      tertiary: '#6b7280',     // Gris clair
      inverse: '#ffffff',      // Blanc
    },

    background: {
      primary: '#ffffff',      // Blanc
      secondary: '#f9fafb',    // Gris très clair
      gradient: 'from-gray-50 to-white',
      dark: 'from-gray-900 to-gray-800',
    },

    border: {
      light: '#e5e7eb',        // Bordure claire
      medium: '#d1d5db',       // Bordure moyenne
      primary: '#d4af37',      // Bordure accent
    }
  },

  // ============================================
  // TYPOGRAPHIE
  // ============================================
  typography: {
    fontFamily: {
      heading: 'Inter, sans-serif',
      body: 'Inter, system-ui, sans-serif',
      content: 'Merriweather, Georgia, serif',  // Pour le contenu markdown
    },

    fontSize: {
      hero: {
        mobile: '3.75rem',     // 60px
        desktop: '4.5rem',     // 72px
      },
      h1: {
        mobile: '3rem',        // 48px
        desktop: '3.75rem',    // 60px
      },
      h2: '2rem',              // 32px
      h3: '1.5rem',            // 24px
      body: '1rem',            // 16px
      small: '0.875rem',       // 14px
      tiny: '0.75rem',         // 12px
    },

    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },

    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.8,
      loose: 2,
    }
  },

  // ============================================
  // ESPACEMENTS (rem)
  // ============================================
  spacing: {
    // Padding des éléments
    badge: {
      sm: 'px-8 py-4',         // 32px / 16px
      md: 'px-12 py-6',        // 48px / 24px
      lg: 'px-16 py-8',        // 64px / 32px
    },

    button: {
      sm: 'px-12 py-5',        // 48px / 20px
      md: 'px-16 py-6',        // 64px / 24px
      lg: 'px-24 py-8',        // 96px / 32px
    },

    input: {
      sm: 'px-8 py-4',
      md: 'px-12 py-6',
      lg: 'px-24 py-8',        // Barre de recherche
    },

    card: {
      sm: 'p-8',               // 32px
      md: 'p-12',              // 48px
      lg: 'p-16',              // 64px
      xl: 'p-20',              // 80px
    },

    // Gaps entre éléments
    gap: {
      xs: 'gap-2',             // 8px
      sm: 'gap-4',             // 16px
      md: 'gap-8',             // 32px
      lg: 'gap-12',            // 48px
      xl: 'gap-16',            // 64px
      '2xl': 'gap-20',         // 80px
    },

    // Marges de section
    section: {
      sm: 'py-12',             // 48px
      md: 'py-16',             // 64px
      lg: 'py-20',             // 80px
      xl: 'py-32',             // 128px
    },

    // Container padding horizontal
    container: {
      mobile: 'px-6',          // 24px
      tablet: 'px-8',          // 32px
      desktop: 'px-12',        // 48px
    }
  },

  // ============================================
  // DIMENSIONS
  // ============================================
  dimensions: {
    // Largeurs max des containers
    maxWidth: {
      sm: 'max-w-2xl',         // 672px
      md: 'max-w-4xl',         // 896px
      lg: 'max-w-6xl',         // 1152px
      xl: 'max-w-7xl',         // 1280px
    },

    // Hauteurs minimales
    minHeight: {
      button: 'min-h-[64px]',
      badge: 'min-h-[48px]',
      input: 'min-h-[64px]',
      card: 'min-h-[600px]',
    },

    // Images
    image: {
      hero: 'h-[60vh] min-h-[500px]',
      featured: 'h-[500px] md:h-[600px]',
      card: 'h-64',            // 256px
      thumbnail: 'h-56',       // 224px
    }
  },

  // ============================================
  // BORDURES & RADIUS
  // ============================================
  borders: {
    radius: {
      sm: 'rounded-lg',        // 8px
      md: 'rounded-xl',        // 12px
      lg: 'rounded-2xl',       // 16px
      xl: 'rounded-3xl',       // 24px
      full: 'rounded-full',    // Infini
    },

    width: {
      thin: 'border',          // 1px
      normal: 'border-2',      // 2px
      thick: 'border-4',       // 4px
    }
  },

  // ============================================
  // OMBRES
  // ============================================
  shadows: {
    sm: 'shadow-md',
    md: 'shadow-lg',
    lg: 'shadow-xl',
    xl: 'shadow-2xl',
    '3xl': 'hover:shadow-3xl',
  },

  // ============================================
  // TRANSITIONS
  // ============================================
  transitions: {
    fast: 'transition-all duration-200',
    normal: 'transition-all duration-300',
    slow: 'transition-all duration-500',
    verySlow: 'transition-all duration-700',
  },

  // ============================================
  // EFFETS HOVER
  // ============================================
  hover: {
    scale: {
      sm: 'hover:scale-102',
      md: 'hover:scale-105',
      lg: 'hover:scale-110',
    },

    shadow: 'hover:shadow-2xl',
    lift: 'hover:-translate-y-2',
  },

  // ============================================
  // GRILLES RESPONSIVE
  // ============================================
  grid: {
    articles: 'grid md:grid-cols-2 lg:grid-cols-3',
    featured: 'grid md:grid-cols-2',
    related: 'grid md:grid-cols-3',
  },

  // ============================================
  // ANIMATIONS FRAMER MOTION
  // ============================================
  animations: {
    fadeIn: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8 },
    },

    fadeInFast: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6 },
    },

    stagger: (index: number) => ({
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, delay: index * 0.1 },
    }),
  },
} as const;

/**
 * Helper functions pour construire des classes Tailwind
 */
export const buildClasses = {
  badge: (size: 'sm' | 'md' | 'lg' = 'md') =>
    `inline-flex items-center justify-center ${BLOG_DESIGN.spacing.badge[size]} ${BLOG_DESIGN.borders.radius.full} ${BLOG_DESIGN.dimensions.minHeight.badge} leading-none`,

  button: (size: 'sm' | 'md' | 'lg' = 'md', variant: 'primary' | 'secondary' = 'primary') => {
    const base = `inline-flex items-center justify-center ${BLOG_DESIGN.spacing.button[size]} ${BLOG_DESIGN.borders.radius.full} font-medium ${BLOG_DESIGN.transitions.normal} ${BLOG_DESIGN.dimensions.minHeight.button} leading-none`;

    if (variant === 'primary') {
      return `${base} bg-[var(--bronze-antique)] text-white ${BLOG_DESIGN.hover.scale.md} ${BLOG_DESIGN.hover.shadow}`;
    }

    return `${base} bg-white text-gray-700 border-2 border-gray-200 hover:border-[var(--bronze-antique)] hover:text-[var(--bronze-antique)]`;
  },

  card: (size: 'sm' | 'md' | 'lg' | 'xl' = 'md') =>
    `${BLOG_DESIGN.spacing.card[size]} ${BLOG_DESIGN.borders.radius.lg} bg-white ${BLOG_DESIGN.shadows.lg} ${BLOG_DESIGN.hover.shadow} ${BLOG_DESIGN.transitions.slow}`,

  input: (size: 'sm' | 'md' | 'lg' = 'md') =>
    `w-full ${BLOG_DESIGN.spacing.input[size]} ${BLOG_DESIGN.borders.radius.lg} border-2 border-gray-200 focus:border-[var(--bronze-antique)] focus:ring-4 focus:ring-[var(--bronze-antique)]/10 outline-none ${BLOG_DESIGN.transitions.normal} text-lg shadow-lg`,

  section: (size: 'sm' | 'md' | 'lg' | 'xl' = 'md') =>
    `w-full ${BLOG_DESIGN.spacing.section[size]} flex justify-center`,

  container: (size: 'sm' | 'md' | 'lg' | 'xl' = 'xl') =>
    `w-full ${BLOG_DESIGN.dimensions.maxWidth[size]} ${BLOG_DESIGN.spacing.container.desktop}`,
};
