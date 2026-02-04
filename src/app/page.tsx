import type { Metadata } from "next";
import Link from "next/link";
import { HeroSlider } from "@/components/sections-v2";
import { Container, Row, Col } from "@/components/layout-v2";
import { ReviewsSection } from "@/components/ReviewsSection";
import { Text, Card, Button, Badge } from "@/components/ui-v2";
import { StructuredData } from "@/components/StructuredData";
import { theme } from "@/design-system/tokens";
import { chateaux, testimonials, chiffresCles, clientLogos, typesEvenements } from "@/data/chateaux";
import { LogoCarousel } from "@/components/home/LogoCarousel";
import { ServiceCard } from "@/components/home/ServiceCard";
import { generateBreadcrumbSchema, generateAggregateRatingSchema } from "@/utils/seo/structured-data";
import { MapPin, Users, Building2, Star, ArrowRight } from "lucide-react";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// METADATA DYNAMIQUE ADAPTATIVE (basée sur les paramètres de recherche)
export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;

  // Extraction des paramètres de recherche
  const ville = params.ville as string | undefined;
  const dept = params.dept as string | undefined;
  const type = params.type as string | undefined;
  const capacite = params.capacite as string | undefined;
  const chambres = params.chambres as string | undefined;

  // Mapping des départements
  const deptNames: Record<string, string> = {
    "60": "Oise",
    "92": "Hauts-de-Seine",
    "78": "Yvelines",
    "oise": "Oise (60)",
    "hauts-de-seine": "Hauts-de-Seine (92)",
    "yvelines": "Yvelines (78)",
  };

  // Mapping des types de lieux
  const typeNames: Record<string, string> = {
    "chateau": "Château",
    "abbaye": "Abbaye",
    "domaine": "Domaine",
    "palais": "Palais",
  };

  // Construction du titre dynamique
  let titleParts: string[] = [];
  let descriptionContext = "";

  // Priorité : Type > Ville > Département
  if (type && typeNames[type.toLowerCase()]) {
    titleParts.push(typeNames[type.toLowerCase()]);
    descriptionContext = `${typeNames[type.toLowerCase()]} pour séminaire`;
  } else {
    titleParts.push("Châteaux");
    descriptionContext = "Domaines d'exception pour séminaire";
  }

  titleParts.push("Séminaire");

  if (ville) {
    const villeFormatted = ville.charAt(0).toUpperCase() + ville.slice(1).toLowerCase();
    titleParts.push(villeFormatted);
    descriptionContext += ` à ${villeFormatted}`;
  } else if (dept && deptNames[dept.toLowerCase()]) {
    titleParts.push(deptNames[dept.toLowerCase()]);
    descriptionContext += ` en ${deptNames[dept.toLowerCase()]}`;
  } else {
    titleParts.push("Île-de-France & Oise");
    descriptionContext += " en Île-de-France et Oise";
  }

  if (capacite) {
    titleParts.push(`${capacite} pers`);
    descriptionContext += ` pour ${capacite} personnes`;
  }

  if (chambres) {
    titleParts.push(`${chambres} chambres`);
    descriptionContext += ` avec ${chambres} chambres`;
  }

  const dynamicTitle = `${titleParts.join(" ")} | Select Châteaux`;
  const dynamicDescription = `${descriptionContext}. Accès confidentiel aux domaines les plus convoités pour vos événements d'entreprise. 4 Lieux d'Exception. Devis gratuit.`;

  return {
    title: dynamicTitle,
    description: dynamicDescription,
    robots: {
      index: true,   // EXCEPTION : Page d'accueil visible sur Google
      follow: true,
    },
  };
}

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
  const structuredData = [
    generateBreadcrumbSchema([{ name: "Accueil", url: "/" }]),
    generateAggregateRatingSchema(),
  ];

  return (
    <>
      {/* Structured Data - Schema.org */}
      <StructuredData data={structuredData} />

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
        Location de Châteaux pour Séminaires et Événements d'Entreprise en Île-de-France
      </h1>

      {/* Hero Slider */}
      <HeroSlider
        slides={heroSlides}
        autoPlay
        autoPlayDuration={6000}
        height="100vh"
      />

      {/* Stats Section */}
      <section
        style={{
          background: theme.colors.neutral.white,
          padding: 'clamp(2rem, 5vw, 3.75rem) 0',
          borderBottom: `1px solid ${theme.colors.neutral.gray200}`,
        }}
      >
        <Container size="xl">
          <Row gap="lg" align="center" justify="center">
            {chiffresCles.map((chiffre, index) => (
              <Col key={index} lg={3} md={6} xs={12}>
                <div
                  style={{
                    textAlign: 'center',
                    padding: theme.spacing.xl,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    variant="h1"
                    color="bronze"
                    align="center"
                    style={{
                      fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                      marginBottom: theme.spacing.sm,
                      width: '100%',
                    }}
                  >
                    {chiffre.unite || ''}{chiffre.valeur}{chiffre.suffix || ''}
                  </Text>
                  <Text variant="body" color="muted" align="center" style={{ width: '100%' }}>
                    {chiffre.label}
                  </Text>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

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

          {/* Cards Grid */}
          <Row gap="xl">
            {chateaux.slice(0, 4).map((chateau) => (
              <Col key={chateau.id} lg={6} md={6} xs={12}>
                <Card
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
              </Col>
            ))}
          </Row>

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: theme.spacing['4xl'] }}>
            <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
              Voir tous nos châteaux
            </Button>
          </div>
        </Container>
      </section>

      {/* Services Section */}
      <section
        style={{
          background: theme.colors.neutral.white,
          padding: `${theme.spacing.section.lg} 0`,
        }}
      >
        <Container size="xl">
          {/* Section Header */}
          <div className="section-header" style={{ marginBottom: theme.spacing['4xl'] }}>
            <Text variant="h2" align="center" style={{ marginBottom: theme.spacing.md }}>
              Nos Services d'Excellence
            </Text>
            <Text variant="bodyLarge" color="muted" align="center" style={{ maxWidth: '700px', margin: '0 auto' }}>
              Des événements clés en main dans des lieux d'exception
            </Text>
          </div>

          {/* Services Grid */}
          <Row gap="lg">
            {typesEvenements.map((service) => (
              <Col key={service.id} lg={3} md={6} xs={12}>
                <ServiceCard
                  icon={service.icon}
                  titre={service.titre}
                  description={service.description}
                  servicesInclus={service.servicesInclus}
                />
              </Col>
            ))}
          </Row>
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
      <ReviewsSection />

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
              <Link href="/devis">
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
