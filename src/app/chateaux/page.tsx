import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Users, ArrowRight } from "lucide-react";
import { chateaux } from "@/data/chateaux";

export const metadata: Metadata = {
  title: "Nos Châteaux d'Exception | ChâteauxPrestige",
  description:
    "Découvrez nos 4 châteaux d'exception en France pour organiser vos événements d'entreprise : séminaires, conventions et soirées prestigieuses.",
};

export default function ChateauxPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-[60vh] overflow-hidden">
        <Image
          src="https://picsum.photos/seed/hero-chateaux/1920/1080"
          alt="Châteaux d'exception"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        <div className="relative h-full container mx-auto px-4 flex items-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-[var(--font-playfair)]">
              Nos Châteaux d'Exception
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Quatre joyaux du patrimoine français soigneusement sélectionnés
              pour accueillir vos événements d'entreprise les plus prestigieux
            </p>
          </div>
        </div>
      </div>

      {/* Liste des châteaux */}
      <div className="container mx-auto px-4 py-20">
        <div className="space-y-20">
          {chateaux.map((chateau, index) => (
            <div
              key={chateau.id}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-12 items-center`}
            >
              {/* Images */}
              <div className="lg:w-1/2">
                <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={chateau.images[0]}
                    alt={chateau.nom}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-6 right-6 px-6 py-3 bg-[var(--gold)] text-white font-semibold rounded-full">
                    {chateau.region}
                  </div>
                </div>
                {/* Galerie miniature */}
                <div className="grid grid-cols-4 gap-4 mt-4">
                  {chateau.images.slice(1, 5).map((image, i) => (
                    <div
                      key={i}
                      className="relative h-24 rounded-lg overflow-hidden"
                    >
                      <Image
                        src={image}
                        alt={`${chateau.nom} ${i + 2}`}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Contenu */}
              <div className="lg:w-1/2">
                <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-4 font-[var(--font-playfair)]">
                  {chateau.nom}
                </h2>

                <div className="flex items-center space-x-6 mb-6 text-[var(--text-secondary)]">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-[var(--accent)]" />
                    <span>{chateau.region}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-[var(--accent)]" />
                    <span>
                      {chateau.capacite.min}-{chateau.capacite.max} personnes
                    </span>
                  </div>
                </div>

                <div className="mb-6 pb-6 border-b border-gray-200">
                  <span className="inline-block px-4 py-2 bg-[var(--secondary)] text-[var(--text-secondary)] rounded-full text-sm font-medium">
                    {chateau.styleArchitectural}
                  </span>
                </div>

                <p className="text-lg text-[var(--text-secondary)] mb-6 leading-relaxed">
                  {chateau.description}
                </p>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                    Atouts principaux
                  </h3>
                  <ul className="space-y-3">
                    {chateau.atouts.map((atout, i) => (
                      <li
                        key={i}
                        className="flex items-start text-[var(--text-secondary)]"
                      >
                        <span className="text-[var(--gold)] font-bold mr-3 text-lg">
                          ✓
                        </span>
                        <span>{atout}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/devis"
                  className="inline-flex items-center px-8 py-4 bg-[var(--gold)] text-white font-semibold rounded-full hover:bg-[var(--accent)] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Demander un devis pour ce château
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 font-[var(--font-playfair)]">
            Vous hésitez entre plusieurs châteaux ?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Nos experts vous conseillent gratuitement pour choisir le lieu idéal
            selon vos besoins
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-[var(--gold)] text-white font-semibold rounded-full hover:bg-[var(--accent)] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Parler à un expert
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
