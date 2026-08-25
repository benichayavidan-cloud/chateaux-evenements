import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notre Histoire : 15 Ans de Séminaires en Château",
  description:
    "200+ entreprises nous confient leurs séminaires en château en Île-de-France. 15 ans d'expertise, 4 domaines d'exception, devis sous 48h.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Notre Histoire : 15 Ans de Séminaires en Château | Select Châteaux",
    description:
      "200+ entreprises nous font confiance pour leurs séminaires en château en Île-de-France. 15 ans d'expertise, 4 domaines d'exception. Devis sous 48h.",
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
    title: "Notre Histoire : 15 Ans de Séminaires en Château | Select Châteaux",
    description: "200+ entreprises nous font confiance pour leurs séminaires en château en Île-de-France. 15 ans d'expertise, devis sous 48h.",
    images: ["/images/seminaires-soirees-entreprise-hero.webp"],
  },
  alternates: {
    canonical: "/a-propos",
  },
};
