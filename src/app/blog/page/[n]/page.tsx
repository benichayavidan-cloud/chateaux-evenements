/**
 * PAGINATION BLOG — /blog/page/[n] (n ≥ 2, la page 1 vit sur /blog).
 * Pages statiques : la grille des articles est crawlable sans JavaScript.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndexView } from "../../blog-index-view";
import { getBlogTotalPages } from "../../pagination";

interface BlogPaginationPageProps {
  params: Promise<{ n: string }>;
}

function parsePageNumber(n: string): number | null {
  const page = Number(n);
  if (!Number.isInteger(page) || page < 2 || page > getBlogTotalPages()) {
    return null;
  }
  return page;
}

// Toutes les pages valides sont connues au build → un n inconnu doit être
// un VRAI 404 routeur (sans dynamicParams=false, le streaming committerait
// un statut 200 avant le notFound() = soft 404).
export const dynamicParams = false;

export function generateStaticParams() {
  return Array.from({ length: getBlogTotalPages() - 1 }, (_, i) => ({
    n: String(i + 2),
  }));
}

export async function generateMetadata({ params }: BlogPaginationPageProps): Promise<Metadata> {
  const { n } = await params;
  const page = parsePageNumber(n);
  if (!page) return {};
  return {
    title: `Blog & Magazine Événementiel — Page ${page}`,
    description: `Guides séminaires, lieux et team building en château — page ${page} de nos articles.`,
    alternates: { canonical: `/blog/page/${page}` },
  };
}

export default async function BlogPaginationPage({ params }: BlogPaginationPageProps) {
  const { n } = await params;
  const page = parsePageNumber(n);
  if (!page) notFound();
  return <BlogIndexView page={page} />;
}
