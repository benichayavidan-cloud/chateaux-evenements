/**
 * PAGE CHÂTEAUX - Liste des châteaux avec design moderne
 */

'use client';

import { useState } from 'react';
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
import DevisFormMini from '@/components/DevisFormMini';

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
    return null;
  };

  // Images pour la grille hero (5 images depuis les châteaux filtrés)
  const heroImages = [
    filteredChateaux[0]?.images.hero[0],
    filteredChateaux[1]?.images.hero[0] || filteredChateaux[0]?.images.galerie[0],
    filteredChateaux[2]?.images.hero[0] || filteredChateaux[0]?.images.galerie[1],
    filteredChateaux[3]?.images.hero[0] || filteredChateaux[0]?.images.galerie[2],
    filteredChateaux[0]?.images.galerie[0] || filteredChateaux[0]?.images.hero[1],
  ].filter(Boolean) as string[];

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex(i => i !== null ? (i - 1 + heroImages.length) % heroImages.length : null);
  const nextImage = () => setLightboxIndex(i => i !== null ? (i + 1) % heroImages.length : null);

  const chateauxSection = useInView();
  const pitchSection = useInView();
  const stepsSection = useInView();

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

      {/* Hero Section — Style Airbnb (comme les pages châteaux individuelles) */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(1rem, 3vw, 1.5rem) clamp(1rem, 4vw, 2rem) 0' }}>
        {/* Titre + infos au-dessus des photos */}
        <div style={{ marginBottom: 'clamp(1rem, 2vw, 1.5rem)' }}>
          <div className="flex flex-wrap items-center gap-2" style={{ marginBottom: '0.5rem' }}>
            <div
              className="inline-flex items-center gap-2"
              style={{
                padding: '0.375rem 0.75rem',
                background: `linear-gradient(135deg, ${theme.colors.primary.bronze}12, ${theme.colors.primary.gold}08)`,
                border: `1px solid ${theme.colors.primary.bronze}40`,
                borderRadius: theme.effects.borderRadius.full,
              }}
            >
              <MapPin className="w-3.5 h-3.5" style={{ color: theme.colors.primary.bronze }} />
              <span style={{ fontSize: '0.8125rem', fontWeight: theme.typography.fontWeight.semibold, color: theme.colors.primary.bronze }}>
                Île-de-France & Oise
              </span>
            </div>
            <div
              className="inline-flex items-center gap-2"
              style={{
                padding: '0.375rem 0.75rem',
                background: `${theme.colors.primary.bronze}08`,
                border: `1px solid ${theme.colors.primary.bronze}25`,
                borderRadius: theme.effects.borderRadius.full,
              }}
            >
              <span style={{ fontSize: '0.8125rem', fontWeight: theme.typography.fontWeight.semibold, color: theme.colors.primary.bronze }}>
                {filteredChateaux.length} {filteredChateaux.length > 1 ? 'Domaines' : 'Domaine'} d'Exception
              </span>
            </div>
          </div>

          <div
            aria-hidden="true"
            style={{
              fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
              fontWeight: theme.typography.fontWeight.semibold,
              fontFamily: theme.typography.fonts.heading,
              lineHeight: 1.2,
              color: theme.colors.neutral.gray900,
              marginBottom: '0.5rem',
            }}
          >
            {getTitle()}
          </div>

          <p style={{
            color: theme.colors.neutral.gray600,
            fontSize: '0.9375rem',
            lineHeight: 1.6,
            maxWidth: '700px',
          }}>
            {getDescription()}
          </p>
        </div>

        {/* Grille photos style Airbnb */}
        <div
          className="rounded-2xl overflow-hidden hero-grid-listing"
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gap: '4px',
            height: 'clamp(300px, 55vh, 500px)',
          }}
        >
          {/* Grande image principale à gauche — occupe 2 lignes */}
          <div
            className="relative cursor-pointer group overflow-hidden"
            style={{ gridRow: '1 / 3', gridColumn: '1 / 2' }}
            onClick={() => openLightbox(0)}
          >
            <Image
              src={heroImages[0] || ''}
              alt={`${filteredChateaux[0]?.nom || 'Château'} - Vue principale`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
              quality={85}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* 4 petites images à droite — grille 2x2 */}
          <div className="relative cursor-pointer group overflow-hidden" onClick={() => openLightbox(1)}>
            <Image
              src={heroImages[1] || ''}
              alt={`${filteredChateaux[1]?.nom || 'Château'} - Vue`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              quality={80}
              sizes="25vw"
            />
          </div>

          <div className="relative cursor-pointer group overflow-hidden" onClick={() => openLightbox(2)}>
            <Image
              src={heroImages[2] || ''}
              alt={`${filteredChateaux[2]?.nom || 'Château'} - Vue`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              quality={80}
              sizes="25vw"
            />
          </div>

          <div className="relative cursor-pointer group overflow-hidden" onClick={() => openLightbox(3)}>
            <Image
              src={heroImages[3] || ''}
              alt={`${filteredChateaux[3]?.nom || 'Château'} - Vue`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              quality={80}
              sizes="25vw"
            />
          </div>

          <div className="relative cursor-pointer group overflow-hidden" onClick={() => openLightbox(4)}>
            <Image
              src={heroImages[4] || ''}
              alt="Vue complémentaire"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              quality={80}
              sizes="25vw"
            />
            {/* Bouton "Toutes les photos" */}
            <button
              onClick={(e) => { e.stopPropagation(); openLightbox(0); }}
              style={{
                position: 'absolute',
                bottom: '0.75rem',
                right: '0.75rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                background: 'rgba(255, 255, 255, 0.95)',
                border: `1px solid ${theme.colors.neutral.gray300}`,
                borderRadius: theme.effects.borderRadius.lg,
                fontSize: '0.8125rem',
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.neutral.gray900,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                zIndex: 10,
              }}
            >
              <Sparkles className="w-4 h-4" />
              Toutes les photos
            </button>
          </div>
        </div>

        {/* CTA Bar sous les photos */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginTop: 'clamp(1rem, 2vw, 1.25rem)',
            padding: 'clamp(1rem, 2vw, 1.25rem)',
            background: theme.colors.neutral.gray50,
            borderRadius: theme.effects.borderRadius.xl,
            border: `1px solid ${theme.colors.neutral.gray200}`,
            flexWrap: 'wrap',
          }}
        >
          <p
            style={{
              fontSize: 'clamp(0.875rem, 2vw, 1rem)',
              color: theme.colors.neutral.gray600,
              fontStyle: 'italic',
              margin: 0,
              flex: '1 1 auto',
              minWidth: 0,
            }}
          >
            Collection exclusive de domaines privatisables aux portes de Paris pour vos événements d'entreprise
          </p>
          <div className="flex gap-2.5 flex-shrink-0 items-center">
            <Link
              href="/devis#formulaire"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: theme.effects.borderRadius.full,
                background: `linear-gradient(135deg, ${theme.colors.primary.gold} 0%, ${theme.colors.primary.bronze} 100%)`,
                color: '#FFFFFF',
                fontWeight: theme.typography.fontWeight.bold,
                fontSize: '0.875rem',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(183, 135, 77, 0.3)',
                transition: 'all 0.2s ease',
              }}
            >
              Devis Gratuit en 24h
            </Link>
            <a
              href="tel:+33757991146"
              onClick={() => trackPhoneClick()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '12px 20px',
                borderRadius: theme.effects.borderRadius.full,
                border: `1.5px solid ${theme.colors.neutral.gray300}`,
                color: theme.colors.neutral.gray700,
                fontWeight: theme.typography.fontWeight.semibold,
                fontSize: '0.875rem',
                textDecoration: 'none',
                background: 'white',
                transition: 'all 0.2s ease',
              }}
            >
              <Phone className="w-4 h-4" />
              07 57 99 11 46
            </a>
          </div>
        </div>
      </div>

      {/* ========== 2. LES 4 CHÂTEAUX — Cards éditoriales alternées ========== */}
      <section
        style={{
          background: '#f6f9fc',
          paddingTop: '15px',
          paddingBottom: 'clamp(2rem, 5vw, 3.75rem)',
        }}
      >
        <Container size="xl">
          <div className="section-header" style={{ marginBottom: theme.spacing['3xl'] }}>
            <Text variant="h2" align="center" style={{ marginBottom: theme.spacing.md }}>
              {filteredChateaux.length} Châteaux d'Exception en Île-de-France
            </Text>
            <Text variant="bodyLarge" color="muted" align="center" style={{ maxWidth: '700px', margin: '0 auto' }}>
              Cliquez pour découvrir chaque domaine en détail
            </Text>
          </div>

          <div
            ref={chateauxSection.ref}
            style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}
          >
            {filteredChateaux.map((chateau, index) => (
              <Link
                key={chateau.id}
                href={`/chateaux/${chateau.slug}`}
                className={`chateau-editorial-card animate-on-scroll ${chateauxSection.isInView ? 'is-visible' : ''}`}
                style={{
                  display: 'flex',
                  background: '#fff',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                  border: '1px solid #f0f0f0',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Image */}
                <div className="chateau-editorial-image" style={{ overflow: 'hidden' }}>
                  <Image
                    src={chateau.images.card}
                    alt={`${chateau.nom} - Séminaire entreprise ${chateau.region}`}
                    width={800}
                    height={500}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                  />
                </div>

                {/* Contenu */}
                <div className="chateau-editorial-content" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                  <span style={{
                    display: 'inline-block',
                    width: 'fit-content',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: theme.typography.fontSize.xs,
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase' as const,
                    background: 'rgba(184,134,11,0.1)',
                    color: theme.colors.primary.bronze,
                  }}>
                    {chateau.region}
                  </span>

                  <h3 style={{
                    fontFamily: theme.typography.fonts.heading,
                    fontSize: 'clamp(20px, 2vw, 26px)',
                    fontStyle: 'italic',
                    color: theme.colors.neutral.gray900,
                    margin: '12px 0 8px',
                    lineHeight: 1.3,
                  }}>
                    {chateau.nom}
                  </h3>

                  <p style={{
                    color: theme.colors.neutral.gray600,
                    fontSize: theme.typography.fontSize.sm,
                    lineHeight: 1.7,
                    marginBottom: '16px',
                  }}>
                    {chateau.description}
                  </p>

                  {/* Atouts */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap' as const,
                    gap: '8px',
                    marginBottom: '20px',
                  }}>
                    {chateau.atouts.map((atout) => (
                      <span key={atout} style={{
                        padding: '4px 10px',
                        background: '#f8fafc',
                        border: `1px solid ${theme.colors.neutral.gray200}`,
                        borderRadius: '6px',
                        fontSize: '12px',
                        color: theme.colors.neutral.gray700,
                      }}>
                        {atout}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '16px',
                    borderTop: `1px solid ${theme.colors.neutral.gray200}`,
                  }}>
                    <div style={{
                      display: 'flex',
                      gap: theme.spacing.lg,
                      fontSize: theme.typography.fontSize.sm,
                      color: theme.colors.neutral.gray600,
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.xs }}>
                        <Users className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                        <span>{chateau.capacite.min}-{chateau.capacite.max} pers</span>
                      </div>
                      {chateau.roomsTotal && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.xs }}>
                          <Bed className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                          <span>{chateau.roomsTotal} chambres</span>
                        </div>
                      )}
                    </div>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: theme.colors.primary.bronze,
                      fontWeight: 600,
                      fontSize: theme.typography.fontSize.sm,
                    }}>
                      Découvrir <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ========== 3. PITCH ÉDITORIAL — Texte + Chiffres-clés ========== */}
      <section style={{ background: '#fff', padding: 'clamp(2.5rem, 5vw, 3.75rem) 0' }}>
        <Container size="xl">
          <div
            ref={pitchSection.ref}
            className={`animate-on-scroll ${pitchSection.isInView ? 'is-visible' : ''}`}
          >
            {/* Titre centré */}
            <h2
              style={{
                textAlign: 'center',
                fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                fontFamily: theme.typography.fonts.heading,
                fontWeight: theme.typography.fontWeight.light,
                fontStyle: 'italic',
                color: theme.colors.neutral.gray900,
                lineHeight: 1.3,
                marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
              }}
            >
              L'Équilibre Parfait : 4 Châteaux d'Exception entre Paris et Nature
            </h2>

            {/* Layout 2 colonnes : texte + chiffres-clés */}
            <div className="pitch-layout" style={{
              display: 'flex',
              gap: 'clamp(2rem, 4vw, 3.5rem)',
              maxWidth: '1100px',
              margin: '0 auto',
              alignItems: 'flex-start',
            }}>
              {/* Texte — 60% */}
              <div className="pitch-text" style={{ flex: '1 1 60%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <p style={{
                    fontSize: 'clamp(0.9375rem, 2vw, 1.025rem)',
                    lineHeight: 1.8,
                    color: theme.colors.neutral.gray600,
                  }}>
                    Réussir un séminaire d'entreprise demande un cadre qui inspire autant qu'il rassure.
                    Répartis stratégiquement dans les <strong style={{ color: theme.colors.neutral.gray800 }}>Hauts-de-Seine (92)</strong>,
                    les <strong style={{ color: theme.colors.neutral.gray800 }}>Yvelines (78)</strong> et
                    l'<strong style={{ color: theme.colors.neutral.gray800 }}>Oise (60)</strong>,
                    ces 4 châteaux d'exception offrent une accessibilité rare, à moins d'une heure de la capitale.
                  </p>
                  <p style={{
                    fontSize: 'clamp(0.9375rem, 2vw, 1.025rem)',
                    lineHeight: 1.8,
                    color: theme.colors.neutral.gray600,
                  }}>
                    Chaque domaine garantit une <strong style={{ color: theme.colors.neutral.gray800 }}>unité de lieu totale</strong>.
                    Journée d'étude intensive ou séminaire résidentiel de plusieurs jours,
                    les infrastructures s'adaptent avec <strong style={{ color: theme.colors.neutral.gray800 }}>40 à 120 chambres</strong> par site.
                  </p>
                  <p style={{
                    fontSize: 'clamp(0.9375rem, 2vw, 1.025rem)',
                    lineHeight: 1.8,
                    color: theme.colors.neutral.gray600,
                  }}>
                    De la séance de travail stratégique à la soirée d'entreprise mémorable,
                    l'Île-de-France devient le théâtre d'une <strong style={{ color: theme.colors.neutral.gray800 }}>excellence opérationnelle sans compromis</strong>.
                  </p>
                </div>
              </div>

              {/* Chiffres-clés — 40% */}
              <div className="pitch-stats" style={{
                flex: '0 0 auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                minWidth: '220px',
              }}>
                {[
                  { value: '< 1h', label: 'de Paris', icon: Clock },
                  { value: '40–120', label: 'chambres par site', icon: Bed },
                  { value: '100%', label: 'privatisable', icon: Shield },
                  { value: '15 ans', label: 'd\'expertise B2B', icon: Award },
                ].map((stat, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem 1.25rem',
                    background: theme.colors.neutral.gray50,
                    borderRadius: '12px',
                    border: `1px solid ${theme.colors.neutral.gray200}`,
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: `linear-gradient(135deg, ${theme.colors.primary.bronze}15, ${theme.colors.primary.gold}10)`,
                      border: `1px solid ${theme.colors.primary.bronze}25`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <stat.icon className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                    </div>
                    <div>
                      <div style={{
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: theme.colors.neutral.gray900,
                        lineHeight: 1.2,
                      }}>
                        {stat.value}
                      </div>
                      <div style={{
                        fontSize: '0.8125rem',
                        color: theme.colors.neutral.gray500,
                      }}>
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========== 4. COMMENT ÇA MARCHE — Bannière compacte ========== */}
      <section style={{
        background: theme.colors.neutral.gray50,
        borderTop: `1px solid ${theme.colors.neutral.gray200}`,
        borderBottom: `1px solid ${theme.colors.neutral.gray200}`,
        padding: 'clamp(1.5rem, 3vw, 2.5rem) 0',
      }}>
        <Container size="xl">
          <div
            ref={stepsSection.ref}
            className={`animate-on-scroll ${stepsSection.isInView ? 'is-visible' : ''}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(1.5rem, 4vw, 3rem)',
              flexWrap: 'wrap',
            }}
          >
            <span style={{
              fontSize: 'clamp(0.875rem, 2vw, 1rem)',
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.neutral.gray800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Comment ça marche
            </span>

            <div style={{
              width: '1px',
              height: '24px',
              background: theme.colors.neutral.gray300,
            }} className="hidden-mobile-divider" />

            {[
              { step: '1', title: 'Demande', desc: 'Formulaire rapide' },
              { step: '2', title: 'Sélection', desc: 'Châteaux sur-mesure' },
              { step: '3', title: 'Organisation', desc: 'On gère tout' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${theme.colors.primary.bronze}, ${theme.colors.primary.gold})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ color: 'white', fontWeight: 700, fontSize: '0.8125rem' }}>{item.step}</span>
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: theme.colors.neutral.gray800, lineHeight: 1.2 }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: theme.colors.neutral.gray500 }}>
                    {item.desc}
                  </div>
                </div>
                {i < 2 && (
                  <ArrowRight className="w-4 h-4" style={{ color: theme.colors.neutral.gray400, marginLeft: '0.5rem' }} />
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ========== 5. FORMULAIRE DEVIS EXPRESS ========== */}
      <Section background="white" style={{ padding: '0' }}>
        <Container size="lg">
          <DevisFormMini chateauId="conseil" chateauNom="Nos Châteaux d'Exception" />
        </Container>
      </Section>

      {/* ========== 6. LOGOS CLIENTS ========== */}
      <LogoCarousel />

      {/* ========== 7. AVIS GOOGLE ========== */}
      <ReviewsSection />

      {/* ========== 8. CTA FINALE — Bandeau slim ========== */}
      <section style={{
        background: `linear-gradient(135deg, ${theme.colors.primary.bronze} 0%, ${theme.colors.primary.bronzeDark} 100%)`,
        padding: 'clamp(1rem, 2.5vw, 1.5rem) 0',
      }}>
        <Container size="xl">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(1rem, 3vw, 2rem)',
            flexWrap: 'wrap',
          }}>
            <span style={{
              color: 'white',
              fontSize: 'clamp(0.9375rem, 2vw, 1.125rem)',
              fontWeight: theme.typography.fontWeight.medium,
              fontFamily: theme.typography.fonts.heading,
              fontStyle: 'italic',
            }}>
              Votre prochain séminaire commence ici
            </span>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/devis#formulaire"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 24px',
                  borderRadius: theme.effects.borderRadius.full,
                  background: 'white',
                  color: theme.colors.primary.bronze,
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                Devis gratuit en 24h
              </Link>
              <a
                href="tel:+33757991146"
                onClick={() => trackPhoneClick()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 20px',
                  borderRadius: theme.effects.borderRadius.full,
                  border: '1.5px solid rgba(255,255,255,0.5)',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <Phone className="w-4 h-4" />
                07 57 99 11 46
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Lightbox carrousel avec flèches */}
      {lightboxIndex !== null && (
        <div
          className="animate-fade-only"
          onClick={closeLightbox}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'Escape') closeLightbox();
          }}
          tabIndex={0}
          ref={(el) => el?.focus()}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.95)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', outline: 'none' }}
        >
          {/* Bouton fermer */}
          <button
            onClick={closeLightbox}
            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.1)', border: '2px solid rgba(255, 255, 255, 0.2)', color: 'white', fontSize: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)', zIndex: 10000 }}
            aria-label="Fermer"
          >
            ✕
          </button>

          {/* Compteur */}
          <div style={{ position: 'absolute', top: '1.5rem', left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.8)', fontSize: '0.9375rem', fontWeight: 600, zIndex: 10000 }}>
            {lightboxIndex + 1} / {heroImages.length}
          </div>

          {/* Flèche gauche */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            style={{ position: 'absolute', left: 'clamp(0.5rem, 2vw, 1.5rem)', top: '50%', transform: 'translateY(-50%)', width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.15)', border: '2px solid rgba(255, 255, 255, 0.3)', color: 'white', fontSize: '1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)', zIndex: 10000, transition: 'all 0.2s ease' }}
            aria-label="Image précédente"
          >
            ‹
          </button>

          {/* Flèche droite */}
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            style={{ position: 'absolute', right: 'clamp(0.5rem, 2vw, 1.5rem)', top: '50%', transform: 'translateY(-50%)', width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.15)', border: '2px solid rgba(255, 255, 255, 0.3)', color: 'white', fontSize: '1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)', zIndex: 10000, transition: 'all 0.2s ease' }}
            aria-label="Image suivante"
          >
            ›
          </button>

          {/* Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ position: 'relative', width: '100%', height: '100%', maxWidth: '1400px', maxHeight: '85vh', cursor: 'default' }}
          >
            <Image src={heroImages[lightboxIndex]} alt={`Photo ${lightboxIndex + 1}`} fill sizes="100vw" className="object-contain" quality={85} priority />
          </div>
        </div>
      )}
    </>
  );
}
