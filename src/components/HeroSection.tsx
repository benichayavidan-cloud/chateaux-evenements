"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Award, Users, Building } from "lucide-react";
import { chateaux } from "@/data/chateaux";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { theme } from "@/config/theme";
import { colors, spacing } from "@/config/themeHelpers";

const heroSlides = chateaux.map((chateau) => ({
  image: chateau.images[0],
  title: chateau.nom,
  region: chateau.region,
}));

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

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
            alt={heroSlides[currentSlide].title}
            fill
            sizes="100vw"
            className="object-cover"
            style={{ filter: 'saturate(1.2) contrast(1.1) brightness(1.05)' }}
            priority={currentSlide === 0}
            loading={currentSlide === 0 ? "eager" : "lazy"}
            quality={85}
          />
          {/* Overlays */}
          <div className="hero-overlay-light" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 via-transparent to-white/10" />
          <div className="hero-overlay-light-extra" />
        </motion.div>
      </AnimatePresence>

      {/* Contenu centré avec padding-top pour éviter header */}
      <div className="relative h-full flex flex-col items-center justify-center px-6 pt-20">
        <div className="w-full max-w-5xl mx-auto text-center">
          {/* Titre principal */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            className="heading-display mb-10 leading-tight"
          >
            Transformez vos événements en{" "}
            <span className="block md:inline text-[var(--bronze-dark)]">
              expériences d'exception
            </span>
          </motion.h1>

          {/* Sous-titre */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
            className="text-body-xl text-gray-800 font-medium mb-12"
          >
            Organisez vos séminaires, conventions et événements d'entreprise
            dans nos 4 châteaux d'exception en France.
          </motion.p>

          {/* Trust Badges Luxe - Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
            className="flex flex-row justify-center items-center gap-8 lg:gap-12 flex-wrap mb-6"
          >
            {/* Statistique 1 */}
            <StatBadge
              icon={<Award className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" style={{ color: colors.gold }} />}
              value="15+"
              label="Années"
            />

            {/* Statistique 2 */}
            <StatBadge
              icon={<Users className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" style={{ color: colors.gold }} />}
              value="500+"
              label="Événements"
            />

            {/* Statistique 3 */}
            <StatBadge
              icon={<Building className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" style={{ color: colors.gold }} />}
              value="4"
              label="Châteaux"
            />
          </motion.div>

        </div>
      </div>

      {/* Bouton Devis - En bas à gauche au-dessus du nom du lieu */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.4 }}
        className="absolute bottom-20 left-4 sm:left-8 md:left-12 z-10"
      >
        <Button href="/devis" size="lg" variant="primary">
          Demander un Devis
        </Button>
      </motion.div>

      {/* Bouton Châteaux - En bas à droite au même niveau que le bouton Devis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.45 }}
        className="absolute bottom-20 right-4 sm:right-8 md:right-12 z-10"
      >
        <Button href="/chateaux" size="lg" variant="secondary">
          Découvrir nos Châteaux
        </Button>
      </motion.div>

      {/* Navigation du slider - En bas à droite */}
      <div className="absolute bottom-8 right-4 sm:right-8 md:right-12 flex items-center space-x-3 sm:space-x-4 md:space-x-6 z-10">
        <SliderButton direction="prev" onClick={prevSlide} />
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
        <SliderButton direction="next" onClick={nextSlide} />
      </div>

      {/* Scroll indicator - Repositionné */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute left-1/2 -translate-x-1/2 bottom-4 z-5"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-gray-800 text-xs uppercase tracking-widest font-bold">
            Découvrez
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-gray-600/60 flex items-start justify-center p-2 bg-white/60 shadow-md"
          >
            <div
              className="w-1 h-2 rounded-full"
              style={{ background: colors.bronze }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Indicateur de château actuel - En bas à gauche au même niveau que les flèches */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute left-4 sm:left-8 md:left-12 hidden lg:block bottom-8 z-10"
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
    </section>
  );
}

// ============================================
// COMPOSANTS HELPERS
// ============================================

function StatBadge({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div
        className="rounded-full border-2 flex-center group transition-all duration-300 w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 mb-3 bg-white/90 shadow-lg"
        style={{
          borderColor: colors.gold,
        }}
      >
        {icon}
      </div>
      <div
        className="leading-none mb-1.5 text-2xl md:text-3xl font-medium text-gray-900"
        style={{
          fontFamily: theme.typography.fonts.heading,
        }}
      >
        {value}
      </div>
      <div className="text-xs font-bold uppercase tracking-wider text-gray-600">
        {label}
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
