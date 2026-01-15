import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';
import { sendAdminNotification, sendClientConfirmation } from '@/lib/email';

// Schema Zod pour validation serveur (identique à DevisForm)
const formSchema = z.object({
  typeEvenement: z.enum([
    "seminaire",
    "journee-etude",
    "soiree-entreprise",
    "team-building",
    "autre",
  ]),
  datesSouhaitees: z.string().min(1, "Veuillez sélectionner une date"),
  duree: z.enum(["1-jour", "2-jours", "3-jours-plus"]),
  chateauIds: z.array(z.string()).min(1, "Veuillez sélectionner au moins un château"),
  entreprise: z.string().min(2, "Nom de l'entreprise requis"),
  nomPrenom: z.string().min(2, "Nom et prénom requis"),
  email: z.string().email("Email invalide"),
  telephoneMobile: z.string().min(10, "Numéro de téléphone invalide"),
  nombreParticipants: z.number().min(10).max(500),
  nombreChambres: z.number().min(1).max(400),
  plusDe500Participants: z.boolean().optional(),
  plusDe400Chambres: z.boolean().optional(),
  chambresTwin: z.boolean().optional(),
  budget: z.string().min(1, "Budget requis"),
  commentaireDeroulement: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Parser le body
    const body = await request.json();

    // Valider les données avec Zod
    const validationResult = formSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Données invalides',
          details: validationResult.error.issues
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

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
      dates_souhaitees: data.datesSouhaitees,
      duree: data.duree,
      chateau_id: data.chateauIds.join(', '),
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
      fichier_url: null,
    };

    // Insérer dans Supabase
    const { data: insertedData, error } = await supabase
      .from('demandes_devis_chateaux')
      .insert([devisData])
      .select();

    if (error) {
      return NextResponse.json(
        { error: 'Erreur lors de l\'enregistrement de la demande', details: error.message },
        { status: 500 }
      );
    }

    // Envoyer les emails de notification (en parallèle, sans bloquer la réponse)
    if (insertedData && insertedData.length > 0) {
      const newDevis = insertedData[0];

      // Envoyer les emails en arrière-plan sans bloquer la réponse
      Promise.all([
        sendAdminNotification(newDevis),
        sendClientConfirmation(newDevis),
      ])
        .then(([adminSent, clientSent]) => {
          console.log('📧 Résultats envoi emails:', {
            admin: adminSent ? '✅ Envoyé' : '❌ Échec',
            client: clientSent ? '✅ Envoyé' : '❌ Échec',
            devisId: newDevis.id,
          });
        })
        .catch((emailError) => {
          console.error('❌ Erreur lors de l\'envoi des emails:', emailError);
          // Ne pas fail la requête, continuer normalement
        });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Demande de devis enregistrée avec succès',
        data: insertedData
      },
      { status: 201 }
    );

  } catch (error) {
    return NextResponse.json(
      {
        error: 'Erreur serveur inattendue',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
