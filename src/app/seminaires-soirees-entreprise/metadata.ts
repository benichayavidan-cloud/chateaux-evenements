import { Metadata } from "next";

// Titre et description écrits une seule fois, repris par les aperçus de partage (18/11/2026).
const TITRE_PAGE = "Soirée d'entreprise en château près de Paris : 4 domaines";
const DESCRIPTION_PAGE = "Soirée d'entreprise dans une collection de 4 châteaux privatisables près de Paris : gala, soirée à thème, cocktail. 50 à 280 participants, hébergement sur site.";

export const metadata: Metadata = {
  // `absolute` : pas de suffixe de marque, pour garder les mots tapés dans les 60 caractères affichés.
  title: { absolute: TITRE_PAGE },
  description: DESCRIPTION_PAGE,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: TITRE_PAGE,
    description: DESCRIPTION_PAGE,
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
    title: TITRE_PAGE,
    description: DESCRIPTION_PAGE,
    images: [
      "/images/soiree-entreprise-theme-gatsby-chateau-seminaire.webp",
    ],
  },
  alternates: {
    canonical: "/seminaires-soirees-entreprise",
  },
};
