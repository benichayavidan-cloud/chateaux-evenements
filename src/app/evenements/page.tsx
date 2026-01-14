"use client";

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles, Calendar, Users, Trophy } from "lucide-react";
import { typesEvenements } from "@/data/chateaux";
import { LogoCarousel } from "@/components/LogoCarousel";
import { TestimonialsSection } from "@/components/TestimonialsSection";

export default function EvenementsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="hero-section">
        <Image
          src="/images/seminaire-entreprise-chateau-evenement-hero.jpg"
          alt="Événements d'entreprise dans un château"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Overlay CLAIR */}
        <div className="hero-overlay-light" />
        <div className="hero-overlay-light-extra" />

        {/* Contenu */}
        <div className="relative h-full flex-center">
          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-col-center"
            >
              <div className="badge-lg inline-flex items-center gap-3 bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg mb-10">
                <Sparkles className="w-5 h-5 text-[var(--bronze-antique)]" />
                <span className="text-label text-gray-900">
                  Événements sur mesure
                </span>
              </div>

              <h1 className="heading-display mb-5 leading-none">
                Vos Événements<br />d'Exception
              </h1>

              <p className="text-body-xl mb-14 max-w-3xl font-medium text-gray-700">
                Des solutions sur-mesure pour transformer vos événements professionnels en moments inoubliables.
              </p>

              <Link href="/devis" className="btn-primary group">
                <span>Planifier mon événement</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center gap-3"
          >
            <span
              className="text-gray-900 text-xs uppercase tracking-widest font-bold"
              style={{
                textShadow: '0 2px 4px rgba(255,255,255,0.8), 0 1px 2px rgba(0,0,0,0.2)'
              }}
            >
              Découvrir
            </span>
            <div className="w-6 h-10 border-2 rounded-full flex items-start justify-center p-2 shadow-lg" style={{
              borderColor: 'rgba(17, 24, 39, 0.8)',
              background: 'rgba(255, 255, 255, 0.95)'
            }}>
              <div className="w-1 h-3 bg-[var(--bronze-antique)] rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Section Logos Clients */}
      <LogoCarousel />

      {/* Types d'événements */}
      <div>
        {typesEvenements.map((evenement, index) => (
          <div
            key={evenement.id}
            className={`section-padding-lg ${index % 2 === 0 ? 'section-white' : 'section-gray'}`}
          >
            <div className="section-container">
              <div className="grid-2-cols">
                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  style={{ order: index % 2 === 0 ? 1 : 2 }}
                >
                  <div className="card-image group">
                    <Image
                      src={evenement.image}
                      alt={evenement.titre}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="50vw"
                    />
                  </div>
                </motion.div>

                {/* Contenu */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  style={{ order: index % 2 === 0 ? 2 : 1 }}
                  className="flex-col-center"
                >
                  {/* Badge */}
                  <div className="badge inline-flex items-center gap-3 bg-[var(--bronze-antique)]/10 mb-lg">
                    <Check className="w-5 h-5 text-[var(--bronze-antique)]" />
                    <span className="text-label text-[var(--bronze-antique)]">
                      Événement Premium
                    </span>
                  </div>

                  <h2 className="heading-xl mb-md">
                    {evenement.titre}
                  </h2>

                  <p className="text-body-xl mb-xl">
                    {evenement.description}
                  </p>

                  {/* Services inclus */}
                  <div className="mb-4xl w-full flex-col-center">
                    <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-md">
                      Services inclus
                    </h3>
                    <div className="flex flex-col gap-md">
                      {evenement.servicesInclus.map((service, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-md"
                        >
                          <div className="w-7 h-7 rounded-full bg-[var(--bronze-antique)]/10 flex-center flex-shrink-0">
                            <Check className="w-5 h-5 text-[var(--bronze-antique)]" />
                          </div>
                          <span className="text-gray-700 font-medium leading-relaxed text-left">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link href="/devis" className="btn-primary group">
                    <span>Organiser cet événement</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Processus */}
      <div className="section-gray section-padding-sm">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full text-center mb-lg"
          >
            <div className="flex-center gap-md mb-2xl">
              <Trophy className="w-7 h-7 text-[var(--bronze-antique)]" />
              <h2 className="text-label text-[var(--bronze-antique)]">
                Notre processus
              </h2>
            </div>
            <h3 className="heading-xl mb-4">
              Comment ça marche ?
            </h3>
            <p className="text-body-xl mb-xl">
              Un processus simple et personnalisé pour organiser votre événement parfait
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-3xl max-w-[var(--max-width-content)] mx-auto justify-center">
            {[
              {
                step: "1",
                titre: "Demande de devis",
                description: "Remplissez notre formulaire en 5 minutes pour nous présenter votre projet",
              },
              {
                step: "2",
                titre: "Étude personnalisée",
                description: "Notre équipe étudie vos besoins et vous contacte sous 24h",
              },
              {
                step: "3",
                titre: "Visite du château",
                description: "Découvrez votre futur lieu d'événement lors d'une visite privée",
              },
              {
                step: "4",
                titre: "Votre événement",
                description: "Nous orchestrons tous les détails pour un événement réussi",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="w-[250px] flex-col-center"
              >
                <div className="rounded-full bg-[var(--bronze-antique)] text-white flex-center text-3xl font-bold shadow-lg mb-2xl" style={{ width: 'var(--height-icon-lg)', height: 'var(--height-icon-lg)' }}>
                  {item.step}
                </div>
                <h3 className="heading-md mb-md">
                  {item.titre}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-lg">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="section-white section-padding-sm" style={{ paddingBottom: 'clamp(3rem, 8vw, 5rem)' }}>
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full text-center content-padding"
          >
            <h2 className="heading-xl mb-md">
              Prêt à créer un événement mémorable ?
            </h2>
            <p className="text-body-xl mb-xl">
              Nos équipes sont à votre écoute pour concrétiser votre projet
            </p>

            <div className="flex flex-wrap gap-lg items-center justify-center">
              <Link href="/devis" className="btn-primary group">
                <Calendar className="w-5 h-5" />
                <span>Demander un Devis</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link href="/contact" className="btn-secondary">
                <Users className="w-5 h-5" />
                <span>Parler à un Expert</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Section Témoignages */}
      <TestimonialsSection />
    </div>
  );
}
