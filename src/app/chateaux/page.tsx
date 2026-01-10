"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Users, ArrowRight, Check, Sparkles, Award, Star, Phone, Calendar, Shield, TrendingUp, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { chateaux } from "@/data/chateaux";
import { theme } from "@/config/theme";
import { colors, spacing } from "@/config/themeHelpers";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { useState, useEffect } from "react";

export default function ChateauxPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play du slider
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % chateaux.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % chateaux.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + chateaux.length) % chateaux.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Slider Section - FULL SCREEN */}
      <section style={{ height: '85vh', minHeight: '600px' }} className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          {chateaux.map((chateau, index) => (
            index === currentSlide && (
              <motion.div
                key={chateau.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
              >
                {/* Image Background */}
                <div className="absolute inset-0">
                  <Image
                    src={chateau.images[0]}
                    alt={chateau.nom}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    quality={95}
                    sizes="100vw"
                  />
                </div>

                {/* Overlay gradient sophistiqué */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.65) 100%)",
                  }}
                />

                {/* Contenu Hero */}
                <div className="relative h-full flex items-center">
                  <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                    <div className="max-w-3xl">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      >
                        {/* Badge */}
                        <Badge
                          variant="glass"
                          size="lg"
                          icon={<MapPin className="w-4 h-4" />}
                          style={{ marginBottom: spacing.xl }}
                        >
                          {chateau.region}
                        </Badge>

                        {/* Titre */}
                        <h1
                          style={{
                            fontSize: "clamp(2.5rem, 6vw, 5rem)",
                            fontWeight: theme.typography.fontWeight.light,
                            fontStyle: "italic",
                            color: theme.colors.neutral.white,
                            fontFamily: theme.typography.fonts.heading,
                            lineHeight: theme.typography.lineHeight.tight,
                            marginBottom: spacing.xl,
                          }}
                        >
                          {chateau.nom}
                        </h1>

                        {/* Description */}
                        <p
                          style={{
                            fontSize: theme.typography.fontSize.xl,
                            color: theme.colors.overlay.white80,
                            lineHeight: theme.typography.lineHeight.relaxed,
                            marginBottom: spacing["2xl"],
                          }}
                        >
                          {chateau.description}
                        </p>

                        {/* Infos clés */}
                        <div className="flex flex-wrap items-center gap-6 mb-8">
                          <div className="flex items-center gap-2">
                            <Users className="w-5 h-5" style={{ color: colors.gold }} />
                            <span style={{ fontSize: theme.typography.fontSize.lg, color: theme.colors.neutral.white }}>
                              {chateau.capacite.min}-{chateau.capacite.max} personnes
                            </span>
                          </div>
                          <Badge variant="glass" size="md">
                            {chateau.styleArchitectural}
                          </Badge>
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Button
                            href={`/chateaux/${chateau.slug}`}
                            variant="primary"
                            size="lg"
                            icon={<ArrowRight className="w-5 h-5" />}
                          >
                            Découvrir ce Château
                          </Button>
                          <Button
                            href="/devis"
                            variant="secondary"
                            size="lg"
                            icon={<Calendar className="w-5 h-5" />}
                          >
                            Obtenir un Devis
                          </Button>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* Navigation Slider */}
        <div className="absolute bottom-8 left-0 right-0 z-20">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="flex items-center justify-between max-w-3xl">
              {/* Boutons prev/next */}
              <div className="flex gap-2">
                <button
                  onClick={prevSlide}
                  className="flex items-center justify-center hover:scale-110 transition-transform"
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: theme.effects.borderRadius.full,
                    background: theme.colors.overlay.white20,
                    backdropFilter: `blur(${theme.effects.blur.sm})`,
                    border: `1px solid ${theme.colors.overlay.white30}`,
                    color: theme.colors.neutral.white,
                  }}
                  aria-label="Château précédent"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="flex items-center justify-center hover:scale-110 transition-transform"
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: theme.effects.borderRadius.full,
                    background: theme.colors.overlay.white20,
                    backdropFilter: `blur(${theme.effects.blur.sm})`,
                    border: `1px solid ${theme.colors.overlay.white30}`,
                    color: theme.colors.neutral.white,
                  }}
                  aria-label="Château suivant"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Indicateurs */}
              <div className="flex gap-3">
                {chateaux.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className="transition-all"
                    style={{
                      width: currentSlide === index ? "48px" : "12px",
                      height: "12px",
                      borderRadius: theme.effects.borderRadius.full,
                      background: currentSlide === index ? colors.gold : theme.colors.overlay.white30,
                      backdropFilter: `blur(${theme.effects.blur.sm})`,
                    }}
                    aria-label={`Aller au château ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Proposition de Valeur / USP */}
      <section className="py-20 md:py-24" style={{ background: theme.colors.neutral.gray50 }}>
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: theme.typography.fontWeight.light,
                fontStyle: "italic",
                color: theme.colors.text.primary,
                fontFamily: theme.typography.fonts.heading,
                marginBottom: spacing.lg,
              }}
            >
              Pourquoi Choisir Nos Châteaux ?
            </h2>
            <p
              style={{
                fontSize: theme.typography.fontSize.xl,
                color: theme.colors.text.secondary,
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              Une expérience premium clé en main pour vos événements d'entreprise
            </p>
          </motion.div>

          {/* Grid des USP */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: <Award className="w-8 h-8" />,
                title: "Excellence Garantie",
                description: "Châteaux classés monuments historiques avec services 5 étoiles"
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "Disponibilité 24/7",
                description: "Équipe dédiée et réponse sous 2h pour toute demande urgente"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Annulation Flexible",
                description: "Politique d'annulation jusqu'à 30 jours avant votre événement"
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "98% Satisfaction",
                description: "Plus de 500 événements organisés avec succès depuis 15 ans"
              },
            ].map((usp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card variant="hover" padding="lg" hoverable className="h-full text-center">
                  <div
                    className="flex items-center justify-center mx-auto mb-4"
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: theme.effects.borderRadius.full,
                      background: `${colors.bronze}15`,
                      color: colors.bronze,
                    }}
                  >
                    {usp.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: theme.typography.fontSize.lg,
                      fontWeight: theme.typography.fontWeight.semibold,
                      color: theme.colors.text.primary,
                      marginBottom: spacing.sm,
                    }}
                  >
                    {usp.title}
                  </h3>
                  <p
                    style={{
                      fontSize: theme.typography.fontSize.sm,
                      color: theme.colors.text.muted,
                      lineHeight: theme.typography.lineHeight.relaxed,
                    }}
                  >
                    {usp.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Châteaux - Design Premium Orienté Conversion */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-6 h-6" style={{ color: colors.bronze }} />
              <span
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  textTransform: "uppercase",
                  letterSpacing: theme.typography.letterSpacing.ultra,
                  fontWeight: theme.typography.fontWeight.bold,
                  color: colors.bronze,
                }}
              >
                Notre Sélection Exclusive
              </span>
            </div>
            <h2
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: theme.typography.fontWeight.light,
                fontStyle: "italic",
                color: theme.colors.text.primary,
                fontFamily: theme.typography.fonts.heading,
              }}
            >
              3 Châteaux d'Exception
            </h2>
          </motion.div>

          {/* Grid Châteaux */}
          <div className="space-y-16 md:space-y-24">
            {chateaux.map((chateau, index) => (
              <motion.div
                key={chateau.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true }}
                className={index % 2 === 0 ? "" : ""}
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center ${index % 2 !== 0 ? 'lg:grid-flow-dense' : ''}`}>
                  {/* Image */}
                  <div className={`relative ${index % 2 !== 0 ? 'lg:col-start-2' : ''}`}>
                    <Card variant="hover" padding="none" hoverable className="overflow-hidden group">
                      <div className="relative h-96 md:h-[500px]">
                        <Image
                          src={chateau.images[0]}
                          alt={chateau.nom}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        {/* Badge exclusif */}
                        <div className="absolute top-6 right-6">
                          <Badge variant="glass" size="lg" icon={<Award className="w-5 h-5" />}>
                            Prestige
                          </Badge>
                        </div>
                        {/* Galerie miniature */}
                        <div className="absolute bottom-6 left-6 right-6 flex gap-2">
                          {chateau.images.slice(1, 4).map((image, i) => (
                            <div
                              key={i}
                              className="relative flex-1 h-20 rounded-lg overflow-hidden"
                            >
                              <Image
                                src={image}
                                alt={`${chateau.nom} ${i + 2}`}
                                fill
                                className="object-cover"
                                sizes="200px"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Contenu */}
                  <div className={index % 2 !== 0 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                    {/* Badge région */}
                    <Badge
                      variant="outline"
                      size="md"
                      icon={<MapPin className="w-4 h-4" />}
                      style={{ marginBottom: spacing.lg }}
                    >
                      {chateau.region}
                    </Badge>

                    {/* Titre */}
                    <h3
                      style={{
                        fontSize: "clamp(2rem, 4vw, 3rem)",
                        fontWeight: theme.typography.fontWeight.light,
                        fontStyle: "italic",
                        color: theme.colors.text.primary,
                        fontFamily: theme.typography.fonts.heading,
                        marginBottom: spacing.md,
                      }}
                    >
                      {chateau.nom}
                    </h3>

                    {/* Type architectural */}
                    <p
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: colors.bronze,
                        textTransform: "uppercase",
                        letterSpacing: theme.typography.letterSpacing.wider,
                        fontWeight: theme.typography.fontWeight.medium,
                        marginBottom: spacing.xl,
                      }}
                    >
                      {chateau.styleArchitectural}
                    </p>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: theme.typography.fontSize.lg,
                        color: theme.colors.text.secondary,
                        lineHeight: theme.typography.lineHeight.relaxed,
                        marginBottom: spacing["2xl"],
                      }}
                    >
                      {chateau.description}
                    </p>

                    {/* Capacité highlight */}
                    <div
                      className="inline-flex items-center gap-3 mb-8 p-4 rounded-xl"
                      style={{
                        background: `${colors.bronze}10`,
                        border: `1px solid ${colors.bronze}30`,
                      }}
                    >
                      <Users className="w-6 h-6" style={{ color: colors.bronze }} />
                      <div>
                        <div
                          style={{
                            fontSize: theme.typography.fontSize.xs,
                            color: theme.colors.text.muted,
                            textTransform: "uppercase",
                            letterSpacing: theme.typography.letterSpacing.wider,
                          }}
                        >
                          Capacité
                        </div>
                        <div
                          style={{
                            fontSize: theme.typography.fontSize.xl,
                            fontWeight: theme.typography.fontWeight.bold,
                            color: colors.bronze,
                          }}
                        >
                          {chateau.capacite.min}-{chateau.capacite.max} personnes
                        </div>
                      </div>
                    </div>

                    {/* Points forts */}
                    <div className="mb-8">
                      <h4
                        style={{
                          fontSize: theme.typography.fontSize.base,
                          fontWeight: theme.typography.fontWeight.semibold,
                          color: theme.colors.text.primary,
                          marginBottom: spacing.lg,
                        }}
                      >
                        Points Forts
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {chateau.atouts.map((atout, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2"
                          >
                            <div
                              className="flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{
                                width: "20px",
                                height: "20px",
                                borderRadius: theme.effects.borderRadius.full,
                                background: colors.bronze,
                              }}
                            >
                              <Check className="w-3 h-3" style={{ color: theme.colors.neutral.white }} />
                            </div>
                            <span
                              style={{
                                fontSize: theme.typography.fontSize.sm,
                                color: theme.colors.text.secondary,
                              }}
                            >
                              {atout}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        href={`/chateaux/${chateau.slug}`}
                        variant="primary"
                        size="lg"
                        icon={<ArrowRight className="w-5 h-5" />}
                      >
                        Visiter ce Château
                      </Button>
                      <Button
                        href="/devis"
                        variant="outline"
                        size="lg"
                        icon={<Calendar className="w-5 h-5" />}
                      >
                        Demander un Devis
                      </Button>
                    </div>

                    {/* Note de satisfaction */}
                    <div className="flex items-center gap-4 mt-6 pt-6 border-t" style={{ borderColor: theme.colors.neutral.gray200 }}>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5" style={{ fill: colors.gold, color: colors.gold }} />
                        ))}
                      </div>
                      <span style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.muted }}>
                        4.9/5 · Basé sur 120+ avis
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section Finale - Urgence et Conversion */}
      <section
        className="py-24 md:py-32 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${colors.bronze} 0%, ${colors.bronzeDark} 100%)`,
        }}
      >
        {/* Pattern décoratif */}
        <div className="absolute inset-0 opacity-10">
          <div style={{
            backgroundImage: `radial-gradient(circle, ${theme.colors.neutral.white} 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            width: "100%",
            height: "100%",
          }} />
        </div>

        <div className="container mx-auto text-center px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Sparkles
              className="mx-auto mb-6"
              style={{ width: "56px", height: "56px", color: theme.colors.neutral.white }}
            />

            <h2
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                fontWeight: theme.typography.fontWeight.light,
                fontStyle: "italic",
                color: theme.colors.neutral.white,
                fontFamily: theme.typography.fonts.heading,
                lineHeight: theme.typography.lineHeight.tight,
                marginBottom: spacing.xl,
              }}
            >
              Prêt à Organiser Votre Événement ?
            </h2>

            <p
              style={{
                fontSize: theme.typography.fontSize.xl,
                color: theme.colors.overlay.white90,
                lineHeight: theme.typography.lineHeight.relaxed,
                marginBottom: spacing["3xl"],
                maxWidth: "700px",
                margin: `0 auto ${spacing["3xl"]}`,
              }}
            >
              Nos experts vous accompagnent gratuitement dans le choix du château idéal.
              Réponse sous 2h et devis personnalisé sous 24h.
            </p>

            {/* USP Pills */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
              {[
                { icon: <Phone />, text: "Réponse sous 2h" },
                { icon: <Calendar />, text: "Visite virtuelle gratuite" },
                { icon: <Shield />, text: "Garantie satisfaction" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{
                    background: theme.colors.overlay.white20,
                    backdropFilter: `blur(${theme.effects.blur.sm})`,
                    border: `1px solid ${theme.colors.overlay.white30}`,
                    color: theme.colors.neutral.white,
                  }}
                >
                  <div style={{ width: "16px", height: "16px" }}>
                    {item.icon}
                  </div>
                  <span style={{ fontSize: theme.typography.fontSize.sm, fontWeight: theme.typography.fontWeight.medium }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs Principaux */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href="/devis"
                variant="secondary"
                size="lg"
                icon={<ArrowRight className="w-6 h-6" />}
              >
                Obtenir Mon Devis Gratuit
              </Button>
              <Button
                href="/contact"
                variant="ghost"
                size="lg"
                icon={<Phone className="w-6 h-6" />}
                style={{
                  color: theme.colors.neutral.white,
                  borderColor: theme.colors.overlay.white30,
                }}
              >
                Appeler un Expert
              </Button>
            </div>

            {/* Note urgence */}
            <p
              style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.overlay.white70,
                marginTop: spacing.xl,
              }}
            >
              ⚡ Places limitées : Réservez dès maintenant pour garantir vos dates
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
