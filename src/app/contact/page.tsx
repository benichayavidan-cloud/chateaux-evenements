"use client";

import { Metadata } from "next";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, Sparkles } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section CLAIR */}
      <div className="relative h-screen overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1516690553513-7d1cf9ed90eb?w=1920&q=90"
          alt="Contact Châteaux Prestige"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Overlay CLAIR */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/25 to-white/50" />
        <div className="absolute inset-0 bg-white/30" />

        {/* Contenu centré */}
        <div className="relative h-full flex items-center">
          <div className="container mx-auto text-center" style={{ padding: '0 40px' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full mb-10 shadow-lg" style={{ padding: '14px 28px' }}>
                <Sparkles className="w-5 h-5 text-[var(--bronze-antique)]" />
                <span className="text-sm font-bold uppercase tracking-widest text-gray-900">
                  Contactez-nous
                </span>
              </div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-light italic text-gray-900 mb-10 font-[var(--font-cormorant)] leading-none">
                Parlons de<br />votre projet
              </h1>

              <p className="text-xl md:text-2xl text-gray-700 mb-14 max-w-3xl mx-auto leading-relaxed font-medium">
                Notre équipe d'experts est à votre disposition pour répondre à toutes vos questions
              </p>
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

      {/* Contenu principal avec plus d'espaces */}
      <div className="container mx-auto" style={{ padding: '100px 40px' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Informations de contact */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <h2 className="text-4xl md:text-5xl font-light italic text-gray-900 mb-14 font-[var(--font-cormorant)]">
                Nos coordonnées
              </h2>

              <div className="space-y-8 mb-14 max-w-xl mx-auto lg:mx-0">
                {/* Téléphone */}
                <div className="flex items-start gap-5 group">
                  <div className="w-16 h-16 bg-[var(--bronze-antique)]/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--bronze-antique)]/20 transition-all duration-300">
                    <Phone className="w-6 h-6 text-[var(--bronze-antique)]" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">
                      Téléphone
                    </h3>
                    <a
                      href="tel:+33123456789"
                      className="text-gray-700 hover:text-[var(--bronze-antique)] transition-colors text-lg font-medium block mb-2"
                    >
                      +33 1 23 45 67 89
                    </a>
                    <p className="text-sm text-gray-500">
                      Du lundi au vendredi, 9h-18h
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-5 group">
                  <div className="w-16 h-16 bg-[var(--bronze-antique)]/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--bronze-antique)]/20 transition-all duration-300">
                    <Mail className="w-6 h-6 text-[var(--bronze-antique)]" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">
                      Email
                    </h3>
                    <a
                      href="mailto:contact@chateauxprestige.fr"
                      className="text-gray-700 hover:text-[var(--bronze-antique)] transition-colors text-lg font-medium break-all block mb-2"
                    >
                      contact@chateauxprestige.fr
                    </a>
                    <p className="text-sm text-gray-500">
                      Réponse sous 24h ouvrées
                    </p>
                  </div>
                </div>

                {/* Adresse */}
                <div className="flex items-start gap-5 group">
                  <div className="w-16 h-16 bg-[var(--bronze-antique)]/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--bronze-antique)]/20 transition-all duration-300">
                    <MapPin className="w-6 h-6 text-[var(--bronze-antique)]" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">
                      Adresse
                    </h3>
                    <p className="text-gray-700 leading-relaxed font-medium">
                      15 Avenue des Châteaux
                      <br />
                      75008 Paris, France
                    </p>
                  </div>
                </div>

                {/* Horaires */}
                <div className="flex items-start gap-5 group">
                  <div className="w-16 h-16 bg-[var(--bronze-antique)]/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--bronze-antique)]/20 transition-all duration-300">
                    <Clock className="w-6 h-6 text-[var(--bronze-antique)]" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">
                      Horaires
                    </h3>
                    <p className="text-gray-700 leading-relaxed font-medium">
                      Lundi - Vendredi : 9h00 - 18h00
                      <br />
                      Weekend : Sur rendez-vous uniquement
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Box avec plus d'espaces */}
              <div className="bg-gray-50 border border-gray-200 rounded-3xl hover:border-[var(--bronze-antique)] transition-all duration-300 hover:shadow-lg max-w-xl mx-auto lg:mx-0" style={{ padding: '40px' }}>
                <h3 className="text-3xl font-light italic text-gray-900 mb-6 font-[var(--font-cormorant)]">
                  Besoin d'un devis rapide ?
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Remplissez notre formulaire de devis en ligne et recevez une
                  réponse personnalisée sous 24h
                </p>
                <a
                  href="/devis"
                  className="inline-flex items-center gap-3 bg-[var(--bronze-antique)] text-white font-semibold rounded-full hover:bg-[var(--bronze-light)] transition-all duration-300 hover:shadow-xl group"
                  style={{ padding: '16px 32px' }}
                >
                  <span>Demander un Devis</span>
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>

            {/* Formulaire de contact avec plus d'espaces */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 rounded-3xl shadow-lg mx-auto w-full"
              style={{ padding: '50px' }}
            >
              <h2 className="text-3xl md:text-4xl font-light italic text-gray-900 mb-10 font-[var(--font-cormorant)] text-center lg:text-left">
                Envoyez-nous un message
              </h2>

              <form className="space-y-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">
                      Prénom <span className="text-[var(--bronze-antique)]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-white border-2 border-gray-200 rounded-xl focus:border-[var(--bronze-antique)] focus:outline-none text-gray-900 placeholder:text-gray-400 transition-all duration-300"
                      style={{ padding: '16px 18px' }}
                      placeholder="Votre prénom"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">
                      Nom <span className="text-[var(--bronze-antique)]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-white border-2 border-gray-200 rounded-xl focus:border-[var(--bronze-antique)] focus:outline-none text-gray-900 placeholder:text-gray-400 transition-all duration-300"
                      style={{ padding: '16px 18px' }}
                      placeholder="Votre nom"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">
                    Email <span className="text-[var(--bronze-antique)]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full bg-white border-2 border-gray-200 rounded-xl focus:border-[var(--bronze-antique)] focus:outline-none text-gray-900 placeholder:text-gray-400 transition-all duration-300"
                    style={{ padding: '16px 18px' }}
                    placeholder="votre.email@entreprise.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    className="w-full bg-white border-2 border-gray-200 rounded-xl focus:border-[var(--bronze-antique)] focus:outline-none text-gray-900 placeholder:text-gray-400 transition-all duration-300"
                    style={{ padding: '16px 18px' }}
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">
                    Entreprise
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white border-2 border-gray-200 rounded-xl focus:border-[var(--bronze-antique)] focus:outline-none text-gray-900 placeholder:text-gray-400 transition-all duration-300"
                    style={{ padding: '16px 18px' }}
                    placeholder="Nom de votre entreprise"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">
                    Sujet <span className="text-[var(--bronze-antique)]">*</span>
                  </label>
                  <select
                    required
                    className="w-full bg-white border-2 border-gray-200 rounded-xl focus:border-[var(--bronze-antique)] focus:outline-none text-gray-900 transition-all duration-300"
                    style={{ padding: '16px 18px' }}
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="devis">Demande de devis</option>
                    <option value="info">Information générale</option>
                    <option value="visite">Demande de visite</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">
                    Message <span className="text-[var(--bronze-antique)]">*</span>
                  </label>
                  <textarea
                    required
                    rows={6}
                    className="w-full bg-white border-2 border-gray-200 rounded-xl focus:border-[var(--bronze-antique)] focus:outline-none resize-none text-gray-900 placeholder:text-gray-400 transition-all duration-300"
                    style={{ padding: '16px 18px' }}
                    placeholder="Décrivez-nous votre projet..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[var(--bronze-antique)] text-white font-semibold rounded-full hover:bg-[var(--bronze-light)] transition-all duration-300 shadow-lg hover:shadow-xl group flex items-center justify-center gap-3"
                  style={{ padding: '18px 40px' }}
                >
                  <span>Envoyer le message</span>
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* FAQ Section avec plus d'espaces */}
      <div className="bg-gray-50">
        <div className="container mx-auto" style={{ padding: '140px 40px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <Sparkles className="w-7 h-7 text-[var(--bronze-antique)]" />
              <h2 className="text-sm uppercase tracking-widest font-bold text-[var(--bronze-antique)]">
                FAQ
              </h2>
            </div>
            <h3 className="text-5xl md:text-6xl font-light italic text-gray-900 mb-8 font-[var(--font-cormorant)]">
              Questions Fréquentes
            </h3>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Retrouvez les réponses aux questions les plus courantes
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-7">
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
                className="bg-white border border-gray-200 rounded-3xl hover:border-[var(--bronze-antique)] transition-all duration-300 hover:shadow-lg group"
                style={{ padding: '40px' }}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-[var(--bronze-antique)] transition-colors">
                  {faq.q}
                </h3>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
