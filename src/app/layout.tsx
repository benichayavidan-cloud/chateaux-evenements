import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Poppins, Roboto } from "next/font/google";
import "./globals.css";
import "../styles/blog.css";
import "../styles/brakt-blog.css";
import { NavigationLuxe } from "@/components/NavigationLuxe";
import { FooterLuxe } from "@/components/FooterLuxe";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CookieBanner } from "@/components/CookieBanner";

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

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Châteaux Séminaire Île-de-France | Select Châteaux",
  description:
    "Découvrez 4 châteaux d'exception pour séminaires d'entreprise en Île-de-France. Manoir Chantilly, hôtel Paris 92, abbaye Yvelines, palais royal. Devis 24h.",
  robots: {
    index: true,
    follow: true,
  },
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
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon-48.png',
    apple: '/apple-icon.png',
  },
  metadataBase: new URL('https://www.selectchateaux.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    title: "Select Châteaux - La Collection Confidentielle",
    description:
      "4 Domaines d'exception cachés aux portes de Paris pour vos événements d'entreprise.",
    url: "https://www.selectchateaux.com/",
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
    images: ["/og-image.jpg"]
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
        "@id": "https://www.selectchateaux.com/#organization",
        "name": "Select Châteaux",
        "url": "https://www.selectchateaux.com/",
        "logo": "https://www.selectchateaux.com/logo.png",
        "description": "Agence spécialisée dans la location de lieux confidentiels et de châteaux pour séminaires d'entreprise en Île-de-France.",
        "areaServed": "Île-de-France",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "60 Rue François 1er",
          "addressLocality": "Paris",
          "postalCode": "75008",
          "addressRegion": "Île-de-France",
          "addressCountry": "FR"
        },
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
          "@id": "https://www.selectchateaux.com/#organization"
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
    <html lang="fr" className={`${cormorant.variable} ${inter.variable} ${poppins.variable} ${roboto.variable}`}>
      <head>
        {/* Google Consent Mode v2 - DOIT être chargé AVANT tous les autres scripts Google */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}

              // Consent Mode v2 - Mode Advanced (envoie des pings anonymes même en "denied")
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'functionality_storage': 'granted',
                'personalization_storage': 'denied',
                'security_storage': 'granted',
                'region': ['FR', 'BE', 'CH', 'LU', 'CA'],
                'wait_for_update': 500
              });

              console.log('✅ Google Consent Mode v2 initialisé (Advanced mode)');
            `,
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <NavigationLuxe />
        <Breadcrumb />
        <main className="min-h-screen">{children}</main>
        <FooterLuxe />
        <CookieBanner />
      </body>
    </html>
  );
}
