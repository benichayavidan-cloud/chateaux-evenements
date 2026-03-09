"use client";

import Image from "next/image";
import NextLink from "next/link";
import { Section, Container } from "@/components/layout-v2";
import { Text, Button, Badge } from "@/components/ui-v2";
import { theme } from "@/design-system/tokens";
import { useInView } from "@/hooks/useInView";
import {
  MapPin, Building2, Users, Sparkles, Clock, TreePine, Settings,
  Car, Award, Plane, Train, Heart, Castle, Waves, Music, WifiOff,
  Landmark, Star, Shield, ChevronRight, ArrowRight,
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
import DevisFormMini from "@/components/DevisFormMini";

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

  // Build images for the Airbnb-style photo grid (need 5)
  const gridImages: { src: string; alt: string }[] = [
    { src: data.heroImage, alt: data.h1 },
  ];
  linkedChateaux.forEach((c) => {
    gridImages.push({ src: c.images.card, alt: c.nom });
  });
  // Fill remaining slots from château hero arrays
  for (const c of linkedChateaux) {
    for (const img of c.images.hero) {
      if (gridImages.length >= 5) break;
      if (!gridImages.some((g) => g.src === img)) {
        gridImages.push({ src: img, alt: c.nom });
      }
    }
    if (gridImages.length >= 5) break;
  }

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

      {/* ═══════════════════════════════════════════
          HERO — Style Airbnb (comme pages château)
      ═══════════════════════════════════════════ */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "clamp(1rem, 3vw, 1.5rem) clamp(1rem, 4vw, 2rem) 0" }}>
        <div
          ref={heroView.ref}
          className={`animate-on-scroll ${heroView.isInView ? "is-visible" : ""}`}
          style={{ marginBottom: "clamp(1rem, 2vw, 1.5rem)" }}
        >
          {/* Badge Select Châteaux */}
          <div style={{ marginBottom: "0.5rem" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.375rem 0.75rem",
                background: `linear-gradient(135deg, ${theme.colors.primary.bronze}12, ${theme.colors.primary.gold}08)`,
                border: `1px solid ${theme.colors.primary.bronze}40`,
                borderRadius: theme.effects.borderRadius.full,
              }}
            >
              <Castle className="w-3.5 h-3.5" style={{ color: theme.colors.primary.bronze }} />
              <span style={{ fontSize: "0.8125rem", fontWeight: theme.typography.fontWeight.semibold, color: theme.colors.primary.bronze }}>
                Select Châteaux
              </span>
            </div>
          </div>

          {/* H1 */}
          <h1
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
              fontWeight: theme.typography.fontWeight.semibold,
              fontFamily: theme.typography.fonts.heading,
              lineHeight: 1.2,
              color: theme.colors.neutral.gray900,
              marginBottom: "0.5rem",
            }}
          >
            {data.h1}
          </h1>

          {/* Stats row — Airbnb dot-separated */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", color: theme.colors.neutral.gray600, fontSize: "0.9375rem" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <Castle className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
              {linkedChateaux.length} {linkedChateaux.length > 1 ? "châteaux d'exception" : "château d'exception"}
            </span>
            <span style={{ color: theme.colors.neutral.gray300 }}>·</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <Building2 className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
              {linkedChateaux.reduce((sum, c) => sum + (c.roomsTotal || 0), 0)}+ chambres
            </span>
            <span style={{ color: theme.colors.neutral.gray300 }}>·</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <Star className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
              4,8/5 avis clients
            </span>
            <span style={{ color: theme.colors.neutral.gray300 }}>·</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <Clock className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
              Devis sous 24h
            </span>
          </div>
        </div>

        {/* Photo grid — Airbnb style (2fr 1fr 1fr, 2 rows) */}
        <div
          className="geo-hero-grid rounded-2xl overflow-hidden"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: "4px",
            height: "clamp(280px, 50vh, 460px)",
          }}
        >
          {/* Main image — spans 2 rows */}
          <div className="relative group overflow-hidden" style={{ gridRow: "1 / 3", gridColumn: "1 / 2" }}>
            <Image
              src={gridImages[0].src}
              alt={gridImages[0].alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
              quality={85}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Top-middle */}
          <div className="relative group overflow-hidden geo-hero-cell">
            <Image
              src={gridImages[1]?.src || gridImages[0].src}
              alt={gridImages[1]?.alt || gridImages[0].alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="25vw"
            />
          </div>

          {/* Top-right */}
          <div className="relative group overflow-hidden geo-hero-cell">
            <Image
              src={gridImages[2]?.src || gridImages[0].src}
              alt={gridImages[2]?.alt || gridImages[0].alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="25vw"
            />
          </div>

          {/* Bottom-middle */}
          <div className="relative group overflow-hidden geo-hero-cell">
            <Image
              src={gridImages[3]?.src || gridImages[1]?.src || gridImages[0].src}
              alt={gridImages[3]?.alt || gridImages[0].alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="25vw"
            />
          </div>

          {/* Bottom-right — with "Voir nos domaines" button */}
          <div className="relative group overflow-hidden geo-hero-cell">
            <Image
              src={gridImages[4]?.src || gridImages[2]?.src || gridImages[0].src}
              alt={gridImages[4]?.alt || gridImages[0].alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="25vw"
            />
            <NextLink
              href="#chateaux-zone"
              style={{
                position: "absolute",
                bottom: "0.75rem",
                right: "0.75rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                background: "rgba(255, 255, 255, 0.95)",
                border: `1px solid ${theme.colors.neutral.gray300}`,
                borderRadius: theme.effects.borderRadius.lg,
                fontSize: "0.8125rem",
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.neutral.gray900,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                zIndex: 10,
                textDecoration: "none",
              }}
            >
              <Sparkles className="w-4 h-4" />
              Voir nos domaines
            </NextLink>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          INTRODUCTION — Split image + texte
      ═══════════════════════════════════════════ */}
      <Section spacing="lg" background="white">
        <Container size="xl">
          <div ref={introView.ref} className={`animate-on-scroll ${introView.isInView ? "is-visible" : ""}`}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: theme.spacing["3xl"],
                alignItems: "center",
              }}
              className="geo-intro-grid"
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

      {/* ═══════════════════════════════════════════
          POURQUOI — Background image + glassmorphism
      ═══════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "clamp(3rem, 6vw, 5rem) 0",
        }}
      >
        {/* Background image */}
        {linkedChateaux[1] ? (
          <Image
            src={linkedChateaux[1].images.hero[0]}
            alt={data.pourquoiTitre}
            fill
            className="object-cover"
            sizes="100vw"
            quality={75}
          />
        ) : linkedChateaux[0] && (
          <Image
            src={linkedChateaux[0].images.hero[0]}
            alt={data.pourquoiTitre}
            fill
            className="object-cover"
            sizes="100vw"
            quality={75}
          />
        )}
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.55)" }} />

        <Container size="xl" style={{ position: "relative", zIndex: 1 }}>
          <div ref={pourquoiView.ref} className={`animate-on-scroll ${pourquoiView.isInView ? "is-visible" : ""}`}>
            <div className="section-header" style={{ marginBottom: theme.spacing["3xl"] }}>
              <Text variant="h2" align="center" style={{ marginBottom: theme.spacing.md, color: theme.colors.neutral.white, textShadow: "0 2px 12px rgba(0,0,0,0.3)" }}>
                {data.pourquoiTitre}
              </Text>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: theme.spacing.md }}>
                <div style={{ width: "40px", height: "1px", background: `linear-gradient(to right, transparent, ${theme.colors.primary.gold})` }} />
                <Sparkles className="w-4 h-4" style={{ color: theme.colors.primary.gold }} />
                <div style={{ width: "40px", height: "1px", background: `linear-gradient(to left, transparent, ${theme.colors.primary.gold})` }} />
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
                      background: "rgba(255,255,255,0.12)",
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                      borderRadius: theme.effects.borderRadius.xl,
                      padding: theme.spacing.xl,
                      border: "1px solid rgba(255,255,255,0.2)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: theme.effects.borderRadius.lg,
                        background: "rgba(255,255,255,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: theme.spacing.md,
                      }}
                    >
                      <IconComponent className="w-6 h-6" style={{ color: theme.colors.primary.gold }} />
                    </div>
                    <Text variant="h5" style={{ marginBottom: theme.spacing.sm, color: theme.colors.neutral.white }}>{point.titre}</Text>
                    <Text variant="bodySmall" style={{ lineHeight: theme.typography.lineHeight.relaxed, color: "rgba(255,255,255,0.8)" }}>
                      {point.description}
                    </Text>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════
          CHÂTEAUX DE LA ZONE
      ═══════════════════════════════════════════ */}
      <Section spacing="lg" background="white" id="chateaux-zone">
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

            {linkedChateaux.length === 1 ? (
              <NextLink
                href={`/chateaux/${linkedChateaux[0].slug}`}
                style={{ textDecoration: "none", display: "block" }}
              >
                <div
                  className="group hover-lift-sm geo-single-chateau"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    borderRadius: theme.effects.borderRadius["2xl"],
                    overflow: "hidden",
                    boxShadow: theme.effects.shadows.lg,
                    background: theme.colors.neutral.white,
                    transition: theme.components.card.transition,
                    border: `1px solid ${theme.colors.neutral.gray200}`,
                  }}
                >
                  <div className="chateau-single-image" style={{ position: "relative", minHeight: "400px", overflow: "hidden" }}>
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

                  <div style={{ padding: theme.spacing["3xl"], display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <Text variant="h3" style={{ marginBottom: theme.spacing.md }}>{linkedChateaux[0].nom}</Text>
                    <Text variant="body" color="muted" style={{ marginBottom: theme.spacing.xl, lineHeight: theme.typography.lineHeight.relaxed }}>{linkedChateaux[0].description}</Text>

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
                      <div style={{ position: "relative", height: "320px", minHeight: "320px", overflow: "hidden" }}>
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
                        <Text variant="body" color="muted" lineClamp={3} style={{ marginBottom: theme.spacing.md }}>{chateau.description}</Text>
                        <div style={{ display: "flex", flexWrap: "nowrap", gap: theme.spacing.xs, overflow: "hidden" }}>
                          {chateau.atouts.slice(0, 4).map((atout) => (
                            <span
                              key={atout}
                              style={{
                                fontSize: "11px",
                                background: theme.colors.neutral.gray100,
                                color: theme.colors.neutral.gray700,
                                padding: `3px ${theme.spacing.sm}`,
                                borderRadius: theme.effects.borderRadius.full,
                                whiteSpace: "nowrap",
                                flexShrink: 0,
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

      {/* ═══════════════════════════════════════════
          DEVIS EXPRESS — Formulaire inline
      ═══════════════════════════════════════════ */}
      <section style={{ background: theme.colors.neutral.white, padding: "0 clamp(1rem, 4vw, 2rem)" }}>
        <Container size="xl">
          <DevisFormMini
            chateauIds={linkedChateaux.map((c) => c.id)}
            sourceLabel={data.h1}
          />
        </Container>
      </section>

      {/* ═══════════════════════════════════════════
          INFOS PRATIQUES — Plus visuel avec icônes
      ═══════════════════════════════════════════ */}
      <section style={{ background: "#f6f9fc", padding: "clamp(2rem, 4vw, 3rem) 0" }}>
        <Container size="lg">
          <div ref={infosView.ref} className={`animate-on-scroll ${infosView.isInView ? "is-visible" : ""}`}>
            <div className="section-header" style={{ textAlign: "center", marginBottom: theme.spacing.xl }}>
              <Text variant="h2" align="center" style={{ marginBottom: theme.spacing.md }}>Informations pratiques</Text>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: theme.spacing.md }}>
                <div style={{ width: "40px", height: "1px", background: `linear-gradient(to right, transparent, ${theme.colors.primary.bronze})` }} />
                <Info className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                <div style={{ width: "40px", height: "1px", background: `linear-gradient(to left, transparent, ${theme.colors.primary.bronze})` }} />
              </div>
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
                    borderRadius: theme.effects.borderRadius.xl,
                    padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
                    border: `1px solid ${theme.colors.neutral.gray200}`,
                    display: "flex",
                    flexDirection: "column",
                    gap: theme.spacing.xs,
                  }}
                >
                  <Text variant="caption" color="muted" style={{ textTransform: "uppercase", letterSpacing: theme.typography.letterSpacing.wider, fontWeight: theme.typography.fontWeight.medium, fontSize: "0.7rem" }}>
                    {info.label}
                  </Text>
                  <Text variant="body" weight={600} style={{ color: theme.colors.neutral.gray900, fontSize: theme.typography.fontSize.base }}>
                    {info.value}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════
          CONTENU SEO — Style magazine
      ═══════════════════════════════════════════ */}
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

      {/* ═══════════════════════════════════════════
          BLOG — Articles liés
      ═══════════════════════════════════════════ */}
      {linkedBlogPosts.length > 0 && (
        <section style={{ background: "#f6f9fc", padding: "clamp(2rem, 4vw, 3rem) 0" }}>
          <Container size="xl">
            <div ref={blogView.ref} className={`animate-on-scroll ${blogView.isInView ? "is-visible" : ""}`}>
              <div className="section-header" style={{ textAlign: "center", marginBottom: theme.spacing.xl }}>
                <Text variant="h2" align="center" style={{ marginBottom: theme.spacing.md }}>Articles qui pourraient vous intéresser</Text>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: theme.spacing.md }}>
                  <div style={{ width: "40px", height: "1px", background: `linear-gradient(to right, transparent, ${theme.colors.primary.bronze})` }} />
                  <BookOpen className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                  <div style={{ width: "40px", height: "1px", background: `linear-gradient(to left, transparent, ${theme.colors.primary.bronze})` }} />
                </div>
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
                          borderRadius: theme.effects.borderRadius.xl,
                          overflow: "hidden",
                          boxShadow: theme.effects.shadows.sm,
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
        </section>
      )}

      {/* ═══════════════════════════════════════════
          FAQ — 2 colonnes : questions + image équipe
      ═══════════════════════════════════════════ */}
      <Section spacing="lg" background="white">
        <Container size="xl">
          <div className="section-header" style={{ textAlign: "center", marginBottom: theme.spacing["3xl"] }}>
            <div ref={faqView.ref} className={`animate-on-scroll ${faqView.isInView ? "is-visible" : ""}`}>
              <Text variant="h2" style={{ marginBottom: theme.spacing.md, textAlign: "center" }}>
                Questions fréquentes
              </Text>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: theme.spacing.md }}>
                <div style={{ width: "40px", height: "1px", background: `linear-gradient(to right, transparent, ${theme.colors.primary.bronze})` }} />
                <HelpCircle className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                <div style={{ width: "40px", height: "1px", background: `linear-gradient(to left, transparent, ${theme.colors.primary.bronze})` }} />
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: theme.spacing["3xl"], alignItems: "start" }} className="geo-faq-grid">
            {/* FAQ Accordion */}
            <div>
              {data.faq.map((item, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div key={index} style={{ marginBottom: theme.spacing.md }}>
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: theme.spacing.md,
                        width: "100%",
                        padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
                        background: isOpen ? `${theme.colors.primary.bronze}08` : theme.colors.neutral.white,
                        border: `1px solid ${isOpen ? theme.colors.primary.bronze : theme.colors.neutral.gray200}`,
                        borderRadius: theme.effects.borderRadius.xl,
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: theme.effects.borderRadius.full,
                          background: isOpen ? `linear-gradient(135deg, ${theme.colors.primary.bronze}, ${theme.colors.primary.bronzeDark})` : `${theme.colors.primary.bronze}10`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          transition: "all 0.3s ease",
                        }}
                      >
                        <span style={{ fontSize: theme.typography.fontSize.sm, fontWeight: theme.typography.fontWeight.bold, color: isOpen ? theme.colors.neutral.white : theme.colors.primary.bronze, fontFamily: theme.typography.fonts.heading }}>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <span style={{ flex: 1, fontWeight: theme.typography.fontWeight.semibold, fontSize: theme.typography.fontSize.sm, lineHeight: 1.4, color: theme.colors.neutral.gray900 }}>
                        {item.question}
                      </span>
                      <div style={{ flexShrink: 0 }}>
                        {isOpen ? (
                          <Minus className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                        ) : (
                          <Plus className="w-4 h-4" style={{ color: theme.colors.neutral.gray400 }} />
                        )}
                      </div>
                    </button>

                    <div
                      style={{
                        overflow: "hidden",
                        maxHeight: isOpen ? "400px" : "0px",
                        opacity: isOpen ? 1 : 0,
                        transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
                      }}
                    >
                      <div style={{ padding: `${theme.spacing.md} ${theme.spacing.xl} ${theme.spacing.lg}`, paddingLeft: `calc(36px + ${theme.spacing.md} + ${theme.spacing.xl})` }}>
                        <Text variant="bodySmall" color="muted" style={{ lineHeight: theme.typography.lineHeight.relaxed }}>
                          {item.answer}
                        </Text>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Image équipe */}
            <div
              style={{
                position: "relative",
                borderRadius: theme.effects.borderRadius["2xl"],
                overflow: "hidden",
                height: "100%",
                minHeight: "500px",
              }}
            >
              <Image
                src="/images/equipe-chateau-chef-serveurs-accueil-evenement.webp"
                alt="Notre équipe à votre service — chef, serveurs et responsable accueil"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: theme.spacing.xl }}>
                <p style={{
                  color: theme.colors.neutral.white,
                  fontFamily: theme.typography.fonts.heading,
                  fontStyle: "italic",
                  fontWeight: theme.typography.fontWeight.light,
                  fontSize: theme.typography.fontSize.xl,
                  textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                  margin: 0,
                }}>
                  Notre équipe à votre service
                </p>
                <p style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: theme.typography.fontSize.sm,
                  marginTop: theme.spacing.xs,
                }}>
                  Un interlocuteur dédié de A à Z
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════
          LIENS CROISÉS — Silo géographique
      ═══════════════════════════════════════════ */}
      <section style={{ background: "#f6f9fc", padding: "clamp(2rem, 4vw, 3rem) 0" }}>
        <Container size="lg">
          <div ref={regionsView.ref} className={`animate-on-scroll ${regionsView.isInView ? "is-visible" : ""}`}>
            <div className="section-header" style={{ textAlign: "center", marginBottom: theme.spacing.xl }}>
              <Text variant="h2" align="center" style={{ marginBottom: theme.spacing.md }}>
                Explorez d&apos;autres régions
              </Text>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: theme.spacing.md }}>
                <div style={{ width: "40px", height: "1px", background: `linear-gradient(to right, transparent, ${theme.colors.primary.bronze})` }} />
                <MapPin className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
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
                    background: theme.colors.neutral.white,
                    border: `1px solid ${theme.colors.primary.bronze}25`,
                    transition: "all 0.3s ease",
                    fontSize: theme.typography.fontSize.sm,
                    fontWeight: theme.typography.fontWeight.medium,
                    color: theme.colors.neutral.gray800,
                    boxShadow: theme.effects.shadows.sm,
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
      </section>

      {/* ═══════════════════════════════════════════
          CTA FINALE — Gradient bronze (comme homepage)
      ═══════════════════════════════════════════ */}
      <section
        style={{
          background: `linear-gradient(135deg, ${theme.colors.primary.bronze} 0%, ${theme.colors.primary.bronzeDark} 100%)`,
          padding: "clamp(2rem, 4vw, 3rem) 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.1,
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        <Container size="lg" style={{ position: "relative", zIndex: 1 }}>
          <div ref={ctaView.ref} className={`animate-on-scroll ${ctaView.isInView ? "is-visible" : ""}`} style={{ textAlign: "center" }}>
            <h2 style={{
              marginBottom: theme.spacing.lg,
              fontSize: theme.typography.fontSize.display.sm,
              fontFamily: theme.typography.fonts.heading,
              fontWeight: theme.typography.fontWeight.light,
              fontStyle: "italic",
              color: theme.colors.neutral.white,
            }}>
              Prêt à organiser votre séminaire ?
            </h2>
            <p style={{
              fontSize: theme.typography.fontSize.xl,
              color: theme.colors.neutral.white,
              maxWidth: "700px",
              margin: `0 auto ${theme.spacing.xl}`,
              opacity: 0.95,
              lineHeight: 1.4,
            }}>
              Décrivez-nous votre projet et recevez une proposition personnalisée sous 24h
            </p>
            <div style={{ display: "flex", gap: theme.spacing.md, justifyContent: "center", flexWrap: "wrap" }}>
              <NextLink href="/devis#formulaire">
                <Button
                  variant="secondary"
                  size="lg"
                  style={{
                    background: theme.colors.neutral.white,
                    color: theme.colors.primary.bronze,
                  }}
                >
                  Demander un Devis Gratuit
                </Button>
              </NextLink>
              <NextLink href="/chateaux">
                <Button
                  variant="outline"
                  size="lg"
                  style={{
                    borderColor: theme.colors.neutral.white,
                    color: theme.colors.neutral.white,
                  }}
                >
                  Voir tous nos châteaux
                </Button>
              </NextLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
