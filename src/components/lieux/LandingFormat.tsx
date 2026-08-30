/**
 * Gabarit des landings par format — mêmes briques que /lieux, donc même design.
 */

import type { Metadata } from "next";
import Image from "next/image";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { Clock, MapPin } from "lucide-react";
import { venues } from "@/data/venues";
import { getLandingFormat } from "@/data/landings-formats";
import { teamBuildingActivities } from "@/data/team-building-activities";
import { StructuredData } from "@/components/StructuredData";
import { Section, Container } from "@/components/layout-v2";
import {
  LandingHero, ReponseDirecte, ChiffresSection, VenueSection,
  ProseSection, FaqSection, DevisSection, BRONZE, BRONZE_DARK, HEADING, G, GOLD,
} from "@/components/lieux";

export function metadataFor(slug: string): Metadata {
  const l = getLandingFormat(slug);
  if (!l) return { title: "Page introuvable" };
  const url = `https://www.selectchateaux.com/${l.slug}`;
  return {
    title: l.title,
    description: l.description,
    metadataBase: new URL("https://www.selectchateaux.com"),
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website", title: l.title, description: l.description,
      url, siteName: "Select Châteaux", locale: "fr_FR",
    },
  };
}

export function LandingFormat({ slug }: { slug: string }) {
  const l = getLandingFormat(slug);
  if (!l) notFound();

  const lieux = venues
    .filter(v => l.departements.includes(v.departementCode))
    .sort((a, b) => l.tri === "salles"
      ? (b.sallesReunion ?? 0) - (a.sallesReunion ?? 0) || b.capacite - a.capacite
      : b.capacite - a.capacite)
    .slice(0, l.limite ?? 100);

  const activites = l.activites
    ? teamBuildingActivities.filter(a => a.category === l.activites).slice(0, l.nbActivites ?? 6)
    : [];

  const capMin = lieux.length ? Math.min(...lieux.map(v => v.capacite)) : 0;
  const capMax = lieux.length ? Math.max(...lieux.map(v => v.capacite)) : 0;
  const avecHebergement = lieux.filter(v => v.chambres).length;
  const url = `https://www.selectchateaux.com/${l.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", "@id": `${url}#page`, name: l.h1, description: l.reponseDirecte, url },
      {
        "@type": "FAQPage",
        mainEntity: l.faq.map(f => ({
          "@type": "Question", name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.reponse },
        })),
      },
      {
        "@type": "ItemList",
        numberOfItems: lieux.length,
        itemListElement: lieux.map((v, i) => ({
          "@type": "ListItem", position: i + 1,
          url: `https://www.selectchateaux.com/lieux/${v.slug}`, name: v.nom,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.selectchateaux.com/" },
          { "@type": "ListItem", position: 2, name: l.h1, item: url },
        ],
      },
    ],
  };

  const ancres = [
    { label: "Les lieux", href: "#lieux", compteur: lieux.length },
    ...(activites.length ? [{ label: "Activités", href: "#activites", compteur: activites.length }] : []),
    { label: "Questions", href: "#faq" },
  ];

  return (
    <>
      <StructuredData data={schema} />

      <LandingHero eyebrow={l.eyebrow} titre={l.h1} intro={l.intro} ancres={ancres} />

      <ReponseDirecte>{l.reponseDirecte}</ReponseDirecte>

      {lieux.length > 0 && (
        <ChiffresSection
          background="white"
          chiffres={[
            { valeur: `${lieux.length}`, libelle: "lieux vérifiés" },
            { valeur: `${capMin}–${capMax}`, libelle: "personnes" },
            { valeur: `${avecHebergement}`, libelle: "avec hébergement" },
            ...(activites.length ? [{ valeur: `${teamBuildingActivities.filter(a => a.category === l.activites).length}`, libelle: "activités au catalogue" }] : []),
          ]}
        />
      )}

      <VenueSection
        id="lieux"
        background="gray"
        titre={l.titreLieux}
        sousTitre={l.sousTitreLieux}
        venues={lieux}
        lien={{ href: "/lieux", label: `Voir les ${venues.length} lieux de séminaire en Île-de-France et Oise` }}
      />

      {l.sections.map((s, i) => (
        <ProseSection
          key={s.titre}
          titre={s.titre}
          paragraphes={s.paragraphes}
          background={i % 2 === 0 ? "white" : "gray"}
        />
      ))}

      {activites.length > 0 && (
        <Section spacing="lg" background="white" id="activites">
          <Container size="xl">
            <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.125rem)", fontWeight: 600, fontFamily: HEADING, color: G.gray900, marginBottom: "0.75rem" }}>
              Activités de cohésion
            </h2>
            <p style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: G.gray600, maxWidth: "62ch", marginBottom: "2rem" }}>
              Un extrait de notre catalogue. Chaque activité s&apos;adapte au nombre de
              participants et se combine avec le lieu de votre choix.
            </p>
            <div className="card-grid-centered" style={{ gap: "20px" }}>
              {activites.map(a => (
                <div key={a.name} style={{ background: "white", borderRadius: "16px", border: `1px solid ${G.gray200}`, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                  <div className="relative" style={{ aspectRatio: "4 / 3", background: G.gray100 }}>
                    <Image src={a.image} alt={a.name} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
                  </div>
                  <div style={{ padding: "18px 20px 20px" }}>
                    <h3 style={{ fontFamily: HEADING, fontSize: "1.0625rem", fontWeight: 600, color: G.gray900, marginBottom: "10px", lineHeight: 1.3 }}>
                      {a.name}
                    </h3>
                    <p style={{ margin: "0 0 14px", color: G.gray600, fontSize: "0.875rem", lineHeight: 1.65 }}>
                      {a.description.length > 150 ? a.description.slice(0, 150).trimEnd() + "…" : a.description}
                    </p>
                    <div className="flex flex-wrap items-center" style={{ gap: "14px", fontSize: "0.8125rem", color: G.gray600, paddingTop: "12px", borderTop: `1px solid ${G.gray100}` }}>
                      <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" style={{ color: BRONZE }} />{a.duration}</span>
                      <span className="inline-flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" style={{ color: BRONZE }} />{a.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ marginTop: "2rem" }}>
              <NextLink href="/team-building-chateau" style={{ color: BRONZE_DARK, fontWeight: 600, textDecoration: "underline" }}>
                Voir le catalogue complet des activités de team building
              </NextLink>
            </p>
          </Container>
        </Section>
      )}

      <div id="faq">
        <FaqSection items={l.faq} background="gray" />
      </div>

      <DevisSection sourceLabel={l.h1} titre="Un projet en tête ?" background="white" />
    </>
  );
}
