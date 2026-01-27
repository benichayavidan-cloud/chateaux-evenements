import type { Metadata } from "next";
import { chateaux as chateauxData } from "@/data/chateaux";
import { getGeoData, getGeoString } from "@/utils/geo-mapping";

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const chateau = chateauxData.find((c) => c.slug === slug);

  if (!chateau) {
    return {
      title: "Château introuvable | Select Châteaux",
    };
  }

  // URL canonique de production
  const canonicalUrl = `https://www.selectchateaux.com/chateaux/${chateau.slug}`;

  // Récupération des données géographiques enrichies
  const { code, variant } = getGeoData(chateau.region);
  const geoString = getGeoString(chateau.region);

  // Titre SEO enrichi avec code département et variante géographique
  // Ex: "Château de la Tour - Lieu de Séminaire Oise (60) & proche Chantilly"
  const enrichedTitle = `${chateau.nom} - Lieu de Séminaire ${geoString}`;

  // Description enrichie avec numéro de département
  // Ex: "Organisez votre événement au Château de la Tour. Location de salle 60 et séminaire en Oise..."
  const enrichedDescription = code
    ? `Organisez votre événement au ${chateau.nom}. Location de salle et séminaire dans le ${code} (${chateau.region}). Devis gratuit pour votre événement ${variant}.`
    : chateau.descriptionLongue.substring(0, 160);

  return {
    title: `${enrichedTitle} | Select Châteaux`,
    description: enrichedDescription,
    robots: {
      index: false,
      follow: false,
    },
    keywords: [
      `chateau ${chateau.region.toLowerCase()}`,
      `seminaire ${chateau.region.toLowerCase()}`,
      `location chateau ${chateau.nom.toLowerCase()}`,
      `evenement entreprise ${chateau.region.toLowerCase()}`,
      `${chateau.styleArchitectural.toLowerCase()} seminaire`,
      // Ajout des mots-clés avec numéros de département
      ...(code ? [
        `chateau ${code}`,
        `seminaire ${code}`,
        `location salle ${code}`,
        `evenement ${code}`,
        `${chateau.region.toLowerCase()} ${code}`,
      ] : []),
    ],
    metadataBase: new URL("https://www.selectchateaux.com"),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      title: enrichedTitle,
      description: enrichedDescription,
      url: canonicalUrl,
      siteName: "Select Châteaux",
      locale: "fr_FR",
      images: [
        {
          url: chateau.images.openGraph,
          width: 1200,
          height: 630,
          alt: `${chateau.seoH1} - Vue principale ${code ? `(${code})` : ''}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: enrichedTitle,
      description: enrichedDescription,
    },
  };
}

export default function ChateauLayout({ children }: Props) {
  return <>{children}</>;
}
