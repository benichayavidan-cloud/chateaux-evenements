import { Metadata } from "next";
import { getGeoLandingPage } from "@/data/geo-landing-pages";

const page = getGeoLandingPage("seminaire-chateau-chantilly")!;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  robots: { index: true, follow: true },
  keywords: page.keywords,
  openGraph: {
    title: page.ogTitle,
    description: page.ogDescription,
    url: `https://www.selectchateaux.com${page.canonical}`,
    type: "website",
    siteName: "Select Châteaux",
    locale: "fr_FR",
    images: [
      {
        url: page.heroImage,
        width: 1200,
        height: 630,
        alt: page.h1,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: page.ogTitle,
    description: page.ogDescription,
    images: [page.heroImage],
  },
  alternates: {
    canonical: page.canonical,
  },
};
