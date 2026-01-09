import { Metadata } from "next";
import { NavigationLuxe } from "@/components/NavigationLuxe";
import { FooterLuxe } from "@/components/FooterLuxe";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | Châteaux Événements",
  description: "Politique de confidentialité et protection des données personnelles",
};

export default function ConfidentialitePage() {
  return (
    <>
      <NavigationLuxe />
      <main className="min-h-screen bg-white pt-20">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Politique de Confidentialité</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Collecte des données</h2>
              <p>
                Nous collectons les données personnelles que vous nous fournissez lors de votre demande de devis :
              </p>
              <ul>
                <li>Nom et prénom</li>
                <li>Entreprise</li>
                <li>Email</li>
                <li>Téléphone</li>
                <li>Informations sur l'événement souhaité</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Utilisation des données</h2>
              <p>
                Vos données personnelles sont utilisées exclusivement pour :
              </p>
              <ul>
                <li>Traiter votre demande de devis</li>
                <li>Vous contacter pour finaliser votre événement</li>
                <li>Améliorer nos services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Protection des données</h2>
              <p>
                Vos données sont stockées de manière sécurisée sur des serveurs protégés (Supabase).
                Nous mettons en œuvre toutes les mesures de sécurité nécessaires pour protéger vos informations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Vos droits</h2>
              <p>
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul>
                <li>Droit d'accès à vos données</li>
                <li>Droit de rectification</li>
                <li>Droit à l'effacement</li>
                <li>Droit à la portabilité</li>
                <li>Droit d'opposition</li>
              </ul>
              <p className="mt-4">
                Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@chateauxprestige.fr" className="text-primary-bronze hover:underline">contact@chateauxprestige.fr</a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Cookies</h2>
              <p>
                Notre site utilise uniquement des cookies techniques nécessaires au fonctionnement du site.
                Aucun cookie de tracking ou publicitaire n'est utilisé.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Conservation des données</h2>
              <p>
                Vos données sont conservées pendant la durée nécessaire au traitement de votre demande,
                puis archivées conformément aux obligations légales (maximum 3 ans).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Contact</h2>
              <p>
                Pour toute question concernant cette politique de confidentialité :
              </p>
              <p className="mt-2">
                Email : <a href="mailto:contact@chateauxprestige.fr" className="text-primary-bronze hover:underline">contact@chateauxprestige.fr</a><br/>
                Téléphone : 01 XX XX XX XX
              </p>
            </section>
          </div>
        </div>
      </main>
      <FooterLuxe />
    </>
  );
}
