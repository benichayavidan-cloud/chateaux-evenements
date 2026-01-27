import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Événements Professionnels en Châteaux | Select Châteaux",
  description: "Séminaires résidentiels, journées d'étude, soirées d'entreprise, team building. Solutions clé en main dans nos domaines de prestige en Île-de-France.",
  robots: {
    index: false,
    follow: false,
  },
  keywords: [
    "événements entreprise château",
    "séminaire résidentiel",
    "soirée entreprise",
    "journée d'étude",
    "CODIR château",
    "convention entreprise"
  ],
  openGraph: {
    title: "Événements d'Entreprise d'Exception",
    description: "Séminaires, CODIR, team building dans nos châteaux d'Île-de-France",
    url: "https://www.selectchateaux.com/evenements",
    siteName: "Select Châteaux",
    locale: "fr_FR",
    type: "website",
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Événements professionnels Select Châteaux"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Événements Professionnels en Châteaux",
    description: "Séminaires, CODIR, team building dans nos châteaux d'exception",
    images: ["/og-image.jpg"]
  },
  alternates: {
    canonical: "/evenements"
  }
};

export default function EvenementsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
