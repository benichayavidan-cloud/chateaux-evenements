import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import "../styles/design-system.css";
import { Navigation, Footer } from "@/components/sections-v2";
import { GoogleAnalytics } from "@/components/Analytics";
import { StructuredData } from "@/components/StructuredData";
import { generateOrganizationSchema, generateWebSiteSchema, generateServiceSchema, generateLocalBusinessSchema } from "@/utils/seo/structured-data";
import Image from "next/image";
import { CookieConsentLazy } from "@/components/CookieConsentLazy";

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
  // Structured Data amélioré pour SEO 2026
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      generateOrganizationSchema(),
      generateWebSiteSchema(),
      generateServiceSchema(),
      generateLocalBusinessSchema(),
    ],
  };

  return (
    <html lang="fr" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        {/* Preconnect & DNS Prefetch - Accélère les connexions aux domaines tiers */}
        <link rel="preconnect" href="https://jmeiepmtgidqtmxfnlwf.supabase.co" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://jmeiepmtgidqtmxfnlwf.supabase.co" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

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

        {/* Google tag (gtag.js) - Chargé avec l'ID Ads (GA4 ID retourne 404 côté Google) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17912491834" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              gtag('js', new Date());
              gtag('config', 'G-TRWZDPNN9E', {
                anonymize_ip: true,
                cookie_flags: 'SameSite=None;Secure'
              });
              gtag('config', 'AW-17912491834');
            `,
          }}
        />

        {/* Structured Data - Schema.org */}
        <StructuredData data={structuredData} />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Google Analytics - doit être dans body pour next/script afterInteractive */}
        <GoogleAnalytics />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[9999] focus:top-4 focus:left-4 focus:bg-white focus:text-[#a37e2c] focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:font-semibold">
          Aller au contenu principal
        </a>
        <Navigation
          logo={
            <Image
              src="https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/logo.png"
              alt="Select Châteaux - Châteaux pour séminaires d'entreprise en Île-de-France"
              width={180}
              height={60}
              priority
              sizes="180px"
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
            href: "/devis#formulaire",
          }}
          sticky
        />
        <main id="main-content" className="min-h-screen" style={{ paddingTop: '80px' }}>{children}</main>

        <Footer
          logo={
            <Image
              src="https://jmeiepmtgidqtmxfnlwf.supabase.co/storage/v1/object/public/chateaux-images/logo.png"
              alt="Select Châteaux - Châteaux pour séminaires d'entreprise en Île-de-France"
              width={180}
              height={60}
              sizes="180px"
              style={{ objectFit: 'contain' }}
            />
          }
          description="L'excellence événementielle dans des châteaux d'exception. Accès confidentiel aux domaines les plus convoités d'Île-de-France."
          sections={[
            {
              title: "Nos Châteaux",
              links: [
                { label: "Tous nos domaines", href: "/chateaux" },
                { label: "Séminaire château Oise", href: "/seminaire-chateau-oise-60" },
                { label: "Séminaire château Yvelines", href: "/seminaire-chateau-yvelines-78" },
                { label: "Séminaire château Hauts-de-Seine", href: "/seminaire-chateau-hauts-de-seine-92" },
              ],
            },
            {
              title: "Séminaires par région",
              links: [
                { label: "Séminaire château Île-de-France", href: "/seminaire-chateau-ile-de-france" },
                { label: "Séminaire château proche Paris", href: "/seminaire-chateau-proche-paris" },
                { label: "Séminaire château Chantilly", href: "/seminaire-chateau-chantilly" },
                { label: "Séminaire château Oise (60)", href: "/seminaire-chateau-oise-60" },
                { label: "Séminaire château Yvelines (78)", href: "/seminaire-chateau-yvelines-78" },
                { label: "Séminaire château Hauts-de-Seine (92)", href: "/seminaire-chateau-hauts-de-seine-92" },
              ],
            },
            {
              title: "À propos",
              links: [
                { label: "Notre histoire", href: "/a-propos" },
                { label: "Séminaires & Soirées", href: "/seminaires-soirees-entreprise" },
                { label: "Blog", href: "/blog" },
                { label: "Demander un devis", href: "/devis" },
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
        <CookieConsentLazy variant="mini" />
      </body>
    </html>
  );
}
