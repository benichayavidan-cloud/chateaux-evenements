"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Users, ArrowRight, Sparkles } from "lucide-react";
import { chateaux } from "@/data/chateaux";

export function ChateauxSection() {
  return (
    <section className="bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden" style={{ paddingTop: '30px', paddingBottom: '30px' }}>
      {/* Glow effect subtil */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--bronze-antique)]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--bronze-antique)]/5 rounded-full blur-3xl" />

      <div className="w-full flex flex-col items-center justify-center relative z-10">
        {/* Titre section */}
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
            <Sparkles className="w-4 h-4 text-[var(--bronze-antique)] mx-4" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--bronze-antique)]" />
          </div>
          <h2 className="text-5xl md:text-6xl font-light italic text-gray-900 mb-6 font-[var(--font-cormorant)]">
            Nos Châteaux d'Exception
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl leading-relaxed">
            Découvrez nos 4 châteaux soigneusement sélectionnés à travers la
            France, chacun offrant un cadre unique pour vos événements
            d'entreprise.
          </p>
        </motion.div>

        {/* Grille de cartes châteaux */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto w-full px-4">
          {chateaux.map((chateau, index) => (
            <motion.div
              key={chateau.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.4, 0, 0.2, 1] }}
            >
              <Link
                href={`/chateaux/${chateau.slug}`}
                className="group block relative overflow-hidden rounded-2xl border border-gray-200 bg-white hover:border-[var(--bronze-antique)]/50 transition-all duration-800 hover:shadow-2xl"
              >
                {/* Image avec effet grayscale → couleur */}
                <div className="relative h-96 lg:h-[28rem] overflow-hidden">
                  <Image
                    src={chateau.images[0]}
                    alt={chateau.nom}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-all duration-[800ms] ease-out"
                  />

                  {/* Overlay gradient permanent subtil */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent" />

                  {/* Overlay informations - visible uniquement au hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/90 to-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-[800ms] ease-out">
                    <div className="absolute inset-0 flex flex-col justify-end" style={{ padding: '15px' }}>
                      {/* Titre */}
                      <motion.h3
                        className="text-3xl lg:text-4xl font-light italic text-black font-[var(--font-cormorant)] translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                        style={{ marginBottom: '18px' }}
                      >
                        {chateau.nom}
                      </motion.h3>

                      {/* Description */}
                      <p className="text-gray-700 line-clamp-2 leading-relaxed translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75" style={{ marginBottom: '20px' }}>
                        {chateau.description}
                      </p>

                      {/* Informations clés */}
                      <div className="flex items-center gap-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100" style={{ marginBottom: '20px' }}>
                        <div className="flex items-center text-gray-700" style={{ gap: '5px' }}>
                          <MapPin className="w-5 h-5 text-[var(--bronze-antique)]" />
                          <span className="text-sm">{chateau.region}</span>
                        </div>
                        <div className="flex items-center text-gray-700" style={{ gap: '5px' }}>
                          <Users className="w-5 h-5 text-[var(--bronze-antique)]" />
                          <span className="text-sm">
                            {chateau.capacite.min}-{chateau.capacite.max} personnes
                          </span>
                        </div>
                      </div>

                      {/* Atouts principaux */}
                      <ul className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150" style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {chateau.atouts.slice(0, 3).map((atout, i) => (
                          <li
                            key={i}
                            className="text-sm text-gray-700 flex items-start"
                          >
                            <span className="text-[var(--bronze-antique)] mt-0.5 font-bold text-base" style={{ marginRight: '5px' }}>•</span>
                            <span>{atout}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <div className="inline-flex items-center text-[var(--bronze-antique)] font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200" style={{ padding: '10px' }}>
                        <span className="text-sm uppercase tracking-wider">Découvrir</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>

                  {/* Badge région - toujours visible en haut */}
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full z-10 shadow-lg" style={{ padding: '10px' }}>
                    <span className="text-xs text-[var(--bronze-antique)] uppercase tracking-wider font-medium">
                      {chateau.region}
                    </span>
                  </div>

                  {/* Effet de bordure lumineuse au hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-800">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--bronze-antique)] to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--bronze-antique)] to-transparent" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA global */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center justify-center w-full px-4"
          style={{ marginTop: '30px' }}
        >
          <Link
            href="/chateaux"
            className="group inline-flex items-center bg-white/80 backdrop-blur-sm border border-[var(--bronze-antique)]/30 rounded-full text-gray-900 hover:text-[var(--bronze-antique)] hover:border-[var(--bronze-antique)] transition-all duration-500 hover:shadow-2xl"
            style={{ padding: '16px 32px' }}
          >
            <span className="font-medium">Voir tous nos châteaux</span>
            <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
