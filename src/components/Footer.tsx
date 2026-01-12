import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[var(--text-primary)] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Colonne 1 - À propos */}
          <div>
            <div className="mb-4">
              <img
                src="/logo.png"
                alt="Select Chateaux"
                className="h-10 w-auto object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Organisez vos événements d'entreprise dans des châteaux
              d'exception à travers la France. Excellence, prestige et
              authenticité.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--gold)] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--gold)] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--gold)] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--gold)] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Colonne 2 - Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/chateaux"
                  className="text-gray-300 hover:text-[var(--gold)] transition-colors"
                >
                  Nos Châteaux
                </Link>
              </li>
              <li>
                <Link
                  href="/evenements"
                  className="text-gray-300 hover:text-[var(--gold)] transition-colors"
                >
                  Types d'Événements
                </Link>
              </li>
              <li>
                <Link
                  href="/devis"
                  className="text-gray-300 hover:text-[var(--gold)] transition-colors"
                >
                  Demander un Devis
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-[var(--gold)] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 - Événements */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Nos Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Séminaires Résidentiels</li>
              <li className="text-gray-300">Journées d'Étude</li>
              <li className="text-gray-300">Soirées d'Entreprise</li>
              <li className="text-gray-300">Team Building</li>
              <li className="text-gray-300">Conventions</li>
              <li className="text-gray-300">Événements Sur-Mesure</li>
            </ul>
          </div>

          {/* Colonne 4 - Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[var(--gold)] flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  15 Avenue des Châteaux
                  <br />
                  75008 Paris, France
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[var(--gold)] flex-shrink-0" />
                <a
                  href="tel:+33123456789"
                  className="text-gray-300 hover:text-[var(--gold)] transition-colors"
                >
                  +33 1 23 45 67 89
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[var(--gold)] flex-shrink-0" />
                <a
                  href="mailto:contact@selectchateaux.com"
                  className="text-gray-300 hover:text-[var(--gold)] transition-colors"
                >
                  contact@selectchateaux.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} SelectChateaux.com. Tous droits
              réservés.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/mentions-legales"
                className="text-gray-400 hover:text-[var(--gold)] transition-colors"
              >
                Mentions Légales
              </Link>
              <Link
                href="/confidentialite"
                className="text-gray-400 hover:text-[var(--gold)] transition-colors"
              >
                Politique de Confidentialité
              </Link>
              <Link
                href="/cgv"
                className="text-gray-400 hover:text-[var(--gold)] transition-colors"
              >
                CGV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
