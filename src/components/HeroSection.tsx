"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Award, Users, Building } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { theme } from "@/config/theme";
import { colors, spacing } from "@/config/themeHelpers";
import { generateSmartAlt } from "@/utils/imageAlt";

const IMAGES_BASE = "/Users/avidanbenichay/Documents/Mes Projets d'apps/Mes projets/SELECT CHATEAUX/SITE-WEB/IMAGES";
const SUPABASE_URL = "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images";

const FOLDER_MAPPING: Record<string, string> = {
  "Abbaye des Veaux de cernay": "chevreuse",
  "Chateau de Montvillargene": "montvillargene",
  "Domaine Reine Margot": "hauts-de-seine",
  "Chateau Mont Royal": "mont-royal",
};

const getImageUrl = (folder: string, filename: string) => {
  // Utiliser Supabase en production (serveur ET client)
  if (process.env.NODE_ENV === 'production') {
    const supabaseFolder = FOLDER_MAPPING[folder] || folder;
    return `${SUPABASE_URL}/${supabaseFolder}/${encodeURIComponent(filename)}`;
  }
  // En développement, utiliser les images locales
  return `/api/images/preview?path=${encodeURIComponent(`${IMAGES_BASE}/${folder}/${filename}`)}`;
};

const heroSlides = [
  {
    image: getImageUrl("Abbaye des Veaux de cernay", "abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-vue-aerienne-domaine-parc-etang-jardins.webp"),
    title: "Abbaye Millénaire",
    region: "Vallée de Chevreuse",
  },
  {
    image: getImageUrl("Chateau Mont Royal", "chateau-mont-royal-60-oise-chantilly-vue-aerienne-chateau-lever-soleil-foret-architecture-classique.webp"),
    title: "Palais Royal",
    region: "Forêt de Chantilly",
  },
  {
    image: getImageUrl("Chateau de Montvillargene", "chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-facade-automne-lierre-rouge-arc-en-ciel.webp"),
    title: "Château de Montvillargene",
    region: "Oise",
  },
  {
    image: getImageUrl("Domaine Reine Margot", "domaine-reine-margot-92-hauts-de-seine-facade-jour-vue-aerienne-terrasse-jardin-parasols-blancs.webp"),
    title: "Refuge Historique",
    region: "Hauts-de-Seine",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set([0])); // Précharger seulement la première

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % heroSlides.length;
        // Précharger l'image suivante juste avant de l'afficher
        setImagesLoaded(prev => new Set(prev).add(next));
        return next;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  return (
    <section className="hero-section">
      {/* Image de château haute résolution en fond */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={heroSlides[currentSlide].image}
            alt={generateSmartAlt(
              heroSlides[currentSlide].image,
              heroSlides[currentSlide].title,
              heroSlides[currentSlide].region
            )}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            className="object-cover"
            style={{ filter: 'saturate(1.2) contrast(1.1) brightness(1.05)' }}
            priority={currentSlide === 0}
            loading={currentSlide === 0 ? "eager" : "lazy"}
            quality={80}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmM2Y0ZjYiLz48L3N2Zz4="
          />
          {/* Gradient subtil en bas pour les boutons */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* Contenu à gauche avec badge au-dessus */}
      <div className="absolute left-0 top-0 h-full flex flex-col justify-center" style={{ paddingLeft: 'clamp(0.75rem, 4vw, 3rem)' }}>

        {/* Badge lieu au-dessus du conteneur */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex justify-center"
          style={{ maxWidth: 'min(480px, 95vw)', width: '100%', marginBottom: 'clamp(0.75rem, 2vw, 1.25rem)' }}
        >
          <Badge variant="glass" size="md">
            <div
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{
                background: colors.bronze,
                filter: "drop-shadow(0 0 4px rgba(163, 126, 44, 0.8))",
              }}
            />
            <div
              className="italic font-semibold"
              style={{
                fontSize: theme.typography.fontSize.xs,
                color: colors.white,
                fontFamily: theme.typography.fonts.heading,
              }}
            >
              {heroSlides[currentSlide].title}
            </div>
            <div style={{ color: colors.bronze }}>·</div>
            <div
              className="font-medium"
              style={{
                fontSize: theme.typography.fontSize.xs,
                color: theme.colors.neutral.gray300,
              }}
            >
              {heroSlides[currentSlide].region}
            </div>
          </Badge>
        </motion.div>

        {/* Conteneur principal */}
        <div
          className="text-left rounded-2xl w-full"
          style={{
            maxWidth: 'min(480px, 95vw)',
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            padding: 'clamp(1rem, 3vw, 1.5rem)',
          }}
        >
          {/* Titre principal */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            style={{
              fontSize: 'clamp(1.125rem, 4vw, 2.25rem)',
              fontWeight: theme.typography.fontWeight.light,
              fontStyle: 'italic',
              fontFamily: theme.typography.fonts.heading,
              lineHeight: theme.typography.lineHeight.tight,
              color: theme.colors.text.primary,
              marginBottom: 'clamp(0.5rem, 2vw, 1rem)',
            }}
          >
            Séminaires & Châteaux Privés :{" "}
            <span style={{ color: colors.bronzeDark }}>
              La Collection Confidentielle (Paris / Île-de-France)
            </span>
          </motion.h1>

          {/* Sous-titre */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.text.secondary,
              fontWeight: theme.typography.fontWeight.normal,
              lineHeight: theme.typography.lineHeight.relaxed,
              marginBottom: spacing.xl,
            }}
          >
            Accès confidentiel aux domaines les plus convoités pour vos CODIR. 4 Lieux d'Exception · Île-de-France · Oise.
          </motion.p>

          {/* Trust Badges Luxe - Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
            className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 justify-start"
          >
            {/* Statistique 1 */}
            <StatBadge
              icon={<Award className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" style={{ color: colors.gold }} />}
              value="15+"
              label="Années"
            />

            {/* Statistique 2 */}
            <StatBadge
              icon={<Users className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" style={{ color: colors.gold }} />}
              value="500+"
              label="Événements"
            />

            {/* Statistique 3 */}
            <StatBadge
              icon={<Building className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" style={{ color: colors.gold }} />}
              value="4"
              label="Châteaux"
            />
          </motion.div>

        </div>
      </div>

      {/* Navigation du slider - Indicateurs uniquement */}
      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center z-10">
        <div className="flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-[3px] rounded-full transition-all duration-300 shadow-md ${
                index === currentSlide
                  ? "w-12"
                  : "w-8 hover:bg-gray-700/80"
              }`}
              style={{
                backgroundColor: index === currentSlide ? colors.bronze : "rgba(31, 41, 55, 0.7)",
              }}
              aria-label={`Aller à l'image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator - Repositionné */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute left-1/2 -translate-x-1/2 bottom-8 z-10"
      >
        <div className="flex flex-col items-center gap-3">
          <span
            className="text-white text-xs uppercase tracking-widest font-bold drop-shadow-lg"
            style={{
              textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 1px rgba(0,0,0,0.9)'
            }}
          >
            Découvrez
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-2 shadow-xl"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.9)',
              background: 'rgba(255, 255, 255, 0.95)',
            }}
          >
            <div
              className="w-1 h-2 rounded-full"
              style={{ background: colors.bronze }}
            />
          </motion.div>
        </div>
      </motion.div>

    </section>
  );
}

// ============================================
// COMPOSANTS HELPERS
// ============================================

function StatBadge({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="rounded-full border-2 flex-center group transition-all duration-300 flex-shrink-0 bg-white/90 shadow-lg"
        style={{
          borderColor: colors.gold,
          width: '36px',
          height: '36px',
        }}
      >
        {icon}
      </div>
      <div className="flex flex-col justify-center">
        <div
          className="leading-none"
          style={{
            fontFamily: theme.typography.fonts.heading,
            fontSize: theme.typography.fontSize.lg,
            fontWeight: theme.typography.fontWeight.medium,
            color: theme.colors.text.primary,
            marginBottom: '2px',
          }}
        >
          {value}
        </div>
        <div style={{
          fontSize: '10px',
          fontWeight: theme.typography.fontWeight.bold,
          textTransform: 'uppercase',
          letterSpacing: theme.typography.letterSpacing.wide,
          color: theme.colors.text.muted,
        }}>
          {label}
        </div>
      </div>
    </div>
  );
}

function SliderButton({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-12 h-12 rounded-full flex-center text-white border-2 transition-all duration-200 hover:border-[var(--bronze-antique)] hover:text-[var(--bronze-antique)]"
      style={{
        background: theme.colors.overlay.black80,
        borderColor: theme.colors.overlay.white30,
        boxShadow: theme.effects.shadows.lg,
      }}
      aria-label={direction === "prev" ? "Image précédente" : "Image suivante"}
    >
      {direction === "prev" ? (
        <ChevronLeft className="w-5 h-5" />
      ) : (
        <ChevronRight className="w-5 h-5" />
      )}
    </button>
  );
}
