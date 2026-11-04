'use client';
import { useEffect, useRef, useState } from 'react';

export type Drift = { x: number; y: number };

/**
 * Smoothed, normalised pointer position (0..1), starting at the viewport centre
 * so nothing jumps before the first pointer move. Updates React state ~30fps.
 */
export function usePointerDrift(lerp = 0.06): Drift {
  const [d, setD] = useState<Drift>({ x: 0.5, y: 0.5 });
  const target = useRef<Drift>({ x: 0.5, y: 0.5 });
  useEffect(() => {
    const move = (e: PointerEvent) => (target.current = { x: e.clientX / innerWidth, y: e.clientY / innerHeight });
    addEventListener('pointermove', move, { passive: true });
    const cur = { x: 0.5, y: 0.5 };
    let last = 0;
    let raf = 0;
    const loop = (t: number) => {
      cur.x += (target.current.x - cur.x) * lerp;
      cur.y += (target.current.y - cur.y) * lerp;
      if (t - last > 33) {
        last = t;
        setD({ x: Math.round(cur.x * 1000) / 1000, y: Math.round(cur.y * 1000) / 1000 });
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => (removeEventListener('pointermove', move), cancelAnimationFrame(raf));
  }, [lerp]);
  return d;
}
