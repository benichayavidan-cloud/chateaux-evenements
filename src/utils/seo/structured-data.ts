/**
 * STRUCTURED DATA (Schema.org JSON-LD) - SEO 2026
 * Génération de données structurées pour Google Rich Results
 */

import type { Chateau } from "@/types";

const BASE_URL = "https://www.selectchateaux.com";

/**
 * Schema Organization - Pour toutes les pages
 * Définit l'entreprise Select Châteaux
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "Select Châteaux",
    alternateName: "SelectChateaux",
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/logo.png`,
      width: 512,
      height: 512,
    },
    image: `${BASE_URL}/og-image.jpg`,
    description:
      "Accès confidentiel aux plus beaux châteaux d'Île-de-France pour vos événements d'entreprise. Séminaires, team building, soirées corporate sur-mesure.",
    email: "contact@selectchateaux.com",
    telephone: "+33757991146",
    address: {
      "@type": "PostalAddress",
      addressCountry: "FR",
      addressRegion: "Île-de-France",
    },
    sameAs: [
      // Ajouter les réseaux sociaux quand disponibles
      // "https://www.linkedin.com/company/selectchateaux",
      // "https://www.instagram.com/selectchateaux",
    ],
    foundingDate: "2009",
    slogan: "La Collection Confidentielle",
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 48.8566,
        longitude: 2.3522,
      },
      geoRadius: "100000", // 100km autour de Paris
    },
  };
}

/**
 * Schema Place - Pour chaque page château individuelle
 */
export function generatePlaceSchema(chateau: Chateau) {
  return {
    "@context": "https://schema.org",
    "@type": ["Place", "EventVenue", "LodgingBusiness"],
    "@id": `${BASE_URL}/chateaux/${chateau.slug}#place`,
    name: chateau.nom,
    description: chateau.descriptionLongue,
    image: chateau.images.hero.map((img) => img),
    url: `${BASE_URL}/chateaux/${chateau.slug}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: chateau.region,
      addressCountry: "FR",
    },
    maximumAttendeeCapacity: chateau.capacite.max,
    starRating: {
      "@type": "Rating",
      ratingValue: 5,
      bestRating: 5,
    },
    amenityFeature: chateau.atouts.map((atout) => ({
      "@type": "LocationFeatureSpecification",
      name: atout,
    })),
    numberOfRooms: chateau.roomsTotal,
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Style architectural",
        value: chateau.styleArchitectural,
      },
      {
        "@type": "PropertyValue",
        name: "Capacité minimum",
        value: chateau.capacite.min,
      },
    ],
  };
}

/**
 * Schema Service - Pour la page d'accueil et services
 */
export function generateServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE_URL}/#service`,
    serviceType: "Organisation d'événements professionnels en château",
    provider: {
      "@id": `${BASE_URL}/#organization`,
    },
    areaServed: {
      "@type": "State",
      name: "Île-de-France",
      addressCountry: "FR",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services événementiels",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Séminaires d'entreprise",
            description:
              "Organisation complète de séminaires résidentiels et non-résidentiels en château",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Team Building",
            description:
              "Activités et ateliers de cohésion d'équipe dans des domaines d'exception",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Soirées d'entreprise",
            description:
              "Organisation de soirées corporate, galas et événements festifs",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Conventions & CODIR",
            description:
              "Accueil de conventions d'entreprise et comités de direction stratégiques",
          },
        },
      ],
    },
  };
}

/**
 * Schema FAQPage - Pour les pages avec FAQ
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Schema BreadcrumbList - Pour la navigation
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}

/**
 * Schema AggregateRating - Pour les avis clients
 */
export function generateAggregateRatingSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "127",
    bestRating: "5",
    worstRating: "1",
  };
}

/**
 * Schema WebSite - Pour la recherche Google
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "Select Châteaux",
    description:
      "Châteaux d'exception pour séminaires et événements d'entreprise en Île-de-France",
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/chateaux?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Schema Event - Pour les types d'événements
 */
export function generateEventSchema(eventType: {
  titre: string;
  description: string;
  href: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: eventType.titre,
    description: eventType.description,
    url: `${BASE_URL}${eventType.href}`,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: "Châteaux Select Châteaux",
      address: {
        "@type": "PostalAddress",
        addressRegion: "Île-de-France",
        addressCountry: "FR",
      },
    },
    organizer: {
      "@id": `${BASE_URL}/#organization`,
    },
  };
}

/**
 * Helper pour convertir structured data en string JSON
 * Utilisez le composant <StructuredData> pour l'injection dans les pages
 */
export function stringifyStructuredData(data: object | object[]): string {
  const schemas = Array.isArray(data) ? data : [data];
  return JSON.stringify(schemas, null, 0);
}
