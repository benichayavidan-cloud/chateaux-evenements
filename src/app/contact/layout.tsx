import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Select Châteaux | Demande de Devis Séminaire",
  description: "Contactez nos experts à Paris. Tél. 07 57 99 11 46. Email seminaires@selectchateaux.com. Réponse sous 2h pour votre événement d'entreprise.",
  robots: {
    index: false,
    follow: false,
  },
  keywords: [
    "contact select châteaux",
    "devis séminaire",
    "réservation château",
    "événement entreprise",
    "contact Paris"
  ],
  openGraph: {
    title: "Contactez Select Châteaux",
    description: "Notre équipe répond sous 2h. Tél. 07 57 99 11 46",
    url: "https://www.selectchateaux.com/contact",
    siteName: "Select Châteaux",
    locale: "fr_FR",
    type: "website",
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Contact Select Châteaux"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Select Châteaux",
    description: "07 57 99 11 46 - seminaires@selectchateaux.com",
    images: ["/og-image.jpg"]
  },
  alternates: {
    canonical: "/contact"
  }
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
