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
  Landmark, Star, Shield, ChevronRight, ArrowRight, DoorOpen,
  Info, BookOpen, HelpCircle, Plus, Minus, Check, Phone, Send,
} from "lucide-react";
import { chateaux } from "@/data/chateaux";
// blogPosts importé côté serveur et passé en props (évite 861KB dans le bundle client)
import type { GeoLandingPage as GeoLandingPageData } from "@/data/geo-landing-pages";
import { geoLandingPages } from "@/data/geo-landing-pages";
import { StructuredData } from "@/components/StructuredData";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateGeoLandingSchema,
} from "@/utils/seo/structured-data";
import { useState, useEffect, useRef } from "react";
import DevisFormMini from "@/components/DevisFormMini";
import { trackPhoneClick } from "@/components/Analytics";

// ── StickySlider — CSS natif (hardware-accelerated, pas de JS scroll listener) ──
function StickySlider({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: 'sticky', top: '100px', alignSelf: 'flex-start' }}>
      {children}
    </div>
  );
}

// ── ParaCard — bordure dorée avec label auto-détecté ──
function ParaCard({ text, sectionBg = 'white' }: { text: string; sectionBg?: 'gray' | 'white' }) {
  const [hovered, setHovered] = useState(false);
  const colonMatch = text.match(/^(.{5,55}?)\s:\s/);
  const label = colonMatch ? colonMatch[1] : null;
  const body = colonMatch && label ? text.substring(colonMatch[0].length) : text;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: sectionBg === 'gray' ? 'white' : theme.colors.neutral.gray50,
        borderRadius: '16px',
        padding: 'clamp(16px, 3vw, 24px) clamp(18px, 3vw, 28px)',
        marginBottom: '12px',
        borderLeft: `3px solid ${theme.colors.primary.gold}`,
        boxShadow: hovered ? '0 8px 30px rgba(0,0,0,0.08)' : '0 2px 12px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateX(4px)' : 'translateX(0)',
        transition: 'all 0.3s ease',
      }}
    >
      {label && (
        <div style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: theme.colors.primary.bronze, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: `${theme.colors.primary.bronze}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: theme.colors.primary.bronze }}>✦</div>
          {label}
        </div>
      )}
      <p style={{ fontSize: 'clamp(0.8125rem, 1.5vw, 0.9375rem)', lineHeight: 1.8, color: theme.colors.neutral.gray600, margin: 0 }}>{body}</p>
    </div>
  );
}

// ── GeoSlider — autoplay + flèches + dots ──
function GeoSlider({ images, nom }: { images: string[]; nom: string }) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(false);

  const startAutoplay = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isVisibleRef.current) return;
    timerRef.current = setInterval(() => { setCurrent(prev => (prev + 1) % images.length); }, 3000);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) startAutoplay();
        else if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => { observer.disconnect(); if (timerRef.current) clearInterval(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  const goTo = (index: number) => { setCurrent(index); startAutoplay(); };

  return (
    <div ref={containerRef} style={{ position: 'relative', height: '420px', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
      {images.map((img, i) => (
        <div key={i} style={{ position: 'absolute', inset: 0, opacity: current === i ? 1 : 0, transition: 'opacity 0.6s ease-in-out' }}>
          <Image src={img} alt={`${nom} - ${i + 1}`} fill className="object-cover" loading="lazy" quality={80} sizes="50vw" />
        </div>
      ))}
      <button onClick={() => goTo((current - 1 + images.length) % images.length)} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.85)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', color: '#333', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', zIndex: 2 }} aria-label="Précédent">‹</button>
      <button onClick={() => goTo((current + 1) % images.length)} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.85)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', color: '#333', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', zIndex: 2 }} aria-label="Suivant">›</button>
      <div style={{ position: 'absolute', bottom: '0.75rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px', zIndex: 2 }}>
        {images.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{ width: current === i ? '20px' : '8px', height: '8px', borderRadius: '4px', border: 'none', cursor: 'pointer', background: current === i ? 'white' : 'rgba(255,255,255,0.5)', transition: 'all 0.3s ease' }} aria-label={`Photo ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  MapPin, Building2, Users, Sparkles, Clock, TreePine, Settings,
  Car, Award, Plane, Train, Heart, Castle, Waves, Music, WifiOff,
  Landmark, Star, Shield,
};

export interface LinkedBlogPost {
  slug: string;
  title: string;
  image: string;
  imageAlt: string;
  category: "organisation" | "lieux" | "team-building";
  readingTime: number;
}

interface GeoLandingPageProps {
  data: GeoLandingPageData;
  linkedBlogPosts?: LinkedBlogPost[];
}

export function GeoLandingPage({ data, linkedBlogPosts = [] }: GeoLandingPageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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

  // Blog posts résolus côté serveur via props

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

  // Build extended images for lightbox (all grid images + more from châteaux)
  const allGeoImages: { src: string; alt: string }[] = [...gridImages];
  for (const c of linkedChateaux) {
    for (const img of [...c.images.hero, ...c.images.galerie]) {
      if (!allGeoImages.some((g) => g.src === img)) {
        allGeoImages.push({ src: img, alt: c.nom });
      }
    }
  }

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex(i => i !== null ? (i - 1 + allGeoImages.length) % allGeoImages.length : null);
  const nextImage = () => setLightboxIndex(i => i !== null ? (i + 1) % allGeoImages.length : null);

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

          {/* CTA hero — conversion rapide Ads */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "0.75rem", flexWrap: "wrap" }}>
            <a
              href="#devis-express"
              style={{ textDecoration: "none" }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("devis-express")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Button variant="primary" size="md" leftIcon={<Send className="w-4 h-4" />}>
                Devis Express Gratuit
              </Button>
            </a>
            <a
              href="tel:+33757991146"
              onClick={() => trackPhoneClick()}
              className="badge-lg border-2 border-white/40 bg-black/40 backdrop-blur-md text-white font-semibold text-sm hover:bg-black/50 transition-all"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Phone className="w-4 h-4" style={{ color: "white" }} />
              07 57 99 11 46
            </a>
          </div>
        </div>

        {/* Photo grid — Airbnb style (2fr 1fr 1fr, 2 rows) — cliquable avec lightbox */}
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
          <div className="relative cursor-pointer group overflow-hidden" style={{ gridRow: "1 / 3", gridColumn: "1 / 2" }} onClick={() => openLightbox(0)}>
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
          <div className="relative cursor-pointer group overflow-hidden geo-hero-cell" onClick={() => openLightbox(1)}>
            <Image
              src={gridImages[1]?.src || gridImages[0].src}
              alt={gridImages[1]?.alt || gridImages[0].alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="25vw"
            />
          </div>

          {/* Top-right */}
          <div className="relative cursor-pointer group overflow-hidden geo-hero-cell" onClick={() => openLightbox(2)}>
            <Image
              src={gridImages[2]?.src || gridImages[0].src}
              alt={gridImages[2]?.alt || gridImages[0].alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="25vw"
            />
          </div>

          {/* Bottom-middle */}
          <div className="relative cursor-pointer group overflow-hidden geo-hero-cell" onClick={() => openLightbox(3)}>
            <Image
              src={gridImages[3]?.src || gridImages[1]?.src || gridImages[0].src}
              alt={gridImages[3]?.alt || gridImages[0].alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="25vw"
            />
          </div>

          {/* Bottom-right — with "Toutes les photos" button */}
          <div className="relative cursor-pointer group overflow-hidden geo-hero-cell" onClick={() => openLightbox(4)}>
            <Image
              src={gridImages[4]?.src || gridImages[2]?.src || gridImages[0].src}
              alt={gridImages[4]?.alt || gridImages[0].alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="25vw"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(0);
              }}
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
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                zIndex: 10,
              }}
            >
              <Sparkles className="w-4 h-4" />
              Toutes les photos
            </button>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          INTRODUCTION — Design "Le lieu" (StickySlider + ParaCards)
      ═══════════════════════════════════════════ */}
      <section style={{ background: "#f6f9fc", padding: "clamp(2.5rem, 5vw, 4rem) 0" }}>
        <Container size="xl">
          <div ref={introView.ref} className={`animate-on-scroll ${introView.isInView ? "is-visible" : ""}`}>
            <div
              className="geo-intro-grid responsive-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1.15fr 1fr",
                gap: "clamp(2rem, 4vw, 3rem)",
              }}
            >
              {/* Slider LEFT — sticky CSS */}
              <div style={{ position: "sticky", top: "100px", alignSelf: "start" }}>
                <GeoSlider
                  images={(() => {
                    const imgs: string[] = [];
                    linkedChateaux.forEach((c) => {
                      c.images.hero.forEach((img) => {
                        if (!imgs.includes(img)) imgs.push(img);
                      });
                    });
                    return imgs.length > 0 ? imgs : [data.heroImage];
                  })()}
                  nom={data.introTitre}
                />
              </div>

              {/* Cards RIGHT */}
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px", background: `${theme.colors.primary.bronze}10`, borderRadius: theme.effects.borderRadius.full, border: `1px solid ${theme.colors.primary.bronze}30`, marginBottom: "1rem" }}>
                  <Sparkles className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                  <span style={{ fontSize: "0.75rem", fontWeight: 600, color: theme.colors.primary.bronze, textTransform: "uppercase", letterSpacing: "0.05em" }}>Notre sélection</span>
                </div>
                <Text variant="h2" style={{ marginBottom: "1.5rem", textAlign: "left" }}>
                  {data.introTitre}
                </Text>
                {data.introduction.split(". ").reduce<string[][]>((acc, sentence, i) => {
                  const groupIndex = Math.floor(i / 2);
                  if (!acc[groupIndex]) acc[groupIndex] = [];
                  acc[groupIndex].push(sentence);
                  return acc;
                }, []).map((group, i) => (
                  <ParaCard
                    key={i}
                    text={group.join(". ") + (!group[group.length - 1].endsWith(".") ? "." : "")}
                    sectionBg="gray"
                  />
                ))}
                <div style={{ marginTop: "1.5rem" }}>
                  <NextLink href="/devis#formulaire" style={{ textDecoration: "none" }}>
                    <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                      Découvrir les domaines
                    </Button>
                  </NextLink>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

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
          CHÂTEAUX DE LA ZONE — Style éditorial (identique homepage)
      ═══════════════════════════════════════════ */}
      <section
        id="chateaux-zone"
        style={{
          background: "#f6f9fc",
          paddingTop: "15px",
          paddingBottom: "clamp(2rem, 5vw, 3.75rem)",
        }}
      >
        <Container size="xl">
          <div ref={chateauxView.ref} className={`animate-on-scroll ${chateauxView.isInView ? "is-visible" : ""}`}>
            {/* Section Header */}
            <div className="section-header" style={{ marginBottom: theme.spacing["4xl"] }}>
              <Text variant="h2" align="center" style={{ marginBottom: theme.spacing.md }}>
                {linkedChateaux.length > 1 ? "Les châteaux dans cette région" : "Le château dans cette région"}
              </Text>
              <Text variant="bodyLarge" color="muted" align="center" style={{ maxWidth: "940px", margin: "0 auto" }}>
                {linkedChateaux.length > 1
                  ? `Découvrez ${linkedChateaux.length} domaines d'exception sélectionnés pour vos séminaires d'entreprise. Chaque lieu allie le prestige de l'histoire au confort moderne pour un cadre de travail hors du commun.`
                  : "Découvrez ce domaine d'exception sélectionné pour vos séminaires d'entreprise. Un lieu qui allie le prestige de l'histoire au confort moderne pour un cadre de travail hors du commun."
                }
              </Text>
            </div>

            {/* Cards Horizontales Alternées - Style éditorial */}
            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              {linkedChateaux.map((chateau) => (
                <NextLink
                  key={chateau.id}
                  href={`/chateaux/${chateau.slug}`}
                  className="chateau-editorial-card"
                  style={{
                    display: "flex",
                    background: "#fff",
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                    border: "1px solid #f0f0f0",
                    textDecoration: "none",
                    color: "inherit",
                    transition: "box-shadow 0.3s ease, transform 0.3s ease",
                  }}
                >
                  {/* Image */}
                  <div className="chateau-editorial-image" style={{ overflow: "hidden" }}>
                    <img
                      src={chateau.images.card}
                      alt={`${chateau.nom} - Séminaire entreprise ${chateau.region}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.5s ease",
                      }}
                    />
                  </div>

                  {/* Contenu */}
                  <div className="chateau-editorial-content" style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}>
                    <span style={{
                      display: "inline-block",
                      width: "fit-content",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: theme.typography.fontSize.xs,
                      fontWeight: 600,
                      letterSpacing: "0.5px",
                      textTransform: "uppercase" as const,
                      background: "rgba(184,134,11,0.1)",
                      color: theme.colors.primary.bronze,
                    }}>
                      {chateau.region}
                    </span>

                    <h3 style={{
                      fontFamily: theme.typography.fonts.heading,
                      fontSize: "clamp(20px, 2vw, 26px)",
                      fontStyle: "italic",
                      color: theme.colors.neutral.gray900,
                      margin: "12px 0 8px",
                      lineHeight: 1.3,
                    }}>
                      {chateau.nom}
                    </h3>

                    <p style={{
                      color: theme.colors.neutral.gray600,
                      fontSize: theme.typography.fontSize.sm,
                      lineHeight: 1.7,
                      marginBottom: "16px",
                    }}>
                      {chateau.description}
                    </p>

                    {/* Atouts */}
                    <div style={{
                      display: "flex",
                      flexWrap: "nowrap" as const,
                      gap: "6px",
                      marginBottom: "20px",
                      overflow: "hidden",
                    }}>
                      {chateau.atouts.map((atout) => (
                        <span key={atout} style={{
                          padding: "3px 8px",
                          background: "#f8fafc",
                          border: `1px solid ${theme.colors.neutral.gray200}`,
                          borderRadius: "6px",
                          fontSize: "11px",
                          color: theme.colors.neutral.gray700,
                          whiteSpace: "nowrap" as const,
                          flexShrink: 0,
                        }}>
                          {atout}
                        </span>
                      ))}
                    </div>

                    {/* Footer: capacité + chambres + CTA */}
                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      paddingTop: "16px",
                      borderTop: `1px solid ${theme.colors.neutral.gray200}`,
                    }}>
                      <div style={{
                        display: "flex",
                        gap: theme.spacing.lg,
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.neutral.gray600,
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: theme.spacing.xs }}>
                          <Users className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                          <span>{chateau.capacite.min}-{chateau.capacite.max} pers</span>
                        </div>
                        {chateau.roomsTotal && (
                          <div style={{ display: "flex", alignItems: "center", gap: theme.spacing.xs }}>
                            <Building2 className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                            <span>{chateau.roomsTotal} chambres</span>
                          </div>
                        )}
                        {chateau.meetingRooms && (
                          <div style={{ display: "flex", alignItems: "center", gap: theme.spacing.xs }}>
                            <DoorOpen className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                            <span>{chateau.meetingRooms} salles</span>
                          </div>
                        )}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "12px" }}>
                        <a
                          href="#devis-express"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            document.getElementById("devis-express")?.scrollIntoView({ behavior: "smooth" });
                          }}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                            padding: "6px 14px",
                            background: theme.colors.primary.bronze,
                            color: "#fff",
                            borderRadius: "20px",
                            fontWeight: 600,
                            fontSize: theme.typography.fontSize.xs,
                            textDecoration: "none",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <Send className="w-3 h-3" /> Devis Express
                        </a>
                        <span style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          color: theme.colors.primary.bronze,
                          fontWeight: 600,
                          fontSize: theme.typography.fontSize.sm,
                        }}>
                          Découvrir <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </NextLink>
              ))}
            </div>
          </div>
        </Container>
      </section>

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
              className="infos-grid responsive-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: theme.spacing.md,
              }}
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

          <div className="geo-faq-grid responsive-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: theme.spacing["3xl"], alignItems: "start" }}>
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
                src="/images/equipe-select-chateaux-organisateur-seminaire-entreprise-chateau.webp"
                alt="Équipe Select Châteaux — organisateurs de séminaires et événements d'entreprise en château"
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
                  L&apos;équipe Select Châteaux
                </p>
                <p style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: theme.typography.fontSize.sm,
                  marginTop: theme.spacing.xs,
                }}>
                  Vos organisateurs dédiés pour un séminaire d&apos;entreprise clé en main en château d&apos;exception
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
              <a
                href="#devis-express"
                style={{ textDecoration: "none" }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("devis-express")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
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
              </a>
              <NextLink href="/chateaux">
                <Button
                  variant="outline"
                  size="lg"
                  style={{
                    borderColor: theme.colors.neutral.white,
                    color: theme.colors.neutral.white,
                  }}
                >
                  Voir tous les châteaux
                </Button>
              </NextLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Lightbox carrousel avec flèches — identique pages château */}
      {lightboxIndex !== null && (
        <div
          className="animate-fade-only"
          onClick={closeLightbox}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") prevImage();
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "Escape") closeLightbox();
          }}
          tabIndex={0}
          ref={(el) => el?.focus()}
          style={{ position: "fixed", inset: 0, background: "rgba(0, 0, 0, 0.95)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", outline: "none" }}
        >
          {/* Bouton fermer */}
          <button
            onClick={closeLightbox}
            style={{ position: "absolute", top: "1.5rem", right: "1.5rem", width: "48px", height: "48px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.1)", border: "2px solid rgba(255, 255, 255, 0.2)", color: "white", fontSize: "24px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(10px)", zIndex: 10000 }}
            aria-label="Fermer"
          >
            ✕
          </button>

          {/* Compteur */}
          <div style={{ position: "absolute", top: "1.5rem", left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.8)", fontSize: "0.9375rem", fontWeight: 600, zIndex: 10000 }}>
            {lightboxIndex + 1} / {allGeoImages.length}
          </div>

          {/* Flèche gauche */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            style={{ position: "absolute", left: "clamp(0.5rem, 2vw, 1.5rem)", top: "50%", transform: "translateY(-50%)", width: "52px", height: "52px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.15)", border: "2px solid rgba(255, 255, 255, 0.3)", color: "white", fontSize: "1.5rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(10px)", zIndex: 10000, transition: "all 0.2s ease" }}
            aria-label="Image précédente"
          >
            ‹
          </button>

          {/* Flèche droite */}
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            style={{ position: "absolute", right: "clamp(0.5rem, 2vw, 1.5rem)", top: "50%", transform: "translateY(-50%)", width: "52px", height: "52px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.15)", border: "2px solid rgba(255, 255, 255, 0.3)", color: "white", fontSize: "1.5rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(10px)", zIndex: 10000, transition: "all 0.2s ease" }}
            aria-label="Image suivante"
          >
            ›
          </button>

          {/* Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ position: "relative", width: "100%", height: "100%", maxWidth: "1400px", maxHeight: "85vh", cursor: "default" }}
          >
            <Image src={allGeoImages[lightboxIndex].src} alt={allGeoImages[lightboxIndex].alt} fill sizes="100vw" className="object-contain" quality={85} priority />
          </div>
        </div>
      )}
    </>
  );
}
