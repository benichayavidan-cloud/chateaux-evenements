import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-6xl font-light italic text-gray-900 mb-6 font-[var(--font-cormorant)]">
          Château introuvable
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Le château que vous recherchez n'existe pas ou a été déplacé.
        </p>
        <Link
          href="/chateaux"
          className="inline-flex items-center px-8 py-4 bg-[var(--bronze-antique)] text-white font-medium rounded-full hover:bg-[var(--bronze-light)] transition-all duration-500 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Retour aux châteaux
        </Link>
      </div>
    </div>
  );
}
