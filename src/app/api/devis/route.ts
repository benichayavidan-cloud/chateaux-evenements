import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendAdminNotification, sendAlerteDemandeRefusee, sendClientConfirmation } from '@/lib/email';
import { chateaux } from '@/data/chateaux';
import { chateauxDeLaDemande, formSchema } from '@/lib/devis-schema';
import { canalOrigine, LIBELLE_CANAL, parsePremierContact } from '@/lib/origine';

export async function POST(request: NextRequest) {
  try {
    // Protection CSRF : vérifier l'origine de la requête
    const origin = request.headers.get('origin');
    const allowedOrigins = [
      'https://www.selectchateaux.com',
      'https://selectchateaux.com',
      ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000', 'http://localhost:3001'] : []),
    ];
    if (!origin || !allowedOrigins.includes(origin)) {
      return NextResponse.json(
        { error: 'Origine non autorisée' },
        { status: 403 }
      );
    }

    // Parser le body
    const body = await request.json();

    // Valider les données avec Zod
    const validationResult = formSchema.safeParse(body);

    if (!validationResult.success) {
      // Un refus ne doit plus jamais passer inaperçu : du 06/09 au 29/09/2026,
      // toutes les demandes des articles de blog ont été refusées ici sans que
      // personne le sache. L'email d'admin porte ce que la personne a saisi,
      // pour pouvoir la rappeler.
      await sendAlerteDemandeRefusee(body, validationResult.error.issues);
      return NextResponse.json(
        { error: 'Données invalides' },
        { status: 400 }
      );
    }

    const { premierContact: premierContactBrut, ...data } = validationResult.data;
    const premierContact = parsePremierContact(premierContactBrut);
    const canal = canalOrigine(premierContact);

    const chateauIds = chateauxDeLaDemande(data.chateauIds, chateaux.map((c) => c.id));

    // Construire dates_souhaitees selon le format reçu
    const datesSouhaitees = data.dateArrivee && data.dateDepart
      ? `${data.dateArrivee}|${data.dateDepart}`
      : data.datesSouhaitees || (data.datesFlexibles ? 'Dates flexibles' : '');

    // Créer un client Supabase avec le service role key pour plus de sécurité
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Configuration serveur invalide' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Préparer les données pour Supabase
    const devisData = {
      type_evenement: data.typeEvenement,
      dates_souhaitees: datesSouhaitees,
      duree: data.duree,
      chateau_id: chateauIds.join(', '),
      entreprise: data.entreprise,
      nom_prenom: data.nomPrenom,
      email: data.email,
      telephone_mobile: data.telephoneMobile,
      nombre_participants: data.nombreParticipants,
      nombre_chambres: data.nombreChambres,
      plus_de_500_participants: data.plusDe500Participants || false,
      plus_de_400_chambres: data.plusDe400Chambres || false,
      chambres_twin: data.chambresTwin || false,
      budget: data.budget,
      commentaire_deroulement: data.commentaireDeroulement || '',
      dates_flexibles: data.datesFlexibles ?? false,
      fichier_url: null,
      // Provenance — colonnes ajoutées le 06/09/2026. `sourceLabel` existait
      // déjà mais ne servait qu'à l'email d'admin ; il n'était jamais stocké,
      // si bien que la question « quelle page convertit ? » restait sans
      // réponse possible. Les deux sont facultatives : un devis sans
      // provenance reste un devis valide.
      source_page: data.sourcePage || null,
      source_label: data.sourceLabel || null,
      // Provenance au PREMIER contact — colonnes ajoutées le 24/09/2026
      // (scripts/sql/2026-09-24_origine-demandes.sql). `source_page` ne dit
      // que la page du formulaire ; ici, d'où venait la personne.
      origine_canal: canal,
      origine_page: premierContact?.page ?? null,
      origine_referent: premierContact?.referent ?? null,
      origine_utm: premierContact && Object.keys(premierContact.utm).length ? premierContact.utm : null,
      origine_premiere_visite: premierContact?.date ?? null,
    };

    // Insérer dans Supabase
    const { data: insertedData, error } = await supabase
      .from('demandes_devis_chateaux')
      .insert([devisData])
      .select();

    if (error) {
      console.error('Supabase insert error:', JSON.stringify(error));
      await sendAlerteDemandeRefusee(body, [{ path: ['base'], message: error.message }]);
      return NextResponse.json(
        { error: 'Erreur lors de l\'enregistrement de la demande' },
        { status: 500 }
      );
    }

    // Envoyer les emails de notification + créer le dossier dans le CRM
    if (insertedData && insertedData.length > 0) {
      const newDevis = insertedData[0];
      // Origine ajoutée au libellé de l'email d'admin. Le gabarit n'échappe pas
      // le HTML : le libellé vient d'une liste fixe et la page est filtrée.
      const pageArrivee = premierContact?.page.replace(/[^\w\-/.%]/g, '') ?? '';
      const sourceLabel = [
        data.sourceLabel,
        `Origine : ${LIBELLE_CANAL[canal]}${pageArrivee ? ` — arrivé sur ${pageArrivee}` : ''}`,
      ].filter(Boolean).join(' · ');

      // CRM : le lead devient directement un dossier « Nouvelle demande »
      // (société + contact + événement créés côté CRM). Secret partagé serveur→serveur.
      const crmLeadsUrl = process.env.CRM_LEADS_URL;
      const crmLeadsSecret = process.env.CRM_LEADS_SECRET;

      // Emails + dossier CRM envoyés en parallèle, erreurs silencieuses (non-bloquantes)
      await Promise.allSettled([
        sendAdminNotification(newDevis, sourceLabel),
        sendClientConfirmation(newDevis),
        crmLeadsUrl && crmLeadsSecret
          ? fetch(crmLeadsUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json", "x-lead-secret": crmLeadsSecret },
              body: JSON.stringify({
                ...data,
                chateauIds,
                origine: {
                  canal,
                  libelle: LIBELLE_CANAL[canal],
                  page: premierContact?.page ?? null,
                  referent: premierContact?.referent ?? null,
                  premiereVisite: premierContact?.date ?? null,
                },
              }),
            }).catch(() => {})
          : Promise.resolve(),
      ]);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Demande de devis enregistrée avec succès',
      },
      { status: 201 }
    );

  } catch {
    return NextResponse.json(
      { error: 'Erreur serveur inattendue' },
      { status: 500 }
    );
  }
}
