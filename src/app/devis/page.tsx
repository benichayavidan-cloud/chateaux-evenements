import { Metadata } from "next";
import { DevisForm } from "@/components/DevisForm";

export const metadata: Metadata = {
  title: "Demande de Devis | ChâteauxPrestige",
  description:
    "Obtenez un devis personnalisé pour votre événement d'entreprise dans l'un de nos 4 châteaux d'exception en France.",
};

export default function DevisPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--secondary)] to-white">
      {/* Hero */}
      <div className="bg-[var(--primary)] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-[var(--font-playfair)]">
            Demandez votre Devis Personnalisé
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Remplissez ce formulaire en 4 étapes simples et recevez votre devis
            sur-mesure dans les 24 heures
          </p>
        </div>
      </div>

      {/* Formulaire */}
      <div className="container mx-auto px-4 py-16">
        <DevisForm />
      </div>

      {/* Trust Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[var(--gold)] mb-2">
                24h
              </div>
              <p className="text-[var(--text-secondary)]">
                Réponse garantie sous 24 heures
              </p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[var(--gold)] mb-2">
                100%
              </div>
              <p className="text-[var(--text-secondary)]">
                Devis personnalisé et sans engagement
              </p>
            </div>
            <div>
              <div className="text-4xl font-bold text-[var(--gold)] mb-2">
                15+
              </div>
              <p className="text-[var(--text-secondary)]">
                Années d'expertise événementielle
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
