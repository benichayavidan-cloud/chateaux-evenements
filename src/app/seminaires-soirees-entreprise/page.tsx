"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useInView } from "@/hooks/useInView";
import { ArrowRight, Check, Sparkles, Calendar, Users, Trophy, PartyPopper, Palette, HelpCircle, Plus, Minus, Phone, FileText, Star, Building2, Music, UtensilsCrossed } from "lucide-react";
import { Section, Container } from '@/components/layout-v2';
import { Text } from '@/components/ui-v2';
import { theme } from '@/design-system/tokens';
import { trackPhoneClick } from '@/components/Analytics';
import { LogoCarousel } from "@/components/LogoCarousel";
import { ReviewsSection } from "@/components/ReviewsSection";

// ParaCard — même design que les pages château
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
          }}>✦</div>
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

// Sticky Slider — CSS natif (hardware-accelerated, pas de JS scroll listener)
function StickySlider({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: 'sticky', top: '100px', alignSelf: 'flex-start' }}>
      {children}
    </div>
  );
}

// Image Slider avec navigation et auto-play (IntersectionObserver)
function ImageSlider({ images, interval = 3000 }: { images: { src: string; alt: string }[]; interval?: number }) {
  const [current, setCurrent] = useState(0);
  const total = images.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isVisibleRef = useRef(false);

  const next = () => setCurrent((c) => (c + 1) % total);
  const prev = () => setCurrent((c) => (c - 1 + total) % total);

  const startAutoplay = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isVisibleRef.current) return;
    timerRef.current = setInterval(next, interval);
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
  }, [interval]);

  const goTo = (index: number) => {
    setCurrent(index);
    startAutoplay();
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', borderRadius: '1rem', overflow: 'hidden', aspectRatio: '16/10' }}>
      {images.map((img, i) => (
        <div
          key={i}
          style={{
            position: 'absolute', inset: 0,
            opacity: i === current ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 55vw"
            loading="lazy"
          />
        </div>
      ))}
      {/* Navigation */}
      <button onClick={() => { prev(); startAutoplay(); }} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }} aria-label="Image précédente">‹</button>
      <button onClick={() => { next(); startAutoplay(); }} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }} aria-label="Image suivante">›</button>
      {/* Dots */}
      <div style={{ position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px', zIndex: 2 }}>
        {images.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{ width: i === current ? '24px' : '8px', height: '8px', borderRadius: '4px', background: i === current ? '#fff' : 'rgba(255,255,255,0.5)', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0 }} aria-label={`Image ${i + 1}`} />
        ))}
      </div>
      {/* Counter */}
      <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.5)', color: '#fff', fontSize: '0.75rem', padding: '4px 10px', borderRadius: '20px', zIndex: 2 }}>
        {current + 1} / {total}
      </div>
    </div>
  );
}

// Placeholder Slider — pour les sections sans images encore
function PlaceholderSlider({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div style={{
      width: '100%', height: '420px', borderRadius: '1rem',
      background: `linear-gradient(135deg, ${theme.colors.primary.bronze}15, ${theme.colors.primary.gold}10)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      border: `2px dashed ${theme.colors.primary.bronze}30`,
    }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <Icon style={{ width: 48, height: 48, color: theme.colors.primary.bronze, opacity: 0.4, margin: '0 auto 1rem' }} />
        <p style={{ fontSize: '0.875rem', color: theme.colors.neutral.gray500 }}>{label}</p>
      </div>
    </div>
  );
}

// Données des thèmes de soirées
const themeSoirees = [
  "Gatsby & Années Folles : Plongez vos collaborateurs dans l'univers glamour des années 1920. Décor Art Déco, orchestre de jazz live, démonstration de Charleston, tables de casino vintage et cocktails d'époque. Le dress code noir, or et sequins transforme chaque invité en personnage de la Grande Époque. Un thème incontournable pour vos galas d'entreprise en château, avec un impact visuel spectaculaire sous les lustres et dans les salons historiques.",
  "Casino Royale : L'élégance James Bond dans un château d'exception. Tables de Black Jack, roulette et poker avec croupiers professionnels, tapis rouge à l'entrée, cocktails au shaker et animation DJ. Le dress code smoking et robe longue crée une atmosphère exclusive. Parfait pour les soirées de fin d'année, les lancements de produit ou les événements de récompense qui misent sur le prestige et l'adrénaline.",
  "Murder Party & Enquête : Transformez votre soirée d'entreprise en aventure immersive. Un scénario original, des acteurs professionnels, des indices cachés dans les salons du château et des brigades de détectives parmi vos collaborateurs. La Murder Party est l'animation de team building la plus demandée — elle mêle stratégie, communication et esprit d'équipe dans un cadre qui décuple l'immersion.",
  "Bal Masqué Vénitien : L'enchantement d'un bal costumé dans les salons d'un château. Masques vénitiens distribués à l'arrivée, musique baroque live, danses de salon guidées et décor Versailles aux chandelles. Un thème qui exploite parfaitement les dorures, les boiseries et les grands escaliers des châteaux — l'écrin idéal pour créer une soirée hors du temps qui marquera durablement vos équipes.",
  "Soirée Blanche — White Party : L'élégance du tout-en-blanc dans le parc illuminé d'un château. Dress code immaculé, décoration épurée, acrobates aériens, champagne et effets de lumière UV pour un rendu photographique saisissant. Un concept raffiné et instagrammable, idéal pour les cocktails dînatoires d'été, les garden parties corporate et les célébrations qui allient standing et modernité.",
  "Prohibition & Speakeasy : Revivez l'ambiance des bars clandestins des années 1930. Entrée secrète avec mot de passe, bartenders en costume d'époque, cocktails à l'ancienne, musique swing et décor de distillerie. Les caves voûtées et les bars des châteaux se prêtent naturellement à cette ambiance feutrée. Un thème original qui crée une complicité immédiate entre vos invités.",
  "Médiévale & Banquet au Château : Un voyage dans le temps au cœur de l'histoire. Banquet aux chandelles dans le réfectoire, troubadours et ménestrels, spectacle de fauconnerie, tir à l'arc, hypocras et montée aux flambeaux dans le parc. L'Abbaye des Vaux de Cernay et ses voûtes du XIIe siècle offrent un cadre authentique incomparable pour cette immersion historique unique.",
  "Festival & Guinguette : L'esprit champêtre et festif en version château. Jeux en bois géants, guirlandes lumineuses, food trucks gastronomiques, DJ set ou groupe live, piste de danse en plein air et photobooths. Le parc et les terrasses des châteaux se transforment en village festif. Un format convivial et décontracté, parfait pour les journées de team building suivies d'une soirée mémorable.",
];

// Données de la section sur mesure
const surMesureText = [
  "Scénographie complète du lieu : Notre équipe de direction artistique transforme les salons, terrasses et parcs des châteaux selon votre thème et votre identité de marque. Mapping vidéo sur les façades, éclairages scéniques, décors floraux sur mesure, signalétique aux couleurs de votre entreprise — chaque détail visuel est conçu pour immerger vos collaborateurs dans l'univers de votre événement dès leur arrivée.",
  "Entertainment & animations premium : Orchestre live, DJ set, magicien close-up, acrobates aériens, photobooth 360°, escape game privatif, spectacle pyrotechnique, karaoké privé, simulateur de course — nous sélectionnons les prestataires les plus créatifs pour que votre soirée d'entreprise en château dépasse les attentes. Chaque animation est calibrée selon le profil de vos invités et l'objectif de votre événement.",
  "Gastronomie événementielle : Cocktail dînatoire finger food, dîner assis gastronomique, stations live cooking, bar à champagne, food trucks haut de gamme, brunch de clôture — les chefs de nos châteaux partenaires composent des menus entièrement personnalisés. Accord mets-vins, menu végétarien, options halal ou casher — chaque régime est pris en charge pour que tous vos convives vivent une expérience culinaire mémorable.",
  "Coordination de A à Z : Un chef de projet dédié orchestre l'intégralité de votre événement. Repérage du lieu, conception du programme, gestion des prestataires, logistique transport et hébergement, timing minute par minute le jour J. Vous vous concentrez sur vos invités, nous nous occupons de tout le reste. De 50 à 280 personnes, du cocktail d'une soirée au séminaire résidentiel de 3 jours.",
];

// FAQ data
const faqData = [
  {
    question: "Quels types de soirées d'entreprise peut-on organiser en château en Île-de-France ?",
    answer: "Nos châteaux accueillent tous les formats de soirées corporate : soirées de gala, cocktails dînatoires, soirées à thème (Gatsby, Casino Royale, Murder Party, Bal Masqué...), soirées de fin d'année, lancements de produit, anniversaires d'entreprise et cérémonies de remise de prix. Les capacités vont de 50 à 280 personnes selon le château, avec possibilité d'hébergement sur place pour les formats résidentiels."
  },
  {
    question: "Dans quels châteaux proche de Paris organiser une soirée d'entreprise ?",
    answer: "Select Châteaux propose 4 domaines d'exception pour vos soirées d'entreprise : un château anglo-normand à Chantilly (280 pers., 35 min de Paris), un domaine 5 étoiles à Issy-les-Moulineaux accessible en métro (100 pers.), une abbaye cistercienne en Vallée de Chevreuse (250 pers., 45 min de Paris) et un château-palace en forêt de Chantilly (250 pers., 40 min de Paris). Tous disposent de salles de réception, terrasses, hébergement et restauration sur place."
  },
  {
    question: "Quel budget prévoir pour une soirée d'entreprise en château ?",
    answer: "Le budget varie selon le nombre de participants, le format (cocktail, dîner assis, soirée à thème), les animations et la durée. Un cocktail dînatoire pour 100 personnes démarre autour de 150€/personne, un dîner de gala avec animations à partir de 250€/personne. Nous élaborons un devis détaillé et personnalisé sous 24h, adapté à votre budget et à vos objectifs."
  },
  {
    question: "Comment organiser un séminaire suivi d'une soirée d'entreprise ?",
    answer: "C'est notre spécialité. Nos châteaux disposent de centres de conférence complets (jusqu'à 21 salles) et de restaurants privatifs. Votre journée de travail (plénière, ateliers, team building) se prolonge naturellement en soirée sur le même lieu — cocktail en terrasse, dîner de gala dans les salons, soirée à thème et nuit sur place. L'unité de lieu élimine toute logistique de transport et maximise le temps utile."
  },
  {
    question: "Peut-on privatiser un château pour une soirée d'entreprise ?",
    answer: "Oui, tous nos châteaux sont privatisables en exclusivité pour votre événement. La privatisation garantit une totale confidentialité, une liberté de personnalisation du lieu (décoration, éclairage, signalétique) et un confort optimal pour vos invités. Les châteaux proposent de 83 à 144 chambres pour l'hébergement, ce qui permet des formats résidentiels complets avec séminaire en journée et soirée le soir."
  },
  {
    question: "Quelles animations de soirée d'entreprise proposez-vous ?",
    answer: "Nous orchestrons un large éventail d'animations : soirées à thème scénographiées (Gatsby, Casino, Murder Party, Médiévale...), orchestre et DJ, spectacles de magie close-up, acrobates, photobooth 360°, escape game privatif, karaoké, quiz interactif, spectacle pyrotechnique, ateliers cocktails ou œnologiques. Chaque programme est conçu sur mesure par notre équipe événementielle selon vos objectifs et le profil de vos invités."
  },
];

export default function EvenementsPage() {
  // Schema JSON-LD
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.selectchateaux.com/seminaires-soirees-entreprise#service",
    "name": "Organisation de Séminaires et Soirées d'Entreprise en Château",
    "description": "Service complet d'organisation de séminaires, soirées à thème et événements corporate dans des châteaux d'exception en Île-de-France. Gatsby, Casino Royale, Murder Party, Bal Masqué et soirées sur mesure de 50 à 280 personnes.",
    "provider": {
      "@type": "Organization",
      "@id": "https://www.selectchateaux.com/#organization",
      "name": "Select Châteaux"
    },
    "areaServed": { "@type": "State", "name": "Île-de-France" },
    "serviceType": "Organisation d'événements professionnels",
    "audience": { "@type": "Audience", "audienceType": "Entreprises" },
    "serviceOutput": [
      { "@type": "Thing", "name": "Séminaire d'entreprise" },
      { "@type": "Thing", "name": "Soirée d'entreprise à thème" },
      { "@type": "Thing", "name": "Team building" },
      { "@type": "Thing", "name": "Cocktail dînatoire" },
      { "@type": "Thing", "name": "Gala d'entreprise" }
    ],
    "offers": {
      "@type": "AggregateOffer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "EUR",
      "priceRange": "$$$"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
    }))
  };

  const heroContent = useInView();
  const statsView = useInView();
  const processHeader = useInView();
  const processSteps = useInView();
  const ctaFinal = useInView();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero Section */}
      <div className="hero-section">
        <Image
          src="/images/soiree-entreprise-theme-gatsby-chateau-seminaire.webp"
          alt="Soirée d'entreprise thème Gatsby dans un château — séminaires et événements corporate en Île-de-France"
          fill className="object-cover" priority sizes="100vw" quality={75}
        />
        <div className="hero-overlay" />
        <div className="relative h-full flex items-center justify-center" style={{ paddingBottom: '120px' }}>
          <div className="hero-content">
            <div ref={heroContent.ref} className={`flex-col-center animate-fade-in ${heroContent.isInView ? '' : 'opacity-0'}`}>
              <div className="badge-lg inline-flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/25 shadow-lg mb-8">
                <Sparkles className="w-5 h-5 text-[var(--bronze-light)]" />
                <span className="text-label text-white font-semibold tracking-wider uppercase text-xs">
                  Séminaires & Soirées d'Exception
                </span>
              </div>
              <h1 className="heading-display mb-3 leading-none" style={{ color: '#ffffff', textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>
                Séminaires et Soirées d'Entreprise en Château
              </h1>
              <p className="text-body-xl mb-6 max-w-3xl font-medium" style={{ color: 'rgba(255,255,255,0.9)', textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}>
                Soirées à thème, galas, cocktails dînatoires et séminaires résidentiels dans des châteaux d'exception en Île-de-France — de 50 à 280 personnes.
              </p>
              <div className="flex flex-wrap gap-4 items-center justify-center">
                <Link href="/devis#formulaire" className="btn-primary group">
                  <span>Devis gratuit en 24h</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="tel:+33757991146" onClick={() => trackPhoneClick()} className="badge-lg border-2 border-white/40 bg-black/40 backdrop-blur-md text-white font-semibold text-sm hover:bg-black/50 transition-all" style={{ color: 'white' }}>
                  <Phone className="w-4 h-4" style={{ color: 'white' }} />
                  07 57 99 11 46
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 z-10" style={{ bottom: '2rem' }}>
          <div className="flex flex-col items-center gap-3 animate-bounce-gentle">
            <span className="text-white text-xs uppercase tracking-widest font-bold" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>Découvrir</span>
            <div className="w-6 h-10 border-2 rounded-full flex items-start justify-center p-2 shadow-lg" style={{ borderColor: 'rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.15)' }}>
              <div className="w-1 h-3 bg-[var(--bronze-antique)] rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Bandeau Chiffres Clés */}
      <div style={{ background: `${theme.colors.primary.bronze}05`, borderBottom: `1px solid ${theme.colors.primary.bronze}15`, padding: 'clamp(16px, 3vw, 24px) 0' }}>
        <div ref={statsView.ref} style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(16px, 4vw, 40px)' }}>
            {[
              { value: "500+", label: "Événements organisés" },
              { value: "4", label: "Châteaux d'exception" },
              { value: "280", label: "Personnes max / site" },
              { value: "24h", label: "Réponse devis" },
              { value: "4.8/5", label: "Satisfaction client" },
            ].map((stat, i) => (
              <div key={i} className={`animate-on-scroll ${statsView.isInView ? 'is-visible' : ''}`} style={{ textAlign: 'center', animationDelay: `${i * 100}ms` }}>
                <div style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: theme.colors.primary.bronze, fontFamily: theme.typography.fonts.heading }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.75rem', color: theme.colors.neutral.gray600, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section Soirées à Thème — Slider LEFT + Cards RIGHT */}
      <Section spacing="lg" background="gray" style={{ padding: '15px 0' }}>
        <Container size="xl">
          <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 'clamp(2rem, 4vw, 3rem)' }}>
            <StickySlider>
              <ImageSlider images={[
                { src: "/images/services/soiree-entreprise-gatsby-annees-folles-chateau-jazz.webp", alt: "Soirée Gatsby années folles en château — orchestre jazz et tenues Art Déco" },
                { src: "/images/services/soiree-entreprise-casino-royale-chateau-tables-jeux.webp", alt: "Soirée Casino Royale en château — tables de jeux et tapis rouge" },
                { src: "/images/services/soiree-entreprise-murder-party-enquete-chateau.webp", alt: "Murder Party enquête en château — team building immersif" },
                { src: "/images/services/soiree-entreprise-bal-masque-venitien-chateau-salon.webp", alt: "Bal masqué vénitien en château — salon doré et masques" },
                { src: "/images/services/soiree-entreprise-white-party-chateau-acrobates.webp", alt: "White Party en château — soirée blanche avec acrobates aériens" },
                { src: "/images/services/soiree-entreprise-prohibition-speakeasy-chateau-cave.webp", alt: "Soirée Prohibition speakeasy en château — bar clandestin et swing" },
                { src: "/images/services/soiree-entreprise-medievale-banquet-chateau-chandelles.webp", alt: "Soirée médiévale banquet aux chandelles en château" },
                { src: "/images/services/soiree-entreprise-festival-guinguette-chateau-plein-air.webp", alt: "Soirée festival guinguette en château — food trucks et plein air" },
              ]} />
            </StickySlider>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: `${theme.colors.primary.bronze}10`, borderRadius: theme.effects.borderRadius.full, border: `1px solid ${theme.colors.primary.bronze}30`, marginBottom: '1rem' }}>
                <PartyPopper className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: theme.colors.primary.bronze, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Soirées à thème</span>
              </div>
              <Text variant="h2" style={{ marginBottom: '0.75rem', textAlign: 'left' }}>
                Des Thèmes Inoubliables pour Vos Soirées d'Entreprise
              </Text>
              <p style={{ fontSize: 'clamp(0.8125rem, 1.5vw, 0.9375rem)', lineHeight: 1.7, color: theme.colors.neutral.gray600, marginBottom: '1.25rem' }}>
                Organiser une soirée d'entreprise en château en Île-de-France, c'est offrir à vos collaborateurs un cadre qui décuple l'impact de chaque thème. Voici les concepts les plus demandés pour les événements corporate.
              </p>
              {themeSoirees.map((paragraph, i) => (
                <ParaCard key={i} text={paragraph} sectionBg="gray" />
              ))}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                {["Scénographie complète", "Animations live", "Dress code & accessoires", "100% personnalisable"].map((tag, i) => (
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

      {/* Section Sur Mesure — Zigzag inversé : Cards LEFT + Slider RIGHT */}
      <Section spacing="lg" background="white" style={{ padding: '15px 0' }}>
        <Container size="xl">
          <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 'clamp(2rem, 4vw, 3rem)' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: `${theme.colors.primary.bronze}10`, borderRadius: theme.effects.borderRadius.full, border: `1px solid ${theme.colors.primary.bronze}30`, marginBottom: '1rem' }}>
                <Palette className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: theme.colors.primary.bronze, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sur mesure</span>
              </div>
              <Text variant="h2" style={{ marginBottom: '0.75rem', textAlign: 'left' }}>
                Votre Soirée d'Entreprise Sur Mesure
              </Text>
              <p style={{ fontSize: 'clamp(0.8125rem, 1.5vw, 0.9375rem)', lineHeight: 1.7, color: theme.colors.neutral.gray600, marginBottom: '1.25rem' }}>
                Chaque événement corporate est unique. Notre équipe de direction artistique conçoit des soirées d'entreprise entièrement personnalisées dans nos châteaux partenaires en région parisienne — du concept créatif jusqu'au dernier détail logistique.
              </p>
              {surMesureText.map((paragraph, i) => (
                <ParaCard key={i} text={paragraph} sectionBg="white" />
              ))}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                {["Chef de projet dédié", "De 50 à 280 personnes", "Devis en 24h"].map((tag, i) => (
                  <Link key={i} href="/devis#formulaire" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 10px', background: `${theme.colors.primary.bronze}08`, border: `1px solid ${theme.colors.primary.bronze}20`, borderRadius: theme.effects.borderRadius.full, whiteSpace: 'nowrap', textDecoration: 'none', transition: 'all 0.2s ease' }}>
                    <Check className="w-3 h-3 flex-shrink-0" style={{ color: theme.colors.primary.bronze }} />
                    <span style={{ fontSize: '0.75rem', fontWeight: 500, color: theme.colors.neutral.gray700 }}>{tag}</span>
                  </Link>
                ))}
              </div>
            </div>
            <StickySlider>
              <ImageSlider images={[
                { src: "/images/services/soiree-entreprise-sur-mesure-scenographie-eclairage-chateau.webp", alt: "Scénographie et éclairage sur mesure pour soirée d'entreprise en château" },
                { src: "/images/services/soiree-entreprise-sur-mesure-entertainment-spectacle-chateau.webp", alt: "Entertainment et spectacle acrobates pour soirée corporate en château" },
                { src: "/images/services/soiree-entreprise-sur-mesure-gastronomie-cocktail-chateau.webp", alt: "Gastronomie cocktail dînatoire sur mesure en château" },
                { src: "/images/services/soiree-entreprise-sur-mesure-coordination-logistique-chateau.webp", alt: "Coordination logistique événement d'entreprise sur mesure" },
              ]} />
            </StickySlider>
          </div>
        </Container>
      </Section>

      {/* Processus */}
      <div style={{ paddingTop: '15px', paddingBottom: '15px', background: '#f6f9fc' }}>
        <div className="section-container">
          <div ref={processHeader.ref} className={`w-full text-center mb-md animate-on-scroll ${processHeader.isInView ? 'is-visible' : ''}`}>
            <div className="flex-center gap-md mb-md">
              <Trophy className="w-7 h-7 text-[var(--bronze-antique)]" />
              <h2 className="text-label" style={{ color: '#A37E2C' }}>Notre processus</h2>
            </div>
            <h3 className="heading-xl mb-3" style={{ color: '#1a1f36' }}>
              Organiser votre soirée d'entreprise en château : comment ça marche ?
            </h3>
            <p className="text-body-xl mb-md" style={{ color: '#6b7c93' }}>
              Un processus simple et personnalisé, du premier contact au jour J
            </p>
          </div>
          <div ref={processSteps.ref} className="flex flex-row gap-6 max-w-[var(--max-width-content)] mx-auto justify-center items-start flex-wrap">
            {[
              { step: "1", titre: "Demande de devis", description: "Décrivez votre projet en 5 minutes : nombre de participants, date, format souhaité et budget" },
              { step: "2", titre: "Proposition sur mesure", description: "Notre équipe vous contacte sous 24h avec une sélection de châteaux et un programme personnalisé" },
              { step: "3", titre: "Visite & validation", description: "Visitez le château choisi, affinez les détails et validez votre programme événementiel" },
              { step: "4", titre: "Votre événement", description: "Un coordinateur dédié orchestre chaque détail du premier café au dernier invité" },
            ].map((item, i) => (
              <div key={item.step} className={`flex flex-col items-center text-center animate-on-scroll from-scale ${processSteps.isInView ? 'is-visible' : ''}`} style={{ width: '250px', animationDelay: `${i * 0.15}s` }}>
                <div className="process-step-circle rounded-full bg-[var(--bronze-antique)] text-white flex-center text-3xl font-bold shadow-lg mb-md hover:scale-110" style={{ width: '90px', height: '90px', transition: 'transform 0.3s ease' }}>
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#1a1f36', minHeight: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.titre}
                </h3>
                <p className="leading-relaxed" style={{ color: '#6b7c93', fontSize: '14px' }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <Section spacing="lg" background="white" style={{ padding: '15px 0' }}>
        <Container size="lg">
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: `${theme.colors.primary.bronze}10`, borderRadius: theme.effects.borderRadius.full, border: `1px solid ${theme.colors.primary.bronze}30`, marginBottom: '1rem' }}>
              <HelpCircle className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: theme.colors.primary.bronze, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Questions fréquentes</span>
            </div>
            <Text variant="h2" style={{ marginBottom: '0.5rem', textAlign: 'center' }}>
              Tout savoir sur les soirées d'entreprise en château
            </Text>
          </div>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {faqData.map((faq, i) => (
              <div
                key={i}
                style={{
                  borderBottom: `1px solid ${theme.colors.neutral.gray200 || '#e5e7eb'}`,
                  overflow: 'hidden',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: 'clamp(16px, 2vw, 20px) 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  <span style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)', fontWeight: 600, color: theme.colors.neutral.gray900, paddingRight: '1rem', lineHeight: 1.5 }}>
                    {faq.question}
                  </span>
                  {openFaq === i ? (
                    <Minus className="w-5 h-5 flex-shrink-0" style={{ color: theme.colors.primary.bronze }} />
                  ) : (
                    <Plus className="w-5 h-5 flex-shrink-0" style={{ color: theme.colors.primary.bronze }} />
                  )}
                </button>
                <div style={{
                  maxHeight: openFaq === i ? '500px' : '0',
                  opacity: openFaq === i ? 1 : 0,
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                }}>
                  <p style={{
                    fontSize: 'clamp(0.8125rem, 1.5vw, 0.9375rem)', lineHeight: 1.8,
                    color: theme.colors.neutral.gray600, paddingBottom: 'clamp(16px, 2vw, 20px)',
                  }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Final */}
      <div style={{ paddingTop: '15px', paddingBottom: '15px', background: '#f6f9fc' }}>
        <div className="section-container">
          <div ref={ctaFinal.ref} className={`w-full text-center content-padding animate-on-scroll ${ctaFinal.isInView ? 'is-visible' : ''}`}>
            <h2 className="heading-xl mb-md">
              Prêt à organiser votre soirée d'entreprise en château ?
            </h2>
            <p className="text-body-xl mb-xl">
              Décrivez votre projet — notre équipe vous propose un programme sur mesure sous 24h
            </p>
            <div className="flex flex-wrap gap-lg items-center justify-center">
              <Link href="/devis#formulaire" className="btn-primary group">
                <Calendar className="w-5 h-5" />
                <span>Demander un Devis Gratuit</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="tel:+33757991146" onClick={() => trackPhoneClick()} className="badge-lg border-2 border-white/40 bg-black/40 backdrop-blur-md text-white font-semibold text-sm hover:bg-black/50 transition-all" style={{ color: 'white' }}>
                <Phone className="w-4 h-4" style={{ color: 'white' }} />
                07 57 99 11 46
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Logos Clients */}
      <LogoCarousel />

      {/* Témoignages */}
      <ReviewsSection />
    </div>
  );
}
