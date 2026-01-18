"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { colors } from "@/config/themeHelpers";

interface InteractiveGalleryProps {
  images: string[];
  altPrefix: string;
}

export function InteractiveGallery({ images, altPrefix }: InteractiveGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full">
      {/* Image principale */}
      <div className="relative w-full" style={{ marginBottom: 'clamp(2rem, 5vw, 3.75rem)' }}>
        <div
          className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden bg-gray-100"
          style={{
            height: 'clamp(300px, 50vh, 700px)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)'
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={images[currentIndex]}
                alt={`${altPrefix} - vue ${currentIndex + 1}`}
                fill
                className="object-cover"
                quality={95}
                sizes="(min-width: 1024px) 80vw, 100vw"
                priority={currentIndex === 0}
              />
            </motion.div>
          </AnimatePresence>

          {/* Compteur */}
          <div className="absolute top-3 right-3 md:top-5 md:right-5 z-10">
            <div
              className="px-3 py-1.5 md:px-4 md:py-2 rounded-full backdrop-blur-md"
              style={{
                background: 'rgba(0, 0, 0, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
              }}
            >
              <span className="text-white font-medium" style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)' }}>
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          </div>

          {/* Boutons Navigation */}
          <button
            onClick={handlePrevious}
            className="absolute left-2 sm:left-3 md:left-5 top-1/2 -translate-y-1/2 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group z-10"
            style={{
              width: 'clamp(2.5rem, 10vw, 3.5rem)',
              height: 'clamp(2.5rem, 10vw, 3.5rem)',
              background: 'rgba(255, 255, 255, 0.95)',
              border: `2px solid ${colors.bronze}`,
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12)'
            }}
            aria-label="Image précédente"
          >
            <ChevronLeft
              style={{
                color: colors.bronze,
                width: 'clamp(1.25rem, 5vw, 1.75rem)',
                height: 'clamp(1.25rem, 5vw, 1.75rem)'
              }}
            />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-3 md:right-5 top-1/2 -translate-y-1/2 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group z-10"
            style={{
              width: 'clamp(2.5rem, 10vw, 3.5rem)',
              height: 'clamp(2.5rem, 10vw, 3.5rem)',
              background: 'rgba(255, 255, 255, 0.95)',
              border: `2px solid ${colors.bronze}`,
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12)'
            }}
            aria-label="Image suivante"
          >
            <ChevronRight
              style={{
                color: colors.bronze,
                width: 'clamp(1.25rem, 5vw, 1.75rem)',
                height: 'clamp(1.25rem, 5vw, 1.75rem)'
              }}
            />
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="relative hidden sm:block">
        {/* Gradient fade gauche */}
        <div
          className="absolute left-0 top-0 bottom-0 w-8 md:w-16 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, white, transparent)'
          }}
        />

        {/* Gradient fade droite */}
        <div
          className="absolute right-0 top-0 bottom-0 w-8 md:w-16 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, white, transparent)'
          }}
        />

        {/* Grid thumbnails avec scroll horizontal */}
        <div className="overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex gap-2.5 md:gap-3.5 px-0.5">
            {images.map((image, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`relative flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 ${
                  index === currentIndex
                    ? 'ring-3 md:ring-4 ring-offset-2 scale-105'
                    : 'opacity-70 hover:opacity-100 hover:scale-105'
                }`}
                style={{
                  width: 'clamp(90px, 14vw, 150px)',
                  height: 'clamp(70px, 11vw, 110px)',
                  ...(index === currentIndex && { '--tw-ring-color': colors.bronze } as any),
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={image}
                  alt={`Miniature ${index + 1} - ${altPrefix}`}
                  fill
                  className="object-cover"
                  sizes="150px"
                />
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Points de navigation mobile */}
      <div className="flex justify-center gap-2 sm:hidden" style={{ marginTop: 'clamp(1.5rem, 4vw, 2rem)' }}>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`rounded-full transition-all duration-300 ${
              index === currentIndex ? 'w-8 h-2.5' : 'w-2.5 h-2.5'
            }`}
            style={{
              backgroundColor: index === currentIndex ? colors.bronze : '#d1d5db',
              boxShadow: index === currentIndex ? `0 2px 8px ${colors.bronze}40` : 'none'
            }}
            aria-label={`Aller à l'image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
