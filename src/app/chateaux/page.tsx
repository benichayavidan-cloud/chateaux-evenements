/**
 * PAGE CHÂTEAUX - Liste des châteaux avec design moderne
 */

'use client';

import { Section, Container } from '@/components/layout-v2';
import { Text, Card, Button } from '@/components/ui-v2';
import { Users, Bed, Sparkles, Calendar, ArrowRight, Shield, Award, MapPin, Clock, CheckCircle, Phone, Check } from 'lucide-react';
import { theme } from '@/design-system/tokens';
import { chateaux } from "@/data/chateaux";
import { motion } from 'framer-motion';
import Image from "next/image";
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ChateauxPage() {
  const searchParams = useSearchParams();
  const dept = searchParams?.get('dept');

  // Filtrer les châteaux selon le département (extrait du ref: #60-CHANTILLY -> 60)
  const filteredChateaux = dept
    ? chateaux.filter(c => c.ref.startsWith(`#${dept}-`))
    : chateaux;

  // Titre dynamique selon le filtre
  const getTitle = () => {
    if (dept === '60') return 'Châteaux Oise (60)';
    if (dept === '78') return 'Châteaux Yvelines (78)';
    if (dept === '92') return 'Châteaux Hauts-de-Seine (92)';
    return 'Nos Châteaux pour Séminaires';
  };

  const getDescription = () => {
    if (dept === '60') return 'Découvrez nos châteaux d\'exception dans l\'Oise pour vos séminaires et événements d\'entreprise';
    if (dept === '78') return 'Découvrez nos châteaux d\'exception dans les Yvelines pour vos séminaires et événements d\'entreprise';
    if (dept === '92') return 'Découvrez nos domaines d\'exception dans les Hauts-de-Seine pour vos séminaires et événements d\'entreprise';
    return 'Collection exclusive de domaines privatisables en Île-de-France et Oise';
  };

  return (
    <>
      {/* Hero Section - Style château individuel */}
      <div style={{ height: '75vh', minHeight: '600px' }} className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/seminaires-soirees-entreprise-hero.webp"
            alt="Châteaux pour séminaires en Île-de-France"
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
              <div
                className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg"
                style={{
                  padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.25rem, 3vw, 1.5rem)',
                  borderRadius: theme.effects.borderRadius.full,
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{
                    background: theme.colors.primary.gold,
                    filter: "drop-shadow(0 0 4px rgba(212, 175, 55, 0.8))",
                  }}
                />
                <span
                  className="font-semibold"
                  style={{
                    fontSize: 'clamp(0.8125rem, 2vw, 0.875rem)',
                    color: theme.colors.primary.gold,
                  }}
                >
                  {filteredChateaux.length} {filteredChateaux.length > 1 ? 'Domaines' : 'Domaine'} d'Exception
                </span>
              </div>
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
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
                style={{
                  fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
                  fontWeight: theme.typography.fontWeight.light,
                  fontStyle: 'italic',
                  fontFamily: theme.typography.fonts.heading,
                  lineHeight: 1.25,
                  color: theme.colors.neutral.gray900,
                  marginBottom: 'clamp(0.75rem, 2vw, 1rem)',
                }}
              >
                {getTitle()}
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
                }}
              >
                {getDescription()}
              </motion.p>
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

      {/* ========== 1. HEADER PITCH - Juste après le Hero ========== */}
      <Section background="white" style={{ padding: '50px 0 30px' }}>
        <Container size="md">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0 auto',
              fontSize: 'clamp(1.05rem, 2.5vw, 1.15rem)',
              lineHeight: 1.8,
              color: theme.colors.neutral.gray600,
              fontWeight: theme.typography.fontWeight.normal,
            }}
          >
            Une collection exclusive de <strong style={{ color: theme.colors.neutral.gray800 }}>4 domaines historiques privatisables</strong>,
            sélectionnés pour leur proximité avec Paris (&lt;1h) et leur excellence opérationnelle.
            Du séminaire résidentiel de 200 personnes à Chantilly au CODIR confidentiel dans les Hauts-de-Seine,
            chaque lieu offre une <strong style={{ color: theme.colors.neutral.gray800 }}>unité de lieu parfaite</strong> :
            salles de réunion high-tech, restauration gastronomique et hébergement sur place.
          </motion.p>
        </Container>
      </Section>

      {/* Pourquoi Nos Châteaux - Style Points Forts */}
      <Section background="gray" style={{ padding: '60px 0' }}>
        <Container size="xl">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: theme.spacing.xl }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Text variant="h2" style={{ marginBottom: theme.spacing.md, textAlign: 'center' }}>
                Pourquoi Choisir Nos Châteaux
              </Text>
              <Text variant="bodyLarge" color="muted" style={{ textAlign: 'center' }}>
                L'excellence au service de vos événements
              </Text>
            </motion.div>
          </div>

          <div style={{
            display: 'flex',
            gap: '1rem',
            maxWidth: '100%',
            margin: '0 auto',
            overflowX: 'visible',
            justifyContent: 'center',
            padding: '3rem 1rem',
            minHeight: '380px',
            flexWrap: 'wrap',
          }}>
            {[
              {
                icon: Shield,
                title: 'Privatisation Totale',
                description: 'Domaines entièrement privatisables pour garantir confidentialité et exclusivité'
              },
              {
                icon: MapPin,
                title: 'Accès Privilégié',
                description: 'Lieux d\'exception habituellement fermés au public. Collection confidentielle'
              },
              {
                icon: Award,
                title: 'Service Premium',
                description: 'Accompagnement personnalisé de A à Z par nos experts événementiels'
              },
              {
                icon: Clock,
                title: 'Proximité Paris',
                description: '30-60 min de Paris. Dépaysement total sans contraintes logistiques'
              }
            ].map((item, index) => (
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
                    padding: 'clamp(2rem, 3vw, 2.5rem)',
                    background: 'white',
                    borderRadius: theme.effects.borderRadius.xl,
                    border: `1px solid ${theme.colors.neutral.gray200}`,
                    textAlign: 'center',
                    height: '100%',
                    minHeight: '280px',
                    minWidth: '260px',
                    maxWidth: '300px',
                    flex: '0 0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: theme.spacing.lg,
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                    transition: 'all 0.3s ease',
                  }}
                  className="hover:shadow-lg"
                >
                  <div
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: theme.effects.borderRadius.full,
                      background: `linear-gradient(135deg, ${theme.colors.primary.bronze}15, ${theme.colors.primary.gold}10)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `2px solid ${theme.colors.primary.bronze}30`,
                      flexShrink: 0,
                    }}
                  >
                    <item.icon className="w-8 h-8" style={{ color: theme.colors.primary.bronze }} />
                  </div>
                  <div>
                    <Text variant="h5" style={{ fontWeight: theme.typography.fontWeight.semibold, marginBottom: theme.spacing.sm, textAlign: 'center' }}>
                      {item.title}
                    </Text>
                    <Text variant="body" color="muted" style={{ lineHeight: theme.typography.lineHeight.relaxed, textAlign: 'center', fontSize: '0.9rem' }}>
                      {item.description}
                    </Text>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ========== 2. BOUSSOLE DE CHOIX - Avant la liste des châteaux ========== */}
      <Section background="white" style={{ padding: '40px 0' }}>
        <Container size="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{
              background: theme.colors.neutral.gray50,
              borderRadius: theme.effects.borderRadius.xl,
              border: `1px solid ${theme.colors.neutral.gray200}`,
              padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            }}
          >
            <Text
              variant="h4"
              style={{
                textAlign: 'center',
                marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
                color: theme.colors.neutral.gray800,
                fontWeight: theme.typography.fontWeight.medium,
              }}
            >
              Quel château pour votre événement ?
            </Text>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  emoji: '🌳',
                  question: 'Besoin de grand air ?',
                  answer: 'Optez pour l\'Abbaye en Vallée de Chevreuse (78)',
                  href: '/chateaux/abbaye-millenaire-vallee-chevreuse',
                },
                {
                  emoji: '🏰',
                  question: 'Grandes équipes ?',
                  answer: 'Le Manoir de Chantilly (60) accueille jusqu\'à 280 pers.',
                  href: '/chateaux/manoir-anglo-normand-chantilly',
                },
                {
                  emoji: '🚇',
                  question: 'Temps limité ?',
                  answer: 'Le Domaine Historique (92) est accessible en métro.',
                  href: '/chateaux/hotel-historique-seminaire-paris-92',
                },
              ].map((item, index) => (
                <Link key={index} href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      background: 'white',
                      borderRadius: theme.effects.borderRadius.lg,
                      padding: 'clamp(1.25rem, 3vw, 1.5rem)',
                      textAlign: 'center',
                      cursor: 'pointer',
                      border: `1px solid ${theme.colors.neutral.gray200}`,
                      height: '100%',
                      transition: 'box-shadow 0.3s ease',
                    }}
                    className="hover:shadow-md"
                  >
                    <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{item.emoji}</div>
                    <Text
                      variant="body"
                      style={{
                        fontWeight: theme.typography.fontWeight.semibold,
                        color: theme.colors.neutral.gray800,
                        marginBottom: '0.5rem',
                      }}
                    >
                      {item.question}
                    </Text>
                    <Text
                      variant="caption"
                      style={{
                        color: theme.colors.neutral.gray600,
                        lineHeight: 1.5,
                      }}
                    >
                      {item.answer}
                    </Text>
                    <div style={{ marginTop: '0.75rem' }}>
                      <ArrowRight
                        className="w-4 h-4 mx-auto"
                        style={{ color: theme.colors.primary.bronze }}
                      />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Section Châteaux */}
      <Section spacing="xl" background="white" style={{ padding: '60px 0' }}>
        <Container size="lg">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: theme.spacing['4xl'] }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: theme.spacing.sm, marginBottom: theme.spacing.md }}>
                <Sparkles className="w-6 h-6" style={{ color: theme.colors.primary.bronze }} />
                <Text variant="caption" style={{ color: theme.colors.primary.bronze, textTransform: 'uppercase', letterSpacing: theme.typography.letterSpacing.wider, fontWeight: theme.typography.fontWeight.bold }}>
                  Notre Sélection Exclusive
                </Text>
              </div>
              <Text variant="h2" style={{ marginBottom: theme.spacing.sm, textAlign: 'center' }}>
                {filteredChateaux.length} {filteredChateaux.length > 1 ? 'Châteaux' : 'Château'} d'Exception
              </Text>
              <Text variant="bodyLarge" color="muted" style={{ textAlign: 'center', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
                Chaque domaine a été sélectionné pour son caractère unique et ses infrastructures d'exception
              </Text>
            </motion.div>
          </div>

          <div style={{
            display: 'flex',
            gap: '1rem',
            maxWidth: '100%',
            margin: '0 auto',
            overflowX: 'visible',
            justifyContent: 'center',
            padding: '2rem 1rem',
            flexWrap: 'wrap',
          }}>
            {filteredChateaux.map((chateau, index) => (
              <motion.div
                key={chateau.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{
                  flex: '0 0 auto',
                  minWidth: 'clamp(320px, 35vw, 450px)',
                  maxWidth: '450px',
                }}
              >
                <Card
                  image={chateau.images.card}
                  title={chateau.nom}
                  description={chateau.description}
                  badge={chateau.region}
                  features={chateau.atouts.slice(0, 3)}
                  href={`/chateaux/${chateau.slug}`}
                  variant="hover-overlay"
                  imageHeight="450px"
                  ctaLabel="Découvrir ce château"
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

      {/* Comment ça marche - Version simplifiée */}
      <Section background="gray" style={{ padding: '60px 0' }}>
        <Container size="lg">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: theme.spacing['4xl'] }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Text variant="h2" style={{ marginBottom: theme.spacing.md }}>
                Comment ça marche
              </Text>
              <Text variant="bodyLarge" color="muted" style={{ textAlign: 'center' }}>
                Un processus simple en 3 étapes
              </Text>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: '1',
                title: 'Demande de Devis',
                description: 'Formulaire rapide pour nous partager vos besoins',
                icon: Calendar
              },
              {
                step: '2',
                title: 'Sélection sur-mesure',
                description: 'Nous vous proposons les châteaux adaptés',
                icon: Award
              },
              {
                step: '3',
                title: 'Organisation',
                description: 'Nous gérons tout de A à Z pour vous',
                icon: CheckCircle
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div
                  style={{
                    padding: theme.spacing.xl,
                    background: 'white',
                    borderRadius: theme.effects.borderRadius.xl,
                    border: `1px solid ${theme.colors.neutral.gray200}`,
                    textAlign: 'center',
                    height: '100%',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                    transition: 'all 0.3s ease',
                  }}
                  className="hover:shadow-lg"
                >
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      margin: '0 auto',
                      marginBottom: theme.spacing.lg,
                      borderRadius: theme.effects.borderRadius.full,
                      background: `linear-gradient(135deg, ${theme.colors.primary.bronze}15, ${theme.colors.primary.gold}10)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `2px solid ${theme.colors.primary.bronze}30`,
                    }}
                  >
                    <item.icon className="w-8 h-8" style={{ color: theme.colors.primary.bronze }} />
                  </div>

                  <div
                    style={{
                      fontSize: theme.typography.fontSize.sm,
                      fontWeight: theme.typography.fontWeight.bold,
                      color: theme.colors.primary.bronze,
                      letterSpacing: theme.typography.letterSpacing.wider,
                      marginBottom: theme.spacing.sm,
                    }}
                  >
                    ÉTAPE {item.step}
                  </div>

                  <Text variant="h4" style={{ marginBottom: theme.spacing.sm }}>
                    {item.title}
                  </Text>

                  <Text variant="body" color="muted" style={{ lineHeight: theme.typography.lineHeight.relaxed }}>
                    {item.description}
                  </Text>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ========== 3. TRUST & SEO BLOCK - Avant le CTA finale ========== */}
      <Section background="white" style={{ padding: '70px 0' }}>
        <Container size="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Text
              variant="h2"
              style={{
                textAlign: 'center',
                marginBottom: 'clamp(2rem, 5vw, 3rem)',
                fontFamily: theme.typography.fonts.heading,
                fontWeight: theme.typography.fontWeight.light,
                fontStyle: 'italic',
                color: theme.colors.neutral.gray900,
              }}
            >
              Pourquoi organiser votre séminaire avec Select Châteaux ?
            </Text>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                    </svg>
                  ),
                  title: 'Privatisation Totale',
                  description: 'Sentez-vous chez vous. Nos lieux sont dédiés à votre entreprise pour garantir la confidentialité de vos échanges.',
                },
                {
                  icon: (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                    </svg>
                  ),
                  title: 'Tout Inclus & Transparent',
                  description: 'Pas de mauvaise surprise. Nos forfaits journée d\'étude et résidentiels incluent la technique, la restauration et le service.',
                },
                {
                  icon: (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                  ),
                  title: 'Expertise B2B',
                  description: 'Nous ne faisons pas de mariages. Nos équipes sont formées aux exigences des entreprises (réactivité, discrétion, fluidité).',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  style={{
                    textAlign: 'center',
                    padding: 'clamp(1.5rem, 3vw, 2rem)',
                  }}
                >
                  <div
                    style={{
                      color: theme.colors.primary.bronze,
                      marginBottom: '1.25rem',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </div>
                  <Text
                    variant="h5"
                    style={{
                      marginBottom: '0.75rem',
                      color: theme.colors.neutral.gray900,
                      fontWeight: theme.typography.fontWeight.semibold,
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    variant="body"
                    style={{
                      color: theme.colors.neutral.gray600,
                      lineHeight: 1.7,
                    }}
                  >
                    {item.description}
                  </Text>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* CTA finale */}
      <Section background="gradient" style={{ padding: '60px 0' }}>
        <Container size="lg">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Text variant="h2" style={{ marginBottom: theme.spacing.lg, textAlign: 'center' }}>
                Prêt à organiser votre événement d'exception ?
              </Text>
              <Text variant="bodyLarge" color="muted" style={{ marginBottom: theme.spacing.xl, textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
                Nos experts vous accompagnent dans le choix du château idéal. Devis gratuit sous 24h.
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              style={{ display: 'flex', gap: theme.spacing.md, justifyContent: 'center', flexWrap: 'wrap', marginTop: theme.spacing.xl }}
            >
              <Link href="/devis">
                <Button variant="primary" size="lg">
                  Demander un Devis Gratuit
                </Button>
              </Link>
              <a href="tel:+33757991146">
                <Button variant="outline" size="lg">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Phone className="w-5 h-5" />
                    <span>07 57 99 11 46</span>
                  </div>
                </Button>
              </a>
            </motion.div>
          </div>
        </Container>
      </Section>
    </>
  );
}
