"use client";

import { useEffect, useState, RefObject } from "react";

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

export function useTableOfContents(
  articleRef: RefObject<HTMLElement>,
  content: string
) {
  const [tableOfContents, setTableOfContents] = useState<TocItem[]>([]);

  useEffect(() => {
    if (articleRef.current) {
      const headings = articleRef.current.querySelectorAll("h2, h3");
      const toc = Array.from(headings).map((heading, index) => {
        const id = `section-${index}`;
        heading.id = id;
        return {
          id,
          title: heading.textContent || "",
          level: parseInt(heading.tagName.substring(1)),
        };
      });
      setTableOfContents(toc);
    }
  }, [content, articleRef]);

  return tableOfContents;
}
