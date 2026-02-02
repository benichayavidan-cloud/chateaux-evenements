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
