"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Users, ArrowLeft, Check, Sparkles, Calendar, Award } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Chateau = {
  id: string;
  nom: string;
  slug: string;
  region: string;
  capacite_min: number;
  capacite_max: number;
  style_architectural: string;
  description: string;
  atouts: string[];
  images: string[];
};

export default function ChateauPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [chateau, setChateau] = useState<Chateau | null>(null);
  const [loading, setLoading] = useState(true);
  const { scrollY } = useScroll();

  // Parallax effect pour le hero
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    async function fetchChateau() {
      const { data, error } = await supabase
        .from("chateaux")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error || !data) {
        notFound();
      }

      setChateau(data);
      setLoading(false);
    }

    fetchChateau();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-[var(--bronze-antique)] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 font-medium">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!chateau) return null;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Full Screen Immersive */}
      <div className="relative h-screen overflow-hidden">
        {/* Image avec parallax */}
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 w-full h-[120vh]"
        >
          <Image
            src={chateau.images[0]}
            alt={chateau.nom}
            fill
            className="object-cover"
            priority
            quality={90}
            sizes="100vw"
          />
        </motion.div>

        {/* Overlay CLAIR pour lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/10 to-white/30" />
        <div className="absolute inset-0 bg-white/15" />

        {/* Contenu Hero */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative h-full flex flex-col justify-between py-8"
        >
          {/* Header avec back button */}
          <div className="container mx-auto" style={{ padding: '0 40px' }}>
            <Link
              href="/chateaux"
              className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full text-gray-900 hover:bg-white transition-all duration-300 group shadow-lg"
              style={{ padding: '12px 24px' }}
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Retour</span>
            </Link>
          </div>

          {/* Titre et infos - Centré */}
          <div className="container mx-auto flex-1 flex flex-col justify-end" style={{ padding: '0 40px 80px' }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Badge style architectural */}
              <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full mb-6 shadow-lg" style={{ padding: '10px 20px' }}>
                <Award className="w-4 h-4 text-[var(--bronze-antique)]" />
                <span className="text-sm font-semibold text-gray-900">{chateau.style_architectural}</span>
              </div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-light italic text-gray-900 mb-6 font-[var(--font-cormorant)] leading-none">
                {chateau.nom}
              </h1>

              {/* Infos en badges modernes */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg" style={{ padding: '12px 20px' }}>
                  <MapPin className="w-5 h-5 text-[var(--bronze-antique)]" />
                  <span className="text-gray-900 font-semibold">{chateau.region}</span>
                </div>
                <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg" style={{ padding: '12px 20px' }}>
                  <Users className="w-5 h-5 text-[var(--bronze-antique)]" />
                  <span className="text-gray-900 font-semibold">
                    {chateau.capacite_min}-{chateau.capacite_max} personnes
                  </span>
                </div>
              </div>
            </motion.div>
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
        </motion.div>
      </div>

      {/* Contenu principal */}
      <div className="relative bg-white">
        {/* Section À propos - CENTRÉE */}
        <div className="container mx-auto" style={{ padding: '80px 40px' }}>
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-[var(--bronze-antique)]" />
                <h2 className="text-sm uppercase tracking-widest font-bold text-[var(--bronze-antique)]">
                  À propos
                </h2>
              </div>
              <h3 className="text-5xl md:text-6xl font-light italic text-gray-900 mb-8 font-[var(--font-cormorant)] leading-tight">
                Une expérience d'exception
              </h3>
              <p className="text-xl text-gray-700 leading-relaxed">
                {chateau.description}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Points forts - Bento Grid */}
        <div className="bg-gray-50">
          <div className="container mx-auto" style={{ padding: '80px 40px' }}>
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-light italic text-gray-900 font-[var(--font-cormorant)] mb-4">
                  Points forts
                </h2>
                <p className="text-lg text-gray-600">
                  Ce qui rend ce lieu unique
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {chateau.atouts.map((atout: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative bg-white rounded-3xl border border-gray-200 hover:border-[var(--bronze-antique)] transition-all duration-300 hover:shadow-2xl"
                    style={{ padding: '32px' }}
                  >
                    <div className="absolute rounded-full bg-[var(--bronze-antique)]/10 flex items-center justify-center group-hover:scale-110 transition-transform" style={{ top: '24px', right: '24px', width: '48px', height: '48px' }}>
                      <Check className="w-6 h-6 text-[var(--bronze-antique)]" />
                    </div>
                    <p className="text-lg font-medium text-gray-900 leading-relaxed" style={{ paddingRight: '64px' }}>
                      {atout}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Galerie - Masonry moderne */}
        <div className="container mx-auto" style={{ padding: '80px 40px' }}>
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-light italic text-gray-900 font-[var(--font-cormorant)] mb-4">
                Galerie
              </h2>
              <p className="text-lg text-gray-600">
                Découvrez les espaces du château
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {chateau.images.slice(1).map((image: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative overflow-hidden rounded-3xl group cursor-pointer ${
                    index === 0 ? 'md:col-span-2 md:row-span-2 h-[500px]' : 'h-64'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${chateau.nom} - ${index + 2}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(min-width: 1024px) 33vw, 50vw"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section finale */}
        <div className="bg-gray-50">
          <div className="container mx-auto text-center" style={{ padding: '120px 40px' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-5xl md:text-6xl font-light italic text-gray-900 mb-6 font-[var(--font-cormorant)]">
                Prêt à organiser votre événement ?
              </h2>
              <p className="text-xl text-gray-600 mb-12">
                Contactez-nous pour recevoir une proposition personnalisée
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/devis"
                  className="group relative bg-[var(--bronze-antique)] text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl inline-flex items-center gap-3"
                  style={{ padding: '16px 40px' }}
                >
                  <span className="relative z-10">Demander un Devis</span>
                  <Calendar className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform" />
                  <span className="absolute inset-0 bg-[var(--bronze-light)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>

                <Link
                  href="/chateaux"
                  className="bg-white text-gray-900 font-semibold rounded-full border-2 border-gray-200 hover:border-[var(--bronze-antique)] transition-all duration-300"
                  style={{ padding: '16px 40px' }}
                >
                  Voir d'autres châteaux
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Info Card - Sticky */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="fixed z-40 hidden xl:block"
        style={{ bottom: '32px', right: '32px' }}
      >
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-3xl shadow-2xl" style={{ padding: '32px', width: '320px' }}>
          <h3 className="text-xl font-semibold text-gray-900 mb-6 font-[var(--font-cormorant)] italic">
            Informations
          </h3>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ marginBottom: '20px' }}>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-bold">
                Style
              </p>
              <p className="text-gray-900 font-medium">
                {chateau.style_architectural}
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-bold">
                Capacité
              </p>
              <p className="text-gray-900 font-medium">
                {chateau.capacite_min} à {chateau.capacite_max} personnes
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-bold">
                Région
              </p>
              <p className="text-gray-900 font-medium">{chateau.region}</p>
            </div>
          </div>

          <Link
            href="/devis"
            className="w-full inline-flex items-center justify-center bg-[var(--bronze-antique)] text-white font-semibold rounded-full hover:bg-[var(--bronze-light)] transition-all duration-300 hover:shadow-lg"
            style={{ padding: '14px 24px' }}
          >
            Réserver
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
