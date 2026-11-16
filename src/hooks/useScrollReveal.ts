'use client';

import { useCallback } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollReveal({
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true,
}: UseScrollRevealOptions = {}) {
  const ref = useCallback(
    (node: HTMLElement | null) => {
      if (!node) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              if (triggerOnce) {
                observer.unobserve(entry.target);
              }
            } else if (!triggerOnce) {
              entry.target.classList.remove('revealed');
            }
          });
        },
        { threshold, rootMargin }
      );

      observer.observe(node);

      return () => observer.disconnect();
    },
    [threshold, rootMargin, triggerOnce]
  );

  return ref;
}
