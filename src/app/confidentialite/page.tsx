import { Metadata } from "next";
import { LegalPageLayout, LegalSection, LegalContent, LegalLink } from "@/components/legal";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | Select Châteaux",
  description: "Politique de confidentialité et protection des données personnelles - RGPD",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ConfidentialitePage() {
  return (
    <LegalPageLayout title="Politique de Confidentialité">

      <LegalSection title="Introduction">
        <LegalContent spaced>
          <p>
            <strong>Select Châteaux</strong>, agence spécialisée dans l'organisation de séminaires d'entreprise en lieux d'exception, s'engage à protéger la vie privée de ses utilisateurs et à respecter le Règlement Général sur la Protection des Données (RGPD).
          </p>
          <p>
            Cette politique de confidentialité explique comment nous collectons, utilisons, stockons et protégeons vos données personnelles lorsque vous utilisez notre site web <strong>www.selectchateaux.com</strong>.
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection title="1. Responsable du traitement des données">
        <LegalContent>
          <p className="mb-2">
            <strong>Select Châteaux</strong>
          </p>
          <p className="mb-2">
            60 Rue François 1er, 75008 Paris, France
          </p>
          <p className="mb-2">
            <strong>Email :</strong>{" "}
            <LegalLink href="mailto:seminaires@selectchateaux.com">
              seminaires@selectchateaux.com
            </LegalLink>
          </p>
          <p>
            <strong>Téléphone :</strong>{" "}
            <LegalLink href="tel:+33757991146">07 57 99 11 46</LegalLink>
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection title="2. Données personnelles collectées">
        <LegalContent spaced>
          <p>
            <strong>2.1. Données fournies directement</strong>
          </p>
          <p>
            Lorsque vous remplissez notre formulaire de demande de devis, nous collectons :
            nom et prénom, nom de l'entreprise, adresse email professionnelle, numéro de téléphone,
            type d'événement souhaité, nombre de participants estimé, date souhaitée et budget approximatif.
          </p>
          <p>
            <strong>2.2. Données collectées automatiquement</strong>
          </p>
          <p>
            Lors de votre navigation sur notre site : adresse IP anonymisée, type de navigateur
            et système d'exploitation, pages visitées et durée de visite, source de trafic.
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection title="3. Finalités du traitement des données">
        <LegalContent spaced>
          <p>
            Vos données personnelles sont utilisées pour les finalités suivantes :
          </p>
          <p>
            • <strong>Traitement des demandes de devis :</strong> Analyser vos besoins et vous proposer une offre personnalisée
          </p>
          <p>
            • <strong>Communication commerciale :</strong> Vous contacter par email ou téléphone pour finaliser votre projet
          </p>
          <p>
            • <strong>Amélioration de nos services :</strong> Analyser les performances de notre site et optimiser l'expérience utilisateur
          </p>
          <p>
            • <strong>Mesure publicitaire :</strong> Évaluer l'efficacité de nos campagnes Google Ads et ajuster nos investissements marketing
          </p>
          <p>
            • <strong>Conformité légale :</strong> Respecter nos obligations juridiques et comptables
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection title="5. Cookies et technologies de suivi">
        <LegalContent spaced>
          <p>
            <strong>5.1. Qu'est-ce qu'un cookie ?</strong>
          </p>
          <p>
            Un cookie est un petit fichier texte déposé sur votre navigateur lors de votre visite sur notre site.
            Il permet de mémoriser vos préférences et de mesurer l'audience.
          </p>

          <p>
            <strong>5.2. Types de cookies utilisés</strong>
          </p>
          <p>
            • <strong>Cookies strictement nécessaires (toujours actifs) :</strong> cookie-consent (mémorise votre choix, 12 mois), cookies de session Next.js
          </p>
          <p>
            • <strong>Cookies analytiques (avec consentement) :</strong> Google Analytics pour mesure d'audience, conservation 26 mois maximum
          </p>
          <p>
            • <strong>Cookies publicitaires (avec consentement) :</strong> Google Ads Conversion Tracking, conservation 90 jours maximum
          </p>

          <p>
            <strong>5.3. Google Consent Mode v2</strong>
          </p>
          <p>
            Nous utilisons le <strong>Google Consent Mode v2 en mode Advanced</strong>.
            Même si vous refusez les cookies, Google reçoit des signaux anonymisés (sans identifiant personnel)
            pour mesurer l'efficacité de nos campagnes publicitaires tout en respectant votre vie privée.
          </p>
          <p>
            <strong>Refus des cookies :</strong> Si vous refusez, aucune donnée personnelle n'est transmise à Google.
            Seuls des pings anonymes statistiques sont envoyés pour optimiser les campagnes publicitaires de manière agrégée.
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection title="6. Destinataires des données">
        <LegalContent spaced>
          <p>
            Vos données personnelles sont transmises aux destinataires suivants :
          </p>
          <p>
            • <strong>Équipe Select Châteaux :</strong> Traitement des demandes de devis et communication commerciale
          </p>
          <p>
            • <strong>Supabase (hébergement base de données) :</strong> Stockage sécurisé des formulaires de devis - Serveurs UE, conforme RGPD
          </p>
          <p>
            • <strong>Google LLC (Google Ads, Google Analytics) :</strong> Mesure d'audience et conversion publicitaire - Transfert UE-USA encadré par les clauses contractuelles types
          </p>
          <p>
            • <strong>Vercel (hébergement site web) :</strong> Hébergement technique du site - Serveurs UE, conforme RGPD
          </p>
          <p>
            <strong>Aucune donnée n'est vendue ou louée à des tiers à des fins commerciales.</strong>
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection title="8. Durée de conservation des données">
        <LegalContent spaced>
          <p>
            • <strong>Demandes de devis :</strong> 3 ans à compter de la dernière interaction (prospect inactif)
          </p>
          <p>
            • <strong>Clients ayant réservé :</strong> 10 ans (obligations comptables et fiscales)
          </p>
          <p>
            • <strong>Cookies analytiques et publicitaires :</strong> 26 mois maximum (Google Analytics), 90 jours (Google Ads)
          </p>
          <p>
            • <strong>Consentement cookies :</strong> 12 mois (renouvellement nécessaire après expiration)
          </p>
          <p>
            À l'issue de ces délais, vos données sont soit supprimées définitivement, soit anonymisées de manière irréversible.
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection title="9. Sécurité des données">
        <LegalContent spaced>
          <p>
            Nous mettons en œuvre les mesures techniques et organisationnelles suivantes :
          </p>
          <p>
            • <strong>Chiffrement HTTPS :</strong> Toutes les communications entre votre navigateur et notre site sont chiffrées (certificat SSL/TLS)
          </p>
          <p>
            • <strong>Base de données sécurisée :</strong> Hébergement Supabase avec chiffrement au repos (AES-256) et en transit (TLS 1.3)
          </p>
          <p>
            • <strong>Accès restreint :</strong> Seules les personnes autorisées (équipe Select Châteaux) ont accès aux données clients
          </p>
          <p>
            • <strong>Content Security Policy (CSP) :</strong> Protection contre les attaques XSS et injection de code
          </p>
          <p>
            • <strong>Sauvegardes régulières :</strong> Backup quotidien automatique avec chiffrement
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection title="10. Vos droits sur vos données personnelles">
        <LegalContent spaced>
          <p>
            Conformément au RGPD, vous disposez des droits suivants :
          </p>
          <p>
            • <strong>Droit d'accès :</strong> Obtenir une copie de toutes vos données personnelles que nous détenons
          </p>
          <p>
            • <strong>Droit de rectification :</strong> Corriger des données inexactes ou incomplètes
          </p>
          <p>
            • <strong>Droit à l'effacement ("droit à l'oubli") :</strong> Demander la suppression de vos données (sauf obligation légale de conservation)
          </p>
          <p>
            • <strong>Droit à la limitation du traitement :</strong> Geler temporairement l'utilisation de vos données
          </p>
          <p>
            • <strong>Droit à la portabilité :</strong> Récupérer vos données dans un format structuré (CSV, JSON)
          </p>
          <p>
            • <strong>Droit d'opposition :</strong> Vous opposer au traitement de vos données pour motif légitime
          </p>
          <p>
            <strong>Comment exercer vos droits ?</strong> Pour toute demande, contactez-nous par email à{" "}
            <LegalLink href="mailto:seminaires@selectchateaux.com">seminaires@selectchateaux.com</LegalLink>.
            Nous vous répondrons sous 1 mois maximum (délai légal).
          </p>
          <p>
            <strong>Réclamation auprès de la CNIL :</strong> Si vous estimez que vos droits ne sont pas respectés,
            vous pouvez introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) :
            <LegalLink href="https://www.cnil.fr/" target="_blank" rel="noopener noreferrer"> www.cnil.fr</LegalLink>
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection title="11. Modifications de cette politique">
        <LegalContent spaced>
          <p>
            Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment.
            Toute modification sera publiée sur cette page avec une nouvelle date de mise à jour.
          </p>
          <p>
            En cas de modification substantielle, nous vous en informerons par email (si vous nous avez fourni votre adresse)
            ou via une notification sur le site.
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection title="12. Nous contacter">
        <LegalContent>
          <p className="mb-2">
            <strong>Select Châteaux</strong>
          </p>
          <p className="mb-2">
            60 Rue François 1er, 75008 Paris, France
          </p>
          <p className="mb-2">
            <strong>Email :</strong>{" "}
            <LegalLink href="mailto:seminaires@selectchateaux.com">seminaires@selectchateaux.com</LegalLink>
          </p>
          <p className="mb-2">
            <strong>Téléphone :</strong>{" "}
            <LegalLink href="tel:+33757991146">07 57 99 11 46</LegalLink>
          </p>
          <p>
            Horaires : Lundi - Vendredi, 9h00 - 18h00 (hors jours fériés)
          </p>
        </LegalContent>
      </LegalSection>

    </LegalPageLayout>
  );
}
