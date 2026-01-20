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
    <main className="brakt-blog min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="w-full relative min-h-[50vh] overflow-hidden flex items-center justify-center py-20 md:py-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}/>
        </div>

        <div className="w-full max-w-4xl px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center flex flex-col gap-6 w-full items-center justify-center space-y-6"
          >
            {/* Badge */}
            <div
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[var(--bronze-antique)]/20 to-amber-600/20 backdrop-blur-sm rounded-full border-2 border-[var(--bronze-antique)]/50 self-center shadow-md"
              style={{ padding: '8px' }}
            >
              <Sparkles className="w-5 h-5 text-[var(--bronze-antique)]" />
              <span className="text-sm font-medium text-gray-900 tracking-wide">
                Magazine Digital
              </span>
            </div>

            {/* H1 */}
            <h1 className="text-6xl md:text-7xl font-light italic text-gray-900 leading-tight text-center whitespace-nowrap">
              L'Inspiration Événementiel
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed text-center max-w-none mx-auto whitespace-nowrap">
              Guides, études de cas, et tendances pour organiser des séminaires d'exception.
            </p>

            {/* Search Bar */}
            <div className="relative w-[450px] mx-auto flex items-center justify-center mt-8">
              <Search className="absolute right-6 text-gray-400 w-5 h-5 pointer-events-none z-10" />
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-6 pr-14 rounded-2xl border-2 border-gray-200 focus:border-[var(--bronze-antique)] focus:ring-4 focus:ring-[var(--bronze-antique)]/10 outline-none transition-all duration-300 text-base shadow-lg"
                style={{ padding: '8px' }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="w-full flex justify-center items-center px-8 py-20 md:py-32">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-20">
          {/* Filtres Catégories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-5"
          >
          <div className="inline-flex items-center gap-4 text-gray-600 mr-8">
            <Filter className="w-6 h-6" />
            <span className="text-base font-medium leading-none">Filtrer par :</span>
          </div>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`inline-flex items-center justify-center rounded-full font-medium text-sm transition-all duration-300 leading-none ${
                selectedCategory === cat.value
                  ? "bg-[var(--bronze-antique)] text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 border-2 border-gray-200 hover:border-[var(--bronze-antique)] hover:text-[var(--bronze-antique)]"
              }`}
              style={{ padding: '8px' }}
            >
              <span className="flex items-center gap-2">
                {cat.label}
                {cat.value !== "all" && (
                  <span className="text-xs opacity-70">
                    ({getBlogPostsByCategory(cat.value as BlogCategory).length})
                  </span>
                )}
              </span>
            </button>
          ))}
          </motion.div>

          {/* Featured Post - Style Brakt */}
          {!searchQuery && selectedCategory === "all" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="post-outer featured-post w-full"
              style={{ padding: '15px' }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">
                {/* Image */}
                <Link href={`/blog/${featuredPost.slug}`} className="post-thumb" style={{ height: '600px' }}>
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Featured Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '30px',
                    left: '30px',
                    background: 'var(--bronze-antique)',
                    color: '#fff',
                    padding: '10px 20px',
                    borderRadius: '50px',
                    fontSize: '12px',
                    fontWeight: '600',
                    boxShadow: '0 5px 10px rgba(0,0,0,0.2)',
                    zIndex: 10
                  }}>
                    ⭐ À la Une
                  </div>
                </Link>

                {/* Content */}
                <div className="post-info" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: '25px',
                  textAlign: 'left'
                }}>
                  {/* Category */}
                  <div className="post-labels" style={{ marginBottom: 0 }}>
                    <Link href={`/blog?category=${featuredPost.category}`} style={{
                      color: 'var(--bronze-antique)',
                      textDecoration: 'none'
                    }}>
                      {CATEGORIES.find(c => c.value === featuredPost.category)?.label}
                    </Link>
                  </div>

                  {/* Title */}
                  <h2 className="post-title" style={{
                    fontSize: '32px',
                    lineHeight: '1.3',
                    marginBottom: 0,
                    textAlign: 'left'
                  }}>
                    <Link href={`/blog/${featuredPost.slug}`} style={{ color: 'var(--brakt-text)', textDecoration: 'none' }}>
                      {featuredPost.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  <div className="post-snippet" style={{
                    fontSize: '15px',
                    lineHeight: '1.8',
                    marginBottom: 0
                  }}>
                    {featuredPost.excerpt}
                  </div>

                  {/* Meta */}
                  <div className="post-meta" style={{
                    justifyContent: 'flex-start',
                    marginBottom: 0
                  }}>
                    <div className="post-meta-item">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(featuredPost.publishedAt).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}</span>
                    </div>
                    <div className="post-meta-item">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{featuredPost.readingTime} min</span>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <div className="read-more" style={{ marginTop: '10px' }}>
                    <Link href={`/blog/${featuredPost.slug}`}>
                      <span>Lire l'article</span>
                      <ArrowRight className="w-4 h-4" style={{
                        display: 'inline-block',
                        marginLeft: '8px',
                        verticalAlign: 'middle'
                      }} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Articles Grid - Brakt Style */}
          {filteredPosts.length > 0 ? (
            <div className="brakt-main-content grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mx-auto">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="post-outer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Image */}
                <div className="post-thumb">
                  <Link href={`/blog/${post.slug}`}>
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </Link>
                </div>

                {/* Content */}
                <div className="post-info">
                  {/* Category */}
                  <div className="post-labels">
                    <Link href={`/blog?category=${post.category}`}>
                      {CATEGORIES.find(c => c.value === post.category)?.label}
                    </Link>
                  </div>

                  {/* Title */}
                  <h3 className="post-title">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <div className="post-snippet">
                    {post.excerpt}
                  </div>

                  {/* Meta */}
                  <div className="post-meta">
                    <div className="post-meta-item">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}</span>
                    </div>
                    <div className="post-meta-item">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readingTime} min</span>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <div className="read-more">
                    <Link href={`/blog/${post.slug}`}>
                      <span>Lire l'article</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 w-full flex flex-col items-center"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-light text-gray-900 mb-2 text-center">Aucun article trouvé</h3>
              <p className="text-gray-600 text-center">
                Essayez de modifier vos filtres ou votre recherche.
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <section className="w-full bg-gradient-to-br from-gray-900 to-gray-800 text-white flex justify-center items-center" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
        <div className="w-full max-w-4xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6 space-y-6"
          >
            <Sparkles className="w-14 h-14 text-[var(--bronze-antique)] mx-auto" />
            <h2 className="text-5xl font-light italic text-center">
              Inspiré par nos articles ?
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto text-center">
              Transformez l'inspiration en réalité. Obtenez un devis personnalisé pour votre prochain séminaire en château.
            </p>
            <Link
              href="/devis"
              className="inline-flex items-center justify-center gap-3 bg-[var(--bronze-antique)] hover:bg-amber-700 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl mt-8"
              style={{ padding: '10px' }}
            >
              <span>Demander un Devis Gratuit</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-sm text-gray-400">
              ✓ Réponse sous 24h • ✓ Sans engagement • ✓ Conseils d'experts inclus
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
