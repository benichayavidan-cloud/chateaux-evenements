"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

interface ArticleSidebarProps {
  readingProgress: number;
}

export function ArticleSidebar({ readingProgress }: ArticleSidebarProps) {
  return (
    <aside className="hidden lg:block">
      <div className="sidebar-sticky flex flex-col gap-2.5">
        {/* Progress Indicator */}
        <div className="p-8 bg-gradient-to-br from-gray-50 to-white rounded-t-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] mb-2.5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">Progression</span>
            <span className="text-sm font-bold text-[#d4af37]">
              {Math.round(readingProgress)}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-1">
            <motion.div
              className="h-full bg-gradient-to-r from-[#d4af37] to-amber-600"
              style={{ width: `${readingProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* CTA Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center text-center rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] mb-2.5 space-y-5" style={{ padding: '10px' }}>
          <Sparkles className="w-12 h-12 text-[#d4af37]" />
          <h3 className="text-2xl font-light italic">Séduit ?</h3>
          <p className="text-gray-300 leading-relaxed text-sm">
            Obtenez votre devis personnalisé en 24h. Nos experts vous accompagnent de A à Z.
          </p>
          <Link
            href="/devis#formulaire"
            className="inline-flex items-center justify-center gap-3 bg-gradient-to-l from-amber-600 to-[#d4af37] text-white rounded-full font-medium transition-all duration-300 hover:scale-105"
            style={{ width: '80%', marginBottom: '5px', padding: '8px' }}
          >
            <span>Devis Gratuit</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-xs text-gray-400">
            ✓ Réponse 24h • ✓ Sans engagement
          </p>
        </div>

        {/* Contact Card */}
        <div className="bg-white rounded-b-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)]" style={{ padding: '10px' }}>
          <h4 className="font-semibold text-gray-900 mb-1.5 text-base">
            Une question ?
          </h4>
          <p className="text-sm text-gray-600 mb-1.5">
            Nos experts sont disponibles pour vous conseiller.
          </p>
          <Link
            href="/devis#formulaire"
            className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-200 hover:border-[#d4af37] text-gray-900 rounded-full font-medium transition-all duration-300"
            style={{ padding: '8px' }}
          >
            <span>Demander un Devis</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
