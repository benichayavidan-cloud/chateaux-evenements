import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Users, ArrowLeft, Check } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Props = {
  params: Promise<{ slug: string }>;
};

// Générer les métadonnées dynamiques
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const { data: chateau } = await supabase
    .from("chateaux")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!chateau) {
    return {
      title: "Château non trouvé | ChâteauxPrestige",
    };
  }

  return {
    title: `${chateau.nom} | ChâteauxPrestige`,
    description: chateau.description,
  };
}

// Générer les routes statiques au build time
export async function generateStaticParams() {
  const { data: chateaux } = await supabase.from("chateaux").select("slug");

  return chateaux?.map((chateau) => ({
    slug: chateau.slug,
  })) || [];
}

export default async function ChateauPage({ params }: Props) {
  const { slug } = await params;

  // Récupérer les données du château depuis Supabase
  const { data: chateau, error } = await supabase
    .from("chateaux")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !chateau) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section avec image principale */}
      <div className="relative h-[60vh] overflow-hidden">
        <Image
          src={chateau.images[0]}
          alt={chateau.nom}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Contenu Hero */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="container mx-auto px-4 pb-12">
            <Link
              href="/chateaux"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Retour aux châteaux
            </Link>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light italic text-white mb-4 font-[var(--font-cormorant)]">
              {chateau.nom}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[var(--bronze-antique)]" />
                <span className="text-lg">{chateau.region}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[var(--bronze-antique)]" />
                <span className="text-lg">
                  {chateau.capacite_min}-{chateau.capacite_max} personnes
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Colonne gauche - Informations */}
            <div className="lg:col-span-2">
              {/* Description */}
              <div className="mb-12">
                <h2 className="text-3xl font-light italic text-gray-900 mb-6 font-[var(--font-cormorant)]">
                  À propos
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {chateau.description}
                </p>
              </div>

              {/* Atouts */}
              <div className="mb-12">
                <h2 className="text-3xl font-light italic text-gray-900 mb-6 font-[var(--font-cormorant)]">
                  Points forts
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {chateau.atouts.map((atout: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-200"
                    >
                      <Check className="w-5 h-5 text-[var(--bronze-antique)] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{atout}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Galerie d'images */}
              <div>
                <h2 className="text-3xl font-light italic text-gray-900 mb-6 font-[var(--font-cormorant)]">
                  Galerie
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {chateau.images.slice(1).map((image: string, index: number) => (
                    <div
                      key={index}
                      className="relative h-64 rounded-xl overflow-hidden group"
                    >
                      <Image
                        src={image}
                        alt={`${chateau.nom} - Image ${index + 2}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(min-width: 1024px) 33vw, 50vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Colonne droite - Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-2xl p-8 sticky top-24">
                <h3 className="text-2xl font-light italic text-gray-900 mb-6 font-[var(--font-cormorant)]">
                  Informations
                </h3>

                <div className="space-y-6 mb-8">
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                      Style architectural
                    </p>
                    <p className="text-gray-900 font-medium">
                      {chateau.style_architectural}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                      Capacité
                    </p>
                    <p className="text-gray-900 font-medium">
                      {chateau.capacite_min} à {chateau.capacite_max} personnes
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                      Région
                    </p>
                    <p className="text-gray-900 font-medium">{chateau.region}</p>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href="/devis"
                  className="w-full inline-flex items-center justify-center px-8 py-4 bg-[var(--bronze-antique)] text-white font-medium rounded-full hover:bg-[var(--bronze-light)] transition-all duration-500 hover:shadow-[var(--shadow-glow)]"
                >
                  Demander un Devis
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
