import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos 4 Châteaux pour Séminaire en Île-de-France | Chantilly, Chevreuse, Paris 92",
  description:
    "Location château séminaire Île-de-France : Manoir 280 pers Chantilly (60), Refuge 5★ accessible métro (92), Abbaye étang Chevreuse (78). Réponse 48h • Visite gratuite",
  keywords: [
    "location chateau seminaire ile de france",
    "chateau seminaire chantilly",
    "chateau seminaire oise 60",
    "location chateau hauts de seine 92",
    "abbaye seminaire yvelines 78",
    "chateau vallée chevreuse",
    "chateau accessible metro paris",
    "manoir anglo normand chantilly",
    "location chateau 280 personnes",
    "chateau monument historique seminaire",
  ],
  metadataBase: new URL('https://www.selectchateaux.com'),
  alternates: {
    canonical: '/chateaux',
  },
  openGraph: {
    type: "website",
    title: "4 Châteaux d'Exception pour Séminaires | Île-de-France",
    description:
      "Découvrez notre sélection exclusive : Manoir de Chantilly (280 pers), Refuge Historique Paris 92, Abbaye Vallée de Chevreuse. Réservation sous 48h.",
    url: "https://www.selectchateaux.com/chateaux",
    siteName: "Select Châteaux",
    locale: "fr_FR",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Châteaux pour séminaires en Île-de-France - Select Châteaux",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "4 Châteaux d'Exception | Séminaires Île-de-France",
    description: "Manoir Chantilly, Refuge Paris 92, Abbaye Chevreuse. Réservation express.",
    images: ["/og-image.jpg"]
  },
};

export default function ChateauxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Châteaux pour Séminaires en Île-de-France",
    "description": "Notre collection de 4 châteaux d'exception pour vos événements d'entreprise en Île-de-France",
    "numberOfItems": 4,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Place",
          "name": "Le Manoir Anglo-Normand & Son Parc (Chantilly)",
          "description": "Le plus vaste Château-Hôtel de la région. Un manoir style anglo-normand niché au cœur d'une forêt privée, à 35 min de Paris. Idéal pour les grands groupes avec amphithéâtre et spa.",
          "address": {
            "@type": "PostalAddress",
            "addressRegion": "Oise",
            "postalCode": "60",
            "addressCountry": "FR"
          },
          "maximumAttendeeCapacity": 280,
          "amenityFeature": [
            {
              "@type": "LocationFeatureSpecification",
              "name": "Amphithéâtre",
              "value": true
            },
            {
              "@type": "LocationFeatureSpecification",
              "name": "Spa Nuxe 800m²",
              "value": true
            },
            {
              "@type": "LocationFeatureSpecification",
              "name": "100+ Chambres",
              "value": true
            }
          ],
          "url": "https://www.selectchateaux.com/chateaux/manoir-anglo-normand-chantilly",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "120",
            "bestRating": "5",
            "worstRating": "1"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Place",
          "name": "Le Refuge Historique Suspendu (Portes de Paris)",
          "description": "Un secret gardé aux portes de Paris (92). Bâtisse du XVIIe siècle en hôtel 5 étoiles, calme monacal et vue imprenable. Idéal pour CODIR stratégique accessible en métro.",
          "address": {
            "@type": "PostalAddress",
            "addressRegion": "Hauts-de-Seine",
            "postalCode": "92",
            "addressCountry": "FR"
          },
          "maximumAttendeeCapacity": 180,
          "starRating": {
            "@type": "Rating",
            "ratingValue": "5"
          },
          "amenityFeature": [
            {
              "@type": "LocationFeatureSpecification",
              "name": "Hôtel 5 Étoiles",
              "value": true
            },
            {
              "@type": "LocationFeatureSpecification",
              "name": "Jardin Suspendu",
              "value": true
            },
            {
              "@type": "LocationFeatureSpecification",
              "name": "Accessible en métro",
              "value": true
            }
          ],
          "url": "https://www.selectchateaux.com/chateaux/hotel-historique-seminaire-paris-92",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "120",
            "bestRating": "5",
            "worstRating": "1"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Place",
          "name": "L'Abbaye Millénaire & Son Étang (78)",
          "description": "Déconnexion radicale en Vallée de Chevreuse. Une abbaye cistercienne monumentale, ruines romantiques et étang privé. Le lieu ultime pour l'effet 'Wow'.",
          "address": {
            "@type": "PostalAddress",
            "addressRegion": "Yvelines",
            "postalCode": "78",
            "addressCountry": "FR"
          },
          "maximumAttendeeCapacity": 150,
          "amenityFeature": [
            {
              "@type": "LocationFeatureSpecification",
              "name": "Site Classé Monument Historique",
              "value": true
            },
            {
              "@type": "LocationFeatureSpecification",
              "name": "Salles Voûtées",
              "value": true
            },
            {
              "@type": "LocationFeatureSpecification",
              "name": "Étang 70 hectares",
              "value": true
            }
          ],
          "url": "https://www.selectchateaux.com/chateaux/abbaye-millenaire-vallee-chevreuse",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "120",
            "bestRating": "5",
            "worstRating": "1"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "Place",
          "name": "Le Palais Royal de la Forêt (Chantilly)",
          "description": "Le Versailles de l'Oise. Un palais royal style Louis XV au cœur d'une forêt de 500 hectares. Lustres de cristal, moulures dorées et spa haut de gamme pour vos événements les plus prestigieux.",
          "address": {
            "@type": "PostalAddress",
            "addressRegion": "Oise",
            "postalCode": "60",
            "addressCountry": "FR"
          },
          "maximumAttendeeCapacity": 350,
          "starRating": {
            "@type": "Rating",
            "ratingValue": "5"
          },
          "amenityFeature": [
            {
              "@type": "LocationFeatureSpecification",
              "name": "Style Louis XV",
              "value": true
            },
            {
              "@type": "LocationFeatureSpecification",
              "name": "Ballrooms & Lustres de Cristal",
              "value": true
            },
            {
              "@type": "LocationFeatureSpecification",
              "name": "Spa Prestige 1500m²",
              "value": true
            },
            {
              "@type": "LocationFeatureSpecification",
              "name": "Forêt 500 hectares",
              "value": true
            }
          ],
          "url": "https://www.selectchateaux.com/chateaux/palais-royal-foret-chantilly",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "120",
            "bestRating": "5",
            "worstRating": "1"
          }
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  );
}
