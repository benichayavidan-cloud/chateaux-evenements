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

export default function BlogArticleLayout({ children }: Props) {
  return <>{children}</>;
}
