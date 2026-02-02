"use client";

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles, Calendar, Users, Trophy } from "lucide-react";
import { typesEvenements } from "@/data/chateaux";
import { LogoCarousel } from "@/components/LogoCarousel";
import { ReviewsSection } from "@/components/ReviewsSection";

export default function EvenementsPage() {
  // Schema JSON-LD Service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.selectchateaux.com/seminaires-soirees-entreprise#service",
    "name": "Organisation d'Événements d'Entreprise en Château",
    "description": "Service complet d'organisation d'événements professionnels (séminaires, team building, soirées d'entreprise) dans des châteaux d'exception en Île-de-France",
    "provider": {
      "@type": "Organization",
      "@id": "https://www.selectchateaux.com/#organization",
      "name": "Select Châteaux"
    },
    "areaServed": {
      "@type": "State",
      "name": "Île-de-France"
    },
    "serviceType": "Organisation d'événements professionnels",
    "audience": {
      "@type": "Audience",
      "audienceType": "Entreprises"
    },
    "serviceOutput": [
      {
        "@type": "Thing",
        "name": "Séminaire d'entreprise"
      },
      {
        "@type": "Thing",
        "name": "Team building"
      },
      {
        "@type": "Thing",
        "name": "Événement corporate"
      },
      {
        "@type": "Thing",
        "name": "CODIR"
      }
    ],
    "offers": {
      "@type": "AggregateOffer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "EUR",
      "priceRange": "$$$"
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Schema JSON-LD Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Hero Section */}
      <div className="hero-section">
        <Image
          src="/images/seminaires-soirees-entreprise-hero.webp"
          alt="Séminaire d'entreprise et déjeuner corporate dans un château en Île-de-France - Organisation événements professionnels"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={85}
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

              <h1 className="heading-display mb-3 leading-none">
                Vos Événements d'Exception
              </h1>

              <p className="text-body-xl mb-8 max-w-3xl font-medium text-gray-700">
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
        <div className="absolute left-1/2 -translate-x-1/2 z-10" style={{ bottom: '2rem' }}>
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

      {/* Types d'événements - Style Stripe Parallax */}
      <div className="section-white" style={{ padding: '40px 20px', background: '#f6f9fc' }}>
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="heading-xl mb-md" style={{ color: '#1a1f36' }}>
              Nos Services
            </h2>
            <p className="text-body-xl mb-xl max-w-3xl mx-auto" style={{ color: '#6b7c93' }}>
              Des solutions sur-mesure pour transformer vos événements professionnels en moments inoubliables
            </p>
          </motion.div>

          <div className="stripe-events-grid">
            {typesEvenements.map((evenement, index) => (
              <motion.div
                key={evenement.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="stripe-card group"
              >
                {/* Image Container avec Parallax */}
                <div className="stripe-card-image-container">
                  <span className="stripe-card-badge">Premium</span>
                  <Image
                    src={evenement.image}
                    alt={evenement.titre}
                    fill
                    className="stripe-card-image"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                {/* Card Content */}
                <div className="stripe-card-content">
                  <h3 className="stripe-card-title">{evenement.titre}</h3>
                  <p className="stripe-card-description">{evenement.description}</p>

                  {/* Features Grid */}
                  <div className="stripe-card-features">
                    {evenement.servicesInclus.slice(0, 4).map((service, i) => (
                      <div key={i} className="stripe-feature-item">
                        <span className="stripe-feature-icon">✓</span>
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/devis" className="stripe-button group/btn">
                    <span>En savoir plus</span>
                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Processus */}
      <div style={{ paddingTop: '40px', paddingBottom: '40px', background: '#ffffff' }}>
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full text-center mb-md"
          >
            <div className="flex-center gap-md mb-md">
              <Trophy className="w-7 h-7 text-[var(--bronze-antique)]" />
              <h2 className="text-label" style={{ color: '#A37E2C' }}>
                Notre processus
              </h2>
            </div>
            <h3 className="heading-xl mb-3" style={{ color: '#1a1f36' }}>
              Comment ça marche ?
            </h3>
            <p className="text-body-xl mb-md" style={{ color: '#6b7c93' }}>
              Un processus simple et personnalisé pour organiser votre événement parfait
            </p>
          </motion.div>

          <div className="flex flex-row gap-6 max-w-[var(--max-width-content)] mx-auto justify-center items-start">
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
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
                style={{ width: '250px' }}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="rounded-full bg-[var(--bronze-antique)] text-white flex-center text-3xl font-bold shadow-lg mb-md"
                  style={{ width: '90px', height: '90px' }}
                >
                  {item.step}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#1a1f36', minHeight: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.titre}
                </h3>
                <p className="leading-relaxed" style={{ color: '#6b7c93', fontSize: '14px' }}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="section-padding-sm" style={{ paddingBottom: 'clamp(3rem, 8vw, 5rem)', background: '#f6f9fc' }}>
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
            </div>
          </motion.div>
        </div>
      </div>

      {/* Section Témoignages */}
      <ReviewsSection />
    </div>
  );
}
