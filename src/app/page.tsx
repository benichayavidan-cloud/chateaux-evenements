import type { Metadata } from "next";
import Link from "next/link";
import { HeroSlider } from "@/components/sections-v2";
import { Container } from "@/components/layout-v2";
import { Text, Card, Button, Badge } from "@/components/ui-v2";
import { ReviewsSectionLazy } from "@/components/ReviewsSectionLazy";
import { StructuredData } from "@/components/StructuredData";
import { theme } from "@/design-system/tokens";
import { chateaux, testimonials, chiffresCles, clientLogos, typesEvenements } from "@/data/chateaux";
import { LogoCarousel } from "@/components/home/LogoCarousel";
import { ServiceCard } from "@/components/home/ServiceCard";
import { StatsSection } from "@/components/home/StatsSection";
import { generateBreadcrumbSchema, generateAggregateRatingSchema } from "@/utils/seo/structured-data";
import { MapPin, Users, Building2, Star, ArrowRight, DoorOpen, Send } from "lucide-react";

// Metadata statique - Homepage toujours servie en cache (ISR/SSG)
export const metadata: Metadata = {
  title: "Châteaux Séminaire Île-de-France & Oise | Select Châteaux",
  description: "4 châteaux d'exception pour séminaires d'entreprise en Île-de-France et Oise (60). Devis gratuit en 24h. Lieux confidentiels de 10 à 500 personnes. Séminaire résidentiel, CODIR, team building.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  // Préparer les slides du hero à partir des 4 premiers châteaux réels
  const heroSlides = chateaux.slice(0, 4).map((chateau) => ({
    id: chateau.id,
    image: chateau.images.hero[0],
    title: chateau.nom,
    subtitle: chateau.description,
    badge: chateau.region,
    cta: {
      label: "Découvrir ce domaine",
      href: `/chateaux/${chateau.slug}`,
    },
  }));

  // Structured Data pour homepage
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      generateBreadcrumbSchema([{ name: "Accueil", url: "/" }]),
      generateAggregateRatingSchema(),
    ],
  };

  return (
    <>
      {/* Structured Data - Schema.org */}
      <StructuredData data={structuredData} />

      {/* Hero Slider */}
      <HeroSlider
        slides={heroSlides}
        autoPlay
        autoPlayDuration={3000}
        height="100vh"
        heading="Châteaux d'Exception pour Séminaires en Île-de-France"
      />

      {/* Stats Section - Cartes animées */}
      <StatsSection chiffres={chiffresCles} />

      {/* Châteaux Section */}
      <section
        style={{
          background: '#f6f9fc',
          paddingTop: '15px',
          paddingBottom: 'clamp(2rem, 5vw, 3.75rem)',
        }}
      >
        <Container size="xl">
          {/* Section Header */}
          <div className="section-header" style={{ marginBottom: theme.spacing['4xl'] }}>
            <Text variant="h2" align="center" style={{ marginBottom: theme.spacing.md }}>
              4 Châteaux d'Exception en Île-de-France
            </Text>
            <Text variant="bodyLarge" color="muted" align="center" style={{ maxWidth: '940px', margin: '0 auto' }}>
              Réussissez votre prochain séminaire d'entreprise au sein de 4 châteaux d'exception. Situés idéalement en Île-de-France et à proximité immédiate de Paris, ces domaines allient le prestige de l'histoire au confort moderne pour offrir un cadre de travail hors du commun.
            </Text>
            <Text variant="bodyLarge" color="muted" align="center" style={{ maxWidth: '940px', margin: `${theme.spacing.md} auto 0 auto` }}>
              Chaque site dispose d'une capacité d'accueil allant de 40 à 120 chambres, permettant de loger vos collaborateurs dans un environnement raffiné et apaisant, propice à la réflexion comme à la cohésion.
            </Text>
          </div>

          {/* Cards Horizontales Alternées - Style éditorial */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {chateaux.slice(0, 4).map((chateau, index) => (
              <Link
                key={chateau.id}
                href={`/chateaux/${chateau.slug}`}
                className="chateau-editorial-card"
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
                }}
              >
                {/* Image */}
                <div className="chateau-editorial-image" style={{ overflow: 'hidden' }}>
                  <img
                    src={chateau.images.card}
                    alt={`${chateau.nom} - Séminaire entreprise ${chateau.region}`}
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
                    flexWrap: 'nowrap' as const,
                    gap: '6px',
                    marginBottom: '20px',
                    overflow: 'hidden',
                  }}>
                    {chateau.atouts.map((atout) => (
                      <span key={atout} style={{
                        padding: '3px 8px',
                        background: '#f8fafc',
                        border: `1px solid ${theme.colors.neutral.gray200}`,
                        borderRadius: '6px',
                        fontSize: '11px',
                        color: theme.colors.neutral.gray700,
                        whiteSpace: 'nowrap' as const,
                        flexShrink: 0,
                      }}>
                        {atout}
                      </span>
                    ))}
                  </div>

                  {/* Footer: capacité + chambres + CTA */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
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
                          <Building2 className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                          <span>{chateau.roomsTotal} chambres</span>
                        </div>
                      )}
                      {chateau.meetingRooms && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.xs }}>
                          <DoorOpen className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                          <span>{chateau.meetingRooms} salles</span>
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
                      <Link
                        href="/devis#formulaire"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: '6px 14px',
                          background: theme.colors.primary.bronze,
                          color: '#fff',
                          borderRadius: '20px',
                          fontWeight: 600,
                          fontSize: theme.typography.fontSize.xs,
                          textDecoration: 'none',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        <Send className="w-3 h-3" /> Devis Express
                      </Link>
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
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: theme.spacing['4xl'] }}>
            <Link href="/chateaux">
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Voir tous les châteaux
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Services Section - Clean & Elegant */}
      <section
        style={{
          background: '#fafafa',
          paddingTop: '15px',
          paddingBottom: theme.spacing.section.lg,
        }}
      >
        <Container size="xl">
          {/* Section Header */}
          <div className="section-header" style={{ marginBottom: theme.spacing['3xl'] }}>
            <Text variant="h2" align="center" style={{ marginBottom: theme.spacing.md }}>
              Services Sur Mesure : 4 Châteaux d'Exception Proches de Paris
            </Text>
            <Text variant="bodyLarge" color="muted" align="center" style={{ maxWidth: '940px', margin: '0 auto' }}>
              Concevez un séminaire d'entreprise sans contrainte grâce à des solutions événementielles entièrement intégrées. Situés au vert, à deux pas des aéroports internationaux et des gares TGV, ces 4 châteaux d'exception en Île-de-France offrent un équilibre parfait entre accessibilité et déconnexion. Avec un parc hôtelier allant de 40 à 120 chambres, chaque domaine devient le théâtre exclusif de vos ambitions, garantissant une unité de lieu propice à l'efficacité et au ressourcement de vos équipes.
            </Text>
          </div>

          {/* Services Grid - 4 colonnes verticales type forfait */}
          <div className="services-forfait-grid">
            {typesEvenements.map((service, index) => (
              <Link key={service.id} href="/seminaires-soirees-entreprise" style={{ textDecoration: 'none', color: 'inherit' }}>
                <ServiceCard
                  icon={service.icon}
                  titre={service.titre}
                  description={service.description}
                  servicesInclus={service.servicesInclus}
                  variant="compact"
                  index={index}
                />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Logo Carousel Section */}
      <section
        style={{
          background: '#f6f9fc',
          paddingTop: '15px',
          paddingBottom: 'clamp(1.5rem, 4vw, 2.5rem)',
          borderTop: `1px solid ${theme.colors.neutral.gray200}`,
          borderBottom: `1px solid ${theme.colors.neutral.gray200}`,
        }}
      >
        <Container size="xl">
          <p style={{
            textAlign: 'center',
            marginBottom: theme.spacing['3xl'],
            textTransform: 'uppercase',
            letterSpacing: theme.typography.letterSpacing.wider,
            fontSize: theme.typography.fontSize.xs,
            color: theme.colors.neutral.gray600,
            margin: `0 auto ${theme.spacing['3xl']} auto`,
            width: '100%',
          }}>
            Ils nous font confiance
          </p>

          <LogoCarousel logos={clientLogos} />
        </Container>
      </section>

      {/* Reviews Section */}
      <ReviewsSectionLazy />

      {/* CTA Final Section */}
      <section
        style={{
          background: `linear-gradient(135deg, ${theme.colors.primary.bronze} 0%, ${theme.colors.primary.bronzeDark} 100%)`,
          paddingTop: '15px',
          paddingBottom: 'clamp(0.625rem, 1.5vw, 1.25rem)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.1,
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />

        <Container size="xl" style={{ width: '100%' }}>
          <div style={{
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}>
            <h2 style={{
              marginBottom: theme.spacing.lg,
              fontSize: theme.typography.fontSize.display.sm,
              fontFamily: theme.typography.fonts.heading,
              fontWeight: theme.typography.fontWeight.light,
              fontStyle: 'italic',
              color: theme.colors.neutral.white,
              textAlign: 'center',
              width: '100%',
            }}>
              Prêt à organiser votre événement ?
            </h2>
            <p style={{
              fontSize: theme.typography.fontSize.xl,
              color: theme.colors.neutral.white,
              maxWidth: '940px',
              margin: `0 auto ${theme.spacing['2xl']} auto`,
              opacity: 0.95,
              textAlign: 'center',
              lineHeight: '1.4',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical' as const,
              overflow: 'hidden',
            }}>
              Nos experts vous accompagnent dans la création d'événements inoubliables dans des châteaux d'exception
            </p>
            <div style={{
              display: 'flex',
              gap: theme.spacing.md,
              justifyContent: 'center',
              flexWrap: 'wrap',
              width: '100%',
            }}>
              <Link href="/devis#formulaire">
                <Button
                  variant="secondary"
                  size="lg"
                  style={{
                    background: theme.colors.neutral.white,
                    color: theme.colors.primary.bronze,
                  }}
                >
                  Demander un devis gratuit
                </Button>
              </Link>
              <Link href="/chateaux">
                <Button
                  variant="outline"
                  size="lg"
                  style={{
                    borderColor: theme.colors.neutral.white,
                    color: theme.colors.neutral.white,
                  }}
                >
                  Découvrir les châteaux
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
