/**
 * PAGE TEAM BUILDING CHÂTEAU - Server Component
 * Structure identique aux pages château individuelles
 */

import type { Metadata } from "next";
import { StructuredData } from "@/components/StructuredData";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/utils/seo/structured-data";
import TeamBuildingPageClient from "./TeamBuildingPageClient";
import { LogoCarousel } from "@/components/LogoCarousel";
import { ReviewsSection } from "@/components/ReviewsSection";

const faq = [
  {
    question: "Quels types de team building proposez-vous en château ?",
    answer: "Nous proposons une large gamme d'activités : olympiades sportives, escape game grandeur nature, murder party immersive, atelier cuisine gastronomique, rallye découverte du domaine, challenges créatifs, jeux d'énigmes et bien plus. Chaque programme est personnalisé selon vos objectifs de cohésion d'équipe."
  },
  {
    question: "Combien de participants peuvent être accueillis ?",
    answer: "Nos châteaux peuvent accueillir de 20 à 500 participants selon le domaine choisi. Que ce soit pour une petite équipe de direction ou un grand séminaire d'entreprise, nous adaptons les activités et les espaces à la taille de votre groupe."
  },
  {
    question: "Les activités sont-elles adaptées à tous les niveaux sportifs ?",
    answer: "Absolument ! Toutes nos activités sont conçues pour être inclusives et accessibles à tous, quel que soit le niveau de condition physique. Nous proposons aussi des alternatives pour les personnes à mobilité réduite. L'objectif est que chaque participant puisse s'amuser et contribuer à l'esprit d'équipe."
  },
  {
    question: "Peut-on combiner team building et séminaire de travail ?",
    answer: "C'est notre spécialité ! La plupart de nos clients combinent sessions de travail en salle plénière le matin et activités de team building l'après-midi. Nos châteaux disposent de salles de réunion équipées et de grands espaces extérieurs, idéals pour alterner productivité et cohésion."
  },
  {
    question: "Quel est le tarif d'un team building en château ?",
    answer: "Le tarif dépend du nombre de participants, des activités choisies, de la durée (demi-journée, journée complète, séjour avec nuitées) et du château sélectionné. Nous vous envoyons un devis personnalisé gratuit sous 24h après étude de votre projet."
  },
  {
    question: "Proposez-vous des team building en soirée ?",
    answer: "Oui ! Nous proposons des activités spéciales en soirée : murder party aux chandelles, casino royal, soirée à thème (Gatsby, Médiévale...), quiz & blind test, spectacles interactifs. L'ambiance nocturne d'un château rend ces moments véritablement magiques."
  },
];

export const metadata: Metadata = {
  title: "Team Building en Château | Activités de Cohésion d'Équipe | Select Châteaux",
  description: "Organisez votre team building dans un château d'exception proche de Paris. Olympiades, escape game, murder party, ateliers cuisine... +500 événements organisés. Devis gratuit en 24h.",
  robots: { index: true, follow: true },
  keywords: [
    "team building château",
    "team building entreprise château",
    "activités cohésion équipe château",
    "séminaire team building",
    "team building proche Paris",
    "olympiades entreprise",
    "escape game château",
    "murder party château",
    "atelier cuisine team building",
    "team building Île-de-France",
    "journée cohésion entreprise",
    "activités groupe château",
  ],
  openGraph: {
    title: "Team Building en Château | Select Châteaux",
    description: "Activités de cohésion d'équipe dans des châteaux d'exception. Devis gratuit en 24h.",
    url: "https://www.selectchateaux.com/team-building-chateau",
    siteName: "Select Châteaux",
    images: [
      {
        url: "https://www.selectchateaux.com/images/team-building-chateau-seminaire-cohesion-equipe-hero.webp",
        width: 1200,
        height: 630,
        alt: "Team building en château — activités de cohésion d'équipe en plein air",
      },
    ],
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Team Building en Château | Select Châteaux",
    description: "Activités de cohésion d'équipe dans des châteaux d'exception.",
    images: ["https://www.selectchateaux.com/images/team-building-chateau-seminaire-cohesion-equipe-hero.webp"],
  },
  alternates: {
    canonical: "/team-building-chateau",
  },
};

export default function TeamBuildingPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Team Building en Château",
        description: "Organisation de team building et activités de cohésion d'équipe dans des châteaux d'exception en Île-de-France. Olympiades, escape game, murder party, ateliers cuisine et plus.",
        provider: {
          "@type": "Organization",
          name: "Select Châteaux",
          url: "https://www.selectchateaux.com",
        },
        areaServed: {
          "@type": "GeoCircle",
          geoMidpoint: { "@type": "GeoCoordinates", latitude: 48.8566, longitude: 2.3522 },
          geoRadius: "100000",
        },
        serviceType: "Team Building",
      },
      generateFAQSchema(faq),
      generateBreadcrumbSchema([
        { name: "Accueil", url: "/" },
        { name: "Team Building en Château", url: "/team-building-chateau" },
      ]),
    ],
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <TeamBuildingPageClient faq={faq} />
      <LogoCarousel />
      <ReviewsSection />
    </>
  );
}
