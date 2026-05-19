-- ============================================
-- Schema Supabase — Agent Camille (Blog CM)
-- Exécuter dans Supabase SQL Editor
-- ============================================

-- Table de logs des sessions Camille
CREATE TABLE IF NOT EXISTS camille_session_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  status TEXT NOT NULL DEFAULT 'unknown'
    CHECK (status IN ('success', 'failed', 'unknown')),
  articles_published JSONB DEFAULT '[]',
  articles_count INTEGER DEFAULT 0,
  error_message TEXT,
  failed_step TEXT,
  rewritten_slug TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_camille_session_logs_date
  ON camille_session_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_camille_session_logs_status
  ON camille_session_logs(status);

-- Table de contrôle des agents (partagée entre tous les agents)
CREATE TABLE IF NOT EXISTS agent_controls (
  id TEXT PRIMARY KEY,
  enabled BOOLEAN DEFAULT true,
  schedule TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insérer l'agent Camille (blog) + l'agent email existant
INSERT INTO agent_controls (id, enabled, schedule, updated_by)
VALUES
  ('camille', true, '1,4', 'system'),
  ('email', true, '1,2,3,4,5', 'system')
ON CONFLICT (id) DO NOTHING;

-- RLS : accès service_role uniquement pour les scripts
ALTER TABLE camille_session_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_controls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access on camille_session_logs"
  ON camille_session_logs
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role full access on agent_controls"
  ON agent_controls
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
