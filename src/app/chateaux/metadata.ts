import { Metadata } from "next";

export const metadata: Metadata = {
  title: "4 Châteaux Privatisables pour Séminaire [Île-de-France]",
  description:
    "Comparez nos 4 châteaux pour séminaire en Île-de-France : Chantilly, Chevreuse, Paris 92. De 50 à 280 pers, privatisation totale. Devis gratuit en 24h.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "4 Châteaux Privatisables pour Séminaire [Île-de-France]",
    description:
      "Comparez nos 4 châteaux pour séminaire en Île-de-France : Chantilly, Chevreuse, Paris 92. De 50 à 280 pers, privatisation totale. Devis gratuit en 24h.",
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
