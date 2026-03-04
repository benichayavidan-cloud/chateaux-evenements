/**
 * DEVIS FORM MINI - Formulaire court inline sur les pages château
 * Layout horizontal (en largeur) — conversion directe sans redirection vers /devis
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui-v2';
import { Text } from '@/components/ui-v2';
import { theme } from '@/design-system/tokens';
import { trackFormSubmit, trackDevisRequest } from '@/components/Analytics';
import { getGclid } from '@/lib/gclid';
import { hashUserData } from '@/lib/hash-user-data';

interface DevisFormMiniProps {
  chateauId: string;
  chateauNom: string;
}

export default function DevisFormMini({ chateauId, chateauNom }: DevisFormMiniProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    nomPrenom: '',
    email: '',
    telephone: '',
    nombreParticipants: '',
    dateArrivee: '',
    dateDepart: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!formData.nomPrenom || !formData.email || !formData.telephone || !formData.nombreParticipants || !formData.dateArrivee || !formData.dateDepart) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const gclid = getGclid();

      const payload = {
        typeEvenement: 'seminaire' as const,
        dateArrivee: formData.dateArrivee,
        dateDepart: formData.dateDepart,
        duree: '1-jour' as const,
        chateauIds: [chateauId],
        entreprise: '-',
        nomPrenom: formData.nomPrenom,
        email: formData.email,
        telephoneMobile: formData.telephone,
        nombreParticipants: parseInt(formData.nombreParticipants, 10),
        nombreChambres: 1,
        budget: '',
        commentaireDeroulement: formData.message
          ? `[Devis Express - ${chateauNom}] ${formData.message}`
          : `[Devis Express - ${chateauNom}]`,
        gclid: gclid || undefined,
      };

      const response = await fetch('/api/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Une erreur est survenue. Veuillez réessayer.');
        setIsSubmitting(false);
        return;
      }

      try {
        const hashed = await hashUserData({
          email: formData.email,
          phone: formData.telephone,
          fullName: formData.nomPrenom,
        });
        sessionStorage.setItem('ec_data', JSON.stringify({
          email: formData.email,
          phone: formData.telephone,
          fullName: formData.nomPrenom,
        }));
        sessionStorage.setItem('ec_hashed', JSON.stringify(hashed));
      } catch {
        // sessionStorage indisponible — non bloquant
      }

      trackFormSubmit('devis-express');
      trackDevisRequest([chateauId]);

      const ref = Math.random().toString(36).substr(2, 9).toUpperCase();
      router.push(`/devis/merci?ref=${ref}`);
    } catch {
      setError('Une erreur inattendue est survenue. Veuillez réessayer.');
      setIsSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: theme.effects.borderRadius.lg,
    border: `1.5px solid ${theme.colors.neutral.gray300}`,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.neutral.gray900,
    background: theme.colors.neutral.white,
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    outline: 'none',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.neutral.gray700,
    marginBottom: '4px',
  };

  const focusHandlers = {
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      e.currentTarget.style.borderColor = theme.colors.primary.bronze;
      e.currentTarget.style.boxShadow = `0 0 0 3px ${theme.colors.primary.bronze}15`;
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      e.currentTarget.style.borderColor = theme.colors.neutral.gray300;
      e.currentTarget.style.boxShadow = 'none';
    },
  };

  return (
    <div
      id="devis-express"
      style={{
        scrollMarginTop: '100px',
        padding: 'clamp(2rem, 5vw, 3rem) 0',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: 'clamp(1.5rem, 3vw, 2rem)',
          background: `linear-gradient(135deg, ${theme.colors.primary.bronze}06, ${theme.colors.primary.gold}04)`,
          border: `1px solid ${theme.colors.primary.bronze}20`,
          borderRadius: theme.effects.borderRadius['2xl'],
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
        }}
      >
        {/* Header compact */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: 'clamp(1rem, 2vw, 1.5rem)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                background: `${theme.colors.primary.bronze}10`,
                border: `1px solid ${theme.colors.primary.bronze}25`,
                borderRadius: theme.effects.borderRadius.full,
              }}
            >
              <Send className="w-3.5 h-3.5" style={{ color: theme.colors.primary.bronze }} />
              <span
                style={{
                  fontSize: theme.typography.fontSize.xs,
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.primary.bronze,
                  textTransform: 'uppercase',
                  letterSpacing: theme.typography.letterSpacing.wider,
                }}
              >
                Devis Express
              </span>
            </div>
            <Text variant="h4" style={{ margin: 0 }}>
              Demandez votre devis personnalisé
            </Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock className="w-3.5 h-3.5" style={{ color: theme.colors.primary.bronze, opacity: 0.7 }} />
              <span style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.neutral.gray500 }}>
                Réponse sous 24h
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Shield className="w-3.5 h-3.5" style={{ color: theme.colors.primary.bronze, opacity: 0.7 }} />
              <span style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.neutral.gray500 }}>
                Données sécurisées
              </span>
            </div>
          </div>
        </div>

        {/* Form — layout horizontal */}
        <form onSubmit={handleSubmit}>
          {/* Ligne 1 : Nom, Email, Téléphone */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '12px' }}>
            <div>
              <label htmlFor="mini-nom" style={labelStyle}>Nom & Prénom *</label>
              <input id="mini-nom" name="nomPrenom" type="text" required placeholder="Jean Dupont" value={formData.nomPrenom} onChange={handleChange} style={inputStyle} {...focusHandlers} />
            </div>
            <div>
              <label htmlFor="mini-email" style={labelStyle}>Email professionnel *</label>
              <input id="mini-email" name="email" type="email" required placeholder="jean@entreprise.com" value={formData.email} onChange={handleChange} style={inputStyle} {...focusHandlers} />
            </div>
            <div>
              <label htmlFor="mini-tel" style={labelStyle}>Téléphone *</label>
              <input id="mini-tel" name="telephone" type="tel" required placeholder="06 12 34 56 78" value={formData.telephone} onChange={handleChange} style={inputStyle} {...focusHandlers} />
            </div>
          </div>

          {/* Ligne 2 : Participants, Date arrivée, Date départ */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '12px' }}>
            <div>
              <label htmlFor="mini-participants" style={labelStyle}>Participants *</label>
              <select
                id="mini-participants"
                name="nombreParticipants"
                required
                value={formData.nombreParticipants}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                  paddingRight: '36px',
                  color: formData.nombreParticipants ? theme.colors.neutral.gray900 : theme.colors.neutral.gray400,
                }}
                {...focusHandlers}
              >
                <option value="" disabled>Sélectionnez</option>
                <option value="20">10 - 30 personnes</option>
                <option value="50">30 - 80 personnes</option>
                <option value="100">80 - 150 personnes</option>
                <option value="200">150 - 300 personnes</option>
                <option value="400">300 - 500 personnes</option>
              </select>
            </div>
            <div>
              <label htmlFor="mini-date-arrivee" style={labelStyle}>Date d&apos;arrivée *</label>
              <input
                id="mini-date-arrivee"
                name="dateArrivee"
                type="date"
                required
                value={formData.dateArrivee}
                onChange={handleChange}
                onClick={(e) => { (e.currentTarget as HTMLInputElement).showPicker?.(); }}
                min={new Date().toISOString().split('T')[0]}
                style={{ ...inputStyle, cursor: 'pointer' }}
                {...focusHandlers}
              />
            </div>
            <div>
              <label htmlFor="mini-date-depart" style={labelStyle}>Date de départ *</label>
              <input
                id="mini-date-depart"
                name="dateDepart"
                type="date"
                required
                value={formData.dateDepart}
                onChange={handleChange}
                onClick={(e) => { (e.currentTarget as HTMLInputElement).showPicker?.(); }}
                min={formData.dateArrivee || new Date().toISOString().split('T')[0]}
                style={{ ...inputStyle, cursor: 'pointer' }}
                {...focusHandlers}
              />
            </div>
          </div>

          {/* Ligne 3 : Message + Bouton côte à côte */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '12px', alignItems: 'end' }}>
            <div>
              <label htmlFor="mini-message" style={labelStyle}>
                Message <span style={{ color: theme.colors.neutral.gray400, fontWeight: theme.typography.fontWeight.normal }}>(optionnel)</span>
              </label>
              <textarea
                id="mini-message"
                name="message"
                rows={2}
                placeholder="Décrivez brièvement votre événement..."
                value={formData.message}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  resize: 'none',
                  minHeight: '64px',
                }}
                {...focusHandlers}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={isSubmitting}
                leftIcon={!isSubmitting ? <Send className="w-4 h-4" /> : undefined}
              >
                {isSubmitting ? 'Envoi...' : 'Envoyer ma demande'}
              </Button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                padding: '10px 14px',
                marginTop: '12px',
                borderRadius: theme.effects.borderRadius.lg,
                background: `${theme.colors.semantic.error}10`,
                border: `1px solid ${theme.colors.semantic.error}30`,
                color: theme.colors.semantic.error,
                fontSize: theme.typography.fontSize.sm,
              }}
            >
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
