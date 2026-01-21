"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { BlogPost } from "@/data/blog-posts";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";
import { ArticleHero } from "@/components/blog/ArticleHero";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ArticleSidebar } from "@/components/blog/ArticleSidebar";

interface ArticleClientLogicProps {
  article: BlogPost;
  children?: React.ReactNode;
}

export function ArticleClientLogic({ article, children }: ArticleClientLogicProps) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [tableOfContents, setTableOfContents] = useState<{ id: string; title: string; level: number }[]>([]);

  const articleRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();

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

  return (
    <>
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
      <div className="w-full flex justify-center items-start" style={{ padding: '12px 0' }}>
        <div className="max-w-[1350px] w-full" style={{ padding: '0 20px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(250px,280px)_1fr_minmax(280px,320px)] xl:grid-cols-[300px_1fr_320px] gap-6 sm:gap-8 xl:gap-12 max-w-fit mx-auto" style={{ padding: '12px 0' }}>
            {/* Sticky Table of Contents (Left) - Hidden on mobile */}
            <div className="hidden lg:block">
              <TableOfContents items={tableOfContents} activeSection={activeSection} />
            </div>

            {/* Article Content (Center) */}
            <article ref={articleRef} className="w-full min-w-0">
              <div className="max-w-[750px] mx-auto space-y-8 sm:space-y-10 md:space-y-12" style={{ padding: '0 20px' }}>
                {/* Excerpt */}
                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed pb-4 sm:pb-6 border-b-2 border-gray-100 mb-4 sm:mb-6">
                  {article.excerpt}
                </p>

                {/* Content */}
                <MarkdownRenderer content={article.content} className="prose-lg" />

                {/* Keywords */}
                <div className="mt-10 sm:mt-12 md:mt-16 pt-4 sm:pt-6 border-t border-gray-200">
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 sm:mb-4">
                    Mots-clés
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    {article.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        style={{ padding: '8px 16px' }}
                        className="inline-flex items-center justify-center bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gradient-to-l hover:from-amber-600 hover:to-[#d4af37] hover:text-white transition-all duration-300 cursor-pointer leading-none font-medium"
                      >
                        #{keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>

            {/* Sticky CTA (Right) - Hidden on mobile */}
            <div className="hidden lg:block">
              <ArticleSidebar readingProgress={readingProgress} />
            </div>
          </div>
        </div>
      </div>

      {/* Children (Related Articles + CTA) */}
      {children}
    </>
  );
}
