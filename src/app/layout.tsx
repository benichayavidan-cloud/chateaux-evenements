import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import "../styles/design-system.css";
import { CookieConsent } from "@/components/CookieConsent";
import { Navigation, Footer } from "@/components/sections-v2";
import { GoogleAnalytics } from "@/components/Analytics";
import { StructuredData } from "@/components/StructuredData";
import { generateOrganizationSchema, generateWebSiteSchema, generateServiceSchema } from "@/utils/seo/structured-data";
import Image from "next/image";

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
  title: "Châteaux Séminaire Île-de-France | Select Châteaux",
  description:
    "Découvrez 4 châteaux d'exception pour séminaires d'entreprise en Île-de-France. Manoir Chantilly, hôtel Paris 92, abbaye Yvelines, palais royal. Devis 24h.",
  // VERROUILLAGE PAR DÉFAUT : Toutes les pages sont cachées sauf la Home qui surcharge
  robots: {
    index: false,
    follow: false,
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
  // Structured Data amélioré pour SEO 2026
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      generateOrganizationSchema(),
      generateWebSiteSchema(),
      generateServiceSchema(),
    ],
  };

  return (
    <html lang="fr" className={`${cormorant.variable} ${inter.variable}`}>
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

            `,
          }}
        />

        {/* Structured Data - Schema.org */}
        <StructuredData data={structuredData} />

        {/* Google Analytics & Tag Manager */}
        <GoogleAnalytics />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Navigation
          logo={
            <Image
              src="https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/logo.png"
              alt="Select Châteaux"
              width={180}
              height={60}
              priority
              style={{
                objectFit: 'contain',
                display: 'block',
                margin: 0,
                padding: 0,
              }}
            />
          }
          links={[
            { label: "Accueil", href: "/" },
            {
              label: "Nos Châteaux",
              href: "/chateaux",
              children: [
                { label: "Tous nos domaines", href: "/chateaux" },
                { label: "Manoir Anglo-Normand Chantilly", href: "/chateaux/manoir-anglo-normand-chantilly" },
                { label: "Domaine Historique Paris 92", href: "/chateaux/hotel-historique-seminaire-paris-92" },
                { label: "Abbaye Vallée de Chevreuse", href: "/chateaux/abbaye-millenaire-vallee-chevreuse" },
                { label: "Palais Royal Forêt Chantilly", href: "/chateaux/palais-royal-foret-chantilly" },
              ],
            },
            { label: "Soirées d'entreprise", href: "/seminaires-soirees-entreprise" },
            { label: "À propos", href: "/a-propos" },
          ]}
          cta={{
            label: "Demander un devis",
            href: "/devis",
          }}
          sticky
        />
        <main className="min-h-screen">{children}</main>

        <Footer
          logo={
            <Image
              src="https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/logo.png"
              alt="Select Châteaux"
              width={180}
              height={60}
              style={{ objectFit: 'contain' }}
            />
          }
          description="L'excellence événementielle dans des châteaux d'exception. Accès confidentiel aux domaines les plus convoités d'Île-de-France."
          sections={[
            {
              title: "Nos Châteaux",
              links: [
                { label: "Tous nos domaines", href: "/chateaux" },
                { label: "Châteaux Oise (60)", href: "/chateaux?dept=60" },
                { label: "Châteaux Yvelines (78)", href: "/chateaux?dept=78" },
                { label: "Châteaux Hauts-de-Seine (92)", href: "/chateaux?dept=92" },
              ],
            },
            {
              title: "Soirées d'entreprise",
              links: [
                { label: "Séminaires & Soirées", href: "/seminaires-soirees-entreprise" },
                { label: "Team Building", href: "/seminaires-soirees-entreprise" },
                { label: "Conventions", href: "/seminaires-soirees-entreprise" },
                { label: "Sur-mesure", href: "/seminaires-soirees-entreprise" },
              ],
            },
            {
              title: "À propos",
              links: [
                { label: "Notre histoire", href: "/a-propos" },
                { label: "Notre équipe", href: "/a-propos#equipe" },
                { label: "Nos valeurs", href: "/a-propos#valeurs" },
              ],
            },
          ]}
          contact={{
            address: "Paris, Île-de-France",
            phone: "+33 7 57 99 11 46",
            email: "seminaires@selectchateaux.com",
          }}
          social={{
            linkedin: "https://www.linkedin.com/company/select-chateaux/about/",
          }}
          legalLinks={[
            { label: "Mentions légales", href: "/mentions-legales" },
            { label: "Politique de confidentialité", href: "/confidentialite" },
            { label: "CGV", href: "/cgv" },
          ]}
          copyright={`© ${new Date().getFullYear()} Select Châteaux. Tous droits réservés.`}
        />

        {/* Cookie Consent - 3 variants disponibles: "default" | "small" | "mini" */}
        <CookieConsent variant="mini" />
      </body>
    </html>
  );
}
