-- Supprimer les anciennes policies
DROP POLICY IF EXISTS "Insertion publique demandes_devis_chateaux" ON public.demandes_devis_chateaux;
DROP POLICY IF EXISTS "Lecture admin demandes_devis_chateaux" ON public.demandes_devis_chateaux;
DROP POLICY IF EXISTS "Mise à jour admin demandes_devis_chateaux" ON public.demandes_devis_chateaux;

-- Policy 1: Insertion publique pour anon et authenticated
CREATE POLICY "Allow anonymous inserts"
ON public.demandes_devis_chateaux
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy 2: Lecture pour service_role uniquement
CREATE POLICY "Allow service_role select"
ON public.demandes_devis_chateaux
FOR SELECT
TO service_role
USING (true);

-- Policy 3: Update pour service_role uniquement
CREATE POLICY "Allow service_role update"
ON public.demandes_devis_chateaux
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);
