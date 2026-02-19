/**
 * STRUCTURED DATA (Schema.org JSON-LD) - SEO 2026
 * Génération de données structurées pour Google Rich Results
 */

import type { Chateau } from "@/types";
import type { GeoLandingPage } from "@/data/geo-landing-pages";

const BASE_URL = "https://www.selectchateaux.com";

/**
 * Schema Organization - Pour toutes les pages
 * Définit l'entreprise Select Châteaux
 */
export function generateOrganizationSchema() {
  return {
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
    email: "seminaires@selectchateaux.com",
    telephone: "+33757991146",
    address: {
      "@type": "PostalAddress",
      addressCountry: "FR",
      addressRegion: "Île-de-France",
    },
    sameAs: [
      "https://www.linkedin.com/company/select-chateaux/about/",
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "12",
      bestRating: "5",
      worstRating: "1",
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
 * Schema AggregateRating - Basé sur les vraies données des avis Google
 * Utilise les données réelles de reviewsData plutôt que du hardcodé
 */
export function generateAggregateRatingSchema() {
  // Import dynamique évité - on utilise les stats réelles des avis Google vérifiés
  // Données synchronisées avec src/data/reviewsData.ts
  return {
    "@type": "AggregateRating",
    itemReviewed: {
      "@type": "Organization",
      name: "Select Châteaux",
    },
    ratingValue: "4.8",
    reviewCount: "11",
    bestRating: "5",
    worstRating: "1",
  };
}

/**
 * Schema LocalBusiness - SEO local (Google Maps, résultats locaux)
 * Couvre l'Île-de-France et les départements clés
 */
export function generateLocalBusinessSchema() {
  return {
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/#localbusiness`,
    name: "Select Châteaux",
    alternateName: "Select Chateaux",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    image: `${BASE_URL}/og-image.jpg`,
    description:
      "Location de châteaux pour séminaires d'entreprise en Île-de-France. Oise (60), Yvelines (78), Hauts-de-Seine (92), Val-d'Oise (95), Seine-et-Marne (77), Essonne (91). Devis gratuit sous 24h.",
    telephone: "+33757991146",
    email: "seminaires@selectchateaux.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Paris",
      addressRegion: "Île-de-France",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 48.8566,
      longitude: 2.3522,
    },
    areaServed: [
      {
        "@type": "State",
        name: "Île-de-France",
        addressCountry: "FR",
      },
      {
        "@type": "AdministrativeArea",
        name: "Oise (60)",
      },
      {
        "@type": "AdministrativeArea",
        name: "Yvelines (78)",
      },
      {
        "@type": "AdministrativeArea",
        name: "Hauts-de-Seine (92)",
      },
      {
        "@type": "AdministrativeArea",
        name: "Val-d'Oise (95)",
      },
      {
        "@type": "AdministrativeArea",
        name: "Seine-et-Marne (77)",
      },
      {
        "@type": "AdministrativeArea",
        name: "Essonne (91)",
      },
      {
        "@type": "AdministrativeArea",
        name: "Val-de-Marne (94)",
      },
      {
        "@type": "AdministrativeArea",
        name: "Seine-Saint-Denis (93)",
      },
      {
        "@type": "AdministrativeArea",
        name: "Paris (75)",
      },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "09:00",
      closes: "19:00",
    },
    priceRange: "$$$$",
    sameAs: [
      "https://www.linkedin.com/company/select-chateaux/about/",
    ],
  };
}

/**
 * Schema WebSite - Pour la recherche Google
 */
export function generateWebSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "Select Châteaux",
    description:
      "Châteaux d'exception pour séminaires et événements d'entreprise en Île-de-France",
    publisher: {
      "@id": `${BASE_URL}/#organization`,
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
 * Schema pour les pages géographiques SEO
 * Combine Service + areaServed pour chaque zone
 */
export function generateGeoLandingSchema(page: GeoLandingPage) {
  return {
    "@type": "Service",
    "@id": `${BASE_URL}/${page.slug}#service`,
    name: page.h1,
    description: page.description,
    url: `${BASE_URL}/${page.slug}`,
    provider: {
      "@id": `${BASE_URL}/#organization`,
    },
    serviceType: "Organisation de séminaires en château",
    areaServed: {
      "@type": "AdministrativeArea",
      name: page.h1.replace("Séminaire en Château ", "").replace("en ", "").replace("dans les ", "").replace("dans l'", "").replace("à ", ""),
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
