/**
 * PAGE TEAM BUILDING CHÂTEAU - Server Component
 * SEO optimisé : Schema Service enrichi, AggregateRating, Organization, FAQ, Breadcrumb
 */

import type { Metadata } from "next";
import { StructuredData } from "@/components/StructuredData";
import {
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateOrganizationSchema,
  generateAggregateRatingSchema,
} from "@/utils/seo/structured-data";
import TeamBuildingPageClient from "./TeamBuildingPageClient";
import { LogoCarousel } from "@/components/LogoCarousel";
import { ReviewsSection } from "@/components/ReviewsSection";

const faq = [
  {
    question: "Quels types de team building proposez-vous en château ?",
    answer: "Nous proposons plus de 40 activités : olympiades sportives, escape game grandeur nature, murder party immersive, atelier cuisine gastronomique, challenge Koh-Lectif, build and race, lego challenge, drum batucada et bien plus. Chaque programme est personnalisé selon vos objectifs de cohésion d'équipe."
  },
  {
    question: "Combien de participants peuvent être accueillis pour un team building ?",
    answer: "Nos châteaux peuvent accueillir de 20 à 500 participants selon le domaine choisi. Que ce soit pour une petite équipe de direction ou un grand séminaire d'entreprise, nous adaptons les activités et les espaces à la taille de votre groupe."
  },
  {
    question: "Les activités de team building sont-elles adaptées à tous les niveaux ?",
    answer: "Absolument ! Toutes nos activités sont conçues pour être inclusives et accessibles à tous, quel que soit le niveau de condition physique. Nous proposons aussi des alternatives pour les personnes à mobilité réduite. L'objectif est que chaque participant puisse s'amuser et contribuer à l'esprit d'équipe."
  },
  {
    question: "Peut-on combiner team building et séminaire de travail en château ?",
    answer: "C'est notre spécialité ! La plupart de nos clients combinent sessions de travail en salle plénière le matin et activités de team building l'après-midi. Nos châteaux disposent de salles de réunion équipées et de grands espaces extérieurs, idéals pour alterner productivité et cohésion."
  },
  {
    question: "Quel est le tarif d'un team building en château en Île-de-France ?",
    answer: "Le tarif dépend du nombre de participants, des activités choisies, de la durée (demi-journée, journée complète, séjour avec nuitées) et du château sélectionné. Nous vous envoyons un devis personnalisé gratuit sous 24h après étude de votre projet. Contactez-nous pour recevoir votre estimation."
  },
  {
    question: "Proposez-vous des activités de team building en soirée ?",
    answer: "Oui ! Nous proposons plus de 13 animations de soirée : murder party aux chandelles, casino show avec croupiers professionnels, DJ et blind test, bar à vinyles, dégustation œnologique, magicien mentaliste, photobooth 360° et bien d'autres. L'ambiance nocturne d'un château rend ces moments véritablement magiques."
  },
  {
    question: "Dans quels châteaux organisez-vous des team building près de Paris ?",
    answer: "Nous disposons de 4 domaines d'exception en Île-de-France : un Manoir Anglo-Normand à Chantilly, un Domaine Historique dans les Hauts-de-Seine (92), une Abbaye Millénaire dans la Vallée de Chevreuse et un Palais Royal en Forêt de Chantilly. Tous sont privatisables et situés à moins d'1h de Paris."
  },
];

export const metadata: Metadata = {
  title: "Team Building Château Île-de-France | Select Châteaux",
  description: "Organisez votre team building en château proche de Paris. +40 activités : olympiades, escape game, murder party, cuisine. 20 à 500 personnes. Devis gratuit 24h.",
  robots: { index: true, follow: true },
  keywords: [
    "team building château",
    "team building entreprise château",
    "activités cohésion équipe château",
    "séminaire team building",
    "team building proche Paris",
    "team building Île-de-France",
    "olympiades entreprise château",
    "escape game château entreprise",
    "murder party château",
    "atelier cuisine team building",
    "journée cohésion entreprise château",
    "activités groupe château",
    "team building outdoor château",
    "team building indoor château",
    "soirée entreprise château",
  ],
  openGraph: {
    title: "Team Building Château Île-de-France | Select Châteaux",
    description: "+40 activités de cohésion d'équipe en château d'exception. Olympiades, escape game, murder party, cuisine. Devis gratuit en 24h.",
    url: "https://www.selectchateaux.com/team-building-chateau",
    siteName: "Select Châteaux",
    images: [
      {
        url: "https://www.selectchateaux.com/images/team-building-chateau-seminaire-cohesion-equipe-hero.webp",
        width: 1200,
        height: 630,
        alt: "Team building en château d'exception — activités de cohésion d'équipe en Île-de-France",
      },
    ],
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Team Building Château Île-de-France | Select Châteaux",
    description: "+40 activités de team building en château d'exception près de Paris.",
    images: ["https://www.selectchateaux.com/images/team-building-chateau-seminaire-cohesion-equipe-hero.webp"],
  },
  alternates: {
    canonical: "https://www.selectchateaux.com/team-building-chateau",
  },
};

export default function TeamBuildingPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      generateOrganizationSchema(),
      {
        "@type": "Service",
        "@id": "https://www.selectchateaux.com/team-building-chateau#service",
        name: "Team Building en Château",
        description: "Organisation de team building et activités de cohésion d'équipe dans des châteaux d'exception en Île-de-France. Plus de 40 animations : olympiades, escape game, murder party, ateliers cuisine, challenges créatifs, soirées entreprise.",
        url: "https://www.selectchateaux.com/team-building-chateau",
        provider: {
          "@id": "https://www.selectchateaux.com/#organization",
        },
        areaServed: {
          "@type": "GeoCircle",
          geoMidpoint: { "@type": "GeoCoordinates", latitude: 48.8566, longitude: 2.3522 },
          geoRadius: "100000",
        },
        serviceType: "Team Building",
        audience: {
          "@type": "Audience",
          audienceType: "Entreprises, comités d'entreprise, agences événementielles",
        },
        serviceOutput: [
          { "@type": "Thing", name: "Olympiades sportives en château" },
          { "@type": "Thing", name: "Escape game grandeur nature" },
          { "@type": "Thing", name: "Murder party immersive" },
          { "@type": "Thing", name: "Ateliers cuisine avec chef" },
          { "@type": "Thing", name: "Challenges créatifs et artistiques" },
          { "@type": "Thing", name: "Soirées entreprise (casino, DJ, cocktails)" },
          { "@type": "Thing", name: "Activités bien-être (yoga, sophrologie)" },
        ],
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          validFrom: "2026-01-01",
          eligibleRegion: {
            "@type": "Place",
            name: "Île-de-France",
          },
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Catalogue Team Building 2026",
          numberOfItems: 41,
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Team Building Journée — 28 activités" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Soirées & Afterwork — 13 animations" } },
          ],
        },
      },
      generateAggregateRatingSchema(),
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
