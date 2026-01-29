import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { chateaux } from "@/data/chateaux";

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
      title: "Château non trouvé | Select Châteaux",
    };
  }

  // Extraction du type de lieu depuis le nom (ex: "Grand Château", "Domaine Historique", "Ancienne Abbaye")
  const typeLieu = chateau.nom.split(" de ")[0].split(" à ")[0].split(" en ")[0];

  // Extraction de la ville (ex: "Chantilly", "Issy-les-Moulineaux", "Vallée de Chevreuse")
  const ville = chateau.region.split("(")[0].trim();

  return {
    title: `${typeLieu} ${ville} - ${chateau.capacite.max} pers | Réf ${chateau.ref}`,
    description: `Organisez votre CODIR dans ce ${typeLieu.toLowerCase()} d'exception. Capacité ${chateau.capacite.max} personnes en résidentiel. ${chateau.accrocheHero}`,

    // VERROUILLAGE : Cette page NE DOIT PAS être indexée
    robots: {
      index: false,
      follow: false,
    },

    openGraph: {
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
  };
}

export default function ChateauLayout({ children }: Props) {
  return <>{children}</>;
}
