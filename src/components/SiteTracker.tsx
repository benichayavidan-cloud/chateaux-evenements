"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";

const CRM_API = process.env.NEXT_PUBLIC_CRM_TRACKING_URL || "https://crm.selectchateaux.com";
const HEARTBEAT_INTERVAL = 30_000;
const COOKIE_NAME = "sc_vid";
const COOKIE_DAYS = 365;

function getFingerprint(): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
  if (match) return match[1];
  const id = crypto.randomUUID();
  document.cookie = `${COOKIE_NAME}=${id};path=/;max-age=${COOKIE_DAYS * 86400};SameSite=Lax`;
  return id;
}

function getDevice(): string {
  if (typeof window === "undefined") return "desktop";
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

function getBrowser(): string {
  if (typeof navigator === "undefined") return "";
  const ua = navigator.userAgent;
  if (ua.includes("Chrome") && !ua.includes("Edg")) return "Chrome";
  if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Edg")) return "Edge";
  return "Other";
}

function getOS(): string {
  if (typeof navigator === "undefined") return "";
  const ua = navigator.userAgent;
  if (ua.includes("Windows")) return "Windows";
  if (ua.includes("Mac")) return "macOS";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("Linux")) return "Linux";
  return "Other";
}

function getUTM(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
    const val = params.get(key);
    if (val) utm[key.replace("utm_", "")] = val;
  }
  return utm;
}

function getGclid(): string | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const gclid = params.get("gclid");
  if (gclid) return gclid;
  const match = document.cookie.match(/(?:^|; )_gcl_aw=([^;]*)/);
  return match ? match[1] : null;
}

function send(endpoint: string, data: Record<string, unknown>) {
  const url = `${CRM_API}/api/site-tracking/${endpoint}`;
  const body = JSON.stringify(data);
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, new Blob([body], { type: "application/json" }));
  } else {
    fetch(url, { method: "POST", body, headers: { "Content-Type": "application/json" }, keepalive: true }).catch(() => {});
  }
}

export function SiteTracker() {
  const pathname = usePathname();
  const sessionIdRef = useRef<string | null>(null);
  const pageViewIdRef = useRef<string | null>(null);
  const pageEnteredRef = useRef<number>(Date.now());
  const maxScrollRef = useRef<number>(0);
  const scrollMilestonesRef = useRef<Set<number>>(new Set());
  const sequenceRef = useRef<number>(0);
  const sessionStartRef = useRef<number>(Date.now());
  const heartbeatRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fingerprintRef = useRef<string>("");

  const trackScrollDepth = useCallback(() => {
    if (typeof window === "undefined") return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const pct = Math.round((scrollTop / docHeight) * 100);
    if (pct > maxScrollRef.current) maxScrollRef.current = pct;

    const milestones = [25, 50, 75, 100];
    for (const m of milestones) {
      if (pct >= m && !scrollMilestonesRef.current.has(m) && sessionIdRef.current) {
        scrollMilestonesRef.current.add(m);
        send("collect", {
          action: "event",
          fingerprint: fingerprintRef.current,
          sessionId: sessionIdRef.current,
          type: `SCROLL_${m}`,
          pathname,
        });
      }
    }
  }, [pathname]);

  useEffect(() => {
    const fp = getFingerprint();
    fingerprintRef.current = fp;

    const initSession = async () => {
      try {
        const res = await fetch(`${CRM_API}/api/site-tracking/collect`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "session_start",
            fingerprint: fp,
            pathname,
            referrer: document.referrer || undefined,
            utm: getUTM(),
            gclid: getGclid(),
            device: getDevice(),
            screenWidth: window.innerWidth,
            browser: getBrowser(),
            os: getOS(),
          }),
        });
        const data = await res.json();
        sessionIdRef.current = data.sessionId;
        (window as unknown as Record<string, unknown>).__sc_session_id = data.sessionId;
        sessionStartRef.current = Date.now();
        trackPageView(pathname);
      } catch {
        // Silent fail
      }
    };

    const trackPageView = async (path: string) => {
      if (!sessionIdRef.current) return;
      try {
        const res = await fetch(`${CRM_API}/api/site-tracking/collect`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "pageview",
            fingerprint: fp,
            sessionId: sessionIdRef.current,
            pathname: path,
            pageTitle: document.title,
            sequenceOrder: sequenceRef.current,
          }),
        });
        const data = await res.json();
        pageViewIdRef.current = data.pageViewId;
        pageEnteredRef.current = Date.now();
        maxScrollRef.current = 0;
        scrollMilestonesRef.current.clear();
        sequenceRef.current++;
      } catch {
        // Silent fail
      }
    };

    initSession();

    heartbeatRef.current = setInterval(() => {
      if (sessionIdRef.current) {
        send("heartbeat", { sessionId: sessionIdRef.current, fingerprint: fp });
      }
    }, HEARTBEAT_INTERVAL);

    window.addEventListener("scroll", trackScrollDepth, { passive: true });

    const handleBeforeUnload = () => {
      if (pageViewIdRef.current) {
        send("collect", {
          action: "page_exit",
          fingerprint: fp,
          pageViewId: pageViewIdRef.current,
          durationMs: Date.now() - pageEnteredRef.current,
          scrollDepth: maxScrollRef.current,
        });
      }
      if (sessionIdRef.current) {
        send("collect", {
          action: "session_end",
          fingerprint: fp,
          sessionId: sessionIdRef.current,
          duration: Math.round((Date.now() - sessionStartRef.current) / 1000),
        });
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("scroll", trackScrollDepth);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (heartbeatRef.current) clearInterval(heartbeatRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!sessionIdRef.current || sequenceRef.current === 0) return;

    if (pageViewIdRef.current) {
      send("collect", {
        action: "page_exit",
        fingerprint: fingerprintRef.current,
        pageViewId: pageViewIdRef.current,
        durationMs: Date.now() - pageEnteredRef.current,
        scrollDepth: maxScrollRef.current,
      });
    }

    const trackPage = async () => {
      if (!sessionIdRef.current) return;
      try {
        const res = await fetch(`${CRM_API}/api/site-tracking/collect`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "pageview",
            fingerprint: fingerprintRef.current,
            sessionId: sessionIdRef.current,
            pathname,
            pageTitle: document.title,
            sequenceOrder: sequenceRef.current,
          }),
        });
        const data = await res.json();
        pageViewIdRef.current = data.pageViewId;
        pageEnteredRef.current = Date.now();
        maxScrollRef.current = 0;
        scrollMilestonesRef.current.clear();
        sequenceRef.current++;
      } catch {
        // Silent fail
      }
    };

    trackPage();
  }, [pathname]);

  return null;
}

export function trackSiteEvent(type: string, label?: string, value?: string) {
  const fp = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`))?.[1];
  if (!fp) return;

  const sessionId = (window as unknown as { __sc_session_id?: string }).__sc_session_id;
  if (!sessionId) return;

  send("collect", {
    action: "event",
    fingerprint: fp,
    sessionId,
    type,
    pathname: window.location.pathname,
    label,
    value,
  });
}
