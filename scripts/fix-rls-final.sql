-- ============================================
-- FIX DÉFINITIF RLS POLICIES
-- Le problème: les policies utilisent le rôle "anon" mais il faut "public"
-- ============================================

-- Supprimer toutes les policies existantes
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.demandes_devis_chateaux;
DROP POLICY IF EXISTS "Allow service_role select" ON public.demandes_devis_chateaux;
DROP POLICY IF EXISTS "Allow service_role update" ON public.demandes_devis_chateaux;
DROP POLICY IF EXISTS "Insertion publique demandes_devis_chateaux" ON public.demandes_devis_chateaux;
DROP POLICY IF EXISTS "Lecture admin demandes_devis_chateaux" ON public.demandes_devis_chateaux;
DROP POLICY IF EXISTS "Mise à jour admin demandes_devis_chateaux" ON public.demandes_devis_chateaux;

-- Policy 1: Insertion publique pour TOUT LE MONDE (anon + authenticated)
CREATE POLICY "Enable insert for all users"
ON public.demandes_devis_chateaux
FOR INSERT
TO PUBLIC
WITH CHECK (true);

-- Policy 2: Lecture pour authenticated et service_role
CREATE POLICY "Enable read for authenticated users"
ON public.demandes_devis_chateaux
FOR SELECT
TO authenticated, service_role
USING (true);

-- Policy 3: Update pour service_role uniquement
CREATE POLICY "Enable update for service_role"
ON public.demandes_devis_chateaux
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);

-- Policy 4: Delete pour service_role uniquement
CREATE POLICY "Enable delete for service_role"
ON public.demandes_devis_chateaux
FOR DELETE
TO service_role
USING (true);

-- Vérifier que RLS est bien activé
ALTER TABLE public.demandes_devis_chateaux ENABLE ROW LEVEL SECURITY;

-- Afficher les policies créées
SELECT schemaname, tablename, policyname, roles, cmd
FROM pg_policies
WHERE tablename = 'demandes_devis_chateaux'
ORDER BY policyname;
