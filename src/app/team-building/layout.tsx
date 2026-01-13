import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team Building Château | Activités d'Équipe Select Châteaux",
  description: "Renforcez la cohésion de vos équipes avec nos 8 activités immersives dans nos châteaux d'exception. Challenges, escape games, olympiades en Île-de-France.",
  keywords: [
    "team building château",
    "activités d'équipe",
    "cohésion d'équipe",
    "séminaire team building",
    "challenges entreprise",
    "escape game château"
  ],
  openGraph: {
    title: "Team Building d'Exception en Châteaux",
    description: "8 activités immersives pour renforcer vos équipes dans nos domaines",
    url: "https://www.selectchateaux.com/team-building",
    siteName: "Select Châteaux",
    locale: "fr_FR",
    type: "website",
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Team Building Select Châteaux"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Team Building Château | Select Châteaux",
    description: "Activités d'équipe immersives dans nos châteaux d'exception",
    images: ["/og-image.jpg"]
  },
  alternates: {
    canonical: "/team-building"
  }
};

export default function TeamBuildingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
