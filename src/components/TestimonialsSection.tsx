"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { testimonials } from "@/data/chateaux";
import { colors } from "@/config/themeHelpers";
import { theme } from "@/config/theme";

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  // Responsive cards per view
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused, cardsPerView]);

  const maxIndex = Math.max(0, testimonials.length - cardsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + cardsPerView
  );

  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #fafafa 0%, #ffffff 50%, #f8f8f8 100%)',
        padding: 'clamp(5rem, 12vw, 8rem) clamp(1.5rem, 4vw, 2rem)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Pattern décoratif subtil */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, ${colors.bronze} 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* En-tête de la section - Centré verticalement */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Quote className="w-7 h-7" style={{ color: colors.bronze }} />
              <span
                className="uppercase tracking-wider font-semibold"
                style={{
                  fontSize: theme.typography.fontSize.xs,
                  color: colors.bronze,
                  letterSpacing: '0.15em'
                }}
              >
                Témoignages
              </span>
            </div>
            <h2
              className="heading-lg"
              style={{
                marginBottom: '20px',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                lineHeight: '1.2'
              }}
            >
              Ils nous font confiance
            </h2>
            <p
              className="text-body-xl max-w-3xl mx-auto"
              style={{
                color: theme.colors.text.secondary,
                fontSize: theme.typography.fontSize.lg,
                lineHeight: theme.typography.lineHeight.relaxed
              }}
            >
              Découvrez les retours d'expérience de nos clients qui ont organisé leurs événements d'exception dans nos châteaux
            </p>
          </motion.div>
        </div>

        {/* Carousel Container */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl"
            style={{
              border: `2px solid ${colors.bronze}`,
            }}
            aria-label="Témoignage précédent"
          >
            <ChevronLeft className="w-6 h-6" style={{ color: colors.bronze }} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl"
            style={{
              border: `2px solid ${colors.bronze}`,
            }}
            aria-label="Témoignage suivant"
          >
            <ChevronRight className="w-6 h-6" style={{ color: colors.bronze }} />
          </button>

          {/* Carousel Track */}
          <div className="overflow-hidden" style={{ padding: '0 20px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="grid"
                style={{
                  gridTemplateColumns: `repeat(${cardsPerView}, 1fr)`,
                  gap: '24px',
                }}
              >
                {visibleTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
                    {/* Carte style Google My Business - Format rectangulaire horizontal TRÈS LARGE */}
                    <div
                      className="h-full rounded-lg transition-all duration-300 relative"
                      style={{
                        background: '#FFFFFF',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                        padding: '20px 28px',
                        border: '1px solid #e8e8e8',
                        minHeight: '140px',
                      }}
                    >
                      {/* Header: Étoiles à gauche, Badge "Avis Google" à droite */}
                      <div className="flex items-center justify-between" style={{ marginBottom: '16px' }}>
                        {/* Étoiles style Google (jaune Google) */}
                        <div className="flex gap-1">
                          {[...Array(testimonial.note)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-current"
                              style={{ color: '#FBBC04' }}
                            />
                          ))}
                        </div>

                        {/* Badge "Avis Google" */}
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: '#f8f9fa' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                          </svg>
                          <span style={{ fontSize: '0.7rem', color: '#5f6368', fontWeight: 500 }}>Avis Google</span>
                        </div>
                      </div>

                      {/* Layout horizontal: Avatar + Info + Contenu */}
                      <div className="flex gap-3 items-center">
                        {/* Avatar */}
                        <div
                          className="relative flex-shrink-0 rounded-full overflow-hidden"
                          style={{
                            width: '48px',
                            height: '48px',
                          }}
                        >
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.nom}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>

                        {/* Info + Contenu */}
                        <div className="flex-1" style={{ minWidth: 0 }}>
                          {/* Nom et poste sur la même ligne que l'avatar */}
                          <div style={{ marginBottom: '8px' }}>
                            <h3
                              className="font-semibold"
                              style={{
                                fontSize: '0.875rem',
                                color: '#202124',
                                lineHeight: '1.3',
                                marginBottom: '2px'
                              }}
                            >
                              {testimonial.nom}
                            </h3>
                            <p
                              className="font-normal"
                              style={{
                                fontSize: '0.75rem',
                                color: '#5f6368',
                                lineHeight: '1.3'
                              }}
                            >
                              {testimonial.poste} • {testimonial.entreprise}
                            </p>
                          </div>

                          {/* Contenu du témoignage */}
                          <p
                            className="leading-relaxed"
                            style={{
                              fontSize: '0.8125rem',
                              color: '#202124',
                              lineHeight: '1.5',
                            }}
                          >
                            {testimonial.contenu}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicateurs de pagination */}
          <div className="flex justify-center items-center gap-3 mt-12">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="transition-all duration-300"
                style={{
                  width: currentIndex === index ? '32px' : '10px',
                  height: '10px',
                  borderRadius: '5px',
                  background: currentIndex === index ? colors.bronze : '#d1d5db',
                }}
                aria-label={`Aller au groupe de témoignages ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
