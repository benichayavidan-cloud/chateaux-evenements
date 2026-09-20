import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agence séminaire en château : 68 lieux",
  description:
    "188 devis traités en 2025-2026, 4 domaines en exclusivité et 68 lieux référencés en Île-de-France. Parmi nos clients : Eiffage, LCL et Safran.AI.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Agence séminaire en château : 68 lieux | Select Châteaux",
    description:
    "188 devis traités en 2025-2026, 4 domaines en exclusivité et 68 lieux référencés en Île-de-France. Parmi nos clients : Eiffage, LCL et Safran.AI.",
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
    title: "Agence séminaire en château : 68 lieux | Select Châteaux",
    description:
    "188 devis traités en 2025-2026, 4 domaines en exclusivité et 68 lieux référencés en Île-de-France. Parmi nos clients : Eiffage, LCL et Safran.AI.",
    images: ["/images/seminaires-soirees-entreprise-hero.webp"],
  },
  alternates: {
    canonical: "/a-propos",
  },
};
