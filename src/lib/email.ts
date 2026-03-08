import nodemailer from 'nodemailer';
import { Database } from './supabase';
import { chateaux } from '@/data/chateaux';

type DemandeDevis = Database['public']['Tables']['demandes_devis_chateaux']['Row'];

// Configuration du transporteur SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Fonction utilitaire pour formater une date ISO en français
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
};

// Parse le champ dates_souhaitees (format "arrivée|départ" ou date unique)
const parseDates = (datesSouhaitees: string): { arrivee: string; depart: string | null } => {
  if (datesSouhaitees.includes('|')) {
    const [arrivee, depart] = datesSouhaitees.split('|');
    return { arrivee, depart };
  }
  return { arrivee: datesSouhaitees, depart: null };
};

// Convertir la valeur numérique du dropdown en tranche lisible
const formatParticipantsRange = (nombre: number): string => {
  const ranges: Record<number, string> = {
    20: '10 - 30 personnes',
    50: '30 - 80 personnes',
    100: '80 - 150 personnes',
    200: '150 - 300 personnes',
    400: '300 - 500 personnes',
  };
  return ranges[nombre] || `${nombre} personnes`;
};

// Fonction utilitaire pour obtenir les noms des châteaux sélectionnés avec département
const getChateauxNoms = (chateauIds: string): string => {
  if (chateauIds === 'conseil') {
    return 'Laissez-nous vous conseiller';
  }

  const ids = chateauIds.split(',').map(id => id.trim());
  const noms = ids
    .map(id => {
      const chateau = chateaux.find(c => c.id === id);
      if (!chateau) return null;
      const deptMatch = chateau.ref.match(/#(\d+)-/);
      const dept = deptMatch ? deptMatch[1] : '';
      return dept ? `${chateau.nom} (${dept})` : chateau.nom;
    })
    .filter(Boolean);

  return noms.length > 0 ? noms.join(', ') : 'Non spécifié';
};

// Version HTML en liste à puces pour les emails
const getChateauxNomsHtml = (chateauIds: string): string => {
  if (chateauIds === 'conseil') {
    return '<p style="margin: 0; color: #334155; font-size: 15px;">Laissez-nous vous conseiller</p>';
  }

  const ids = chateauIds.split(',').map(id => id.trim());
  const noms = ids
    .map(id => {
      const chateau = chateaux.find(c => c.id === id);
      if (!chateau) return null;
      const deptMatch = chateau.ref.match(/#(\d+)-/);
      const dept = deptMatch ? deptMatch[1] : '';
      return dept ? `${chateau.nom} (${dept})` : chateau.nom;
    })
    .filter(Boolean);

  if (noms.length === 0) return '<p style="margin: 0; color: #334155; font-size: 15px;">Non spécifié</p>';

  const items = noms.map(nom =>
    `<li style="margin: 6px 0; color: #334155; font-size: 15px;">${nom}</li>`
  ).join('');

  return `<ul style="margin: 0; padding-left: 20px; list-style-type: disc;">${items}</ul>`;
};

// Version texte en liste à puces
const getChateauxNomsText = (chateauIds: string): string => {
  if (chateauIds === 'conseil') return '  • Laissez-nous vous conseiller';

  const ids = chateauIds.split(',').map(id => id.trim());
  const noms = ids
    .map(id => {
      const chateau = chateaux.find(c => c.id === id);
      if (!chateau) return null;
      const deptMatch = chateau.ref.match(/#(\d+)-/);
      const dept = deptMatch ? deptMatch[1] : '';
      return dept ? `${chateau.nom} (${dept})` : chateau.nom;
    })
    .filter(Boolean);

  return noms.length > 0 ? noms.map(n => `  • ${n}`).join('\n') : '  • Non spécifié';
};

// Template HTML pour l'email admin
const getAdminEmailTemplate = (devis: DemandeDevis, sourceLabel: string): string => {
  const { arrivee, depart } = parseDates(devis.dates_souhaitees);

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouvelle demande de devis</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

          <!-- En-tête -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 40px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">
                🔔 Nouvelle Demande de Devis
              </h1>
              <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 14px;">
                Référence: #DEV-${devis.id.substring(0, 8).toUpperCase()}
              </p>
            </td>
          </tr>

          <!-- Contenu -->
          <tr>
            <td style="padding: 40px;">

              <!-- Contact -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td>
                    <h2 style="color: #1e3a8a; font-size: 20px; margin: 0 0 20px 0; padding-bottom: 10px; border-bottom: 2px solid #3b82f6;">
                      👤 Contact
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px; background-color: #f8fafc; border-radius: 6px;">
                    <p style="margin: 8px 0; color: #334155; font-size: 15px;">
                      <strong style="color: #1e3a8a;">Nom & Prénom:</strong> ${devis.nom_prenom}
                    </p>
                    ${devis.entreprise && devis.entreprise !== '-' ? `
                    <p style="margin: 8px 0; color: #334155; font-size: 15px;">
                      <strong style="color: #1e3a8a;">Entreprise:</strong> ${devis.entreprise}
                    </p>
                    ` : ''}
                    <p style="margin: 8px 0; color: #334155; font-size: 15px;">
                      <strong style="color: #1e3a8a;">Email:</strong>
                      <a href="mailto:${devis.email}" style="color: #3b82f6; text-decoration: none;">${devis.email}</a>
                    </p>
                    <p style="margin: 8px 0; color: #334155; font-size: 15px;">
                      <strong style="color: #1e3a8a;">Téléphone:</strong>
                      <a href="tel:${devis.telephone_mobile}" style="color: #3b82f6; text-decoration: none;">${devis.telephone_mobile}</a>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Événement -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td>
                    <h2 style="color: #1e3a8a; font-size: 20px; margin: 0 0 20px 0; padding-bottom: 10px; border-bottom: 2px solid #3b82f6;">
                      📅 Événement
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px; background-color: #f8fafc; border-radius: 6px;">
                    <p style="margin: 8px 0; color: #334155; font-size: 15px;">
                      <strong style="color: #1e3a8a;">Participants:</strong> ${formatParticipantsRange(devis.nombre_participants)}
                    </p>
                    <p style="margin: 8px 0; color: #334155; font-size: 15px;">
                      <strong style="color: #1e3a8a;">Date d'arrivée:</strong> ${formatDate(arrivee)}
                    </p>
                    ${depart ? `
                    <p style="margin: 8px 0; color: #334155; font-size: 15px;">
                      <strong style="color: #1e3a8a;">Date de départ:</strong> ${formatDate(depart)}
                    </p>
                    ` : ''}
                  </td>
                </tr>
              </table>

              <!-- Châteaux Sélectionnés -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td>
                    <h2 style="color: #1e3a8a; font-size: 20px; margin: 0 0 20px 0; padding-bottom: 10px; border-bottom: 2px solid #3b82f6;">
                      🏰 Châteaux sélectionnés
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px; background-color: #f8fafc; border-radius: 6px;">
                    ${getChateauxNomsHtml(devis.chateau_id)}
                  </td>
                </tr>
              </table>

              ${devis.commentaire_deroulement ? `
              <!-- Message -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td>
                    <h2 style="color: #1e3a8a; font-size: 20px; margin: 0 0 20px 0; padding-bottom: 10px; border-bottom: 2px solid #3b82f6;">
                      💬 Message
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px; background-color: #f8fafc; border-radius: 6px;">
                    <p style="margin: 0; color: #334155; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">
                      ${devis.commentaire_deroulement}
                    </p>
                  </td>
                </tr>
              </table>
              ` : ''}

              ${sourceLabel ? `
              <!-- Source -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 10px 15px; background-color: #eef2ff; border-radius: 6px;">
                    <p style="margin: 0; color: #6366f1; font-size: 13px;">
                      📍 <strong>Source:</strong> ${sourceLabel}
                    </p>
                  </td>
                </tr>
              </table>
              ` : ''}

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 30px; text-align: center; border-radius: 0 0 8px 8px; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 10px 0; color: #64748b; font-size: 14px;">
                SELECT CHÂTEAUX - Séminaires d'Exception
              </p>
              <p style="margin: 0 0 5px 0; color: #94a3b8; font-size: 13px;">
                60 Rue François 1er, 75008 Paris, France
              </p>
              <p style="margin: 0; color: #94a3b8; font-size: 13px;">
                📧 seminaires@selectchateaux.com | 🌐 www.selectchateaux.com
              </p>
              <p style="margin: 10px 0 0 0; color: #cbd5e1; font-size: 12px;">
                Demande reçue le ${new Date(devis.created_at).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

// Template HTML pour l'email client
const getClientEmailTemplate = (devis: DemandeDevis): string => {
  const { arrivee, depart } = parseDates(devis.dates_souhaitees);

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmation de votre demande</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

          <!-- En-tête -->
          <tr>
            <td style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); padding: 40px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">
                ✓ Demande Bien Reçue
              </h1>
              <p style="color: #d1fae5; margin: 10px 0 0 0; font-size: 16px;">
                Merci pour votre confiance
              </p>
            </td>
          </tr>

          <!-- Contenu -->
          <tr>
            <td style="padding: 40px;">

              <!-- Message personnalisé -->
              <p style="color: #334155; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                Bonjour <strong>${devis.nom_prenom}</strong>,
              </p>

              <p style="color: #334155; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                Nous avons bien reçu votre demande de devis.
                Notre équipe va étudier votre projet avec la plus grande attention.
              </p>

              <!-- Récapitulatif -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td>
                    <h2 style="color: #059669; font-size: 20px; margin: 0 0 20px 0; padding-bottom: 10px; border-bottom: 2px solid #10b981;">
                      📋 Récapitulatif
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px; background-color: #f0fdf4; border-radius: 6px; border-left: 4px solid #10b981;">
                    <p style="margin: 8px 0; color: #334155; font-size: 15px;">
                      <strong style="color: #059669;">Référence:</strong> #DEV-${devis.id.substring(0, 8).toUpperCase()}
                    </p>
                    <p style="margin: 8px 0; color: #334155; font-size: 15px;">
                      <strong style="color: #059669;">Participants:</strong> ${formatParticipantsRange(devis.nombre_participants)}
                    </p>
                    <p style="margin: 8px 0; color: #334155; font-size: 15px;">
                      <strong style="color: #059669;">Date d'arrivée:</strong> ${formatDate(arrivee)}
                    </p>
                    ${depart ? `
                    <p style="margin: 8px 0; color: #334155; font-size: 15px;">
                      <strong style="color: #059669;">Date de départ:</strong> ${formatDate(depart)}
                    </p>
                    ` : ''}
                    <p style="margin: 8px 0 4px 0; color: #334155; font-size: 15px;">
                      <strong style="color: #059669;">Châteaux sélectionnés :</strong>
                    </p>
                    ${getChateauxNomsHtml(devis.chateau_id)}
                  </td>
                </tr>
              </table>

              <!-- Prochaines étapes -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td>
                    <h2 style="color: #059669; font-size: 20px; margin: 0 0 20px 0; padding-bottom: 10px; border-bottom: 2px solid #10b981;">
                      🎯 Prochaines Étapes
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 15px 0; border-bottom: 1px solid #e5e7eb;">
                          <p style="margin: 0; color: #334155; font-size: 15px; line-height: 1.6;">
                            <strong style="color: #059669;">1.</strong> Notre équipe vérifie la disponibilité des châteaux
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 15px 0; border-bottom: 1px solid #e5e7eb;">
                          <p style="margin: 0; color: #334155; font-size: 15px; line-height: 1.6;">
                            <strong style="color: #059669;">2.</strong> Réponse sous <strong>24 à 48 heures</strong> avec une proposition personnalisée
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 15px 0;">
                          <p style="margin: 0; color: #334155; font-size: 15px; line-height: 1.6;">
                            <strong style="color: #059669;">3.</strong> On affine ensemble votre projet
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Contact -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                <tr>
                  <td style="padding: 20px; background-color: #fef3c7; border-radius: 6px; border-left: 4px solid #f59e0b;">
                    <p style="margin: 0 0 10px 0; color: #92400e; font-size: 15px; font-weight: 600;">
                      Une question en attendant ?
                    </p>
                    <p style="margin: 0; color: #78350f; font-size: 14px;">
                      📧 <a href="mailto:seminaires@selectchateaux.com" style="color: #b45309; text-decoration: none;">seminaires@selectchateaux.com</a>
                    </p>
                  </td>
                </tr>
              </table>

              <p style="color: #334155; font-size: 16px; line-height: 1.6; margin: 30px 0 0 0;">
                À très bientôt,<br>
                <strong>L'équipe SELECT CHÂTEAUX</strong>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 30px; text-align: center; border-radius: 0 0 8px 8px; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 15px 0; color: #64748b; font-size: 14px; font-weight: 600;">
                SELECT CHÂTEAUX
              </p>
              <p style="margin: 0 0 10px 0; color: #64748b; font-size: 13px;">
                Séminaires d'Exception dans les plus beaux domaines d'Île-de-France
              </p>
              <p style="margin: 0 0 5px 0; color: #94a3b8; font-size: 13px;">
                60 Rue François 1er, 75008 Paris, France
              </p>
              <p style="margin: 0 0 15px 0; color: #94a3b8; font-size: 13px;">
                📧 seminaires@selectchateaux.com | 🌐 <a href="https://www.selectchateaux.com" style="color: #3b82f6; text-decoration: none;">www.selectchateaux.com</a>
              </p>
              <p style="margin: 0; color: #cbd5e1; font-size: 12px;">
                <a href="https://www.selectchateaux.com/cgv" style="color: #94a3b8; text-decoration: none; margin: 0 8px;">CGV</a> |
                <a href="https://www.selectchateaux.com/confidentialite" style="color: #94a3b8; text-decoration: none; margin: 0 8px;">Confidentialité</a> |
                <a href="https://www.selectchateaux.com/mentions-legales" style="color: #94a3b8; text-decoration: none; margin: 0 8px;">Mentions légales</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

// Version texte brut pour l'email admin (fallback)
const getAdminEmailText = (devis: DemandeDevis, sourceLabel: string): string => {
  const { arrivee, depart } = parseDates(devis.dates_souhaitees);

  return `
NOUVELLE DEMANDE DE DEVIS
Référence: #DEV-${devis.id.substring(0, 8).toUpperCase()}

CONTACT
Nom & Prénom: ${devis.nom_prenom}
${devis.entreprise && devis.entreprise !== '-' ? `Entreprise: ${devis.entreprise}\n` : ''}Email: ${devis.email}
Téléphone: ${devis.telephone_mobile}

ÉVÉNEMENT
Participants: ${formatParticipantsRange(devis.nombre_participants)}
Date d'arrivée: ${formatDate(arrivee)}
${depart ? `Date de départ: ${formatDate(depart)}\n` : ''}
CHÂTEAUX SÉLECTIONNÉS
${getChateauxNomsText(devis.chateau_id)}

${devis.commentaire_deroulement ? `MESSAGE\n${devis.commentaire_deroulement}\n\n` : ''}${sourceLabel ? `Source: ${sourceLabel}\n\n` : ''}
---
SELECT CHÂTEAUX - Séminaires d'Exception
60 Rue François 1er, 75008 Paris, France
seminaires@selectchateaux.com | www.selectchateaux.com
Demande reçue le ${new Date(devis.created_at).toLocaleDateString('fr-FR')}
  `.trim();
};

// Version texte brut pour l'email client (fallback)
const getClientEmailText = (devis: DemandeDevis): string => {
  const { arrivee, depart } = parseDates(devis.dates_souhaitees);

  return `
Bonjour ${devis.nom_prenom},

Nous avons bien reçu votre demande de devis.
Notre équipe va étudier votre projet avec la plus grande attention.

RÉCAPITULATIF
Référence: #DEV-${devis.id.substring(0, 8).toUpperCase()}
Participants: ${formatParticipantsRange(devis.nombre_participants)}
Date d'arrivée: ${formatDate(arrivee)}
${depart ? `Date de départ: ${formatDate(depart)}\n` : ''}Châteaux sélectionnés :
${getChateauxNomsText(devis.chateau_id)}

PROCHAINES ÉTAPES
1. Notre équipe vérifie la disponibilité des châteaux
2. Réponse sous 24 à 48 heures avec une proposition personnalisée
3. On affine ensemble votre projet

UNE QUESTION EN ATTENDANT ?
seminaires@selectchateaux.com

À très bientôt,
L'équipe SELECT CHÂTEAUX

---
SELECT CHÂTEAUX
Séminaires d'Exception dans les plus beaux domaines d'Île-de-France
60 Rue François 1er, 75008 Paris, France
seminaires@selectchateaux.com | www.selectchateaux.com
  `.trim();
};

// Fonction principale pour envoyer un email
async function sendEmail(to: string, subject: string, html: string, text: string): Promise<boolean> {
  try {
    const info = await transporter.sendMail({
      from: `"SELECT CHÂTEAUX" <${process.env.EMAIL_FROM || process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      text,
    });

    console.log('✅ Email envoyé avec succès:', {
      to,
      messageId: info.messageId,
      subject,
    });

    return true;
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'email:', {
      to,
      subject,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    });
    return false;
  }
}

// Envoyer l'email de notification à l'administrateur
export async function sendAdminNotification(devis: DemandeDevis, sourceLabel: string = ''): Promise<boolean> {
  const adminEmail = process.env.EMAIL_ADMIN || process.env.SMTP_USER;

  if (!adminEmail) {
    console.error('❌ EMAIL_ADMIN non configuré');
    return false;
  }

  const subject = `🔔 Nouvelle demande de devis - ${devis.nom_prenom}`;
  const html = getAdminEmailTemplate(devis, sourceLabel);
  const text = getAdminEmailText(devis, sourceLabel);

  return sendEmail(adminEmail, subject, html, text);
}

// Envoyer l'email de confirmation au client
export async function sendClientConfirmation(devis: DemandeDevis): Promise<boolean> {
  const subject = `Confirmation de votre demande de devis - SELECT CHÂTEAUX`;
  const html = getClientEmailTemplate(devis);
  const text = getClientEmailText(devis);

  return sendEmail(devis.email, subject, html, text);
}

// Fonction pour tester la configuration email
export async function testEmailConfiguration(): Promise<boolean> {
  try {
    await transporter.verify();
    console.log('✅ Configuration email valide');
    return true;
  } catch (error) {
    console.error('❌ Configuration email invalide:', error);
    return false;
  }
}
