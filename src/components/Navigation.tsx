"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/chateaux", label: "Nos Châteaux" },
  { href: "/evenements", label: "Événements" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative">
              <img
                src="/logo.png"
                alt="Select Chateaux"
                className="h-16 w-auto object-contain transition-all duration-300"
                style={{
                  maxWidth: '200px',
                  filter: isScrolled ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' : 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))'
                }}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-[var(--gold)]",
                  isScrolled ? "text-[var(--text-primary)]" : "text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/devis"
              className="px-6 py-2.5 bg-[var(--gold)] text-white font-semibold rounded-full hover:bg-[var(--accent)] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Obtenir un Devis
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X
                className={cn(
                  "w-6 h-6",
                  isScrolled ? "text-[var(--text-primary)]" : "text-white"
                )}
              />
            ) : (
              <Menu
                className={cn(
                  "w-6 h-6",
                  isScrolled ? "text-[var(--text-primary)]" : "text-white"
                )}
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[var(--text-primary)] font-medium py-2 hover:text-[var(--gold)] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/devis"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-6 py-3 bg-[var(--gold)] text-white font-semibold rounded-full hover:bg-[var(--accent)] transition-colors text-center"
              >
                Obtenir un Devis
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <a
                  href="tel:+33123456789"
                  className="flex items-center space-x-2 text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>+33 1 23 45 67 89</span>
                </a>
                <a
                  href="mailto:contact@selectchateaux.com"
                  className="flex items-center space-x-2 text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>contact@selectchateaux.com</span>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
