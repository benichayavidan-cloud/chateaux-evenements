/**
 * ALTERNATIVE À CHÂTEAUFORM' — page de comparaison.
 *
 * Le site capte déjà 133 impressions sur des requêtes de marque Châteauform'
 * (chateauform chantilly, chateauform yvelines, chateauform 78…) en positions 18
 * à 28, sans un seul clic — et « concurrent chateauform » est en position 3,75.
 *
 * Une seule page, volontairement : le volume total est de 133 impressions sur
 * 16 mois. Décliner en neuf pages géographiques créerait neuf pages pauvres qui
 * se cannibaliseraient entre elles et avec l'article de blog existant, déjà en
 * position 6,5. Le maillage géographique se fait par sections ancrées.
 *
 * Ton : factuel. On compare des modèles économiques, on ne dénigre pas un
 * concurrent — les faits énoncés sont vérifiables publiquement.
 */

import type { Metadata } from "next";
import NextLink from "next/link";
import { venues } from "@/data/venues";
import { OBSERVATOIRE as O } from "@/data/budget-observatoire";
import { StructuredData } from "@/components/StructuredData";
import { Section, Container } from "@/components/layout-v2";
import {
  LandingHero, ReponseDirecte, ChiffresSection, VenueSection,
  ProseSection, FaqSection, DevisSection, BRONZE, BRONZE_DARK, HEADING, G, GOLD,
} from "@/components/lieux";

const URL_PAGE = "https://www.selectchateaux.com/alternative-chateauform";

const REPONSE =
  `Châteauform' exploite ses propres maisons : vous choisissez parmi son catalogue. Select Châteaux est une agence indépendante qui référence ${venues.length} lieux en Île-de-France et dans l'Oise, appartenant à des propriétaires différents — châteaux, domaines, abbayes et hôtels. Le choix est plus large, la mise en concurrence réelle, et le devis arrive sous 48 h.`;

const ZONES = [
  { code: "78", nom: "Yvelines", ancre: "yvelines" },
  { code: "60", nom: "Oise et Chantilly", ancre: "oise" },
  { code: "77", nom: "Seine-et-Marne", ancre: "seine-et-marne" },
];

const FAQ = [
  {
    question: "Quelle est la différence entre Châteauform' et Select Châteaux ?",
    reponse:
      `Châteauform' est propriétaire-exploitant : l'entreprise gère ses propres maisons et vous propose son catalogue. Select Châteaux est une agence indépendante : nous ne possédons aucun lieu, nous référençons ${venues.length} domaines appartenant à des propriétaires différents et nous les mettons en concurrence sur votre cahier des charges.`,
  },
  {
    question: "Existe-t-il des alternatives à Châteauform' en Île-de-France ?",
    reponse:
      `Oui. Nous référençons ${venues.length} lieux privatisables en Île-de-France et dans l'Oise, de ${Math.min(...venues.map(v => v.capacite))} à ${Math.max(...venues.map(v => v.capacite))} personnes : châteaux historiques, abbayes, domaines avec parc, hôtels de caractère et resorts. Chaque fiche affiche la capacité, le nombre de chambres et les équipements réels.`,
  },
  {
    question: "Le prix est-il différent ?",
    reponse:
      `Nous ne publions pas les tarifs d'un confrère. Ce que nous pouvons dire, c'est ce que nous constatons sur nos propres devis : le budget médian d'un séminaire résidentiel en château en Île-de-France est de ${O.parDuree[1].mediane} € par personne et par jour, sur ${O.nbDevis} devis réels. Nos chiffres sont publics, département par département.`,
  },
  {
    question: "Pourquoi passer par une agence plutôt qu'en direct ?",
    reponse:
      "Parce que la mise en concurrence prend du temps : identifier les lieux disponibles à vos dates, obtenir des devis comparables, arbitrer. Nous le faisons en 48 h, sans surcoût pour vous — nous sommes rémunérés par le lieu, pas par le client.",
  },
  {
    question: "Combien de temps pour obtenir une proposition ?",
    reponse:
      "48 heures. Nous interrogeons les lieux correspondant à votre cahier des charges et vous revenons avec les disponibilités réelles et les devis, pas avec une liste de suggestions à contacter vous-même.",
  },
];

export const metadata: Metadata = {
  title: `Alternative à Châteauform' : ${venues.length} Domaines Indépendants en Île-de-France`,
  description: `Vous cherchez une alternative à Châteauform' ? Select Châteaux référence ${venues.length} lieux de séminaire indépendants en Île-de-France et dans l'Oise — Yvelines, Chantilly, Seine-et-Marne. Devis comparés sous 48 h.`,
  metadataBase: new URL("https://www.selectchateaux.com"),
  alternates: { canonical: URL_PAGE },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    title: `Alternative à Châteauform' : ${venues.length} domaines indépendants`,
    description: REPONSE,
    url: URL_PAGE, siteName: "Select Châteaux", locale: "fr_FR",
  },
};

export default function Page() {
  const capMin = Math.min(...venues.map(v => v.capacite));
  const capMax = Math.max(...venues.map(v => v.capacite));
  const avecHebergement = venues.filter(v => v.chambres).length;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", "@id": `${URL_PAGE}#page`, name: "Alternative à Châteauform'", description: REPONSE, url: URL_PAGE },
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
          { "@type": "ListItem", position: 2, name: "Alternative à Châteauform'", item: URL_PAGE },
        ],
      },
    ],
  };

  return (
    <>
      <StructuredData data={schema} />

      <LandingHero
        eyebrow="Comparatif"
        titre="Une alternative à Châteauform'"
        intro={
          <>
            Deux modèles différents. L&apos;un exploite ses propres maisons, l&apos;autre met en
            concurrence {venues.length} domaines indépendants sur votre cahier des charges.
            Voici ce que ça change concrètement, et où sont les lieux.
          </>
        }
        ancres={[
          { label: "Ce qui change", href: "#comparatif" },
          ...ZONES.map(z => ({ label: z.nom, href: `#${z.ancre}` })),
          { label: "Questions", href: "#faq" },
        ]}
      />

      <ReponseDirecte>{REPONSE}</ReponseDirecte>

      <ChiffresSection
        background="white"
        chiffres={[
          { valeur: `${venues.length}`, libelle: "lieux indépendants" },
          { valeur: `${capMin}–${capMax}`, libelle: "personnes" },
          { valeur: `${avecHebergement}`, libelle: "avec hébergement" },
          { valeur: "48 h", libelle: "pour un devis" },
        ]}
      />

      <Section spacing="lg" background="gray" id="comparatif">
        <Container size="lg">
          <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.125rem)", fontWeight: 600, fontFamily: HEADING, color: G.gray900, marginBottom: "1rem" }}>
            Deux modèles, deux logiques
          </h2>
          <p style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: G.gray600, maxWidth: "62ch", marginBottom: "1.75rem" }}>
            Aucun des deux n&apos;est meilleur dans l&apos;absolu. Le bon choix dépend de ce que
            vous cherchez : la cohérence d&apos;un réseau homogène, ou l&apos;étendue du choix.
          </p>
          <div style={{ overflowX: "auto", borderRadius: "16px", border: `1px solid ${G.gray200}`, background: "white" }}>
            <table style={{ width: "100%", minWidth: "540px", borderCollapse: "collapse", fontSize: "0.9375rem" }}>
              <thead>
                <tr style={{ background: G.gray50 }}>
                  {["", "Propriétaire-exploitant", "Agence indépendante"].map((h, i) => (
                    <th key={i} style={{
                      padding: "14px 16px", textAlign: "left",
                      fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase",
                      letterSpacing: "0.06em", color: i === 2 ? BRONZE : G.gray500,
                      borderBottom: `1px solid ${G.gray200}`, width: i === 0 ? "26%" : "37%",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Les lieux", "Un catalogue de maisons exploitées en propre", `${venues.length} domaines appartenant à des propriétaires différents`],
                  ["Le choix", "Homogène, standardisé, prévisible", "Hétérogène — château historique, abbaye, resort, hôtel de caractère"],
                  ["La mise en concurrence", "Entre les maisons du réseau", "Entre des propriétaires indépendants, sur votre cahier des charges"],
                  ["Le coût de l'accompagnement", "Intégré à la prestation", "Aucun surcoût — nous sommes rémunérés par le lieu"],
                  ["Le délai", "Selon disponibilité du réseau", "Devis comparés sous 48 h"],
                ].map(([label, a, b]) => (
                  <tr key={label}>
                    <td style={{ padding: "14px 16px", fontWeight: 700, color: G.gray900, borderTop: `1px solid ${G.gray100}`, verticalAlign: "top" }}>{label}</td>
                    <td style={{ padding: "14px 16px", color: G.gray600, borderTop: `1px solid ${G.gray100}`, verticalAlign: "top", lineHeight: 1.6 }}>{a}</td>
                    <td style={{ padding: "14px 16px", color: G.gray800, borderTop: `1px solid ${G.gray100}`, verticalAlign: "top", lineHeight: 1.6, background: `${BRONZE}06`, fontWeight: 500 }}>{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      <ProseSection
        background="white"
        titre="Ce que l'indépendance change concrètement"
        paragraphes={[
          "Le choix du lieu n'est pas contraint par un catalogue. Si votre séminaire demande une abbaye de 600 personnes, un château intimiste de 13 couverts pour un comité de direction, ou un resort avec 396 chambres pour une convention, ce sont trois propriétaires différents — et nous les interrogeons tous les trois.",
          "La mise en concurrence est réelle. Nous envoyons votre cahier des charges aux lieux qui correspondent et nous vous revenons avec leurs disponibilités et leurs devis. Vous arbitrez sur des propositions comparables, pas sur une suggestion unique.",
          "La transparence sur les prix. Nous publions les budgets que nous constatons, département par département, sur nos devis réels — ce que personne ne fait dans ce métier. Vous savez à quoi vous attendre avant même de nous contacter.",
        ]}
      />

      {ZONES.map((z, i) => {
        const lieux = venues.filter(v => v.departementCode === z.code).sort((a, b) => b.capacite - a.capacite);
        if (!lieux.length) return null;
        return (
          <VenueSection
            key={z.code}
            id={z.ancre}
            background={i % 2 === 0 ? "gray" : "white"}
            titre={`${lieux.length} domaines indépendants en ${z.nom}`}
            sousTitre={`De ${Math.min(...lieux.map(v => v.capacite))} à ${Math.max(...lieux.map(v => v.capacite))} personnes, appartenant à des propriétaires différents.`}
            venues={lieux}
          />
        );
      })}

      <div id="faq">
        <FaqSection items={FAQ} background="gray" />
      </div>

      <Section spacing="md" background="white">
        <Container size="lg">
          <p style={{ color: G.gray700, margin: 0, fontSize: "1rem", lineHeight: 1.8, background: G.gray50, borderRadius: "16px", padding: "clamp(18px, 3vw, 26px)", borderLeft: `4px solid ${GOLD}` }}>
            Pour aller plus loin :{" "}
            <NextLink href="/budget-seminaire-entreprise" style={{ color: BRONZE_DARK, fontWeight: 600, textDecoration: "underline" }}>
              nos budgets observés sur {O.nbDevis} devis réels
            </NextLink>
            , ou{" "}
            <NextLink href="/lieux" style={{ color: BRONZE_DARK, fontWeight: 600, textDecoration: "underline" }}>
              la liste complète des {venues.length} lieux
            </NextLink>{" "}
            avec leurs capacités.
          </p>
        </Container>
      </Section>

      <DevisSection sourceLabel="Alternative Châteauform" titre="Comparons sur votre projet" />
    </>
  );
}
