"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { getBlogPostBySlug, getLatestPosts, BlogPost } from "@/data/blog-posts";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";
import { ArticleHero } from "@/components/blog/ArticleHero";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ArticleSidebar } from "@/components/blog/ArticleSidebar";

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
      <ArticleHero article={article} />

      {/* Main Content avec Sidebar */}
      <div className="w-full py-12 md:py-20 lg:py-24 flex justify-center items-start">
        <div className="max-w-[1350px] px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(250px,280px)_1fr_minmax(280px,320px)] xl:grid-cols-[300px_1fr_320px] gap-8 xl:gap-12 max-w-fit mx-auto" style={{ paddingTop: '15px', paddingBottom: '15px' }}>
          {/* Sticky Table of Contents (Left) */}
          <TableOfContents items={tableOfContents} activeSection={activeSection} />

          {/* Article Content (Center) */}
          <article ref={articleRef} className="w-full">
            <div className="max-w-[750px] mx-auto space-y-12 px-4 sm:px-6">
              {/* Excerpt */}
              <p className="text-xl text-gray-600 leading-relaxed pb-6 border-b-2 border-gray-100" style={{ marginBottom: '10px' }}>
                {article.excerpt}
              </p>

              {/* Content */}
              <MarkdownRenderer content={article.content} className="prose-lg" />

              {/* Keywords */}
              <div className="mt-16 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider" style={{ marginBottom: '5px' }}>
                  Mots-clés
                </h3>
                <div className="flex flex-wrap items-center gap-3">
                  {article.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="inline-flex items-center justify-center bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gradient-to-l hover:from-amber-600 hover:to-[#d4af37] hover:text-white transition-all duration-300 cursor-pointer leading-none font-medium"
                      style={{ padding: '8px' }}
                    >
                      #{keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {/* Sticky CTA (Right) */}
          <ArticleSidebar readingProgress={readingProgress} />
          </div>
        </div>
      </div>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="w-full bg-gradient-to-b from-gray-50 to-white flex justify-center" style={{ paddingTop: '15px', paddingBottom: '15px' }}>
          <div className="max-w-7xl px-8 flex flex-col items-center space-y-6">
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
                        <ArrowRight className="w-4 h-4 inline-block ml-2 align-middle" />
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
      <section className="w-full bg-gradient-to-br from-gray-900 to-gray-800 text-white flex justify-center" style={{ paddingTop: '15px', paddingBottom: '15px' }}>
        <div className="max-w-4xl px-8 text-center space-y-8">
          <h2 className="text-5xl font-light italic">
            Prêt à Passer à l'Action ?
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Transformez ces insights en un séminaire d'exception pour vos équipes.
          </p>
          <Link
            href="/devis"
            className="inline-flex items-center justify-center gap-3 bg-gradient-to-l from-amber-600 to-[#d4af37] text-white rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{ padding: '10px', marginBottom: '8px' }}
          >
            <span>Obtenir mon Devis Gratuit</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-sm text-gray-400">
            ✓ Réponse sous 24h • ✓ Sans engagement • ✓ Conseils personnalisés
          </p>
        </div>
      </section>
    </div>
  );
}
