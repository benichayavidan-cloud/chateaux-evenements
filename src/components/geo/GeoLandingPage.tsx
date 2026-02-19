"use client";

import Image from "next/image";
import NextLink from "next/link";
import { Section, Container } from "@/components/layout-v2";
import { Text, Button, Badge } from "@/components/ui-v2";
import { Link } from "@/components/ui-v2";
import { theme } from "@/design-system/tokens";
import { useInView } from "@/hooks/useInView";
import {
  MapPin, Building2, Users, Sparkles, Clock, TreePine, Settings,
  Car, Award, Plane, Train, Heart, Castle, Waves, Music, WifiOff,
  Landmark, Star, Shield, ChevronRight, ArrowRight, ChevronDown,
  Info, BookOpen, HelpCircle, Plus, Minus, Check,
} from "lucide-react";
import { chateaux } from "@/data/chateaux";
import { blogPosts } from "@/data/blog-posts";
import type { GeoLandingPage as GeoLandingPageData } from "@/data/geo-landing-pages";
import { geoLandingPages } from "@/data/geo-landing-pages";
import { StructuredData } from "@/components/StructuredData";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateGeoLandingSchema,
} from "@/utils/seo/structured-data";
import { useState } from "react";

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  MapPin, Building2, Users, Sparkles, Clock, TreePine, Settings,
  Car, Award, Plane, Train, Heart, Castle, Waves, Music, WifiOff,
  Landmark, Star, Shield,
};

interface GeoLandingPageProps {
  data: GeoLandingPageData;
}

export function GeoLandingPage({ data }: GeoLandingPageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const heroView = useInView();
  const introView = useInView();
  const pourquoiView = useInView();
  const chateauxView = useInView();
  const infosView = useInView();
  const seoView = useInView();
  const blogView = useInView();
  const faqView = useInView();
  const regionsView = useInView();
  const ctaView = useInView();

  // Filtrer les châteaux liés
  const linkedChateaux = chateaux.filter((c) => data.chateauxIds.includes(c.id));

  // Pages géo sœurs (toutes sauf la page courante)
  const siblingGeoPages = geoLandingPages.filter((p) => p.slug !== data.slug);

  // Trouver les articles de blog liés
  const linkedBlogPosts = data.blogLinks
    .map((link) => blogPosts.find((post) => post.slug === link.slug))
    .filter(Boolean);

  // Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      generateGeoLandingSchema(data),
      generateBreadcrumbSchema(data.breadcrumb),
      generateFAQSchema(data.faq),
    ],
  };

  return (
    <>
      <StructuredData data={structuredData} />

      {/* Breadcrumb */}
      <nav
        aria-label="Fil d'Ariane"
        style={{
          background: theme.colors.neutral.gray50,
          borderBottom: `1px solid ${theme.colors.neutral.gray200}`,
          padding: `${theme.spacing.sm} 0`,
        }}
      >
        <Container size="xl">
          <ol style={{ display: "flex", alignItems: "center", gap: theme.spacing.sm, listStyle: "none", padding: 0, margin: 0 }}>
            {data.breadcrumb.map((item, index) => (
              <li key={item.url} style={{ display: "flex", alignItems: "center", gap: theme.spacing.sm }}>
                {index > 0 && <ChevronRight className="w-3 h-3" style={{ color: theme.colors.neutral.gray400 }} />}
                {index === data.breadcrumb.length - 1 ? (
                  <Text variant="bodySmall" color="primary" weight={500} style={{ margin: 0 }}>
                    {item.name}
                  </Text>
                ) : (
                  <NextLink href={item.url} style={{ color: theme.colors.neutral.gray500, fontSize: theme.typography.fontSize.sm, textDecoration: "none", transition: `color ${theme.effects.transitions.base}` }}>
                    {item.name}
                  </NextLink>
                )}
              </li>
            ))}
          </ol>
        </Container>
      </nav>

      {/* Hero Section */}
      <div style={{ height: "50vh", minHeight: "400px", maxHeight: "500px", position: "relative", overflow: "hidden" }}>
        <Image
          src={data.heroImage}
          alt={data.h1}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.4), rgba(0,0,0,0.2))" }} />
        <div
          ref={heroView.ref}
          className={`animate-on-scroll ${heroView.isInView ? "is-visible" : ""}`}
          style={{ position: "relative", height: "100%", display: "flex", alignItems: "flex-end", paddingBottom: "3rem" }}
        >
          <Container size="xl">
            <h1
              style={{
                fontSize: "clamp(1.75rem, 4vw, 3rem)",
                fontWeight: theme.typography.fontWeight.light,
                fontStyle: "italic",
                fontFamily: theme.typography.fonts.heading,
                color: theme.colors.neutral.white,
                lineHeight: 1.2,
                marginBottom: theme.spacing.sm,
              }}
            >
              {data.h1}
            </h1>
            <p
              style={{
                fontSize: "clamp(1rem, 2vw, 1.25rem)",
                color: theme.colors.overlay.white80,
                lineHeight: 1.5,
                maxWidth: "700px",
              }}
            >
              {data.heroAccroche}
            </p>
            <div style={{ marginTop: theme.spacing.xl }}>
              <NextLink href="/devis#formulaire">
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Demander un devis gratuit
                </Button>
              </NextLink>
            </div>
          </Container>
        </div>
      </div>

      {/* Introduction — Layout éditorial image + texte */}
      <Section spacing="lg" background="white">
        <Container size="xl">
          <div ref={introView.ref} className={`animate-on-scroll ${introView.isInView ? "is-visible" : ""}`}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: theme.spacing["3xl"],
                alignItems: "center",
              }}
              className="md-grid-2-cols"
            >
              {/* Image */}
              <div
                style={{
                  position: "relative",
                  borderRadius: theme.effects.borderRadius["2xl"],
                  overflow: "hidden",
                  aspectRatio: "4/3",
                  boxShadow: theme.effects.shadows.xl,
                }}
              >
                {linkedChateaux[0] && (
                  <Image
                    src={linkedChateaux[0].images.card}
                    alt={data.introTitre}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
                {/* Subtle bronze accent line */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(to right, ${theme.colors.primary.bronze}, ${theme.colors.primary.gold}, transparent)` }} />
              </div>

              {/* Texte */}
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: theme.spacing.sm, marginBottom: theme.spacing.lg, padding: "10px 18px", background: `linear-gradient(135deg, ${theme.colors.primary.bronze}12, ${theme.colors.primary.gold}08)`, border: `1px solid ${theme.colors.primary.bronze}30`, borderRadius: theme.effects.borderRadius.full }}>
                  <Sparkles className="w-3.5 h-3.5" style={{ color: theme.colors.primary.bronze }} />
                  <Text variant="caption" style={{ color: theme.colors.primary.bronze, textTransform: "uppercase", letterSpacing: theme.typography.letterSpacing.wider, fontWeight: theme.typography.fontWeight.semibold }}>
                    Notre sélection
                  </Text>
                </div>

                <Text variant="h2" style={{ marginBottom: theme.spacing.xl }}>
                  {data.introTitre}
                </Text>

                {/* Split intro en paragraphes pour aérer */}
                {data.introduction.split(". ").reduce<string[][]>((acc, sentence, i) => {
                  const groupIndex = Math.floor(i / 2);
                  if (!acc[groupIndex]) acc[groupIndex] = [];
                  acc[groupIndex].push(sentence);
                  return acc;
                }, []).map((group, i) => (
                  <Text key={i} variant="body" color="muted" style={{ lineHeight: theme.typography.lineHeight.relaxed, marginBottom: theme.spacing.md }}>
                    {group.join(". ")}{!group[group.length - 1].endsWith(".") ? "." : ""}
                  </Text>
                ))}

                <div style={{ marginTop: theme.spacing.xl }}>
                  <NextLink href="/devis#formulaire">
                    <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                      Découvrir nos domaines
                    </Button>
                  </NextLink>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Pourquoi cette région */}
      <Section spacing="lg" background="gray">
        <Container size="xl">
          <div ref={pourquoiView.ref} className={`animate-on-scroll ${pourquoiView.isInView ? "is-visible" : ""}`}>
            <div className="section-header" style={{ marginBottom: theme.spacing["3xl"] }}>
              <Text variant="h2" align="center" style={{ marginBottom: theme.spacing.md }}>
                {data.pourquoiTitre}
              </Text>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: theme.spacing.md, marginBottom: theme.spacing.md }}>
                <div style={{ width: "40px", height: "1px", background: `linear-gradient(to right, transparent, ${theme.colors.primary.bronze})` }} />
                <Sparkles className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                <div style={{ width: "40px", height: "1px", background: `linear-gradient(to left, transparent, ${theme.colors.primary.bronze})` }} />
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: theme.spacing.xl,
              }}
            >
              {data.pointsForts.map((point, index) => {
                const IconComponent = iconMap[point.icon] || Sparkles;
                return (
                  <div
                    key={index}
                    className="hover-lift-sm"
                    style={{
                      background: theme.colors.neutral.white,
                      borderRadius: theme.effects.borderRadius.xl,
                      padding: theme.spacing.xl,
                      boxShadow: theme.effects.shadows.sm,
                      border: `1px solid ${theme.colors.neutral.gray200}`,
                      transition: theme.components.card.transition,
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: theme.effects.borderRadius.lg,
                        background: `${theme.colors.primary.bronze}12`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: theme.spacing.md,
                      }}
                    >
                      <IconComponent className="w-6 h-6" style={{ color: theme.colors.primary.bronze }} />
                    </div>
                    <Text variant="h5" style={{ marginBottom: theme.spacing.sm }}>{point.titre}</Text>
                    <Text variant="bodySmall" color="muted" style={{ lineHeight: theme.typography.lineHeight.relaxed }}>
                      {point.description}
                    </Text>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* Châteaux de la zone */}
      <Section spacing="lg" background="white">
        <Container size="xl">
          <div ref={chateauxView.ref} className={`animate-on-scroll ${chateauxView.isInView ? "is-visible" : ""}`}>
            <div className="section-header" style={{ marginBottom: theme.spacing["3xl"] }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: theme.spacing.sm, marginBottom: theme.spacing.lg, padding: "12px 20px", background: `linear-gradient(135deg, ${theme.colors.primary.bronze}15, ${theme.colors.primary.gold}10)`, border: `1px solid ${theme.colors.primary.bronze}30`, borderRadius: theme.effects.borderRadius.full }}>
                <Castle className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                <Text variant="caption" style={{ color: theme.colors.primary.bronze, textTransform: "uppercase", letterSpacing: theme.typography.letterSpacing.wider, fontWeight: theme.typography.fontWeight.semibold }}>
                  {linkedChateaux.length > 1 ? "Nos domaines" : "Notre domaine"}
                </Text>
              </div>
              <Text variant="h2" align="center" style={{ marginBottom: theme.spacing.md }}>
                {linkedChateaux.length > 1 ? "Nos châteaux dans cette région" : "Notre château dans cette région"}
              </Text>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: theme.spacing.md }}>
                <div style={{ width: "40px", height: "1px", background: `linear-gradient(to right, transparent, ${theme.colors.primary.bronze})` }} />
                <Sparkles className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                <div style={{ width: "40px", height: "1px", background: `linear-gradient(to left, transparent, ${theme.colors.primary.bronze})` }} />
              </div>
            </div>

            {/* Layout conditionnel : 1 château = éditorial horizontal, 2+ = grille */}
            {linkedChateaux.length === 1 ? (
              /* Layout éditorial pour 1 seul château */
              <NextLink
                href={`/chateaux/${linkedChateaux[0].slug}`}
                style={{ textDecoration: "none", display: "block" }}
              >
                <div
                  className="group hover-lift-sm md-grid-2-cols"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    borderRadius: theme.effects.borderRadius["2xl"],
                    overflow: "hidden",
                    boxShadow: theme.effects.shadows.lg,
                    background: theme.colors.neutral.white,
                    transition: theme.components.card.transition,
                    border: `1px solid ${theme.colors.neutral.gray200}`,
                  }}
                >
                  {/* Grande image */}
                  <div className="chateau-single-image" style={{ position: "relative", minHeight: "350px", overflow: "hidden" }}>
                    <Image
                      src={linkedChateaux[0].images.card}
                      alt={linkedChateaux[0].nom}
                      fill
                      className="object-cover group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ transition: `transform ${theme.effects.transitions.ultra} ${theme.effects.easings.smooth}` }}
                    />
                    <div style={{ position: "absolute", top: theme.spacing.lg, left: theme.spacing.lg }}>
                      <Badge variant="glass" size="lg">{linkedChateaux[0].region}</Badge>
                    </div>
                  </div>

                  {/* Contenu détaillé */}
                  <div style={{ padding: theme.spacing["3xl"], display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <Text variant="h3" style={{ marginBottom: theme.spacing.md }}>{linkedChateaux[0].nom}</Text>
                    <Text variant="body" color="muted" style={{ marginBottom: theme.spacing.xl, lineHeight: theme.typography.lineHeight.relaxed }}>{linkedChateaux[0].description}</Text>

                    {/* Atouts en grille */}
                    <div className="atouts-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: theme.spacing.sm, marginBottom: theme.spacing.xl }}>
                      {linkedChateaux[0].atouts.slice(0, 6).map((atout) => (
                        <div
                          key={atout}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: theme.spacing.sm,
                            fontSize: theme.typography.fontSize.sm,
                            color: theme.colors.neutral.gray700,
                          }}
                        >
                          <Check className="w-4 h-4" style={{ color: theme.colors.primary.bronze, flexShrink: 0 }} />
                          <span>{atout}</span>
                        </div>
                      ))}
                    </div>

                    <div>
                      <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                        Découvrir ce domaine
                      </Button>
                    </div>
                  </div>
                </div>
              </NextLink>
            ) : (
              /* Grille pour 2+ châteaux */
              <div
                className="chateaux-grid"
                style={{ gap: theme.spacing.xl }}
              >
                {linkedChateaux.map((chateau) => (
                  <NextLink
                    key={chateau.id}
                    href={`/chateaux/${chateau.slug}`}
                    style={{ textDecoration: "none", display: "block" }}
                  >
                    <div
                      className="group hover-lift-sm"
                      style={{
                        borderRadius: theme.components.card.borderRadius,
                        overflow: "hidden",
                        boxShadow: theme.components.card.shadow,
                        background: theme.colors.neutral.white,
                        transition: theme.components.card.transition,
                        border: `1px solid ${theme.colors.neutral.gray200}`,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div style={{ position: "relative", height: "280px", minHeight: "280px", overflow: "hidden" }}>
                        <Image
                          src={chateau.images.card}
                          alt={chateau.nom}
                          fill
                          className="object-cover group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          style={{ transition: `transform ${theme.effects.transitions.ultra} ${theme.effects.easings.smooth}` }}
                        />
                        <div style={{ position: "absolute", top: theme.spacing.md, left: theme.spacing.md }}>
                          <Badge variant="glass" size="md">{chateau.region}</Badge>
                        </div>
                      </div>
                      <div style={{ padding: theme.spacing.xl, flex: 1, display: "flex", flexDirection: "column" }}>
                        <Text variant="h4" lineClamp={2} style={{ marginBottom: theme.spacing.sm, minHeight: "2.4em" }}>{chateau.nom}</Text>
                        <Text variant="body" color="muted" lineClamp={2} style={{ marginBottom: theme.spacing.md, minHeight: "3.4em" }}>{chateau.description}</Text>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: theme.spacing.xs }}>
                          {chateau.atouts.slice(0, 4).map((atout) => (
                            <span
                              key={atout}
                              style={{
                                fontSize: theme.typography.fontSize.xs,
                                background: theme.colors.neutral.gray100,
                                color: theme.colors.neutral.gray700,
                                padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                                borderRadius: theme.effects.borderRadius.full,
                              }}
                            >
                              {atout}
                            </span>
                          ))}
                        </div>
                        <div
                          style={{
                            marginTop: "auto",
                            paddingTop: theme.spacing.md,
                            display: "flex",
                            alignItems: "center",
                            gap: theme.spacing.sm,
                            color: theme.colors.primary.bronze,
                            fontWeight: theme.typography.fontWeight.medium,
                            fontSize: theme.typography.fontSize.sm,
                            textTransform: "uppercase",
                            letterSpacing: theme.typography.letterSpacing.wider,
                          }}
                        >
                          <span>Découvrir ce domaine</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </NextLink>
                ))}
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* Infos Pratiques */}
      <Section spacing="md" background="gray" style={{ background: "#f6f9fc" }}>
        <Container size="lg">
          <div ref={infosView.ref} className={`animate-on-scroll ${infosView.isInView ? "is-visible" : ""}`}>
            <div className="section-header" style={{ textAlign: "center", marginBottom: theme.spacing.xl }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: theme.spacing.sm, marginBottom: theme.spacing.lg, padding: "12px 20px", background: `linear-gradient(135deg, ${theme.colors.primary.bronze}15, ${theme.colors.primary.gold}10)`, border: `1px solid ${theme.colors.primary.bronze}30`, borderRadius: theme.effects.borderRadius.full }}>
                <Info className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                <Text variant="caption" style={{ color: theme.colors.primary.bronze, textTransform: "uppercase", letterSpacing: theme.typography.letterSpacing.wider, fontWeight: theme.typography.fontWeight.semibold }}>
                  Pratique
                </Text>
              </div>
              <Text variant="h2" align="center" style={{ marginBottom: theme.spacing.md }}>Informations pratiques</Text>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: theme.spacing.md,
              }}
              className="infos-grid"
            >
              {data.infosPratiques.map((info, index) => (
                <div
                  key={index}
                  style={{
                    background: theme.colors.neutral.white,
                    borderRadius: theme.effects.borderRadius.lg,
                    padding: theme.spacing.lg,
                    border: `1px solid ${theme.colors.neutral.gray200}`,
                  }}
                >
                  <Text variant="caption" color="muted" style={{ textTransform: "uppercase", letterSpacing: theme.typography.letterSpacing.wider, fontWeight: theme.typography.fontWeight.medium }}>
                    {info.label}
                  </Text>
                  <Text variant="body" weight={600} style={{ marginTop: theme.spacing.xs }}>
                    {info.value}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Contenu SEO additionnel */}
      <Section spacing="lg" background="white">
        <Container size="lg">
          <div ref={seoView.ref} className={`animate-on-scroll ${seoView.isInView ? "is-visible" : ""}`}>
            <div
              className="geo-seo-content"
              dangerouslySetInnerHTML={{ __html: data.contenuSEO }}
            />
          </div>
        </Container>
      </Section>

      {/* Articles de blog liés */}
      {linkedBlogPosts.length > 0 && (
        <Section spacing="md" background="gray" style={{ background: "#f6f9fc" }}>
          <Container size="xl">
            <div ref={blogView.ref} className={`animate-on-scroll ${blogView.isInView ? "is-visible" : ""}`}>
              <div className="section-header" style={{ textAlign: "center", marginBottom: theme.spacing.xl }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: theme.spacing.sm, marginBottom: theme.spacing.lg, padding: "12px 20px", background: `linear-gradient(135deg, ${theme.colors.primary.bronze}15, ${theme.colors.primary.gold}10)`, border: `1px solid ${theme.colors.primary.bronze}30`, borderRadius: theme.effects.borderRadius.full }}>
                  <BookOpen className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                  <Text variant="caption" style={{ color: theme.colors.primary.bronze, textTransform: "uppercase", letterSpacing: theme.typography.letterSpacing.wider, fontWeight: theme.typography.fontWeight.semibold }}>
                    Blog
                  </Text>
                </div>
                <Text variant="h2" align="center" style={{ marginBottom: theme.spacing.md }}>Articles qui pourraient vous intéresser</Text>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: theme.spacing.xl,
                }}
              >
                {linkedBlogPosts.map((post) =>
                  post ? (
                    <NextLink
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      style={{ textDecoration: "none", display: "block" }}
                    >
                      <div
                        className="group hover-lift-sm"
                        style={{
                          borderRadius: theme.components.card.borderRadius,
                          overflow: "hidden",
                          boxShadow: theme.components.card.shadow,
                          background: theme.colors.neutral.white,
                          transition: theme.components.card.transition,
                          border: `1px solid ${theme.colors.neutral.gray200}`,
                        }}
                      >
                        <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
                          <Image
                            src={post.image}
                            alt={post.imageAlt}
                            fill
                            className="object-cover group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            style={{ transition: `transform ${theme.effects.transitions.ultra} ${theme.effects.easings.smooth}` }}
                          />
                        </div>
                        <div style={{ padding: theme.spacing.lg }}>
                          <Text variant="caption" color="bronze" style={{ textTransform: "uppercase", letterSpacing: theme.typography.letterSpacing.wider, fontWeight: theme.typography.fontWeight.semibold }}>
                            {post.category === "organisation" ? "Organisation" : post.category === "lieux" ? "Lieux" : "Team Building"}
                          </Text>
                          <Text variant="h5" lineClamp={2} style={{ marginTop: theme.spacing.sm }}>
                            {post.title}
                          </Text>
                          <Text variant="bodySmall" color="muted" style={{ marginTop: theme.spacing.sm }}>
                            {post.readingTime} min de lecture
                          </Text>
                        </div>
                      </div>
                    </NextLink>
                  ) : null
                )}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* FAQ */}
      <Section spacing="lg" background="gray" style={{ background: "#f6f9fc" }}>
        <Container size="lg">
          <div className="section-header" style={{ textAlign: "center", marginBottom: theme.spacing.xl }}>
            <div ref={faqView.ref} className={`animate-on-scroll ${faqView.isInView ? "is-visible" : ""}`}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: theme.spacing.sm, marginBottom: theme.spacing.lg, padding: "12px 20px", background: `linear-gradient(135deg, ${theme.colors.primary.bronze}15, ${theme.colors.primary.gold}10)`, border: `1px solid ${theme.colors.primary.bronze}30`, borderRadius: theme.effects.borderRadius.full }}>
                <HelpCircle className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                <Text variant="caption" style={{ color: theme.colors.primary.bronze, textTransform: "uppercase", letterSpacing: theme.typography.letterSpacing.wider, fontWeight: theme.typography.fontWeight.semibold }}>
                  Questions fréquentes
                </Text>
              </div>
              <Text variant="h2" style={{ marginBottom: theme.spacing.md, textAlign: "center" }}>
                Tout ce que vous devez savoir
              </Text>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: theme.spacing.md, marginBottom: theme.spacing.md }}>
                <div style={{ width: "40px", height: "1px", background: `linear-gradient(to right, transparent, ${theme.colors.primary.bronze})` }} />
                <Sparkles className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                <div style={{ width: "40px", height: "1px", background: `linear-gradient(to left, transparent, ${theme.colors.primary.bronze})` }} />
              </div>
            </div>
          </div>

          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            {data.faq.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="group" style={{ marginBottom: index < data.faq.length - 1 ? "32px" : "48px" }}>
                  <div
                    style={{
                      background: isOpen ? `linear-gradient(135deg, ${theme.colors.neutral.white} 0%, ${theme.colors.primary.bronze}05 100%)` : theme.colors.neutral.white,
                      borderRadius: theme.effects.borderRadius["2xl"],
                      border: `1px solid ${isOpen ? theme.colors.primary.bronze : theme.colors.neutral.gray200}`,
                      boxShadow: isOpen ? `0 8px 32px ${theme.colors.primary.bronze}15, 0 2px 8px ${theme.colors.primary.bronze}08` : "0 2px 8px rgba(0, 0, 0, 0.04)",
                      transition: "all 0.3s ease",
                      padding: "8px",
                    }}
                    className="hover:shadow-xl"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full text-left faq-button"
                      style={{ display: "flex", alignItems: "center", gap: "24px", padding: "24px 32px", background: "none", border: "none", cursor: "pointer" }}
                    >
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: theme.effects.borderRadius.full,
                          background: isOpen ? `linear-gradient(135deg, ${theme.colors.primary.bronze}, ${theme.colors.primary.bronzeDark})` : `${theme.colors.primary.bronze}10`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          boxShadow: isOpen ? `0 4px 16px ${theme.colors.primary.bronze}40` : "none",
                          flexShrink: 0,
                        }}
                        className="group-hover:scale-110 faq-number"
                      >
                        <span style={{ fontSize: theme.typography.fontSize.lg, fontWeight: theme.typography.fontWeight.bold, color: isOpen ? theme.colors.neutral.white : theme.colors.primary.bronze, fontFamily: theme.typography.fonts.heading, transition: "color 0.4s ease" }}>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <Text variant="bodyLarge" as="h3" style={{ lineHeight: theme.typography.lineHeight.snug, transition: "color 0.3s ease", fontWeight: theme.typography.fontWeight.semibold }}>
                          {item.question}
                        </Text>
                      </div>
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: theme.effects.borderRadius.full,
                          background: isOpen ? `${theme.colors.primary.bronze}15` : `${theme.colors.neutral.gray200}80`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          flexShrink: 0,
                        }}
                      >
                        {isOpen ? (
                          <Minus className="w-5 h-5" style={{ color: theme.colors.primary.bronze }} />
                        ) : (
                          <Plus className="w-5 h-5" style={{ color: theme.colors.neutral.gray600 }} />
                        )}
                      </div>
                    </button>

                    <div
                      style={{
                        overflow: "hidden",
                        maxHeight: isOpen ? "500px" : "0px",
                        opacity: isOpen ? 1 : 0,
                        transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
                      }}
                    >
                      <div className="faq-answer-inner" style={{ paddingLeft: "32px", paddingRight: "32px", paddingBottom: "32px", paddingTop: "16px" }}>
                        <div className="faq-answer-text" style={{ paddingTop: "16px", paddingBottom: "8px", paddingLeft: "calc(48px + 24px)", paddingRight: "calc(40px + 24px)", borderTop: `1px solid ${theme.colors.primary.bronze}20` }}>
                          <Text variant="body" color="muted" style={{ lineHeight: theme.typography.lineHeight.relaxed, textAlign: "center" }}>
                            {item.answer}
                          </Text>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Liens croisés - Silo géographique */}
      <Section spacing="md" background="white">
        <Container size="lg">
          <div ref={regionsView.ref} className={`animate-on-scroll ${regionsView.isInView ? "is-visible" : ""}`}>
            <div className="section-header" style={{ textAlign: "center", marginBottom: theme.spacing.xl }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: theme.spacing.sm, marginBottom: theme.spacing.lg, padding: "12px 20px", background: `linear-gradient(135deg, ${theme.colors.primary.bronze}15, ${theme.colors.primary.gold}10)`, border: `1px solid ${theme.colors.primary.bronze}30`, borderRadius: theme.effects.borderRadius.full }}>
                <MapPin className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                <Text variant="caption" style={{ color: theme.colors.primary.bronze, textTransform: "uppercase", letterSpacing: theme.typography.letterSpacing.wider, fontWeight: theme.typography.fontWeight.semibold }}>
                  Nos autres destinations
                </Text>
              </div>
              <Text variant="h2" align="center" style={{ marginBottom: theme.spacing.md }}>
                Explorez d&apos;autres régions pour votre séminaire
              </Text>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: theme.spacing.md }}>
                <div style={{ width: "40px", height: "1px", background: `linear-gradient(to right, transparent, ${theme.colors.primary.bronze})` }} />
                <Sparkles className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                <div style={{ width: "40px", height: "1px", background: `linear-gradient(to left, transparent, ${theme.colors.primary.bronze})` }} />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "10px",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              {siblingGeoPages.map((page, index) => (
                <NextLink
                  key={page.slug}
                  href={`/${page.slug}`}
                  className={`geo-sibling-link animate-on-scroll ${regionsView.isInView ? "is-visible" : ""}`}
                  style={{
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 20px",
                    borderRadius: theme.effects.borderRadius.full,
                    background: `${theme.colors.primary.bronze}08`,
                    border: `1px solid ${theme.colors.primary.bronze}25`,
                    transition: "all 0.3s ease",
                    fontSize: theme.typography.fontSize.sm,
                    fontWeight: theme.typography.fontWeight.medium,
                    color: theme.colors.neutral.gray800,
                    transitionDelay: `${150 + index * 100}ms`,
                  }}
                >
                  <MapPin className="w-3.5 h-3.5" style={{ color: theme.colors.primary.bronze, flexShrink: 0 }} />
                  <span>{page.h1}</span>
                  <ChevronRight className="w-3.5 h-3.5" style={{ color: theme.colors.primary.bronze, opacity: 0.6, flexShrink: 0 }} />
                </NextLink>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA finale */}
      <Section background="gradient" style={{ padding: "30px 0" }}>
        <Container size="lg">
          <div className="section-header" style={{ textAlign: "center" }}>
            <div ref={ctaView.ref} className={`animate-on-scroll ${ctaView.isInView ? "is-visible" : ""}`}>
              <Text variant="h2" style={{ marginBottom: theme.spacing.md, textAlign: "center" }}>
                Prêt à organiser votre séminaire ?
              </Text>
              <Text variant="body" color="muted" align="center" style={{ maxWidth: "700px", margin: `0 auto ${theme.spacing.xl}` }}>
                Décrivez-nous votre projet et recevez une proposition personnalisée sous 24h. Notre équipe vous accompagne de A à Z.
              </Text>
            </div>
            <div style={{ display: "flex", gap: theme.spacing.md, justifyContent: "center", flexWrap: "wrap" }}>
              <NextLink href="/devis#formulaire"><Button variant="primary" size="lg">Demander un Devis</Button></NextLink>
              <NextLink href="/chateaux"><Button variant="outline" size="lg">Voir tous nos châteaux</Button></NextLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
