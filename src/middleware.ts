import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple rate limiting (en mémoire - pour production utiliser Redis)
const rateLimit = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT = 100; // Requêtes max par fenêtre
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

  // Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // Next.js nécessite unsafe-inline pour HMR
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https: blob:",
      "font-src 'self' data:",
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; ')
  );

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
