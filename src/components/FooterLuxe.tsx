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

export function FooterLuxe() {
  return (
    <footer className="relative bg-gradient-to-b from-gray-100 via-gray-50 to-white border-t border-gray-200" style={{ paddingTop: 'var(--space-md,60px)', paddingBottom: 'var(--section-padding-sm)' }}>
      {/* Glow effect top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--bronze-antique)] to-transparent opacity-50" />

      <div className="w-full flex flex-col items-center justify-center px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto w-full" style={{ marginBottom: 'var(--space-4xl,45px)' }}>
          {/* Colonne 1 - À propos */}
          <div>
            <div style={{ marginBottom: 'var(--space-lg)' }}>
              <span className="text-2xl font-light italic text-gray-900 font-[var(--font-cormorant)] block">
                Châteaux
              </span>
              <span className="text-xs text-[var(--bronze-antique)] tracking-[0.3em] uppercase">
                Prestige
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm" style={{ marginBottom: 'var(--space-xl)' }}>
              L'excellence événementielle dans des châteaux d'exception à travers la France.
            </p>
            <div className="flex" style={{ gap: 'var(--gap-sm)' }}>
              {[Facebook, Instagram, Linkedin, Twitter].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[var(--bronze-antique)] hover:border-[var(--bronze-antique)] transition-all duration-300 hover:shadow-lg"
                  aria-label="Social media"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Colonne 2 - Navigation */}
          <div>
            <h3 className="text-gray-900 font-medium text-sm uppercase tracking-wider" style={{ marginBottom: 'var(--space-lg)' }}>
              Navigation
            </h3>
            <ul className="flex flex-col" style={{ gap: 'var(--gap-sm)' }}>
              {[
                { label: "Nos Châteaux", href: "/chateaux" },
                { label: "Événements", href: "/evenements" },
                { label: "Demander un Devis", href: "/devis" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-[var(--bronze-antique)] transition-colors duration-300 text-sm inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 - Services */}
          <div>
            <h3 className="text-gray-900 font-medium text-sm uppercase tracking-wider" style={{ marginBottom: 'var(--space-lg)' }}>
              Nos Services
            </h3>
            <ul className="flex flex-col text-sm text-gray-600" style={{ gap: 'var(--gap-sm)' }}>
              <li>Séminaires Résidentiels</li>
              <li>Journées d'Étude</li>
              <li>Soirées d'Entreprise</li>
              <li>Team Building</li>
              <li>Conventions</li>
              <li>Événements Sur-Mesure</li>
            </ul>
          </div>

          {/* Colonne 4 - Contact */}
          <div>
            <h3 className="text-gray-900 font-medium text-sm uppercase tracking-wider" style={{ marginBottom: 'var(--space-lg)' }}>
              Contact
            </h3>
            <ul className="flex flex-col" style={{ gap: 'var(--gap-md)' }}>
              <li className="flex items-start" style={{ gap: 'var(--gap-sm)' }}>
                <MapPin className="w-4 h-4 text-[var(--bronze-antique)] flex-shrink-0 mt-1" />
                <span className="text-gray-600 text-sm leading-relaxed">
                  15 Avenue des Châteaux<br />
                  75008 Paris, France
                </span>
              </li>
              <li className="flex items-center" style={{ gap: 'var(--gap-sm)' }}>
                <Phone className="w-4 h-4 text-[var(--bronze-antique)] flex-shrink-0" />
                <a
                  href="tel:+33123456789"
                  className="text-gray-600 hover:text-[var(--bronze-antique)] transition-colors text-sm"
                >
                  +33 1 23 45 67 89
                </a>
              </li>
              <li className="flex items-center" style={{ gap: 'var(--gap-sm)' }}>
                <Mail className="w-4 h-4 text-[var(--bronze-antique)] flex-shrink-0" />
                <a
                  href="mailto:contact@chateauxprestige.fr"
                  className="text-gray-600 hover:text-[var(--bronze-antique)] transition-colors text-sm"
                >
                  contact@chateauxprestige.fr
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-gray-200 max-w-7xl mx-auto w-full" style={{ paddingTop: 'var(--section-padding-sm)' }}>
          <div className="flex flex-col md:flex-row justify-between items-center" style={{ gap: 'var(--gap-md)' }}>
            <p className="text-gray-500 text-xs">
              &copy; {new Date().getFullYear()} ChâteauxPrestige. Tous droits réservés.
            </p>
            <div className="flex text-xs" style={{ gap: 'var(--space-xl)' }}>
              <Link
                href="/mentions-legales"
                className="text-gray-500 hover:text-[var(--bronze-antique)] transition-colors"
              >
                Mentions Légales
              </Link>
              <Link
                href="/confidentialite"
                className="text-gray-500 hover:text-[var(--bronze-antique)] transition-colors"
              >
                Confidentialité
              </Link>
              <Link
                href="/cgv"
                className="text-gray-500 hover:text-[var(--bronze-antique)] transition-colors"
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
