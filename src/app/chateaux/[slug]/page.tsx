/**
 * PAGE CHÂTEAU INDIVIDUEL - Détail d'un château
 * Migré avec le nouveau design system v2
 */

'use client';

import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Users, Check, Sparkles, Calendar, Award, Bed, Building2, Plus, Minus, HelpCircle } from "lucide-react";
import { chateaux as chateauxData } from "@/data/chateaux";
import { Navigation, Footer } from '@/components/sections-v2';
import { Section, Container } from '@/components/layout-v2';
import { Text, Badge, Button } from '@/components/ui-v2';
import { theme } from '@/design-system/tokens';
import { useState } from "react";

// Navigation & Footer
const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'Nos Châteaux', href: '/chateaux' },
  { label: 'Événements', href: '/evenements' },
  { label: 'Team Building', href: '/team-building' },
  { label: 'Contact', href: '/contact' },
];

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

export default function ChateauPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const chateau = chateauxData.find(c => c.slug === slug);

  if (!chateau) {
    notFound();
  }

  // Helper pour obtenir l'index de l'image d'hébergement selon le château
  const getBedroomImageIndex = (chateauId: string): number => {
    const mapping: Record<string, number> = {
      "1": 2,
      "2": 0,
      "3": 0,
      "4": 1,
      "5": 0,
      "6": 0,
      "7": 0,
    };
    return mapping[chateauId] ?? 0;
  };

  // Helper pour obtenir l'index de l'image de salle de réunion selon le château
  const getMeetingRoomImageIndex = (chateauId: string): number => {
    const mapping: Record<string, number> = {
      "1": 1,
      "2": 5,
      "3": 6,
      "4": 3,
      "5": 1,
      "6": 1,
      "7": 1,
    };
    return mapping[chateauId] ?? 1;
  };

  return (
    <>
      {/* Schema JSON-LD pour SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Place",
            "name": chateau.seoH1,
            "description": chateau.descriptionLongue,
            "url": `https://www.selectchateaux.com/chateaux/${chateau.slug}`,
            "address": {
              "@type": "PostalAddress",
              "addressRegion": chateau.region,
              "addressCountry": "FR"
            },
            "image": [...chateau.images.hero, ...chateau.images.galerie],
            "amenityFeature": chateau.atouts.map((atout) => ({
              "@type": "LocationFeatureSpecification",
              "name": atout,
              "value": true
            })),
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "120",
              "bestRating": "5",
              "worstRating": "1"
            }
          })
        }}
      />

      {/* Schema JSON-LD FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": chateau.faq.map((item) => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
              }
            }))
          })
        }}
      />

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

      {/* Hero Section */}
      <div style={{ height: '75vh', minHeight: '600px' }} className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={chateau.images.hero[0]}
            alt={`${chateau.seoH1} - Vue principale`}
            fill
            className="object-cover"
            priority
            quality={85}
            sizes="100vw"
            style={{
              filter: 'saturate(1.2) contrast(1.1) brightness(1.05)',
              objectPosition: "center"
            }}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />

        <div className="absolute inset-0 flex items-center justify-center md:justify-start px-5 sm:px-8 md:px-12">
          <div className="flex flex-col items-center md:items-start w-full" style={{ maxWidth: '520px', gap: 'clamp(1rem, 2.5vw, 1.5rem)' }}>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex justify-center md:justify-start w-full"
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
                    fontSize: 'clamp(0.75rem, 2vw, 0.8125rem)',
                    color: theme.colors.neutral.gray300,
                  }}
                >
                  {chateau.region}
                </div>
              </Badge>
            </motion.div>

            <div
              className="text-center md:text-left rounded-2xl w-full"
              style={{
                background: 'rgba(255, 255, 255, 0.90)',
                backdropFilter: 'blur(14px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                padding: 'clamp(1.5rem, 4vw, 2rem) clamp(1.25rem, 3.5vw, 1.75rem)',
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.05 }}
                className="inline-flex items-center gap-2"
                style={{
                  padding: 'clamp(0.375rem, 1vw, 0.5rem) clamp(0.75rem, 2vw, 1rem)',
                  background: `linear-gradient(135deg, ${theme.colors.primary.bronze}12, ${theme.colors.primary.gold}08)`,
                  border: `1px solid ${theme.colors.primary.bronze}40`,
                  borderRadius: theme.effects.borderRadius.full,
                  marginBottom: 'clamp(0.75rem, 2vw, 1rem)',
                }}
              >
                <div
                  style={{
                    fontSize: 'clamp(0.5625rem, 1.3vw, 0.625rem)',
                    fontWeight: theme.typography.fontWeight.bold,
                    color: theme.colors.primary.bronze,
                    letterSpacing: theme.typography.letterSpacing.widest,
                    textTransform: 'uppercase',
                  }}
                >
                  Référence Confidentielle
                </div>
                <div
                  style={{
                    fontSize: 'clamp(0.625rem, 1.5vw, 0.6875rem)',
                    fontWeight: theme.typography.fontWeight.semibold,
                    color: theme.colors.primary.bronzeDark,
                    letterSpacing: theme.typography.letterSpacing.wide,
                    fontFamily: 'monospace',
                  }}
                >
                  {chateau.ref}
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
                style={{
                  fontSize: 'clamp(1.375rem, 3vw, 2rem)',
                  fontWeight: theme.typography.fontWeight.light,
                  fontStyle: 'italic',
                  fontFamily: theme.typography.fonts.heading,
                  lineHeight: 1.25,
                  color: theme.colors.neutral.gray900,
                  marginBottom: 'clamp(0.75rem, 2vw, 1rem)',
                }}
              >
                {chateau.seoH1}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
                style={{
                  fontSize: 'clamp(0.9375rem, 2.2vw, 1rem)',
                  color: theme.colors.neutral.gray600,
                  fontWeight: theme.typography.fontWeight.normal,
                  lineHeight: 1.6,
                  marginBottom: 'clamp(1.25rem, 3vw, 1.5rem)',
                }}
              >
                {chateau.accrocheHero}
              </motion.p>

              <div className="flex flex-nowrap gap-2 justify-center md:justify-start">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
                  className="inline-flex items-center gap-1.5"
                  style={{
                    background: `${theme.colors.primary.bronze}10`,
                    border: `2px solid ${theme.colors.primary.bronze}`,
                    padding: 'clamp(6px, 1.5vw, 10px) clamp(10px, 2vw, 14px)',
                    borderRadius: theme.effects.borderRadius.full,
                  }}
                >
                  <Users className="w-3.5 h-3.5" style={{ color: theme.colors.primary.bronze }} />
                  <div
                    style={{
                      fontSize: 'clamp(10px, 1.6vw, 11px)',
                      color: theme.colors.primary.bronze,
                      textTransform: "uppercase",
                      letterSpacing: '0.5px',
                      fontWeight: theme.typography.fontWeight.medium,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {chateau.capacite.min}-{chateau.capacite.max} pers.
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.4 }}
                  className="inline-flex items-center gap-1.5"
                  style={{
                    background: `${theme.colors.primary.bronze}10`,
                    border: `2px solid ${theme.colors.primary.bronze}`,
                    padding: 'clamp(6px, 1.5vw, 10px) clamp(10px, 2vw, 14px)',
                    borderRadius: theme.effects.borderRadius.full,
                  }}
                >
                  <Bed className="w-3.5 h-3.5" style={{ color: theme.colors.primary.bronze }} />
                  <div
                    style={{
                      fontSize: 'clamp(10px, 1.6vw, 11px)',
                      color: theme.colors.primary.bronze,
                      textTransform: "uppercase",
                      letterSpacing: '0.5px',
                      fontWeight: theme.typography.fontWeight.medium,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {chateau.roomsTotal} Chambres
                    {chateau.roomsTwin && ` (${chateau.roomsTwin} Twins)`}
                    {!chateau.roomsTwin && " Mod."}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-8 z-10">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-3"
          >
            <span
              style={{
                color: 'white',
                fontSize: theme.typography.fontSize.xs,
                textTransform: "uppercase",
                letterSpacing: theme.typography.letterSpacing.widest,
                fontWeight: theme.typography.fontWeight.bold,
                textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 1px rgba(0,0,0,0.9)'
              }}
            >
              Découvrez
            </span>
            <div
              className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-2 shadow-xl"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.9)',
                background: 'rgba(255, 255, 255, 0.95)',
              }}
            >
              <div
                className="w-1 h-2 rounded-full"
                style={{ background: theme.colors.primary.bronze }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* À propos - CENTRÉ */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: theme.spacing['2xl'] }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: theme.spacing.sm, marginBottom: theme.spacing.lg }}>
                <Sparkles className="w-6 h-6" style={{ color: theme.colors.primary.bronze }} />
                <Text variant="caption" style={{ color: theme.colors.primary.bronze, textTransform: 'uppercase', letterSpacing: theme.typography.letterSpacing.wider, fontWeight: theme.typography.fontWeight.bold }}>
                  À propos
                </Text>
              </div>
              <Text variant="h2" style={{ marginBottom: theme.spacing.md }}>
                Une expérience d'exception
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Text variant="bodyLarge" color="muted" style={{ maxWidth: '800px', margin: '0 auto', lineHeight: theme.typography.lineHeight.relaxed }}>
                {chateau.descriptionLongue}
              </Text>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Section Hébergement - Zig-Zag */}
      <Section spacing="xl" background="white">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md, marginBottom: theme.spacing.lg }}>
                <Bed className="w-7 h-7" style={{ color: theme.colors.primary.bronze }} />
                <Text variant="h3" style={{ fontFamily: theme.typography.fonts.heading, fontStyle: "italic" }}>
                  Hébergement
                </Text>
              </div>
              <Text variant="bodyLarge" color="muted" style={{ marginBottom: theme.spacing.lg, lineHeight: 1.8 }}>
                {chateau.bedroomText}
              </Text>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: theme.spacing.sm,
                  padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.25rem, 3vw, 1.5rem)',
                  background: `${theme.colors.primary.bronze}10`,
                  borderRadius: theme.effects.borderRadius.full,
                  border: `2px solid ${theme.colors.primary.bronze}40`,
                }}
              >
                <Check className="w-5 h-5" style={{ color: theme.colors.primary.bronze }} />
                <Text variant="body" style={{ fontWeight: theme.typography.fontWeight.semibold, color: theme.colors.primary.bronze }}>
                  {chateau.roomsTotal} Chambres disponibles
                </Text>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div
                style={{
                  position: 'relative',
                  height: 'clamp(20rem, 50vw, 28rem)',
                  borderRadius: theme.effects.borderRadius.lg,
                  overflow: 'hidden',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                }}
              >
                <Image
                  src={chateau.images.galerie[getBedroomImageIndex(chateau.id)] || chateau.images.hero[2]}
                  alt={`Chambres et hébergement du ${chateau.nom} - Séminaire résidentiel en ${chateau.region}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  loading="lazy"
                  quality={80}
                />
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Section Salles de Réunion - Zig-Zag inverse */}
      <Section spacing="xl" background="gradient">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-1"
            >
              <div
                style={{
                  position: 'relative',
                  height: 'clamp(20rem, 50vw, 28rem)',
                  borderRadius: theme.effects.borderRadius.lg,
                  overflow: 'hidden',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                }}
              >
                <Image
                  src={chateau.images.galerie[getMeetingRoomImageIndex(chateau.id)] || chateau.images.hero[1]}
                  alt={`Salles de réunion et espaces séminaire du ${chateau.nom} - Équipement professionnel en ${chateau.region}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  loading="lazy"
                  quality={80}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="order-2"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.md, marginBottom: theme.spacing.lg }}>
                <Building2 className="w-7 h-7" style={{ color: theme.colors.primary.bronze }} />
                <Text variant="h3" style={{ fontFamily: theme.typography.fonts.heading, fontStyle: "italic" }}>
                  Salles de Réunion
                </Text>
              </div>
              <Text variant="bodyLarge" color="muted" style={{ marginBottom: theme.spacing.lg, lineHeight: 1.8 }}>
                {chateau.meetingText}
              </Text>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: theme.spacing.sm,
                  padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.25rem, 3vw, 1.5rem)',
                  background: `${theme.colors.primary.bronze}10`,
                  borderRadius: theme.effects.borderRadius.full,
                  border: `2px solid ${theme.colors.primary.bronze}40`,
                }}
              >
                <Check className="w-5 h-5" style={{ color: theme.colors.primary.bronze }} />
                <Text variant="body" style={{ fontWeight: theme.typography.fontWeight.semibold, color: theme.colors.primary.bronze }}>
                  Équipements audiovisuels complets
                </Text>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Points forts - Grid */}
      <Section spacing="lg" background="white">
        <Container size="xl">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: theme.spacing['4xl'] }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Text variant="h2" style={{ marginBottom: theme.spacing.md }}>
                Points forts
              </Text>
              <Text variant="bodyLarge" color="muted">
                Ce qui rend ce lieu unique
              </Text>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 max-w-7xl mx-auto">
            {chateau.atouts.map((atout: string, index: number) => (
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
                    minHeight: '160px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: theme.spacing.lg,
                  }}
                  className="hover:shadow-lg transition-shadow group"
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: theme.effects.borderRadius.full,
                      background: `${theme.colors.primary.bronze}10`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    className="group-hover:scale-110 transition-transform"
                  >
                    <Check className="w-6 h-6" style={{ color: theme.colors.primary.bronze }} />
                  </div>
                  <Text variant="body" style={{ fontWeight: theme.typography.fontWeight.medium, lineHeight: theme.typography.lineHeight.relaxed }}>
                    {atout}
                  </Text>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Galerie - Simple grid */}
      <Section spacing="lg" background="gradient">
        <Container size="xl">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: theme.spacing['4xl'] }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Text variant="h2" style={{ marginBottom: theme.spacing.md }}>
                Galerie
              </Text>
              <Text variant="bodyLarge" color="muted">
                Découvrez les espaces du château
              </Text>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto"
          >
            {chateau.images.galerie.slice(0, 6).map((image, index) => (
              <div
                key={index}
                style={{
                  position: 'relative',
                  height: '300px',
                  borderRadius: theme.effects.borderRadius.lg,
                  overflow: 'hidden',
                }}
                className="hover:scale-105 transition-transform"
              >
                <Image
                  src={image}
                  alt={`${chateau.nom} - Image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  loading="lazy"
                  quality={80}
                />
              </div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* Section FAQ */}
      <Section spacing="xl" background="white">
        <Container size="lg">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: theme.spacing['4xl'] }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: theme.spacing.sm,
                  marginBottom: theme.spacing.lg,
                  padding: '12px 20px',
                  background: `linear-gradient(135deg, ${theme.colors.primary.bronze}15, ${theme.colors.primary.gold}10)`,
                  border: `1px solid ${theme.colors.primary.bronze}30`,
                  borderRadius: theme.effects.borderRadius.full,
                }}
              >
                <HelpCircle className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                <Text variant="caption" style={{ color: theme.colors.primary.bronze, textTransform: 'uppercase', letterSpacing: theme.typography.letterSpacing.wider, fontWeight: theme.typography.fontWeight.semibold }}>
                  Questions & Réponses
                </Text>
              </div>

              <Text variant="h2" style={{ marginBottom: theme.spacing.md }}>
                Tout ce que vous devez savoir
              </Text>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: theme.spacing.md, marginBottom: theme.spacing.md }}>
                <div style={{ width: '40px', height: '1px', background: `linear-gradient(to right, transparent, ${theme.colors.primary.bronze})` }} />
                <Sparkles className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                <div style={{ width: '40px', height: '1px', background: `linear-gradient(to left, transparent, ${theme.colors.primary.bronze})` }} />
              </div>

              <Text variant="body" color="muted" style={{ maxWidth: '700px', margin: '0 auto' }}>
                Des réponses claires à vos questions essentielles sur ce lieu d'exception
              </Text>
            </motion.div>
          </div>

          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            {chateau.faq.map((item, index) => {
              const isOpen = openFaqIndex === index;

              return (
                <div
                  key={index}
                  className="group"
                  style={{ marginBottom: index < chateau.faq.length - 1 ? '32px' : '48px' }}
                >
                  <div
                    style={{
                      background: isOpen
                        ? `linear-gradient(135deg, ${theme.colors.neutral.white} 0%, ${theme.colors.primary.bronze}05 100%)`
                        : theme.colors.neutral.white,
                      borderRadius: theme.effects.borderRadius['2xl'],
                      border: `1px solid ${isOpen ? theme.colors.primary.bronze : theme.colors.neutral.gray200}`,
                      boxShadow: isOpen
                        ? `0 8px 32px ${theme.colors.primary.bronze}15, 0 2px 8px ${theme.colors.primary.bronze}08`
                        : '0 2px 8px rgba(0, 0, 0, 0.04)',
                      transition: 'all 0.3s ease',
                      padding: '8px',
                    }}
                    className="hover:shadow-xl"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full text-left"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '24px',
                        padding: '24px 32px',
                      }}
                    >
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: theme.effects.borderRadius.full,
                          background: isOpen
                            ? `linear-gradient(135deg, ${theme.colors.primary.bronze}, ${theme.colors.primary.bronzeDark})`
                            : `${theme.colors.primary.bronze}10`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          boxShadow: isOpen ? `0 4px 16px ${theme.colors.primary.bronze}40` : 'none',
                          flexShrink: 0,
                        }}
                        className="group-hover:scale-110"
                      >
                        <span
                          style={{
                            fontSize: theme.typography.fontSize.lg,
                            fontWeight: theme.typography.fontWeight.bold,
                            color: isOpen ? theme.colors.neutral.white : theme.colors.primary.bronze,
                            fontFamily: theme.typography.fonts.heading,
                            transition: 'color 0.4s ease',
                          }}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <Text
                          variant="h5"
                          style={{
                            lineHeight: theme.typography.lineHeight.snug,
                            transition: 'color 0.3s ease',
                          }}
                          className="group-hover:text-[var(--bronze-antique)]"
                        >
                          {item.question}
                        </Text>
                      </div>

                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: theme.effects.borderRadius.full,
                          background: isOpen
                            ? `${theme.colors.primary.bronze}15`
                            : `${theme.colors.neutral.gray200}80`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          flexShrink: 0,
                        }}
                        className="group-hover:bg-[var(--bronze-antique)] group-hover:bg-opacity-20"
                      >
                        {isOpen ? (
                          <Minus className="w-5 h-5 transition-all duration-400" style={{ color: theme.colors.primary.bronze }} />
                        ) : (
                          <Plus className="w-5 h-5 transition-all duration-400" style={{ color: isOpen ? theme.colors.primary.bronze : theme.colors.neutral.gray600 }} />
                        )}
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: 'auto',
                            opacity: 1,
                            transition: {
                              height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                              opacity: { duration: 0.3, delay: 0.1 }
                            }
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                            transition: {
                              height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                              opacity: { duration: 0.2 }
                            }
                          }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div
                            style={{
                              paddingLeft: '32px',
                              paddingRight: '32px',
                              paddingBottom: '32px',
                              paddingTop: '16px',
                            }}
                          >
                            <div
                              style={{
                                paddingTop: '16px',
                                paddingBottom: '8px',
                                paddingLeft: 'calc(48px + 24px)',
                                paddingRight: 'calc(40px + 24px)',
                                borderTop: `1px solid ${theme.colors.primary.bronze}20`,
                              }}
                            >
                              <Text variant="body" color="muted" style={{ lineHeight: theme.typography.lineHeight.relaxed }}>
                                {item.answer}
                              </Text>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginTop: theme.spacing['4xl'] }}
          >
            <div
              style={{
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: theme.spacing.lg,
                padding: theme.spacing.xl,
                background: `linear-gradient(135deg, ${theme.colors.primary.bronze}08, ${theme.colors.primary.gold}05)`,
                border: `1px solid ${theme.colors.primary.bronze}20`,
                borderRadius: theme.effects.borderRadius['2xl'],
              }}
            >
              <Text variant="body" style={{ fontWeight: theme.typography.fontWeight.medium }}>
                Une autre question ? Notre équipe est à votre écoute
              </Text>
              <Button variant="primary" size="md">
                Nous Contacter
              </Button>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* CTA finale */}
      <Section spacing="lg" background="gradient">
        <Container size="lg">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Text variant="h2" style={{ marginBottom: theme.spacing.md }}>
                Prêt à organiser votre événement ?
              </Text>
              <Text variant="bodyLarge" color="muted" style={{ marginBottom: theme.spacing.xl, maxWidth: '600px', margin: `0 auto ${theme.spacing.xl}` }}>
                Contactez-nous pour recevoir une proposition personnalisée
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              style={{ display: 'flex', gap: theme.spacing.md, justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <Button variant="primary" size="lg">
                Demander un Devis
              </Button>
              <Button variant="outline" size="lg">
                Voir d'autres châteaux
              </Button>
            </motion.div>
          </div>
        </Container>
      </Section>

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
