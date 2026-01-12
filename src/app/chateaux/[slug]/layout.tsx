import type { Metadata } from "next";
import { chateaux as chateauxData } from "@/data/chateaux";

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

  return {
    title: `${chateau.seoTitle} | Select Châteaux`,
    description: chateau.descriptionLongue.substring(0, 160),
    keywords: [
      `chateau ${chateau.region.toLowerCase()}`,
      `seminaire ${chateau.region.toLowerCase()}`,
      `location chateau ${chateau.nom.toLowerCase()}`,
      `evenement entreprise ${chateau.region.toLowerCase()}`,
      `${chateau.styleArchitectural.toLowerCase()} seminaire`,
    ],
    metadataBase: new URL("https://www.selectchateaux.com"),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      title: chateau.seoTitle,
      description: chateau.descriptionLongue,
      url: canonicalUrl,
      siteName: "Select Châteaux",
      locale: "fr_FR",
      images: [
        {
          url: chateau.images.openGraph,
          width: 1200,
          height: 630,
          alt: `${chateau.seoH1} - Vue principale`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: chateau.seoTitle,
      description: chateau.descriptionLongue.substring(0, 160),
    },
  };
}

export default function ChateauLayout({ children }: Props) {
  return <>{children}</>;
}
