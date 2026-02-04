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

      {/* Pourquoi Nos Châteaux - 4 cartes sur une ligne */}
      <Section background="gray" style={{ padding: '50px 0' }}>
        <Container size="xl">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: theme.spacing.lg }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <Text variant="h2" style={{ marginBottom: theme.spacing.sm, textAlign: 'center' }}>
                Pourquoi Choisir Nos Châteaux
              </Text>
              <Text variant="bodyLarge" color="muted" style={{ textAlign: 'center' }}>
                L'excellence au service de vos événements
              </Text>
            </motion.div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '1.5rem 1rem',
          }}>
            {[
              {
                icon: Shield,
                title: 'Privatisation',
                description: 'Domaines privatisables pour confidentialité totale'
              },
              {
                icon: MapPin,
                title: 'Accès Privilégié',
                description: 'Lieux d\'exception habituellement fermés au public'
              },
              {
                icon: Award,
                title: 'Service Premium',
                description: 'Accompagnement de A à Z par nos experts'
              },
              {
                icon: Clock,
                title: 'Proche Paris',
                description: '30-60 min de Paris. Dépaysement garanti'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <div
                  style={{
                    padding: '1.25rem',
                    background: 'white',
                    borderRadius: theme.effects.borderRadius.lg,
                    border: `1px solid ${theme.colors.neutral.gray200}`,
                    textAlign: 'center',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.75rem',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                    transition: 'box-shadow 0.2s ease',
                  }}
                  className="hover:shadow-md"
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: theme.effects.borderRadius.full,
                      background: `linear-gradient(135deg, ${theme.colors.primary.bronze}15, ${theme.colors.primary.gold}10)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1px solid ${theme.colors.primary.bronze}25`,
                    }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: theme.colors.primary.bronze }} />
                  </div>
                  <Text variant="body" style={{ fontWeight: theme.typography.fontWeight.semibold, fontSize: '0.95rem', textAlign: 'center' }}>
                    {item.title}
                  </Text>
                  <Text variant="caption" color="muted" style={{ lineHeight: 1.5, textAlign: 'center', fontSize: '0.8rem' }}>
                    {item.description}
                  </Text>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ========== 2. BOUSSOLE DE CHOIX - Style carte forfait avec image ========== */}
      <Section background="white" style={{ padding: '50px 0' }}>
        <Container size="xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <Text
              variant="h3"
              style={{
                textAlign: 'center',
                marginBottom: '2rem',
                color: theme.colors.neutral.gray800,
                fontWeight: theme.typography.fontWeight.medium,
              }}
            >
              Quel château pour votre événement ?
            </Text>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1.25rem',
              maxWidth: '1100px',
              margin: '0 auto',
            }}>
              {[
                {
                  image: chateaux.find(c => c.slug === 'abbaye-millenaire-vallee-chevreuse')?.images.card || '',
                  question: '🌳 Besoin de grand air ?',
                  answer: 'Abbaye en Vallée de Chevreuse (78)',
                  detail: 'Étang privé 70ha • Ruines romantiques',
                  href: '/chateaux/abbaye-millenaire-vallee-chevreuse',
                },
                {
                  image: chateaux.find(c => c.slug === 'manoir-anglo-normand-chantilly')?.images.card || '',
                  question: '🏰 Grandes équipes ?',
                  answer: 'Manoir de Chantilly (60)',
                  detail: 'Jusqu\'à 280 pers • 120 chambres',
                  href: '/chateaux/manoir-anglo-normand-chantilly',
                },
                {
                  image: chateaux.find(c => c.slug === 'hotel-historique-seminaire-paris-92')?.images.card || '',
                  question: '🚇 Temps limité ?',
                  answer: 'Domaine Historique (92)',
                  detail: 'Accessible en métro • 5min à pied',
                  href: '/chateaux/hotel-historique-seminaire-paris-92',
                },
              ].map((item, index) => (
                <Link key={index} href={item.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    style={{
                      background: 'white',
                      borderRadius: theme.effects.borderRadius.xl,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: `1px solid ${theme.colors.neutral.gray200}`,
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
                      transition: 'box-shadow 0.2s ease',
                    }}
                    className="hover:shadow-xl"
                  >
                    {/* Image en haut */}
                    <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
                      <Image
                        src={item.image}
                        alt={item.answer}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.3) 100%)',
                      }} />
                    </div>

                    {/* Texte en bas */}
                    <div style={{ padding: '1.25rem', textAlign: 'center' }}>
                      <Text
                        variant="body"
                        style={{
                          fontWeight: theme.typography.fontWeight.semibold,
                          color: theme.colors.neutral.gray800,
                          marginBottom: '0.5rem',
                          fontSize: '1rem',
                        }}
                      >
                        {item.question}
                      </Text>
                      <Text
                        variant="body"
                        style={{
                          color: theme.colors.primary.bronze,
                          fontWeight: theme.typography.fontWeight.medium,
                          marginBottom: '0.25rem',
                          fontSize: '0.9rem',
                        }}
                      >
                        {item.answer}
                      </Text>
                      <Text
                        variant="caption"
                        style={{
                          color: theme.colors.neutral.gray500,
                          fontSize: '0.8rem',
                        }}
                      >
                        {item.detail}
                      </Text>
                      <div style={{ marginTop: '0.75rem' }}>
                        <ArrowRight
                          className="w-4 h-4 mx-auto"
                          style={{ color: theme.colors.primary.bronze }}
                        />
                      </div>
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

      {/* Comment ça marche - 3 étapes sur une ligne avec animations rapides */}
      <Section background="gray" style={{ padding: '50px 0' }}>
        <Container size="xl">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
            >
              <Text variant="h2" style={{ marginBottom: '0.5rem' }}>
                Comment ça marche
              </Text>
              <Text variant="bodyLarge" color="muted" style={{ textAlign: 'center' }}>
                Un processus simple en 3 étapes
              </Text>
            </motion.div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.25rem',
            maxWidth: '1000px',
            margin: '0 auto',
            position: 'relative',
          }}>
            {/* Ligne de connexion entre les étapes */}
            <div style={{
              position: 'absolute',
              top: '45px',
              left: '20%',
              right: '20%',
              height: '2px',
              background: `linear-gradient(90deg, ${theme.colors.primary.bronze}40, ${theme.colors.primary.gold}60, ${theme.colors.primary.bronze}40)`,
              zIndex: 0,
            }} />

            {[
              {
                step: '1',
                title: 'Demande',
                description: 'Formulaire rapide',
                icon: Calendar
              },
              {
                step: '2',
                title: 'Sélection',
                description: 'Châteaux sur-mesure',
                icon: Award
              },
              {
                step: '3',
                title: 'Organisation',
                description: 'On gère tout',
                icon: CheckCircle
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, x: index === 0 ? -30 : index === 2 ? 30 : 0 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.15, ease: "easeOut" }
                }}
                transition={{
                  duration: 0.25,
                  delay: index * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                viewport={{ once: true }}
                style={{ position: 'relative', zIndex: 1 }}
              >
                <div
                  style={{
                    padding: '1.5rem 1.25rem',
                    background: 'white',
                    borderRadius: theme.effects.borderRadius.xl,
                    border: `1px solid ${theme.colors.neutral.gray200}`,
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
                    transition: 'box-shadow 0.15s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '180px',
                  }}
                  className="hover:shadow-lg"
                >
                  {/* Numéro d'étape animé */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    style={{
                      width: '56px',
                      height: '56px',
                      marginBottom: '1rem',
                      borderRadius: theme.effects.borderRadius.full,
                      background: `linear-gradient(135deg, ${theme.colors.primary.bronze}, ${theme.colors.primary.gold})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(183, 135, 77, 0.3)',
                    }}
                  >
                    <span style={{
                      color: 'white',
                      fontWeight: theme.typography.fontWeight.bold,
                      fontSize: '1.25rem',
                    }}>
                      {item.step}
                    </span>
                  </motion.div>

                  <Text variant="h5" style={{ marginBottom: '0.25rem', fontSize: '1rem', textAlign: 'center' }}>
                    {item.title}
                  </Text>

                  <Text variant="caption" color="muted" style={{ fontSize: '0.85rem', textAlign: 'center' }}>
                    {item.description}
                  </Text>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ========== 3. TRUST & SEO BLOCK - Design moderne sur une ligne ========== */}
      <Section background="white" style={{ padding: '50px 0' }}>
        <Container size="xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            <Text
              variant="h3"
              style={{
                textAlign: 'center',
                marginBottom: '2rem',
                color: theme.colors.neutral.gray800,
              }}
            >
              Pourquoi Select Châteaux ?
            </Text>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              maxWidth: '1100px',
              margin: '0 auto',
            }}>
              {[
                {
                  icon: Shield,
                  title: 'Privatisation',
                  highlight: '100%',
                  description: 'Lieux dédiés à votre entreprise',
                  gradient: 'linear-gradient(135deg, #B7874D 0%, #D4AF37 100%)',
                },
                {
                  icon: Check,
                  title: 'Tout Inclus',
                  highlight: '0€',
                  description: 'de frais cachés',
                  gradient: 'linear-gradient(135deg, #1E3A5F 0%, #2E5A8F 100%)',
                },
                {
                  icon: Award,
                  title: 'Expertise B2B',
                  highlight: '15 ans',
                  description: 'd\'expérience corporate',
                  gradient: 'linear-gradient(135deg, #4A5568 0%, #718096 100%)',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  style={{
                    background: item.gradient,
                    borderRadius: theme.effects.borderRadius.xl,
                    padding: '1.5rem',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                  }}
                >
                  {/* Background pattern */}
                  <div style={{
                    position: 'absolute',
                    top: '-20px',
                    right: '-20px',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                  }} />

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '1rem',
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: 'rgba(255,255,255,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <item.icon className="w-5 h-5" style={{ color: 'white' }} />
                      </div>
                      <Text variant="body" style={{ color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>
                        {item.title}
                      </Text>
                    </div>

                    <div style={{
                      fontSize: '2.25rem',
                      fontWeight: 700,
                      color: 'white',
                      lineHeight: 1,
                      marginBottom: '0.25rem',
                    }}>
                      {item.highlight}
                    </div>

                    <Text variant="caption" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem' }}>
                      {item.description}
                    </Text>
                  </div>
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
