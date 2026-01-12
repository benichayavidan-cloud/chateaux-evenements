"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { colors } from "@/config/themeHelpers";

interface GalleryLightboxProps {
  images: string[];
  isOpen: boolean;
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  altPrefix: string;
}

export function GalleryLightbox({
  images,
  isOpen,
  currentIndex,
  onClose,
  onNavigate,
  altPrefix,
}: GalleryLightboxProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  // Navigation clavier
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex]);

  // Bloquer le scroll du body quand lightbox ouverte
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handlePrevious = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    onNavigate(newIndex);
    setIsZoomed(false);
  };

  const handleNext = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    onNavigate(newIndex);
    setIsZoomed(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          {/* Header - Compteur et Bouton fermer */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white text-sm md:text-base font-medium"
            >
              {currentIndex + 1} / {images.length}
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={onClose}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 flex items-center justify-center transition-all duration-200 border border-white/20"
              aria-label="Fermer la galerie"
            >
              <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </motion.button>
          </div>

          {/* Image principale */}
          <div className="absolute inset-0 flex items-center justify-center p-4 md:p-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: isZoomed ? 1.5 : 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="relative w-full h-full cursor-zoom-in"
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <Image
                  src={images[currentIndex]}
                  alt={`${altPrefix} - vue ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  quality={95}
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bouton Précédent */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onClick={handlePrevious}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 flex items-center justify-center transition-all duration-200 border border-white/20 group z-20"
            aria-label="Image précédente"
          >
            <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:scale-110 transition-transform" />
          </motion.button>

          {/* Bouton Suivant */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onClick={handleNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 flex items-center justify-center transition-all duration-200 border border-white/20 group z-20"
            aria-label="Image suivante"
          >
            <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:scale-110 transition-transform" />
          </motion.button>

          {/* Thumbnails en bas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-0 left-0 right-0 z-10 p-4 md:p-6"
          >
            <div className="flex items-center justify-center gap-2 md:gap-3 overflow-x-auto max-w-6xl mx-auto pb-2 scrollbar-hide">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    onNavigate(index);
                    setIsZoomed(false);
                  }}
                  className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                    index === currentIndex
                      ? "ring-2 ring-white scale-110 opacity-100"
                      : "opacity-50 hover:opacity-80"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Indicateur de zoom */}
          {!isZoomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-24 md:bottom-32 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-xs md:text-sm flex items-center gap-2 border border-white/20"
            >
              <ZoomIn className="w-4 h-4" />
              Cliquez pour zoomer
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
