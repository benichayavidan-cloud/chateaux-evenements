"use client";
import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Lightweight IntersectionObserver hook — replaces framer-motion's whileInView (~45KB saved)
 * Returns a ref to attach + boolean isInView. Once visible, stays visible (once: true).
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options?: { threshold?: number; rootMargin?: string }
): { ref: RefObject<T | null>; isInView: boolean } {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: options?.threshold ?? 0.1, rootMargin: options?.rootMargin ?? "-50px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [options?.threshold, options?.rootMargin]);

  return { ref, isInView };
}

/**
 * Scroll progress hook — replaces framer-motion's useScroll (~2KB vs 45KB)
 * Returns scroll progress 0-1 for a given element or the whole page.
 */
export function useScrollProgress(elementRef?: RefObject<HTMLElement | null>): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef?.current) {
        const el = elementRef.current;
        const rect = el.getBoundingClientRect();
        const scrollHeight = el.scrollHeight - el.clientHeight;
        if (scrollHeight > 0) {
          setProgress(Math.min(1, Math.max(0, -rect.top / scrollHeight)));
        }
      } else {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
          setProgress(Math.min(1, Math.max(0, scrollTop / docHeight)));
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [elementRef]);

  return progress;
}
