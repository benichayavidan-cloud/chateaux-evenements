-- ============================================
-- Migration Supabase pour Châteaux Événements
-- ============================================

-- Extension UUID (si pas déjà activée)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- Table: chateaux
-- ============================================

CREATE TABLE IF NOT EXISTS public.chateaux (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nom TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    region TEXT NOT NULL,
    capacite_min INTEGER NOT NULL,
    capacite_max INTEGER NOT NULL,
    style_architectural TEXT NOT NULL,
    description TEXT NOT NULL,
    atouts TEXT[] NOT NULL DEFAULT '{}',
    images TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour recherche rapide par slug
CREATE INDEX IF NOT EXISTS idx_chateaux_slug ON public.chateaux(slug);

-- ============================================
-- Table: evenements
-- ============================================

CREATE TABLE IF NOT EXISTS public.evenements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titre TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    services_inclus TEXT[] NOT NULL DEFAULT '{}',
    image TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour recherche rapide par slug
CREATE INDEX IF NOT EXISTS idx_evenements_slug ON public.evenements(slug);

-- ============================================
-- Table: testimonials
-- ============================================

CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nom TEXT NOT NULL,
    entreprise TEXT NOT NULL,
    poste TEXT NOT NULL,
    contenu TEXT NOT NULL,
    avatar TEXT NOT NULL,
    note INTEGER NOT NULL CHECK (note >= 1 AND note <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- Fonction pour update automatique de updated_at
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour chateaux
CREATE TRIGGER update_chateaux_updated_at
    BEFORE UPDATE ON public.chateaux
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Policies RLS (Row Level Security)
-- ============================================

-- Activer RLS
ALTER TABLE public.chateaux ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evenements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Policies: Lecture publique
CREATE POLICY "Lecture publique chateaux"
    ON public.chateaux FOR SELECT
    USING (true);

CREATE POLICY "Lecture publique evenements"
    ON public.evenements FOR SELECT
    USING (true);

CREATE POLICY "Lecture publique testimonials"
    ON public.testimonials FOR SELECT
    USING (true);

-- Policies: Écriture (service_role uniquement pour l'instant)
-- Vous pourrez ajouter un système d'authentification admin plus tard

-- ============================================
-- Migration terminée !
-- ============================================
