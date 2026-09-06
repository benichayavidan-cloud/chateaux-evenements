import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { chateaux } from "@/data/chateaux";
import { metaDescription, TITLE_MAX } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};


/**
 * « Séminaire <type de lieu> <ville> », borné à 60 caractères.
 *
 * Le nom des 4 châteaux est une périphrase (« Château 5 Étoiles avec Vue
 * Panoramique sur Forêt ») imposée par le blind booking : c'est elle qu'on
 * raccourcit, jamais le mot-clé ni la ville.
 */
function titreChateau(typeLieu: string, ville: string): string {
  const complet = `Séminaire ${typeLieu} ${ville}`;
  if (complet.length <= TITLE_MAX) return complet;

  const budget = TITLE_MAX - `Séminaire  ${ville}`.length;
  const cut = typeLieu.slice(0, budget);
  const lastSpace = cut.lastIndexOf(" ");
  const court = cut.slice(0, lastSpace > 0 ? lastSpace : cut.length).replace(/[,;:.\s]+$/, "");
  return `Séminaire ${court} ${ville}`;
}

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
  const ville = chateau.region.split("(")[0].trim();

  return {
    // Borné à 60 caractères — le gabarit précédent ajoutait la capacité ET le
    // suffixe de marque, ce qui donnait jusqu'à 97 caractères, tous coupés par
    // Google. `absolute` : ces pages gardent le nom du lieu plutôt que la marque.
    // On raccourcit le TYPE de lieu s'il le faut ; « Séminaire » et la ville,
    // seuls mots sur lesquels la page se positionne, ne sont jamais sacrifiés.
    title: { absolute: titreChateau(typeLieu, ville) },
    description: metaDescription(`Séminaire d'entreprise dans ce ${typeLieu.toLowerCase()} d'exception en ${ville}. Capacité ${chateau.capacite.max} personnes, hébergement sur place. Devis gratuit en 24h.`),

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
