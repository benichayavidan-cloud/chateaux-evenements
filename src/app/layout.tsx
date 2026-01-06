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
  title: "ChâteauxPrestige - Événements d'Entreprise d'Exception",
  description:
    "Organisez vos séminaires, conventions et événements d'entreprise dans nos 4 châteaux d'exception en France. Excellence, prestige et authenticité pour des moments inoubliables.",
  keywords: [
    "château événement entreprise",
    "séminaire résidentiel",
    "location château entreprise",
    "événement corporate",
    "team building château",
  ],
  authors: [{ name: "ChâteauxPrestige" }],
  openGraph: {
    title: "ChâteauxPrestige - Événements d'Entreprise d'Exception",
    description:
      "Organisez vos événements d'entreprise dans des châteaux d'exception",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${inter.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <NavigationLuxe />
        <main className="min-h-screen">{children}</main>
        <FooterLuxe />
      </body>
    </html>
  );
}
