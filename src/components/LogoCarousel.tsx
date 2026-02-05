"use client";

import Image from "next/image";
import { theme } from "@/config/theme";
import { spacing } from "@/config/themeHelpers";
import { clientLogos } from "@/data/chateaux";

export function LogoCarousel() {
  // Dupliquer les logos pour créer un effet de boucle infinie
  const duplicatedLogos = [...clientLogos, ...clientLogos];

  return (
    <section className="overflow-hidden" style={{ background: theme.colors.neutral.white, paddingTop: 'clamp(1.375rem, 2.5vw, 1.875rem)', paddingBottom: '16px' }}>
      <div className="w-full text-center px-5" style={{ marginBottom: 'clamp(1rem, 2vw, 1.5rem)' }}>
        <p
          style={{
            fontSize: theme.typography.fontSize.sm,
            color: '#6b7c93',
            textTransform: "uppercase",
            letterSpacing: theme.typography.letterSpacing.wider,
            fontWeight: theme.typography.fontWeight.medium,
            width: "100%",
          }}
        >
          Ils nous font confiance
        </p>
      </div>

      {/* Wrapper avec gradient fade sur les côtés */}
      <div className="relative">
        {/* Gradient gauche */}
        <div
          className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{
            width: 'clamp(4rem, 15vw, 12rem)',
            background: `linear-gradient(to right, ${theme.colors.neutral.white}, transparent)`,
          }}
        />

        {/* Gradient droite */}
        <div
          className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{
            width: 'clamp(4rem, 15vw, 12rem)',
            background: `linear-gradient(to left, ${theme.colors.neutral.white}, transparent)`,
          }}
        />

        {/* Container du carousel avec animation */}
        <div className="flex animate-scroll">
          {duplicatedLogos.map((logo, index) => (
            <div
              key={`${logo.nom}-${index}`}
              className="flex-shrink-0 flex items-center justify-center mx-6 md:mx-8"
              style={{
                width: "140px",
                height: "80px",
              }}
            >
              <div className="relative w-full h-full flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-300">
                <Image
                  src={logo.url}
                  alt={`Logo ${logo.nom} - Client Select Châteaux`}
                  width={100}
                  height={60}
                  sizes="100px"
                  className="object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
