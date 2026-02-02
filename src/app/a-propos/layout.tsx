import { metadata } from "./metadata";

export { metadata };

export default function AProposLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Schema JSON-LD AboutPage
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "À Propos de Select Châteaux",
    description:
      "Découvrez Select Châteaux, agence spécialisée dans l'organisation de séminaires d'entreprise en châteaux depuis 2009.",
    url: "https://www.selectchateaux.com/a-propos",
    mainEntity: {
      "@type": "Organization",
      "@id": "https://www.selectchateaux.com/#organization",
      name: "Select Châteaux",
      description:
        "Agence spécialisée dans l'organisation de séminaires d'entreprise et événements professionnels dans des châteaux d'exception en Île-de-France",
      foundingDate: "2009",
      numberOfEmployees: {
        "@type": "QuantitativeValue",
        value: "10-50",
      },
      slogan: "L'Excellence Événementielle en Châteaux",
      knowsAbout: [
        "Organisation de séminaires",
        "Événements d'entreprise",
        "Team building",
        "Location de châteaux",
        "Événementiel de luxe",
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "120",
        bestRating: "5",
        worstRating: "1",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      {children}
    </>
  );
}
