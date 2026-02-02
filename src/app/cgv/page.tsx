import { LegalPageLayout, LegalSection, LegalContent, LegalList, LegalLink } from "@/components/legal";

export default function CGVPage() {
  return (
    <LegalPageLayout
      title="Conditions Générales de Vente"
      subtitle="Dernière mise à jour : Janvier 2026"
    >
      <LegalSection title="Article 1 - Objet">
        <LegalContent>
          <p className="mb-3">
            Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles
            entre <strong>Select Châteaux</strong> (ci-après "le Prestataire") et ses clients professionnels
            (ci-après "le Commanditaire") dans le cadre de la fourniture de prestations de services
            d'organisation et de logistique événementielle (séminaires d'entreprise, journées d'étude, team-building).
          </p>
          <p className="mb-3">
            <strong>Select Châteaux</strong> agit en qualité d'organisateur ensemblier selon un modèle
            d'achat-revente (Merchant Model). Le Commanditaire ne contracte qu'avec Select Châteaux,
            qui achète et revend un forfait global de prestations incluant :
          </p>
          <LegalList items={[
            "La location d'espaces dans des domaines partenaires",
            "La logistique d'hébergement des participants",
            "Les prestations de restauration",
            "Les équipements techniques et activités éventuelles"
          ]} />
          <p className="mt-3">
            <strong>Exclusion expresse :</strong> Select Châteaux n'opère pas en qualité d'agence de voyage
            au sens de l'article L211-1 du Code du Tourisme. Les prestations fournies ne constituent pas
            des forfaits touristiques mais des services B2B exclusivement destinés aux entreprises.
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection title="Article 2 - Prix et Facturation">
        <LegalContent>
          <p className="mb-3">
            Les prix sont indiqués en euros TTC (TVA applicable : 20%). Ils comprennent l'ensemble
            des prestations décrites dans le devis personnalisé et peuvent varier selon :
          </p>
          <LegalList items={[
            "La période de l'année (haute/basse saison)",
            "Le nombre de participants",
            "La durée de l'événement",
            "Les prestations optionnelles demandées"
          ]} />
          <p className="mt-3">
            Une facture unique est émise par Select Châteaux. Le Commanditaire ne recevra aucune
            facture directe des lieux partenaires.
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection title="Article 3 - Modalités de Paiement">
        <LegalContent>
          <p className="mb-2">
            <strong>La réservation devient ferme et définitive après :</strong>
          </p>
          <div className="mb-4">
            <LegalList items={[
              "Acceptation écrite du devis",
              "Versement d'un acompte de 50% du montant total TTC à la commande",
              "Retour du contrat signé"
            ]} />
          </div>
          <p className="mb-2">
            <strong>Échéancier de paiement :</strong>
          </p>
          <div className="mb-3">
            <LegalList items={[
              "Acompte : 50% à la signature du contrat",
              "Solde : 50% à J-30 avant la date de l'événement"
            ]} />
          </div>
          <p>
            <strong>Modes de paiement acceptés :</strong> virement bancaire, chèque.
            Tout retard de paiement entraîne l'application de pénalités de retard au taux légal
            en vigueur, ainsi qu'une indemnité forfaitaire de 40€ pour frais de recouvrement.
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection title="Article 4 - Conditions d'Annulation">
        <LegalContent>
          <p className="mb-2">
            <strong>Annulation à l'initiative du Commanditaire :</strong>
          </p>
          <p className="mb-3">
            Toute annulation doit être notifiée par écrit (lettre recommandée avec AR ou email).
            Les pénalités suivantes s'appliquent automatiquement :
          </p>
          <LegalList items={[
            "Plus de 90 jours avant : remboursement de l'acompte moins 500€ de frais de dossier",
            "Entre 90 et 60 jours : retenue de 30% du montant total TTC",
            "Entre 60 et 30 jours : retenue de 50% du montant total TTC",
            "Moins de 30 jours : retenue de 100% du montant total TTC"
          ]} />
          <p className="mt-3">
            <strong>Absence ou annulation partielle :</strong> Toute prestation non consommée
            (participant absent, repas non pris) reste due intégralement et ne fait l'objet
            d'aucun remboursement.
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection title="Article 5 - Report et Modification">
        <LegalContent spaced>
          <div>
            <p className="mb-2"><strong>5.1 - Report à la demande du Commanditaire</strong></p>
            <p className="mb-3">
              Le Commanditaire peut demander le report de l'événement selon les conditions suivantes :
            </p>
            <LegalList items={[
              "Plus de 60 jours avant : Report possible sans frais supplémentaires, sous réserve de disponibilité du lieu partenaire et validation par Select Châteaux",
              "Moins de 60 jours avant : Tout report est considéré comme une annulation et soumis au barème des pénalités de l'Article 4"
            ]} />
          </div>
          <div>
            <p className="mb-2 mt-4"><strong>5.2 - Modification du nombre de participants</strong></p>
            <LegalList items={[
              "Jusqu'à J-30 : Ajustement possible sans frais si variation < 10%",
              "Entre J-30 et J-7 : Toute diminution > 10% entraîne facturation intégrale des prestations réservées",
              "Moins de J-7 : Aucune modification n'est acceptée, le nombre confirmé à J-30 reste facturé"
            ]} />
          </div>
          <div>
            <p className="mb-2 mt-4"><strong>5.3 - Modification des prestations</strong></p>
            <p>
              Toute modification substantielle (changement de dates, d'activités, de menu) doit être
              demandée par écrit et reste soumise à l'acceptation de Select Châteaux et à la
              disponibilité des lieux partenaires. Des frais administratifs de 150€ HT peuvent s'appliquer.
            </p>
          </div>
        </LegalContent>
      </LegalSection>

      <LegalSection title="Article 6 - Force Majeure, Intempéries et Défaillance du Lieu">
        <LegalContent spaced>
          <div>
            <p className="mb-2"><strong>6.1 - Définition de la Force Majeure</strong></p>
            <p className="mb-3">
              Conformément à l'article 1218 du Code Civil, constitue un cas de force majeure tout
              événement échappant au contrôle raisonnable des parties, imprévisible et insurmontable,
              rendant impossible l'exécution du contrat. Sont notamment considérés comme cas de
              force majeure :
            </p>
            <LegalList items={[
              "Fermeture administrative du lieu par décision préfectorale ou gouvernementale",
              "Interdiction de rassemblement édictée par les autorités publiques (ex : crise sanitaire)",
              "Catastrophe naturelle faisant l'objet d'un Arrêté de Catastrophe Naturelle",
              "Grèves générales des transports nationaux rendant l'accès au site impossible",
              "Blocage des réseaux routiers majeurs par décision administrative"
            ]} />
            <p className="mt-3">
              <strong>Conséquences :</strong> En cas de force majeure, l'événement est automatiquement
              REPORTÉ. Select Châteaux émet un Avoir d'une validité de 18 mois permettant d'organiser
              l'événement à une date ultérieure. Le remboursement n'est possible que si le report
              s'avère définitivement impossible (fermeture définitive du lieu, liquidation judiciaire).
            </p>
          </div>
          <div>
            <p className="mb-2 mt-4"><strong>6.2 - Conditions Météorologiques</strong></p>
            <p className="mb-3">
              Les conditions météorologiques défavorables (pluie, vent, chaleur, froid) <strong>ne constituent
              pas un cas de force majeure</strong> et ne justifient ni annulation ni remboursement,
              sauf dans les situations suivantes :
            </p>
            <LegalList items={[
              "Arrêté Préfectoral de Catastrophe Naturelle en vigueur sur la zone géographique du lieu",
              "Vigilance Météo Rouge émise par Météo France rendant le site inaccessible ou dangereux",
              "Fermeture administrative du site par les autorités compétentes"
            ]} />
            <p className="mt-3">
              Dans ces cas exceptionnels, les dispositions de l'article 6.1 (Force Majeure) s'appliquent.
            </p>
          </div>
          <div>
            <p className="mb-2 mt-4"><strong>6.3 - Défaillance du Lieu Partenaire</strong></p>
            <p className="mb-3">
              Si le lieu initialement réservé devient indisponible pour des raisons indépendantes
              de la volonté de Select Châteaux (incendie, dégât des eaux, faillite du propriétaire,
              travaux d'urgence), Select Châteaux s'engage à :
            </p>
            <LegalList items={[
              "Proposer un lieu de remplacement de catégorie équivalente ou supérieure dans un délai de 15 jours",
              "Maintenir les mêmes conditions tarifaires si le Commanditaire accepte le lieu de substitution",
              "Rembourser intégralement les sommes versées si aucune solution de remplacement acceptable n'est trouvée"
            ]} />
            <p className="mt-3">
              <strong>Limitation de responsabilité :</strong> En cas d'impossibilité de fournir un lieu
              de remplacement, la responsabilité de Select Châteaux est strictement limitée au remboursement
              des sommes effectivement versées, à l'exclusion de toute autre indemnité, dommages-intérêts
              ou préjudice indirect (perte d'exploitation, frais annexes, préjudice commercial).
            </p>
          </div>
        </LegalContent>
      </LegalSection>

      <LegalSection title="Article 7 - Obligations du Commanditaire">
        <LegalContent>
          <p className="mb-2">
            Le Commanditaire s'engage à :
          </p>
          <LegalList items={[
            "Respecter le règlement intérieur du domaine qui lui sera communiqué",
            "Veiller au bon comportement de ses participants et à leur sécurité",
            "Restituer les lieux dans l'état initial (toute dégradation sera facturée)",
            "Souscrire une assurance responsabilité civile événementielle couvrant l'ensemble des participants",
            "Respecter les normes de sécurité, les horaires convenus et les capacités d'accueil maximales",
            "Communiquer la liste nominative des participants à J-7 minimum"
          ]} />
          <p className="mt-3">
            <strong>Dégradations :</strong> Le Commanditaire est responsable de tout dommage causé
            aux équipements, mobiliers ou locaux du lieu partenaire. Une facturation complémentaire
            sera établie sur présentation de devis de remise en état.
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection title="Article 8 - Responsabilités et Assurance">
        <LegalContent spaced>
          <div>
            <p className="mb-2"><strong>8.1 - Responsabilité de Select Châteaux</strong></p>
            <p className="mb-3">
              Select Châteaux ne peut être tenu responsable :
            </p>
            <LegalList items={[
              "Des dommages causés par les participants entre eux ou envers des tiers",
              "Du vol, de la perte ou de la détérioration d'objets personnels",
              "Des annulations dues à des cas de force majeure (Article 6.1)",
              "Des préjudices liés à des prestataires extérieurs non mandatés par Select Châteaux",
              "De l'inadéquation des prestations aux attentes subjectives du Commanditaire si le devis a été respecté"
            ]} />
            <p className="mt-3">
              La responsabilité de Select Châteaux est limitée au montant total des prestations
              effectivement facturées pour l'événement concerné.
            </p>
          </div>
          <div>
            <p className="mb-2 mt-4"><strong>8.2 - Assurance</strong></p>
            <p>
              Select Châteaux dispose d'une assurance responsabilité civile professionnelle.
              Le Commanditaire doit justifier d'une assurance RC événementielle couvrant les participants
              et les dommages potentiels au lieu d'accueil. Une attestation pourra être exigée avant la tenue de l'événement.
            </p>
          </div>
        </LegalContent>
      </LegalSection>

      <LegalSection title="Article 9 - Données Personnelles">
        <LegalContent>
          <p className="mb-3">
            Les données personnelles collectées (listes de participants, rooming lists) sont traitées
            conformément au RGPD. Elles sont utilisées exclusivement pour :
          </p>
          <LegalList items={[
            "La gestion opérationnelle de l'événement",
            "La transmission aux lieux partenaires (nécessités logistiques)",
            "La facturation et la comptabilité"
          ]} />
          <p className="mt-3">
            Aucune donnée n'est commercialisée à des tiers. Les participants disposent d'un droit
            d'accès, de rectification et de suppression en écrivant à :
            {" "}<LegalLink href="mailto:seminaires@selectchateaux.com">seminaires@selectchateaux.com</LegalLink>
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection title="Article 10 - Litiges et Droit Applicable">
        <LegalContent>
          <p className="mb-3">
            Les présentes CGV sont régies par le droit français. En cas de litige, les parties
            s'engagent à rechercher une solution amiable préalablement à toute action judiciaire.
          </p>
          <p className="mb-3">
            À défaut d'accord amiable dans un délai de 30 jours, le litige sera porté devant
            les <strong>tribunaux compétents du siège social de Select Châteaux</strong> (Paris, France),
            auxquels les parties attribuent expressément compétence territoriale, nonobstant pluralité
            de défendeurs ou appel en garantie.
          </p>
          <p>
            <strong>Clause de médiation :</strong> Préalablement à toute action judiciaire, le
            Commanditaire peut saisir un médiateur de la consommation (bien que les présentes CGV
            régissent des relations B2B, Select Châteaux s'engage volontairement à accepter une médiation).
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection title="Article 11 - Dispositions Générales">
        <LegalContent>
          <p className="mb-3">
            Si une ou plusieurs stipulations des présentes CGV sont tenues pour non valides ou
            déclarées telles par une décision de justice, les autres stipulations conservent leur
            force et leur portée.
          </p>
          <p className="mb-3">
            Les présentes CGV sont rédigées en langue française. En cas de traduction, seule la
            version française fait foi.
          </p>
          <p>
            Select Châteaux se réserve le droit de modifier les présentes CGV à tout moment. Les
            CGV applicables sont celles en vigueur à la date de signature du devis par le Commanditaire.
          </p>
        </LegalContent>
      </LegalSection>

      <LegalSection title="Article 12 - Propriété Intellectuelle et Visuels">
        <LegalContent spaced>
          <div>
            <p className="mb-2"><strong>12.1 - Alias des Lieux</strong></p>
            <p className="mb-3">
              Pour des raisons de <strong>confidentialité et d'exclusivité commerciale</strong>, les
              noms des domaines et châteaux présentés sur le site internet de Select Châteaux peuvent
              être des <strong>alias</strong>. Le nom réel du lieu sera communiqué au Commanditaire
              lors de la signature du devis personnalisé, garantissant ainsi la transparence contractuelle
              tout en préservant la confidentialité des partenariats.
            </p>
          </div>
          <div>
            <p className="mb-2 mt-4"><strong>12.2 - Visuels et Illustrations d'Ambiance</strong></p>
            <p className="mb-3">
              Les photographies et visuels présents sur le site internet de Select Châteaux sont des{" "}
              <strong>illustrations d'ambiance à caractère non contractuel</strong>. Ces images ont pu
              faire l'objet de modifications par <strong>intelligence artificielle (IA)</strong> dans un
              but d'amélioration de l'immersion et de mise en scène (ajout de personnages, modification
              de l'éclairage, embellissement visuel, optimisation de la composition).
            </p>
            <p>
              Les visuels présentés ont pour unique vocation d'illustrer l'atmosphère générale et le
              standing des lieux partenaires, sans constituer une représentation contractuelle exacte
              de l'état des lieux à la date de l'événement.
            </p>
          </div>
          <div>
            <p className="mb-2 mt-4"><strong>12.3 - Responsabilité liée aux Visuels</strong></p>
            <p className="mb-3">
              Conformément à l'<strong>Article 8.1</strong> des présentes CGV, Select Châteaux ne peut
              être tenu responsable d'une différence de perception subjective entre les visuels d'ambiance
              présentés sur le site et la réalité du lieu, dès lors que les <strong>prestations techniques
              décrites dans le devis validé sont scrupuleusement respectées</strong>.
            </p>
            <p>
              Les éléments contractuels opposables sont exclusivement ceux mentionnés dans le{" "}
              <strong>devis personnalisé signé par le Commanditaire</strong> (capacité d'accueil,
              équipements techniques, prestations de restauration, hébergement, activités). Toute
              réclamation portant sur une différence esthétique ou subjective entre les illustrations
              d'ambiance et la réalité du lieu ne saurait engager la responsabilité de Select Châteaux,
              sauf manquement avéré aux prestations contractuellement prévues.
            </p>
          </div>
        </LegalContent>
      </LegalSection>

      <LegalSection title="Article 13 - Contact">
        <LegalContent>
          <p className="mb-2">
            Pour toute question concernant nos Conditions Générales de Vente :
          </p>
          <p>
            <strong>Email :</strong>{" "}
            <LegalLink href="mailto:seminaires@selectchateaux.com">
              seminaires@selectchateaux.com
            </LegalLink>
            <br />
            <strong>Téléphone :</strong> 07 57 99 11 46
            <br />
            <strong>Siège social :</strong> 60 Rue François 1er, 75008 Paris, France
          </p>
        </LegalContent>
      </LegalSection>
    </LegalPageLayout>
  );
}
