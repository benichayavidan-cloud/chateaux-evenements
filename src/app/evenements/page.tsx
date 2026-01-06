import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { typesEvenements } from "@/data/chateaux";

export const metadata: Metadata = {
  title: "Types d'Événements d'Entreprise | ChâteauxPrestige",
  description:
    "Séminaires résidentiels, journées d'étude, soirées d'entreprise, team building : découvrez nos solutions événementielles sur-mesure dans nos châteaux d'exception.",
};

export default function EvenementsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-[60vh] overflow-hidden">
        <Image
          src="https://picsum.photos/seed/hero-evenements/1920/1080"
          alt="Événements d'entreprise"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        <div className="relative h-full container mx-auto px-4 flex items-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-[var(--font-playfair)]">
              Vos Événements d'Entreprise
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Des solutions sur-mesure pour transformer vos événements
              professionnels en moments d'exception
            </p>
          </div>
        </div>
      </div>

      {/* Types d'événements détaillés */}
      <div className="container mx-auto px-4 py-20">
        <div className="space-y-24">
          {typesEvenements.map((evenement, index) => (
            <div
              key={evenement.id}
              id={evenement.id}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-12 items-center`}
            >
              {/* Image */}
              <div className="lg:w-1/2">
                <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={evenement.image}
                    alt={evenement.titre}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Contenu */}
              <div className="lg:w-1/2">
                <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-6 font-[var(--font-playfair)]">
                  {evenement.titre}
                </h2>

                <p className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed">
                  {evenement.description}
                </p>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                    Services inclus
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {evenement.servicesInclus.map((service, i) => (
                      <div
                        key={i}
                        className="flex items-start text-[var(--text-secondary)]"
                      >
                        <Check className="w-5 h-5 text-[var(--gold)] mr-3 flex-shrink-0 mt-0.5" />
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[var(--secondary)] rounded-xl p-6 mb-8">
                  <h4 className="font-semibold text-[var(--text-primary)] mb-3">
                    Idéal pour :
                  </h4>
                  <ul className="text-[var(--text-secondary)] space-y-2">
                    {evenement.id === "seminaire" && (
                      <>
                        <li>• Séminaires stratégiques et de management</li>
                        <li>• Conventions annuelles</li>
                        <li>• Retraites d'équipe direction</li>
                      </>
                    )}
                    {evenement.id === "journee-etude" && (
                      <>
                        <li>• Sessions de formation intensive</li>
                        <li>• Comités de direction</li>
                        <li>• Ateliers de réflexion stratégique</li>
                      </>
                    )}
                    {evenement.id === "soiree-entreprise" && (
                      <>
                        <li>• Célébrations de fin d'année</li>
                        <li>• Lancements de produits</li>
                        <li>• Anniversaires d'entreprise</li>
                      </>
                    )}
                    {evenement.id === "team-building" && (
                      <>
                        <li>• Renforcement de cohésion d'équipe</li>
                        <li>• Séminaires d'intégration</li>
                        <li>• Journées incentive</li>
                      </>
                    )}
                  </ul>
                </div>

                <Link
                  href="/devis"
                  className="inline-flex items-center px-8 py-4 bg-[var(--gold)] text-white font-semibold rounded-full hover:bg-[var(--accent)] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Organiser cet événement
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Processus */}
      <div className="bg-[var(--secondary)] py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[var(--text-primary)] mb-4 font-[var(--font-playfair)]">
            Comment ça marche ?
          </h2>
          <p className="text-xl text-center text-[var(--text-secondary)] mb-16 max-w-3xl mx-auto">
            Un processus simple et personnalisé pour organiser votre événement
            parfait
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                titre: "Demande de devis",
                description:
                  "Remplissez notre formulaire en 5 minutes pour nous présenter votre projet",
              },
              {
                step: "2",
                titre: "Étude personnalisée",
                description:
                  "Notre équipe étudie vos besoins et vous contacte sous 24h",
              },
              {
                step: "3",
                titre: "Visite du château",
                description:
                  "Découvrez votre futur lieu d'événement lors d'une visite privée",
              },
              {
                step: "4",
                titre: "Votre événement",
                description:
                  "Nous orchestrons tous les détails pour un événement réussi",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-[var(--gold)] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                  {item.titre}
                </h3>
                <p className="text-[var(--text-secondary)]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 font-[var(--font-playfair)]">
            Prêt à créer un événement mémorable ?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Nos équipes sont à votre écoute pour concrétiser votre projet
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/devis"
              className="inline-flex items-center px-8 py-4 bg-[var(--gold)] text-white font-semibold rounded-full hover:bg-[var(--accent)] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Demander un Devis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 border-2 border-white/30"
            >
              Parler à un Expert
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
