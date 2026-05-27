/**
 * @file useInView.ts — Intersection Observer hook for scroll-triggered animations.
 *
 * Returns a ref and a boolean that becomes true when the referenced element
 * enters the viewport. Once triggered, it disconnects the observer (one-shot).
 * Used by report components to trigger entrance animations and counter effects.
 *
 * @param threshold - Fraction of the element visible to trigger (0.0-1.0, default: 0.2)
 * @returns Tuple of [ref to attach to element, isInView boolean]
 *
 * @module report/useInView
 */

"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom hook that fires when element enters viewport.
 * Returns [ref, isInView].
 */
export function useInView(threshold: number = 0.2): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isInView];
}
