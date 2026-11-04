'use client';
import { useEffect, useState } from 'react';

export type CapabilityEnv = { width: number; cores: number; reducedMotion: boolean; hasGPU: boolean };

export function canRunLive3D({ width, cores, reducedMotion, hasGPU }: CapabilityEnv): boolean {
  return width >= 768 && cores > 4 && !reducedMotion && hasGPU;
}

export type Capabilities = { live3D: boolean; reducedMotion: boolean; hover: boolean; ready: boolean };

const SSR: Capabilities = { live3D: false, reducedMotion: false, hover: false, ready: false };

function read(): Capabilities {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hover = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const live3D = canRunLive3D({
    width: innerWidth,
    cores: navigator.hardwareConcurrency ?? 4,
    reducedMotion,
    hasGPU: 'gpu' in navigator && !!(navigator as Navigator & { gpu?: unknown }).gpu,
  });
  return { live3D, reducedMotion, hover, ready: true };
}

export function useCapabilities(): Capabilities {
  const [caps, setCaps] = useState<Capabilities>(SSR);
  useEffect(() => {
    const update = () => setCaps(read());
    update();
    const queries = ['(prefers-reduced-motion: reduce)', '(hover: hover) and (pointer: fine)'].map((q) => matchMedia(q));
    queries.forEach((q) => q.addEventListener('change', update));
    addEventListener('resize', update);
    return () => {
      queries.forEach((q) => q.removeEventListener('change', update));
      removeEventListener('resize', update);
    };
  }, []);
  return caps;
}
