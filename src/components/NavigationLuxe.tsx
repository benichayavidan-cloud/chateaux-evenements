"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/chateaux", label: "Châteaux", hasSubmenu: true },
  { href: "/evenements", label: "Événements" },
  { href: "/contact", label: "Contact" },
];

type Chateau = {
  slug: string;
  nom: string;
};

export function NavigationLuxe() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [chateaux, setChateaux] = useState<Chateau[]>([]);
  const [isChateauxOpen, setIsChateauxOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch châteaux from Supabase
  useEffect(() => {
    const fetchChateaux = async () => {
      const { data, error } = await supabase
        .from("chateaux")
        .select("slug, nom")
        .order("nom", { ascending: true });

      if (data && !error) {
        setChateaux(data);
      }
    };

    fetchChateaux();
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-sm border-b",
        isScrolled
          ? "bg-white/95 shadow-lg border-gray-200"
          : "bg-gradient-to-b from-white/80 via-white/60 to-white/40 border-white/30"
      )}
      style={{ willChange: 'transform' }}
    >
      {/* Container avec grille 3 colonnes égales sur toute la largeur */}
      <div className="w-full px-8">
        <div className="h-16 w-full" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', alignItems: 'center', gap: 0 }}>

          {/* Colonne 1 : Logo centré */}
          <div className="flex items-center justify-center">
            <Link href="/" className="relative group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col"
              >
                <span className="text-xl font-light italic text-black font-[var(--font-cormorant)]">
                  Châteaux
                </span>
                <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: '#B8860B' }}>
                  PRESTIGE
                </span>
              </motion.div>
            </Link>
          </div>

          {/* Colonne 2 : Navigation centrée */}
          <nav className="hidden md:flex items-center justify-center" style={{ gap: '2.5rem' }}>
            {navLinks.map((link) => (
              link.hasSubmenu ? (
                <div
                  key={link.href}
                  className="relative group"
                  onMouseEnter={() => setIsChateauxOpen(true)}
                  onMouseLeave={() => setIsChateauxOpen(false)}
                >
                  <Link
                    href={link.href}
                    className="relative text-sm transition-colors duration-300 whitespace-nowrap font-semibold header-nav-link flex items-center gap-1"
                    style={{ color: '#2C1810' }}
                  >
                    {link.label}
                    <ChevronDown className={cn(
                      "w-4 h-4 transition-transform duration-300",
                      isChateauxOpen && "rotate-180"
                    )} />
                    <span className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300" style={{ backgroundColor: '#B8860B' }} />
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isChateauxOpen && chateaux.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-80 bg-white backdrop-blur-sm border border-gray-100 rounded-2xl overflow-hidden z-50"
                        style={{
                          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 0 15px rgba(184, 134, 11, 0.08)',
                          willChange: 'transform, opacity'
                        }}
                      >
                        <div className="badge">
                          <div style={{ marginBottom: 'var(--gap-sm)', paddingLeft: 'var(--badge-padding-md)', paddingRight: 'var(--badge-padding-md)' }}>
                            <p className="text-xs font-semibold tracking-wider uppercase" style={{ color: '#B8860B' }}>
                              Nos Châteaux
                            </p>
                          </div>
                          {chateaux.map((chateau, index) => (
                            <div key={chateau.slug}>
                              <Link
                                href={`/chateaux/${chateau.slug}`}
                                className="group block rounded-xl transition-all duration-300 hover:bg-gray-50"
                                style={{ padding: 'var(--gap-sm) var(--badge-padding-md)' }}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-gray-900 group-hover:text-[var(--bronze-antique)] transition-colors">
                                    {chateau.nom}
                                  </span>
                                  <svg
                                    className="w-4 h-4 text-gray-400 group-hover:text-[var(--bronze-antique)] transform group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </div>
                              </Link>
                              {index < chateaux.length - 1 && (
                                <div style={{ marginLeft: 'var(--badge-padding-md)', marginRight: 'var(--badge-padding-md)' }} className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                              )}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-sm transition-colors duration-300 group whitespace-nowrap font-semibold header-nav-link"
                  style={{ color: '#2C1810' }}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300" style={{ backgroundColor: '#B8860B' }} />
                </Link>
              )
            ))}
          </nav>

          {/* Colonne 3 : CTA + Mobile centré */}
          <div className="flex items-center justify-center">
            {/* CTA Desktop */}
            <Link
              href="/devis"
              className="badge hidden md:inline-flex relative text-sm font-medium text-white bg-[var(--bronze-antique)] border-2 border-[var(--bronze-antique)] overflow-hidden group hover:text-black transition-all duration-300 whitespace-nowrap shadow-md hover:shadow-xl"
            >
              <span className="relative z-10">Demander un Devis</span>
              <span className="absolute inset-0 bg-[var(--bronze-light)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>

            {/* Mobile : Bouton menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-900 hover:text-[var(--bronze-antique)] transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
              {navLinks.map((link) => (
                link.hasSubmenu ? (
                  <div key={link.href} className="flex flex-col space-y-3">
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-gray-700 hover:text-[var(--bronze-antique)] transition-colors duration-300 py-2 font-medium"
                    >
                      {link.label}
                    </Link>
                    {chateaux.length > 0 && (
                      <div className="ml-2 pl-4 flex flex-col space-y-2 border-l-2" style={{ borderColor: '#B8860B' }}>
                        {chateaux.map((chateau) => (
                          <Link
                            key={chateau.slug}
                            href={`/chateaux/${chateau.slug}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-sm text-gray-600 hover:text-[var(--bronze-antique)] transition-all duration-300 py-2 px-3 rounded-lg hover:bg-gray-50 font-medium"
                          >
                            {chateau.nom}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-700 hover:text-[var(--bronze-antique)] transition-colors duration-300 py-2 font-medium"
                  >
                    {link.label}
                  </Link>
                )
              ))}
              <Link
                href="/devis"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ padding: 'var(--gap-md,15px)' }}
                className="text-center bg-[var(--bronze-antique)] text-white font-medium rounded-full hover:bg-[var(--bronze-light)] transition-colors"
              >
                Demander un Devis
              </Link>

              {/* Contact Info */}
              <div className="flex flex-col space-y-3 pt-6 border-t border-gray-200">
                <a
                  href="tel:+33123456789"
                  className="flex items-center space-x-3 text-gray-600 hover:text-[var(--bronze-antique)] transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>+33 1 23 45 67 89</span>
                </a>
                <a
                  href="mailto:contact@chateauxprestige.fr"
                  className="flex items-center space-x-3 text-gray-600 hover:text-[var(--bronze-antique)] transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>contact@chateauxprestige.fr</span>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
