"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Users, ArrowRight, Check, Sparkles, Award, Star, Phone, Calendar, Shield, TrendingUp, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { chateaux } from "@/data/chateaux";
import { theme } from "@/config/theme";
import { colors, spacing } from "@/config/themeHelpers";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { TestimonialsSection } from "@/components/TestimonialsSection";
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
// COMPOSANT PRINCIPAL
// ============================================
export default function ChateauxPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<{ [key: string]: number }>({});

  // Auto-play du slider
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % chateaux.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % chateaux.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + chateaux.length) % chateaux.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-white">

      {/* ============================================ */}
      {/* SECTION 1: HERO SLIDER */}
      {/* ============================================ */}
      <section style={{ height: SECTION_STYLES.hero.height, minHeight: SECTION_STYLES.hero.minHeight }} className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          {chateaux.map((chateau, index) => (
            index === currentSlide && (
              <motion.div
                key={chateau.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
              >
                {/* Image de fond */}
                <div className="absolute inset-0">
                  <Image
                    src={chateau.images.hero[0]}
                    alt={chateau.nom}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    quality={95}
                    sizes="100vw"
                    style={{ filter: 'saturate(1.2) contrast(1.1) brightness(1.05)' }}
                  />
                </div>

                {/* Gradient subtil en bas */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />

                {/* Contenu à gauche avec badge au-dessus */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-center" style={{ paddingLeft: 'clamp(1rem, 5vw, 3rem)' }}>
                  {/* Badge lieu au-dessus du conteneur */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="flex justify-center"
                    style={{ maxWidth: '480px', width: '100%', marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)' }}
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
                        {chateau.nom}
                      </div>
                      <div style={{ color: colors.bronze }}>·</div>
                      <div
                        className="font-medium"
                        style={{
                          fontSize: theme.typography.fontSize.xs,
                          color: theme.colors.neutral.gray300,
                        }}
                      >
                        {chateau.region}
                      </div>
                    </Badge>
                  </motion.div>

                  {/* Conteneur principal */}
                  <div
                    className="text-left rounded-2xl w-full"
                    style={{
                      maxWidth: '480px',
                      background: 'rgba(255, 255, 255, 0.85)',
                      backdropFilter: 'blur(12px)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                      padding: 'clamp(1rem, 3.5vw, 1.75rem) clamp(1rem, 2.5vw, 1.5rem)',
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
                      3 Domaines d'exception, privatisables pour vos événements d'entreprise. Oise (60) · Yvelines (78) · Hauts-de-Seine (92).
                    </motion.h2>

                    {/* Badge capacité - texte personnalisé par château */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
                      className="inline-flex items-center gap-2"
                      style={{
                        background: `${colors.bronze}10`,
                        border: `2px solid ${colors.bronze}`,
                        padding: spacing.md,
                        borderRadius: theme.effects.borderRadius.full,
                      }}
                    >
                      <Users className="w-4 h-4" style={{ color: colors.bronze }} />
                      <div
                        style={{
                          fontSize: theme.typography.fontSize.xs,
                          color: colors.bronze,
                          textTransform: "uppercase",
                          letterSpacing: theme.typography.letterSpacing.wider,
                          fontWeight: theme.typography.fontWeight.medium,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {chateau.id === "1" && "Jusqu'à 280 pers. en résidentiel"}
                        {chateau.id === "2" && "Jusqu'à 180 pers. accessible métro"}
                        {chateau.id === "3" && "Jusqu'à 150 pers. site classé"}
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
              <div className="flex gap-3">
                {chateaux.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className="transition-all"
                    style={{
                      width: currentSlide === index ? "48px" : "12px",
                      height: "12px",
                      borderRadius: theme.effects.borderRadius.full,
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto items-stretch justify-items-center">
          {[
            {
              icon: <Award className="w-8 h-8" />,
              title: "Lieux Classés & Protégés",
              description: "3 domaines classés Monuments Historiques ou Sites Remarquables"
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
              <Card variant="hover" padding="lg" hoverable className="h-full w-full flex flex-col items-center justify-center text-center">
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
          title="3 Châteaux d'Exception"
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

                  {/* Badges (Localisation + Capacité) - Même hauteur */}
                  <div className="flex flex-wrap items-center gap-4 mb-8">
                    <Badge variant="outline" size="md" icon={<MapPin className="w-4 h-4" />}>
                      {chateau.region}
                    </Badge>

                    <div
                      className="inline-flex items-center gap-3"
                      style={{
                        background: `${colors.bronze}10`,
                        border: `2px solid ${colors.bronze}`,
                        padding: spacing.lg,
                        borderRadius: theme.effects.borderRadius.full,
                        height: "fit-content",
                      }}
                    >
                      <Users className="w-5 h-5" style={{ color: colors.bronze }} />
                      <div
                        style={{
                          fontSize: theme.typography.fontSize.xs,
                          color: colors.bronze,
                          textTransform: "uppercase",
                          letterSpacing: theme.typography.letterSpacing.wider,
                          fontWeight: theme.typography.fontWeight.medium,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {chateau.capacite.min}-{chateau.capacite.max} personnes
                      </div>
                    </div>
                  </div>

                  {/* Points forts */}
                  <div style={{ marginBottom: spacing["2xl"] }}>
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
      <TestimonialsSection />

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
