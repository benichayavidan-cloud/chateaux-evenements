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
    objectPosition: "52% 50%", // Centré verticalement pour mobile
  },
  {
    image: getImageUrl("Chateau Mont Royal", "chateau-mont-royal-60-oise-chantilly-vue-aerienne-chateau-lever-soleil-foret-architecture-classique.webp"),
    title: "Palais Royal",
    region: "Forêt de Chantilly",
    objectPosition: "53% 50%",
  },
  {
    image: getImageUrl("Chateau de Montvillargene", "chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-facade-automne-lierre-rouge-arc-en-ciel.webp"),
    title: "Château de Montvillargene",
    region: "Oise",
    objectPosition: "50% 50%",
  },
  {
    image: getImageUrl("Domaine Reine Margot", "domaine-reine-margot-92-hauts-de-seine-facade-jour-vue-aerienne-terrasse-jardin-parasols-blancs.webp"),
    title: "Refuge Historique",
    region: "Hauts-de-Seine",
    objectPosition: "50% 50%",
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
            sizes="(max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, 100vw"
            className="object-cover"
            style={{
              filter: 'saturate(1.2) contrast(1.1) brightness(1.05)',
              objectPosition: heroSlides[currentSlide].objectPosition,
              objectFit: 'cover'
            }}
            priority={currentSlide === 0}
            loading={currentSlide === 0 ? "eager" : "lazy"}
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmM2Y0ZjYiLz48L3N2Zz4="
          />
          {/* Gradient subtil en bas pour les boutons */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* Contenu centré - Pattern LuxuryHotel col-lg-10 */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ padding: 'clamp(1rem, 4vw, 2rem)' }}>
        <div className="w-full" style={{ maxWidth: '1200px' }}>
          <div className="flex justify-center">
            <div className="w-full" style={{ maxWidth: '83.333%' }}> {/* col-lg-10 = 83.333% */}

              {/* Badge lieu au-dessus */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="flex justify-center"
                style={{ marginBottom: 'clamp(1rem, 2vw, 1.5rem)' }}
              >
                <Badge
                  variant="glass"
                  size="lg"
                  icon={
                    <div
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{
                        background: colors.gold,
                        filter: "drop-shadow(0 0 4px rgba(212, 175, 55, 0.8))",
                      }}
                    />
                  }
                  style={{
                    color: colors.gold,
                    paddingLeft: 'clamp(1.25rem, 3vw, 1.5rem)',
                    paddingRight: 'clamp(1.25rem, 3vw, 1.5rem)',
                  }}
                >
                  <span className="font-semibold" style={{ fontSize: 'clamp(0.8125rem, 2vw, 0.875rem)' }}>
                    {heroSlides[currentSlide].region}
                  </span>
                </Badge>
              </motion.div>

              {/* Conteneur principal - LuxuryHotel style */}
              <div
                className="text-center rounded-2xl w-full"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                }}
              >
          {/* Titre principal - LuxuryHotel typography scale */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',  // LuxuryHotel: 2.5rem → 3.5rem (adapté)
              fontWeight: theme.typography.fontWeight.light,
              fontStyle: 'italic',
              fontFamily: theme.typography.fonts.heading,
              lineHeight: 1.2,  // LuxuryHotel standard
              color: theme.colors.text.primary,
              marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
            }}
          >
            Séminaires & Châteaux Privés :{" "}
            <span style={{ color: colors.bronzeDark }}>
              La Collection Confidentielle (Paris / Île-de-France)
            </span>
          </motion.h1>

          {/* Sous-titre - LuxuryHotel style */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',  // LuxuryHotel: 1.1rem → 1.25rem
              color: theme.colors.text.secondary,
              fontWeight: theme.typography.fontWeight.normal,
              lineHeight: 1.6,
              marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Accès confidentiel aux domaines les plus convoités pour vos CODIR. 4 Lieux d'Exception · Île-de-France · Oise.
          </motion.p>

          {/* Trust Badges Luxe - Stats Section - LuxuryHotel pattern */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
            className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center"
            style={{ marginBottom: 'clamp(1rem, 2vw, 2rem)' }}
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
            </div>
          </div>
        </div>

      {/* Navigation du slider - MICRO INDICATEURS */}
      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center z-10">
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          {heroSlides.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: index === currentSlide ? '16px' : '3px',
                height: '3px',
                minWidth: index === currentSlide ? '16px' : '3px',
                minHeight: '3px',
                maxWidth: index === currentSlide ? '16px' : '3px',
                maxHeight: '3px',
                borderRadius: '1.5px',
                backgroundColor: index === currentSlide ? '#A37E2C' : 'rgba(255, 255, 255, 0.4)',
                opacity: index === currentSlide ? 1 : 0.5,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                flexShrink: 0,
              }}
              role="button"
              aria-label={`Aller à l'image ${index + 1}`}
              tabIndex={0}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator - Repositionné */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute left-1/2 -translate-x-1/2 z-10"
        style={{ bottom: '1.25rem' }}
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
