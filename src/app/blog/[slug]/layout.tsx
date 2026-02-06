import type { Metadata } from "next";
import { getBlogPostBySlug } from "@/data/blog-posts";

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogPostBySlug(slug);

  if (!article) {
    return {
      title: "Article introuvable | Blog Select Châteaux",
    };
  }

  const canonicalUrl = `https://www.selectchateaux.com/blog/${article.slug}`;

  return {
    title: `${article.title} | Blog Select Châteaux`,
    description: article.excerpt,
    robots: {
      index: true,
      follow: true,
    },
    keywords: article.keywords,
    authors: [{ name: article.author.name }],
    metadataBase: new URL("https://www.selectchateaux.com"),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url: canonicalUrl,
      siteName: "Select Châteaux",
      locale: "fr_FR",
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default async function BlogArticleLayout({ children, params }: Props) {
  const { slug } = await params;
  const article = getBlogPostBySlug(slug);

  // Si l'article n'existe pas, retourner sans schemas
  if (!article) {
    return <>{children}</>;
  }

  // Schema JSON-LD Article (BlogPosting)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.excerpt,
    "image": `https://www.selectchateaux.com${article.image}`,
    "datePublished": article.publishedAt,
    "dateModified": article.publishedAt,
    "author": {
      "@type": "Person",
      "name": article.author.name,
      "jobTitle": article.author.role
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://www.selectchateaux.com/#organization",
      "name": "Select Châteaux",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.selectchateaux.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.selectchateaux.com/blog/${article.slug}`
    },
    "keywords": article.keywords.join(", "),
    "articleSection": article.category,
    "wordCount": Math.floor(article.content.length / 6), // Estimation
    "inLanguage": "fr-FR"
  };

  // Schema JSON-LD Breadcrumb
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": "https://www.selectchateaux.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://www.selectchateaux.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": `https://www.selectchateaux.com/blog/${article.slug}`
      }
    ]
  };

  return (
    <>
      {/* Schema JSON-LD Article - Invisible pour l'utilisateur, crucial pour SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Schema JSON-LD Breadcrumb - Pour rich snippets Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {children}
    </>
  );
}
