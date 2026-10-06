/**
 * Bloc commercial d'un article devenu la page de référence de son département
 * (plan du 06/10/2026, data/redirections-commerciales.json).
 *
 * Mesuré en Search Console : sur « séminaire yvelines » et « séminaire oise »,
 * Google classe l'article devant la landing. On garde la page qui gagne, à son
 * adresse et avec son texte, et on lui ajoute ce que la landing apportait :
 * tous les lieux du département, le budget observé sur les devis du CRM, et le
 * balisage ItemList. Le formulaire de devis est déjà en bas de chaque article.
 *
 * Server Component, styles en ligne (brakt-blog.css remet à zéro les paddings).
 */

import Link from "next/link";
import { getVenuesByDepartment } from "@/data/venues";
import { landingsDepartements } from "@/data/landings-departements";
import { avecPreposition } from "@/components/lieux";
import { StructuredData } from "@/components/StructuredData";
import { LieuxSousArticle } from "@/components/blog/LieuxSousArticle";

const BRONZE = "#A37E2C";

interface BlocCommercialArticleProps {
  departementCode: string;
  urlArticle: string;
}

export function BlocCommercialArticle({ departementCode, urlArticle }: BlocCommercialArticleProps) {
  const landing = landingsDepartements.find((l) => l.code === departementCode);
  const lieux = getVenuesByDepartment(departementCode).sort((a, b) => b.capacite - a.capacite);
  if (!landing || !lieux.length) return null;

  const dans = avecPreposition(landing.departement);
  const capMin = Math.min(...lieux.map((v) => v.capacite));
  const capMax = Math.max(...lieux.map((v) => v.capacite));
  const avecChambres = lieux.filter((v) => v.chambres).length;

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Lieux de séminaire ${dans}`,
    url: `https://www.selectchateaux.com${urlArticle}#lieux`,
    numberOfItems: lieux.length,
    itemListElement: lieux.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://www.selectchateaux.com/lieux/${v.slug}`,
      name: v.nom,
    })),
  };

  return (
    <>
      <StructuredData data={itemList} />
      <div id="lieux">
        <LieuxSousArticle
          lieux={lieux}
          titre={`Nos ${lieux.length} lieux de séminaire ${dans}`}
          texte={`De ${capMin} à ${capMax} personnes, dont ${avecChambres} avec hébergement sur place. Chaque fiche montre les salles, les chambres et les photos réelles.`}
        />
      </div>

      <section id="budget" className="w-full flex justify-center" style={{ padding: "8px 20px 40px", background: "#FFFFFF" }}>
        <div className="w-full max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-light italic text-gray-900 text-center" style={{ margin: "0 0 10px" }}>
            Budget observé {dans}
          </h2>
          <p className="text-center text-gray-600" style={{ maxWidth: "640px", margin: "0 auto 24px", fontSize: "1rem", lineHeight: 1.6 }}>
            Fourchettes constatées sur <strong>{landing.budget.nbDevis} devis réels</strong> traités dans le département,{" "}
            {landing.budgetPortee ?? "par personne et par jour en séminaire résidentiel"}.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: "12px", maxWidth: "720px", margin: "0 auto" }}>
            {[
              { valeur: `${landing.budget.min} €`, libelle: "entrée de gamme" },
              { valeur: `${landing.budget.median} €`, libelle: "médiane observée" },
              { valeur: `${landing.budget.max} €`, libelle: "haut de gamme" },
            ].map((c) => (
              <div key={c.libelle} style={{ borderRadius: "16px", padding: "18px", border: "1px solid #E5E7EB", textAlign: "center" }}>
                <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "#111827", lineHeight: 1.1 }}>{c.valeur}</div>
                <div style={{ fontSize: "0.8125rem", color: "#6B7280", marginTop: "6px" }}>{c.libelle}</div>
              </div>
            ))}
          </div>
          <p className="text-center" style={{ margin: "24px 0 0" }} data-cta="article-commercial">
            <Link href="#devis-express" style={{ color: BRONZE, fontWeight: 600, textDecoration: "underline" }}>
              Recevoir une sélection de lieux {dans} sous 24 h
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
