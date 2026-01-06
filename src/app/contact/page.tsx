import { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact | ChâteauxPrestige",
  description:
    "Contactez-nous pour organiser votre événement d'entreprise dans l'un de nos châteaux d'exception. Notre équipe est à votre écoute.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero dark */}
      <div className="relative bg-black text-white py-32 pt-40 overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[var(--bronze-antique)]/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light italic mb-6 font-[var(--font-cormorant)]">
            Contactez-nous
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            Notre équipe d'experts est à votre disposition pour répondre à
            toutes vos questions et vous accompagner dans votre projet
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Informations de contact */}
          <div>
            <h2 className="text-4xl font-light italic text-white mb-10 font-[var(--font-cormorant)]">
              Parlons de votre projet
            </h2>

            <div className="space-y-6 mb-12">
              <div className="flex items-start space-x-4 group">
                <div className="w-12 h-12 glass-premium border border-[var(--bronze-antique)]/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover:border-[var(--bronze-antique)] transition-all duration-500">
                  <Phone className="w-5 h-5 text-[var(--bronze-antique)]" />
                </div>
                <div>
                  <h3 className="font-medium text-white mb-2 text-sm uppercase tracking-wider">
                    Téléphone
                  </h3>
                  <a
                    href="tel:+33123456789"
                    className="text-white/70 hover:text-[var(--bronze-antique)] transition-colors text-lg"
                  >
                    +33 1 23 45 67 89
                  </a>
                  <p className="text-sm text-white/40 mt-1">
                    Du lundi au vendredi, 9h-18h
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="w-12 h-12 glass-premium border border-[var(--bronze-antique)]/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover:border-[var(--bronze-antique)] transition-all duration-500">
                  <Mail className="w-5 h-5 text-[var(--bronze-antique)]" />
                </div>
                <div>
                  <h3 className="font-medium text-white mb-2 text-sm uppercase tracking-wider">
                    Email
                  </h3>
                  <a
                    href="mailto:contact@chateauxprestige.fr"
                    className="text-white/70 hover:text-[var(--bronze-antique)] transition-colors text-lg break-all"
                  >
                    contact@chateauxprestige.fr
                  </a>
                  <p className="text-sm text-white/40 mt-1">
                    Réponse sous 24h ouvrées
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="w-12 h-12 glass-premium border border-[var(--bronze-antique)]/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover:border-[var(--bronze-antique)] transition-all duration-500">
                  <MapPin className="w-5 h-5 text-[var(--bronze-antique)]" />
                </div>
                <div>
                  <h3 className="font-medium text-white mb-2 text-sm uppercase tracking-wider">
                    Adresse
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    15 Avenue des Châteaux
                    <br />
                    75008 Paris, France
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="w-12 h-12 glass-premium border border-[var(--bronze-antique)]/30 rounded-full flex items-center justify-center flex-shrink-0 group-hover:border-[var(--bronze-antique)] transition-all duration-500">
                  <Clock className="w-5 h-5 text-[var(--bronze-antique)]" />
                </div>
                <div>
                  <h3 className="font-medium text-white mb-2 text-sm uppercase tracking-wider">
                    Horaires
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    Lundi - Vendredi : 9h00 - 18h00
                    <br />
                    Weekend : Sur rendez-vous uniquement
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Box */}
            <div className="glass-premium border border-[var(--bronze-antique)]/20 rounded-2xl p-8 hover:border-[var(--bronze-antique)]/40 transition-all duration-500 hover:shadow-[var(--shadow-glow)]">
              <h3 className="text-2xl font-light italic text-white mb-4 font-[var(--font-cormorant)]">
                Besoin d'un devis rapide ?
              </h3>
              <p className="text-white/70 mb-6 leading-relaxed">
                Remplissez notre formulaire de devis en ligne et recevez une
                réponse personnalisée sous 24h
              </p>
              <a
                href="/devis"
                className="inline-flex items-center px-8 py-3 bg-[var(--bronze-antique)] text-white font-medium rounded-full hover:bg-[var(--bronze-light)] transition-all duration-500 hover:shadow-[var(--shadow-glow)] group"
              >
                <span>Demander un Devis</span>
                <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="glass-premium border border-white/5 rounded-2xl p-8 lg:p-10">
            <h2 className="text-3xl font-light italic text-white mb-8 font-[var(--font-cormorant)]">
              Envoyez-nous un message
            </h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2 uppercase tracking-wider">
                    Prénom <span className="text-[var(--bronze-antique)]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:border-[var(--bronze-antique)] focus:outline-none text-white placeholder:text-white/30 transition-all duration-300"
                    placeholder="Votre prénom"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2 uppercase tracking-wider">
                    Nom <span className="text-[var(--bronze-antique)]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:border-[var(--bronze-antique)] focus:outline-none text-white placeholder:text-white/30 transition-all duration-300"
                    placeholder="Votre nom"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2 uppercase tracking-wider">
                  Email <span className="text-[var(--bronze-antique)]">*</span>
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:border-[var(--bronze-antique)] focus:outline-none text-white placeholder:text-white/30 transition-all duration-300"
                  placeholder="votre.email@entreprise.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2 uppercase tracking-wider">
                  Téléphone
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:border-[var(--bronze-antique)] focus:outline-none text-white placeholder:text-white/30 transition-all duration-300"
                  placeholder="+33 6 12 34 56 78"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2 uppercase tracking-wider">
                  Entreprise
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:border-[var(--bronze-antique)] focus:outline-none text-white placeholder:text-white/30 transition-all duration-300"
                  placeholder="Nom de votre entreprise"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2 uppercase tracking-wider">
                  Sujet <span className="text-[var(--bronze-antique)]">*</span>
                </label>
                <select
                  required
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:border-[var(--bronze-antique)] focus:outline-none text-white transition-all duration-300"
                >
                  <option value="" className="bg-black">Sélectionnez un sujet</option>
                  <option value="devis" className="bg-black">Demande de devis</option>
                  <option value="info" className="bg-black">Information générale</option>
                  <option value="visite" className="bg-black">Demande de visite</option>
                  <option value="autre" className="bg-black">Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2 uppercase tracking-wider">
                  Message <span className="text-[var(--bronze-antique)]">*</span>
                </label>
                <textarea
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg focus:border-[var(--bronze-antique)] focus:outline-none resize-none text-white placeholder:text-white/30 transition-all duration-300"
                  placeholder="Décrivez-nous votre projet..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-[var(--bronze-antique)] text-white font-medium rounded-full hover:bg-[var(--bronze-light)] transition-all duration-500 shadow-lg hover:shadow-[var(--shadow-glow)] hover:scale-[1.02] group flex items-center justify-center"
              >
                <span>Envoyer le message</span>
                <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-black py-20 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--bronze-antique)]/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-light italic text-center text-white mb-6 font-[var(--font-cormorant)]">
            Questions Fréquentes
          </h2>
          <p className="text-lg text-center text-white/60 mb-16 max-w-2xl mx-auto leading-relaxed">
            Retrouvez les réponses aux questions les plus courantes
          </p>

          <div className="max-w-3xl mx-auto space-y-6">
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
              <div
                key={index}
                className="glass-premium border border-white/5 rounded-xl p-6 hover:border-[var(--bronze-antique)]/30 transition-all duration-500 group"
              >
                <h3 className="font-medium text-white mb-3 group-hover:text-[var(--bronze-antique)] transition-colors">
                  {faq.q}
                </h3>
                <p className="text-white/70 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ligne décorative */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--bronze-antique)]/20 to-transparent" />
      </div>
    </div>
  );
}
