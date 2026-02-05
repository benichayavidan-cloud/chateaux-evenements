import Link from "next/link";
import { ArrowLeft, Home, FileText } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <p className="text-8xl font-light text-gray-300 mb-4">404</p>
        <h1 className="text-4xl md:text-5xl font-light italic text-gray-900 mb-6 font-[var(--font-cormorant)]">
          Page introuvable
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center px-8 py-4 bg-[var(--bronze-antique)] text-white font-medium rounded-full hover:bg-[var(--bronze-light)] transition-all duration-500 group"
          >
            <Home className="w-5 h-5 mr-2" />
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/devis"
            className="inline-flex items-center px-8 py-4 border border-gray-300 text-gray-700 font-medium rounded-full hover:border-[var(--bronze-antique)] hover:text-[var(--bronze-antique)] transition-all duration-500 group"
          >
            <FileText className="w-5 h-5 mr-2" />
            Demander un devis
          </Link>
        </div>
      </div>
    </div>
  );
}
