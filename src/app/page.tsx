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
import { MapPin, Users, Building2, Star, ArrowRight } from "lucide-react";

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
        autoPlayDuration={6000}
        height="100vh"
        heading="Châteaux d'Exception pour Séminaires en Île-de-France"
      />

      {/* Stats Section - Cartes animées */}
      <StatsSection chiffres={chiffresCles} />

      {/* Châteaux Section */}
      <section
        style={{
          background: '#f6f9fc',
          padding: 'clamp(2rem, 5vw, 3.75rem) 0',
        }}
      >
        <Container size="xl">
          {/* Section Header */}
          <div className="section-header" style={{ marginBottom: theme.spacing['4xl'] }}>
            <Text variant="h2" align="center" style={{ marginBottom: theme.spacing.md }}>
              Nos Châteaux d'Exception
            </Text>
            <Text variant="bodyLarge" color="muted" align="center" style={{ maxWidth: '700px', margin: '0 auto' }}>
              Accédez aux domaines les plus prestigieux d'Île-de-France et de l'Oise pour vos événements professionnels
            </Text>
          </div>

          {/* Cards Grid - 2 colonnes */}
          <div
            className="chateaux-grid"
            style={{ gap: theme.spacing.xl }}
          >
            {chateaux.slice(0, 4).map((chateau) => (
              <Card
                key={chateau.id}
                image={chateau.images.card}
                title={chateau.nom}
                description={chateau.description}
                badge={chateau.region}
                features={chateau.atouts}
                href={`/chateaux/${chateau.slug}`}
                variant="hover-overlay"
                imageHeight="450px"
                ctaLabel="Découvrir ce château"
                footer={
                  <div style={{
                    display: 'flex',
                    gap: theme.spacing.lg,
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.neutral.gray700,
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
                  </div>
                }
              />
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: theme.spacing['4xl'] }}>
            <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
              Voir tous nos châteaux
            </Button>
          </div>
        </Container>
      </section>

      {/* Services Section - Clean & Elegant */}
      <section
        style={{
          background: '#fafafa',
          padding: `${theme.spacing.section.lg} 0`,
        }}
      >
        <Container size="lg">
          {/* Section Header */}
          <div className="section-header" style={{ marginBottom: theme.spacing['3xl'] }}>
            <Text variant="h2" align="center" style={{ marginBottom: theme.spacing.md }}>
              Nos Services d'Excellence
            </Text>
            <Text variant="bodyLarge" color="muted" align="center" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Des événements clés en main dans des lieux d'exception
            </Text>
          </div>

          {/* Services Grid - 2x2 compact */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
            style={{ maxWidth: '900px', margin: '0 auto' }}
          >
            {typesEvenements.map((service, index) => (
              <ServiceCard
                key={service.id}
                icon={service.icon}
                titre={service.titre}
                description={service.description}
                servicesInclus={service.servicesInclus}
                index={index}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Logo Carousel Section */}
      <section
        style={{
          background: '#f6f9fc',
          padding: 'clamp(1.5rem, 4vw, 2.5rem) 0',
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
          padding: 'clamp(0.625rem, 1.5vw, 1.25rem) 0',
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
              maxWidth: '800px',
              margin: `0 auto ${theme.spacing['2xl']} auto`,
              opacity: 0.95,
              textAlign: 'center',
              lineHeight: '1.4',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical' as const,
              overflow: 'hidden',
            }}>
              Nos experts vous accompagnent dans la création d'événements inoubliables dans nos châteaux d'exception
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
                  Découvrir nos châteaux
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
