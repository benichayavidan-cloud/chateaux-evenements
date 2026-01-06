"use client";

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles, Calendar, Users, Trophy } from "lucide-react";
import { typesEvenements } from "@/data/chateaux";

export default function EvenementsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section CLAIR */}
      <div className="relative h-screen overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1920&q=90"
          alt="Événements d'entreprise"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Overlay CLAIR */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/15 to-white/40" />
        <div className="absolute inset-0 bg-white/20" />

        {/* Contenu */}
        <div className="relative h-full flex items-center">
          <div className="container mx-auto text-center" style={{ padding: '0 40px' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full mb-8 shadow-lg" style={{ padding: '12px 24px' }}>
                <Sparkles className="w-5 h-5 text-[var(--bronze-antique)]" />
                <span className="text-sm font-bold uppercase tracking-widest text-gray-900">
                  Événements sur mesure
                </span>
              </div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-light italic text-gray-900 mb-8 font-[var(--font-cormorant)] leading-none">
                Vos Événements<br />d'Exception
              </h1>

              <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
                Des solutions sur-mesure pour transformer vos événements professionnels en moments inoubliables
              </p>

              <Link
                href="/devis"
                className="inline-flex items-center gap-3 bg-[var(--bronze-antique)] text-white font-semibold rounded-full hover:bg-[var(--bronze-light)] transition-all duration-300 hover:shadow-2xl group"
                style={{ padding: '18px 40px' }}
              >
                <span>Planifier mon événement</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-gray-800 text-xs uppercase tracking-widest font-bold">Découvrir</span>
            <div className="w-6 h-10 border-2 border-gray-800 rounded-full flex items-start justify-center p-2 bg-white/90">
              <div className="w-1 h-3 bg-[var(--bronze-antique)] rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Types d'événements - MODERN */}
      <div style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        {typesEvenements.map((evenement, index) => (
          <div
            key={evenement.id}
            className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
            style={{ padding: '80px 0' }}
          >
            <div className="container mx-auto" style={{ padding: '0 40px' }}>
              <div className="max-w-7xl mx-auto">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}>
                  {/* Image */}
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className={index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}
                  >
                    <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
                      <Image
                        src={evenement.image}
                        alt={evenement.titre}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                      />
                    </div>
                  </motion.div>

                  {/* Contenu */}
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className={index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}
                  >
                    <div className="inline-flex items-center gap-2 bg-[var(--bronze-antique)]/10 rounded-full mb-6" style={{ padding: '8px 20px' }}>
                      <Check className="w-4 h-4 text-[var(--bronze-antique)]" />
                      <span className="text-xs font-bold uppercase tracking-widest text-[var(--bronze-antique)]">
                        Événement Premium
                      </span>
                    </div>

                    <h2 className="text-5xl font-light italic text-gray-900 mb-6 font-[var(--font-cormorant)]">
                      {evenement.titre}
                    </h2>

                    <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                      {evenement.description}
                    </p>

                    {/* Services inclus */}
                    <div className="mb-10">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider">
                        Services inclus
                      </h3>
                      <div className="grid grid-cols-1 gap-3">
                        {evenement.servicesInclus.map((service, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3"
                          >
                            <div className="w-6 h-6 rounded-full bg-[var(--bronze-antique)]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-4 h-4 text-[var(--bronze-antique)]" />
                            </div>
                            <span className="text-gray-700 font-medium">{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Link
                      href="/devis"
                      className="inline-flex items-center gap-3 bg-[var(--bronze-antique)] text-white font-semibold rounded-full hover:bg-[var(--bronze-light)] transition-all duration-300 hover:shadow-2xl group"
                      style={{ padding: '16px 32px' }}
                    >
                      <span>Organiser cet événement</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Processus - CENTERED */}
      <div className="bg-gray-50">
        <div className="container mx-auto text-center" style={{ padding: '120px 40px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mb-20"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Trophy className="w-6 h-6 text-[var(--bronze-antique)]" />
              <h2 className="text-sm uppercase tracking-widest font-bold text-[var(--bronze-antique)]">
                Notre processus
              </h2>
            </div>
            <h3 className="text-5xl md:text-6xl font-light italic text-gray-900 mb-6 font-[var(--font-cormorant)]">
              Comment ça marche ?
            </h3>
            <p className="text-xl text-gray-600 leading-relaxed">
              Un processus simple et personnalisé pour organiser votre événement parfait
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
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
                className="text-center"
              >
                <div className="rounded-full bg-[var(--bronze-antique)] text-white flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg" style={{ width: '80px', height: '80px' }}>
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {item.titre}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="bg-white">
        <div className="container mx-auto text-center" style={{ padding: '120px 40px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-5xl md:text-6xl font-light italic text-gray-900 mb-6 font-[var(--font-cormorant)]">
              Prêt à créer un événement mémorable ?
            </h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Nos équipes sont à votre écoute pour concrétiser votre projet
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/devis"
                className="inline-flex items-center gap-3 bg-[var(--bronze-antique)] text-white font-semibold rounded-full hover:bg-[var(--bronze-light)] transition-all duration-300 hover:shadow-2xl group"
                style={{ padding: '18px 40px' }}
              >
                <Calendar className="w-5 h-5" />
                <span>Demander un Devis</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-white text-gray-900 font-semibold rounded-full border-2 border-gray-200 hover:border-[var(--bronze-antique)] transition-all duration-300"
                style={{ padding: '18px 40px' }}
              >
                <Users className="w-5 h-5" />
                <span>Parler à un Expert</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
