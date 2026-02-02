import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Devis Séminaire Gratuit & Réponse 24h | Select Châteaux",
  description:
    "Obtenez votre devis gratuit pour votre séminaire en château. Réponse sous 24h, 4 châteaux d'exception en Île-de-France. Sans engagement.",
  robots: {
    index: false,
    follow: false,
  },
  keywords: [
    "devis séminaire château",
    "devis gratuit séminaire",
    "location château entreprise",
    "devis 24h séminaire",
    "demande devis événement",
    "tarif séminaire château",
  ],
  openGraph: {
    title: "Devis Séminaire Gratuit & Réponse 24h | Select Châteaux",
    description:
      "Remplissez le formulaire en 4 étapes et recevez votre devis personnalisé pour votre séminaire en château. Sans engagement.",
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
