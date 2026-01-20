"use client";

import { Share2, Bookmark } from "lucide-react";

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
  activeSection: string;
}

export function TableOfContents({ items, activeSection }: TableOfContentsProps) {
  return (
    <aside className="hidden lg:block">
      <div className="sidebar-sticky bg-white rounded-2xl border border-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.15)]" style={{ padding: '10px' }}>
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider" style={{ marginBottom: '5px' }}>
          Sommaire
        </h3>

        <nav className="space-y-1.5">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`block text-sm border-l-2 transition-all duration-300 ${
                activeSection === item.id
                  ? "border-[#d4af37] text-[#d4af37] font-medium"
                  : "border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900"
              }`}
              style={{ paddingLeft: '3px' }}
            >
              {item.title}
            </a>
          ))}
        </nav>

        {/* Share Buttons */}
        <div className="border-t border-gray-100" style={{ marginTop: '10px', paddingTop: '10px' }}>
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
            Partager
          </h3>
          <div className="flex items-center gap-1.5">
            <button
              className="rounded-full bg-gray-100 hover:bg-[#d4af37] hover:text-white transition-colors duration-300 flex items-center justify-center"
              aria-label="Partager l'article"
              style={{ padding: '8px' }}
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              className="rounded-full bg-gray-100 hover:bg-[#d4af37] hover:text-white transition-colors duration-300 flex items-center justify-center"
              aria-label="Sauvegarder l'article"
              style={{ padding: '8px' }}
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
