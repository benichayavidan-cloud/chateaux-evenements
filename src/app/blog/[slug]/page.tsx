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

  // Calcul du reading progress avec throttle pour performances
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!articleRef.current) {
            ticking = false;
            return;
          }

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

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Articles similaires
  const relatedPosts = getLatestPosts(4).filter(p => p.id !== article.id).slice(0, 3);

  return (
    <div className="brakt-blog min-h-screen bg-white w-full">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
        style={{
          scaleX: scrollYProgress,
          background: 'linear-gradient(to left, var(--brakt-secondary), var(--brakt-primary))'
        }}
      />

      {/* Hero Section */}
      <div className="relative w-full min-h-[50vh] overflow-hidden flex items-center justify-center" style={{ marginBottom: '10px' }}>
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
          className="absolute top-10 left-10 z-20 inline-flex items-center justify-center gap-3 text-white bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-300"
          style={{ padding: '10px' }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Retour au blog</span>
        </Link>

        {/* Title */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Category Badge */}
              <div
                className="inline-flex items-center justify-center gap-3 text-white rounded-full text-xs font-medium mb-10 uppercase tracking-wider"
                style={{
                  padding: '10px',
                  background: 'linear-gradient(to left, var(--brakt-secondary), var(--brakt-primary))'
                }}
              >
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
                {article.category === "organisation" && "Organisation"}
                {article.category === "lieux" && "Lieux & Géographie"}
                {article.category === "team-building" && "Team Building"}
              </div>

              <h1 className="text-5xl md:text-6xl font-light italic text-white mb-8 leading-tight text-center">
                {article.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center justify-center gap-8 text-white/90">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-sm font-bold">
                    {article.author.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{article.author.name}</div>
                    <div className="text-sm text-white/70">{article.author.role}</div>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span className="leading-none">{new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}</span>
                </div>
                <div className="inline-flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4" />
                  <span className="leading-none">{article.readingTime} min de lecture</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content avec Sidebar */}
      <div className="w-full py-20 md:py-32" style={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div className="px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_320px] gap-12 lg:gap-16">
          {/* Sticky Table of Contents (Left) */}
          <aside className="hidden lg:block" style={{
            paddingLeft: '10px',
            paddingBottom: '10px'
          }}>
            <div className="sidebar-sticky bg-white rounded-2xl border border-gray-200" style={{
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
              padding: '20px',
              width: '100%',
              boxSizing: 'border-box',
              overflow: 'hidden'
            }}>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-1.5" style={{
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                maxWidth: '100%'
              }}>
                Sommaire
              </h3>
              <nav className="space-y-0">
                {tableOfContents.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block text-sm py-1.5 border-l-2 transition-all duration-300 ${
                      activeSection === item.id
                        ? "border-[var(--bronze-antique)] text-[var(--bronze-antique)] font-medium pl-4"
                        : "border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900 pl-4"
                    } ${item.level === 3 ? "pl-6" : ""}`}
                    style={{
                      paddingLeft: item.level === 2 ? "1rem" : "1.5rem",
                      marginBottom: '4px',
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word',
                      maxWidth: '100%',
                      boxSizing: 'border-box'
                    }}
                  >
                    {item.title}
                  </a>
                ))}
              </nav>

              {/* Share Buttons */}
              <div className="mt-8 pt-8 border-t border-gray-100" style={{ maxWidth: '100%', boxSizing: 'border-box' }}>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-1.5" style={{
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word',
                  maxWidth: '100%'
                }}>
                  Partager
                </h3>
                <div className="flex items-center gap-1.5">
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
          <article ref={articleRef} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
          }}>
              {/* Excerpt */}
              <p className="text-xl text-gray-600 leading-relaxed mb-12 pb-6 border-b-2 border-gray-100">
                {article.excerpt}
              </p>

              {/* Content */}
              <div className="content-centered">
                <MarkdownRenderer content={article.content} className="prose-lg leading-loose" />
              </div>

              {/* Keywords */}
              <div className="mt-16 pt-6 border-t border-gray-200" style={{ paddingBottom: '10px' }}>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                  Mots-clés
                </h3>
                <div className="flex flex-wrap items-center gap-3">
                  {article.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="inline-flex items-center justify-center bg-gray-100 text-gray-700 rounded-full text-xs hover:text-white transition-all duration-300 cursor-pointer leading-none font-medium"
                      style={{ padding: '10px' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(to left, var(--brakt-secondary), var(--brakt-primary))';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '';
                        e.currentTarget.classList.add('bg-gray-100');
                      }}
                    >
                      #{keyword}
                    </span>
                  ))}
                </div>
              </div>
          </article>

          {/* Sticky CTA (Right) */}
          <aside className="hidden lg:block" style={{
            paddingRight: '10px',
            paddingBottom: '10px'
          }}>
            <div className="sidebar-sticky" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              {/* Progress Indicator */}
              <div className="p-5 bg-gradient-to-br from-gray-50 to-white rounded-t-2xl" style={{
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                marginBottom: '10px'
              }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Progression</span>
                  <span className="text-sm font-bold text-[var(--bronze-antique)]">
                    {Math.round(readingProgress)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden" style={{ marginBottom: '5px' }}>
                  <motion.div
                    className="h-full bg-gradient-to-r from-[var(--bronze-antique)] to-amber-600"
                    style={{ width: `${readingProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center text-center rounded-2xl" style={{
                padding: '15px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                marginBottom: '10px'
              }}>
                <Sparkles className="w-12 h-12 text-[var(--bronze-antique)]" style={{ marginBottom: '5px' }} />
                <h3 className="text-2xl font-light italic" style={{ marginBottom: '5px' }}>
                  Séduit ?
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm" style={{ marginBottom: '5px' }}>
                  Obtenez votre devis personnalisé en 24h. Nos experts vous accompagnent de A à Z.
                </p>
                <Link
                  href="/devis"
                  className="w-full inline-flex items-center justify-center gap-3 text-white rounded-full font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    padding: '10px',
                    background: 'linear-gradient(to left, var(--brakt-secondary), var(--brakt-primary))',
                    marginBottom: '5px'
                  }}
                >
                  <span>Devis Gratuit</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <p className="text-xs text-gray-400 text-center">
                  ✓ Réponse 24h • ✓ Sans engagement
                </p>
              </div>

              {/* Contact Card */}
              <div className="bg-white rounded-b-2xl" style={{
                padding: '15px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
              }}>
                <h4 className="font-semibold text-gray-900 mb-1.5 text-base">
                  Une question ?
                </h4>
                <p className="text-sm text-gray-600 mb-1.5">
                  Nos experts sont disponibles pour vous conseiller.
                </p>
                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-200 hover:border-[var(--brakt-primary)] text-gray-900 rounded-full font-medium transition-all duration-300"
                  style={{ padding: '10px' }}
                >
                  <span>Nous Contacter</span>
                </Link>
              </div>
            </div>
          </aside>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="w-full bg-gradient-to-b from-gray-50 to-white flex flex-col items-center justify-center" style={{
          paddingTop: '15px',
          paddingBottom: '15px'
        }}>
          <div className="max-w-7xl mx-auto px-8 w-full flex flex-col items-center space-y-6">
            <h2 className="text-5xl font-light italic text-gray-900 mb-12 text-center">
              À Lire Aussi
            </h2>
            <div className="grid md:grid-cols-3 gap-8 w-full mx-auto">
              {relatedPosts.map((post) => (
                <article key={post.id} className="post-outer">
                  {/* Image */}
                  <div className="post-thumb">
                    <Link href={`/blog/${post.slug}`}>
                      <Image
                        src={post.image}
                        alt={post.imageAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </Link>
                  </div>

                  {/* Content */}
                  <div className="post-info">
                    {/* Category */}
                    <div className="post-labels">
                      <Link href={`/blog?category=${post.category}`}>
                        {post.category === "organisation" && "Organisation"}
                        {post.category === "lieux" && "Lieux & Géographie"}
                        {post.category === "team-building" && "Team Building"}
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
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readingTime} min</span>
                      </div>
                    </div>

                    {/* Read More Button */}
                    <div className="read-more">
                      <Link href={`/blog/${post.slug}`}>
                        <span>Lire l'article</span>
                        <ArrowRight className="w-4 h-4" style={{
                          display: 'inline-block',
                          marginLeft: '8px',
                          verticalAlign: 'middle'
                        }} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Final */}
      <section className="w-full bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center" style={{
        paddingTop: '40px',
        paddingBottom: '40px'
      }}>
        <div className="max-w-4xl mx-auto px-8 text-center w-full flex flex-col items-center space-y-6">
          <Sparkles className="w-14 h-14 text-[var(--bronze-antique)] mx-auto mb-8" />
          <h2 className="text-5xl font-light italic mb-8 text-center">
            Prêt à Passer à l'Action ?
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed text-center max-w-2xl mx-auto" style={{ marginBottom: '15px' }}>
            Transformez ces insights en un séminaire d'exception pour vos équipes.
          </p>
          <Link
            href="/devis"
            className="inline-flex items-center justify-center gap-3 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl mt-8"
            style={{
              padding: '10px',
              background: 'linear-gradient(to left, var(--brakt-secondary), var(--brakt-primary))',
              marginBottom: '6px'
            }}
          >
            <span>Obtenir mon Devis Gratuit</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-sm text-gray-400 mt-8 text-center">
            ✓ Réponse sous 24h • ✓ Sans engagement • ✓ Conseils personnalisés
          </p>
        </div>
      </section>
    </div>
  );
}
