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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }} className="sm:!flex-row">
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '16px 40px',
              backgroundColor: '#b8860b',
              color: '#ffffff',
              fontWeight: 500,
              borderRadius: '9999px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              fontSize: '16px',
            }}
          >
            <Home className="w-5 h-5" style={{ color: '#ffffff', marginRight: '10px' }} />
            <span style={{ color: '#ffffff' }}>Retour à l&apos;accueil</span>
          </Link>
          <Link
            href="/devis#formulaire"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '16px 40px',
              backgroundColor: 'transparent',
              color: '#374151',
              fontWeight: 500,
              borderRadius: '9999px',
              border: '2px solid #d1d5db',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              fontSize: '16px',
            }}
          >
            <FileText className="w-5 h-5" style={{ marginRight: '10px' }} />
            <span>Demander un devis</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
