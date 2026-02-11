/**
 * PAGE CHÂTEAUX - Liste des châteaux avec design moderne
 */

'use client';

import { Section, Container } from '@/components/layout-v2';
import { Text, Card, Button } from '@/components/ui-v2';
import { Users, Bed, Sparkles, Calendar, ArrowRight, Shield, Award, MapPin, Clock, CheckCircle, Phone, Check } from 'lucide-react';
import { theme } from '@/design-system/tokens';
import { chateaux } from "@/data/chateaux";
import { useInView } from '@/hooks/useInView';
import Image from "next/image";
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { trackPhoneClick } from '@/components/Analytics';
import { LogoCarousel } from '@/components/LogoCarousel';
import { ReviewsSection } from '@/components/ReviewsSection';

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

  // Header Pitch dynamique selon le département
  const getHeaderPitch = () => {
    if (dept === '60') {
      return (
        <>
          Le <strong style={{ color: theme.colors.neutral.gray800 }}>Manoir Anglo-Normand de Chantilly</strong> :
          un domaine majestueux à 35 minutes de Paris, niché au cœur d'une forêt privée.
          Capacité exceptionnelle de <strong style={{ color: theme.colors.neutral.gray800 }}>280 personnes</strong> avec
          120 chambres, amphithéâtre privé et spa de prestige 800m².
        </>
      );
    }
    if (dept === '78') {
      return (
        <>
          L'<strong style={{ color: theme.colors.neutral.gray800 }}>Abbaye Millénaire en Vallée de Chevreuse</strong> :
          un monument historique cistercien du XIIe siècle. Déconnexion totale avec étang privé de 70 hectares,
          ruines romantiques et <strong style={{ color: theme.colors.neutral.gray800 }}>147 chambres</strong> pour vos séminaires résidentiels.
        </>
      );
    }
    if (dept === '92') {
      return (
        <>
          Le <strong style={{ color: theme.colors.neutral.gray800 }}>Domaine Historique aux portes de Paris</strong> :
          un hôtel 5 étoiles dans une bâtisse du XVIIe siècle, accessible en métro (5 min à pied).
          <strong style={{ color: theme.colors.neutral.gray800 }}>83 chambres</strong> et jardin suspendu avec vue sur Paris.
          Idéal pour CODIR et événements confidentiels.
        </>
      );
    }
    return (
      <>
        Une collection exclusive de <strong style={{ color: theme.colors.neutral.gray800 }}>4 domaines historiques privatisables</strong>,
        sélectionnés pour leur proximité avec Paris (&lt;1h) et leur excellence opérationnelle.
        Du séminaire résidentiel de 200 personnes à Chantilly au CODIR confidentiel dans les Hauts-de-Seine,
        chaque lieu offre une <strong style={{ color: theme.colors.neutral.gray800 }}>unité de lieu parfaite</strong> :
        salles de réunion high-tech, restauration gastronomique et hébergement sur place.
      </>
    );
  };

  const heroBadge = useInView();
  const heroTitle = useInView();
  const heroDesc = useInView();
  const headerPitch = useInView();
  const whySection = useInView();
  const boussole = useInView();
  const chateauxSection = useInView();
  const commentSection = useInView();
  const trustSection = useInView();
  const ctaSection = useInView();
  const ctaButtons = useInView();

  return (
    <>
      {/* H1 SEO - Invisible visuellement mais lu par Google */}
      <h1
        className="sr-only"
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        {getTitle()}
      </h1>

      {/* Hero Section - Style château individuel */}
      <div style={{ height: '75vh', minHeight: '600px' }} className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/seminaires-soirees-entreprise-hero.webp"
            alt="Châteaux pour séminaires en Île-de-France"
            fill
            className="object-cover"
            priority
            quality={75}
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
            <div
              ref={heroBadge.ref}
              className={`flex justify-center md:justify-start w-full animate-fade-in delay-500 ${heroBadge.isInView ? '' : 'opacity-0'}`}
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
            </div>

            <div
              className="text-center md:text-left rounded-2xl w-full"
              style={{
                background: 'rgba(255, 255, 255, 0.90)',
                backdropFilter: 'blur(14px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                padding: 'clamp(1.5rem, 4vw, 2rem) clamp(1.25rem, 3.5vw, 1.75rem)',
              }}
            >
              <div
                ref={heroTitle.ref}
                className={`animate-fade-in delay-100 ${heroTitle.isInView ? '' : 'opacity-0'}`}
                aria-hidden="true"
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
              </div>

              <p
                ref={heroDesc.ref}
                className={`animate-fade-in delay-200 ${heroDesc.isInView ? '' : 'opacity-0'}`}
                style={{
                  fontSize: 'clamp(0.9375rem, 2.2vw, 1rem)',
                  color: theme.colors.neutral.gray600,
                  fontWeight: theme.typography.fontWeight.normal,
                  lineHeight: 1.6,
                }}
              >
                {getDescription()}
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-8 z-10">
          <div
            className="flex flex-col items-center gap-3 animate-bounce-gentle"
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
          </div>
        </div>
      </div>

      {/* ========== 1. HEADER PITCH - Dynamique selon le département ========== */}
      <Section background="white" style={{ padding: '50px 0 30px' }}>
        <Container size="md">
          <p
            ref={headerPitch.ref}
            className={`animate-on-scroll ${headerPitch.isInView ? 'is-visible' : ''}`}
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
            {getHeaderPitch()}
          </p>
        </Container>
      </Section>

      {/* Pourquoi Nos Châteaux - 4 cartes sur une ligne */}
      <Section background="gray" style={{ padding: '50px 0' }}>
        <Container size="xl">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: theme.spacing.lg }}>
            <div
              ref={whySection.ref}
              className={`animate-on-scroll ${whySection.isInView ? 'is-visible' : ''}`}
            >
              <Text variant="h2" style={{ marginBottom: theme.spacing.sm, textAlign: 'center' }}>
                Pourquoi Choisir Nos Châteaux
              </Text>
              <Text variant="bodyLarge" color="muted" style={{ textAlign: 'center' }}>
                L'excellence au service de vos événements
              </Text>
            </div>
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
              <div
                key={index}
                className={`animate-on-scroll hover-lift ${whySection.isInView ? 'is-visible' : ''}`}
                style={{ animationDelay: `${index * 0.08}s` }}
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
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ========== 2. BOUSSOLE DE CHOIX - Uniquement si pas de filtre département ========== */}
      {!dept && (
      <Section background="white" style={{ padding: '50px 0' }}>
        <Container size="xl">
          <div
            ref={boussole.ref}
            className={`animate-on-scroll ${boussole.isInView ? 'is-visible' : ''}`}
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
                  <div
                    className={`animate-on-scroll hover-lift ${boussole.isInView ? 'is-visible' : ''} hover:shadow-xl`}
                    style={{
                      background: 'white',
                      borderRadius: theme.effects.borderRadius.xl,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: `1px solid ${theme.colors.neutral.gray200}`,
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
                      transition: 'box-shadow 0.2s ease, transform 0.3s ease',
                      animationDelay: `${index * 0.1}s`,
                    }}
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

                    {/* Texte en bas - centré */}
                    <div style={{
                      padding: '1.25rem',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '140px',
                    }}>
                      <Text
                        variant="body"
                        style={{
                          fontWeight: theme.typography.fontWeight.semibold,
                          color: theme.colors.neutral.gray800,
                          marginBottom: '0.5rem',
                          fontSize: '1rem',
                          textAlign: 'center',
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
                          textAlign: 'center',
                        }}
                      >
                        {item.answer}
                      </Text>
                      <Text
                        variant="caption"
                        style={{
                          color: theme.colors.neutral.gray500,
                          fontSize: '0.8rem',
                          textAlign: 'center',
                        }}
                      >
                        {item.detail}
                      </Text>
                      <div style={{ marginTop: '0.75rem' }}>
                        <ArrowRight
                          className="w-4 h-4"
                          style={{ color: theme.colors.primary.bronze }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>
      )}

      {/* Section Châteaux - Design Bento Grid Moderne */}
      <Section spacing="xl" background="white" style={{ padding: '60px 0' }}>
        <Container size="xl">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div
              ref={chateauxSection.ref}
              className={`animate-on-scroll ${chateauxSection.isInView ? 'is-visible' : ''}`}
            >
              <Text variant="h2" style={{ marginBottom: theme.spacing.sm, textAlign: 'center' }}>
                {filteredChateaux.length} Châteaux d'Exception
              </Text>
              <Text variant="bodyLarge" color="muted" style={{ textAlign: 'center' }}>
                Cliquez pour découvrir chaque domaine
              </Text>
            </div>
          </div>

          {/* Bento Grid - Adaptatif selon nombre de châteaux */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: filteredChateaux.length === 1 ? '1fr' : 'repeat(2, 1fr)',
            gap: '1rem',
            maxWidth: filteredChateaux.length === 1 ? '600px' : '1200px',
            margin: '0 auto',
          }}>
            {filteredChateaux.map((chateau, index) => (
              <Link key={chateau.id} href={`/chateaux/${chateau.slug}`}>
                <div
                  className={`animate-on-scroll from-scale hover-scale ${chateauxSection.isInView ? 'is-visible' : ''}`}
                  style={{
                    position: 'relative',
                    height: '320px',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  {/* Image de fond */}
                  <Image
                    src={chateau.images.card}
                    alt={chateau.nom}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ transition: 'transform 0.5s ease' }}
                  />

                  {/* Overlay gradient */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.75) 100%)',
                  }} />

                  {/* Badge région en haut à droite */}
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '50px',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    color: theme.colors.neutral.gray800,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  }}>
                    {chateau.region}
                  </div>

                  {/* Contenu en bas */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '1.5rem',
                  }}>
                    {/* Titre */}
                    <h3 style={{
                      color: 'white',
                      fontSize: '1.35rem',
                      fontWeight: 600,
                      marginBottom: '0.75rem',
                      textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    }}>
                      {chateau.nom}
                    </h3>

                    {/* Stats: Capacité & Chambres */}
                    <div style={{
                      display: 'flex',
                      gap: '1rem',
                      marginBottom: '0.75rem',
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: 'rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(8px)',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '8px',
                      }}>
                        <Users className="w-4 h-4" style={{ color: 'white' }} />
                        <span style={{ color: 'white', fontSize: '0.85rem', fontWeight: 500 }}>
                          {chateau.capacite.max} pers.
                        </span>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: 'rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(8px)',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '8px',
                      }}>
                        <Bed className="w-4 h-4" style={{ color: 'white' }} />
                        <span style={{ color: 'white', fontSize: '0.85rem', fontWeight: 500 }}>
                          {chateau.roomsTotal} ch.
                        </span>
                      </div>
                    </div>

                    {/* CTA avec flèche */}
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: theme.colors.primary.gold,
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        transition: 'transform 0.2s ease',
                      }}
                    >
                      Découvrir
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Hover effect overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: `linear-gradient(135deg, ${theme.colors.primary.bronze}30, ${theme.colors.primary.gold}20)`,
                      pointerEvents: 'none',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                    }}
                    className="group-hover:opacity-100"
                  />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Comment ça marche - 3 étapes sur une ligne avec animations rapides */}
      <Section background="gray" style={{ padding: '50px 0' }}>
        <Container size="xl">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div
              ref={commentSection.ref}
              className={`animate-on-scroll ${commentSection.isInView ? 'is-visible' : ''}`}
            >
              <Text variant="h2" style={{ marginBottom: '0.5rem' }}>
                Comment ça marche
              </Text>
              <Text variant="bodyLarge" color="muted" style={{ textAlign: 'center' }}>
                Un processus simple en 3 étapes
              </Text>
            </div>
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
              <div
                key={index}
                className={`animate-on-scroll from-scale hover-lift-sm ${commentSection.isInView ? 'is-visible' : ''}`}
                style={{ position: 'relative', zIndex: 1, animationDelay: `${index * 0.08}s` }}
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
                  {/* Numéro d'étape */}
                  <div
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
                      transition: 'transform 0.4s ease',
                    }}
                    className="hover:scale-110"
                  >
                    <span style={{
                      color: 'white',
                      fontWeight: theme.typography.fontWeight.bold,
                      fontSize: '1.25rem',
                    }}>
                      {item.step}
                    </span>
                  </div>

                  <Text variant="h5" as="h3" style={{ marginBottom: '0.25rem', fontSize: '1rem', textAlign: 'center' }}>
                    {item.title}
                  </Text>

                  <Text variant="caption" color="muted" style={{ fontSize: '0.85rem', textAlign: 'center' }}>
                    {item.description}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ========== 3. TRUST & SEO BLOCK - Design moderne sur une ligne ========== */}
      <Section background="white" style={{ padding: '50px 0' }}>
        <Container size="xl">
          <div
            ref={trustSection.ref}
            className={`animate-on-scroll ${trustSection.isInView ? 'is-visible' : ''}`}
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
                <div
                  key={index}
                  className={`animate-on-scroll from-scale hover-lift ${trustSection.isInView ? 'is-visible' : ''}`}
                  style={{
                    background: item.gradient,
                    borderRadius: theme.effects.borderRadius.xl,
                    padding: '1.5rem',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                    animationDelay: `${index * 0.1}s`,
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
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA finale */}
      <Section background="gradient" style={{ padding: '60px 0' }}>
        <Container size="lg">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <div
              ref={ctaSection.ref}
              className={`animate-on-scroll ${ctaSection.isInView ? 'is-visible' : ''}`}
            >
              <Text variant="h2" style={{ marginBottom: theme.spacing.lg, textAlign: 'center' }}>
                Prêt à organiser votre événement d'exception ?
              </Text>
              <Text variant="bodyLarge" color="muted" style={{ marginBottom: theme.spacing.xl, textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
                Nos experts vous accompagnent dans le choix du château idéal. Devis gratuit sous 24h.
              </Text>
            </div>

            <div
              ref={ctaButtons.ref}
              className={`animate-on-scroll ${ctaButtons.isInView ? 'is-visible' : ''}`}
              style={{ display: 'flex', gap: theme.spacing.md, justifyContent: 'center', flexWrap: 'wrap', marginTop: theme.spacing.xl, animationDelay: '0.2s' }}
            >
              <Link href="/devis#formulaire">
                <Button variant="primary" size="lg">
                  Demander un Devis Gratuit
                </Button>
              </Link>
              <a href="tel:+33757991146" onClick={() => trackPhoneClick()}>
                <Button variant="outline" size="lg">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Phone className="w-5 h-5" />
                    <span>07 57 99 11 46</span>
                  </div>
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* Section Logos Clients */}
      <LogoCarousel />

      {/* Section Avis Google */}
      <ReviewsSection />
    </>
  );
}
