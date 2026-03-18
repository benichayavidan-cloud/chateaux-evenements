import { Metadata } from "next";

export const metadata: Metadata = {
  title: "4 Châteaux Séminaire Île-de-France | Select Châteaux",
  description:
    "Manoir à Chantilly, hôtel 5 étoiles Paris 92, abbaye en Yvelines, palais royal. De 50 à 280 pers, privatisation totale. Comparez nos domaines et demandez votre devis gratuit.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "4 Châteaux Séminaire Île-de-France | Select Châteaux",
    description:
      "Manoir à Chantilly, hôtel 5 étoiles Paris 92, abbaye en Yvelines, palais royal. De 50 à 280 pers, privatisation totale.",
    url: "https://www.selectchateaux.com/chateaux",
    type: "website",
    images: [
      {
        url: "/images/chateaux-collection.webp",
        width: 1200,
        height: 630,
        alt: "Collection de châteaux Select Châteaux",
      },
    ],
  },
  alternates: {
    canonical: "/chateaux",
  },
};
