/**
 * DEVIS FORM MINI - Formulaire court inline sur les pages château
 * Layout horizontal (en largeur) — conversion directe sans redirection vers /devis
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Send, Clock, Shield, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui-v2';
import { Text } from '@/components/ui-v2';
import { theme } from '@/design-system/tokens';
import { trackFormSubmit, trackDevisRequest, trackFormStart } from '@/components/Analytics';
import { getGclid } from '@/lib/gclid';
import { hashUserData } from '@/lib/hash-user-data';

interface DevisFormMiniProps {
  chateauId?: string;
  chateauNom?: string;
  /** Pour les pages géo avec plusieurs châteaux */
  chateauIds?: string[];
  /** Label affiché dans le commentaire (ex: "Séminaire Château Île-de-France") */
  sourceLabel?: string;
}

export default function DevisFormMini({ chateauId, chateauNom, chateauIds, sourceLabel }: DevisFormMiniProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formStartTracked, setFormStartTracked] = useState(false);
  const [today, setToday] = useState('');
  // Mode de saisie des dates : 'exact' (date-pickers) ou 'flexible' (période)
  const [dateMode, setDateMode] = useState<'exact' | 'flexible'>('exact');

  useEffect(() => {
    setToday(new Date().toISOString().split('T')[0]);
  }, []);

  const [formData, setFormData] = useState({
    nomPrenom: '',
    entreprise: '',
    email: '',
    telephone: '',
    nombreParticipants: '',
    dateArrivee: '',
    dateDepart: '',
    periodeFlexible: '',
    message: '',
  });

  // 2ᵉ vague — visiteur de retour : pré-remplir les coordonnées déjà saisies (localStorage)
  useEffect(() => {
    try {
      const raw = localStorage.getItem('sc_devis_contact');
      if (!raw) return;
      const saved = JSON.parse(raw) as Partial<{ nomPrenom: string; entreprise: string; email: string; telephone: string }>;
      setFormData((prev) => ({
        ...prev,
        nomPrenom: prev.nomPrenom || saved.nomPrenom || '',
        entreprise: prev.entreprise || saved.entreprise || '',
        email: prev.email || saved.email || '',
        telephone: prev.telephone || saved.telephone || '',
      }));
    } catch {
      // localStorage indisponible — non bloquant
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    // Micro-conversion form_start au premier champ rempli
    if (!formStartTracked) {
      trackFormStart("devis_mini");
      setFormStartTracked(true);
    }
    const { name, value } = e.target;
    setFormData((prev) => {
      // Date d'arrivée → pré-remplit le départ au même jour (gère les séminaires 1 jour), si vide
      if (name === 'dateArrivee' && !prev.dateDepart) {
        return { ...prev, dateArrivee: value, dateDepart: value };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleDateModeChange = (mode: 'exact' | 'flexible') => {
    // La bascule de mode compte comme un engagement → micro-conversion form_start
    if (!formStartTracked) {
      trackFormStart("devis_mini");
      setFormStartTracked(true);
    }
    setDateMode(mode);
    setError(null);
  };

  // Domaines email personnels → on ne pré-remplit PAS l'entreprise
  const GENERIC_EMAIL_DOMAINS = new Set([
    'gmail.com', 'googlemail.com', 'outlook.com', 'outlook.fr', 'hotmail.com', 'hotmail.fr',
    'live.com', 'live.fr', 'yahoo.com', 'yahoo.fr', 'ymail.com', 'free.fr', 'orange.fr',
    'wanadoo.fr', 'sfr.fr', 'laposte.net', 'icloud.com', 'me.com', 'mac.com', 'gmx.com',
    'gmx.fr', 'proton.me', 'protonmail.com', 'aol.com', 'bbox.fr', 'neuf.fr', 'numericable.fr',
  ]);

  // Pré-remplit l'entreprise à partir du domaine d'un email professionnel (modifiable)
  const deriveCompanyFromEmail = (email: string) => {
    const at = email.indexOf('@');
    if (at < 0) return;
    const domain = email.slice(at + 1).toLowerCase().trim();
    if (!domain || GENERIC_EMAIL_DOMAINS.has(domain)) return;
    const parts = domain.split('.');
    if (parts.length < 2) return;
    const sld = parts[parts.length - 2];
    if (!sld || sld.length < 2) return;
    const name = sld.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    setFormData((prev) => (prev.entreprise.trim() ? prev : { ...prev, entreprise: name }));
  };

  const isEmailValid = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const isPhoneValid = (v: string) => v.replace(/\D/g, '').length >= 10;

  // Pré-remplissage entreprise déclenché par la VALEUR de l'email (autofill navigateur inclus),
  // avec un léger debounce pour ne pas déduire en cours de frappe.
  useEffect(() => {
    if (!formData.email || formData.entreprise.trim() || !isEmailValid(formData.email)) return;
    const t = setTimeout(() => deriveCompanyFromEmail(formData.email), 500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.email, formData.entreprise]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const datesRenseignees = dateMode === 'exact'
      ? Boolean(formData.dateArrivee && formData.dateDepart)
      : Boolean(formData.periodeFlexible);

    if (!formData.nomPrenom || !formData.email || !formData.telephone || !formData.nombreParticipants || !datesRenseignees) {
      setError(
        dateMode === 'exact'
          ? 'Veuillez remplir tous les champs obligatoires (dont vos dates).'
          : 'Veuillez remplir tous les champs obligatoires (dont votre période souhaitée).'
      );
      return;
    }

    const participants = parseInt(formData.nombreParticipants, 10);
    if (Number.isNaN(participants) || participants < 10 || participants > 500) {
      setError('Le nombre de participants doit être compris entre 10 et 500. Pour un autre volume, précisez-le dans le message.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const gclid = getGclid();
      const allIds = chateauIds || (chateauId ? [chateauId] : []);
      const formLabel = sourceLabel || chateauNom || 'Séminaire';

      const payload = {
        typeEvenement: 'seminaire' as const,
        // Mode 'exact' : dates fermes — Mode 'flexible' : période libre via datesSouhaitees
        ...(dateMode === 'exact'
          ? { dateArrivee: formData.dateArrivee, dateDepart: formData.dateDepart }
          : { datesSouhaitees: formData.periodeFlexible }),
        duree: '1-jour' as const,
        chateauIds: allIds,
        entreprise: formData.entreprise || '-',
        nomPrenom: formData.nomPrenom,
        email: formData.email,
        telephoneMobile: formData.telephone,
        nombreParticipants: parseInt(formData.nombreParticipants, 10),
        nombreChambres: 1,
        budget: '',
        commentaireDeroulement: formData.message || '',
        sourceLabel: formLabel,
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

      // 2ᵉ vague — mémoriser les coordonnées pour pré-remplir le prochain devis (visiteur de retour)
      try {
        localStorage.setItem('sc_devis_contact', JSON.stringify({
          nomPrenom: formData.nomPrenom,
          entreprise: formData.entreprise,
          email: formData.email,
          telephone: formData.telephone,
        }));
      } catch {
        // localStorage indisponible — non bloquant
      }

      trackFormSubmit('devis-express');
      trackDevisRequest(allIds);

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
          {/* Ligne 1 : Nom, Entreprise, Email, Téléphone */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '12px' }}>
            <div>
              <label htmlFor="mini-nom" style={labelStyle}>Nom & Prénom *</label>
              <input id="mini-nom" name="nomPrenom" type="text" autoComplete="name" required placeholder="Jean Dupont" value={formData.nomPrenom} onChange={handleChange} style={inputStyle} {...focusHandlers} />
            </div>
            <div>
              <label htmlFor="mini-entreprise" style={labelStyle}>Entreprise</label>
              <input id="mini-entreprise" name="entreprise" type="text" autoComplete="organization" placeholder="Nom de l'entreprise" value={formData.entreprise} onChange={handleChange} style={inputStyle} {...focusHandlers} />
            </div>
            <div>
              <label htmlFor="mini-email" style={labelStyle}>
                Email professionnel *
                {isEmailValid(formData.email) && <CheckCircle2 style={{ width: 14, height: 14, color: '#16A34A', display: 'inline', marginLeft: 6, verticalAlign: '-2px' }} />}
              </label>
              <input id="mini-email" name="email" type="email" autoComplete="email" required placeholder="jean@entreprise.com" value={formData.email} onChange={handleChange} style={inputStyle} {...focusHandlers} />
            </div>
            <div>
              <label htmlFor="mini-tel" style={labelStyle}>
                Téléphone *
                {isPhoneValid(formData.telephone) && <CheckCircle2 style={{ width: 14, height: 14, color: '#16A34A', display: 'inline', marginLeft: 6, verticalAlign: '-2px' }} />}
              </label>
              <input id="mini-tel" name="telephone" type="tel" autoComplete="tel" required placeholder="06 12 34 56 78" value={formData.telephone} onChange={handleChange} style={inputStyle} {...focusHandlers} />
            </div>
          </div>

          {/* Toggle : dates précises OU période flexible */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
            <span style={{ ...labelStyle, marginBottom: 0 }}>Vos dates *</span>
            <div
              style={{
                display: 'inline-flex',
                gap: '4px',
                padding: '3px',
                background: theme.colors.neutral.gray100,
                borderRadius: theme.effects.borderRadius.full,
              }}
            >
              {([
                { mode: 'exact' as const, label: 'Je connais mes dates' },
                { mode: 'flexible' as const, label: 'Période flexible' },
              ]).map(({ mode, label }) => {
                const active = dateMode === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => handleDateModeChange(mode)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: theme.effects.borderRadius.full,
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: theme.typography.fontSize.xs,
                      fontWeight: theme.typography.fontWeight.semibold,
                      background: active ? theme.colors.primary.bronze : 'transparent',
                      color: active ? theme.colors.neutral.white : theme.colors.neutral.gray600,
                      transition: 'background 0.2s ease, color 0.2s ease',
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ligne 2 : Participants + (dates précises OU période flexible) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '12px' }}>
            <div>
              <label htmlFor="mini-participants" style={labelStyle}>Participants *</label>
              <input
                id="mini-participants"
                name="nombreParticipants"
                type="number"
                inputMode="numeric"
                min={10}
                max={500}
                required
                placeholder="Ex : 30"
                value={formData.nombreParticipants}
                onChange={handleChange}
                style={inputStyle}
                {...focusHandlers}
              />
              <span
                style={{
                  display: 'block',
                  marginTop: '4px',
                  fontSize: theme.typography.fontSize.xs,
                  color: theme.colors.neutral.gray500,
                  lineHeight: 1.3,
                }}
              >
                Une estimation suffit — c&apos;est pour établir votre devis
              </span>
            </div>

            {dateMode === 'exact' ? (
              <>
                <div>
                  <label htmlFor="mini-date-arrivee" style={labelStyle}>Date d&apos;arrivée *</label>
                  <input
                    id="mini-date-arrivee"
                    name="dateArrivee"
                    type="date"
                    value={formData.dateArrivee}
                    onChange={handleChange}
                    onClick={(e) => { (e.currentTarget as HTMLInputElement).showPicker?.(); }}
                    min={today}
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
                    value={formData.dateDepart}
                    onChange={handleChange}
                    onClick={(e) => { (e.currentTarget as HTMLInputElement).showPicker?.(); }}
                    min={formData.dateArrivee || today}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    {...focusHandlers}
                  />
                </div>
              </>
            ) : (
              <div style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="mini-periode" style={labelStyle}>Période souhaitée *</label>
                <select
                  id="mini-periode"
                  name="periodeFlexible"
                  value={formData.periodeFlexible}
                  onChange={handleChange}
                  style={{
                    ...inputStyle,
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    paddingRight: '36px',
                    color: formData.periodeFlexible ? theme.colors.neutral.gray900 : theme.colors.neutral.gray400,
                  }}
                  {...focusHandlers}
                >
                  <option value="" disabled>Sélectionnez une période</option>
                  <option value="Dès que possible">Dès que possible</option>
                  <option value="Sous 1 à 3 mois">Sous 1 à 3 mois</option>
                  <option value="Sous 3 à 6 mois">Sous 3 à 6 mois</option>
                  <option value="Dans plus de 6 mois">Dans plus de 6 mois</option>
                  <option value="Dates encore à définir">Dates encore à définir</option>
                </select>
              </div>
            )}
          </div>

          {/* Ligne 3 : Message + Bouton — stacké sur mobile */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto]" style={{ gap: '12px', alignItems: 'end' }}>
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
              <span
                style={{
                  fontSize: theme.typography.fontSize.xs,
                  color: theme.colors.neutral.gray500,
                  textAlign: 'center',
                  lineHeight: 1.4,
                }}
              >
                Réponse sous 24h · Sans engagement · Devis gratuit
              </span>
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
