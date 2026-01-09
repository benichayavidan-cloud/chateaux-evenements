-- ============================================
-- Migration table demandes_devis
-- ============================================

-- Table: demandes_devis
CREATE TABLE IF NOT EXISTS public.demandes_devis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Informations événement
    type_evenement TEXT NOT NULL CHECK (type_evenement IN ('seminaire', 'journee-etude', 'soiree-entreprise', 'team-building', 'autre')),
    dates_souhaitees DATE NOT NULL,
    duree TEXT NOT NULL CHECK (duree IN ('1-jour', '2-jours', '3-jours-plus')),

    -- Château sélectionné
    chateau_id TEXT NOT NULL,

    -- Informations contact
    entreprise TEXT NOT NULL,
    nom_prenom TEXT NOT NULL,
    email TEXT NOT NULL,
    telephone_mobile TEXT NOT NULL,

    -- Détails participants
    nombre_participants INTEGER NOT NULL CHECK (nombre_participants >= 10 AND nombre_participants <= 500),
    nombre_chambres INTEGER NOT NULL CHECK (nombre_chambres >= 1 AND nombre_chambres <= 400),
    plus_de_500_participants BOOLEAN DEFAULT FALSE,
    plus_de_400_chambres BOOLEAN DEFAULT FALSE,
    chambres_twin BOOLEAN DEFAULT FALSE,

    -- Budget et commentaire
    budget TEXT NOT NULL,
    commentaire_deroulement TEXT NOT NULL,

    -- Fichier attaché (URL si uploadé)
    fichier_url TEXT,

    -- Statut de la demande
    statut TEXT DEFAULT 'nouveau' CHECK (statut IN ('nouveau', 'en-cours', 'traite', 'annule')),

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour recherche rapide
CREATE INDEX IF NOT EXISTS idx_demandes_devis_email ON public.demandes_devis(email);
CREATE INDEX IF NOT EXISTS idx_demandes_devis_statut ON public.demandes_devis(statut);
CREATE INDEX IF NOT EXISTS idx_demandes_devis_created_at ON public.demandes_devis(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_demandes_devis_chateau_id ON public.demandes_devis(chateau_id);

-- Trigger pour update automatique de updated_at
CREATE TRIGGER update_demandes_devis_updated_at
    BEFORE UPDATE ON public.demandes_devis
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Policies RLS (Row Level Security)
-- ============================================

-- Activer RLS
ALTER TABLE public.demandes_devis ENABLE ROW LEVEL SECURITY;

-- Policy: Insertion publique (tout le monde peut soumettre un devis)
CREATE POLICY "Insertion publique demandes_devis"
    ON public.demandes_devis FOR INSERT
    WITH CHECK (true);

-- Policy: Lecture (service_role ou admin uniquement)
-- Pour l'instant, on bloque la lecture publique pour protéger les données clients
CREATE POLICY "Lecture admin demandes_devis"
    ON public.demandes_devis FOR SELECT
    USING (false); -- Sera activé seulement pour les admins authentifiés

-- Policy: Mise à jour (service_role ou admin uniquement)
CREATE POLICY "Mise à jour admin demandes_devis"
    ON public.demandes_devis FOR UPDATE
    USING (false); -- Sera activé seulement pour les admins authentifiés

-- ============================================
-- Migration terminée !
-- ============================================
