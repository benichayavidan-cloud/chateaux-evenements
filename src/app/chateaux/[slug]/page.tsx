/**
 * PAGE CHÂTEAU - Server Component
 * Charge les données et StructuredData côté serveur,
 * délègue l'UI interactive au Client Component.
 */

import { notFound } from "next/navigation";
import { chateaux as chateauxData } from "@/data/chateaux";
import { StructuredData } from "@/components/StructuredData";
import { generatePlaceSchema, generateFAQSchema, generateBreadcrumbSchema } from "@/utils/seo/structured-data";
import ChateauFiche from "./ChateauFiche";
import { LogoCarousel } from "@/components/LogoCarousel";
import { ReviewsSection } from "@/components/ReviewsSection";
import { RubriquesNav } from "@/components/domaine/RubriquesNav";
import { rubriquesPubliees } from "@/lib/rubriques";

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Même correctif que /blog/[slug] : sans generateStaticParams, un slug
 * inconnu répondait HTTP 200 (shell flushé avant notFound) au lieu de 404.
 */
export function generateStaticParams() {
  return chateauxData.map((chateau) => ({ slug: chateau.slug }));
}

export const dynamicParams = false;

export default async function ChateauPage({ params }: Props) {
  const { slug } = await params;
  const chateau = chateauxData.find(c => c.slug === slug);

  if (!chateau) {
    notFound();
  }

  const rubriques = rubriquesPubliees(chateau.slug);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      generatePlaceSchema(chateau),
      generateFAQSchema(chateau.faq),
      generateBreadcrumbSchema([
        { name: "Accueil", url: "/" },
        { name: "Les Châteaux", url: "/chateaux" },
        { name: chateau.nom, url: `/chateaux/${chateau.slug}` },
      ]),
    ],
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <ChateauFiche
        chateau={chateau}
        navRubriques={<RubriquesNav slug={chateau.slug} rubriques={rubriques} />}
        avantFaq={
          <>
            <LogoCarousel />
            <ReviewsSection />
          </>
        }
      />
    </>
  );
}
