/**
 * RUBRIQUE D'UN DOMAINE — /chateaux/<slug>/<rubrique> (salles, chambres…).
 *
 * Toutes les pages sont générées à l'avance et `dynamicParams = false` : une
 * rubrique inconnue répond un vrai 404 (cf. /chateaux/[slug], soft 404 du
 * 15/11). Titre, description et canonique propres à la rubrique : ils
 * remplacent ceux de la fiche hérités du layout parent.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { chateaux } from "@/data/chateaux";
import { RUBRIQUES_PAR_CHATEAU } from "@/data/rubriques";
import { StructuredData } from "@/components/StructuredData";
import { RubriquePage } from "@/components/domaine/RubriquePage";
import { generateBreadcrumbSchema } from "@/utils/seo/structured-data";
import { LIBELLES, TITRES, rubrique as lireRubrique, rubriquesPubliees, urlRubrique } from "@/lib/rubriques";
import type { RubriqueId } from "@/types/rubriques";

type Props = {
  params: Promise<{ slug: string; rubrique: string }>;
};

export function generateStaticParams() {
  return Object.keys(RUBRIQUES_PAR_CHATEAU).flatMap((slug) =>
    rubriquesPubliees(slug).map((rubrique) => ({ slug, rubrique })),
  );
}

export const dynamicParams = false;

function charger(slug: string, id: string) {
  const chateau = chateaux.find((c) => c.slug === slug);
  const r = lireRubrique(slug, id);
  return chateau && r ? { chateau, r, id: id as RubriqueId } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, rubrique } = await params;
  const page = charger(slug, rubrique);
  if (!page) return { title: "Page introuvable" };

  const url = urlRubrique(slug, page.id);
  const image = page.r.photos[0]?.src ?? page.chateau.images.openGraph;
  return {
    title: { absolute: page.r.seoTitle },
    description: page.r.seoDescription,
    keywords: undefined,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: "Select Châteaux",
      locale: "fr_FR",
      url,
      title: page.r.seoTitle,
      description: page.r.seoDescription,
      images: [{ url: image, alt: page.r.photos[0]?.legende ?? TITRES[page.id] }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.r.seoTitle,
      description: page.r.seoDescription,
      images: [image],
    },
  };
}

export default async function RubriqueDomaine({ params }: Props) {
  const { slug, rubrique } = await params;
  const page = charger(slug, rubrique);
  if (!page) notFound();

  const { chateau, r, id } = page;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      generateBreadcrumbSchema([
        { name: "Accueil", url: "/" },
        { name: "Nos châteaux", url: "/chateaux" },
        { name: chateau.nom, url: `/chateaux/${slug}` },
        { name: LIBELLES[id], url: urlRubrique(slug, id) },
      ]),
    ],
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <RubriquePage chateau={chateau} id={id} r={r} rubriques={rubriquesPubliees(slug)} />
    </>
  );
}
