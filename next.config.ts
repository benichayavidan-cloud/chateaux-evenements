import type { NextConfig } from "next";
import mergedRedirects from "./src/data/merged-redirects.json";

/**
 * Configuration Next.js optimisée pour Core Web Vitals
 * Objectif: 100/100 sur PageSpeed Insights
 */
const nextConfig: NextConfig = {
  images: {
    // 1. Formats modernes (AVIF prioritaire, puis WebP fallback)
    formats: ["image/avif", "image/webp"],

    // 2. Remote patterns - Autorisation stricte des domaines externes
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
      },
      {
        protocol: "https",
        hostname: "logo.clearbit.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co", // Wildcard pour tous les projets Supabase
      },
    ],

    // 3. Désactiver l'optimisation en dev pour vitesse de build
    unoptimized: process.env.NODE_ENV === "development",

    // 4. Breakpoints responsive (basés sur les devices réels)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // 5. Cache agressif (1 an)
    minimumCacheTTL: 31536000,

    // 6. Qualités autorisées (Next.js 16+ impose cette liste pour sécurité)
    qualities: [60, 70, 75, 80, 85],

    // 7. SVG (si nécessaire)
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Compression Gzip/Brotli activée
  compress: true,

  // Mode strict React
  reactStrictMode: true,

  // Retirer l'en-tête X-Powered-By (sécurité)
  poweredByHeader: false,

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Headers de sécurité et performance
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // CSP gérée par middleware.ts pour éviter les duplications
        ],
      },
      // Cache agressif pour les images
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Cache agressif pour les fonts
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Cache pour les assets statiques JS/CSS (Next.js _next/static)
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Redirections 301 (SEO)
  async redirects() {
    return [
      {
        source: "/chateaux/domaine-grands-bois-chantilly",
        destination: "/chateaux/manoir-anglo-normand-chantilly",
        permanent: true,
      },
      {
        source: "/chateaux/domaine-hauts-de-seine",
        destination: "/chateaux/hotel-historique-seminaire-paris-92",
        permanent: true,
      },
      {
        source: "/chateaux/monastere-vallee-chevreuse",
        destination: "/chateaux/abbaye-millenaire-vallee-chevreuse",
        permanent: true,
      },

      // ── MÉDIA OFFLOAD : vidéo déplacée vers Supabase Storage (hors repo) ──
      // L'ancienne URL /videos/...mp4 était dans le schema VideoObject : on la
      // redirige pour ne pas créer de 404 sur d'anciens liens/indexation.
      {
        source: "/videos/Planification_de_Seminaire_SelectChateaux.mp4",
        destination:
          "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/video/Planification_de_Seminaire_SelectChateaux.mp4",
        permanent: true,
      },

      // ── BRAND REGROUP : assets identité déplacés dans /public/brand ──
      // Les anciennes URLs (logo, OG) sont connues de Google (schema.org, RSS,
      // partages sociaux) et des PWA installées : 301 pour zéro 404/perte SEO.
      { source: "/logo.png", destination: "/brand/logo.png", permanent: true },
      { source: "/og-image.jpg", destination: "/brand/og-image.jpg", permanent: true },
      { source: "/og-blog.jpg", destination: "/brand/og-blog.jpg", permanent: true },
      { source: "/icon.png", destination: "/brand/icon.png", permanent: true },
      { source: "/icon.svg", destination: "/brand/icon.svg", permanent: true },
      { source: "/apple-icon.png", destination: "/brand/apple-icon.png", permanent: true },
      { source: "/favicon-16.png", destination: "/brand/favicon-16.png", permanent: true },
      { source: "/favicon-32.png", destination: "/brand/favicon-32.png", permanent: true },
      { source: "/favicon-48.png", destination: "/brand/favicon-48.png", permanent: true },
      { source: "/logos/:file", destination: "/brand/clients/:file", permanent: true },

      // ── FUSIONS ANTI-CANNIBALISATION (audit SEO 2026-06-11) ──
      // SOURCE UNIQUE : src/data/merged-redirects.json — le même fichier
      // alimente le filtre MERGED_SLUGS dans blog-posts.ts. Ajouter une fusion
      // là-bas génère automatiquement le 301 ici (zéro désynchronisation).
      ...mergedRedirects.merges.map((m) => ({
        source: `/blog/${m.from}`,
        destination: m.to,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
