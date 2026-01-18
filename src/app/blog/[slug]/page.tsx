"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Share2, Bookmark, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import { getBlogPostBySlug, getLatestPosts, BlogPost } from "@/data/blog-posts";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";

export default function BlogArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const article = getBlogPostBySlug(slug);

  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [tableOfContents, setTableOfContents] = useState<{ id: string; title: string; level: number }[]>([]);

  const articleRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();

  if (!article) {
    notFound();
  }

  // Extraire Table of Contents depuis le contenu HTML
  useEffect(() => {
    if (articleRef.current) {
      const headings = articleRef.current.querySelectorAll("h2, h3");
      const toc = Array.from(headings).map((heading, index) => {
        const id = `section-${index}`;
        heading.id = id;
        return {
          id,
          title: heading.textContent || "",
          level: parseInt(heading.tagName.substring(1))
        };
      });
      setTableOfContents(toc);
    }
  }, [article.content]);

  // Calcul du reading progress
  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;

      const articleTop = articleRef.current.offsetTop;
      const articleHeight = articleRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      const progress = Math.min(
        Math.max(((scrollTop - articleTop + windowHeight) / articleHeight) * 100, 0),
        100
      );
      setReadingProgress(progress);

      // Détection de la section active
      const sections = articleRef.current.querySelectorAll("h2, h3");
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i] as HTMLElement;
        if (section.offsetTop <= scrollTop + 200) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Articles similaires
  const relatedPosts = getLatestPosts(4).filter(p => p.id !== article.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[var(--bronze-antique)] z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />

        {/* Back Button */}
        <Link
          href="/blog"
          className="absolute top-8 left-8 z-20 flex items-center gap-2 text-white bg-white/10 backdrop-blur-md px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour au blog</span>
        </Link>

        {/* Title */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full max-w-4xl mx-auto px-6 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 bg-[var(--bronze-antique)] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
                {article.category === "organisation" && "Organisation"}
                {article.category === "lieux" && "Lieux & Géographie"}
                {article.category === "team-building" && "Team Building"}
              </div>

              <h1 className="text-5xl md:text-6xl font-light italic text-white mb-6 leading-tight">
                {article.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-sm font-bold">
                    {article.author.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{article.author.name}</div>
                    <div className="text-sm text-white/70">{article.author.role}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4" />
                  {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4" />
                  {article.readingTime} min de lecture
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content avec Sidebar */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr_300px] gap-12">
          {/* Sticky Table of Contents (Left) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                Sommaire
              </h3>
              <nav className="space-y-2">
                {tableOfContents.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block text-sm py-2 border-l-2 transition-all duration-300 ${
                      activeSection === item.id
                        ? "border-[var(--bronze-antique)] text-[var(--bronze-antique)] font-medium pl-4"
                        : "border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900 pl-4"
                    } ${item.level === 3 ? "pl-6" : ""}`}
                    style={{
                      paddingLeft: item.level === 2 ? "1rem" : "1.5rem"
                    }}
                  >
                    {item.title}
                  </a>
                ))}
              </nav>

              {/* Share Buttons */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                  Partager
                </h3>
                <div className="flex gap-3">
                  <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[var(--bronze-antique)] hover:text-white transition-colors duration-300 flex items-center justify-center">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[var(--bronze-antique)] hover:text-white transition-colors duration-300 flex items-center justify-center">
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Article Content (Center) */}
          <article ref={articleRef} className="max-w-3xl">
            {/* Excerpt */}
            <p className="text-xl text-gray-600 leading-relaxed mb-12 pb-8 border-b-2 border-gray-100">
              {article.excerpt}
            </p>

            {/* Content */}
            <MarkdownRenderer content={article.content} />

            {/* Keywords */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                Mots-clés
              </h3>
              <div className="flex flex-wrap gap-2">
                {article.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-[var(--bronze-antique)] hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    #{keyword}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* Sticky CTA (Right) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              {/* Progress Indicator */}
              <div className="mb-8 p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Progression</span>
                  <span className="text-sm font-bold text-[var(--bronze-antique)]">
                    {Math.round(readingProgress)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[var(--bronze-antique)] to-amber-600"
                    style={{ width: `${readingProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* CTA Card */}
              <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl text-white shadow-2xl">
                <Sparkles className="w-10 h-10 text-[var(--bronze-antique)] mb-4" />
                <h3 className="text-2xl font-light italic mb-3">
                  Séduit ?
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed text-sm">
                  Obtenez votre devis personnalisé en 24h. Nos experts vous accompagnent de A à Z.
                </p>
                <Link
                  href="/devis"
                  className="w-full flex items-center justify-center gap-2 bg-[var(--bronze-antique)] hover:bg-amber-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
                >
                  <span>Devis Gratuit</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <p className="text-xs text-gray-400 mt-4 text-center">
                  ✓ Réponse 24h • ✓ Sans engagement
                </p>
              </div>

              {/* Contact Card */}
              <div className="mt-6 p-6 bg-white rounded-2xl border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 text-sm">
                  Une question ?
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  Nos experts sont disponibles pour vous conseiller.
                </p>
                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-200 hover:border-[var(--bronze-antique)] text-gray-900 px-6 py-3 rounded-full font-medium transition-all duration-300"
                >
                  <span>Nous Contacter</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-light italic text-gray-900 mb-12 text-center">
              À Lire Aussi
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <article className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.imageAlt}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <div className="inline-flex items-center gap-2 text-xs font-medium text-[var(--bronze-antique)] mb-3">
                        <span className="w-1.5 h-1.5 bg-[var(--bronze-antique)] rounded-full" />
                        {post.category === "organisation" && "Organisation"}
                        {post.category === "lieux" && "Lieux & Géographie"}
                        {post.category === "team-building" && "Team Building"}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight line-clamp-2 group-hover:text-[var(--bronze-antique)] transition-colors duration-300">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readingTime} min
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Final */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Sparkles className="w-12 h-12 text-[var(--bronze-antique)] mx-auto mb-6" />
          <h2 className="text-4xl font-light italic mb-6">
            Prêt à Passer à l'Action ?
          </h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Transformez ces insights en un séminaire d'exception pour vos équipes.
          </p>
          <Link
            href="/devis"
            className="inline-flex items-center gap-3 bg-[var(--bronze-antique)] hover:bg-amber-700 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <span>Obtenir mon Devis Gratuit</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-sm text-gray-400 mt-6">
            ✓ Réponse sous 24h • ✓ Sans engagement • ✓ Conseils personnalisés
          </p>
        </div>
      </section>
    </div>
  );
}
