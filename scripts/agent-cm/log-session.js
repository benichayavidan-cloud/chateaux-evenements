#!/usr/bin/env node
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

async function logSession() {
  const args = process.argv.slice(2);
  const status = args.find(a => a.startsWith('--status='))?.split('=')[1] || 'unknown';
  const articlesRaw = args.find(a => a.startsWith('--articles='))?.split('=')[1] || '';
  const error = args.find(a => a.startsWith('--error='))?.split('=')[1] || null;
  const step = args.find(a => a.startsWith('--step='))?.split('=')[1] || null;
  const rewritten = args.find(a => a.startsWith('--rewritten='))?.split('=')[1] || null;

  const articles = articlesRaw ? articlesRaw.split(',').map(s => s.trim()) : [];

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.log('No Supabase credentials — logging to stdout only');
    console.log(JSON.stringify({ status, articles, error, step, rewritten, timestamp: new Date().toISOString() }));
    return;
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  const { data, error: dbError } = await supabase
    .from('camille_session_logs')
    .insert({
      status,
      articles_published: articles,
      articles_count: articles.length,
      error_message: error,
      failed_step: step,
      rewritten_slug: rewritten,
    })
    .select()
    .single();

  if (dbError) {
    console.error('Failed to log session:', dbError.message);
  } else {
    console.log('Session logged:', JSON.stringify(data, null, 2));
  }
}

logSession().catch(console.error);
