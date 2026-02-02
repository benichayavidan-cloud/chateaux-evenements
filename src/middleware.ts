import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple rate limiting (en mémoire - pour production utiliser Redis ou Vercel KV)
// LIMITATION: Cette solution ne fonctionne qu'avec une seule instance. Pour un déploiement
// multi-instance sur Vercel, migrer vers @vercel/kv ou Redis.
// TODO: Migrer vers une solution distribuée pour production (Vercel KV recommandé)
const rateLimit = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT = 200; // Requêtes max par fenêtre (augmenté pour éviter les faux positifs)
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function getRateLimitKey(req: NextRequest): string {
  // Utiliser l'IP du client depuis les headers
  const forwarded = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const ip = forwarded ? forwarded.split(',')[0] : realIp || 'unknown';
  return ip;
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(key);

  if (!record || now > record.resetTime) {
    rateLimit.set(key, {
      count: 1,
      resetTime: now + WINDOW_MS,
    });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

export function middleware(request: NextRequest) {
  // Rate limiting
  const key = getRateLimitKey(request);

  if (!checkRateLimit(key)) {
    return new NextResponse('Trop de requêtes. Veuillez réessayer plus tard.', {
      status: 429,
      headers: {
        'Retry-After': '900', // 15 minutes
      },
    });
  }

  // Ajouter des headers de sécurité supplémentaires
  const response = NextResponse.next();

  // Content Security Policy compatible Next.js
  // Note: Next.js nécessite unsafe-eval en dev (HMR) et unsafe-inline pour certains scripts
  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) {
    // Mode développement : CSP permissif pour Next.js HMR
    response.headers.set(
      'Content-Security-Policy',
      [
        "default-src 'self'",
        "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // Next.js HMR nécessite unsafe-eval
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: https: blob:",
        "font-src 'self' data:",
        "connect-src 'self' https://*.supabase.co wss://*.supabase.co ws://localhost:* http://localhost:*", // WebSocket dev
        "frame-ancestors 'self'",
        "base-uri 'self'",
        "form-action 'self'",
      ].join('; ')
    );
  } else {
    // Mode production : CSP plus strict mais compatible Next.js
    response.headers.set(
      'Content-Security-Policy',
      [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com", // Next.js + Google Analytics
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: https: blob:",
        "font-src 'self' data:",
        "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://www.google-analytics.com https://www.googletagmanager.com",
        "frame-ancestors 'self'",
        "base-uri 'self'",
        "form-action 'self'",
        "worker-src 'self' blob:",
        "upgrade-insecure-requests"
      ].join('; ')
    );
  }

  return response;
}

// Configuration: appliquer le middleware sur toutes les routes sauf les statiques
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
