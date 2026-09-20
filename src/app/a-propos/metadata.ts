import { Metadata } from "next";

export const metadata: Metadata = {
  // `absolute` : la page renonce au suffixe de marque. « 15 ans » et « 200
  // entreprises » sont les deux faits qui distinguent cette agence d'une
  // autre ; les 18 caractères de « | Select Châteaux » y sont mieux employés.
  title: { absolute: "Agence séminaire en château : 15 ans, 200 entreprises" },
  description:
    "15 ans d'expérience et 200 entreprises accompagnées sur leurs séminaires en château en Île-de-France : Eiffage, Safran.AI, LCL, Boston Scientific.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Agence séminaire en château : 15 ans, 200 entreprises",
    description:
    "15 ans d'expérience et 200 entreprises accompagnées sur leurs séminaires en château en Île-de-France : Eiffage, Safran.AI, LCL, Boston Scientific.",
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
    title: "Agence séminaire en château : 15 ans, 200 entreprises",
    description:
    "15 ans d'expérience et 200 entreprises accompagnées sur leurs séminaires en château en Île-de-France : Eiffage, Safran.AI, LCL, Boston Scientific.",
    images: ["/images/seminaires-soirees-entreprise-hero.webp"],
  },
  alternates: {
    canonical: "/a-propos",
  },
};
