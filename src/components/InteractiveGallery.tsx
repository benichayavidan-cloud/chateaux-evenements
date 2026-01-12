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
      <div className="relative w-full mb-6">
        <div
          className="relative w-full rounded-3xl overflow-hidden bg-gray-100"
          style={{
            height: 'clamp(400px, 60vh, 700px)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)'
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
          <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10">
            <div
              className="px-4 py-2 rounded-full backdrop-blur-md"
              style={{
                background: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <span className="text-white text-sm font-medium">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          </div>

          {/* Boutons Navigation */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 group z-10"
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              border: `2px solid ${colors.bronze}`,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
            }}
            aria-label="Image précédente"
          >
            <ChevronLeft
              className="w-6 h-6 md:w-7 md:h-7 group-hover:scale-110 transition-transform"
              style={{ color: colors.bronze }}
            />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 group z-10"
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              border: `2px solid ${colors.bronze}`,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
            }}
            aria-label="Image suivante"
          >
            <ChevronRight
              className="w-6 h-6 md:w-7 md:h-7 group-hover:scale-110 transition-transform"
              style={{ color: colors.bronze }}
            />
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="relative">
        {/* Gradient fade gauche */}
        <div
          className="absolute left-0 top-0 bottom-0 w-12 md:w-20 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, white, transparent)'
          }}
        />

        {/* Gradient fade droite */}
        <div
          className="absolute right-0 top-0 bottom-0 w-12 md:w-20 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, white, transparent)'
          }}
        />

        {/* Grid thumbnails avec scroll horizontal */}
        <div className="overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex gap-3 md:gap-4 px-1">
            {images.map((image, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`relative flex-shrink-0 rounded-2xl overflow-hidden transition-all duration-300 ${
                  index === currentIndex
                    ? 'ring-4 ring-offset-2 scale-105'
                    : 'opacity-60 hover:opacity-100 hover:scale-105'
                }`}
                style={{
                  width: 'clamp(100px, 15vw, 160px)',
                  height: 'clamp(80px, 12vw, 120px)',
                  ringColor: index === currentIndex ? colors.bronze : 'transparent',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="160px"
                />

                {/* Overlay numéro */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                    index === currentIndex ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
                  }`}
                  style={{
                    background: 'rgba(0, 0, 0, 0.5)'
                  }}
                >
                  <span className="text-white text-xs font-medium">
                    {index + 1}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Points de navigation mobile (optionnel) */}
      <div className="flex justify-center gap-2 mt-6 md:hidden">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'w-8' : 'w-2'
            }`}
            style={{
              backgroundColor: index === currentIndex ? colors.bronze : '#d1d5db'
            }}
            aria-label={`Aller à l'image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
