/**
 * CHÂTEAU PAGE CLIENT - Composant interactif
 * Reçoit les données du château depuis le Server Component
 */

'use client';

import Image from "next/image";
import Link from "next/link";
import { Users, Check, Sparkles, Bed, Building2, UtensilsCrossed, Plus, Minus, HelpCircle, MapPin, Phone, FileText, Clock, Lock, Package } from "lucide-react";
import { Section, Container } from '@/components/layout-v2';
import { Text, Badge, Button } from '@/components/ui-v2';
import { theme } from '@/design-system/tokens';
import { useState, useEffect, useRef } from "react";
import type { Chateau } from "@/types";
import { trackChateauView, trackPhoneClick } from "@/components/Analytics";
import DevisFormMini from "@/components/DevisFormMini";
import { useInView } from "@/hooks/useInView";

interface ChateauPageClientProps {
  chateau: Chateau;
}

// Helper pour obtenir l'index de l'image d'hébergement selon le château
const getBedroomImageIndex = (chateauId: string): number => {
  const mapping: Record<string, number> = {
    "1": 2, "2": 0, "3": 0, "4": 1, "5": 0, "6": 0, "7": 0,
  };
  return mapping[chateauId] ?? 0;
};

// Helper pour obtenir l'index de l'image de salle de réunion selon le château
const getMeetingRoomImageIndex = (chateauId: string): number => {
  const mapping: Record<string, number> = {
    "1": 1, "2": 5, "3": 6, "4": 3, "5": 1, "6": 1, "7": 1,
  };
  return mapping[chateauId] ?? 1;
};

// Wrapper Sticky CSS — hardware-accelerated, pas de JS scroll listener
function StickySlider({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: 'sticky', top: '100px', alignSelf: 'flex-start' }}>
      {children}
    </div>
  );
}

// Paragraph Card — Design Cards avec bordure dorée
function ParaCard({ text, sectionBg = 'gray' }: { text: string; sectionBg?: 'gray' | 'white' }) {
  const [hovered, setHovered] = useState(false);

  // Détecte "Label : Contenu" pour extraire un titre de carte
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

// Slider pour la section Vue d'ensemble
function OverviewSlider({ images, nom }: { images: string[]; nom: string }) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = () => {
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 2000);
  };
  useEffect(() => {
    startAutoplay();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  const goTo = (index: number) => {
    setCurrent(index);
    if (timerRef.current) clearInterval(timerRef.current);
    startAutoplay();
  };

  return (
    <div style={{ position: 'relative', height: '420px', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
      {images.map((img, i) => (
        <div
          key={i}
          style={{
            position: 'absolute', inset: 0,
            opacity: current === i ? 1 : 0,
            transition: 'opacity 0.6s ease-in-out',
          }}
        >
          <Image src={img} alt={`${nom} - ${i + 1}`} fill className="object-cover" loading="lazy" quality={80} sizes="50vw" />
        </div>
      ))}
      {/* Flèches */}
      <button
        onClick={() => goTo((current - 1 + images.length) % images.length)}
        style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.85)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', color: '#333', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', zIndex: 2 }}
        aria-label="Précédent"
      >‹</button>
      <button
        onClick={() => goTo((current + 1) % images.length)}
        style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.85)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', color: '#333', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', zIndex: 2 }}
        aria-label="Suivant"
      >›</button>
      {/* Dots */}
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
    </div>
  );
}

// Section Hébergement — Variant Overlay avec slider
function HebergementOverlay({ chateau }: { chateau: Chateau }) {
  // Images de chambre : filtre auto + images forcées par château
  const extraBedroomImages: Record<string, string[]> = {
    "1": [
      "/images/evenement-entreprise-chateau-montvillargenne-chambre-design-contemporaine.webp",
      "/images/evenement-entreprise-chateau-montvillargenne-chambre-double-cosy.webp",
      "/images/evenement-entreprise-chateau-montvillargenne-chambre-elegante-moderne.webp",
      "/images/evenement-entreprise-chateau-montvillargenne-chambre-prestige-rouge.webp",
      "/images/evenement-entreprise-chateau-montvillargenne-chambre-loft-industriel.webp",
    ],
    "2": [
      "/images/evenement-entreprise-reine-margot-chambre-doree.webp",
      "/images/evenement-entreprise-reine-margot-chambre-prestige-bleue.webp",
      "/images/evenement-entreprise-reine-margot-chambre-vue-panoramique.webp",
      "/images/evenement-entreprise-reine-margot-salle-de-bain-design.webp",
      "/images/evenement-entreprise-reine-margot-suite-salon-vue-jardin.webp",
    ],
    "3": [
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-chambre-cosy-ferme.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-chambre-cosy-haras.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-chambre-cottage-ferme.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-chambre-deluxe-abbaye.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-chambre-deluxe-ferme.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-chambre-particuliere-abbaye.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-chambre-singuliere-abbaye.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-chambre-superieure-abbaye-1.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-chambre-superieure-abbaye-2.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-chambre-superieure-ferme.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-chambre-tiny-haras.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-chambre-famille-abbaye.webp",
    ],
    "4": [
      "/images/evenement-entreprise-tiara-mont-royal-chantilly-chambre-premium-balcon.webp",
      "/images/evenement-entreprise-tiara-mont-royal-chantilly-chambre-premium-terrasse.webp",
      "/images/evenement-entreprise-tiara-mont-royal-chantilly-chambre-twin.webp",
      "/images/evenement-entreprise-tiara-mont-royal-chantilly-junior-suite.webp",
      "/images/evenement-entreprise-tiara-mont-royal-chantilly-suite-prince-de-conde-2.webp",
      "/images/evenement-entreprise-tiara-mont-royal-chantilly-suite-prince-de-conde-1.webp",
      "/images/evenement-entreprise-tiara-mont-royal-chantilly-suite-royale-2.webp",
      "/images/evenement-entreprise-tiara-mont-royal-chantilly-suite-royale-1.webp",
      "/images/evenement-entreprise-tiara-mont-royal-chantilly-salle-de-bain.webp",
    ],
  };
  const autoBedroomImages = chateau.images.galerie.filter(img => /chambre|suite|bedroom|room|lit/i.test(img));
  const forcedImages = extraBedroomImages[chateau.id] || [];
  const allBedroomImages = [...forcedImages, ...autoBedroomImages.filter(img => !forcedImages.includes(img))];
  const fallbackImg = chateau.images.galerie[getBedroomImageIndex(chateau.id)] || chateau.images.hero[2];
  const images = allBedroomImages.length > 0 ? allBedroomImages : [fallbackImg];
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = () => {
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 2000);
  };

  useEffect(() => {
    startAutoplay();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  const goTo = (index: number) => {
    setCurrent(index);
    if (timerRef.current) clearInterval(timerRef.current);
    startAutoplay();
  };

  return (
    <Section spacing="lg" background="white" style={{ padding: 'clamp(2.5rem, 5vw, 4rem) 0' }}>
      <Container size="xl">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.15fr]" style={{ gap: 'clamp(2rem, 4vw, 3rem)' }}>
          {/* Cards LEFT */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: `${theme.colors.primary.bronze}10`, borderRadius: theme.effects.borderRadius.full, border: `1px solid ${theme.colors.primary.bronze}30`, marginBottom: '1rem' }}>
              <Bed className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: theme.colors.primary.bronze, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Hébergement</span>
            </div>
            <Text variant="h2" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
              {chateau.roomsTotal} chambres d&apos;exception
            </Text>
            {chateau.bedroomText.split('\n\n').map((paragraph, i) => (
              <ParaCard key={i} text={paragraph} sectionBg="white" />
            ))}
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 10px', background: `${theme.colors.primary.bronze}08`, border: `1px solid ${theme.colors.primary.bronze}20`, borderRadius: theme.effects.borderRadius.full, whiteSpace: 'nowrap' }}>
                <Bed className="w-3 h-3 flex-shrink-0" style={{ color: theme.colors.primary.bronze }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 500, color: theme.colors.neutral.gray700 }}>{chateau.roomsTotal} Chambres</span>
              </div>
              {chateau.roomsTwin && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 10px', background: `${theme.colors.primary.bronze}08`, border: `1px solid ${theme.colors.primary.bronze}20`, borderRadius: theme.effects.borderRadius.full, whiteSpace: 'nowrap' }}>
                  <Users className="w-3 h-3 flex-shrink-0" style={{ color: theme.colors.primary.bronze }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 500, color: theme.colors.neutral.gray700 }}>{chateau.roomsTwin} Twin</span>
                </div>
              )}
            </div>
          </div>
          {/* Slider RIGHT — sticky JS */}
          <StickySlider>
            <div style={{ position: 'relative', height: '420px', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
              {images.map((img, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute', inset: 0,
                    opacity: current === i ? 1 : 0,
                    transition: 'opacity 0.8s ease-in-out',
                  }}
                >
                  <Image src={img} alt={`${chateau.nom} - chambre ${i + 1}`} fill sizes="50vw" className="object-cover" loading="lazy" quality={80} />
                </div>
              ))}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => goTo((current - 1 + images.length) % images.length)}
                    style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.85)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', color: '#333', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', zIndex: 2 }}
                    aria-label="Précédent"
                  >‹</button>
                  <button
                    onClick={() => goTo((current + 1) % images.length)}
                    style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.85)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', color: '#333', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', zIndex: 2 }}
                    aria-label="Suivant"
                  >›</button>
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
          </StickySlider>
        </div>
      </Container>
    </Section>
  );
}

// Slider pour la section Restauration
function RestaurantSlider({ chateau }: { chateau: Chateau }) {
  const extraRestaurantImages: Record<string, string[]> = {
    "1": [
      "/images/evenement-entreprise-chateau-montvillargenne-restaurant-bar-lounge.webp",
      "/images/evenement-entreprise-chateau-montvillargenne-salon-lounge-bar.webp",
      "/images/evenement-entreprise-chateau-montvillargenne-terrasse-restaurant-exterieur.webp",
      "/images/evenement-entreprise-chateau-montvillargenne-bar-lounge-chic.webp",
      "/images/evenement-entreprise-chateau-montvillargenne-brunch-buffet-patisseries.webp",
      "/images/evenement-entreprise-chateau-montvillargenne-buffet-gastronomique-traiteur.webp",
      "/images/evenement-entreprise-chateau-montvillargenne-salon-cheminee-cosy.webp",
    ],
    "2": [
      "/images/evenement-entreprise-reine-margot-restaurant-verriere.webp",
      "/images/evenement-entreprise-reine-margot-serre-verriere-diner.webp",
      "/images/evenement-entreprise-reine-margot-cuisine-gastronomique-dressage.webp",
      "/images/evenement-entreprise-reine-margot-terrasse-jardin-potager.webp",
      "/images/evenement-entreprise-reine-margot-facade-jardin-terrasse.webp",
      "/images/evenement-entreprise-reine-margot-facade-illuminee-soiree.webp",
      "/images/evenement-entreprise-reine-margot-cour-interieure-passerelle.webp",
      "/images/evenement-entreprise-reine-margot-espace-pause-cafe-accueil.webp",
      "/images/evenement-entreprise-reine-margot-chapelle-lounge-interieur.webp",
    ],
    "3": [
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-refectoire-des-moines.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-diner-refectoire-des-moines.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-restaurant-les-chasses.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-terrasse-restaurant-les-chasses.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-restaurant-trattoria-ferme.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-restaurant-auberge.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-terrasse-auberge.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-james-bar-salon-anglais.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-james-bar-salon-de-musique.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-james-bar-salon-ete.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-bettys-bar-ferme.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-karaoke.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-62-espace-pause-sellerie-1.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-63-espace-pause-sellerie-2.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-64-pause-apres-midi.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-68-activites-camion-maraicher.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-58-salon-1900-haras-3.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-60-salon-1900-haras-5.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-pavillon-des-sources.webp",
    ],
    "4": [
      "/images/evenement-entreprise-tiara-mont-royal-chantilly-restaurant-opera.webp",
      "/images/evenement-entreprise-tiara-mont-royal-chantilly-bar-stradivarius.webp",
      "/images/evenement-entreprise-tiara-mont-royal-chantilly-terrasse-exterieure.webp",
      "/images/evenement-entreprise-tiara-mont-royal-chantilly-patio.webp",
      "/images/evenement-entreprise-tiara-mont-royal-chantilly-patio-2.webp",
      "/images/evenement-entreprise-tiara-mont-royal-chantilly-buffet-seminaire.webp",
      "/images/evenement-entreprise-tiara-mont-royal-chantilly-activites-team-building.webp",
      "/images/evenement-entreprise-tiara-mont-royal-chantilly-salle-pleniere-halphen.webp",
    ],
  };
  const forced = extraRestaurantImages[chateau.id];
  const restImages = forced || chateau.images.galerie.filter(img => /restaurant|terrasse|bar|buffet|brunch|cuisine|traiteur/i.test(img));
  const fallbackImg = chateau.images.hero[0];
  const images = restImages.length > 0 ? restImages : [fallbackImg];
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = () => {
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 2000);
  };
  useEffect(() => {
    startAutoplay();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  const goTo = (index: number) => {
    setCurrent(index);
    if (timerRef.current) clearInterval(timerRef.current);
    startAutoplay();
  };

  return (
    <div style={{ position: 'relative', height: '420px', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
      {images.map((img, i) => (
        <div
          key={i}
          style={{
            position: 'absolute', inset: 0,
            opacity: current === i ? 1 : 0,
            transition: 'opacity 0.6s ease-in-out',
          }}
        >
          <Image src={img} alt={`${chateau.nom} - restauration ${i + 1}`} fill className="object-cover" loading="lazy" quality={80} sizes="50vw" />
        </div>
      ))}
      {images.length > 1 && (
        <>
          <button
            onClick={() => goTo((current - 1 + images.length) % images.length)}
            style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.85)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', color: '#333', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', zIndex: 2 }}
            aria-label="Précédent"
          >‹</button>
          <button
            onClick={() => goTo((current + 1) % images.length)}
            style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.85)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', color: '#333', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', zIndex: 2 }}
            aria-label="Suivant"
          >›</button>
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
                aria-label={`Photo restauration ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Slider pour la section Espaces de Réunion
function MeetingRoomSlider({ chateau }: { chateau: Chateau }) {
  // Images forcées par château (prioritaires sur le filtre auto)
  const extraMeetingImages: Record<string, string[]> = {
    "1": [
      "/images/evenement-entreprise-chateau-montvillargenne-lobby-salon-accueil.webp",
      "/images/evenement-entreprise-chateau-montvillargenne-salle-atelier-creatif.webp",
      "/images/evenement-entreprise-chateau-montvillargenne-salle-pleniere-brique.webp",
      "/images/evenement-entreprise-chateau-montvillargenne-salle-pleniere-theatre.webp",
      "/images/evenement-entreprise-chateau-montvillargenne-salle-reunion-board-room.webp",
      "/images/evenement-entreprise-chateau-montvillargenne-salle-reunion-carte-murale.webp",
      "/images/evenement-entreprise-chateau-montvillargenne-salle-reunion-prestige.webp",
      "/images/evenement-entreprise-chateau-montvillargenne-salle-seminaire-verte.webp",
    ],
    "3": [
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-49-salon-saint-thibault-3.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-50-salon-pivoine-ferme.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-51-salon-dahlia-ferme.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-53-salon-orangerie-haras-2.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-54-salon-ecuries-haras-1.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-56-salon-ecuries-haras-3.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-57-salon-cavaliers-haras.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-59-salon-1900-haras-4.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-60-salon-1900-haras-5.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-61-salon-1900-haras-6.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-salon-1900-haras-2.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-62-espace-pause-sellerie-1.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-63-espace-pause-sellerie-2.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-64-pause-apres-midi.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-james-bar-salon-ete.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-karaoke.webp",
    ],
    "4": [
      "/images/evenement-entreprise-tiara-mont-royal-chantilly-salle-vivaldi.webp",
      "/images/evenement-entreprise-tiara-mont-royal-chantilly-salle-pleniere-halphen.webp",
      "/images/evenement-entreprise-tiara-mont-royal-chantilly-salle-debussy.webp",
      "/images/evenement-entreprise-tiara-mont-royal-chantilly-salle-caruso.webp",
      "/images/evenement-entreprise-tiara-mont-royal-chantilly-salle-callas.webp",
      "/images/evenement-entreprise-tiara-mont-royal-chantilly-salle-callas-2.webp",
      "/images/evenement-entreprise-tiara-mont-royal-chantilly-patio-2.webp",
      "/images/evenement-entreprise-tiara-mont-royal-chantilly-creativity-room.webp",
      "/images/evenement-entreprise-tiara-mont-royal-chantilly-bar-stradivarius.webp",
    ],
  };
  const forcedMeeting = extraMeetingImages[chateau.id];
  // Filtrer les images de salles de réunion
  const meetingImages = forcedMeeting || chateau.images.galerie.filter(img => /salle|reunion|seminaire|auditorium|conference|theatre|board/i.test(img));
  const fallbackImg = chateau.images.galerie[getMeetingRoomImageIndex(chateau.id)] || chateau.images.hero[1];
  const images = meetingImages.length > 0 ? meetingImages : [fallbackImg];
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = () => {
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 2000);
  };
  useEffect(() => {
    startAutoplay();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  const goTo = (index: number) => {
    setCurrent(index);
    if (timerRef.current) clearInterval(timerRef.current);
    startAutoplay();
  };

  return (
    <div style={{ position: 'relative', height: '420px', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
      {images.map((img, i) => (
        <div
          key={i}
          style={{
            position: 'absolute', inset: 0,
            opacity: current === i ? 1 : 0,
            transition: 'opacity 0.6s ease-in-out',
          }}
        >
          <Image src={img} alt={`${chateau.nom} - salle ${i + 1}`} fill className="object-cover" loading="lazy" quality={80} sizes="50vw" />
        </div>
      ))}
      {images.length > 1 && (
        <>
          <button
            onClick={() => goTo((current - 1 + images.length) % images.length)}
            style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.85)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', color: '#333', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', zIndex: 2 }}
            aria-label="Précédent"
          >‹</button>
          <button
            onClick={() => goTo((current + 1) % images.length)}
            style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.85)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', color: '#333', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', zIndex: 2 }}
            aria-label="Suivant"
          >›</button>
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

// Section Espaces de Réunion — Overlay avec slider
function EspacesReunionOverlay({ chateau }: { chateau: Chateau }) {
  const extraMeetingImagesOverlay: Record<string, string[]> = {
    "1": [
      "/images/evenement-entreprise-chateau-montvillargenne-lobby-salon-accueil.webp",
      "/images/evenement-entreprise-chateau-montvillargenne-salle-atelier-creatif.webp",
      "/images/evenement-entreprise-chateau-montvillargenne-salle-pleniere-brique.webp",
      "/images/evenement-entreprise-chateau-montvillargenne-salle-pleniere-theatre.webp",
      "/images/evenement-entreprise-chateau-montvillargenne-salle-reunion-board-room.webp",
      "/images/evenement-entreprise-chateau-montvillargenne-salle-reunion-carte-murale.webp",
      "/images/evenement-entreprise-chateau-montvillargenne-salle-reunion-prestige.webp",
      "/images/evenement-entreprise-chateau-montvillargenne-salle-seminaire-verte.webp",
    ],
    "3": [
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-49-salon-saint-thibault-3.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-50-salon-pivoine-ferme.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-51-salon-dahlia-ferme.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-53-salon-orangerie-haras-2.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-54-salon-ecuries-haras-1.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-56-salon-ecuries-haras-3.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-57-salon-cavaliers-haras.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-59-salon-1900-haras-4.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-60-salon-1900-haras-5.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-61-salon-1900-haras-6.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-salon-1900-haras-2.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-62-espace-pause-sellerie-1.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-63-espace-pause-sellerie-2.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-64-pause-apres-midi.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-james-bar-salon-ete.webp",
      "/images/evenement-entreprise-abbaye-vaux-de-cernay-karaoke.webp",
    ],
    "4": [
      "/images/evenement-entreprise-tiara-mont-royal-chantilly-salle-vivaldi.webp",
      "/images/evenement-entreprise-tiara-mont-royal-chantilly-salle-pleniere-halphen.webp",
      "/images/evenement-entreprise-tiara-mont-royal-chantilly-salle-debussy.webp",
      "/images/evenement-entreprise-tiara-mont-royal-chantilly-salle-caruso.webp",
      "/images/evenement-entreprise-tiara-mont-royal-chantilly-salle-callas.webp",
      "/images/evenement-entreprise-tiara-mont-royal-chantilly-salle-callas-2.webp",
      "/images/evenement-entreprise-tiara-mont-royal-chantilly-patio-2.webp",
      "/images/evenement-entreprise-tiara-mont-royal-chantilly-creativity-room.webp",
      "/images/evenement-entreprise-tiara-mont-royal-chantilly-bar-stradivarius.webp",
    ],
  };
  const forcedMeeting = extraMeetingImagesOverlay[chateau.id];
  const meetingImages = forcedMeeting || chateau.images.galerie.filter(img => /salle|reunion|seminaire|auditorium|conference|theatre|board/i.test(img));
  const fallbackImg = chateau.images.galerie[getMeetingRoomImageIndex(chateau.id)] || chateau.images.hero[1];
  const images = meetingImages.length > 0 ? meetingImages : [fallbackImg];
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = () => {
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 2000);
  };

  useEffect(() => {
    startAutoplay();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  const goTo = (index: number) => {
    setCurrent(index);
    if (timerRef.current) clearInterval(timerRef.current);
    startAutoplay();
  };

  return (
    <section style={{ padding: 0 }}>
      <div style={{ position: 'relative', height: 'clamp(28rem, 60vw, 38rem)', overflow: 'hidden' }}>
        {/* Slider images */}
        {images.map((img, i) => (
          <div
            key={i}
            style={{
              position: 'absolute', inset: 0,
              opacity: current === i ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
            }}
          >
            <Image src={img} alt={`${chateau.nom} - salle de réunion ${i + 1}`} fill sizes="100vw" className="object-cover" loading="lazy" quality={80} />
          </div>
        ))}
        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)', zIndex: 1 }} />
        {/* Flèches */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => goTo((current - 1 + images.length) % images.length)}
              style={{ position: 'absolute', right: '4.5rem', bottom: '1.5rem', width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', color: 'white', zIndex: 3 }}
              aria-label="Précédent"
            >‹</button>
            <button
              onClick={() => goTo((current + 1) % images.length)}
              style={{ position: 'absolute', right: '1.5rem', bottom: '1.5rem', width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', color: 'white', zIndex: 3 }}
              aria-label="Suivant"
            >›</button>
          </>
        )}
        {/* Contenu overlay */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1.5rem, 5vw, 4rem)', zIndex: 2 }}>
          <Container size="xl">
            <div style={{ maxWidth: '800px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <Building2 className="w-6 h-6" style={{ color: theme.colors.primary.gold }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: theme.colors.primary.gold, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Espaces de travail</span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontWeight: 600, fontFamily: theme.typography.fonts.heading, color: 'white', marginBottom: '1rem', lineHeight: 1.2 }}>
                Espaces de Réunion
              </h2>
              <div style={{ fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '650px' }}>
                {chateau.meetingText.split('\n\n').map((paragraph, i) => (
                  <p key={i} style={{ marginBottom: i < chateau.meetingText.split('\n\n').length - 1 ? '1rem' : 0 }}>
                    {paragraph}
                  </p>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: theme.effects.borderRadius.full }}>
                  <Check className="w-4 h-4" style={{ color: theme.colors.primary.gold }} />
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'white' }}>Lumière naturelle</span>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: theme.effects.borderRadius.full }}>
                  <Check className="w-4 h-4" style={{ color: theme.colors.primary.gold }} />
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'white' }}>Équipement AV complet</span>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: theme.effects.borderRadius.full }}>
                  <Check className="w-4 h-4" style={{ color: theme.colors.primary.gold }} />
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'white' }}>Salles modulables</span>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}

export default function ChateauPageClient({ chateau }: ChateauPageClientProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'accommodation' | 'spaces'>('overview');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Toutes les images combinées pour le carrousel lightbox
  const allImages = [...chateau.images.hero, ...chateau.images.galerie.filter(img => !chateau.images.hero.includes(img))];

  const openLightbox = (clickedImage: string) => {
    const idx = allImages.indexOf(clickedImage);
    setLightboxIndex(idx >= 0 ? idx : 0);
  };
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex(i => i !== null ? (i - 1 + allImages.length) % allImages.length : null);
  const nextImage = () => setLightboxIndex(i => i !== null ? (i + 1) % allImages.length : null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const pointsFortsView = useInView();
  const faqCtaView = useInView();
  const ctaView = useInView();
  const ctaButtonsView = useInView();

  useEffect(() => {
    trackChateauView(chateau.nom);
  }, [chateau.nom]);

  // Show sticky CTA bar after scrolling past the hero section
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Hero Section — Style Airbnb hybride */}
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
                {chateau.region}
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
                Réf.
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: theme.typography.fontWeight.semibold, color: theme.colors.primary.bronzeDark, fontFamily: 'monospace' }}>
                {chateau.ref}
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
            {chateau.seoH1}
          </h1>

          <div className="flex flex-wrap items-center gap-3" style={{ color: theme.colors.neutral.gray600, fontSize: '0.9375rem' }}>
            <span className="inline-flex items-center gap-1.5">
              <Users className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
              {chateau.capacite.min}–{chateau.capacite.max} personnes
            </span>
            <span style={{ color: theme.colors.neutral.gray300 }}>·</span>
            <span className="inline-flex items-center gap-1.5">
              <Bed className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
              {chateau.roomsTotal} chambres
              {chateau.roomsTwin ? ` (${chateau.roomsTwin} twins)` : ''}
            </span>
            <span style={{ color: theme.colors.neutral.gray300 }}>·</span>
            <span className="inline-flex items-center gap-1.5">
              <Building2 className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
              {chateau.styleArchitectural}
            </span>
          </div>
        </div>

        {/* Grille photos style Airbnb */}
        <div
          className="rounded-2xl overflow-hidden"
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
            onClick={() => openLightbox(chateau.images.hero[0])}
          >
            <Image
              src={chateau.images.hero[0]}
              alt={`${chateau.seoH1} - Vue principale`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
              quality={85}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* 4 petites images à droite — grille 2x2 */}
          <div className="relative cursor-pointer group overflow-hidden" onClick={() => openLightbox(chateau.images.hero[1] || chateau.images.galerie[0])}>
            <Image
              src={chateau.images.hero[1] || chateau.images.galerie[0]}
              alt={`${chateau.nom} - Intérieur`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              quality={80}
              sizes="25vw"
            />
          </div>

          <div className="relative cursor-pointer group overflow-hidden" onClick={() => openLightbox(chateau.images.hero[2] || chateau.images.galerie[1])}>
            <Image
              src={chateau.images.hero[2] || chateau.images.galerie[1]}
              alt={`${chateau.nom} - Espaces`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              quality={80}
              sizes="25vw"
            />
          </div>

          <div className="relative cursor-pointer group overflow-hidden" onClick={() => openLightbox(chateau.images.hero[3] || chateau.images.galerie[2])}>
            <Image
              src={chateau.images.hero[3] || chateau.images.galerie[2]}
              alt={`${chateau.nom} - Chambres`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              quality={80}
              sizes="25vw"
            />
          </div>

          <div className="relative cursor-pointer group overflow-hidden" onClick={() => openLightbox(chateau.images.galerie[3] || chateau.images.hero[0])}>
            <Image
              src={chateau.images.galerie[3] || chateau.images.hero[0]}
              alt={`${chateau.nom} - Vue complémentaire`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              quality={80}
              sizes="25vw"
            />
            {/* Bouton "Voir toutes les photos" */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(0);
              }}
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
            {chateau.accrocheHero}
          </p>
          <div className="flex gap-2.5 flex-shrink-0 items-center">
            <a
              href="#devis-express"
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
                boxShadow: `0 4px 16px ${theme.colors.primary.bronze}40`,
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap',
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

      {/* Bandeau chiffres clés — Arguments annonce Google Ads */}
      <div
        style={{
          background: `${theme.colors.primary.bronze}05`,
          borderBottom: `1px solid ${theme.colors.primary.bronze}15`,
          padding: 'clamp(12px, 2vw, 16px) 0',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 'clamp(8px, 2vw, 16px)',
            }}
          >
            {[
              { icon: <Check className="w-3.5 h-3.5" />, label: '500+ Événements' },
              { icon: <Clock className="w-3.5 h-3.5" />, label: 'Devis sous 24h' },
              { icon: <Lock className="w-3.5 h-3.5" />, label: 'Privatisation Totale' },
              { icon: <Package className="w-3.5 h-3.5" />, label: 'Tout Inclus' },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  background: `${theme.colors.primary.bronze}08`,
                  border: `1px solid ${theme.colors.primary.bronze}20`,
                  borderRadius: theme.effects.borderRadius.full,
                }}
              >
                <span style={{ color: theme.colors.primary.bronze, display: 'flex' }}>{item.icon}</span>
                <span
                  style={{
                    fontSize: 'clamp(10px, 1.5vw, 12px)',
                    fontWeight: theme.typography.fontWeight.semibold,
                    color: theme.colors.primary.bronze,
                    textTransform: 'uppercase',
                    letterSpacing: theme.typography.letterSpacing.wide,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section Vue d'ensemble — Slider gauche (sticky) + Cards droite */}
      <Section spacing="lg" background="gray" style={{ padding: 'clamp(2.5rem, 5vw, 4rem) 0' }}>
        <Container size="xl">
          <div className="grid grid-cols-1 md:grid-cols-[1.15fr_1fr]" style={{ gap: 'clamp(2rem, 4vw, 3rem)' }}>
            {/* Slider LEFT — sticky */}
            <StickySlider>
              <OverviewSlider images={chateau.images.hero} nom={chateau.nom} />
            </StickySlider>
            {/* Cards RIGHT */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: `${theme.colors.primary.bronze}10`, borderRadius: theme.effects.borderRadius.full, border: `1px solid ${theme.colors.primary.bronze}30`, marginBottom: '1rem' }}>
                <Sparkles className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: theme.colors.primary.bronze, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Le lieu</span>
              </div>
              <Text variant="h2" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                Une expérience d&#39;exception
              </Text>
              {chateau.descriptionLongue.split('\n\n').map((paragraph, i) => (
                <ParaCard key={i} text={paragraph} sectionBg="gray" />
              ))}
              <div className="flex flex-wrap" style={{ gap: '0.5rem', marginTop: '1rem' }}>
                {chateau.atouts.map((atout, i) => (
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

      {/* Section Hébergement — Overlay slider pleine largeur */}
      <HebergementOverlay chateau={chateau} />

      {/* Section Espaces de Réunion — Slider gauche (sticky) + Cards droite */}
      <Section spacing="lg" background="gray" style={{ padding: 'clamp(2.5rem, 5vw, 4rem) 0' }}>
        <Container size="xl">
          <div className="grid grid-cols-1 md:grid-cols-[1.15fr_1fr]" style={{ gap: 'clamp(2rem, 4vw, 3rem)' }}>
            {/* Slider LEFT — sticky */}
            <StickySlider>
              <MeetingRoomSlider chateau={chateau} />
            </StickySlider>
            {/* Cards RIGHT */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: `${theme.colors.primary.bronze}10`, borderRadius: theme.effects.borderRadius.full, border: `1px solid ${theme.colors.primary.bronze}30`, marginBottom: '1rem' }}>
                <Building2 className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: theme.colors.primary.bronze, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Espaces de travail</span>
              </div>
              <Text variant="h2" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                Espaces de Réunion
              </Text>
              {chateau.meetingText.split('\n\n').map((paragraph, i) => (
                <ParaCard key={i} text={paragraph} sectionBg="gray" />
              ))}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                {["Lumière naturelle", "Équipement AV complet", "Salles modulables"].map((tag, i) => (
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

      {/* Section Restauration — Zigzag inversé : Cards GAUCHE, Slider DROITE */}
      <Section spacing="lg" background="white" style={{ padding: 'clamp(2.5rem, 5vw, 4rem) 0' }}>
        <Container size="xl">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.15fr]" style={{ gap: 'clamp(2rem, 4vw, 3rem)' }}>
            {/* Cards LEFT */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: `${theme.colors.primary.bronze}10`, borderRadius: theme.effects.borderRadius.full, border: `1px solid ${theme.colors.primary.bronze}30`, marginBottom: '1rem' }}>
                <UtensilsCrossed className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: theme.colors.primary.bronze, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Restauration</span>
              </div>
              <Text variant="h2" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                Expérience Culinaire
              </Text>
              {chateau.restaurationText.split('\n\n').map((paragraph, i) => (
                <ParaCard key={i} text={paragraph} sectionBg="white" />
              ))}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                {["Menus sur mesure", "Régimes spéciaux", "Cocktails & galas"].map((tag, i) => (
                  <Link key={i} href="/devis#formulaire" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 10px', background: `${theme.colors.primary.bronze}08`, border: `1px solid ${theme.colors.primary.bronze}20`, borderRadius: theme.effects.borderRadius.full, whiteSpace: 'nowrap', textDecoration: 'none', transition: 'all 0.2s ease' }}>
                    <Check className="w-3 h-3 flex-shrink-0" style={{ color: theme.colors.primary.bronze }} />
                    <span style={{ fontSize: '0.75rem', fontWeight: 500, color: theme.colors.neutral.gray700 }}>{tag}</span>
                  </Link>
                ))}
              </div>
            </div>
            {/* Slider RIGHT — sticky */}
            <StickySlider>
              <RestaurantSlider chateau={chateau} />
            </StickySlider>
          </div>
        </Container>
      </Section>

      {/* Points forts - Grid avec image de fond */}
      <section style={{ position: 'relative', padding: 'clamp(5rem, 10vw, 8rem) 0', overflow: 'hidden' }}>
        {/* Image de fond */}
        <div style={{ position: 'absolute', inset: 0 }}>
          {(() => {
            const pointsFortsImages: Record<string, { src: string; position: string }> = {
              "2": { src: "/images/evenement-entreprise-reine-margot-facade-jardin-terrasse.webp", position: "center 60%" },
            };
            const img = pointsFortsImages[chateau.id] || { src: chateau.images.hero[0], position: "center center" };
            return (
              <Image
                src={img.src}
                alt={`Vue du ${chateau.nom} — Points forts du domaine`}
                fill sizes="100vw" className="object-cover" style={{ objectPosition: img.position }} loading="lazy" quality={80}
              />
            );
          })()}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }} />
        </div>
        <Container size="xl" style={{ position: 'relative', zIndex: 2 }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: theme.spacing.xl }}>
            <div
              ref={pointsFortsView.ref}
              className={`animate-on-scroll ${pointsFortsView.isInView ? 'is-visible' : ''}`}
            >
              <Text variant="h2" style={{ marginBottom: theme.spacing.md, textAlign: 'center', color: 'white', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
                Points forts
              </Text>
              <Text variant="bodyLarge" style={{ textAlign: 'center', color: 'rgba(255,255,255,0.8)' }}>
                Ce qui rend ce lieu unique
              </Text>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 'clamp(1rem, 2vw, 1.5rem)', maxWidth: '1200px', margin: '0 auto', justifyContent: 'center', flexWrap: 'wrap', padding: '1.5rem 0' }}>
            {chateau.atouts.map((atout: string, index: number) => (
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


      {/* Section FAQ — 2 colonnes : FAQ + Image équipe */}
      <Section background="gray" style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem) 0', background: '#f6f9fc' }}>
        <Container size="xl">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem, 4vw, 3rem)', alignItems: 'start' }}>
            {/* Colonne gauche — FAQ */}
            <div>
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: `${theme.colors.primary.bronze}10`, borderRadius: theme.effects.borderRadius.full, border: `1px solid ${theme.colors.primary.bronze}30`, marginBottom: '1rem' }}>
                  <HelpCircle className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: theme.colors.primary.bronze, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Questions fréquentes</span>
                </div>
                <Text variant="h2" style={{ marginBottom: theme.spacing.sm, textAlign: 'left' }}>
                  Tout ce que vous devez savoir
                </Text>
                <Text variant="body" color="muted" style={{ textAlign: 'left' }}>
                  Des réponses claires sur ce lieu d&apos;exception
                </Text>
              </div>

              <div>
                {chateau.faq.map((item, index) => {
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

              {/* CTA sous la FAQ */}
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

            {/* Colonne droite — Images FAQ par château */}
            <div style={{ position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {(() => {
                const images = [
                  { src: "/images/equipe-select-chateaux-organisateur-seminaire-entreprise-chateau.webp", alt: "Équipe Select Châteaux — organisateurs de séminaires et événements d'entreprise en château", aspect: "2/3" },
                ];
                return images.map((img, i) => (
                  <div key={i} style={{ position: 'relative', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
                    <div style={{ position: 'relative', aspectRatio: img.aspect }}>
                      <Image src={img.src} alt={img.alt} fill className="object-cover" loading="lazy" quality={80} sizes="50vw" />
                      {i === images.length - 1 && (
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)', padding: '2rem 1.5rem 1.5rem' }}>
                          <p style={{ color: 'white', fontSize: '1.125rem', fontWeight: 600, fontFamily: theme.typography.fonts.heading, marginBottom: '0.25rem' }}>
                            L&apos;équipe Select Châteaux
                          </p>
                          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.8125rem', lineHeight: 1.5 }}>
                            Vos organisateurs dédiés pour un séminaire d&apos;entreprise clé en main en château d&apos;exception
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>
        </Container>
      </Section>

      {/* Mini formulaire devis inline */}
      <Section background="white" style={{ padding: '0' }}>
        <Container size="lg">
          <DevisFormMini chateauId={chateau.id} chateauNom={chateau.nom} />
        </Container>
      </Section>

      {/* CTA finale */}
      <Section background="gradient" style={{ padding: '30px 0' }}>
        <Container size="lg">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <div ref={ctaView.ref} className={`animate-on-scroll ${ctaView.isInView ? 'is-visible' : ''}`}>
              <Text variant="h2" style={{ marginBottom: theme.spacing.md, textAlign: 'center' }}>
                Prêt à organiser votre événement ?
              </Text>
            </div>
            <div ref={ctaButtonsView.ref} className={`animate-on-scroll ${ctaButtonsView.isInView ? 'is-visible' : ''}`} style={{ display: 'flex', gap: theme.spacing.md, justifyContent: 'center', flexWrap: 'wrap', transitionDelay: '200ms' }}>
              <Link href="/devis#formulaire"><Button variant="primary" size="lg">Demander un Devis</Button></Link>
              <Link href="/chateaux"><Button variant="outline" size="lg">Voir d'autres châteaux</Button></Link>
            </div>
            {/* Liens SEO vers pages géographiques */}
            {(() => {
              const geoLinks: Record<string, { label: string; href: string }[]> = {
                "1": [
                  { label: "Séminaire château Chantilly", href: "/seminaire-chateau-chantilly" },
                  { label: "Séminaire château Oise", href: "/seminaire-chateau-oise-60" },
                ],
                "2": [
                  { label: "Séminaire château Hauts-de-Seine", href: "/seminaire-chateau-hauts-de-seine-92" },
                  { label: "Séminaire château proche Paris", href: "/seminaire-chateau-proche-paris" },
                ],
                "3": [
                  { label: "Séminaire château Yvelines", href: "/seminaire-chateau-yvelines-78" },
                  { label: "Séminaire château Île-de-France", href: "/seminaire-chateau-ile-de-france" },
                ],
                "4": [
                  { label: "Séminaire château Chantilly", href: "/seminaire-chateau-chantilly" },
                  { label: "Séminaire château Oise", href: "/seminaire-chateau-oise-60" },
                ],
              };
              const links = geoLinks[chateau.id];
              if (!links) return null;
              return (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: theme.spacing.lg, marginTop: theme.spacing.xl, flexWrap: "wrap" }}>
                  <MapPin className="w-4 h-4" style={{ color: theme.colors.primary.bronze, opacity: 0.7 }} />
                  {links.map((link, i) => (
                    <Link key={i} href={link.href} style={{ color: theme.colors.neutral.gray600, fontSize: theme.typography.fontSize.sm, textDecoration: "underline", textUnderlineOffset: "3px" }}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              );
            })()}
          </div>
        </Container>
      </Section>

      {/* Sticky CTA Bar - Visible après scroll du hero */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9990,
          transform: showStickyBar ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
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
            {/* CTA buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
              <a
                href="tel:+33757991146"
                onClick={() => trackPhoneClick()}
                className="badge-lg border-2 border-white/40 bg-black/40 backdrop-blur-md text-white font-semibold text-sm hover:bg-black/50 transition-all"
                style={{ textDecoration: 'none', whiteSpace: 'nowrap', color: 'white' }}
              >
                <Phone className="w-4 h-4" style={{ color: 'white' }} />
                <span className="hidden sm:inline">07 57 99 11 46</span>
                <span className="sm:hidden">Appeler</span>
              </a>
              <a
                href="#devis-express"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 20px',
                  borderRadius: '9999px',
                  background: 'linear-gradient(135deg, #D4AF37 0%, #A37E2C 100%)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '13px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 12px rgba(163, 126, 44, 0.3)',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                <FileText style={{ width: '16px', height: '16px' }} />
                Devis Gratuit
              </a>
            </div>
          </div>
        </div>
      </div>

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
            {lightboxIndex + 1} / {allImages.length}
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
            <Image src={allImages[lightboxIndex]} alt={`${chateau.nom} - Photo ${lightboxIndex + 1}`} fill sizes="100vw" className="object-contain" quality={85} priority />
          </div>
        </div>
      )}
    </>
  );
}
