"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Award, Users, Building } from "lucide-react";
import { chateaux } from "@/data/chateaux";

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
    <section className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Image de château haute résolution en fond */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
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
          {/* Overlay ultra lumineux - Maximum blanc avec léger gris */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-white/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/15 via-transparent to-white/15" />
          {/* Overlay général pour meilleure lisibilité du contenu */}
          <div className="absolute inset-0 bg-white/25 backdrop-blur-[1.5px]" />
        </motion.div>
      </AnimatePresence>

      {/* Contenu centré de manière absolue */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-5xl mx-auto text-center">
          {/* Titre principal avec animation Reveal */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl italic leading-tight font-[var(--font-cormorant)]"
            style={{ color: '#000000', marginBottom: '24px', fontWeight: 500 }}
          >
            Transformez vos événements en{" "}
            <span className="block md:inline relative" style={{ color: '#8B6914', fontWeight: 600 }}>
              expériences d'exception
            </span>
          </motion.h1>

          {/* Sous-titre avec animation Reveal décalée */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
            className="text-lg md:text-xl leading-relaxed font-medium"
            style={{ color: '#1a1a1a', marginBottom: '48px' }}
          >
            Organisez vos séminaires, conventions et événements d'entreprise
            dans nos 4 châteaux d'exception en France.
          </motion.p>

          {/* Trust Badges Luxe - Stats Section - Flex Row pour centrage parfait */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
            className="flex flex-row justify-center items-center gap-8 lg:gap-12 flex-wrap"
            style={{ marginBottom: '32px' }}
          >
            {/* Statistique 1 : Années */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center group transition-all duration-500 backdrop-blur-md bg-white/80 shadow-lg" style={{ borderColor: '#B8860B', marginBottom: '24px' }}>
                <Award className="w-7 h-7 group-hover:scale-110 transition-transform" style={{ color: '#B8860B' }} />
              </div>
              <div className="text-3xl font-medium font-[var(--font-cormorant)] leading-none mb-2" style={{ color: '#000000' }}>
                15+
              </div>
              <div className="text-xs uppercase tracking-widest leading-none font-semibold" style={{ color: '#4a4a4a' }}>
                Années
              </div>
            </div>

            {/* Statistique 2 : Événements */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center group transition-all duration-500 backdrop-blur-md bg-white/80 shadow-lg" style={{ borderColor: '#B8860B', marginBottom: '24px' }}>
                <Users className="w-7 h-7 group-hover:scale-110 transition-transform" style={{ color: '#B8860B' }} />
              </div>
              <div className="text-3xl font-medium font-[var(--font-cormorant)] leading-none mb-2" style={{ color: '#000000' }}>
                500+
              </div>
              <div className="text-xs uppercase tracking-widest leading-none font-semibold" style={{ color: '#4a4a4a' }}>
                Événements
              </div>
            </div>

            {/* Statistique 3 : Châteaux */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center group transition-all duration-500 backdrop-blur-md bg-white/80 shadow-lg" style={{ borderColor: '#B8860B', marginBottom: '24px' }}>
                <Building className="w-7 h-7 group-hover:scale-110 transition-transform" style={{ color: '#B8860B' }} />
              </div>
              <div className="text-3xl font-medium font-[var(--font-cormorant)] leading-none mb-2" style={{ color: '#000000' }}>
                4
              </div>
              <div className="text-xs uppercase tracking-widest leading-none font-semibold" style={{ color: '#4a4a4a' }}>
                Châteaux
              </div>
            </div>
          </motion.div>

          {/* Boutons CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center items-center"
            style={{ gap: '20px' }}
          >
            <Link
              href="/devis"
              className="group relative text-base font-bold text-white bg-[var(--bronze-antique)] rounded-full overflow-hidden transition-all duration-500 hover:shadow-[var(--shadow-glow)] inline-flex items-center justify-center whitespace-nowrap"
              style={{
                filter: 'drop-shadow(0 8px 16px rgba(163, 126, 44, 0.4))',
                padding: '18px 40px',
                height: '56px',
                border: '2px solid transparent',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
              }}
            >
              <span className="relative z-10 group-hover:text-white transition-colors">
                Demander un Devis
              </span>
              <span className="absolute inset-0 bg-[var(--bronze-light)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Link>
            <Link
              href="/chateaux"
              className="backdrop-blur-xl bg-white/90 text-black text-base font-bold rounded-full hover:bg-white hover:border-[var(--bronze-antique)] transition-all duration-500 border-2 border-white/50 inline-flex items-center justify-center whitespace-nowrap shadow-lg"
              style={{
                filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2))',
                padding: '18px 40px',
                height: '56px'
              }}
            >
              Découvrir nos Châteaux
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Navigation du slider - Version luxe minimaliste */}
      <div className="absolute bottom-12 right-12 flex items-center space-x-6 z-10">
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full backdrop-blur-xl bg-gray-900/70 hover:bg-gray-900/90 hover:border-[var(--bronze-antique)] transition-all duration-300 flex items-center justify-center text-white hover:text-[var(--bronze-antique)] border-2 border-white/40 shadow-lg"
          aria-label="Image précédente"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-[3px] rounded-full transition-all duration-500 shadow-md ${
                index === currentSlide
                  ? "bg-[var(--bronze-antique)] w-12"
                  : "bg-gray-800/70 hover:bg-gray-700/80 w-8"
              }`}
              aria-label={`Aller à l'image ${index + 1}`}
            />
          ))}
        </div>
        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full backdrop-blur-xl bg-gray-900/70 hover:bg-gray-900/90 hover:border-[var(--bronze-antique)] transition-all duration-300 flex items-center justify-center text-white hover:text-[var(--bronze-antique)] border-2 border-white/40 shadow-lg"
          aria-label="Image suivante"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Scroll indicator - Centrage absolu parfait */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute left-1/2 -translate-x-1/2"
        style={{ bottom: '24px', zIndex: 5 }}
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-gray-800 text-xs uppercase tracking-[0.2em] font-bold">
            Découvrez
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-gray-700/60 flex items-start justify-center p-2 backdrop-blur-sm bg-white/50 shadow-md"
          >
            <div className="w-1 h-2 bg-[var(--bronze-antique)] rounded-full" />
          </motion.div>
        </div>
      </motion.div>

      {/* Indicateur de château actuel - Badge minimaliste glassmorphism */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute left-1/2 -translate-x-1/2 hidden lg:block"
        style={{ bottom: '70px', zIndex: 10 }}
      >
        <div
          className="flex items-center backdrop-blur-xl bg-gray-900/80 rounded-full border border-white/30 shadow-lg"
          style={{
            gap: '8px',
            padding: '10px 20px',
            filter: 'drop-shadow(0 4px 16px rgba(0, 0, 0, 0.4))'
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--bronze-antique)] animate-pulse" style={{ filter: 'drop-shadow(0 0 4px rgba(163, 126, 44, 0.8))' }} />
          <div className="text-xs text-white font-[var(--font-cormorant)] italic font-semibold">
            {heroSlides[currentSlide].title}
          </div>
          <div className="text-xs text-[var(--bronze-antique)]">·</div>
          <div className="text-xs text-gray-300 font-medium">
            {heroSlides[currentSlide].region}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
