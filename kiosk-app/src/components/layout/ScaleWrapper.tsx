'use client';

import { useEffect } from 'react';

/**
 * ViewportScaler — applies a CSS zoom to <html> element so the entire
 * kiosk UI proportionally scales to any landscape viewport.
 *
 * Design baseline: 1366 × 768 (validated as pixel-perfect).
 * Scale = min(vw / 1366, vh / 768).
 *
 * CSS zoom on <html> scales the entire page including h-dvh calculations,
 * ensuring no scrollbars appear at any landscape resolution.
 *
 * This component renders nothing — it only applies a side effect.
 */

const DESIGN_W = 1366;
const DESIGN_H = 768;

export function ViewportScaler() {
  useEffect(() => {
    function applyZoom() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const scale = Math.min(vw / DESIGN_W, vh / DESIGN_H);
      // Clamp to reasonable range: 0.4x minimum, 3x maximum
      const clamped = Math.max(0.4, Math.min(3, scale));
      document.documentElement.style.zoom = String(clamped);
    }

    applyZoom();
    window.addEventListener('resize', applyZoom);
    return () => {
      window.removeEventListener('resize', applyZoom);
      document.documentElement.style.zoom = '';
    };
  }, []);

  return null;
}
