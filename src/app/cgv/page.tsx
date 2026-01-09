import { Metadata } from "next";
import NavigationLuxe from "@/components/NavigationLuxe";
import { FooterLuxe } from "@/components/FooterLuxe";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente | Châteaux Événements",
  description: "Conditions générales de vente et d'utilisation",
};

export default function CGVPage() {
  return (
    <>
      <NavigationLuxe />
      <main className="min-h-screen bg-white pt-20">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Conditions Générales de Vente</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Objet</h2>
              <p>
                Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles
                entre Châteaux Événements et ses clients dans le cadre de l'organisation d'événements professionnels
                dans nos domaines.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Demande de devis</h2>
              <p>
                Toute demande de devis peut être effectuée via le formulaire en ligne ou par email.
                Le devis est établi sur mesure en fonction de vos besoins et reste valable 30 jours.
              </p>
              <p className="mt-4">
                Le devis comprend :
              </p>
              <ul>
                <li>La location du domaine et des espaces</li>
                <li>Les prestations d'hébergement si applicable</li>
                <li>Les services de restauration</li>
                <li>Les équipements techniques mis à disposition</li>
                <li>Les services additionnels demandés</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Réservation et confirmation</h2>
              <p>
                La réservation devient ferme et définitive après :
              </p>
              <ul>
                <li>Acceptation écrite du devis</li>
                <li>Versement d'un acompte de 30% du montant total TTC</li>
                <li>Retour du contrat signé</li>
              </ul>
              <p className="mt-4">
                Un contrat détaillé sera établi précisant l'ensemble des prestations et conditions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Tarifs et modalités de paiement</h2>
              <p>
                Nos tarifs sont indiqués en euros TTC. Ils peuvent varier selon :
              </p>
              <ul>
                <li>La période de l'année (haute/basse saison)</li>
                <li>Le nombre de participants</li>
                <li>La durée de l'événement</li>
                <li>Les prestations demandées</li>
              </ul>
              <p className="mt-4">
                <strong>Modalités de paiement :</strong>
              </p>
              <ul>
                <li>Acompte : 30% à la réservation</li>
                <li>Solde : 70% 30 jours avant l'événement</li>
              </ul>
              <p className="mt-4">
                Modes de paiement acceptés : virement bancaire, chèque.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Annulation et modification</h2>
              <p>
                <strong>Par le client :</strong>
              </p>
              <ul>
                <li>Plus de 90 jours avant : remboursement de l'acompte moins 500€ de frais de dossier</li>
                <li>Entre 90 et 60 jours : retenue de 30% du montant total</li>
                <li>Entre 60 et 30 jours : retenue de 50% du montant total</li>
                <li>Moins de 30 jours : retenue de 100% du montant total</li>
              </ul>
              <p className="mt-4">
                <strong>Modification :</strong> Toute modification doit être demandée par écrit et reste soumise à notre acceptation
                et à la disponibilité des lieux.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Obligations du client</h2>
              <p>
                Le client s'engage à :
              </p>
              <ul>
                <li>Respecter le règlement intérieur du domaine</li>
                <li>Veiller au bon comportement de ses invités</li>
                <li>Restituer les lieux dans l'état initial</li>
                <li>Souscrire une assurance responsabilité civile événementielle</li>
                <li>Respecter les normes de sécurité et les horaires convenus</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Responsabilités</h2>
              <p>
                Châteaux Événements ne peut être tenu responsable :
              </p>
              <ul>
                <li>Des dommages causés par les participants</li>
                <li>Du vol ou de la perte d'objets personnels</li>
                <li>Des annulations dues à des cas de force majeure</li>
                <li>Des préjudices liés à des prestataires extérieurs</li>
              </ul>
              <p className="mt-4">
                Notre responsabilité est limitée au montant des prestations facturées.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Force majeure</h2>
              <p>
                En cas de force majeure (catastrophe naturelle, pandémie, grève, etc.),
                le contrat pourra être annulé ou reporté sans pénalité pour les deux parties.
                Les sommes versées seront remboursées ou reportées sur une nouvelle date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Litiges</h2>
              <p>
                En cas de litige, les parties s'engagent à rechercher une solution amiable.
                À défaut, le litige sera porté devant les tribunaux compétents français.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Contact</h2>
              <p>
                Pour toute question concernant nos CGV :
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
