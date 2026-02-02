import { Metadata } from "next";

export const metadata: Metadata = {
  title: "À Propos de Select Châteaux | 15 Ans d'Excellence Événementielle",
  description:
    "Découvrez Select Châteaux, agence spécialisée dans l'organisation de séminaires en châteaux depuis 2009. Notre équipe, nos valeurs, notre engagement pour vos événements d'exception.",
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "select châteaux",
    "agence événementielle château",
    "organisation séminaires luxe",
    "événements entreprise patrimoine",
    "agence séminaires île-de-france",
    "experts événements châteaux",
  ],
  openGraph: {
    title: "À Propos de Select Châteaux | 15 Ans d'Excellence",
    description:
      "Depuis 2009, Select Châteaux orchestre vos événements d'exception dans les plus beaux châteaux d'Île-de-France. Découvrez notre histoire et nos valeurs.",
    url: "https://www.selectchateaux.com/a-propos",
    type: "website",
    siteName: "Select Châteaux",
    locale: "fr_FR",
    images: [
      {
        url: "/images/seminaires-soirees-entreprise-hero.webp",
        width: 1200,
        height: 630,
        alt: "Équipe Select Châteaux - Organisation événements en châteaux",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "À Propos de Select Châteaux | 15 Ans d'Excellence",
    description: "L'expertise événementielle au service de vos séminaires d'exception",
    images: ["/images/seminaires-soirees-entreprise-hero.webp"],
  },
  alternates: {
    canonical: "/a-propos",
  },
};
