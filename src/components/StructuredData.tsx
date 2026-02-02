/**
 * STRUCTURED DATA COMPONENT - SEO 2026
 * Composant wrapper pour injecter les données structurées Schema.org
 */

interface StructuredDataProps {
  data: object | object[];
}

export function StructuredData({ data }: StructuredDataProps) {
  const schemas = Array.isArray(data) ? data : [data];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemas, null, 0),
      }}
      suppressHydrationWarning
    />
  );
}
