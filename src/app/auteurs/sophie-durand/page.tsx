/**
 * PAGE AUTEUR — Sophie Durand (E-E-A-T).
 * Entité auteur unique du blog : bio, expertise, derniers articles,
 * schema Person relié à l'Organization.
 */

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SOPHIE_DURAND, AUTHOR_PAGE_PATH } from "@/data/authors";
import { blogPosts } from "@/data/blog-posts";
import { StructuredData } from "@/components/StructuredData";

const BASE_URL = "https://www.selectchateaux.com";

export const metadata: Metadata = {
  title: `${SOPHIE_DURAND.name}, ${SOPHIE_DURAND.role}`,
  description:
    "Sophie Durand accompagne les entreprises depuis 10+ ans dans l'organisation de séminaires en château en Île-de-France. Bio, expertise et derniers articles.",
  alternates: { canonical: AUTHOR_PAGE_PATH },
};

export default function AuthorPage() {
  const articles = [...blogPosts]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 9);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      "@id": `${BASE_URL}${AUTHOR_PAGE_PATH}#person`,
      name: SOPHIE_DURAND.name,
      jobTitle: SOPHIE_DURAND.role,
      description: SOPHIE_DURAND.bio,
      url: `${BASE_URL}${AUTHOR_PAGE_PATH}`,
      knowsAbout: SOPHIE_DURAND.expertise,
      worksFor: {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "Select Châteaux",
      },
    },
  };

  return (
    <main className="min-h-screen bg-white">
      <StructuredData data={structuredData} />

      {/* En-tête auteur */}
      <section className="bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:py-20 text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[var(--bronze-antique)] text-3xl font-semibold text-white">
            {SOPHIE_DURAND.avatar}
          </div>
          <h1 className="text-3xl sm:text-4xl font-light text-gray-900">
            {SOPHIE_DURAND.name}
          </h1>
          <p className="mt-2 text-base sm:text-lg font-medium text-[var(--bronze-antique)]">
            {SOPHIE_DURAND.role} · Select Châteaux
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-left text-base leading-relaxed text-gray-700">
            {SOPHIE_DURAND.bio}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {SOPHIE_DURAND.expertise.map((item) => (
              <span
                key={item}
                className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm text-gray-700"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/devis#formulaire"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--bronze-antique)] px-8 py-3 font-semibold text-white transition-all hover:bg-amber-700"
            >
              Demander conseil à Sophie — devis gratuit 24h
            </Link>
          </div>
        </div>
      </section>

      {/* Derniers articles */}
      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <h2 className="mb-8 text-center text-2xl sm:text-3xl font-light text-gray-900">
          Ses derniers articles
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((post) => (
            <article
              key={post.id}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative h-40 w-full">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold leading-snug text-gray-900">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="text-sm font-semibold text-[var(--bronze-antique)] underline underline-offset-4"
          >
            Voir tous les articles du blog
          </Link>
        </div>
      </section>
    </main>
  );
}
