/**
 * Fiche château — rendue par le SERVEUR (16/11/2026 ; ex-ChateauPageClient,
 * entièrement côté navigateur). Seuls les îlots interactifs partent dans le
 * JavaScript du navigateur : grille photos + visionneuse, FAQ, diaporamas,
 * apparitions au défilement, suivi des appels (components/domaine).
 */

import Image from "next/image";
import Link from "next/link";
import { Users, Check, Bed, Building2, HelpCircle, MapPin, Clock, Lock, Package } from "lucide-react";
import { Section, Container } from '@/components/layout-v2';
import { Text, Button } from '@/components/ui-v2';
import { theme } from '@/design-system/tokens';
import type { Chateau } from "@/types";
import { Apparition, FaqAccordeon, GaleriePhotosFiche, SuiviVueChateau } from "@/components/domaine/fiche-interactions";
import DevisFormMini from "@/components/DevisFormMini";
import { StickyCtaBar } from "@/components/StickyCtaBar";
import { SectionFiche } from "@/components/domaine/SectionFiche";
import { sectionsFiche } from "@/lib/fiche-sections";
import { lienFinal } from "@/data/redirections";
import photosRenommees from "@/data/photos-renommees.json";
import { creerAltPhoto, type PhotosRenommees } from "@/lib/photo-alt";

const altPhoto = creerAltPhoto(photosRenommees as PhotosRenommees);



interface ChateauFicheProps {
  chateau: Chateau;
  /** Menu des rubriques du domaine (Server Component), sous la barre d'appel. */
  navRubriques?: React.ReactNode;
}

export default function ChateauFiche({ chateau, navRubriques }: ChateauFicheProps) {
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
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1rem, 4vw, 2rem) clamp(1rem, 2vw, 1.5rem)' }}>
        {/* Titre + infos au-dessus des photos — espacements élargis le 17/11/2026 (demande PO :
            le haut de page était tassé par rapport à la galerie et aux sections). */}
        <div style={{ marginBottom: 'clamp(1.25rem, 3vw, 2.5rem)' }}>
          <div className="flex flex-wrap items-center gap-2" style={{ marginBottom: 'clamp(0.75rem, 1.5vw, 1.25rem)' }}>
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
              marginBottom: 'clamp(0.75rem, 1.5vw, 1rem)',
            }}
          >
            {chateau.titreFiche?.motCle ?? chateau.seoH1}
            {chateau.titreFiche && (
              <span style={{ display: 'block', fontSize: '0.62em', fontStyle: 'italic', color: theme.colors.primary.bronze, marginTop: '0.3em' }}>
                {chateau.titreFiche.lieu}
              </span>
            )}
          </h1>

          <div className="flex flex-wrap items-center" style={{ columnGap: 'clamp(0.625rem, 1.6vw, 1.25rem)', rowGap: '0.5rem', color: theme.colors.neutral.gray600, fontSize: '0.9375rem' }}>
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

        {/* Le cadre « devis + téléphone » sous les photos a été retiré (décision PO du 17/11/2026) :
            le menu, la barre fixe et le formulaire portent ces deux actions. accrocheHero reste
            le texte de partage (layout.tsx). */}
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

      {/* Menu des thèmes : onglets collés sous les badges, ligne fine sur toute la
          largeur (modèle PO du 17/11/2026). */}
      {navRubriques && (
        <div style={{ background: '#FFFFFF', borderBottom: `1px solid ${theme.colors.neutral.gray200}` }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>{navRubriques}</div>
        </div>
      )}

      {/* 6 sections strictes (17/11/2026) : une section = un sujet, matière des rubriques
          du domaine (data/fiche-sections, lib/fiche-sections). */}
      {sections.map((section, rang) => (
        <SectionFiche
          key={section.id}
          section={section}
          rang={rang}
          photos={section.id === 'lieu'
            ? chateau.images.hero.map((img, n) => ({ src: img, alt: altPhoto(img, `${chateau.nom} - vue ${n + 1} du domaine`) }))
            : section.photos}
        />
      ))}

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
