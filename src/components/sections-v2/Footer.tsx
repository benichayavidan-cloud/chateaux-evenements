/**
 * FOOTER COMPONENT - Footer professionnel
 * Footer responsive avec grid et sections multiples
 */

'use client';

import { Link, Text } from '@/components/ui-v2';
import { Container, Row, Col } from '@/components/layout-v2';
import { theme } from '@/design-system/tokens';
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram } from 'lucide-react';
import { trackPhoneClick } from '@/components/Analytics';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterProps {
  /** Logo */
  logo?: React.ReactNode;

  /** Slogan / Description */
  description?: string;

  /** Sections de liens */
  sections?: FooterSection[];

  /** Informations de contact */
  contact?: {
    address?: string;
    phone?: string;
    email?: string;
  };

  /** Réseaux sociaux */
  social?: {
    facebook?: string;
    linkedin?: string;
    instagram?: string;
  };

  /** Liens du bas (légal) */
  legalLinks?: FooterLink[];

  /** Copyright */
  copyright?: string;
}

export function Footer({
  logo,
  description = 'L\'excellence événementielle dans des châteaux d\'exception.',
  sections = [],
  contact,
  social,
  legalLinks = [],
  copyright,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: `linear-gradient(to bottom, ${theme.colors.neutral.gray50}, ${theme.colors.neutral.white})`,
        borderTop: `1px solid ${theme.colors.neutral.gray200}`,
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.md,
      }}
    >
      <Container size="xl">
        {/* Main Footer Content */}
        <Row gap="lg" style={{ marginBottom: theme.spacing.xl, alignItems: 'flex-start' }}>
          {/* About Section */}
          <Col lg={3} md={6} xs={12}>
            {/* Logo */}
            {logo && (
              <div style={{ marginBottom: theme.spacing.lg }}>
                {logo}
              </div>
            )}

            <Text variant="body" color="muted" style={{ marginTop: '-50px' }}>
              {description}
            </Text>
          </Col>

          {/* Links Sections */}
          {sections.map((section) => (
            <Col key={section.title} lg={3} md={6} xs={12}>
              <Text
                variant="label"
                style={{
                  marginBottom: theme.spacing.lg,
                  display: 'block',
                }}
              >
                {section.title}
              </Text>
              <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.sm }}>
                {section.links.map((link) => (
                  <Link key={link.label} href={link.href} variant="subtle">
                    {link.label}
                  </Link>
                ))}
              </div>
            </Col>
          ))}
        </Row>

        {/* Contact Bar */}
        {contact && (
          <div
            style={{
              borderTop: `1px solid ${theme.colors.neutral.gray200}`,
              paddingTop: theme.spacing.md,
              paddingBottom: theme.spacing.md,
              marginTop: theme.spacing.lg,
            }}
          >
            <div style={{ display: 'flex', gap: theme.spacing.lg, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
              {contact.address && (
                <>
                  <div style={{ display: 'flex', gap: theme.spacing.xs, alignItems: 'center' }}>
                    <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: theme.colors.primary.bronze }} />
                    <Text variant="caption" color="muted">
                      {contact.address}
                    </Text>
                  </div>
                  <span style={{ color: theme.colors.neutral.gray400 }}>•</span>
                </>
              )}
              {contact.phone && (
                <>
                  <div style={{ display: 'flex', gap: theme.spacing.xs, alignItems: 'center' }}>
                    <Phone className="w-4 h-4 flex-shrink-0" style={{ color: theme.colors.primary.bronze }} />
                    <Link href={`tel:${contact.phone.replace(/\s/g, '')}`} variant="subtle" onClick={() => trackPhoneClick()}>
                      <Text variant="caption">{contact.phone}</Text>
                    </Link>
                  </div>
                  <span style={{ color: theme.colors.neutral.gray400 }}>•</span>
                </>
              )}
              {contact.email && (
                <>
                  <div style={{ display: 'flex', gap: theme.spacing.xs, alignItems: 'center' }}>
                    <Mail className="w-4 h-4 flex-shrink-0" style={{ color: theme.colors.primary.bronze }} />
                    <Link href={`mailto:${contact.email}`} variant="subtle">
                      <Text variant="caption">{contact.email}</Text>
                    </Link>
                  </div>
                  <span style={{ color: theme.colors.neutral.gray400 }}>•</span>
                </>
              )}
              {social?.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '28px',
                    height: '28px',
                    borderRadius: theme.effects.borderRadius.full,
                    border: `1px solid ${theme.colors.neutral.gray200}`,
                    color: theme.colors.neutral.gray600,
                    transition: `all ${theme.effects.transitions.base}`,
                  }}
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        )}

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: `1px solid ${theme.colors.neutral.gray200}`,
            paddingTop: theme.spacing.lg,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing.md,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            className="footer-bottom"
          >
            {/* Copyright */}
            <Text variant="caption" color="muted">
              {copyright || `© ${currentYear} SelectChateaux. Tous droits réservés.`}
            </Text>

            {/* Legal Links */}
            {legalLinks.length > 0 && (
              <div style={{ display: 'flex', gap: theme.spacing.lg, flexWrap: 'wrap', justifyContent: 'center' }}>
                {legalLinks.map((link, index) => (
                  <span key={link.href} style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.lg }}>
                    <Link href={link.href} variant="subtle">
                      <Text variant="caption">{link.label}</Text>
                    </Link>
                    {index < legalLinks.length - 1 && (
                      <span style={{ color: theme.colors.neutral.gray400 }}>•</span>
                    )}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>

      <style jsx>{`
        @media (min-width: 768px) {
          .footer-bottom {
            flex-direction: row !important;
          }
        }
      `}</style>
    </footer>
  );
}
