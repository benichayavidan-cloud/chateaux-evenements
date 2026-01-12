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
  const [cardsPerView, setCardsPerView] = useState(2);
  const [isPaused, setIsPaused] = useState(false);

  // Responsive cards per view
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1280) {
        setCardsPerView(1);
      } else {
        setCardsPerView(2);
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
                className="grid gap-8"
                style={{
                  gridTemplateColumns: `repeat(${cardsPerView}, 1fr)`,
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
                    {/* Carte horizontale (format carte de visite) */}
                    <div
                      className="h-full rounded-2xl transition-all duration-300 flex"
                      style={{
                        background: 'white',
                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
                        padding: 'clamp(2rem, 3vw, 3rem)',
                        border: '1px solid rgba(163, 126, 44, 0.1)',
                        minHeight: '280px',
                        gap: 'clamp(2rem, 3vw, 3rem)',
                      }}
                    >
                      {/* Partie gauche : Avatar + Info */}
                      <div className="flex flex-col items-center justify-center" style={{ minWidth: '140px', flex: '0 0 140px' }}>
                        {/* Avatar */}
                        <div
                          className="relative flex-shrink-0 rounded-full overflow-hidden ring-2 ring-offset-4 transition-all duration-300 group-hover:ring-4 mb-6"
                          style={{
                            width: '100px',
                            height: '100px',
                            '--tw-ring-color': colors.bronze,
                            '--tw-ring-offset-color': 'white',
                          } as any}
                        >
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.nom}
                            fill
                            className="object-cover"
                            sizes="100px"
                          />
                        </div>

                        {/* Info personne */}
                        <div className="text-center">
                          <h3
                            className="font-bold mb-2"
                            style={{
                              fontSize: theme.typography.fontSize.base,
                              color: theme.colors.text.primary,
                              lineHeight: '1.3'
                            }}
                          >
                            {testimonial.nom}
                          </h3>
                          <p
                            className="font-medium mb-2"
                            style={{
                              fontSize: theme.typography.fontSize.xs,
                              color: theme.colors.text.muted
                            }}
                          >
                            {testimonial.poste}
                          </p>
                          <p
                            className="font-semibold"
                            style={{
                              fontSize: theme.typography.fontSize.xs,
                              color: colors.bronze
                            }}
                          >
                            {testimonial.entreprise}
                          </p>
                        </div>

                        {/* Étoiles */}
                        <div className="flex gap-1 mt-4">
                          {[...Array(testimonial.note)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-current"
                              style={{ color: colors.gold }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Partie droite : Contenu */}
                      <div className="flex-1 flex flex-col justify-between">
                        {/* Quote icon en haut */}
                        <div className="flex justify-start mb-6">
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center"
                            style={{
                              background: `linear-gradient(135deg, ${colors.bronze}15, ${colors.bronze}05)`,
                            }}
                          >
                            <Quote className="w-6 h-6" style={{ color: colors.bronze }} />
                          </div>
                        </div>

                        {/* Contenu du témoignage */}
                        <p
                          className="leading-relaxed italic flex-1"
                          style={{
                            fontSize: theme.typography.fontSize.base,
                            color: theme.colors.text.secondary,
                            lineHeight: '1.8',
                          }}
                        >
                          "{testimonial.contenu}"
                        </p>

                        {/* Séparateur élégant en bas */}
                        <div
                          className="w-full mt-6"
                          style={{
                            height: '1px',
                            background: `linear-gradient(90deg, ${colors.bronze}30, transparent)`,
                          }}
                        />
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
