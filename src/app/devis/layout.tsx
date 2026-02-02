import { metadata } from "./metadata";

export { metadata };

export default function DevisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Schema JSON-LD QuoteAction
  const quoteActionSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Demande de Devis Séminaire Château",
    description: "Recevez votre devis personnalisé sous 24h pour votre séminaire en Île-de-France.",
    mainEntity: {
      "@type": "Service",
      name: "Organisation de Séminaires d'Entreprise",
      provider: {
        "@type": "Organization",
        name: "Select Châteaux",
        image: "https://www.selectchateaux.com/logo.png",
      },
      potentialAction: {
        "@type": "QuoteAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://www.selectchateaux.com/devis",
          inLanguage: "fr-FR",
          actionPlatform: [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform",
          ],
        },
        result: {
          "@type": "Quote",
          availability: "https://schema.org/InStock",
        },
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quoteActionSchema) }}
      />
      {children}
    </>
  );
}
