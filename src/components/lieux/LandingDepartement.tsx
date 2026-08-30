/**
 * Gabarit des landings départementales — composé uniquement des briques de
 * `@/components/lieux`, donc rigoureusement identique au design de /lieux.
 */

import type { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { venues, getVenuesByDepartment } from "@/data/venues";
import { getLandingDepartement } from "@/data/landings-departements";
import { StructuredData } from "@/components/StructuredData";
import { Section, Container } from "@/components/layout-v2";
import {
  LandingHero, ReponseDirecte, ChiffresSection, VenueSection,
  ProseSection, FaqSection, DevisSection, BRONZE_DARK, HEADING, G, GOLD,
} from "@/components/lieux";

export function metadataFor(slug: string): Metadata {
  const l = getLandingDepartement(slug);
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

export function LandingDepartement({ slug }: { slug: string }) {
  const l = getLandingDepartement(slug);
  if (!l) notFound();

  const lieux = getVenuesByDepartment(l.code).sort((a, b) => b.capacite - a.capacite);
  const avecHebergement = lieux.filter(v => v.chambres);
  const capMin = Math.min(...lieux.map(v => v.capacite));
  const capMax = Math.max(...lieux.map(v => v.capacite));
  const chambresMax = avecHebergement.length ? Math.max(...avecHebergement.map(v => v.chambres ?? 0)) : 0;
  const url = `https://www.selectchateaux.com/${l.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        name: l.h1,
        description: l.reponseDirecte,
        url,
      },
      {
        "@type": "FAQPage",
        mainEntity: l.faq.map(f => ({
          "@type": "Question",
          name: f.question,
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
          { "@type": "ListItem", position: 2, name: "Lieux de séminaire", item: "https://www.selectchateaux.com/lieux" },
          { "@type": "ListItem", position: 3, name: l.h1, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <StructuredData data={schema} />

      <LandingHero
        eyebrow={l.eyebrow}
        titre={l.h1}
        intro={l.intro}
        ancres={[
          { label: "Les lieux", href: "#lieux", compteur: lieux.length },
          { label: "Budget", href: "#budget" },
          { label: "Questions", href: "#faq" },
        ]}
      />

      <ReponseDirecte>{l.reponseDirecte}</ReponseDirecte>

      <ChiffresSection
        background="white"
        chiffres={[
          { valeur: `${lieux.length}`, libelle: "lieux vérifiés" },
          { valeur: `${capMin}–${capMax}`, libelle: "personnes" },
          { valeur: `${avecHebergement.length}`, libelle: "avec hébergement" },
          { valeur: `${chambresMax}`, libelle: "chambres max." },
        ]}
      />

      <VenueSection
        id="lieux"
        background="gray"
        titre={`Nos ${lieux.length} lieux en ${l.departement}`}
        sousTitre={`De ${capMin} à ${capMax} personnes. Capacités, chambres et équipements réels — pas d'estimation.`}
        venues={lieux}
        lien={{ href: "/lieux", label: `Voir les ${venues.length} lieux de séminaire en Île-de-France et Oise` }}
      />

      {l.sections.map(s => (
        <ProseSection key={s.titre} titre={s.titre} paragraphes={s.paragraphes} background="white" />
      ))}

      {/* Budget — dérivé des devis réels du CRM, marge incluse, en fourchettes
          assez larges pour qu'aucun lieu ne soit identifiable. */}
      <Section spacing="lg" background="gray" id="budget">
        <Container size="lg">
          <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.125rem)", fontWeight: 600, fontFamily: HEADING, color: G.gray900, marginBottom: "1rem" }}>
            Budget observé en {l.departement}
          </h2>
          <p style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: G.gray600, maxWidth: "62ch", marginBottom: "1.75rem" }}>
            Fourchettes constatées sur <strong>{l.budget.nbDevis} devis réels</strong> que nous
            avons traités dans le département, par personne et par jour en séminaire résidentiel.
            Ce ne sont pas des estimations.
          </p>
          <div className="card-grid-centered" style={{ gap: "12px" }}>
            {[
              { valeur: `${l.budget.min} €`, libelle: "entrée de gamme" },
              { valeur: `${l.budget.median} €`, libelle: "médiane observée" },
              { valeur: `${l.budget.max} €`, libelle: "haut de gamme" },
            ].map(c => (
              <div key={c.libelle} style={{ background: "white", borderRadius: "16px", padding: "clamp(18px, 2.5vw, 26px)", border: `1px solid ${G.gray200}`, textAlign: "center" }}>
                <div style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)", fontWeight: 700, fontFamily: HEADING, color: G.gray900, lineHeight: 1.1 }}>
                  {c.valeur}
                </div>
                <div style={{ fontSize: "0.8125rem", color: G.gray500, marginTop: "6px" }}>{c.libelle}</div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: "1.5rem", fontSize: "0.875rem", color: G.gray500, maxWidth: "62ch" }}>
            Le nombre de nuits, la saison et le niveau de prestation font varier ces montants
            davantage que le choix du lieu lui-même.
          </p>
        </Container>
      </Section>

      <div id="faq">
        <FaqSection items={l.faq} background="white" />
      </div>

      <DevisSection
        sourceLabel={`Séminaire ${l.departement} (${l.code})`}
        titre={`Un séminaire en ${l.departement} ?`}
      />

      <Section spacing="md" background="white">
        <Container size="lg">
          <p style={{ color: G.gray700, margin: 0, fontSize: "1rem", lineHeight: 1.8, background: G.gray50, borderRadius: "16px", padding: "clamp(18px, 3vw, 26px)", borderLeft: `4px solid ${GOLD}` }}>
            Vous hésitez avec un autre département ?{" "}
            <NextLink href="/seminaire-chateau-ile-de-france" style={{ color: BRONZE_DARK, fontWeight: 600, textDecoration: "underline" }}>
              Voir tous nos châteaux de séminaire en Île-de-France
            </NextLink>
            , ou comparer avec les{" "}
            <NextLink href="/seminaire-chateau-yvelines-78" style={{ color: BRONZE_DARK, fontWeight: 600, textDecoration: "underline" }}>
              Yvelines
            </NextLink>{" "}
            et l&apos;
            <NextLink href="/seminaire-chateau-oise-60" style={{ color: BRONZE_DARK, fontWeight: 600, textDecoration: "underline" }}>
              Oise
            </NextLink>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
