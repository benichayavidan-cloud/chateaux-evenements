import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos Châteaux d'Exception | 4 Domaines Séminaire Île-de-France | Select Châteaux",
  description:
    "Découvrez notre collection confidentielle de 4 châteaux d'exception pour vos séminaires d'entreprise. Manoir Chantilly, hôtel 5★ Paris 92, abbaye Yvelines, palais royal. Capacité 50-280 pers.",
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "châteaux séminaire ile de france",
    "location château entreprise",
    "domaine séminaire résidentiel",
    "château événement professionnel",
    "lieu séminaire prestige",
    "château chantilly séminaire",
    "abbaye vaux de cernay événement",
  ],
  openGraph: {
    title: "Nos Châteaux d'Exception | Séminaires d'Entreprise en Île-de-France",
    description:
      "4 domaines d'exception pour vos événements professionnels. Accès confidentiel aux plus beaux châteaux d'Île-de-France.",
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
