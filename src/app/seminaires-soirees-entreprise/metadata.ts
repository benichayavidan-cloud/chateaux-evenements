import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Séminaires & Soirées d'Entreprise en Château | Select Châteaux",
  description:
    "Organisation complète de vos événements professionnels en château : séminaires, team building, soirées corporate, CODIR. Solutions sur-mesure en Île-de-France. Devis 24h.",
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "séminaire entreprise château",
    "soirée entreprise château",
    "événement corporate château",
    "team building château",
    "organisation événement professionnel",
    "château événement ile de france",
    "séminaire soirée château",
  ],
  openGraph: {
    title: "Séminaires & Soirées d'Entreprise en Château | Select Châteaux",
    description:
      "Des solutions sur-mesure pour transformer vos événements professionnels en moments inoubliables.",
    url: "https://www.selectchateaux.com/seminaires-soirees-entreprise",
    type: "website",
    images: [
      {
        url: "/images/seminaires-soirees-entreprise-hero.webp",
        width: 1200,
        height: 630,
        alt: "Séminaire et soirée d'entreprise en château",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Séminaires & Soirées d'Entreprise en Château",
    description: "Des solutions sur-mesure pour vos événements professionnels en château d'exception.",
    images: ["/images/seminaires-soirees-entreprise-hero.webp"],
  },
  alternates: {
    canonical: "/seminaires-soirees-entreprise",
  },
};
