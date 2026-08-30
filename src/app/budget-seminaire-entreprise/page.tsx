/**
 * OBSERVATOIRE DES BUDGETS — page GEO.
 *
 * « Quel est le tarif d'un séminaire d'entreprise ? » est une question People
 * Also Ask à laquelle aucun acteur du marché ne répond avec des chiffres. Sur
 * « budget team building par personne », les six premiers résultats sont des
 * blogs d'activités sans donnée sourcée.
 *
 * C'est le seul contenu du site qu'aucun concurrent ne peut produire : il
 * repose sur 188 devis réellement traités.
 */

import type { Metadata } from "next";
import NextLink from "next/link";
import { OBSERVATOIRE as O } from "@/data/budget-observatoire";
import { venues } from "@/data/venues";
import { StructuredData } from "@/components/StructuredData";
import { Section, Container } from "@/components/layout-v2";
import {
  LandingHero, ReponseDirecte, FaqSection, DevisSection,
  BRONZE, BRONZE_DARK, HEADING, G, GOLD,
} from "@/components/lieux";

const URL_PAGE = "https://www.selectchateaux.com/budget-seminaire-entreprise";

const REPONSE =
  `Le budget d'un séminaire d'entreprise en château en Île-de-France se situe entre ${O.global.p10} et ${O.global.p90} € par personne et par jour, avec une médiane à ${O.global.mediane} €. Une journée d'étude sans nuitée revient à environ ${O.parDuree[0].mediane} € par personne, un résidentiel de deux jours à ${O.parDuree[1].mediane} €. Chiffres observés sur ${O.nbDevis} devis réels.`;

const FAQ = [
  {
    question: "Quel est le tarif d'un séminaire d'entreprise ?",
    reponse: `Sur ${O.nbDevis} devis que nous avons traités en Île-de-France, le budget se situe entre ${O.global.p10} et ${O.global.p90} € par personne et par jour, avec une médiane à ${O.global.mediane} €. L'écart s'explique d'abord par la durée : une journée sans nuitée revient à ${O.parDuree[0].mediane} € contre ${O.parDuree[1].mediane} € avec une nuit.`,
  },
  {
    question: "Combien coûte une journée d'étude par personne ?",
    reponse: `Environ ${O.parDuree[0].mediane} € par personne, sur ${O.parDuree[0].n} devis observés. Cela couvre la privatisation de la salle, l'accueil café, le déjeuner et les pauses. Une activité de cohésion l'après-midi ajoute généralement 45 à 90 €.`,
  },
  {
    question: "Combien coûte un séminaire résidentiel de deux jours ?",
    reponse: `Environ ${O.parDuree[1].mediane} € par personne et par jour, sur ${O.parDuree[1].n} devis observés — soit près de 3,5 fois le coût d'une journée d'étude. L'hébergement et le dîner représentent l'essentiel de l'écart.`,
  },
  {
    question: "Le prix baisse-t-il quand le groupe est plus grand ?",
    reponse: `Nettement. En dessous de 30 personnes, la médiane est de ${O.parTaille[0].mediane} € par personne ; au-delà de 100, elle tombe à ${O.parTaille[3].mediane} €. Les coûts fixes — privatisation, technique, animation — se répartissent sur plus de participants.`,
  },
  {
    question: "Quel département est le moins cher pour un séminaire ?",
    reponse: `Les Yvelines et le Val-d'Oise ressortent comme les plus abordables de notre périmètre. Les Hauts-de-Seine sont les plus chers : la proximité immédiate de Paris se paie. À prestation comparable, l'écart entre départements peut dépasser un facteur trois.`,
  },
  {
    question: "Ces chiffres incluent-ils tout ?",
    reponse:
      "Ils couvrent ce que facture le lieu : privatisation des espaces, restauration, hébergement le cas échéant, et les prestations techniques incluses. Le transport des participants et les animations spécifiques se chiffrent à part.",
  },
];

export const metadata: Metadata = {
  title: `Budget Séminaire d'Entreprise 2026 : ${O.global.mediane} € / pers. [${O.nbDevis} Devis Réels]`,
  description: `Combien coûte un séminaire d'entreprise en château ? Budgets observés sur ${O.nbDevis} devis réels : ${O.global.p10} à ${O.global.p90} € par personne et par jour, par durée, par taille de groupe et par département.`,
  metadataBase: new URL("https://www.selectchateaux.com"),
  alternates: { canonical: URL_PAGE },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    title: `Budget séminaire d'entreprise : ${O.global.mediane} € par personne`,
    description: REPONSE,
    url: URL_PAGE, siteName: "Select Châteaux", locale: "fr_FR",
  },
};

/** Tableau de données — la forme que les moteurs de réponse citent le plus. */
function TableBudget({ titre, note, lignes, colonne }: {
  titre: string; note: string; colonne: string;
  lignes: readonly { libelle: string; detail?: string; n: number; mediane: number }[];
}) {
  const max = Math.max(...lignes.map(l => l.mediane));
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <h3 style={{ fontFamily: HEADING, fontSize: "1.25rem", fontWeight: 600, color: G.gray900, marginBottom: "0.5rem" }}>
        {titre}
      </h3>
      <p style={{ color: G.gray600, fontSize: "0.9375rem", marginBottom: "1rem", maxWidth: "62ch" }}>{note}</p>
      <div style={{ overflowX: "auto", borderRadius: "16px", border: `1px solid ${G.gray200}`, background: "white" }}>
        <table style={{ width: "100%", minWidth: "460px", borderCollapse: "collapse", fontSize: "0.9375rem" }}>
          <thead>
            <tr style={{ background: G.gray50 }}>
              {[colonne, "Devis observés", "Budget médian", ""].map((h, i) => (
                <th key={i} style={{
                  padding: "12px 16px", textAlign: i === 0 || i === 3 ? "left" : "right",
                  fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase",
                  letterSpacing: "0.06em", color: BRONZE, borderBottom: `1px solid ${G.gray200}`,
                  width: i === 3 ? "34%" : undefined,
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lignes.map(l => (
              <tr key={l.libelle}>
                <td style={{ padding: "13px 16px", fontWeight: 600, color: G.gray900, borderTop: `1px solid ${G.gray100}` }}>
                  {l.libelle}
                  {l.detail && <span style={{ display: "block", fontWeight: 400, fontSize: "0.8125rem", color: G.gray500 }}>{l.detail}</span>}
                </td>
                <td style={{ padding: "13px 16px", textAlign: "right", color: G.gray500, fontVariantNumeric: "tabular-nums", borderTop: `1px solid ${G.gray100}` }}>{l.n}</td>
                <td style={{ padding: "13px 16px", textAlign: "right", fontWeight: 700, color: G.gray900, fontVariantNumeric: "tabular-nums", borderTop: `1px solid ${G.gray100}`, whiteSpace: "nowrap" }}>{l.mediane} €</td>
                <td style={{ padding: "13px 16px", borderTop: `1px solid ${G.gray100}` }}>
                  <div aria-hidden="true" style={{ height: "8px", borderRadius: "9999px", background: BRONZE, width: `${Math.max(6, (l.mediane / max) * 100)}%` }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Page() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${URL_PAGE}#article`,
        headline: "Budget d'un séminaire d'entreprise en château : observatoire 2026",
        description: REPONSE,
        url: URL_PAGE,
        author: { "@type": "Organization", name: "Select Châteaux" },
        publisher: { "@type": "Organization", name: "Select Châteaux" },
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map(f => ({
          "@type": "Question", name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.reponse },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.selectchateaux.com/" },
          { "@type": "ListItem", position: 2, name: "Budget séminaire d'entreprise", item: URL_PAGE },
        ],
      },
    ],
  };

  return (
    <>
      <StructuredData data={schema} />

      <LandingHero
        eyebrow={`Observatoire · ${O.nbDevis} devis réels`}
        titre="Combien coûte un séminaire d'entreprise ?"
        intro={
          <>
            Personne ne publie de prix dans ce métier. Nous le faisons, à partir des{" "}
            <strong>{O.nbDevis} devis</strong> que nous avons réellement traités en {O.periode}.
            Budgets par personne et par jour, ventilés par durée, taille de groupe et département.
          </>
        }
        ancres={[
          { label: "Par durée", href: "#duree" },
          { label: "Par taille", href: "#taille" },
          { label: "Par département", href: "#departement" },
          { label: "Questions", href: "#faq" },
        ]}
      />

      <ReponseDirecte>{REPONSE}</ReponseDirecte>

      <Section spacing="lg" background="white">
        <Container size="lg">
          <div className="card-grid-centered" style={{ gap: "12px", marginBottom: "3rem" }}>
            {[
              { v: `${O.global.p10} €`, l: "10 % les moins chers" },
              { v: `${O.global.mediane} €`, l: "médiane observée" },
              { v: `${O.global.p90} €`, l: "10 % les plus chers" },
            ].map(c => (
              <div key={c.l} style={{ background: "white", borderRadius: "16px", padding: "clamp(18px, 2.5vw, 26px)", border: `1px solid ${G.gray200}`, textAlign: "center" }}>
                <div style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)", fontWeight: 700, fontFamily: HEADING, color: G.gray900, lineHeight: 1.1 }}>{c.v}</div>
                <div style={{ fontSize: "0.8125rem", color: G.gray500, marginTop: "6px" }}>{c.l}</div>
              </div>
            ))}
          </div>

          <div id="duree">
            <TableBudget
              titre="Ce qui pèse le plus : la nuitée"
              note="C'est de loin le premier facteur. Passer d'une journée d'étude à un résidentiel d'une nuit multiplie le budget par près de 3,5 — l'hébergement et le dîner représentent l'essentiel de l'écart."
              colonne="Format"
              lignes={O.parDuree}
            />
          </div>

          <div id="taille">
            <TableBudget
              titre="Le prix par personne baisse avec la taille du groupe"
              note="Les coûts fixes — privatisation, technique, animation — se répartissent sur davantage de participants. Un groupe de plus de 100 personnes revient à moins de la moitié du prix unitaire d'un groupe de moins de 30."
              colonne="Taille du groupe"
              lignes={O.parTaille}
            />
          </div>

          <div id="departement">
            <TableBudget
              titre="Écarts entre départements"
              note="À prestation comparable, l'écart dépasse un facteur trois entre les Hauts-de-Seine et les Yvelines. La proximité immédiate de Paris se paie ; s'éloigner de trente minutes change l'enveloppe."
              colonne="Département"
              lignes={O.parDepartement.map(d => ({ libelle: `${d.nom} (${d.code})`, n: d.n, mediane: d.mediane }))}
            />
          </div>

          <div style={{ background: G.gray50, borderRadius: "16px", padding: "clamp(18px, 3vw, 26px)", borderLeft: `4px solid ${GOLD}`, color: G.gray700, lineHeight: 1.75, fontSize: "0.9375rem" }}>
            <strong style={{ display: "block", color: G.gray900, marginBottom: "8px" }}>Méthode</strong>
            Ces montants sont calculés sur {O.nbDevis} devis reçus de nos lieux partenaires entre
            2025 et 2026, rapportés au nombre de participants de chaque événement, et exprimés en
            budget client toutes charges comprises. Les médianes sont préférées aux moyennes, plus
            sensibles aux cas extrêmes. Les effectifs de chaque ligne sont affichés : en dessous
            d&apos;une quinzaine de devis, une médiane reste indicative. Aucun lieu ni aucun devis
            n&apos;est identifiable.
          </div>
        </Container>
      </Section>

      <div id="faq">
        <FaqSection items={FAQ} background="gray" />
      </div>

      <Section spacing="md" background="white">
        <Container size="lg">
          <p style={{ color: G.gray700, margin: 0, fontSize: "1rem", lineHeight: 1.8, background: G.gray50, borderRadius: "16px", padding: "clamp(18px, 3vw, 26px)", borderLeft: `4px solid ${GOLD}` }}>
            Un budget n&apos;a de sens que rapporté à un lieu.{" "}
            <NextLink href="/lieux" style={{ color: BRONZE_DARK, fontWeight: 600, textDecoration: "underline" }}>
              Voir nos {venues.length} lieux de séminaire
            </NextLink>{" "}
            avec leurs capacités réelles, ou comparer{" "}
            <NextLink href="/journee-etude-seminaire" style={{ color: BRONZE_DARK, fontWeight: 600, textDecoration: "underline" }}>
              journée d&apos;étude et résidentiel
            </NextLink>
            .
          </p>
        </Container>
      </Section>

      <DevisSection sourceLabel="Observatoire des budgets" titre="Un chiffrage sur votre projet ?" />
    </>
  );
}
