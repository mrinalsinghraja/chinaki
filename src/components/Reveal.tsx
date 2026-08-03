"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Mounts once in the layout and drives every `.reveal` on the page.
 *
 * One observer for the whole document beats a component wrapper per
 * element: no extra DOM, no per-element React state, and the markup
 * stays server-rendered. Re-queries on route change because the
 * layout itself does not remount.
 */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal:not([data-shown])"),
    );

    if (!nodes.length) return;

    // Respect the OS setting without waiting for an intersection.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((n) => n.setAttribute("data-shown", "true"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-shown", "true");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
