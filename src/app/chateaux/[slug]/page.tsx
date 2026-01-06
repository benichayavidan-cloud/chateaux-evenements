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

        {/* Gradient overlay sophistiqué */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

        {/* Contenu Hero */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative h-full flex flex-col justify-between py-8"
        >
          {/* Header avec back button */}
          <div className="container mx-auto px-6">
            <Link
              href="/chateaux"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Retour</span>
            </Link>
          </div>

          {/* Titre et infos - Centré */}
          <div className="container mx-auto px-6 flex-1 flex flex-col justify-end pb-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Badge style architectural */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6">
                <Award className="w-4 h-4 text-[var(--bronze-antique)]" />
                <span className="text-sm font-medium text-white">{chateau.style_architectural}</span>
              </div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-light italic text-white mb-6 font-[var(--font-cormorant)] leading-none">
                {chateau.nom}
              </h1>

              {/* Infos en badges modernes */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                  <MapPin className="w-5 h-5 text-[var(--bronze-antique)]" />
                  <span className="text-white font-medium">{chateau.region}</span>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                  <Users className="w-5 h-5 text-[var(--bronze-antique)]" />
                  <span className="text-white font-medium">
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
              <span className="text-white/80 text-xs uppercase tracking-widest font-semibold">Découvrir</span>
              <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
                <div className="w-1 h-3 bg-white rounded-full" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Contenu principal */}
      <div className="relative bg-white">
        {/* Section À propos - Largeur contenue */}
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-[var(--bronze-antique)]" />
                <h2 className="text-sm uppercase tracking-widest font-semibold text-[var(--bronze-antique)]">
                  À propos
                </h2>
              </div>
              <h3 className="text-5xl md:text-6xl font-light italic text-gray-900 mb-8 font-[var(--font-cormorant)] leading-tight">
                Une expérience d'exception
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed">
                {chateau.description}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Points forts - Bento Grid */}
        <div className="container mx-auto px-6 py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12"
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
                  className="group relative bg-white p-8 rounded-3xl border border-gray-200 hover:border-[var(--bronze-antique)] transition-all duration-300 hover:shadow-2xl"
                >
                  <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-[var(--bronze-antique)]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Check className="w-6 h-6 text-[var(--bronze-antique)]" />
                  </div>
                  <p className="text-lg font-medium text-gray-900 pr-16 leading-relaxed">
                    {atout}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Galerie - Masonry moderne */}
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-light italic text-gray-900 font-[var(--font-cormorant)] mb-4">
                Galerie
              </h2>
              <p className="text-lg text-gray-600">
                Découvrez les espaces du château
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(min-width: 1024px) 33vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section finale */}
        <div className="relative py-32 overflow-hidden">
          {/* Background avec image floue */}
          <div className="absolute inset-0">
            <Image
              src={chateau.images[0]}
              alt="Background"
              fill
              className="object-cover opacity-10 blur-3xl"
            />
          </div>

          <div className="relative container mx-auto px-6 text-center">
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
                  className="group relative px-10 py-5 bg-[var(--bronze-antique)] text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl inline-flex items-center gap-3"
                >
                  <span className="relative z-10">Demander un Devis</span>
                  <Calendar className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform" />
                  <span className="absolute inset-0 bg-[var(--bronze-light)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>

                <Link
                  href="/chateaux"
                  className="px-10 py-5 bg-white text-gray-900 font-semibold rounded-full border-2 border-gray-200 hover:border-[var(--bronze-antique)] transition-all duration-300"
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
        className="fixed bottom-8 right-8 z-40 hidden xl:block"
      >
        <div className="bg-white/95 backdrop-blur-xl border border-gray-200 rounded-3xl p-6 shadow-2xl w-80">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 font-[var(--font-cormorant)] italic">
            Informations
          </h3>

          <div className="space-y-4 mb-6">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold">
                Style
              </p>
              <p className="text-gray-900 font-medium">
                {chateau.style_architectural}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold">
                Capacité
              </p>
              <p className="text-gray-900 font-medium">
                {chateau.capacite_min} à {chateau.capacite_max} personnes
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold">
                Région
              </p>
              <p className="text-gray-900 font-medium">{chateau.region}</p>
            </div>
          </div>

          <Link
            href="/devis"
            className="w-full inline-flex items-center justify-center px-6 py-3 bg-[var(--bronze-antique)] text-white font-semibold rounded-full hover:bg-[var(--bronze-light)] transition-all duration-300 hover:shadow-lg"
          >
            Réserver
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
