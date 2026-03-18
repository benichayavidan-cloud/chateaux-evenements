import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Select Châteaux | Agence Séminaires en Château depuis 2009",
  description:
    "Depuis 2009, nous privatisons des châteaux d'exception pour vos séminaires. 4 domaines en Île-de-France, 200+ événements organisés. Devis gratuit 24h.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Select Châteaux | Agence Séminaires en Château depuis 2009",
    description:
      "Depuis 2009, nous privatisons des châteaux d'exception pour vos séminaires. 4 domaines en Île-de-France, 200+ événements organisés.",
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
    title: "Select Châteaux | Agence Séminaires en Château depuis 2009",
    description: "Depuis 2009, nous privatisons des châteaux d'exception pour vos séminaires en Île-de-France.",
    images: ["/images/seminaires-soirees-entreprise-hero.webp"],
  },
  alternates: {
    canonical: "/a-propos",
  },
};
