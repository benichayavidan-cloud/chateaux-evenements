/**
 * Fiche château — rendue par le SERVEUR (16/11/2026 ; ex-ChateauPageClient,
 * entièrement côté navigateur). Seuls les îlots interactifs partent dans le
 * JavaScript du navigateur : grille photos + visionneuse, FAQ, diaporamas,
 * apparitions au défilement, suivi des appels (components/domaine).
 */

import Image from "next/image";
import Link from "next/link";
import { Users, Check, Sparkles, Bed, Building2, UtensilsCrossed, HelpCircle, MapPin, Phone, FileText, Clock, Lock, Package } from "lucide-react";
import { Section, Container } from '@/components/layout-v2';
import { Text, Button } from '@/components/ui-v2';
import { BOUTON_DEVIS, BOUTON_TELEPHONE } from "@/components/domaine/boutons-cta";
import { theme } from '@/design-system/tokens';
import type { Chateau } from "@/types";
import { Apparition, FaqAccordeon, GaleriePhotosFiche, LienTelephone, SuiviVueChateau } from "@/components/domaine/fiche-interactions";
import DevisFormMini from "@/components/DevisFormMini";
import { StickyCtaBar } from "@/components/StickyCtaBar";
import { Diaporama } from "@/components/domaine/Diaporama";
import { ParaCard, StickySlider } from "@/components/domaine/briques-fiche";
import { SectionFiche } from "@/components/domaine/SectionFiche";
import { sectionsFiche } from "@/lib/fiche-sections";
import { lienFinal } from "@/data/redirections";
import photosRenommees from "@/data/photos-renommees.json";
import { creerAltPhoto, type PhotosRenommees } from "@/lib/photo-alt";

const altPhoto = creerAltPhoto(photosRenommees as PhotosRenommees);
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_E164 } from "@/lib/contact";



interface ChateauFicheProps {
  chateau: Chateau;
  /** Menu des rubriques du domaine (Server Component), sous la barre d'appel. */
  navRubriques?: React.ReactNode;
  /** Section « Découvrir le domaine » (Server Component), après la vue d'ensemble. */
  sectionRubriques?: React.ReactNode;
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


// Section Hébergement — Variant Overlay avec slider
function HebergementOverlay({ chateau }: { chateau: Chateau }) {
  // Images de chambre : filtre auto + images forcées par château
  const extraBedroomImages: Record<string, string[]> = {
    "1": [
      "/images/seminaire-chateau-chantilly-chambre-design-contemporaine.webp",
      "/images/seminaire-chateau-chantilly-chambre-double-cosy.webp",
      "/images/seminaire-chateau-chantilly-chambre-elegante-moderne.webp",
      "/images/seminaire-chateau-chantilly-chambre-prestige-rouge.webp",
      "/images/seminaire-chateau-chantilly-chambre-loft-industriel.webp",
    ],
    "2": [
      "/images/seminaire-hotel-historique-paris-92-chambre-doree.webp",
      "/images/seminaire-hotel-historique-paris-92-chambre-prestige-bleue.webp",
      "/images/seminaire-hotel-historique-paris-92-chambre-vue-panoramique.webp",
      "/images/seminaire-hotel-historique-paris-92-salle-de-bain-design.webp",
      "/images/seminaire-hotel-historique-paris-92-suite-salon-vue-jardin.webp",
    ],
    "3": [
      "/images/seminaire-abbaye-vallee-de-chevreuse-chambre-cosy-ferme.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-chambre-cosy-haras.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-chambre-cottage-ferme.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-chambre-deluxe-abbaye.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-chambre-deluxe-ferme.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-chambre-particuliere-abbaye.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-chambre-singuliere-abbaye.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-chambre-superieure-abbaye-1.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-chambre-superieure-abbaye-2.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-chambre-superieure-ferme.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-chambre-petite-haras.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-chambre-deux-pieces-abbaye.webp",
    ],
    "4": [
      "/images/seminaire-chateau-foret-chantilly-chambre-premium-balcon.webp",
      "/images/seminaire-chateau-foret-chantilly-chambre-premium-terrasse.webp",
      "/images/seminaire-chateau-foret-chantilly-chambre-twin.webp",
      "/images/seminaire-chateau-foret-chantilly-junior-suite.webp",
      "/images/seminaire-chateau-foret-chantilly-suite-prestige-2.webp",
      "/images/seminaire-chateau-foret-chantilly-suite-prestige-1.webp",
      "/images/seminaire-chateau-foret-chantilly-suite-royale-2.webp",
      "/images/seminaire-chateau-foret-chantilly-suite-royale-1.webp",
      "/images/seminaire-chateau-foret-chantilly-salle-de-bain.webp",
    ],
  };
  const autoBedroomImages = chateau.images.galerie.filter(img => /chambre|suite|bedroom|room|lit/i.test(img));
  const forcedImages = extraBedroomImages[chateau.id] || [];
  const allBedroomImages = [...forcedImages, ...autoBedroomImages.filter(img => !forcedImages.includes(img))];
  const fallbackImg = chateau.images.galerie[getBedroomImageIndex(chateau.id)] || chateau.images.hero[2];
  const images = allBedroomImages.length > 0 ? allBedroomImages : [fallbackImg];

  return (
    <Section spacing="lg" background="white" style={{ padding: 'clamp(2.5rem, 5vw, 4rem) 0' }}>
      <Container size="xl">
        <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 'clamp(2rem, 4vw, 3rem)' }}>
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
            <Diaporama photos={images.map((img, i) => ({ src: img, alt: altPhoto(img, `${chateau.seoH1} - chambre ${i + 1}`) }))} fonduMs={800} />
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
      "/images/seminaire-chateau-chantilly-restaurant-bar-lounge.webp",
      "/images/seminaire-chateau-chantilly-salon-lounge-bar.webp",
      "/images/seminaire-chateau-chantilly-terrasse-restaurant-exterieur.webp",
      "/images/seminaire-chateau-chantilly-bar-lounge-chic.webp",
      "/images/seminaire-chateau-chantilly-patisseries-pause-gourmande.webp",
      "/images/seminaire-chateau-chantilly-dejeuner-libre-service-raffine.webp",
      "/images/seminaire-chateau-chantilly-salon-cheminee-cosy.webp",
    ],
    "2": [
      "/images/seminaire-hotel-historique-paris-92-restaurant-verriere.webp",
      "/images/seminaire-hotel-historique-paris-92-serre-verriere-diner.webp",
      "/images/seminaire-hotel-historique-paris-92-cuisine-gastronomique-dressage.webp",
      "/images/seminaire-hotel-historique-paris-92-terrasse-jardin-potager.webp",
      "/images/seminaire-hotel-historique-paris-92-facade-jardin-terrasse.webp",
      "/images/seminaire-hotel-historique-paris-92-facade-illuminee-soiree.webp",
      "/images/seminaire-hotel-historique-paris-92-cour-interieure-passerelle.webp",
      "/images/seminaire-hotel-historique-paris-92-espace-pause-cafe-accueil.webp",
      "/images/seminaire-hotel-historique-paris-92-chapelle-lounge-interieur.webp",
    ],
    "3": [
      "/images/seminaire-abbaye-vallee-de-chevreuse-grande-salle-voutes.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-diner-gala-grande-salle-voutes.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-restaurant-gastronomique.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-terrasse-restaurant-gastronomique.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-restaurant-italien-ferme.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-table-champetre-domaine.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-terrasse-table-champetre.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-bar-salon-anglais.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-bar-salon-de-musique.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-bar-salon-ete.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-bar-ferme.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-salon-soiree-animee.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-espace-pause-sellerie-1.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-espace-pause-sellerie-2.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-pause-apres-midi.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-activite-camion-maraicher.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-grand-salon-haras-3.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-grand-salon-haras-5.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-pavillon-bien-etre.webp",
    ],
    "4": [
      "/images/seminaire-chateau-foret-chantilly-restaurant-gastronomique.webp",
      "/images/seminaire-chateau-foret-chantilly-bar-bibliotheque.webp",
      "/images/seminaire-chateau-foret-chantilly-terrasse-exterieure.webp",
      "/images/seminaire-chateau-foret-chantilly-patio.webp",
      "/images/seminaire-chateau-foret-chantilly-patio-2.webp",
      "/images/seminaire-chateau-foret-chantilly-pause-gourmande-patisseries.webp",
      "/images/seminaire-chateau-foret-chantilly-activites-team-building.webp",
      "/images/seminaire-chateau-foret-chantilly-salle-pleniere.webp",
    ],
  };
  const forced = extraRestaurantImages[chateau.id];
  const restImages = forced || chateau.images.galerie.filter(img => /restaurant|terrasse|bar|buffet|brunch|cuisine|traiteur/i.test(img));
  const fallbackImg = chateau.images.hero[0];
  const images = restImages.length > 0 ? restImages : [fallbackImg];
  return <Diaporama photos={images.map((img, i) => ({ src: img, alt: altPhoto(img, `${chateau.seoH1} - restaurant ${i + 1}`) }))} libellePoint="Photo restauration" />;
}

// Slider pour la section Espaces de Réunion
function MeetingRoomSlider({ chateau }: { chateau: Chateau }) {
  // Images forcées par château (prioritaires sur le filtre auto)
  const extraMeetingImages: Record<string, string[]> = {
    "1": [
      "/images/seminaire-chateau-chantilly-lobby-salon-accueil.webp",
      "/images/seminaire-chateau-chantilly-salle-atelier-creatif.webp",
      "/images/seminaire-chateau-chantilly-salle-pleniere-brique.webp",
      "/images/seminaire-chateau-chantilly-salle-pleniere-theatre.webp",
      "/images/seminaire-chateau-chantilly-salle-reunion-board-room.webp",
      "/images/seminaire-chateau-chantilly-salle-reunion-carte-murale.webp",
      "/images/seminaire-chateau-chantilly-salle-reunion-prestige.webp",
      "/images/seminaire-chateau-chantilly-salle-seminaire-verte.webp",
    ],
    "3": [
      "/images/seminaire-abbaye-vallee-de-chevreuse-salon-reunion-abbaye.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-salon-reunion-ferme-1.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-salon-reunion-ferme-2.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-salon-orangerie-haras.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-salon-ecuries-haras-1.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-salon-ecuries-haras-2.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-salon-reunion-haras.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-grand-salon-haras-4.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-grand-salon-haras-5.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-grand-salon-haras-6.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-grand-salon-haras-2.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-espace-pause-sellerie-1.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-espace-pause-sellerie-2.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-pause-apres-midi.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-bar-salon-ete.webp",
      "/images/seminaire-abbaye-vallee-de-chevreuse-salon-soiree-animee.webp",
    ],
    "4": [
      "/images/seminaire-chateau-foret-chantilly-salon-reunion-4.webp",
      "/images/seminaire-chateau-foret-chantilly-salle-pleniere.webp",
      "/images/seminaire-chateau-foret-chantilly-salon-reunion-3.webp",
      "/images/seminaire-chateau-foret-chantilly-salon-reunion-2.webp",
      "/images/seminaire-chateau-foret-chantilly-salon-reunion-1.webp",
      "/images/seminaire-chateau-foret-chantilly-salon-reunion-1-bis.webp",
      "/images/seminaire-chateau-foret-chantilly-patio-2.webp",
      "/images/seminaire-chateau-foret-chantilly-salle-creative.webp",
      "/images/seminaire-chateau-foret-chantilly-bar-bibliotheque.webp",
    ],
  };
  const forcedMeeting = extraMeetingImages[chateau.id];
  // Filtrer les images de salles de réunion
  const meetingImages = forcedMeeting || chateau.images.galerie.filter(img => /salle|reunion|seminaire|auditorium|conference|theatre|board/i.test(img));
  const fallbackImg = chateau.images.galerie[getMeetingRoomImageIndex(chateau.id)] || chateau.images.hero[1];
  const images = meetingImages.length > 0 ? meetingImages : [fallbackImg];
  return <Diaporama photos={images.map((img, i) => ({ src: img, alt: altPhoto(img, `${chateau.seoH1} - salle de réunion ${i + 1}`) }))} />;
}


export default function ChateauFiche({ chateau, navRubriques, sectionRubriques }: ChateauFicheProps) {
  const sections = sectionsFiche(chateau.slug, chateau);
  // Toutes les photos, dans l'ordre de la visionneuse ; textes alternatifs calculés ici, côté serveur.
  const toutes = [...chateau.images.hero, ...chateau.images.galerie.filter(img => !chateau.images.hero.includes(img))]
    .map((img, i) => ({ src: img, alt: altPhoto(img, `${chateau.nom} - Photo ${i + 1}`) }));
  const { hero, galerie } = chateau.images;
  const grille = [
    { src: hero[0], alt: altPhoto(hero[0], `${chateau.seoH1} - Vue principale`) },
    { src: hero[1] || galerie[0], alt: altPhoto(hero[1] || galerie[0], `${chateau.nom} - Intérieur`) },
    { src: hero[2] || galerie[1], alt: altPhoto(hero[2] || galerie[1], `${chateau.nom} - Espaces`) },
    { src: hero[3] || galerie[2], alt: altPhoto(hero[3] || galerie[2], `${chateau.nom} - Chambres`) },
    { src: galerie[3] || hero[0], alt: altPhoto(galerie[3] || hero[0], `${chateau.nom} - Vue complémentaire`) },
  ];

  return (
    <>
      <SuiviVueChateau nom={chateau.nom} />
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
            {chateau.titreFiche?.motCle ?? chateau.seoH1}
            {chateau.titreFiche && (
              <span style={{ display: 'block', fontSize: '0.72em', fontStyle: 'italic', color: theme.colors.primary.bronze, marginTop: '0.15em' }}>
                {chateau.titreFiche.lieu}
              </span>
            )}
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
            {chateau.trajet && (
              <>
                <span style={{ color: theme.colors.neutral.gray300 }}>·</span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" style={{ color: theme.colors.primary.bronze }} />
                  {chateau.trajet}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Grille photos style Airbnb + visionneuse (îlot client) */}
        <GaleriePhotosFiche grille={grille} toutes={toutes} />

        {/* Boutons devis et téléphone sous les photos. L'accroche n'y est plus affichée
            (décision PO du 17/11/2026) ; accrocheHero reste le texte de partage (layout.tsx). */}
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
          <div className="flex gap-2.5 flex-shrink-0 items-center">
            <a
              href="#devis-express"
              style={BOUTON_DEVIS}
            >
              <FileText className="w-4 h-4" />
              Devis Gratuit en 24h
            </a>
            <LienTelephone href={`tel:${CONTACT_PHONE_E164}`} className="hover:opacity-90" style={BOUTON_TELEPHONE}>
              <Phone className="w-4 h-4" style={{ color: 'white' }} />
              {CONTACT_PHONE_DISPLAY}
            </LienTelephone>
          </div>
        </div>

        {navRubriques && <div style={{ marginTop: 'clamp(0.75rem, 2vw, 1rem)' }}>{navRubriques}</div>}
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

      {/* 7 sections strictes (17/11/2026) : une section = un sujet, matière des rubriques.
          Un château sans configuration (data/fiche-sections) garde l'ancien gabarit. */}
      {sections.length > 0 ? (
        sections.map((section, rang) => (
          <SectionFiche
            key={section.id}
            section={section}
            rang={rang}
            photos={section.id === 'lieu'
              ? chateau.images.hero.map((img, n) => ({ src: img, alt: altPhoto(img, `${chateau.nom} - vue ${n + 1} du domaine`) }))
              : section.photos}
          />
        ))
      ) : (
        <>
      {/* Section Vue d'ensemble — Slider gauche (sticky) + Cards droite */}
      <Section spacing="lg" background="gray" style={{ padding: 'clamp(2.5rem, 5vw, 4rem) 0' }}>
        <Container size="xl">
          <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 'clamp(2rem, 4vw, 3rem)' }}>
            {/* Slider LEFT — sticky */}
            <StickySlider>
              <Diaporama photos={chateau.images.hero.map((img, i) => ({ src: img, alt: altPhoto(img, `${chateau.nom} - vue ${i + 1} du domaine`) }))} />
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

      {sectionRubriques}

      {/* Section Hébergement — Overlay slider pleine largeur */}
      <HebergementOverlay chateau={chateau} />

      {/* Section Espaces de Réunion — Slider gauche (sticky) + Cards droite */}
      <Section spacing="lg" background="gray" style={{ padding: 'clamp(2.5rem, 5vw, 4rem) 0' }}>
        <Container size="xl">
          <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 'clamp(2rem, 4vw, 3rem)' }}>
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
          <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 'clamp(2rem, 4vw, 3rem)' }}>
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
        </>
      )}

      {/* Mini formulaire devis inline */}
      <Section background="white" style={{ padding: '0' }}>
        <Container size="lg">
          <DevisFormMini chateauId={chateau.id} chateauNom={chateau.nom} />
        </Container>
      </Section>

      {/* Points forts - Grid avec image de fond */}
      <section style={{ position: 'relative', padding: 'clamp(5rem, 10vw, 8rem) 0', overflow: 'hidden' }}>
        {/* Image de fond */}
        <div style={{ position: 'absolute', inset: 0 }}>
          {(() => {
            const pointsFortsImages: Record<string, { src: string; position: string }> = {
              "2": { src: "/images/seminaire-hotel-historique-paris-92-facade-jardin-terrasse.webp", position: "center 60%" },
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
            <Apparition>
              <Text variant="h2" style={{ marginBottom: theme.spacing.md, textAlign: 'center', color: 'white', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
                Points forts
              </Text>
              <Text variant="bodyLarge" style={{ textAlign: 'center', color: 'rgba(255,255,255,0.8)' }}>
                Ce qui rend ce lieu unique
              </Text>
            </Apparition>
          </div>

          <div style={{ display: 'flex', gap: 'clamp(1rem, 2vw, 1.5rem)', maxWidth: '1200px', margin: '0 auto', justifyContent: 'center', flexWrap: 'wrap', padding: '1.5rem 0' }}>
            {chateau.atouts.map((atout: string, index: number) => (
              <Apparition key={index} style={{ transitionDelay: `${index * 150}ms` }}>
                <div style={{
                  padding: '1.25rem 2rem',
                  background: 'rgba(255,255,255,0.16)',
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
              </Apparition>
            ))}
          </div>
        </Container>
      </section>


      {/* Section FAQ — 2 colonnes : FAQ + Image équipe */}
      <Section background="gray" style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem) 0', background: '#f6f9fc' }}>
        <Container size="xl">
          <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem, 4vw, 3rem)', alignItems: 'start' }}>
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

              <FaqAccordeon faq={chateau.faq} />

              {/* CTA sous la FAQ */}
              <Apparition style={{ marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', background: `${theme.colors.primary.bronze}08`, border: `1px solid ${theme.colors.primary.bronze}20`, borderRadius: '0.75rem' }}>
                  <Text variant="body" color="muted" style={{ flex: 1, fontSize: '0.875rem' }}>
                    Une autre question ?
                  </Text>
                  <Link href="/devis#formulaire">
                    <Button variant="primary" size="sm">Nous contacter</Button>
                  </Link>
                </div>
              </Apparition>
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

      {/* CTA finale */}
      <Section background="gradient" style={{ padding: '30px 0' }}>
        <Container size="lg">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <Apparition>
              <Text variant="h2" style={{ marginBottom: theme.spacing.md, textAlign: 'center' }}>
                Prêt à organiser votre événement ?
              </Text>
            </Apparition>
            <Apparition style={{ display: 'flex', gap: theme.spacing.md, justifyContent: 'center', flexWrap: 'wrap', transitionDelay: '200ms' }}>
              <Link href="/devis#formulaire"><Button variant="primary" size="lg">Demander un Devis</Button></Link>
              <Link href="/chateaux"><Button variant="outline" size="lg">Voir d'autres châteaux</Button></Link>
            </Apparition>
            {/* Liens SEO vers pages géographiques */}
            {(() => {
              const geoLinks: Record<string, { label: string; href: string }[]> = {
                "1": [
                  { label: "Séminaire château Chantilly", href: "/seminaire-chateau-chantilly" },
                  { label: "Séminaire château Oise", href: lienFinal("/seminaire-chateau-oise-60") },
                ],
                "2": [
                  { label: "Séminaire château Hauts-de-Seine", href: "/seminaire-chateau-hauts-de-seine-92" },
                  { label: "Séminaire château proche Paris", href: "/seminaire-chateau-proche-paris" },
                ],
                "3": [
                  { label: "Séminaire château Yvelines", href: lienFinal("/seminaire-chateau-yvelines-78") },
                  { label: "Séminaire château Île-de-France", href: "/seminaire-chateau-ile-de-france" },
                ],
                "4": [
                  { label: "Séminaire château Chantilly", href: "/seminaire-chateau-chantilly" },
                  { label: "Séminaire château Oise", href: lienFinal("/seminaire-chateau-oise-60") },
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

      {/* Barre fixe commune : descend au formulaire de la fiche, s'efface quand il est à l'écran */}
      <StickyCtaBar cible="#devis-express" />

    </>
  );
}
