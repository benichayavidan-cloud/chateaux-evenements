/**
 * PAGE AUTEUR — L'équipe Select Châteaux (E-E-A-T).
 * Entité auteur unique du blog : bio, expertise, derniers articles,
 * schema Person relié à l'Organization.
 */

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { EQUIPE_SELECT, AUTHOR_PAGE_PATH } from "@/data/authors";
import { blogPosts } from "@/data/blog-posts";
import { StructuredData } from "@/components/StructuredData";

const BASE_URL = "https://www.selectchateaux.com";

export const metadata: Metadata = {
  // `absolute` : le titre porte déjà le nom de la marque. Sans cela, le
  // gabarit racine ajoutait son suffixe et servait « L'équipe Select Châteaux
  // | Select Châteaux ».
  title: { absolute: "L'équipe Select Châteaux, auteur du blog" },
  description:
    "Qui écrit le blog Select Châteaux : l'équipe de l'agence, à partir des 188 devis réellement traités en 2025-2026. Expertise et derniers articles.",
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
      "@type": "Organization",
      "@id": `${BASE_URL}${AUTHOR_PAGE_PATH}#person`,
      name: EQUIPE_SELECT.name,
      description: EQUIPE_SELECT.bio,
      url: `${BASE_URL}${AUTHOR_PAGE_PATH}`,
      knowsAbout: EQUIPE_SELECT.expertise,
      "sameAs": [
        "https://www.linkedin.com/company/select-chateaux/about/",
        "https://www.google.com/maps?cid=13719107096971699386",
      ],
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <StructuredData data={structuredData} />

      {/* En-tête auteur */}
      <section className="bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:py-20 text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[var(--bronze-antique)] text-3xl font-semibold text-white">
            {EQUIPE_SELECT.avatar}
          </div>
          <h1 className="text-3xl sm:text-4xl font-light text-gray-900">
            {EQUIPE_SELECT.name}
          </h1>
          <p className="mt-2 text-base sm:text-lg font-medium text-[var(--bronze-antique)]">
            {EQUIPE_SELECT.role} · Select Châteaux
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-left text-base leading-relaxed" style={{ color: "#374151" }}>
            {EQUIPE_SELECT.bio}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {EQUIPE_SELECT.expertise.map((item) => (
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
              Parler de votre projet — devis gratuit sous 48h
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
                  <p className="mt-2 line-clamp-2 text-sm" style={{ color: "#4B5563" }}>
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
    </div>
  );
}
