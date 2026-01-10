"use client";

import Image from "next/image";
import { theme } from "@/config/theme";
import { spacing } from "@/config/themeHelpers";

const logos = [
  { nom: "Microsoft", url: "https://cdn.simpleicons.org/microsoft/666666" },
  { nom: "Google", url: "https://cdn.simpleicons.org/google/666666" },
  { nom: "Amazon", url: "https://cdn.simpleicons.org/amazon/666666" },
  { nom: "Apple", url: "https://cdn.simpleicons.org/apple/666666" },
  { nom: "BMW", url: "https://cdn.simpleicons.org/bmw/666666" },
  { nom: "Mercedes", url: "https://cdn.simpleicons.org/mercedesbenz/666666" },
  { nom: "Air France", url: "https://cdn.simpleicons.org/airfrance/666666" },
  { nom: "Airbus", url: "https://cdn.simpleicons.org/airbus/666666" },
  { nom: "L'Oréal", url: "https://cdn.simpleicons.org/loreal/666666" },
  { nom: "Accor", url: "https://cdn.simpleicons.org/accor/666666" },
  { nom: "Orange", url: "https://cdn.simpleicons.org/orange/666666" },
  { nom: "Renault", url: "https://cdn.simpleicons.org/renault/666666" },
  { nom: "IBM", url: "https://cdn.simpleicons.org/ibm/666666" },
  { nom: "SAP", url: "https://cdn.simpleicons.org/sap/666666" },
  { nom: "Salesforce", url: "https://cdn.simpleicons.org/salesforce/666666" },
  { nom: "Adobe", url: "https://cdn.simpleicons.org/adobe/666666" },
  { nom: "Tesla", url: "https://cdn.simpleicons.org/tesla/666666" },
  { nom: "Netflix", url: "https://cdn.simpleicons.org/netflix/666666" },
  { nom: "Spotify", url: "https://cdn.simpleicons.org/spotify/666666" },
  { nom: "Nike", url: "https://cdn.simpleicons.org/nike/666666" },
];

export function LogoCarousel() {
  // Dupliquer les logos pour créer un effet de boucle infinie
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="py-12 md:py-16 overflow-hidden" style={{ background: theme.colors.neutral.gray50 }}>
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 mb-8">
        <p
          className="text-center"
          style={{
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.text.muted,
            textTransform: "uppercase",
            letterSpacing: theme.typography.letterSpacing.wider,
            fontWeight: theme.typography.fontWeight.medium,
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
