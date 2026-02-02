"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { reviews, reviewsStats } from "@/data/reviewsData";
import { useState, useEffect } from "react";

// Version: 1.4 - Auto-scroll accéléré 3 secondes
export function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  // Responsive cards per view - Bootstrap breakpoints
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1); // Mobile (< md)
      } else if (window.innerWidth < 992) {
        setCardsPerView(2); // Tablette (md, < lg)
      } else {
        setCardsPerView(3); // Desktop (>= lg)
      }
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const maxIndex = Math.max(0, reviews.length - cardsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  // Auto-scroll toutes les 3 secondes
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused, cardsPerView]);

  const visibleReviews = reviews.slice(currentIndex, currentIndex + cardsPerView);

  return (
    <section className="flex items-center justify-center" style={{ padding: '20px 0', background: '#f6f9fc', marginTop: '30px' }}>
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
          style={{ marginBottom: '24px' }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="text-sm font-medium text-gray-600">Avis Google</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-light italic" style={{ marginBottom: '16px', color: '#111827' }}>
            Ce que disent nos clients
          </h2>

          <div className="flex items-center justify-center gap-2" style={{ marginBottom: '8px' }}>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => {
                const rating = parseFloat(reviewsStats.averageRating);
                const filled = i < Math.floor(rating);

                return (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      filled ? "fill-[#FBBC04] text-[#FBBC04]" : "fill-gray-300 text-gray-300"
                    }`}
                  />
                );
              })}
            </div>
            <span className="text-2xl font-semibold" style={{ color: '#111827' }}>{reviewsStats.averageRating}</span>
          </div>

          <p style={{ color: '#6b7c93' }}>
            Basé sur {reviewsStats.total} avis vérifiés
          </p>
        </motion.div>

        {/* Carrousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Cartes visibles */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: cardsPerView === 1 ? '1fr' : cardsPerView === 2 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                  gap: '24px'
                }}
              >
                {visibleReviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
                    style={{ padding: '20px 24px' }}
                  >
                    {/* SECTION 1: Header - Avatar + Nom */}
                    <div className="flex items-center gap-3" style={{ marginBottom: '2px' }}>
                      {/* Avatar */}
                      <div
                        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                        style={{ backgroundColor: review.color }}
                      >
                        {review.initials}
                      </div>

                      {/* Nom + poste/entreprise */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold" style={{ marginBottom: '4px', fontSize: '11px', color: '#111827' }}>
                          {review.author}
                        </h3>
                        <p className="text-xs line-clamp-1" style={{ color: '#4B5563' }}>
                          {review.role} • {review.company}
                        </p>
                      </div>

                      {/* Menu 3 points */}
                      <div className="flex-shrink-0 text-gray-400">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                          <circle cx="10" cy="4" r="1.5"/>
                          <circle cx="10" cy="10" r="1.5"/>
                          <circle cx="10" cy="16" r="1.5"/>
                        </svg>
                      </div>
                    </div>

                    {/* SECTION 2: Rating - Étoiles + Date */}
                    <div className="flex items-center gap-2" style={{ marginBottom: '8px', marginLeft: '52px' }}>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "fill-[#FBBC04] text-[#FBBC04]"
                                : "fill-gray-200 text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">{review.date}</span>
                    </div>

                    {/* SECTION 3: Contenu - Texte de l'avis */}
                    <p
                      className="leading-relaxed line-clamp-4"
                      style={{
                        marginBottom: '12px',
                        fontSize: '14px',
                        color: '#111827'
                      }}
                    >
                      {review.content}
                    </p>

                    {/* SECTION 4: Footer - Badge Google */}
                    <div className="flex items-center gap-1.5 pt-4 border-t border-gray-100">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      <span className="text-xs text-gray-500 font-medium">Publié sur Google</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Indicateurs de pagination */}
        <div className="flex justify-center items-center gap-1 overflow-x-auto" style={{ marginTop: '24px', maxWidth: '100%' }}>
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="transition-all duration-300 flex-shrink-0"
              style={{
                width: currentIndex === index ? '16px' : '3px',
                height: '3px',
                borderRadius: '1.5px',
                background: currentIndex === index ? '#A37E2C' : '#d1d5db',
                opacity: currentIndex === index ? 1 : 0.5,
              }}
              aria-label={`Aller au groupe d'avis ${index + 1}`}
            />
          ))}
        </div>

        {/* CTA en bas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
          style={{ marginTop: '24px' }}
        >
          <p style={{ marginBottom: '20px', color: '#6b7c93' }}>
            Rejoignez les {reviewsStats.fiveStars}+ entreprises qui nous font confiance
          </p>
          <a
            href="/devis"
            className="inline-flex items-center gap-2 bg-[#A37E2C] rounded-full font-medium hover:bg-[#8B6A24] transition-colors duration-300"
            style={{ padding: '16px 40px', color: '#ffffff' }}
          >
            Demander un devis gratuit
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
