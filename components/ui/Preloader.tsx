/**
 * @file Preloader.tsx — Full-screen loading animation stub.
 *
 * Currently a passthrough wrapper that renders children directly.
 *
 * @todo Implement a premium preloader with:
 *   - Full-screen overlay with Skitla13 logo animation
 *   - Progress bar or percentage counter
 *   - Smooth fade-out transition when page is ready
 *   - Prevents content flash before fonts/images load
 *   - Uses CSS animations (not JS) for performance
 */

"use client";
export default function Preloader({ children }: { children?: React.ReactNode }) { return <>{children}</>; }
