import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { chateaux } from "@/data/chateaux";
import { descriptionFiche, localite, titreFiche } from "@/lib/fiche-chateau";

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};


// GÉNÉRATION DYNAMIQUE DES METADATA (SEO Optimisé - Blind Booking)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const chateau = chateaux.find((c) => c.slug === slug);

  if (!chateau) {
    return {
      title: "Château non trouvé",
    };
  }

  // Extraction du type de lieu depuis le nom (ex: "Grand Château", "Domaine Historique", "Ancienne Abbaye")
  const typeLieu = chateau.nom.split(" de ")[0].split(" à ")[0].split(" en ")[0];

  // Extraction de la ville (ex: "Chantilly", "Issy-les-Moulineaux", "Vallée de Chevreuse")
  const ville = localite(chateau.region);

  return {
    // Titre et description écrits pour CETTE fiche (data/chateaux.ts), chiffres
    // lus dans les données ; repli borné à 60 si le titre prévu dépasse.
    // `absolute` : ces pages gardent le nom du lieu plutôt que la marque.
    title: { absolute: titreFiche(chateau) },
    description: descriptionFiche(chateau),

    robots: {
      index: true,
      follow: true,
    },

    keywords: [
      `séminaire ${typeLieu.toLowerCase()} ${ville.toLowerCase()}`,
      `château séminaire ${ville.toLowerCase()}`,
      `événement entreprise ${ville.toLowerCase()}`,
      `séminaire résidentiel ${ville.toLowerCase()}`,
      `location château ${ville.toLowerCase()}`,
      `team building château ${ville.toLowerCase()}`,
      `séminaire ${chateau.capacite.max} personnes`,
      `${chateau.styleArchitectural.toLowerCase()} séminaire`,
    ],

    alternates: {
      canonical: `/chateaux/${slug}`,
    },

    openGraph: {
      url: `/chateaux/${slug}`,
      title: `${typeLieu} ${ville} - ${chateau.capacite.max} pers`,
      description: chateau.accrocheHero,
      images: [
        {
          url: chateau.images.openGraph,
          width: 1200,
          height: 630,
          alt: `${typeLieu} pour séminaire d'entreprise`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${typeLieu} ${ville} - ${chateau.capacite.max} pers`,
      description: chateau.accrocheHero,
      images: [chateau.images.openGraph],
    },
  };
}

export default function ChateauLayout({ children }: Props) {
  return <>{children}</>;
}
