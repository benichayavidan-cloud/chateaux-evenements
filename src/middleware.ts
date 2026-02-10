import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple rate limiting (en mémoire - pour production utiliser Redis ou Vercel KV)
const rateLimit = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT = 30;
const WINDOW_MS = 60 * 1000; // 1 minute

function getRateLimitKey(req: NextRequest): string {
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
  const { pathname } = request.nextUrl;

  // Rate limiting uniquement sur les routes API (pas les pages statiques)
  if (pathname.startsWith('/api')) {
    const key = getRateLimitKey(request);
    if (!checkRateLimit(key)) {
      return new NextResponse('Trop de requêtes. Veuillez réessayer plus tard.', {
        status: 429,
        headers: { 'Retry-After': '900' },
      });
    }
  }

  // Headers de sécurité sur toutes les routes
  const response = NextResponse.next();

  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) {
    response.headers.set(
      'Content-Security-Policy',
      [
        "default-src 'self'",
        "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: https: blob:",
        "font-src 'self' data:",
        "connect-src 'self' https://*.supabase.co wss://*.supabase.co ws://localhost:* http://localhost:*",
        "frame-ancestors 'self'",
        "base-uri 'self'",
        "form-action 'self'",
      ].join('; ')
    );
  } else {
    response.headers.set(
      'Content-Security-Policy',
      [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: https: blob:",
        "font-src 'self' data:",
        "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://*.googletagmanager.com https://www.google.com https://googleads.g.doubleclick.net",
        "frame-src 'self' https://www.googletagmanager.com https://td.doubleclick.net https://www.google.com",
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

// Exclure les fichiers statiques, images, et assets du middleware
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot)$).*)',
  ],
};
