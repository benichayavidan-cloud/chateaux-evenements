import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Magazine Événementiel | Guides Séminaires Châteaux",
  description:
    "Guides complets, études de cas, et tendances pour organiser des séminaires d'exception en château : organisation, lieux, team building. Conseils d'experts Select Châteaux.",
  keywords: [
    "blog séminaire château",
    "guide organisation séminaire",
    "blog événement entreprise",
    "magazine événementiel",
    "conseils team building",
    "organiser séminaire château",
    "blog tourisme affaires",
    "lieux séminaire île-de-france",
  ],
  metadataBase: new URL("https://www.selectchateaux.com"),
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    title: "L'Inspiration Événementiel | Blog Select Châteaux",
    description:
      "Découvrez nos guides, études de cas, et conseils d'experts pour organiser des séminaires d'exception dans des châteaux d'Île-de-France.",
    url: "https://www.selectchateaux.com/blog",
    siteName: "Select Châteaux",
    locale: "fr_FR",
    images: [
      {
        url: "/og-blog.jpg",
        width: 1200,
        height: 630,
        alt: "Blog Select Châteaux - L'Inspiration Événementiel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "L'Inspiration Événementiel | Blog Select Châteaux",
    description: "Guides, conseils, et tendances pour vos séminaires en château.",
    images: ["/og-blog.jpg"],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Schema JSON-LD Blog
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blog Select Châteaux - L'Inspiration Événementiel",
    "description": "Magazine digital dédié à l'organisation de séminaires et événements d'entreprise dans des châteaux d'exception.",
    "url": "https://www.selectchateaux.com/blog",
    "publisher": {
      "@type": "Organization",
      "@id": "https://www.selectchateaux.com/#organization",
      "name": "Select Châteaux"
    },
    "inLanguage": "fr-FR"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      {children}
    </>
  );
}
