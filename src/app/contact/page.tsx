"use client";

import { Metadata } from "next";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, Sparkles } from "lucide-react";
import { TestimonialsSection } from "@/components/TestimonialsSection";

export default function ContactPage() {
  // Schema JSON-LD LocalBusiness
  // Note: Adresse exacte en cours de validation juridique
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.selectchateaux.com/#organization",
    "name": "Select Châteaux",
    "description": "Agence spécialisée dans l'organisation de séminaires d'entreprise et événements professionnels dans des châteaux d'exception en Île-de-France",
    "url": "https://www.selectchateaux.com/",
    "logo": "https://www.selectchateaux.com/logo.png",
    "image": "https://www.selectchateaux.com/og-image.jpg",
    "telephone": "+33757991146",
    "email": "seminaires@selectchateaux.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Paris",
      "addressRegion": "Île-de-France",
      "addressCountry": "FR"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "priceRange": "$$",
    "areaServed": {
      "@type": "State",
      "name": "Île-de-France"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "120",
      "bestRating": "5",
      "worstRating": "1"
    },
    "sameAs": [
      "https://www.linkedin.com/company/select-chateaux",
      "https://www.instagram.com/selectchateaux"
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Schema JSON-LD LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Hero Section avec image château et jardin */}
      <div style={{ height: '75vh' }} className="relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920&q=80"
          alt="Contact - Château et jardins"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={80}
        />
        {/* Overlay CLAIR - Style lumineux */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/25 to-white/50" />
        <div className="absolute inset-0 bg-white/30" />

        {/* Contenu centré */}
        <div className="relative h-screen flex items-center justify-center">
          <div className="section-container" style={{ paddingTop: 'var(--space-7xl)', paddingBottom: 'var(--space-7xl)' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center"
            >
              <div className="badge-lg flex items-center justify-center gap-3 bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg" style={{ marginBottom: 'var(--space-4xl)' }}>
                <Sparkles className="w-5 h-5 text-[var(--bronze-antique)]" />
                <span className="text-sm font-bold uppercase tracking-widest text-gray-900">
                  Contactez-nous
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light italic text-gray-900 font-[var(--font-cormorant)] leading-none" style={{ marginBottom: 'clamp(1.5rem, 4vw, 3rem)' }}>
                Parlons de<br />votre projet
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-3xl leading-relaxed font-medium" style={{ marginBottom: 'clamp(2rem, 5vw, 4rem)' }}>
                Notre équipe d'experts est à votre disposition pour répondre à toutes vos questions.
              </p>
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

      {/* Section Formulaire - Tout centré avec espaces respirants */}
      <div className="section-padding-sm">
        {/* Titre centré */}
        <div className="section-container" style={{ width: '100%', textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
          <h2 className="text-4xl md:text-5xl font-light italic text-gray-900 font-[var(--font-cormorant)]" style={{ marginBottom: 'var(--gap-md)' }}>
            Recevez vite votre devis
          </h2>
          <p className="text-xl text-gray-600">
            Découvrez si un de nos châteaux est disponible
          </p>
        </div>

        <div className="section-container">
          <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 lg:gap-24">
            {/* Informations de contact - Centré */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <h3 className="text-2xl sm:text-3xl font-light italic text-gray-900 font-[var(--font-cormorant)]" style={{ marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}>
                Nos coordonnées
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
                {/* Téléphone */}
                <div className="flex flex-col items-center gap-3 group">
                  <div className="w-16 h-16 bg-[var(--bronze-antique)]/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--bronze-antique)]/20 transition-all duration-300">
                    <Phone className="w-6 h-6 text-[var(--bronze-antique)]" />
                  </div>
                  <div className="text-center">
                    <h4 className="font-bold text-gray-900 mb-2 text-xs uppercase tracking-wider">
                      Téléphone
                    </h4>
                    <a
                      href="tel:+33757991146"
                      className="text-gray-700 hover:text-[var(--bronze-antique)] transition-colors text-base font-medium block mb-1"
                    >
                      07 57 99 11 46
                    </a>
                    <p className="text-xs text-gray-500">
                      Du lundi au vendredi, 9h-18h
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col items-center gap-3 group">
                  <div className="w-16 h-16 bg-[var(--bronze-antique)]/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--bronze-antique)]/20 transition-all duration-300">
                    <Mail className="w-6 h-6 text-[var(--bronze-antique)]" />
                  </div>
                  <div className="text-center">
                    <h4 className="font-bold text-gray-900 mb-2 text-xs uppercase tracking-wider">
                      Email
                    </h4>
                    <a
                      href="mailto:seminaires@selectchateaux.com"
                      className="text-gray-700 hover:text-[var(--bronze-antique)] transition-colors text-base font-medium block mb-1"
                    >
                      seminaires@selectchateaux.com
                    </a>
                    <p className="text-xs text-gray-500">
                      Réponse sous 24h ouvrées
                    </p>
                  </div>
                </div>

                {/* Adresse */}
                <div className="flex flex-col items-center gap-3 group">
                  <div className="w-16 h-16 bg-[var(--bronze-antique)]/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--bronze-antique)]/20 transition-all duration-300">
                    <MapPin className="w-6 h-6 text-[var(--bronze-antique)]" />
                  </div>
                  <div className="text-center">
                    <h4 className="font-bold text-gray-900 mb-2 text-xs uppercase tracking-wider">
                      Localisation
                    </h4>
                    <p className="text-gray-700 leading-relaxed font-medium text-sm">
                      Select Châteaux
                      <br />
                      Paris, Île-de-France
                    </p>
                  </div>
                </div>

                {/* Horaires */}
                <div className="flex flex-col items-center gap-3 group">
                  <div className="w-16 h-16 bg-[var(--bronze-antique)]/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--bronze-antique)]/20 transition-all duration-300">
                    <Clock className="w-6 h-6 text-[var(--bronze-antique)]" />
                  </div>
                  <div className="text-center">
                    <h4 className="font-bold text-gray-900 mb-2 text-xs uppercase tracking-wider">
                      Horaires
                    </h4>
                    <p className="text-gray-700 leading-relaxed font-medium text-sm">
                      Lundi - Vendredi : 9h00 - 18h00
                      <br />
                      Weekend : Sur rendez-vous
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Formulaire - Ultra compact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-50 border-2 border-gray-200 rounded-3xl shadow-xl mx-auto w-full"
              style={{ padding: 'clamp(1rem, 3vw, 1.5rem)' }}
            >
              <form>
                {/* Ligne 1: Prénom + Nom */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4" style={{ marginBottom: '14px' }}>
                  <div>
                    <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider" style={{ marginBottom: '4px' }}>
                      Prénom <span className="text-[var(--bronze-antique)]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-white border-2 border-gray-300 rounded-xl focus:border-[var(--bronze-antique)] focus:outline-none text-gray-900 placeholder:text-gray-400 transition-all duration-300"
                      style={{ padding: '10px 14px', fontSize: '16px' }}
                      placeholder="Votre prénom"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider" style={{ marginBottom: '4px' }}>
                      Nom <span className="text-[var(--bronze-antique)]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-white border-2 border-gray-300 rounded-xl focus:border-[var(--bronze-antique)] focus:outline-none text-gray-900 placeholder:text-gray-400 transition-all duration-300"
                      style={{ padding: '10px 14px', fontSize: '16px' }}
                      placeholder="Votre nom"
                    />
                  </div>
                </div>

                {/* Ligne 2: Email + Téléphone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4" style={{ marginBottom: '14px' }}>
                  <div>
                    <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider" style={{ marginBottom: '4px' }}>
                      Email <span className="text-[var(--bronze-antique)]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full bg-white border-2 border-gray-300 rounded-xl focus:border-[var(--bronze-antique)] focus:outline-none text-gray-900 placeholder:text-gray-400 transition-all duration-300"
                      style={{ padding: '10px 14px', fontSize: '16px' }}
                      placeholder="votre.email@entreprise.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider" style={{ marginBottom: '4px' }}>
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      className="w-full bg-white border-2 border-gray-300 rounded-xl focus:border-[var(--bronze-antique)] focus:outline-none text-gray-900 placeholder:text-gray-400 transition-all duration-300"
                      style={{ padding: '10px 14px', fontSize: '16px' }}
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>
                </div>

                {/* Ligne 3: Entreprise (pleine largeur) */}
                <div style={{ marginBottom: '14px' }}>
                  <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider" style={{ marginBottom: '4px' }}>
                    Entreprise
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white border-2 border-gray-300 rounded-xl focus:border-[var(--bronze-antique)] focus:outline-none text-gray-900 placeholder:text-gray-400 transition-all duration-300"
                    style={{ padding: '10px 14px', fontSize: '16px' }}
                    placeholder="Nom de votre entreprise"
                  />
                </div>

                {/* Message */}
                <div style={{ marginBottom: '14px' }}>
                  <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider" style={{ marginBottom: '4px' }}>
                    Message <span className="text-[var(--bronze-antique)]">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    className="w-full bg-white border-2 border-gray-300 rounded-xl focus:border-[var(--bronze-antique)] focus:outline-none resize-vertical text-gray-900 placeholder:text-gray-400 transition-all duration-300"
                    style={{ padding: '10px 14px', fontSize: '16px', minHeight: '80px' }}
                    placeholder="Décrivez-nous votre projet..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[var(--bronze-antique)] text-white font-semibold rounded-full hover:bg-[var(--bronze-light)] transition-all duration-300 shadow-lg hover:shadow-xl group flex items-center justify-center gap-3"
                  style={{ padding: 'clamp(10px, 2vw, 14px) clamp(18px, 3vw, 24px)', marginTop: '16px' }}
                >
                  <span>Envoyer le message</span>
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </motion.div>
          </div>
          </div>
        </div>
      </div>

      {/* Section FAQ - Tout centré avec plus d'espaces */}
      <div className="bg-gray-50">
        <div className="section-padding-sm section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ width: '100%', textAlign: 'center', marginBottom: 'var(--space-lg)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--gap-md)', marginBottom: 'var(--space-3xl)' }}>
              <Sparkles className="w-7 h-7 text-[var(--bronze-antique)]" />
              <h2 className="text-sm uppercase tracking-widest font-bold text-[var(--bronze-antique)]">
                FAQ
              </h2>
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light italic text-gray-900 font-[var(--font-cormorant)]" style={{ marginBottom: 'clamp(1.5rem, 4vw, 3rem)' }}>
              Questions Fréquentes
            </h3>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              Retrouvez les réponses aux questions les plus courantes
            </p>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '896px', margin: '0 auto', gap: 'var(--space-4xl)' }}>
            {[
              {
                q: "Quel est le délai de réservation recommandé ?",
                a: "Nous recommandons de réserver au moins 3 mois à l'avance pour garantir la disponibilité du château de votre choix. Pour les événements de grande envergure, un délai de 6 mois est préférable.",
              },
              {
                q: "Proposez-vous des visites des châteaux ?",
                a: "Oui, nous organisons des visites privées sur rendez-vous. Contactez-nous pour planifier votre visite et découvrir nos lieux d'exception.",
              },
              {
                q: "Les tarifs incluent-ils l'hébergement ?",
                a: "Nos tarifs peuvent inclure l'hébergement selon la formule choisie. Chaque devis est personnalisé en fonction de vos besoins spécifiques.",
              },
              {
                q: "Peut-on personnaliser le programme de l'événement ?",
                a: "Absolument ! Nous travaillons avec vous pour créer un programme sur-mesure qui répond parfaitement à vos objectifs et à vos attentes.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="w-full bg-white border-2 border-gray-200 rounded-3xl hover:border-[var(--bronze-antique)] transition-all duration-300 hover:shadow-xl group text-center"
                style={{ padding: 'clamp(1.5rem, 4vw, 3rem)' }}
              >
                <h4 className="text-xl sm:text-2xl font-semibold text-gray-900 group-hover:text-[var(--bronze-antique)] transition-colors" style={{ marginBottom: 'clamp(0.75rem, 2vw, 1rem)' }}>
                  {faq.q}
                </h4>
                <p className="text-gray-600 leading-relaxed text-base sm:text-lg">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Section Témoignages */}
      <TestimonialsSection />
    </div>
  );
}
