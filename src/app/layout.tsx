import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { NavigationLuxe } from "@/components/NavigationLuxe";
import { FooterLuxe } from "@/components/FooterLuxe";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Select Châteaux | Lieux de Séminaire Luxe & Confidentiels (Paris / Île-de-France)",
  description:
    "Accédez à notre collection privée de châteaux pour séminaires, CODIR et soirées d'entreprise. Lieux confidentiels dans le 60, 78 et 92. Vérifiez les disponibilités.",
  keywords: [
    "séminaire chateau ile de france",
    "location chateau seminaire",
    "lieu événementiel confidentiel",
    "organisation codir luxe",
    "chateau chantilly seminaire",
    "abbaye vaux de cernay seminaire",
    "château événement entreprise",
    "séminaire résidentiel",
    "team building château",
  ],
  authors: [{ name: "Select Châteaux" }],
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/apple-icon.png',
  },
  metadataBase: new URL('https://selectchateaux.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    title: "Select Châteaux - La Collection Confidentielle",
    description:
      "3 Domaines d'exception cachés aux portes de Paris pour vos événements d'entreprise.",
    url: "https://selectchateaux.vercel.app/",
    siteName: "Select Châteaux",
    locale: "fr_FR",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Select Châteaux - Lieux de séminaire d'exception",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Select Châteaux | Lieux Secrets pour Séminaires",
    description: "Découvrez nos domaines privés pour vos événements d'entreprise.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://selectchateaux.vercel.app/#organization",
        "name": "Select Châteaux",
        "url": "https://selectchateaux.vercel.app/",
        "logo": "https://selectchateaux.vercel.app/logo.png",
        "description": "Agence spécialisée dans la location de lieux confidentiels et de châteaux pour séminaires d'entreprise en Île-de-France.",
        "areaServed": "Île-de-France",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+33757991146",
          "contactType": "sales",
          "email": "seminaires@selectchateaux.com",
          "availableLanguage": ["French", "English"]
        }
      },
      {
        "@type": "Service",
        "name": "Organisation de Séminaires d'Entreprise",
        "provider": {
          "@id": "https://selectchateaux.vercel.app/#organization"
        },
        "areaServed": {
          "@type": "State",
          "name": "Île-de-France"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Lieux de Séminaire",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Le Domaine des Grands Bois de Chantilly",
                "description": "Château-hôtel style anglo-normand pour grands séminaires avec spa et parc forestier."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Le Domaine des Hauts de Seine",
                "description": "Refuge historique et jardin suspendu aux portes de Paris pour CODIR exclusif."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Le Monastère de la Vallée de Chevreuse",
                "description": "Abbaye cistercienne et étang privé pour événements grandioses."
              }
            }
          ]
        }
      }
    ]
  };

  return (
    <html lang="fr" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <NavigationLuxe />
        <main className="min-h-screen">{children}</main>
        <FooterLuxe />
      </body>
    </html>
  );
}
