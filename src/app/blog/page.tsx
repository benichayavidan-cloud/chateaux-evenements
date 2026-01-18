"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Calendar, Clock, ArrowRight, Sparkles, Filter } from "lucide-react";
import { blogPosts, BlogCategory, getLatestPosts, getBlogPostsByCategory } from "@/data/blog-posts";

const CATEGORIES: { value: BlogCategory | "all"; label: string; color: string }[] = [
  { value: "all", label: "Tous les articles", color: "gray" },
  { value: "organisation", label: "Organisation", color: "blue" },
  { value: "lieux", label: "Lieux & Géographie", color: "green" },
  { value: "team-building", label: "Team Building", color: "purple" }
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | "all">("all");

  // Featured post (le plus récent avec featured=true)
  const featuredPost = blogPosts.find(post => post.featured) || blogPosts[0];

  // Posts filtrés
  const filteredPosts = useMemo(() => {
    let posts = selectedCategory === "all"
      ? blogPosts
      : getBlogPostsByCategory(selectedCategory);

    if (searchQuery) {
      posts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Exclure le featured post de la grille
    return posts.filter(post => post.id !== featuredPost.id);
  }, [searchQuery, selectedCategory, featuredPost.id]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}/>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--bronze-antique)]/10 to-amber-600/10 backdrop-blur-sm px-6 py-3 rounded-full border border-[var(--bronze-antique)]/20 mb-8">
              <Sparkles className="w-5 h-5 text-[var(--bronze-antique)]" />
              <span className="text-sm font-medium text-gray-900 tracking-wide">
                Magazine Digital
              </span>
            </div>

            {/* H1 */}
            <h1 className="text-6xl md:text-7xl font-light italic text-gray-900 mb-6 leading-tight">
              L'Inspiration<br />Événementiel
            </h1>

            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Guides, études de cas, et tendances pour organiser des séminaires d'exception.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher un article, un lieu, une activité..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-5 rounded-2xl border-2 border-gray-200 focus:border-[var(--bronze-antique)] focus:ring-4 focus:ring-[var(--bronze-antique)]/10 outline-none transition-all duration-300 text-lg shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* Filtres Catégories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          <div className="flex items-center gap-2 text-gray-600 mr-4">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filtrer par :</span>
          </div>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${
                selectedCategory === cat.value
                  ? "bg-[var(--bronze-antique)] text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 border-2 border-gray-200 hover:border-[var(--bronze-antique)] hover:text-[var(--bronze-antique)]"
              }`}
            >
              {cat.label}
              {cat.value !== "all" && (
                <span className="ml-2 text-xs opacity-70">
                  ({getBlogPostsByCategory(cat.value as BlogCategory).length})
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Featured Post */}
        {!searchQuery && selectedCategory === "all" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-20"
          >
            <Link href={`/blog/${featuredPost.slug}`}>
              <div className="group relative overflow-hidden rounded-3xl bg-white shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="relative h-[400px] md:h-auto overflow-hidden">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.imageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Featured Badge */}
                    <div className="absolute top-6 left-6 bg-[var(--bronze-antique)] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      ⭐ À la Une
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-10 md:p-12 flex flex-col justify-center">
                    {/* Category */}
                    <div className="inline-flex items-center gap-2 text-sm font-medium text-[var(--bronze-antique)] mb-4">
                      <span className="w-2 h-2 bg-[var(--bronze-antique)] rounded-full" />
                      {CATEGORIES.find(c => c.value === featuredPost.category)?.label}
                    </div>

                    {/* Title */}
                    <h2 className="text-4xl font-light italic text-gray-900 mb-4 leading-tight group-hover:text-[var(--bronze-antique)] transition-colors duration-300">
                      {featuredPost.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(featuredPost.publishedAt).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readingTime} min
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-[var(--bronze-antique)] font-medium group-hover:gap-4 transition-all duration-300">
                      <span>Lire l'article</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Articles Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <article className="group h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100">
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.imageAlt}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Glassmorphism overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Category */}
                      <div className="inline-flex items-center gap-2 text-xs font-medium text-[var(--bronze-antique)] mb-3">
                        <span className="w-1.5 h-1.5 bg-[var(--bronze-antique)] rounded-full" />
                        {CATEGORIES.find(c => c.value === post.category)?.label}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight line-clamp-2 group-hover:text-[var(--bronze-antique)] transition-colors duration-300">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readingTime} min
                        </div>
                        <div className="flex items-center gap-2 text-[var(--bronze-antique)] font-medium group-hover:gap-3 transition-all duration-300">
                          <span>Lire</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-light text-gray-900 mb-2">Aucun article trouvé</h3>
            <p className="text-gray-600">
              Essayez de modifier vos filtres ou votre recherche.
            </p>
          </motion.div>
        )}
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-12 h-12 text-[var(--bronze-antique)] mx-auto mb-6" />
            <h2 className="text-4xl font-light italic mb-6">
              Inspiré par nos articles ?
            </h2>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Transformez l'inspiration en réalité. Obtenez un devis personnalisé pour votre prochain séminaire en château.
            </p>
            <Link
              href="/devis"
              className="inline-flex items-center gap-3 bg-[var(--bronze-antique)] hover:bg-amber-700 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <span>Demander un Devis Gratuit</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-sm text-gray-400 mt-6">
              ✓ Réponse sous 24h • ✓ Sans engagement • ✓ Conseils d'experts inclus
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
