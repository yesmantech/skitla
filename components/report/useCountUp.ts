/**
 * @file useCountUp.ts — Animated number counter hook using requestAnimationFrame.
 *
 * Smoothly animates a number from 0 to the target value with an
 * exponential ease-out curve. Used for KPI stat cards on the report page.
 *
 * @param target - The final number to count up to
 * @param duration - Animation duration in milliseconds (default: 2000ms)
 * @param trigger - Boolean to start the animation (typically from useInView)
 * @param decimals - Number of decimal places to show (default: 0)
 * @returns Current animated value as a formatted string
 *
 * @module report/useCountUp
 */

"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom hook for animated count-up numbers.
 * Uses requestAnimationFrame for silky smooth 60fps animation.
 */
export function useCountUp(
  target: number,
  duration: number = 2000,
  trigger: boolean = true,
  decimals: number = 0
): string {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!trigger) return;

    const startTime = performance.now();
    const startValue = 0;

    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const currentValue = startValue + (target - startValue) * easedProgress;

      setValue(currentValue);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, trigger, decimals]);

  return value.toFixed(decimals);
}
