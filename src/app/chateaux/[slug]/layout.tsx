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

  return {
    title: `${chateau.seoH1} | Select Châteaux`,
    description: chateau.descriptionLongue.substring(0, 160) + "...",
    keywords: [
      `chateau ${chateau.region.toLowerCase()}`,
      `seminaire ${chateau.region.toLowerCase()}`,
      `location chateau ${chateau.nom.toLowerCase()}`,
      `evenement entreprise ${chateau.region.toLowerCase()}`,
      `${chateau.styleArchitectural.toLowerCase()} seminaire`,
    ],
    metadataBase: new URL("https://selectchateaux.vercel.app"),
    alternates: {
      canonical: `/chateaux/${chateau.slug}`,
    },
    openGraph: {
      type: "website",
      title: chateau.seoH1,
      description: "Découvrez ce lieu d'exception pour vos séminaires.",
      url: `https://selectchateaux.vercel.app/chateaux/${chateau.slug}`,
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
      title: chateau.seoH1,
      description: chateau.descriptionLongue.substring(0, 160) + "...",
    },
  };
}

export default function ChateauLayout({ children }: Props) {
  return <>{children}</>;
}
