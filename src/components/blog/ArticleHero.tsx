"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { BlogPost } from "@/data/blog-posts";

interface ArticleHeroProps {
  article: BlogPost;
}

const CATEGORY_LABELS = {
  organisation: "Organisation",
  lieux: "Lieux & Géographie",
  "team-building": "Team Building",
} as const;

export function ArticleHero({ article }: ArticleHeroProps) {
  return (
    <div className="relative w-full min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh] overflow-hidden flex items-center justify-center" style={{ padding: '12px 0' }}>
      <Image
        src={article.image}
        alt={article.imageAlt}
        fill
        className="object-cover"
        style={{ objectPosition: 'center' }}
        priority
        sizes="100vw"
        quality={85}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/80 to-white/40" />

      {/* Back Button */}
      <Link
        href="/blog"
        className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 lg:top-10 lg:left-10 z-20 inline-flex items-center justify-center gap-2 sm:gap-3 text-gray-900 bg-white/80 backdrop-blur-md rounded-full hover:bg-white transition-all duration-300 px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base shadow-lg"
      >
        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="hidden sm:inline">Retour au blog</span>
        <span className="sm:hidden">Retour</span>
      </Link>

      {/* Title */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto px-6 sm:px-8 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-5 sm:space-y-6 md:space-y-8"
          >
            {/* Category Badge */}
            <div
              className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-l from-amber-600 to-[#d4af37] text-white rounded-full text-xs font-medium uppercase tracking-wider shadow-lg"
              style={{ padding: '10px 20px' }}
            >
              <span className="w-1.5 h-1.5 bg-white rounded-full" />
              {CATEGORY_LABELS[article.category]}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light italic text-gray-900 leading-tight px-4" style={{ textShadow: '0 2px 4px rgba(255,255,255,0.8)' }}>
              {article.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 text-gray-700 px-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-200 flex items-center justify-center text-xs sm:text-sm font-bold text-gray-900">
                  {article.author.name.charAt(0)}
                </div>
                <div className="text-left">
                  <div className="font-medium text-sm sm:text-base text-gray-900">{article.author.name}</div>
                  <div className="text-xs sm:text-sm text-gray-600">{article.author.role}</div>
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>
                  {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{article.readingTime} min de lecture</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
