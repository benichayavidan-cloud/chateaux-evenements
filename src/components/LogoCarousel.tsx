"use client";

import Image from "next/image";
import { theme } from "@/config/theme";
import { spacing } from "@/config/themeHelpers";

const logos = [
  { nom: "Microsoft", url: "https://cdn.simpleicons.org/microsoft/gray" },
  { nom: "Google", url: "https://cdn.simpleicons.org/google/gray" },
  { nom: "Amazon", url: "https://cdn.simpleicons.org/amazon/gray" },
  { nom: "Apple", url: "https://cdn.simpleicons.org/apple/gray" },
  { nom: "IBM", url: "https://cdn.simpleicons.org/ibm/gray" },
  { nom: "Adobe", url: "https://cdn.simpleicons.org/adobe/gray" },
  { nom: "Tesla", url: "https://cdn.simpleicons.org/tesla/gray" },
  { nom: "Netflix", url: "https://cdn.simpleicons.org/netflix/gray" },
  { nom: "Spotify", url: "https://cdn.simpleicons.org/spotify/gray" },
  { nom: "Nike", url: "https://cdn.simpleicons.org/nike/gray" },
  { nom: "Samsung", url: "https://cdn.simpleicons.org/samsung/gray" },
  { nom: "Intel", url: "https://cdn.simpleicons.org/intel/gray" },
];

export function LogoCarousel() {
  // Dupliquer les logos pour créer un effet de boucle infinie
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="py-12 md:py-16 overflow-hidden" style={{ background: theme.colors.neutral.gray50 }}>
      <div className="w-full text-center mb-8 px-4">
        <p
          style={{
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.text.muted,
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
          className="absolute left-0 top-0 bottom-0 w-32 md:w-48 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to right, ${theme.colors.neutral.gray50}, transparent)`,
          }}
        />

        {/* Gradient droite */}
        <div
          className="absolute right-0 top-0 bottom-0 w-32 md:w-48 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to left, ${theme.colors.neutral.gray50}, transparent)`,
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
              <div className="relative w-full h-full flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300">
                <Image
                  src={logo.url}
                  alt={`Logo ${logo.nom}`}
                  width={100}
                  height={60}
                  className="object-contain"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                  unoptimized
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS pour l'animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
