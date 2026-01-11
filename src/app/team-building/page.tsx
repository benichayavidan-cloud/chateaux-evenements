"use client";

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Users, Target, Zap, Heart, Trophy, Star, Sparkles, TrendingUp, Shield, Lightbulb, Rocket } from "lucide-react";
import { useRef } from "react";

export default function TeamBuildingPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section avec Parallax */}
      <div ref={heroRef} className="hero-section">
        <motion.div style={{ y }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1920&q=90"
            alt="Team Building d'exception"
            fill
            className="object-cover"
            priority
            quality={90}
          />
        </motion.div>

        {/* Overlay dynamique */}
        <div className="hero-overlay-light" />
        <div className="hero-overlay-light-extra" />

        {/* Contenu Hero */}
        <motion.div style={{ opacity }} className="relative h-full flex-center">
          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
              className="flex-col-center"
            >
              {/* Badge animé */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="badge-lg inline-flex items-center gap-3 bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg mb-10"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5 text-[var(--bronze-antique)]" />
                </motion.div>
                <span className="text-label text-gray-900">
                  Expériences inoubliables
                </span>
              </motion.div>

              {/* Titre avec animation */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="heading-display mb-5 leading-none"
              >
                Team Building
                <br />
                <motion.span
                  initial={{ backgroundPosition: "0% 50%" }}
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  style={{
                    background: "linear-gradient(90deg, #A37E2C, #D4AF37, #A37E2C, #D4AF37, #A37E2C)",
                    backgroundSize: "200% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  d'Exception
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-body-xl mb-14 max-w-3xl font-medium"
              >
                Transformez votre équipe avec des expériences immersives dans nos châteaux d'exception
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <Link href="/devis" className="btn-primary group hover:scale-105">
                  <span>Créer votre expérience</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator animé */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-gray-800 text-xs uppercase tracking-widest font-bold">Découvrir</span>
            <div className="w-6 h-10 border-2 border-gray-800 rounded-full flex items-start justify-center p-2 bg-white/90">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-1 h-3 bg-[var(--bronze-antique)] rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Section Stats avec animations */}
      <div
        style={{
          background: 'white',
          padding: '40px 24px'
        }}
      >
        <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { icon: Users, value: "500+", label: "Équipes formées" },
              { icon: Trophy, value: "98%", label: "Satisfaction" },
              { icon: Star, value: "4.9/5", label: "Note moyenne" },
              { icon: Target, value: "100%", label: "Sur-mesure" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex-col-center group cursor-default"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--bronze-antique)]/10 mb-5 group-hover:bg-[var(--bronze-antique)]/20 transition-all"
                >
                  <stat.icon className="w-8 h-8 text-[var(--bronze-antique)]" />
                </motion.div>
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  className="text-4xl font-bold text-gray-900 mb-3"
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-gray-600 uppercase tracking-wider font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Section Activités */}
      <div
        style={{
          background: '#f9fafb',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 24px'
        }}
      >
        <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{
              width: '100%',
              textAlign: 'center',
              marginBottom: '64px'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              marginBottom: '24px'
            }}>
              <Zap className="w-7 h-7 text-[var(--bronze-antique)]" />
              <h2 className="text-label text-[var(--bronze-antique)]">
                Nos activités
              </h2>
            </div>
            <h3 className="heading-xl" style={{ marginBottom: '12px' }}>
              Des expériences qui marquent
            </h3>
            <p className="text-body-xl" style={{ maxWidth: '768px', margin: '0 auto' }}>
              Chaque activité est conçue pour renforcer la cohésion, stimuler la créativité et créer des souvenirs mémorables
            </p>
          </motion.div>

          <div className="grid-cards">
            {[
              {
                icon: Lightbulb,
                titre: "Challenges Créatifs",
                description: "Stimulez l'innovation avec des ateliers de créativité dans nos salons historiques",
                color: "#D4AF37",
                image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
              },
              {
                icon: Target,
                titre: "Escape Game Château",
                description: "Résolvez des énigmes historiques en équipe dans les couloirs de nos châteaux",
                color: "#A37E2C",
                image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800&q=80"
              },
              {
                icon: Heart,
                titre: "Cohésion d'Équipe",
                description: "Renforcez les liens avec des activités de team building dans nos jardins",
                color: "#C09448",
                image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
              },
              {
                icon: Rocket,
                titre: "Leadership Training",
                description: "Développez les compétences de vos leaders dans un cadre inspirant",
                color: "#8A6823",
                image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
              },
              {
                icon: Shield,
                titre: "Gestion de Crise",
                description: "Simulez des situations complexes et apprenez à gérer le stress en équipe",
                color: "#B8860B",
                image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80"
              },
              {
                icon: TrendingUp,
                titre: "Séminaires Stratégiques",
                description: "Planifiez l'avenir de votre entreprise dans un environnement propice à la réflexion",
                color: "#A37E2C",
                image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80"
              },
            ].map((activite, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                  {/* Image avec overlay */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={activite.image}
                      alt={activite.titre}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Icône flottante */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 200 }}
                      viewport={{ once: true }}
                      className="absolute top-6 right-6 w-14 h-14 rounded-full flex-center shadow-xl"
                      style={{ backgroundColor: activite.color }}
                    >
                      <activite.icon className="w-7 h-7 text-white" />
                    </motion.div>
                  </div>

                  {/* Contenu */}
                  <div className="content-padding-lg text-center">
                    <h3 className="heading-md mb-3 group-hover:text-[var(--bronze-antique)] transition-colors">
                      {activite.titre}
                    </h3>
                    <p className="text-body-lg mb-10">
                      {activite.description}
                    </p>

                    {/* Arrow avec animation */}
                    <motion.div
                      className="flex items-center gap-2 text-[var(--bronze-antique)] font-semibold justify-center"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-sm uppercase tracking-wider">En savoir plus</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>

                  {/* Effet de lueur au hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${activite.color}15, transparent 70%)`
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Section Bénéfices */}
      <div
        style={{
          background: 'white',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 24px'
        }}
      >
        <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto' }}>
          {/* Header centré */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{
              textAlign: 'center',
              marginBottom: '64px'
            }}
          >
            <h2 className="heading-xl" style={{ marginBottom: '12px' }}>
              Pourquoi choisir nos expériences ?
            </h2>
            <p className="text-body-xl" style={{ maxWidth: '768px', margin: '0 auto' }}>
              Des bénéfices mesurables pour votre équipe
            </p>
          </motion.div>

          {/* Grille de bénéfices - Tout centré */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16" style={{ maxWidth: '1280px', margin: '0 auto' }}>
            {[
              {
                titre: "Cohésion renforcée",
                description: "Créez des liens authentiques entre vos collaborateurs dans un cadre exceptionnel",
                percentage: 95,
              },
              {
                titre: "Performance accrue",
                description: "Améliorez la productivité et l'efficacité de vos équipes grâce à une meilleure communication",
                percentage: 87,
              },
              {
                titre: "Motivation boostée",
                description: "Redonnez de l'énergie et de l'engagement à vos collaborateurs",
                percentage: 92,
              },
              {
                titre: "Culture d'entreprise",
                description: "Renforcez vos valeurs et créez une culture d'entreprise forte",
                percentage: 89,
              },
            ].map((benefice, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}
              >
                {/* Cercle de pourcentage */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 200 }}
                  viewport={{ once: true }}
                  className="w-24 h-24 rounded-full bg-[var(--bronze-antique)]/10 flex items-center justify-center p-5"
                  style={{ marginBottom: '24px' }}
                >
                  <span className="text-3xl font-bold text-[var(--bronze-antique)]">
                    {benefice.percentage}%
                  </span>
                </motion.div>

                {/* Titre */}
                <h3 className="heading-md text-center" style={{ marginBottom: '8px' }}>
                  {benefice.titre}
                </h3>

                {/* Description */}
                <p className="text-body-lg text-center" style={{ marginBottom: '32px' }}>
                  {benefice.description}
                </p>

                {/* Barre de progression animée */}
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${benefice.percentage}%` }}
                    transition={{ duration: 1.5, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="h-full rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #A37E2C, #D4AF37)"
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Section Témoignages */}
      <div
        style={{
          background: '#f9fafb',
          padding: '40px 24px',
          overflow: 'hidden'
        }}
      >
        <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{
              textAlign: 'center',
              marginBottom: '64px'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              marginBottom: '24px'
            }}>
              <Star className="w-7 h-7 text-[var(--bronze-antique)]" />
              <h2 className="text-label text-[var(--bronze-antique)]">
                Témoignages
              </h2>
            </div>
            <h3 className="heading-xl">
              Ils nous font confiance
            </h3>
          </motion.div>

          <div className="grid-cards" style={{ marginTop: '48px' }}>
            {[
              {
                nom: "Sophie Durand",
                poste: "DRH - Tech Innov",
                texte: "Une expérience transformatrice pour notre équipe. Le cadre exceptionnel des châteaux a créé une ambiance propice aux échanges authentiques.",
                rating: 5,
              },
              {
                nom: "Marc Lefèvre",
                poste: "CEO - StartUp Lab",
                texte: "Les activités proposées ont permis de révéler des talents cachés et de renforcer la cohésion. Nos collaborateurs en parlent encore !",
                rating: 5,
              },
              {
                nom: "Claire Martin",
                poste: "Manager - Corporate Plus",
                texte: "Un investissement qui en vaut la peine. L'impact sur la motivation et la performance de l'équipe est clairement mesurable.",
                rating: 5,
              },
            ].map((temoignage, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 relative text-center content-padding-lg"
              >
                {/* Guillemets décoratifs */}
                <div className="absolute top-6 left-6 text-6xl text-[var(--bronze-antique)]/10 font-serif leading-none">
                  "
                </div>

                {/* Étoiles */}
                <div className="flex gap-1 mb-8 relative z-10 justify-center">
                  {[...Array(temoignage.rating)].map((_, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.2 + j * 0.1, type: "spring" }}
                      viewport={{ once: true }}
                    >
                      <Star className="w-5 h-5 fill-[var(--bronze-antique)] text-[var(--bronze-antique)]" />
                    </motion.div>
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed mb-8 italic relative z-10">
                  {temoignage.texte}
                </p>

                <div className="flex items-center gap-4 relative z-10 justify-center">
                  <div className="w-12 h-12 rounded-full bg-[var(--bronze-antique)]/10 flex-center">
                    <span className="text-[var(--bronze-antique)] font-bold text-lg">
                      {temoignage.nom.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">{temoignage.nom}</div>
                    <div className="text-sm text-gray-600">{temoignage.poste}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div
        style={{
          position: 'relative',
          background: 'white',
          padding: '40px 24px',
          overflow: 'hidden'
        }}
      >
        {/* Cercles animés en arrière-plan */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full"
            style={{ background: "radial-gradient(circle, #A37E2C 0%, transparent 70%)" }}
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full"
            style={{ background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)" }}
          />
        </div>

        <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center' }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              style={{ display: 'inline-block', marginBottom: '32px' }}
            >
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'rgba(163, 126, 44, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto'
              }}>
                <Trophy className="w-10 h-10 text-[var(--bronze-antique)]" />
              </div>
            </motion.div>

            <h2 className="heading-xl" style={{ marginBottom: '12px' }}>
              Prêt à transformer votre équipe ?
            </h2>
            <p className="text-body-xl" style={{ maxWidth: '768px', margin: '0 auto 64px auto' }}>
              Contactez-nous pour créer une expérience team building sur-mesure dans l'un de nos châteaux d'exception
            </p>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/devis" className="btn-primary group">
                  <Rocket className="w-5 h-5" />
                  <span>Demander un Devis</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/contact" className="btn-secondary">
                  <Users className="w-5 h-5" />
                  <span>Parler à un Expert</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
