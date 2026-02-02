import { LegalPageLayout, LegalSection, LegalContent, LegalLink } from "@/components/legal";

export default function MentionsLegalesPage() {
  return (
    <LegalPageLayout title="Mentions Légales">
      <LegalSection title="A. Éditeur du Site">
        <LegalContent>
          <p className="mb-2">
            <strong>Select Chateaux</strong>, Société par Actions Simplifiée (SAS).
          </p>
          <p className="mb-2">
            <strong>Siège social :</strong> 60 Rue François 1er, 75008 Paris, France
          </p>
          <p className="mb-2">
            <strong>Activité :</strong> Organisation de séminaires d'entreprises et d'événements professionnels (Prestation de service B2B).
          </p>
          <p className="mb-2">
            <strong>Email de contact :</strong>{" "}
            <LegalLink href="mailto:seminaires@selectchateaux.com">
              seminaires@selectchateaux.com
            </LegalLink>
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection title="B. Hébergeur">
        <LegalContent>
          <p>
            <strong>Vercel Inc.</strong>, 340 S Lemon Ave #4133 Walnut, CA 91789, USA.
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection title="C. Propriété Intellectuelle & Activité">
        <LegalContent spaced>
          <p>
            Le site Select Chateaux a pour objet exclusif la présentation de lieux de réception
            et la logistique de réunion pour une clientèle professionnelle.
          </p>
          <p>
            L'entreprise agit en qualité d'organisateur ensemblier pour des événements d'entreprise
            (séminaires, off-sites, journées d'étude). Elle ne propose pas de prestations touristiques
            de loisirs destinées aux particuliers.
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection title="D. Données Personnelles (RGPD B2B)">
        <LegalContent spaced>
          <p>
            Les données collectées ont pour unique finalité la gestion opérationnelle de l'événement
            (listes de participants / rooming list) et la facturation.
          </p>
          <p>
            Elles sont transmises aux lieux d'accueil partenaires uniquement pour les nécessités
            logistiques de l'événement. Aucune donnée n'est commercialisée à des tiers.
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection title="Propriété Intellectuelle">
        <LegalContent>
          <p>
            L'ensemble du contenu de ce site (textes, images, vidéos, logos, etc.) est la propriété
            exclusive de Select Châteaux. Toute reproduction, représentation, modification, publication
            ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé
            utilisé, est interdite sans l'autorisation écrite préalable de Select Châteaux.
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection title="Droit Applicable">
        <LegalContent>
          <p>
            Le présent site et ses conditions d'utilisation sont régis par le droit français.
            Tout litige relatif à l'utilisation de ce site sera soumis à la compétence exclusive
            des tribunaux français.
          </p>
        </LegalContent>
      </LegalSection>
    </LegalPageLayout>
  );
}
