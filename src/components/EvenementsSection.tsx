"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Presentation, BookOpen, Sparkles, Users, ArrowRight, Star } from "lucide-react";
import { typesEvenements } from "@/data/chateaux";

const iconMap: Record<string, React.ReactNode> = {
  presentation: <Presentation className="w-6 h-6" />,
  "book-open": <BookOpen className="w-6 h-6" />,
  champagne: <Sparkles className="w-6 h-6" />,
  users: <Users className="w-6 h-6" />,
};

export function EvenementsSection() {
  return (
    <section className="bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden" style={{ paddingTop: '30px', paddingBottom: '30px' }}>
      {/* Glow effects subtils */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[var(--bronze-antique)]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-[var(--bronze-antique)]/5 rounded-full blur-3xl" />

      <div className="w-full flex flex-col items-center justify-center relative z-10">
        {/* Titre section avec animation Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 40, clipPath: "inset(100% 0 0 0)" }}
          whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col items-center justify-center text-center w-full px-4"
          style={{ marginBottom: '45px' }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--bronze-antique)]" />
            <Star className="w-4 h-4 text-[var(--bronze-antique)] mx-4" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--bronze-antique)]" />
          </div>
          <h2 className="text-5xl md:text-6xl font-light italic text-gray-900 mb-6 font-[var(--font-cormorant)]">
            Types d'Événements
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl leading-relaxed">
            Des solutions sur-mesure pour tous vos besoins événementiels
            d'entreprise
          </p>
        </motion.div>

        {/* Grille d'événements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto w-full px-4">
          {typesEvenements.map((evenement, index) => (
            <motion.div
              key={evenement.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
              className="group"
            >
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl overflow-hidden hover:border-[var(--bronze-antique)]/50 transition-all duration-500 h-full flex flex-col hover:shadow-2xl">
                {/* Image avec grayscale hover */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={evenement.image}
                    alt={evenement.titre}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover group-hover:scale-110 transition-all duration-[800ms] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-gray-900/10 to-transparent" />

                  {/* Icône avec glass morphism */}
                  <div className="absolute top-6 left-6 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-[var(--bronze-antique)]/30 text-[var(--bronze-antique)] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:border-[var(--bronze-antique)] transition-all duration-500">
                    {iconMap[evenement.icon]}
                  </div>

                  {/* Ligne de séparation bronze en bas */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--bronze-antique)]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Contenu */}
                <div className="flex-1 flex flex-col" style={{ padding: '20px' }}>
                  <h3 className="text-2xl font-light italic text-gray-900 font-[var(--font-cormorant)] group-hover:text-[var(--bronze-antique)] transition-colors duration-500" style={{ marginBottom: '15px' }}>
                    {evenement.titre}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed flex-1" style={{ marginBottom: '20px' }}>
                    {evenement.description}
                  </p>

                  {/* Services inclus */}
                  <ul className="flex flex-col" style={{ gap: '8px', marginBottom: '20px' }}>
                    {evenement.servicesInclus.slice(0, 3).map((service, i) => (
                      <li
                        key={i}
                        className="text-xs text-gray-500 flex items-start"
                      >
                        <span className="text-[var(--bronze-antique)] mr-2.5 flex-shrink-0 mt-0.5">
                          •
                        </span>
                        <span className="leading-relaxed">{service}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={`/evenements#${evenement.id}`}
                    className="text-[var(--bronze-antique)]/80 hover:text-[var(--bronze-antique)] font-medium text-sm transition-colors flex items-center group/link"
                    style={{ padding: '10px' }}
                  >
                    <span className="uppercase tracking-wider">En savoir plus</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA principal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center justify-center w-full px-4"
          style={{ marginTop: '30px' }}
        >
          <Link
            href="/devis"
            className="group inline-flex items-center bg-[var(--bronze-antique)] text-white font-medium rounded-full hover:bg-[var(--bronze-light)] transition-all duration-500 hover:shadow-[var(--shadow-glow)] relative overflow-hidden"
            style={{ padding: '16px 32px' }}
          >
            <span className="relative z-10">Demander un Devis Personnalisé</span>
            <ArrowRight className="w-5 h-5 ml-3 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
            <span className="absolute inset-0 bg-[var(--bronze-light)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </Link>
        </motion.div>
      </div>

      {/* Ligne décorative en haut */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--bronze-antique)]/20 to-transparent" />
      {/* Ligne décorative en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--bronze-antique)]/20 to-transparent" />
    </section>
  );
}
