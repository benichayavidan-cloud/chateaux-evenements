"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { reviews, reviewsStats } from "@/data/reviewsData";
import { useState, useEffect } from "react";

// Version: 1.3 - Carrousel responsive + centrage vertical + espacements forcés
export function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  // Responsive cards per view
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2); // Tablette
      } else {
        setCardsPerView(3); // Desktop
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

  const visibleReviews = reviews.slice(currentIndex, currentIndex + cardsPerView);

  return (
    <section className="px-6 bg-gradient-to-b from-white to-gray-50 flex items-center justify-center" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
      <div className="max-w-7xl mx-auto w-full">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
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

          <h2 className="text-4xl md:text-5xl font-light italic text-gray-900 mb-4">
            Ce que disent nos clients
          </h2>

          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-[#FBBC04] text-[#FBBC04]" />
              ))}
            </div>
            <span className="text-2xl font-semibold text-gray-900">{reviewsStats.averageRating}</span>
          </div>

          <p className="text-gray-600">
            Basé sur {reviewsStats.total} avis vérifiés
          </p>
        </motion.div>

        {/* Carrousel */}
        <div className="relative">
          {/* Cartes visibles */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="grid gap-6"
                style={{
                  gridTemplateColumns: `repeat(${cardsPerView}, 1fr)`
                }}
              >
                {visibleReviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
                    style={{ padding: '10px' }}
                  >
                    {/* Header avec avatar et infos */}
                    <div className="flex items-start gap-4 mb-6">
                      {/* Avatar avec initiales */}
                      <div
                        className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg"
                        style={{ backgroundColor: review.color }}
                      >
                        {review.initials}
                      </div>

                      {/* Infos auteur */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-base truncate">
                          {review.author}
                        </h3>
                        <p className="text-sm text-gray-600 truncate">
                          {review.role}
                        </p>
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {review.company}
                        </p>
                      </div>
                    </div>

                    {/* Étoiles et date */}
                    <div className="flex items-center justify-between mb-3">
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
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>

                    {/* Contenu de l'avis */}
                    <p className="text-gray-700 text-sm leading-relaxed flex-grow">
                      {review.content}
                    </p>

                    {/* Badge Google en bas */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-1.5">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        <span className="text-xs text-gray-500 font-medium">Publié sur Google</span>
                      </div>
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
                width: currentIndex === index ? '10px' : '3px',
                height: '3px',
                borderRadius: '50%',
                background: currentIndex === index ? '#A37E2C' : '#d1d5db',
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
          style={{ marginTop: '40px' }}
        >
          <p className="text-gray-600" style={{ marginBottom: '20px' }}>
            Rejoignez les {reviewsStats.fiveStars}+ entreprises qui nous font confiance
          </p>
          <a
            href="/devis"
            className="inline-flex items-center gap-2 bg-[#A37E2C] text-white rounded-full font-medium hover:bg-[#8B6A24] transition-colors duration-300"
            style={{ padding: '16px 40px' }}
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
