import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Séminaires & Soirées d'Entreprise en Château proche Paris | Select Châteaux",
  description:
    "Séminaires et soirées à thème en château en Île-de-France : Gatsby, Casino, Murder Party, Bal Masqué. 50 à 280 pers., hébergement sur place. Devis 24h.",
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "séminaire entreprise château",
    "soirée entreprise château",
    "soirée à thème entreprise",
    "soirée entreprise château ile de france",
    "séminaire château proche paris",
    "soirée gatsby entreprise",
    "soirée casino royale entreprise",
    "murder party château entreprise",
    "gala entreprise château",
    "cocktail dînatoire château",
    "team building château",
    "événement corporate château",
    "soirée entreprise sur mesure",
    "privatiser château soirée",
    "séminaire résidentiel château",
  ],
  openGraph: {
    title:
      "Séminaires & Soirées d'Entreprise en Château proche Paris | Select Châteaux",
    description:
      "Soirées à thème (Gatsby, Casino, Murder Party), séminaires résidentiels et galas corporate dans 4 châteaux d'exception en Île-de-France. De 50 à 280 personnes.",
    url: "https://www.selectchateaux.com/seminaires-soirees-entreprise",
    type: "website",
    images: [
      {
        url: "/images/soiree-entreprise-theme-gatsby-chateau-seminaire.webp",
        width: 1200,
        height: 630,
        alt: "Soirée d'entreprise thème Gatsby dans un château en Île-de-France",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Séminaires & Soirées d'Entreprise en Château proche Paris",
    description:
      "Soirées à thème, galas et séminaires résidentiels dans des châteaux d'exception en Île-de-France. Devis gratuit 24h.",
    images: [
      "/images/soiree-entreprise-theme-gatsby-chateau-seminaire.webp",
    ],
  },
  alternates: {
    canonical: "/seminaires-soirees-entreprise",
  },
};
