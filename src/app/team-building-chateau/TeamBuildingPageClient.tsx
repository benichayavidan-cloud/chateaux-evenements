/**
 * TEAM BUILDING PAGE CLIENT - Composant interactif
 * Design identique aux pages château individuelles
 */

'use client';

import Image from "next/image";
import Link from "next/link";
import { Users, Check, Sparkles, Target, Zap, Trophy, Mountain, Puzzle, ChefHat, Compass, Drama, Brain, Plus, Minus, HelpCircle, MapPin, Phone, FileText, Clock, Lock, Package } from "lucide-react";
import { Section, Container } from '@/components/layout-v2';
import { Text, Button } from '@/components/ui-v2';
import { theme } from '@/design-system/tokens';
import { useState, useEffect, useRef } from "react";
import { trackPhoneClick } from "@/components/Analytics";
import DevisFormMini from "@/components/DevisFormMini";
import ActivityCatalogue from "@/components/ActivityCatalogue";
import { useInView } from "@/hooks/useInView";

interface TeamBuildingPageClientProps {
  faq: Array<{ question: string; answer: string }>;
}

// ─── Images ────────────────────────────────────────────────────────
const heroImages = [
  "/images/team-building-chateau-seminaire-cohesion-equipe-hero.webp",
  "/images/activites-team-building-chateau-groupe.webp",
  "/images/olympiades-entreprise-team-building-sport-chateau.webp",
  "/images/escape-game-chateau-team-building-enigmes.webp",
  "/images/atelier-cuisine-chef-gastronomie-team-building.webp",
];

const overviewImages = [
  "/images/team-building-hero.webp",
  "/images/team-building-exterieur-chateau-parc.webp",
  "/images/cohesion-equipe-team-building-chateau-activites.webp",
  "/images/team-building-chateau-activites-entreprise.webp",
  "/images/activites-team-building-chateau-groupe.webp",
];

const outdoorImages = [
  "/images/olympiades-entreprise-team-building-sport-chateau.webp",
  "/images/rallye-challenge-team-building-chateau-enigmes.webp",
  "/images/rallye-decouverte-chateau-team.webp",
  "/images/team-building-exterieur-chateau-parc.webp",
  "/images/services/team-building-activite-babyfoot-humain-exterieur-parc.webp",
];

const outdoorAlts = [
  "Olympiades sportives en plein air — team building outdoor en château",
  "Rallye challenge et énigmes en équipe dans le parc du château",
  "Rallye découverte du domaine — activité team building outdoor",
  "Activités de team building en extérieur dans les jardins du château",
  "Baby-foot humain — challenge sportif team building en château",
];

const indoorImages = [
  "/images/escape-game-chateau-team-building-enigmes.webp",
  "/images/jeu-enigmes-team-building-chateau.webp",
  "/images/murder-party-chateau-activite-immersive-team-building.webp",
  "/images/challenges-creatifs-team-building-chateau-activites.webp",
  "/images/gestion-crise-team-building-formation-entreprise.webp",
];

const gastronomieImages = [
  "/images/atelier-cuisine-chef-gastronomie-team-building.webp",
  "/images/team-building-chateau-seminaire-cohesion-equipe-hero.webp",
  "/images/cohesion-equipe-team-building-chateau-activites.webp",
];

const allGalleryImages = [...heroImages, ...overviewImages, ...outdoorImages, ...indoorImages, ...gastronomieImages]
  .filter((img, i, arr) => arr.indexOf(img) === i);

// ─── Données activités ─────────────────────────────────────────────
const activitesOutdoor = [
  {
    title: "Olympiades sportives",
    text: "Olympiades sportives : Des épreuves variées (relais, tir à l'arc, course d'orientation) dans les parcs et jardins du château. Les équipes s'affrontent dans une ambiance conviviale pour remporter le trophée.",
  },
  {
    title: "Rallye découverte",
    text: "Rallye découverte du domaine : Une chasse au trésor grandeur nature à travers le parc du château. Énigmes historiques, défis photo et épreuves d'adresse ponctuent ce parcours qui révèle les secrets du domaine.",
  },
  {
    title: "Challenges sportifs",
    text: "Challenges sportifs : Baby-foot humain, course de relais créatifs, parcours d'obstacles... Des activités qui mêlent sport et rire pour souder les équipes en plein air dans un cadre exceptionnel.",
  },
];

const activitesIndoor = [
  {
    title: "Escape Game château",
    text: "Escape Game grandeur nature : Transformez les salons du château en salles d'énigmes immersives. Vos équipes ont 60 minutes pour résoudre les mystères et s'échapper. Un format qui développe communication et résolution de problèmes.",
  },
  {
    title: "Murder Party",
    text: "Murder Party immersive : Un scénario sur-mesure transforme le château en scène de crime. Costumes d'époque, indices cachés dans les salons historiques, témoins suspects... Une expérience théâtrale qui développe l'esprit d'analyse et la collaboration.",
  },
  {
    title: "Challenges créatifs",
    text: "Challenges créatifs : Ateliers artistiques (fresque collective, construction LEGO, création vidéo), quiz culture générale, blind test musical... Des activités qui stimulent la créativité et révèlent les talents cachés de vos collaborateurs.",
  },
  {
    title: "Gestion de crise",
    text: "Simulation gestion de crise : Un exercice immersif où vos équipes doivent gérer une situation d'urgence fictive. Prise de décision rapide, communication sous pression, leadership... Un team building à forte valeur ajoutée managériale.",
  },
];

// ─── Sous-composants (identiques château page) ──────────────────────

function StickySlider({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: 'sticky', top: '100px', alignSelf: 'flex-start' }}>
      {children}
    </div>
  );
}

function ParaCard({ text, sectionBg = 'gray' }: { text: string; sectionBg?: 'gray' | 'white' }) {
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
        <div style={{
          fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase' as const,
          letterSpacing: '0.08em', color: theme.colors.primary.bronze,
          marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px',
        }}>
          <div style={{
            width: '18px', height: '18px', borderRadius: '50%',
            background: `${theme.colors.primary.bronze}10`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '9px', color: theme.colors.primary.bronze,
          }}>&#10022;</div>
          {label}
        </div>
      )}
      <p style={{
        fontSize: 'clamp(0.8125rem, 1.5vw, 0.9375rem)', lineHeight: 1.8,
        color: theme.colors.neutral.gray600, margin: 0,
      }}>
        {body}
      </p>
    </div>
  );
}

function ImageSlider({ images, alt }: { images: string[]; alt: string }) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(false);

  const startAutoplay = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isVisibleRef.current) return;
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 3000);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          startAutoplay();
        } else if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => { observer.disconnect(); if (timerRef.current) clearInterval(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  const goTo = (index: number) => {
    setCurrent(index);
    if (timerRef.current) clearInterval(timerRef.current);
    startAutoplay();
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', height: '420px', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
      {images.map((img, i) => (
        <div
          key={i}
          style={{
            position: 'absolute', inset: 0,
            opacity: current === i ? 1 : 0,
            transition: 'opacity 0.6s ease-in-out',
          }}
        >
          <Image src={img} alt={`${alt} - ${i + 1}`} fill className="object-cover" loading="lazy" quality={80} sizes="50vw" />
        </div>
      ))}
      {images.length > 1 && (
        <>
          <button
            onClick={() => goTo((current - 1 + images.length) % images.length)}
            style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.85)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', color: '#333', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', zIndex: 2 }}
            aria-label="Précédent"
          >&#8249;</button>
          <button
            onClick={() => goTo((current + 1) % images.length)}
            style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.85)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', color: '#333', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', zIndex: 2 }}
            aria-label="Suivant"
          >&#8250;</button>
          <div style={{ position: 'absolute', bottom: '0.75rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px', zIndex: 2 }}>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: current === i ? '20px' : '8px', height: '8px',
                  borderRadius: '4px', border: 'none', cursor: 'pointer',
                  background: current === i ? 'white' : 'rgba(255,255,255,0.5)',
                  transition: 'all 0.3s ease',
                }}
                aria-label={`Photo ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Section Overlay pleine largeur (identique HebergementOverlay / EspacesReunionOverlay) ───
function OutdoorOverlay() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isVisibleRef = useRef(false);

  const startAutoplay = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isVisibleRef.current) return;
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % outdoorImages.length);
    }, 3000);
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          startAutoplay();
        } else if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => { observer.disconnect(); if (timerRef.current) clearInterval(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goTo = (index: number) => {
    setCurrent(index);
    if (timerRef.current) clearInterval(timerRef.current);
    startAutoplay();
  };

  return (
    <section ref={sectionRef} style={{ padding: 0 }}>
      <div style={{ position: 'relative', height: 'clamp(28rem, 60vw, 38rem)', overflow: 'hidden' }}>
        {outdoorImages.map((img, i) => (
          <div
            key={i}
            style={{
              position: 'absolute', inset: 0,
              opacity: current === i ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
            }}
          >
            <Image src={img} alt={outdoorAlts[i] || `Activité outdoor team building en château - ${i + 1}`} fill sizes="100vw" className="object-cover" loading="lazy" quality={80} />
          </div>
        ))}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)', zIndex: 1 }} />
        {outdoorImages.length > 1 && (
          <>
            <button
              onClick={() => goTo((current - 1 + outdoorImages.length) % outdoorImages.length)}
              style={{ position: 'absolute', right: '4.5rem', bottom: '1.5rem', width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', color: 'white', zIndex: 3 }}
              aria-label="Précédent"
            >&#8249;</button>
            <button
              onClick={() => goTo((current + 1) % outdoorImages.length)}
              style={{ position: 'absolute', right: '1.5rem', bottom: '1.5rem', width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', color: 'white', zIndex: 3 }}
              aria-label="Suivant"
            >&#8250;</button>
          </>
        )}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1.5rem, 5vw, 4rem)', zIndex: 2 }}>
          <Container size="xl">
            <div style={{ maxWidth: '800px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <Mountain className="w-6 h-6" style={{ color: theme.colors.primary.gold }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: theme.colors.primary.gold, textTransform: 'uppercase', letterSpacing: '0.1em' }}>En plein air</span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontWeight: 600, fontFamily: theme.typography.fonts.heading, color: 'white', marginBottom: '1rem', lineHeight: 1.2 }}>
                Activités Outdoor — Cohésion d&apos;Équipe en Plein Air
              </h2>
              <div style={{ fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '650px' }}>
                <p style={{ marginBottom: '1rem' }}>
                  Profitez des parcs et jardins exceptionnels de nos <Link href="/chateaux" style={{ color: theme.colors.primary.gold, textDecoration: 'underline', textUnderlineOffset: '3px' }}>châteaux en Île-de-France</Link> pour des activités en plein air mémorables. Olympiades, rallyes, challenges sportifs... le cadre historique sublime chaque moment.
                </p>
                <p>
                  Nos activateurs professionnels encadrent chaque épreuve pour garantir une expérience sécurisée, inclusive et inoubliable. Combinez vos activités outdoor avec nos <Link href="/seminaires-soirees-entreprise" style={{ color: theme.colors.primary.gold, textDecoration: 'underline', textUnderlineOffset: '3px' }}>soirées d&apos;entreprise en château</Link> pour une journée complète.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {["Parcs & jardins privés", "Encadrement pro", "Tous niveaux"].map((tag, i) => (
                  <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: theme.effects.borderRadius.full }}>
                    <Check className="w-4 h-4" style={{ color: theme.colors.primary.gold }} />
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'white' }}>{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}

// ─── Composant principal ────────────────────────────────────────────

export default function TeamBuildingPageClient({ faq }: TeamBuildingPageClientProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const openLightbox = (clickedImage: string) => {
    const idx = allGalleryImages.indexOf(clickedImage);
    setLightboxIndex(idx >= 0 ? idx : 0);
  };
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex(i => i !== null ? (i - 1 + allGalleryImages.length) % allGalleryImages.length : null);
  const nextImage = () => setLightboxIndex(i => i !== null ? (i + 1) % allGalleryImages.length : null);

  const pointsFortsView = useInView();
  const faqCtaView = useInView();
  const ctaView = useInView();
  const ctaButtonsView = useInView();

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pointsForts = [
    "Cadre exceptionnel",
    "Activités sur mesure",
    "20 à 500 participants",
    "Encadrement professionnel",
    "Privatisation totale",
    "Hébergement sur place",
    "Restauration gastronomique",
    "Proche Paris",
  ];

  return (
    <>
      {/* ─── Breadcrumbs visuels SEO ─── */}
      <nav aria-label="Fil d'Ariane" style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(0.5rem, 1vw, 0.75rem) clamp(1rem, 4vw, 2rem) 0' }}>
        <ol style={{ display: 'flex', alignItems: 'center', gap: '6px', listStyle: 'none', margin: 0, padding: 0, fontSize: '0.8125rem' }}>
          <li>
            <Link href="/" style={{ color: theme.colors.neutral.gray500, textDecoration: 'none', transition: 'color 0.2s' }}>
              Accueil
            </Link>
          </li>
          <li style={{ color: theme.colors.neutral.gray400 }} aria-hidden="true">›</li>
          <li>
            <span style={{ color: theme.colors.primary.bronze, fontWeight: 600 }}>
              Team Building en Château
            </span>
          </li>
        </ol>
      </nav>

      {/* ─── Hero Section — Grille style Airbnb ─── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(0.5rem, 1vw, 0.75rem) clamp(1rem, 4vw, 2rem) 0' }}>
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
              <Target className="w-3.5 h-3.5" style={{ color: theme.colors.primary.bronze }} />
              <span style={{ fontSize: '0.8125rem', fontWeight: theme.typography.fontWeight.semibold, color: theme.colors.primary.bronze }}>
                Cohésion d&apos;équipe
              </span>
            </div>
            <div
              className="inline-flex items-center gap-1.5"
              style={{
                padding: '0.375rem 0.75rem',
                background: `${theme.colors.primary.bronze}08`,
                border: `1px solid ${theme.colors.primary.bronze}25`,
                borderRadius: theme.effects.borderRadius.full,
              }}
            >
              <span style={{ fontSize: '0.6875rem', fontWeight: theme.typography.fontWeight.bold, color: theme.colors.primary.bronze, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Île-de-France
              </span>
            </div>
          </div>

          <h1
            style={{
              fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
              fontWeight: theme.typography.fontWeight.semibold,
              fontFamily: theme.typography.fonts.heading,
              lineHeight: 1.2,
              color: theme.colors.neutral.gray900,
              marginBottom: '0.5rem',
            }}
          >
            Team Building en Château en Île-de-France — Cohésion d&apos;Équipe
          </h1>

          <div className="flex flex-wrap items-center gap-3" style={{ color: theme.colors.neutral.gray600, fontSize: '0.9375rem' }}>
            <span className="inline-flex items-center gap-1.5">
              <Users className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
              20–500 participants
            </span>
            <span style={{ color: theme.colors.neutral.gray300 }}>·</span>
            <span className="inline-flex items-center gap-1.5">
              <Trophy className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
              +40 activités cohésion
            </span>
            <span style={{ color: theme.colors.neutral.gray300 }}>·</span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
              Châteaux proche Paris
            </span>
          </div>
        </div>

        {/* Grille photos style Airbnb */}
        <div
          className="hero-grid-listing rounded-2xl overflow-hidden"
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gap: '4px',
            height: 'clamp(300px, 55vh, 500px)',
          }}
        >
          <div
            className="relative cursor-pointer group overflow-hidden"
            style={{ gridRow: '1 / 3', gridColumn: '1 / 2' }}
            onClick={() => openLightbox(heroImages[0])}
          >
            <Image
              src={heroImages[0]}
              alt="Team building en château — cohésion d'équipe en plein air"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
              quality={85}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="relative cursor-pointer group overflow-hidden" onClick={() => openLightbox(heroImages[1])}>
            <Image src={heroImages[1]} alt="Activités de groupe team building château" fill className="object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" quality={80} sizes="25vw" />
          </div>
          <div className="relative cursor-pointer group overflow-hidden" onClick={() => openLightbox(heroImages[2])}>
            <Image src={heroImages[2]} alt="Olympiades sportives team building" fill className="object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" quality={80} sizes="25vw" />
          </div>
          <div className="relative cursor-pointer group overflow-hidden" onClick={() => openLightbox(heroImages[3])}>
            <Image src={heroImages[3]} alt="Escape game château team building" fill className="object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" quality={80} sizes="25vw" />
          </div>
          <div className="relative cursor-pointer group overflow-hidden" onClick={() => openLightbox(heroImages[4])}>
            <Image src={heroImages[4]} alt="Atelier cuisine team building" fill className="object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" quality={80} sizes="25vw" />
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(0); }}
              style={{
                position: 'absolute', bottom: '0.75rem', right: '0.75rem',
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '8px 16px', background: 'rgba(255, 255, 255, 0.95)',
                border: `1px solid ${theme.colors.neutral.gray300}`,
                borderRadius: theme.effects.borderRadius.lg,
                fontSize: '0.8125rem', fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.neutral.gray900, cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 10,
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
            display: 'flex', flexDirection: 'row', alignItems: 'center',
            justifyContent: 'space-between', gap: '1rem',
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
              fontSize: 'clamp(0.875rem, 2vw, 1rem)', color: theme.colors.neutral.gray600,
              fontStyle: 'italic', margin: 0, flex: '1 1 auto', minWidth: 0,
            }}
          >
            Séminaire team building et cohésion d&apos;équipe en château d&apos;exception proche Paris
          </p>
          <div className="flex gap-2.5 items-center flex-wrap w-full sm:w-auto">
            <a
              href="#devis-express"
              className="flex-1 sm:flex-initial"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                padding: '12px 24px', borderRadius: theme.effects.borderRadius.full,
                background: `linear-gradient(135deg, ${theme.colors.primary.gold} 0%, ${theme.colors.primary.bronze} 100%)`,
                color: '#FFFFFF', fontWeight: theme.typography.fontWeight.bold,
                fontSize: '0.875rem', textDecoration: 'none',
                boxShadow: `0 4px 16px ${theme.colors.primary.bronze}40`,
                transition: 'all 0.3s ease', whiteSpace: 'nowrap',
              }}
            >
              <FileText className="w-4 h-4" />
              Devis Gratuit en 24h
            </a>
            <a
              href="tel:+33757991146"
              onClick={() => trackPhoneClick()}
              className="badge-lg border-2 border-white/40 bg-black/40 backdrop-blur-md text-white font-semibold text-sm hover:bg-black/50 transition-all"
              style={{ textDecoration: 'none', whiteSpace: 'nowrap', color: 'white' }}
            >
              <Phone className="w-4 h-4" style={{ color: 'white' }} />
              07 57 99 11 46
            </a>
          </div>
        </div>
      </div>

      {/* ─── Bandeau chiffres clés ─── */}
      <div
        style={{
          background: `${theme.colors.primary.bronze}05`,
          borderBottom: `1px solid ${theme.colors.primary.bronze}15`,
          padding: 'clamp(12px, 2vw, 16px) 0',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(8px, 2vw, 16px)' }}>
            {[
              { icon: <Check className="w-3.5 h-3.5" />, label: '500+ Événements' },
              { icon: <Clock className="w-3.5 h-3.5" />, label: 'Devis sous 24h' },
              { icon: <Lock className="w-3.5 h-3.5" />, label: 'Privatisation Totale' },
              { icon: <Package className="w-3.5 h-3.5" />, label: 'Tout Inclus' },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '8px 14px',
                  background: `${theme.colors.primary.bronze}08`,
                  border: `1px solid ${theme.colors.primary.bronze}20`,
                  borderRadius: theme.effects.borderRadius.full,
                }}
              >
                <span style={{ color: theme.colors.primary.bronze, display: 'flex' }}>{item.icon}</span>
                <span style={{
                  fontSize: 'clamp(10px, 1.5vw, 12px)',
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.primary.bronze,
                  textTransform: 'uppercase',
                  letterSpacing: theme.typography.letterSpacing.wide,
                  whiteSpace: 'nowrap',
                }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Section Vue d'ensemble — Slider gauche (sticky) + Cards droite ─── */}
      <Section spacing="lg" background="gray" style={{ padding: 'clamp(2.5rem, 5vw, 4rem) 0' }}>
        <Container size="xl">
          <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 'clamp(2rem, 4vw, 3rem)' }}>
            <StickySlider>
              <ImageSlider images={overviewImages} alt="Activités de team building et cohésion d'équipe en château d'exception" />
            </StickySlider>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: `${theme.colors.primary.bronze}10`, borderRadius: theme.effects.borderRadius.full, border: `1px solid ${theme.colors.primary.bronze}30`, marginBottom: '1rem' }}>
                <Sparkles className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: theme.colors.primary.bronze, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nos activités</span>
              </div>
              <Text variant="h2" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                Séminaire Team Building en Château proche Paris
              </Text>
              <ParaCard text="Un cadre exceptionnel : Imaginez vos équipes se retrouvant dans un château historique, entourées de parcs centenaires. Le dépaysement total crée une parenthèse unique, loin du quotidien professionnel, propice à tisser des liens authentiques." sectionBg="gray" />
              <ParaCard text="Des activités sur mesure : Chaque team building est conçu en fonction de vos objectifs — cohésion, communication, leadership, créativité. Nos chefs de projet vous accompagnent pour créer le programme parfait, de la demi-journée au séjour complet." sectionBg="gray" />
              <ParaCard text="Un accompagnement de A à Z : De la recherche du lieu idéal à la coordination le jour J, notre équipe gère tous les détails. Animateurs professionnels, matériel, logistique, restauration... Vous n'avez qu'à profiter du moment." sectionBg="gray" />
              <div className="flex flex-wrap" style={{ gap: '0.5rem', marginTop: '1rem' }}>
                {["Outdoor & Indoor", "20 à 500 pers.", "Sur mesure", "Clé en main"].map((atout, i) => (
                  <Link key={i} href="/devis#formulaire" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 10px', background: `${theme.colors.primary.bronze}08`, border: `1px solid ${theme.colors.primary.bronze}20`, borderRadius: theme.effects.borderRadius.full, whiteSpace: 'nowrap', textDecoration: 'none', transition: 'all 0.2s ease' }}>
                    <Check className="w-3 h-3 flex-shrink-0" style={{ color: theme.colors.primary.bronze }} />
                    <span style={{ fontSize: '0.75rem', fontWeight: 500, color: theme.colors.neutral.gray700 }}>{atout}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── Section Activités Outdoor — Overlay pleine largeur ─── */}
      <OutdoorOverlay />

      {/* ─── Section Activités Indoor — Slider gauche (sticky) + Cards droite ─── */}
      <Section spacing="lg" background="gray" style={{ padding: 'clamp(2.5rem, 5vw, 4rem) 0' }}>
        <Container size="xl">
          <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 'clamp(2rem, 4vw, 3rem)' }}>
            <StickySlider>
              <ImageSlider images={indoorImages} alt="Team building indoor en château — escape game, murder party, challenges créatifs" />
            </StickySlider>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: `${theme.colors.primary.bronze}10`, borderRadius: theme.effects.borderRadius.full, border: `1px solid ${theme.colors.primary.bronze}30`, marginBottom: '1rem' }}>
                <Puzzle className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: theme.colors.primary.bronze, textTransform: 'uppercase', letterSpacing: '0.05em' }}>En intérieur</span>
              </div>
              <Text variant="h2" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                Activités Indoor — Escape Game & Murder Party en Château
              </Text>
              {activitesIndoor.map((activite, i) => (
                <ParaCard key={i} text={activite.text} sectionBg="gray" />
              ))}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                {["Salons historiques", "Scénarios immersifs", "Animateurs pros"].map((tag, i) => (
                  <Link key={i} href="/devis#formulaire" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 10px', background: `${theme.colors.primary.bronze}08`, border: `1px solid ${theme.colors.primary.bronze}20`, borderRadius: theme.effects.borderRadius.full, whiteSpace: 'nowrap', textDecoration: 'none', transition: 'all 0.2s ease' }}>
                    <Check className="w-3 h-3 flex-shrink-0" style={{ color: theme.colors.primary.bronze }} />
                    <span style={{ fontSize: '0.75rem', fontWeight: 500, color: theme.colors.neutral.gray700 }}>{tag}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── Section Gastronomie — Cards GAUCHE, Slider DROITE (zigzag inversé) ─── */}
      <Section spacing="lg" background="white" style={{ padding: 'clamp(2.5rem, 5vw, 4rem) 0' }}>
        <Container size="xl">
          <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 'clamp(2rem, 4vw, 3rem)' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: `${theme.colors.primary.bronze}10`, borderRadius: theme.effects.borderRadius.full, border: `1px solid ${theme.colors.primary.bronze}30`, marginBottom: '1rem' }}>
                <ChefHat className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: theme.colors.primary.bronze, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Gastronomie</span>
              </div>
              <Text variant="h2" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                Ateliers Cuisine & Gastronomie pour Séminaire d&apos;Entreprise
              </Text>
              <ParaCard text="Atelier cuisine avec chef : Enfilez vos tabliers et relevez des défis culinaires en équipe sous la direction d'un chef professionnel. Cuisine française, pâtisserie, œnologie... une activité qui rassemble et régale." sectionBg="white" />
              <ParaCard text="Restauration gastronomique : Profitez d'une cuisine raffinée adaptée à votre événement. Cocktail dînatoire, dîner assis, brunch du lendemain... nos chefs élaborent des menus sur mesure avec des produits locaux et de saison." sectionBg="white" />
              <ParaCard text="Expériences œnologiques : Dégustations de vins commentées, accords mets-vins, ateliers cocktails... des moments de convivialité qui ponctuent votre team building d'une touche d'élégance." sectionBg="white" />
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                {["Chefs professionnels", "Menus sur mesure", "Produits locaux"].map((tag, i) => (
                  <Link key={i} href="/devis#formulaire" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 10px', background: `${theme.colors.primary.bronze}08`, border: `1px solid ${theme.colors.primary.bronze}20`, borderRadius: theme.effects.borderRadius.full, whiteSpace: 'nowrap', textDecoration: 'none', transition: 'all 0.2s ease' }}>
                    <Check className="w-3 h-3 flex-shrink-0" style={{ color: theme.colors.primary.bronze }} />
                    <span style={{ fontSize: '0.75rem', fontWeight: 500, color: theme.colors.neutral.gray700 }}>{tag}</span>
                  </Link>
                ))}
              </div>
            </div>
            <StickySlider>
              <ImageSlider images={gastronomieImages} alt="Atelier cuisine gastronomique et team building culinaire en château" />
            </StickySlider>
          </div>
        </Container>
      </Section>

      {/* ─── Catalogue complet des activités — Flip Cards ─── */}
      <ActivityCatalogue />

      {/* ─── Points forts — Grid avec image de fond ─── */}
      <section className="points-forts-section" style={{ position: 'relative', padding: 'clamp(5rem, 10vw, 8rem) 0', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image
            src="/images/evenement-entreprise-tiara-mont-royal-chantilly-activites-team-building.webp"
            alt="Activités team building en château — vue du domaine"
            fill sizes="100vw" className="object-cover" loading="lazy" quality={80}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }} />
        </div>
        <Container size="xl" style={{ position: 'relative', zIndex: 2 }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: theme.spacing.xl }}>
            <div
              ref={pointsFortsView.ref}
              className={`animate-on-scroll ${pointsFortsView.isInView ? 'is-visible' : ''}`}
            >
              <Text variant="h2" style={{ marginBottom: theme.spacing.md, textAlign: 'center', color: 'white', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
                Pourquoi choisir nos Team Building en Île-de-France ?
              </Text>
              <Text variant="bodyLarge" style={{ textAlign: 'center', color: 'rgba(255,255,255,0.8)' }}>
                Cohésion d&apos;équipe et séminaire d&apos;entreprise dans un cadre d&apos;exception
              </Text>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 'clamp(1rem, 2vw, 1.5rem)', maxWidth: '1200px', margin: '0 auto', justifyContent: 'center', flexWrap: 'wrap', padding: '1.5rem 0' }}>
            {pointsForts.map((atout, index) => (
              <div
                key={index}
                className={`animate-on-scroll ${pointsFortsView.isInView ? 'is-visible' : ''}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div style={{
                  padding: '1.25rem 2rem',
                  background: 'rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  borderRadius: '1rem',
                  border: '1px solid rgba(255,255,255,0.2)',
                  textAlign: 'center',
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                  minWidth: '200px',
                }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: `linear-gradient(135deg, ${theme.colors.primary.gold}, ${theme.colors.primary.bronze})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Check className="w-5 h-5" style={{ color: 'white' }} />
                  </div>
                  <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'white' }}>
                    {atout}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Section FAQ — 2 colonnes : FAQ + Image équipe ─── */}
      <Section background="gray" style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem) 0', background: '#f6f9fc' }}>
        <Container size="xl">
          <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem, 4vw, 3rem)', alignItems: 'start' }}>
            <div>
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: `${theme.colors.primary.bronze}10`, borderRadius: theme.effects.borderRadius.full, border: `1px solid ${theme.colors.primary.bronze}30`, marginBottom: '1rem' }}>
                  <HelpCircle className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: theme.colors.primary.bronze, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Questions fréquentes</span>
                </div>
                <Text variant="h2" style={{ marginBottom: theme.spacing.sm, textAlign: 'left' }}>
                  FAQ — Team Building & Séminaire en Château
                </Text>
                <Text variant="body" color="muted" style={{ textAlign: 'left' }}>
                  Tout savoir sur la cohésion d&apos;équipe en château en Île-de-France
                </Text>
              </div>

              <div>
                {faq.map((item, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div key={index} style={{ marginBottom: '0.75rem' }}>
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full text-left group"
                        style={{
                          display: 'flex', alignItems: 'center', gap: '1rem',
                          padding: '1rem 1.25rem',
                          background: isOpen ? 'white' : 'transparent',
                          borderRadius: '0.75rem',
                          border: `1px solid ${isOpen ? theme.colors.primary.bronze + '40' : 'transparent'}`,
                          boxShadow: isOpen ? '0 4px 16px rgba(0,0,0,0.06)' : 'none',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                        }}
                      >
                        <div style={{
                          width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                          background: isOpen ? theme.colors.primary.bronze : `${theme.colors.primary.bronze}10`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'all 0.3s ease',
                        }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: isOpen ? 'white' : theme.colors.primary.bronze }}>
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <span style={{ flex: 1, fontSize: '0.9375rem', fontWeight: 600, color: theme.colors.neutral.gray800, lineHeight: 1.4 }}>
                          {item.question}
                        </span>
                        <div style={{ flexShrink: 0, transition: 'transform 0.3s ease', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                          {isOpen ? (
                            <Minus className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                          ) : (
                            <Plus className="w-4 h-4" style={{ color: theme.colors.neutral.gray500 }} />
                          )}
                        </div>
                      </button>
                      <div style={{
                        overflow: 'hidden',
                        maxHeight: isOpen ? '300px' : '0px',
                        opacity: isOpen ? 1 : 0,
                        transition: 'max-height 0.4s ease, opacity 0.3s ease',
                      }}>
                        <div style={{ padding: '0.75rem 1.25rem 0.75rem 4.25rem' }}>
                          <Text variant="body" color="muted" style={{ lineHeight: 1.7, fontSize: '0.9rem' }}>
                            {item.answer}
                          </Text>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div ref={faqCtaView.ref} className={`animate-on-scroll ${faqCtaView.isInView ? 'is-visible' : ''}`} style={{ marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', background: `${theme.colors.primary.bronze}08`, border: `1px solid ${theme.colors.primary.bronze}20`, borderRadius: '0.75rem' }}>
                  <Text variant="body" color="muted" style={{ flex: 1, fontSize: '0.875rem' }}>
                    Une autre question ?
                  </Text>
                  <Link href="/devis#formulaire">
                    <Button variant="primary" size="sm">Nous contacter</Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Colonne droite — Image équipe */}
            <div style={{ position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ position: 'relative', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
                <div style={{ position: 'relative', aspectRatio: '2/3' }}>
                  <Image
                    src="/images/equipe-select-chateaux-organisateur-seminaire-entreprise-chateau.webp"
                    alt="Équipe Select Châteaux — organisateurs de team building en château d'exception"
                    fill className="object-cover" loading="lazy" quality={80} sizes="50vw"
                  />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)', padding: '2rem 1.5rem 1.5rem' }}>
                    <p style={{ color: 'white', fontSize: '1.125rem', fontWeight: 600, fontFamily: theme.typography.fonts.heading, marginBottom: '0.25rem' }}>
                      L&apos;équipe Select Châteaux
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.8125rem', lineHeight: 1.5 }}>
                      Vos organisateurs dédiés pour un team building clé en main en château d&apos;exception
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── Mini formulaire devis inline ─── */}
      <Section background="white" style={{ padding: '0' }}>
        <Container size="lg">
          <DevisFormMini sourceLabel="Team Building en Château" />
        </Container>
      </Section>

      {/* ─── CTA finale ─── */}
      <Section background="gradient" style={{ padding: '30px 0' }}>
        <Container size="lg">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <div ref={ctaView.ref} className={`animate-on-scroll ${ctaView.isInView ? 'is-visible' : ''}`}>
              <Text variant="h2" style={{ marginBottom: theme.spacing.md, textAlign: 'center' }}>
                Organisez votre Team Building en Château proche Paris
              </Text>
            </div>
            <div ref={ctaButtonsView.ref} className={`animate-on-scroll ${ctaButtonsView.isInView ? 'is-visible' : ''}`} style={{ display: 'flex', gap: theme.spacing.md, justifyContent: 'center', flexWrap: 'wrap', transitionDelay: '200ms' }}>
              <Link href="/devis#formulaire"><Button variant="primary" size="lg">Demander un Devis</Button></Link>
              <Link href="/chateaux"><Button variant="outline" size="lg">Voir les châteaux</Button></Link>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: theme.spacing.md, marginTop: theme.spacing.xl, flexWrap: "wrap" }}>
              <MapPin className="w-4 h-4" style={{ color: theme.colors.primary.bronze, opacity: 0.7 }} />
              <Link href="/seminaire-chateau-chantilly" style={{ color: theme.colors.neutral.gray600, fontSize: theme.typography.fontSize.sm, textDecoration: "underline", textUnderlineOffset: "3px" }}>
                Séminaire château Chantilly
              </Link>
              <Link href="/seminaire-chateau-ile-de-france" style={{ color: theme.colors.neutral.gray600, fontSize: theme.typography.fontSize.sm, textDecoration: "underline", textUnderlineOffset: "3px" }}>
                Séminaire château Île-de-France
              </Link>
              <Link href="/seminaire-chateau-proche-paris" style={{ color: theme.colors.neutral.gray600, fontSize: theme.typography.fontSize.sm, textDecoration: "underline", textUnderlineOffset: "3px" }}>
                Séminaire château proche Paris
              </Link>
              <Link href="/seminaires-soirees-entreprise" style={{ color: theme.colors.neutral.gray600, fontSize: theme.typography.fontSize.sm, textDecoration: "underline", textUnderlineOffset: "3px" }}>
                Soirées d&apos;entreprise en château
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── Sticky CTA Bar ─── */}
      <div
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9990,
          transform: showStickyBar ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          pointerEvents: showStickyBar ? 'auto' as const : 'none' as const,
        }}
      >
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.97)',
            backdropFilter: 'blur(16px)',
            borderTop: '1px solid rgba(163, 126, 44, 0.15)',
            boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.1)',
            padding: 'clamp(10px, 2vw, 14px) clamp(16px, 4vw, 32px)',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
              <a
                href="tel:+33757991146"
                onClick={() => trackPhoneClick()}
                className="badge-lg border-2 border-white/40 bg-black/40 backdrop-blur-md text-white font-semibold text-sm hover:bg-black/50 transition-all"
                style={{ textDecoration: 'none', whiteSpace: 'nowrap', padding: '10px 16px', fontSize: '13px', color: 'white' }}
              >
                <Phone className="w-4 h-4" style={{ color: 'white' }} />
                <span className="hidden sm:inline">07 57 99 11 46</span>
                <span className="sm:hidden">Appeler</span>
              </a>
              <a
                href="#devis-express"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '10px 20px', borderRadius: '9999px',
                  background: 'linear-gradient(135deg, #D4AF37 0%, #A37E2C 100%)',
                  color: '#FFFFFF', fontWeight: 700, fontSize: '13px',
                  textDecoration: 'none', boxShadow: '0 4px 12px rgba(163, 126, 44, 0.3)',
                  transition: 'all 0.2s', whiteSpace: 'nowrap',
                }}
              >
                <FileText style={{ width: '16px', height: '16px' }} />
                Devis Gratuit
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Lightbox carrousel ─── */}
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
          <button
            onClick={closeLightbox}
            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.1)', border: '2px solid rgba(255, 255, 255, 0.2)', color: 'white', fontSize: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)', zIndex: 10000 }}
            aria-label="Fermer"
          >
            &#10005;
          </button>
          <div style={{ position: 'absolute', top: '1.5rem', left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.8)', fontSize: '0.9375rem', fontWeight: 600, zIndex: 10000 }}>
            {lightboxIndex + 1} / {allGalleryImages.length}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            style={{ position: 'absolute', left: 'clamp(0.5rem, 2vw, 1.5rem)', top: '50%', transform: 'translateY(-50%)', width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.15)', border: '2px solid rgba(255, 255, 255, 0.3)', color: 'white', fontSize: '1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)', zIndex: 10000, transition: 'all 0.2s ease' }}
            aria-label="Image précédente"
          >
            &#8249;
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            style={{ position: 'absolute', right: 'clamp(0.5rem, 2vw, 1.5rem)', top: '50%', transform: 'translateY(-50%)', width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.15)', border: '2px solid rgba(255, 255, 255, 0.3)', color: 'white', fontSize: '1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)', zIndex: 10000, transition: 'all 0.2s ease' }}
            aria-label="Image suivante"
          >
            &#8250;
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ position: 'relative', width: '100%', height: '100%', maxWidth: '1400px', maxHeight: '85vh', cursor: 'default' }}
          >
            <Image src={allGalleryImages[lightboxIndex]} alt={`Team building château - Photo ${lightboxIndex + 1}`} fill sizes="100vw" className="object-contain" quality={85} priority />
          </div>
        </div>
      )}
    </>
  );
}
