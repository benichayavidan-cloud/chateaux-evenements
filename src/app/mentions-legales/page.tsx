import { Metadata } from "next";
import NavigationLuxe from "@/components/NavigationLuxe";
import FooterLuxe from "@/components/FooterLuxe";

export const metadata: Metadata = {
  title: "Mentions Légales | Châteaux Événements",
  description: "Mentions légales et informations sur l'éditeur du site",
};

export default function MentionsLegalesPage() {
  return (
    <>
      <NavigationLuxe />
      <main className="min-h-screen bg-white pt-20">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Mentions Légales</h1>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Éditeur du site</h2>
              <p>
                <strong>Raison sociale :</strong> Châteaux Événements<br/>
                <strong>Forme juridique :</strong> SAS<br/>
                <strong>Capital social :</strong> 50 000 €<br/>
                <strong>Siège social :</strong> [Adresse à compléter]<br/>
                <strong>SIRET :</strong> [Numéro à compléter]<br/>
                <strong>Email :</strong> <a href="mailto:contact@chateauxprestige.fr" className="text-primary-bronze hover:underline">contact@chateauxprestige.fr</a><br/>
                <strong>Téléphone :</strong> 01 XX XX XX XX
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Directeur de publication</h2>
              <p>
                <strong>Nom :</strong> [Nom du directeur]<br/>
                <strong>Fonction :</strong> Président
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Hébergement</h2>
              <p>
                <strong>Hébergeur :</strong> Vercel Inc.<br/>
                <strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA<br/>
                <strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-primary-bronze hover:underline">vercel.com</a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Base de données</h2>
              <p>
                <strong>Fournisseur :</strong> Supabase Inc.<br/>
                <strong>Site web :</strong> <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-primary-bronze hover:underline">supabase.com</a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Propriété intellectuelle</h2>
              <p>
                L'ensemble du contenu de ce site (textes, images, vidéos, logos, etc.) est la propriété exclusive de Châteaux Événements.
                Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site,
                quel que soit le moyen ou le procédé utilisé, est interdite sans l'autorisation écrite préalable de Châteaux Événements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Crédits</h2>
              <p>
                <strong>Développement :</strong> Site développé avec Next.js, React et Tailwind CSS<br/>
                <strong>Photos :</strong> [Crédits photos à compléter]<br/>
                <strong>Design :</strong> Design original Châteaux Événements
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Données personnelles</h2>
              <p>
                Pour toute information concernant la collecte et le traitement de vos données personnelles,
                veuillez consulter notre <a href="/confidentialite" className="text-primary-bronze hover:underline">politique de confidentialité</a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Cookies</h2>
              <p>
                Ce site utilise uniquement des cookies techniques nécessaires à son fonctionnement.
                Aucun cookie de tracking ou publicitaire n'est utilisé.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Droit applicable</h2>
              <p>
                Le présent site et ses conditions d'utilisation sont régis par le droit français.
                Tout litige relatif à l'utilisation de ce site sera soumis à la compétence exclusive des tribunaux français.
              </p>
            </section>
          </div>
        </div>
      </main>
      <FooterLuxe />
    </>
  );
}
