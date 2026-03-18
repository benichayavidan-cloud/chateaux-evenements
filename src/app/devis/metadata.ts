import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Devis Séminaire Gratuit & Réponse 24h | Select Châteaux",
  description:
    "Formulaire en 2 min, réponse garantie sous 24h. 4 châteaux privatisables en Île-de-France, de 10 à 500 personnes. 100% gratuit, sans engagement.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Devis Séminaire Gratuit & Réponse 24h | Select Châteaux",
    description:
      "Remplissez le formulaire en 2 minutes et recevez votre devis personnalisé pour votre séminaire en château. Sans engagement.",
    url: "https://www.selectchateaux.com/devis",
    type: "website",
    siteName: "Select Châteaux",
    locale: "fr_FR",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Devis Séminaire Château - Select Châteaux",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Devis Séminaire Gratuit - Réponse 24h",
    description: "4 châteaux d'exception • Sans engagement • Réponse garantie sous 24h",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "/devis",
  },
};
