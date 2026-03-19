import Link from "next/link";
import Image from "next/image";
import { Home, FileText } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-3xl w-full">
        {/* Image équipe en paysage */}
        <div className="relative w-full h-48 sm:h-56 md:h-64 rounded-2xl overflow-hidden mb-8">
          <Image
            src="/images/equipe-select-chateaux-organisateur-seminaire-entreprise-chateau.webp"
            alt="Équipe Select Châteaux — organisation de séminaires en château"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <p className="absolute bottom-4 left-0 right-0 text-6xl sm:text-7xl md:text-8xl font-light" style={{ color: 'rgba(255,255,255,0.7)' }}>
            404
          </p>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-light italic text-gray-900 mb-4 font-[var(--font-cormorant)]">
          Page introuvable
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-8">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center px-10 py-5 font-medium rounded-full transition-all duration-500 group"
            style={{ backgroundColor: 'var(--bronze-antique)', color: '#ffffff' }}
          >
            <Home className="w-5 h-5 mr-2" style={{ color: '#ffffff' }} />
            <span style={{ color: '#ffffff' }}>Retour à l&apos;accueil</span>
          </Link>
          <Link
            href="/devis#formulaire"
            className="inline-flex items-center px-10 py-5 border border-gray-300 text-gray-700 font-medium rounded-full hover:border-[var(--bronze-antique)] hover:text-[var(--bronze-antique)] transition-all duration-500 group"
          >
            <FileText className="w-5 h-5 mr-2" />
            Demander un devis
          </Link>
        </div>
      </div>
    </div>
  );
}
