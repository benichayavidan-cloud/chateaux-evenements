/**
 * PAGE CHÂTEAU INDIVIDUEL - Détail d'un château
 * Migré avec le nouveau design system v2
 */

'use client';

import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Users, Check, Sparkles, Calendar, Award, Bed, Building2, Plus, Minus, HelpCircle, Home } from "lucide-react";
import { chateaux as chateauxData } from "@/data/chateaux";
import { Section, Container } from '@/components/layout-v2';
import { Text, Badge, Button } from '@/components/ui-v2';
import { theme } from '@/design-system/tokens';
import { StructuredData } from '@/components/StructuredData';
import { generatePlaceSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/utils/seo/structured-data';
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
  const [activeTab, setActiveTab] = useState<'overview' | 'accommodation' | 'spaces'>('overview');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

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

  // Structured Data amélioré pour SEO 2026
  const structuredData = [
    generatePlaceSchema(chateau),
    generateFAQSchema(chateau.faq),
    generateBreadcrumbSchema([
      { name: "Accueil", url: "/" },
      { name: "Nos Châteaux", url: "/chateaux" },
      { name: chateau.nom, url: `/chateaux/${chateau.slug}` },
    ]),
  ];

  return (
    <>
      {/* Structured Data - Schema.org */}
      <StructuredData data={structuredData} />


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
              <Badge
                variant="glass"
                size="lg"
                leftIcon={
                  <div
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{
                      background: theme.colors.primary.gold,
                      filter: "drop-shadow(0 0 4px rgba(212, 175, 55, 0.8))",
                    }}
                  />
                }
                style={{
                  paddingLeft: 'clamp(1.25rem, 3vw, 1.5rem)',
                  paddingRight: 'clamp(1.25rem, 3vw, 1.5rem)',
                }}
              >
                <span
                  className="font-semibold"
                  style={{
                    fontSize: 'clamp(0.8125rem, 2vw, 0.875rem)',
                    color: theme.colors.primary.gold,
                  }}
                >
                  {chateau.region}
                </span>
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

      {/* Section Onglets */}
      <Section spacing="lg" background="white" style={{ padding: '30px 0' }}>
        <Container size="lg">
          {/* Boutons d'onglets */}
          <div style={{
            display: 'flex',
            gap: theme.spacing.md,
            justifyContent: 'center',
            marginBottom: theme.spacing.xl,
            borderBottom: `1px solid ${theme.colors.neutral.gray200}`
          }}>
            <button
              onClick={() => setActiveTab('overview')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.sm,
                padding: `${theme.spacing.md} ${theme.spacing.lg}`,
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'overview' ? `3px solid ${theme.colors.primary.bronze}` : '3px solid transparent',
                color: activeTab === 'overview' ? theme.colors.primary.bronze : theme.colors.neutral.gray500,
                fontWeight: theme.typography.fontWeight.semibold,
                fontSize: theme.typography.fontSize.base,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                marginBottom: '-1px'
              }}
            >
              <Home className="w-5 h-5" />
              <span>Vue d'ensemble</span>
            </button>

            <button
              onClick={() => setActiveTab('accommodation')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.sm,
                padding: `${theme.spacing.md} ${theme.spacing.lg}`,
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'accommodation' ? `3px solid ${theme.colors.primary.bronze}` : '3px solid transparent',
                color: activeTab === 'accommodation' ? theme.colors.primary.bronze : theme.colors.neutral.gray500,
                fontWeight: theme.typography.fontWeight.semibold,
                fontSize: theme.typography.fontSize.base,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                marginBottom: '-1px'
              }}
            >
              <Bed className="w-5 h-5" />
              <span>Hébergement</span>
            </button>

            <button
              onClick={() => setActiveTab('spaces')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.sm,
                padding: `${theme.spacing.md} ${theme.spacing.lg}`,
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'spaces' ? `3px solid ${theme.colors.primary.bronze}` : '3px solid transparent',
                color: activeTab === 'spaces' ? theme.colors.primary.bronze : theme.colors.neutral.gray500,
                fontWeight: theme.typography.fontWeight.semibold,
                fontSize: theme.typography.fontSize.base,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                marginBottom: '-1px'
              }}
            >
              <Building2 className="w-5 h-5" />
              <span>Espaces</span>
            </button>
          </div>

          {/* Contenu des onglets */}
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                style={{ textAlign: 'center' }}
              >
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                  <Sparkles className="w-8 h-8" style={{ color: theme.colors.primary.bronze, marginLeft: 'auto', marginRight: 'auto', marginTop: 0, marginBottom: theme.spacing.md }} />
                  <Text variant="h2" style={{ marginBottom: theme.spacing.lg, textAlign: 'center' }}>
                    Une expérience d'exception
                  </Text>
                  <Text variant="bodyLarge" color="muted" style={{ lineHeight: theme.typography.lineHeight.relaxed, textAlign: 'center' }}>
                    {chateau.descriptionLongue}
                  </Text>
                </div>
              </motion.div>
            )}

            {activeTab === 'accommodation' && (
              <motion.div
                key="accommodation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                style={{ textAlign: 'center' }}
              >
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                  <Bed className="w-8 h-8" style={{ color: theme.colors.primary.bronze, marginLeft: 'auto', marginRight: 'auto', marginTop: 0, marginBottom: theme.spacing.md }} />
                  <Text variant="h2" style={{ marginBottom: theme.spacing.lg, textAlign: 'center' }}>
                    Hébergement
                  </Text>
                  <div
                    style={{
                      position: 'relative',
                      height: 'clamp(20rem, 50vw, 28rem)',
                      borderRadius: theme.effects.borderRadius.lg,
                      overflow: 'hidden',
                      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                      marginBottom: theme.spacing.xl
                    }}
                  >
                    <Image
                      src={chateau.images.galerie[getBedroomImageIndex(chateau.id)] || chateau.images.hero[2]}
                      alt={`Chambres et hébergement du ${chateau.nom} - Séminaire résidentiel en ${chateau.region}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 900px"
                      className="object-cover"
                      loading="lazy"
                      quality={80}
                    />
                  </div>
                  <Text variant="bodyLarge" color="muted" style={{ marginBottom: theme.spacing.lg, lineHeight: 1.8, textAlign: 'center' }}>
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
                </div>
              </motion.div>
            )}

            {activeTab === 'spaces' && (
              <motion.div
                key="spaces"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                style={{ textAlign: 'center' }}
              >
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                  <Building2 className="w-8 h-8" style={{ color: theme.colors.primary.bronze, marginLeft: 'auto', marginRight: 'auto', marginTop: 0, marginBottom: theme.spacing.md }} />
                  <Text variant="h2" style={{ marginBottom: theme.spacing.lg, textAlign: 'center' }}>
                    Espaces de Réunion
                  </Text>
                  <div
                    style={{
                      position: 'relative',
                      height: 'clamp(20rem, 50vw, 28rem)',
                      borderRadius: theme.effects.borderRadius.lg,
                      overflow: 'hidden',
                      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                      marginBottom: theme.spacing.xl
                    }}
                  >
                    <Image
                      src={chateau.images.galerie[getMeetingRoomImageIndex(chateau.id)] || chateau.images.hero[1]}
                      alt={`Salles de réunion et espaces séminaire du ${chateau.nom} - Équipement professionnel en ${chateau.region}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 900px"
                      className="object-cover"
                      loading="lazy"
                      quality={80}
                    />
                  </div>
                  <Text variant="bodyLarge" color="muted" style={{ marginBottom: theme.spacing.lg, lineHeight: 1.8, textAlign: 'center' }}>
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
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </Section>

      {/* Points forts - Grid */}
      <Section background="gray" style={{ padding: '20px 0' }}>
        <Container size="xl">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: theme.spacing.xl }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Text variant="h2" style={{ marginBottom: theme.spacing.md, textAlign: 'center' }}>
                Points forts
              </Text>
              <Text variant="bodyLarge" color="muted" style={{ textAlign: 'center' }}>
                Ce qui rend ce lieu unique
              </Text>
            </motion.div>
          </div>

          <div style={{
            display: 'flex',
            gap: 'clamp(1rem, 2vw, 2rem)',
            maxWidth: '1400px',
            margin: '0 auto',
            overflowX: 'auto',
            justifyContent: 'center',
            padding: '3rem 0',
            minHeight: '380px',
          }}>
            {chateau.atouts.map((atout: string, index: number) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  scale: 0.5,
                  rotateY: -180,
                  rotateZ: -10,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  rotateY: 0,
                  rotateZ: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.34, 1.56, 0.64, 1],
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                viewport={{ once: true }}
                style={{
                  perspective: '1000px',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div
                  style={{
                    padding: 'clamp(1.5rem, 3vw, 2rem)',
                    background: `linear-gradient(135deg, ${theme.colors.neutral.white} 0%, rgba(163, 126, 44, 0.03) 100%)`,
                    borderRadius: theme.effects.borderRadius.xl,
                    border: `2px solid ${theme.colors.neutral.gray200}`,
                    textAlign: 'center',
                    height: '100%',
                    minHeight: '260px',
                    minWidth: '250px',
                    flex: '1 0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: theme.spacing.lg,
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  className="group"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = `2px solid ${theme.colors.primary.bronze}`;
                    e.currentTarget.style.boxShadow = `0 20px 60px rgba(163, 126, 44, 0.25)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = `2px solid ${theme.colors.neutral.gray200}`;
                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.08)';
                  }}
                >
                  {/* Gradient animé pendant l'animation d'entrée */}
                  <motion.div
                    initial={{ x: '-100%', opacity: 0.6 }}
                    animate={{ x: '200%', opacity: 0 }}
                    transition={{
                      duration: 1.5,
                      delay: index * 0.15,
                      ease: "easeInOut",
                    }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: `linear-gradient(90deg,
                        transparent 0%,
                        rgba(163, 126, 44, 0.15) 30%,
                        rgba(212, 175, 55, 0.25) 50%,
                        rgba(163, 126, 44, 0.15) 70%,
                        transparent 100%
                      )`,
                      pointerEvents: 'none',
                      zIndex: 1,
                    }}
                  />
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: theme.effects.borderRadius.full,
                      background: `linear-gradient(135deg, ${theme.colors.primary.bronze}15, ${theme.colors.primary.gold}10)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      zIndex: 2,
                    }}
                    className="group-hover:scale-110 transition-transform"
                  >
                    <Check className="w-6 h-6" style={{ color: theme.colors.primary.bronze }} />
                  </div>
                  <Text variant="body" style={{ fontWeight: theme.typography.fontWeight.medium, lineHeight: theme.typography.lineHeight.relaxed, textAlign: 'center', position: 'relative', zIndex: 2 }}>
                    {atout}
                  </Text>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Galerie - Ultra Modern */}
      <Section background="gradient" style={{ padding: '30px 0' }}>
        <Container size="xl">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: theme.spacing.xl }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Text variant="h2" style={{ marginBottom: theme.spacing.md, textAlign: 'center' }}>
                Galerie
              </Text>
              <Text variant="bodyLarge" color="muted" style={{ textAlign: 'center' }}>
                Découvrez les espaces du château
              </Text>
            </motion.div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'clamp(1rem, 2vw, 1.5rem)',
              maxWidth: '1400px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {chateau.images.galerie.slice(0, 6).map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.4, 0, 0.2, 1]
                }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, y: -8 }}
                onClick={() => setLightboxImage(image)}
                style={{
                  position: 'relative',
                  height: 'clamp(250px, 35vw, 350px)',
                  borderRadius: theme.effects.borderRadius.xl,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                }}
              >
                <Image
                  src={image}
                  alt={`${chateau.nom} - Image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  loading="lazy"
                  quality={85}
                  style={{
                    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(135deg, ${theme.colors.primary.bronze}95, ${theme.colors.primary.bronzeDark}85)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(2px)',
                  }}
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileHover={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.95)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={theme.colors.primary.bronze}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Section FAQ */}
      <Section background="gray" style={{ padding: '20px 0', background: '#f6f9fc' }}>
        <Container size="lg">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: theme.spacing.xl }}>
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

              <Text variant="h2" style={{ marginBottom: theme.spacing.md, textAlign: 'center' }}>
                Tout ce que vous devez savoir
              </Text>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: theme.spacing.md, marginBottom: theme.spacing.md }}>
                <div style={{ width: '40px', height: '1px', background: `linear-gradient(to right, transparent, ${theme.colors.primary.bronze})` }} />
                <Sparkles className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                <div style={{ width: '40px', height: '1px', background: `linear-gradient(to left, transparent, ${theme.colors.primary.bronze})` }} />
              </div>

              <Text variant="body" color="muted" style={{ maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto', marginTop: 0, marginBottom: 0, textAlign: 'center' }}>
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
                              <Text variant="body" color="muted" style={{ lineHeight: theme.typography.lineHeight.relaxed, textAlign: 'center' }}>
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
              <Text variant="body" style={{ fontWeight: theme.typography.fontWeight.medium, textAlign: 'center' }}>
                Une autre question ? Notre équipe est à votre écoute
              </Text>
              <Link href="/devis">
                <Button variant="primary" size="md">
                  Nous Contacter
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* CTA finale */}
      <Section background="gradient" style={{ padding: '30px 0' }}>
        <Container size="lg">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Text variant="h2" style={{ marginBottom: theme.spacing.md, textAlign: 'center' }}>
                Prêt à organiser votre événement ?
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              style={{ display: 'flex', gap: theme.spacing.md, justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <Link href="/devis">
                <Button variant="primary" size="lg">
                  Demander un Devis
                </Button>
              </Link>
              <Link href="/chateaux">
                <Button variant="outline" size="lg">
                  Voir d'autres châteaux
                </Button>
              </Link>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Lightbox pour la galerie */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightboxImage(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.95)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              cursor: 'zoom-out',
            }}
          >
            <button
              onClick={() => setLightboxImage(null)}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontSize: '24px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                zIndex: 10000,
              }}
              aria-label="Fermer"
            >
              ✕
            </button>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                maxWidth: '1400px',
                maxHeight: '90vh',
                cursor: 'default',
              }}
            >
              <Image
                src={lightboxImage}
                alt="Image agrandie"
                fill
                sizes="100vw"
                className="object-contain"
                quality={95}
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
