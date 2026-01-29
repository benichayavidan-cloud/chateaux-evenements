"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Users, ArrowRight, Check, Sparkles, Award, Star, Phone, Calendar, Shield, TrendingUp, Clock, ChevronLeft, ChevronRight, Bed } from "lucide-react";
import { chateaux } from "@/data/chateaux";
import { theme } from "@/config/theme";
import { colors, spacing } from "@/config/themeHelpers";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ReviewsSection } from "@/components/ReviewsSection";
import { useState, useEffect } from "react";

// ============================================
// STYLES MODULABLES - Modifier ici pour changer le design
// ============================================

const SECTION_STYLES = {
  // Hero Section
  hero: {
    height: '85vh',
    minHeight: '600px',
    overlay: "linear-gradient(to right, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.30) 100%)",
    padding: { left: '24px', right: '24px' }
  },

  // Section Container
  container: {
    maxWidth: '1280px',
    padding: { x: '16px', sm: '24px', md: '48px', lg: '64px' },
    margin: '0 auto'
  },

  // Section Spacing
  spacing: {
    section: { py: '80px', md: '112px' },
    element: { mb: spacing["2xl"] },
    gap: spacing.xl
  },

  // Typography
  typography: {
    title: {
      fontSize: "clamp(2.5rem, 5vw, 4rem)",
      fontWeight: theme.typography.fontWeight.light,
      fontStyle: "italic",
      color: theme.colors.text.primary,
      fontFamily: theme.typography.fonts.heading,
    },
    subtitle: {
      fontSize: theme.typography.fontSize.xl,
      color: theme.colors.text.secondary,
      lineHeight: theme.typography.lineHeight.relaxed,
      maxWidth: '800px',
    }
  },

  // CTA Section - MODULABLE
  cta: {
    padding: { top: '80px', bottom: '80px' },
    spacing: {
      iconToTitle: '32px',
      titleToSubtitle: '20px',
      subtitleToBadges: '48px',
      badgesToButtons: '40px',
      buttonsToNote: '32px',
    }
  }
};

// ============================================
// COMPOSANT: Section Wrapper pour centrage
// ============================================
const SectionWrapper = ({
  children,
  bg = 'transparent',
  className = ''
}: {
  children: React.ReactNode;
  bg?: string;
  className?: string;
}) => (
  <section
    className={`flex items-center justify-center ${className}`}
    style={{ background: bg, paddingTop: 'clamp(1rem, 3vw, 2rem)', paddingBottom: 'clamp(1rem, 3vw, 2rem)' }}
  >
    <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 w-full">
      {children}
    </div>
  </section>
);

// ============================================
// COMPOSANT: Section Header (Titre + Sous-titre) - CENTRÉ
// ============================================
const SectionHeader = ({
  title,
  subtitle,
  icon
}: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}) => (
  <div className="flex flex-col items-center justify-center w-full" style={{ marginBottom: spacing['4xl'] }}>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center max-w-4xl w-full"
    >
      {icon && (
        <div className="flex items-center justify-center gap-3 mb-4">
          {icon}
        </div>
      )}
      <h2
        className="text-center w-full"
        style={{
          ...SECTION_STYLES.typography.title,
          marginBottom: subtitle ? spacing.xs : 0
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="text-center w-full"
          style={{
            ...SECTION_STYLES.typography.subtitle,
            marginTop: spacing.xs,
            marginBottom: spacing.xl
          }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  </div>
);

// ============================================
// COMPOSANT: Galerie d'images avec miniatures
// ============================================
const ImageGallery = ({
  images,
  name,
  chateauId,
  selectedIndex,
  onSelectImage
}: {
  images: string[];
  name: string;
  chateauId: string;
  selectedIndex: number;
  onSelectImage: (index: number) => void;
}) => (
  <Card variant="hover" padding="none" hoverable className="overflow-hidden group">
    <div className="relative h-96 md:h-[500px]">
      {/* Image principale */}
      <Image
        src={images[selectedIndex]}
        alt={name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />

      {/* Badge Prestige */}
      <div className="absolute top-6 right-6">
        <Badge variant="glass" size="lg" icon={<Award className="w-5 h-5" />}>
          Prestige
        </Badge>
      </div>

      {/* Miniatures cliquables */}
      <div className="absolute bottom-6 left-6 right-6 flex gap-2">
        {images.slice(0, 4).map((image, i) => (
          <button
            key={i}
            onClick={() => onSelectImage(i)}
            className="relative flex-1 h-20 rounded-lg overflow-hidden cursor-pointer transition-all hover:ring-2 hover:ring-white hover:scale-105"
            style={{
              opacity: selectedIndex === i ? 1 : 0.7,
              border: selectedIndex === i ? '2px solid white' : 'none',
            }}
          >
            <Image
              src={image}
              alt={`${name} ${i + 1}`}
              fill
              className="object-cover"
              sizes="200px"
            />
          </button>
        ))}
      </div>
    </div>
  </Card>
);

// ============================================
// HERO SLIDES
// ============================================
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
    chateau: chateaux[2], // L'Abbaye Millénaire
    objectPosition: "52% 100%", // Options: center, top, bottom, left, right, top left, top right, bottom left, bottom right, ou "50% 30%" (custom)
  },
  {
    image: getImageUrl("Chateau Mont Royal", "chateau-mont-royal-60-oise-chantilly-vue-aerienne-chateau-lever-soleil-foret-architecture-classique.webp"),
    title: "Palais Royal",
    region: "Forêt de Chantilly",
    chateau: chateaux[3], // Le Palais Royal
    objectPosition: "53% 100%",
  },
  {
    image: getImageUrl("Chateau de Montvillargene", "chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-facade-chateau-architecture-classique-francaise.webp"),
    title: "Château de Montvillargene",
    region: "Oise",
    chateau: chateaux[0], // Le Manoir (on réutilise ses données)
    objectPosition: "50% 100%",
  },
  {
    image: getImageUrl("Domaine Reine Margot", "domaine-reine-margot-92-hauts-de-seine-facade-jour-vue-aerienne-terrasse-jardin-parasols-blancs.webp"),
    title: "Refuge Historique",
    region: "Hauts-de-Seine",
    chateau: chateaux[1], // Le Refuge Historique
    objectPosition: "50% 100%",
  },
];

// ============================================
// COMPOSANT PRINCIPAL
// ============================================
export default function ChateauxPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<{ [key: string]: number }>({});
  const [editMode, setEditMode] = useState(false);
  const [tempPosition, setTempPosition] = useState<string | null>(null);
  const isDev = process.env.NODE_ENV === 'development';

  // Auto-play du slider - 3 secondes
  useEffect(() => {
    if (!isAutoPlaying || editMode) return; // Pause en mode édition
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, editMode]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!editMode) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const position = `${Math.round(x)}% ${Math.round(y)}%`;
    setTempPosition(position);
  };

  const adjustPosition = (dx: number, dy: number) => {
    const current = tempPosition || heroSlides[currentSlide].objectPosition;
    const parts = current.split(' ');
    const x = parseInt(parts[0]) + dx;
    const y = parseInt(parts[1]) + dy;
    const newPosition = `${Math.max(0, Math.min(100, x))}% ${Math.max(0, Math.min(100, y))}%`;
    setTempPosition(newPosition);
  };

  const copyPosition = async () => {
    if (tempPosition) {
      navigator.clipboard.writeText(tempPosition);

      // Enregistrer dans un fichier pour Claude
      try {
        await fetch('/api/save-position', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page: 'chateaux',
            slide: currentSlide + 1,
            title: heroSlides[currentSlide].title,
            position: tempPosition,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (error) {
        console.log('Erreur sauvegarde:', error);
      }

      alert(`Position copiée: ${tempPosition}\nSlide ${currentSlide + 1}: ${heroSlides[currentSlide].title}`);
    }
  };

  const resetPosition = () => {
    setTempPosition(null);
  };

  return (
    <div className="min-h-screen bg-white">

      {/* ============================================ */}
      {/* SECTION 1: HERO SLIDER */}
      {/* ============================================ */}
      <section style={{ height: SECTION_STYLES.hero.height, minHeight: SECTION_STYLES.hero.minHeight }} className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          {heroSlides.map((slide, index) => (
            index === currentSlide && (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
              >
                {/* Image de fond */}
                <div
                  className="absolute inset-0"
                  onClick={handleImageClick}
                  style={{ cursor: editMode ? 'crosshair' : 'default' }}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    quality={95}
                    sizes="100vw"
                    style={{
                      filter: 'saturate(1.2) contrast(1.1) brightness(1.05)',
                      objectPosition: tempPosition || slide.objectPosition
                    }}
                  />
                </div>

                {/* Gradient subtil en bas */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />

                {/* Point focal visuel en mode édition */}
                {editMode && tempPosition && (
                  <div
                    className="absolute w-4 h-4 rounded-full border-4 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 z-20"
                    style={{
                      left: tempPosition.split(' ')[0],
                      top: tempPosition.split(' ')[1],
                      background: colors.bronze,
                      boxShadow: '0 0 0 2px rgba(0,0,0,0.3), 0 0 20px rgba(163, 126, 44, 0.8)',
                    }}
                  />
                )}

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
                        {slide.title}
                      </div>
                      <div style={{ color: colors.bronze }}>·</div>
                      <div
                        className="font-medium"
                        style={{
                          fontSize: theme.typography.fontSize.xs,
                          color: theme.colors.neutral.gray300,
                        }}
                      >
                        {slide.region}
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
                      padding: 'clamp(0.75rem, 3vw, 1.75rem) clamp(0.75rem, 2vw, 1.5rem)',
                    }}
                  >
                    {/* Titre */}
                    <motion.h1
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
                      style={{
                        fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                        fontWeight: theme.typography.fontWeight.light,
                        fontStyle: 'italic',
                        fontFamily: theme.typography.fonts.heading,
                        lineHeight: theme.typography.lineHeight.tight,
                        color: theme.colors.text.primary,
                        marginBottom: spacing.xs,
                      }}
                    >
                      Location de Châteaux pour Séminaires : La Collection Île-de-France
                    </motion.h1>

                    {/* Sous-titre H2 */}
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        fontWeight: theme.typography.fontWeight.normal,
                        color: theme.colors.text.secondary,
                        lineHeight: theme.typography.lineHeight.relaxed,
                        marginBottom: spacing.lg,
                      }}
                    >
                      4 Domaines d'exception, privatisables pour vos événements d'entreprise. Oise (60) · Yvelines (78) · Hauts-de-Seine (92).
                    </motion.h2>

                    {/* Badges info - capacité & chambres */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
                      className="flex flex-nowrap items-center gap-2"
                    >
                      {/* Badge capacité - texte personnalisé par château */}
                      <div
                        className="inline-flex items-center gap-1.5"
                        style={{
                          background: `${colors.bronze}10`,
                          border: `2px solid ${colors.bronze}`,
                          padding: '6px 10px',
                          borderRadius: theme.effects.borderRadius.full,
                        }}
                      >
                        <Users className="w-3.5 h-3.5" style={{ color: colors.bronze }} />
                        <div
                          style={{
                            fontSize: '10px',
                            color: colors.bronze,
                            textTransform: "uppercase",
                            letterSpacing: '0.5px',
                            fontWeight: theme.typography.fontWeight.medium,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {slide.chateau.id === "1" && "Jusqu'à 280 pers. résidentiel"}
                          {slide.chateau.id === "2" && "Jusqu'à 180 pers. métro"}
                          {slide.chateau.id === "3" && "Jusqu'à 150 pers. classé"}
                          {slide.chateau.id === "4" && "Jusqu'à 350 pers. palace"}
                        </div>
                      </div>

                      {/* Badge chambres */}
                      <div
                        className="inline-flex items-center gap-1.5"
                        style={{
                          background: `${colors.bronze}10`,
                          border: `2px solid ${colors.bronze}`,
                          padding: '6px 10px',
                          borderRadius: theme.effects.borderRadius.full,
                        }}
                      >
                        <Bed className="w-3.5 h-3.5" style={{ color: colors.bronze }} />
                        <div
                          style={{
                            fontSize: '10px',
                            color: colors.bronze,
                            textTransform: "uppercase",
                            letterSpacing: '0.5px',
                            fontWeight: theme.typography.fontWeight.medium,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {slide.chateau.roomsTotal} Chambres
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* Navigation du slider - Indicateurs uniquement */}
        <div className="absolute bottom-8 left-0 right-0 z-20">
          <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
            <div className="flex items-center justify-center">
              {/* Indicateurs */}
              <div className="flex gap-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className="transition-all flex-shrink-0"
                    style={{
                      width: currentSlide === index ? "10px" : "3px",
                      height: "3px",
                      borderRadius: "50%",
                      background: currentSlide === index ? colors.gold : theme.colors.overlay.white30,
                      backdropFilter: `blur(${theme.effects.blur.sm})`,
                    }}
                    aria-label={`Aller au château ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mode Édition - DEV ONLY */}
        {isDev && (
          <div className="absolute top-4 right-4 z-50 flex flex-col gap-2">
            <button
              onClick={() => {
                setEditMode(!editMode);
                setTempPosition(null);
              }}
              className="px-4 py-2 rounded-lg font-semibold text-sm shadow-lg transition-all"
              style={{
                background: editMode ? colors.bronze : 'rgba(255, 255, 255, 0.9)',
                color: editMode ? 'white' : theme.colors.text.primary,
                border: `2px solid ${editMode ? colors.bronzeDark : colors.bronze}`,
              }}
            >
              {editMode ? '✓ Mode Édition' : '✏️ Éditer Focus'}
            </button>

            {editMode && (
              <div
                className="px-4 py-3 rounded-lg shadow-lg"
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(8px)',
                  minWidth: '240px',
                }}
              >
                <div className="text-xs font-semibold mb-2" style={{ color: theme.colors.text.primary }}>
                  Slide {currentSlide + 1}: {heroSlides[currentSlide].title}
                </div>
                <div className="text-xs mb-2" style={{ color: theme.colors.text.secondary }}>
                  Actuel: <span className="font-mono font-bold">{heroSlides[currentSlide].objectPosition}</span>
                </div>
                {tempPosition && (
                  <>
                    <div className="text-xs mb-3" style={{ color: colors.bronzeDark }}>
                      Nouveau: <span className="font-mono font-bold">{tempPosition}</span>
                    </div>

                    {/* Contrôles directionnels */}
                    <div className="mb-3">
                      <div className="text-xs font-semibold mb-2" style={{ color: theme.colors.text.primary }}>
                        Ajustement fin:
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div />
                        <button
                          onClick={() => adjustPosition(0, -5)}
                          className="px-2 py-1.5 rounded text-sm font-bold transition-all hover:scale-110"
                          style={{ background: colors.bronze, color: 'white' }}
                          title="Haut"
                        >
                          ↑
                        </button>
                        <div />
                        <button
                          onClick={() => adjustPosition(-5, 0)}
                          className="px-2 py-1.5 rounded text-sm font-bold transition-all hover:scale-110"
                          style={{ background: colors.bronze, color: 'white' }}
                          title="Gauche"
                        >
                          ←
                        </button>
                        <button
                          onClick={resetPosition}
                          className="px-2 py-1.5 rounded text-xs font-bold transition-all"
                          style={{ background: theme.colors.neutral.gray300, color: 'white' }}
                          title="Réinitialiser"
                        >
                          ⟲
                        </button>
                        <button
                          onClick={() => adjustPosition(5, 0)}
                          className="px-2 py-1.5 rounded text-sm font-bold transition-all hover:scale-110"
                          style={{ background: colors.bronze, color: 'white' }}
                          title="Droite"
                        >
                          →
                        </button>
                        <div />
                        <button
                          onClick={() => adjustPosition(0, 5)}
                          className="px-2 py-1.5 rounded text-sm font-bold transition-all hover:scale-110"
                          style={{ background: colors.bronze, color: 'white' }}
                          title="Bas"
                        >
                          ↓
                        </button>
                        <div />
                      </div>
                    </div>

                    <button
                      onClick={copyPosition}
                      className="w-full px-3 py-2 rounded text-xs font-semibold transition-all hover:opacity-90"
                      style={{
                        background: colors.bronzeDark,
                        color: 'white',
                      }}
                    >
                      📋 Copier la position
                    </button>
                  </>
                )}
                <div className="text-xs mt-2 opacity-70" style={{ color: theme.colors.text.secondary }}>
                  Cliquez sur l'image pour définir le point focal
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ============================================ */}
      {/* SECTION 2: POURQUOI CHOISIR NOS CHÂTEAUX */}
      {/* ============================================ */}
      <SectionWrapper bg={theme.colors.neutral.gray50}>
        <SectionHeader
          title="Pourquoi Choisir Nos Châteaux ?"
          subtitle="Une expérience premium clé en main pour vos événements d'entreprise"
        />

        {/* Grille USP - Centrée */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 max-w-7xl mx-auto items-stretch">
          {[
            {
              icon: <Award className="w-8 h-8" />,
              title: "Lieux Classés & Protégés",
              description: "4 domaines classés Monuments Historiques ou Sites Remarquables"
            },
            {
              icon: <Clock className="w-8 h-8" />,
              title: "Réservation Express",
              description: "Confirmation sous 48h • Visite virtuelle gratuite sur demande"
            },
            {
              icon: <Shield className="w-8 h-8" />,
              title: "Paiement Sécurisé",
              description: "Règlement en 3 fois sans frais • Annulation flexible jusqu'à 30 jours"
            },
            {
              icon: <TrendingUp className="w-8 h-8" />,
              title: "97% Recommandent",
              description: "Plus de 450 événements organisés avec succès depuis 2010"
            },
          ].map((usp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <Card variant="hover" padding="lg" hoverable className="h-full w-full flex flex-col items-center justify-start text-center">
                <div
                  className="flex items-center justify-center mb-4"
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: theme.effects.borderRadius.full,
                    background: `${colors.bronze}15`,
                    color: colors.bronze,
                  }}
                >
                  {usp.icon}
                </div>
                <h3
                  style={{
                    fontSize: theme.typography.fontSize.lg,
                    fontWeight: theme.typography.fontWeight.semibold,
                    color: theme.colors.text.primary,
                    marginBottom: spacing.xs,
                  }}
                >
                  {usp.title}
                </h3>
                <p
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.text.muted,
                    lineHeight: theme.typography.lineHeight.relaxed,
                    marginBottom: spacing.lg,
                  }}
                >
                  {usp.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* ============================================ */}
      {/* SECTION 3: CHÂTEAUX D'EXCEPTION */}
      {/* ============================================ */}
      <SectionWrapper>
        <SectionHeader
          icon={
            <>
              <Sparkles className="w-6 h-6" style={{ color: colors.bronze }} />
              <span
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  textTransform: "uppercase",
                  letterSpacing: theme.typography.letterSpacing.ultra,
                  fontWeight: theme.typography.fontWeight.bold,
                  color: colors.bronze,
                }}
              >
                Notre Sélection Exclusive
              </span>
            </>
          }
          title="4 Châteaux d'Exception"
        />

        {/* Liste des châteaux */}
        <div className="max-w-7xl mx-auto" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {chateaux.map((chateau, index) => (
            <motion.div
              key={chateau.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center ${index % 2 !== 0 ? 'lg:grid-flow-dense' : ''}`}>

                {/* Image avec galerie */}
                <div className={`relative ${index % 2 !== 0 ? 'lg:col-start-2' : ''}`}>
                  <ImageGallery
                    images={chateau.images.galerie}
                    name={chateau.nom}
                    chateauId={chateau.id}
                    selectedIndex={selectedImageIndex[chateau.id] ?? 0}
                    onSelectImage={(i) => setSelectedImageIndex({ ...selectedImageIndex, [chateau.id]: i })}
                  />
                </div>

                {/* Contenu */}
                <div className={index % 2 !== 0 ? 'lg:col-start-1 lg:row-start-1' : ''}>

                  {/* Titre */}
                  <h3
                    style={{
                      fontSize: "clamp(2rem, 4vw, 3rem)",
                      fontWeight: theme.typography.fontWeight.light,
                      fontStyle: "italic",
                      color: theme.colors.text.primary,
                      fontFamily: theme.typography.fonts.heading,
                      marginBottom: spacing.sm,
                    }}
                  >
                    {chateau.nom}
                  </h3>

                  {/* Type architectural */}
                  <p
                    style={{
                      fontSize: theme.typography.fontSize.sm,
                      color: colors.bronze,
                      textTransform: "uppercase",
                      letterSpacing: theme.typography.letterSpacing.wider,
                      fontWeight: theme.typography.fontWeight.medium,
                      marginBottom: spacing["2xl"],
                    }}
                  >
                    {chateau.styleArchitectural}
                  </p>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: theme.typography.fontSize.lg,
                      color: theme.colors.text.secondary,
                      lineHeight: theme.typography.lineHeight.relaxed,
                      marginBottom: spacing["2xl"],
                    }}
                  >
                    {chateau.description}
                  </p>

                  {/* Badges (Localisation + Capacité + Chambres) */}
                  <div className="flex flex-wrap items-center gap-3 mb-8">
                    <div
                      className="inline-flex items-center gap-2"
                      style={{
                        background: theme.colors.neutral.white,
                        border: `1px solid ${theme.colors.neutral.gray300}`,
                        padding: '8px 12px',
                        borderRadius: theme.effects.borderRadius.full,
                      }}
                    >
                      <MapPin className="w-4 h-4" style={{ color: colors.bronze }} />
                      <div
                        style={{
                          fontSize: '11px',
                          color: theme.colors.text.primary,
                          fontWeight: theme.typography.fontWeight.medium,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {chateau.region}
                      </div>
                    </div>

                    <div
                      className="inline-flex items-center gap-2"
                      style={{
                        background: `${colors.bronze}10`,
                        border: `2px solid ${colors.bronze}`,
                        padding: '8px 12px',
                        borderRadius: theme.effects.borderRadius.full,
                      }}
                    >
                      <Users className="w-4 h-4" style={{ color: colors.bronze }} />
                      <div
                        style={{
                          fontSize: '11px',
                          color: colors.bronze,
                          textTransform: "uppercase",
                          letterSpacing: '0.5px',
                          fontWeight: theme.typography.fontWeight.medium,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {chateau.capacite.min}-{chateau.capacite.max} personnes
                      </div>
                    </div>

                    <div
                      className="inline-flex items-center gap-2"
                      style={{
                        background: `${colors.bronze}10`,
                        border: `2px solid ${colors.bronze}`,
                        padding: '8px 12px',
                        borderRadius: theme.effects.borderRadius.full,
                      }}
                    >
                      <Bed className="w-4 h-4" style={{ color: colors.bronze }} />
                      <div
                        style={{
                          fontSize: '11px',
                          color: colors.bronze,
                          textTransform: "uppercase",
                          letterSpacing: '0.5px',
                          fontWeight: theme.typography.fontWeight.medium,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {chateau.roomsTotal} Chambres
                      </div>
                    </div>
                  </div>

                  {/* Points forts */}
                  <div style={{ marginTop: spacing.xl, marginBottom: spacing["2xl"] }}>
                    <h4
                      style={{
                        fontSize: theme.typography.fontSize.base,
                        fontWeight: theme.typography.fontWeight.semibold,
                        color: theme.colors.text.primary,
                        marginBottom: spacing.md,
                      }}
                    >
                      Points Forts
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {chateau.atouts.map((atout, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div
                            className="flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{
                              width: "20px",
                              height: "20px",
                              borderRadius: theme.effects.borderRadius.full,
                              background: colors.bronze,
                            }}
                          >
                            <Check className="w-3 h-3" style={{ color: theme.colors.neutral.white }} />
                          </div>
                          <span
                            style={{
                              fontSize: theme.typography.fontSize.sm,
                              color: theme.colors.text.secondary,
                            }}
                          >
                            {atout}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Boutons */}
                  <div className="flex flex-col sm:flex-row gap-4" style={{ marginBottom: spacing.xl }}>
                    <Button
                      href={`/chateaux/${chateau.slug}`}
                      variant="primary"
                      size="lg"
                      icon={<ArrowRight className="w-5 h-5" />}
                    >
                      Visiter ce Château
                    </Button>
                    <Button
                      href="/devis"
                      variant="outline"
                      size="lg"
                      icon={<Calendar className="w-5 h-5" />}
                    >
                      Demander un Devis
                    </Button>
                  </div>

                  {/* Avis */}
                  <div
                    className="flex items-center gap-4 pt-6 border-t"
                    style={{
                      borderColor: theme.colors.neutral.gray200,
                      marginTop: spacing.xl
                    }}
                  >
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5" style={{ fill: colors.gold, color: colors.gold }} />
                      ))}
                    </div>
                    <span style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.muted }}>
                      4.9/5 · Basé sur 120+ avis
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* ============================================ */}
      {/* SECTION 4: TÉMOIGNAGES CLIENTS */}
      {/* ============================================ */}
      <ReviewsSection />

      {/* ============================================ */}
      {/* SECTION 5: CTA FINALE - MODULABLE */}
      {/* ============================================ */}
      <section
        className="relative overflow-hidden flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${colors.bronze} 0%, ${colors.bronzeDark} 100%)`,
          paddingTop: SECTION_STYLES.cta.padding.top,
          paddingBottom: SECTION_STYLES.cta.padding.bottom,
        }}
      >
        {/* Pattern décoratif */}
        <div className="absolute inset-0 opacity-10">
          <div style={{
            backgroundImage: `radial-gradient(circle, ${theme.colors.neutral.white} 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            width: "100%",
            height: "100%",
          }} />
        </div>

        <div className="w-full relative z-10 flex items-center justify-center">
          <div
            className="flex flex-col items-center justify-center w-full"
            style={{ maxWidth: '1280px', padding: '0 clamp(1rem, 3vw, 1.5rem)' }}
          >
            {/* Icône */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              style={{ marginBottom: SECTION_STYLES.cta.spacing.iconToTitle }}
            >
              <Sparkles
                style={{
                  width: "56px",
                  height: "56px",
                  color: theme.colors.neutral.white,
                }}
              />
            </motion.div>

            {/* Titre */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center w-full"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                fontWeight: theme.typography.fontWeight.light,
                fontStyle: "italic",
                color: theme.colors.neutral.white,
                fontFamily: theme.typography.fonts.heading,
                lineHeight: theme.typography.lineHeight.tight,
                marginBottom: SECTION_STYLES.cta.spacing.titleToSubtitle,
              }}
            >
              Prêt à Organiser Votre Événement ?
            </motion.h2>

            {/* Sous-titre */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center w-full"
              style={{
                fontSize: theme.typography.fontSize.xl,
                color: theme.colors.overlay.white90,
                lineHeight: theme.typography.lineHeight.relaxed,
                maxWidth: "700px",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: SECTION_STYLES.cta.spacing.subtitleToBadges,
              }}
            >
              Nos experts vous accompagnent gratuitement dans le choix du château idéal.
              Réponse sous 2h et devis personnalisé sous 24h.
            </motion.p>

            {/* Badges USP */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-wrap items-center justify-center gap-4 w-full"
              style={{ marginBottom: SECTION_STYLES.cta.spacing.badgesToButtons }}
            >
              {[
                { icon: <Phone />, text: "Réponse sous 2h" },
                { icon: <Calendar />, text: "Visite virtuelle gratuite" },
                { icon: <Shield />, text: "Garantie satisfaction" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-full"
                  style={{
                    background: theme.colors.overlay.white20,
                    backdropFilter: `blur(${theme.effects.blur.sm})`,
                    border: `1px solid ${theme.colors.overlay.white30}`,
                    color: theme.colors.neutral.white,
                    padding: spacing.lg,
                  }}
                >
                  <div style={{ width: "16px", height: "16px" }}>
                    {item.icon}
                  </div>
                  <span style={{
                    fontSize: theme.typography.fontSize.sm,
                    fontWeight: theme.typography.fontWeight.medium
                  }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Boutons CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
              style={{ marginBottom: SECTION_STYLES.cta.spacing.buttonsToNote }}
            >
              <Button
                href="/devis"
                variant="secondary"
                size="lg"
                icon={<ArrowRight className="w-6 h-6" />}
              >
                Obtenir Mon Devis Gratuit
              </Button>
              <Button
                href="/contact"
                variant="ghost"
                size="lg"
                icon={<Phone className="w-6 h-6" />}
                style={{
                  color: theme.colors.neutral.white,
                  borderColor: theme.colors.overlay.white30,
                }}
              >
                Appeler un Expert
              </Button>
            </motion.div>

            {/* Note d'urgence */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-center w-full"
              style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.overlay.white70,
              }}
            >
              ⚡ Places limitées : Réservez dès maintenant pour garantir vos dates
            </motion.p>
          </div>
        </div>
      </section>
    </div>
  );
}
