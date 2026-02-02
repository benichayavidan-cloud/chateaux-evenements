import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team Building en Château | Activités de Cohésion d'Équipe | Select Châteaux",
  description:
    "Organisez des activités de team building originales dans nos châteaux d'exception. Olympiades, parcours aventure, ateliers culinaires. Renforcez la cohésion de vos équipes en Île-de-France.",
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "team building château",
    "activités cohésion équipe",
    "team building ile de france",
    "olympiades entreprise",
    "parcours aventure équipe",
    "atelier culinaire team building",
    "renforcement cohésion équipe",
  ],
  openGraph: {
    title: "Team Building en Château | Activités de Cohésion d'Équipe",
    description:
      "Des activités originales pour renforcer la cohésion de vos équipes dans des domaines d'exception.",
    url: "https://www.selectchateaux.com/team-building",
    type: "website",
    images: [
      {
        url: "/images/team-building-hero.webp",
        width: 1200,
        height: 630,
        alt: "Team building en château",
      },
    ],
  },
  alternates: {
    canonical: "/team-building",
  },
};
