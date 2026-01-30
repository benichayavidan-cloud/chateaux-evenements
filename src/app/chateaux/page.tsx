/**
 * PAGE CHÂTEAUX - Liste complète des châteaux
 * Migré avec le nouveau design system v2
 */

'use client';

import { Navigation, Footer } from '@/components/sections-v2';
import { Section, Container, Hero } from '@/components/layout-v2';
import { Text, Card, Badge, Button } from '@/components/ui-v2';
import { MapPin, Users, Bed, Award, Sparkles, Calendar, ArrowRight, Phone, Shield, Star } from 'lucide-react';
import { theme } from '@/design-system/tokens';
import { chateaux } from "@/data/chateaux";
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from "react";
import Image from "next/image";

// URLs des images
const IMAGES_BASE = "/Users/avidanbenichay/Documents/Mes Projets d'apps/Mes projets/SELECT CHATEAUX/SITE-WEB/IMAGES";
const SUPABASE_URL = "https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images";

const FOLDER_MAPPING: Record<string, string> = {
  "Abbaye des Veaux de cernay": "chevreuse",
  "Chateau de Montvillargene": "montvillargene",
  "Domaine Reine Margot": "hauts-de-seine",
  "Chateau Mont Royal": "mont-royal",
};

const getImageUrl = (folder: string, filename: string) => {
  if (process.env.NODE_ENV === 'production') {
    const supabaseFolder = FOLDER_MAPPING[folder] || folder;
    return `${SUPABASE_URL}/${supabaseFolder}/${encodeURIComponent(filename)}`;
  }
  return `/api/images/preview?path=${encodeURIComponent(`${IMAGES_BASE}/${folder}/${filename}`)}`;
};

// Slides pour le hero
const heroSlides = [
  {
    image: getImageUrl("Abbaye des Veaux de cernay", "abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-abbaye-vaux-cernay-78-yvelines-vue-aerienne-domaine-parc-etang-jardins.webp"),
    title: "Abbaye Millénaire",
    region: "Vallée de Chevreuse",
    chateau: chateaux[2],
    objectPosition: "52% 100%",
  },
  {
    image: getImageUrl("Chateau Mont Royal", "chateau-mont-royal-60-oise-chantilly-vue-aerienne-chateau-lever-soleil-foret-architecture-classique.webp"),
    title: "Palais Royal",
    region: "Forêt de Chantilly",
    chateau: chateaux[3],
    objectPosition: "53% 100%",
  },
  {
    image: getImageUrl("Chateau de Montvillargene", "chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-chateau-montvillargene-60-oise-facade-chateau-architecture-classique-francaise.webp"),
    title: "Château de Montvillargene",
    region: "Oise",
    chateau: chateaux[0],
    objectPosition: "50% 100%",
  },
  {
    image: getImageUrl("Domaine Reine Margot", "domaine-reine-margot-92-hauts-de-seine-facade-jour-vue-aerienne-terrasse-jardin-parasols-blancs.webp"),
    title: "Refuge Historique",
    region: "Hauts-de-Seine",
    chateau: chateaux[1],
    objectPosition: "50% 100%",
  },
];

// Navigation
const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'Nos Châteaux', href: '/chateaux' },
  { label: 'Événements', href: '/evenements' },
  { label: 'Team Building', href: '/team-building' },
  { label: 'Contact', href: '/contact' },
];

// Footer
const footerSections = [
  {
    title: 'Navigation',
    links: [
      { label: 'Nos Châteaux', href: '/chateaux' },
      { label: 'Événements', href: '/evenements' },
      { label: 'Team Building', href: '/team-building' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Nos Services',
    links: [
      { label: 'Séminaires Résidentiels', href: '/evenements/seminaires' },
      { label: 'Journées d\'Étude', href: '/evenements/journees-etude' },
      { label: 'Conventions', href: '/evenements/conventions' },
      { label: 'Team Building', href: '/team-building' },
    ],
  },
];

export default function ChateauxPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play du slider
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  return (
    <>
      {/* Navigation */}
      <Navigation
        logo={
          <Text
            variant="h4"
            style={{
              fontFamily: theme.typography.fonts.heading,
              fontStyle: 'italic',
              color: theme.colors.primary.bronze,
            }}
          >
            SelectChâteaux
          </Text>
        }
        links={navLinks}
        cta={{
          label: 'Devis Gratuit',
          href: '/devis',
        }}
        sticky
        transparent
      />

      {/* Hero Slider */}
      <section style={{ height: '75vh', minHeight: '600px' }} className="relative overflow-hidden">
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
                <div className="absolute inset-0">
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
                      objectPosition: slide.objectPosition
                    }}
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />

                <div className="absolute left-0 top-0 h-full flex flex-col justify-center" style={{ paddingLeft: 'clamp(0.75rem, 4vw, 3rem)' }}>
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
                          background: theme.colors.primary.bronze,
                          filter: "drop-shadow(0 0 4px rgba(163, 126, 44, 0.8))",
                        }}
                      />
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
                        color: theme.colors.neutral.gray900,
                        marginBottom: theme.spacing.xs,
                      }}
                    >
                      Location de Châteaux pour Séminaires : La Collection Île-de-France
                    </motion.h1>

                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        fontWeight: theme.typography.fontWeight.normal,
                        color: theme.colors.neutral.gray600,
                        lineHeight: theme.typography.lineHeight.relaxed,
                        marginBottom: theme.spacing.lg,
                      }}
                    >
                      4 Domaines d'exception, privatisables pour vos événements d'entreprise. Oise (60) · Yvelines (78) · Hauts-de-Seine (92).
                    </motion.h2>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
                      className="flex flex-nowrap items-center gap-2"
                    >
                      <div
                        className="inline-flex items-center gap-1.5"
                        style={{
                          background: `${theme.colors.primary.bronze}10`,
                          border: `2px solid ${theme.colors.primary.bronze}`,
                          padding: '6px 10px',
                          borderRadius: theme.effects.borderRadius.full,
                        }}
                      >
                        <Users className="w-3.5 h-3.5" style={{ color: theme.colors.primary.bronze }} />
                        <div
                          style={{
                            fontSize: '10px',
                            color: theme.colors.primary.bronze,
                            textTransform: "uppercase",
                            letterSpacing: '0.5px',
                            fontWeight: theme.typography.fontWeight.medium,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {slide.chateau.id === "1" && "Jusqu'à 280 pers. résidentiel"}
                          {slide.chateau.id === "2" && "Jusqu'à 180 pers. métro"}
                          {slide.chateau.id === "3" && "Jusqu'à 150 pers. classé"}
                          {slide.chateau.id === "4" && "Jusqu'à 200 pers. palace"}
                        </div>
                      </div>

                      <div
                        className="inline-flex items-center gap-1.5"
                        style={{
                          background: `${theme.colors.primary.bronze}10`,
                          border: `2px solid ${theme.colors.primary.bronze}`,
                          padding: '6px 10px',
                          borderRadius: theme.effects.borderRadius.full,
                        }}
                      >
                        <Bed className="w-3.5 h-3.5" style={{ color: theme.colors.primary.bronze }} />
                        <div
                          style={{
                            fontSize: '10px',
                            color: theme.colors.primary.bronze,
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

        {/* Indicateurs */}
        <div className="absolute bottom-8 left-0 right-0 z-20">
          <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
            <div className="flex items-center justify-center">
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
                      background: currentSlide === index ? theme.colors.primary.gold : theme.colors.neutral.gray400,
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

      {/* Section Pourquoi Choisir */}
      <Section spacing="xl" background="gradient">
        <Container size="xl">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: theme.spacing['4xl'] }}>
            <Text variant="h2" style={{ marginBottom: theme.spacing.md }}>
              Pourquoi Choisir Nos Châteaux ?
            </Text>
            <Text variant="bodyLarge" color="muted" style={{ maxWidth: '800px', margin: '0 auto' }}>
              Une expérience premium clé en main pour vos événements d'entreprise
            </Text>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: <Award className="w-8 h-8" />,
                title: "Lieux Classés & Protégés",
                description: "4 domaines classés Monuments Historiques ou Sites Remarquables"
              },
              {
                icon: <Calendar className="w-8 h-8" />,
                title: "Réservation Express",
                description: "Confirmation sous 48h • Visite préalable sur demande"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Team Building Inclus",
                description: "Activités sur place • Coordination événement • Accompagnement personnalisé"
              },
              {
                icon: <Star className="w-8 h-8" />,
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
              >
                <div
                  style={{
                    padding: theme.spacing.xl,
                    background: theme.colors.neutral.white,
                    borderRadius: theme.effects.borderRadius.xl,
                    border: `1px solid ${theme.colors.neutral.gray200}`,
                    textAlign: 'center',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                  className="hover:shadow-lg transition-shadow"
                >
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: theme.effects.borderRadius.full,
                      background: `${theme.colors.primary.bronze}15`,
                      color: theme.colors.primary.bronze,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: theme.spacing.md,
                    }}
                  >
                    {usp.icon}
                  </div>
                  <Text variant="h5" style={{ marginBottom: theme.spacing.sm }}>
                    {usp.title}
                  </Text>
                  <Text variant="body" color="muted">
                    {usp.description}
                  </Text>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Section Châteaux */}
      <Section spacing="xl" background="white">
        <Container size="xl">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: theme.spacing['4xl'] }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: theme.spacing.sm, marginBottom: theme.spacing.md }}>
              <Sparkles className="w-6 h-6" style={{ color: theme.colors.primary.bronze }} />
              <Text variant="caption" style={{ color: theme.colors.primary.bronze, textTransform: 'uppercase', letterSpacing: theme.typography.letterSpacing.wider, fontWeight: theme.typography.fontWeight.bold }}>
                Notre Sélection Exclusive
              </Text>
            </div>
            <Text variant="h2">
              4 Châteaux d'Exception
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {chateaux.map((chateau, index) => (
              <motion.div
                key={chateau.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  image={chateau.images.card}
                  title={chateau.nom}
                  description={chateau.description}
                  badge={chateau.region}
                  features={chateau.atouts.slice(0, 3)}
                  href={`/chateaux/${chateau.slug}`}
                  variant="hover-overlay"
                  imageHeight="400px"
                  footer={
                    <div style={{ display: 'flex', gap: theme.spacing.lg, flexWrap: 'wrap', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.xs }}>
                        <Users className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                        <Text variant="caption">{chateau.capacite.min}-{chateau.capacite.max} pers.</Text>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.xs }}>
                        <Bed className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                        <Text variant="caption">{chateau.roomsTotal} chambres</Text>
                      </div>
                    </div>
                  }
                />
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <section
        style={{
          background: `linear-gradient(135deg, ${theme.colors.primary.bronze} 0%, ${theme.colors.primary.bronzeDark} 100%)`,
          padding: `${theme.spacing['4xl']} 0`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div style={{
            backgroundImage: `radial-gradient(circle, ${theme.colors.neutral.white} 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            width: "100%",
            height: "100%",
          }} />
        </div>
        <Container size="lg">
          <div className="section-header" style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
            <Sparkles className="w-12 h-12" style={{ color: theme.colors.neutral.white, marginBottom: theme.spacing.lg, marginLeft: 'auto', marginRight: 'auto' }} />
            <Text
              variant="h2"
              style={{
                color: theme.colors.neutral.white,
                marginBottom: theme.spacing.md,
              }}
            >
              Prêt à Organiser Votre Événement ?
            </Text>
            <Text
              variant="bodyLarge"
              style={{
                color: theme.colors.neutral.white,
                maxWidth: '700px',
                margin: `0 auto ${theme.spacing.xl}`,
                opacity: 0.9,
              }}
            >
              Nos experts vous accompagnent gratuitement dans le choix du château idéal.
              Réponse sous 2h et devis personnalisé sous 24h.
            </Text>

            <div style={{ display: 'flex', gap: theme.spacing.md, marginBottom: theme.spacing.xl, flexWrap: 'wrap', justifyContent: 'center' }}>
              {[
                { icon: <Phone />, text: "Réponse sous 2h" },
                { icon: <Calendar />, text: "Visite préalable gratuite" },
                { icon: <Shield />, text: "Garantie satisfaction" },
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme.spacing.sm,
                    padding: theme.spacing.lg,
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: theme.effects.borderRadius.full,
                    color: theme.colors.neutral.white,
                  }}
                >
                  <div style={{ width: '16px', height: '16px' }}>
                    {item.icon}
                  </div>
                  <Text variant="caption" style={{ color: theme.colors.neutral.white, fontWeight: theme.typography.fontWeight.medium }}>
                    {item.text}
                  </Text>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: theme.spacing.md, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button variant="secondary" size="lg">
                Obtenir Mon Devis Gratuit
              </Button>
              <Button
                variant="outline"
                size="lg"
                style={{
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  color: theme.colors.neutral.white,
                }}
              >
                Appeler un Expert
              </Button>
            </div>

            <Text
              variant="caption"
              style={{
                color: theme.colors.neutral.white,
                marginTop: theme.spacing.lg,
                opacity: 0.7,
              }}
            >
              ⚡ Places limitées : Réservez dès maintenant pour garantir vos dates
            </Text>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <Footer
        logo={
          <Text
            variant="h5"
            style={{
              fontFamily: theme.typography.fonts.heading,
              fontStyle: 'italic',
              color: theme.colors.primary.bronze,
            }}
          >
            SelectChâteaux
          </Text>
        }
        description="L'excellence événementielle dans des châteaux d'exception à travers la France."
        sections={footerSections}
        contact={{
          address: '60 Rue François 1er, 75008 Paris, France',
          phone: '07 57 99 11 46',
          email: 'seminaires@selectchateaux.com',
        }}
        social={{
          linkedin: 'https://linkedin.com/company/select-chateaux',
        }}
        legalLinks={[
          { label: 'Mentions Légales', href: '/mentions-legales' },
          { label: 'Confidentialité', href: '/confidentialite' },
          { label: 'CGV', href: '/cgv' },
        ]}
      />

      <style jsx global>{`
        .section-header {
          text-align: center !important;
          margin-left: auto !important;
          margin-right: auto !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
        }
        .section-header * {
          text-align: center !important;
        }
      `}</style>
    </>
  );
}
