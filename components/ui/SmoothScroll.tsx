/**
 * @file SmoothScroll.tsx — Lenis-based smooth scrolling wrapper stub.
 *
 * Currently a passthrough wrapper that renders children directly.
 *
 * @todo Implement smooth scrolling with:
 *   - Lenis library for butter-smooth scroll physics
 *   - Custom scroll speed and easing curves
 *   - Integration with scroll-driven animations (GSAP ScrollTrigger)
 *   - Disable on mobile for native scroll performance
 *   - RAF (requestAnimationFrame) loop for 60fps rendering
 */

"use client";
export default function SmoothScroll({ children }: { children?: React.ReactNode }) { return <>{children}</>; }
