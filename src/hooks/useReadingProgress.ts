"use client";

import { useEffect, useState, RefObject } from "react";

export function useReadingProgress(articleRef: RefObject<HTMLElement>) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!articleRef.current) {
            ticking = false;
            return;
          }

          const articleTop = articleRef.current.offsetTop;
          const articleHeight = articleRef.current.offsetHeight;
          const windowHeight = window.innerHeight;
          const scrollTop = window.scrollY;

          // Calculate reading progress
          const progress = Math.min(
            Math.max(
              ((scrollTop - articleTop + windowHeight) / articleHeight) * 100,
              0
            ),
            100
          );
          setReadingProgress(progress);

          // Detect active section
          const sections = articleRef.current.querySelectorAll("h2, h3");
          for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i] as HTMLElement;
            if (section.offsetTop <= scrollTop + 200) {
              setActiveSection(section.id);
              break;
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [articleRef]);

  return { readingProgress, activeSection };
}
