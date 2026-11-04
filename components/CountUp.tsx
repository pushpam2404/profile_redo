'use client';
import { useEffect, useRef, useState } from 'react';
import type { Metric } from '@/content/types';
import { formatMetric } from '@/lib/format';

export function CountUp({ m, className }: { m: Metric; className?: string }) {
  const el = useRef<HTMLElement>(null);
  const [v, setV] = useState(m.value);
  useEffect(() => {
    const node = el.current;
    if (!node || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (node.getBoundingClientRect().top < innerHeight) return; // already on screen: show final
    setV(0);
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        let start: number | null = null;
        const step = (t: number) => {
          start ??= t;
          const k = Math.min((t - start) / 1600, 1);
          setV(m.value * (1 - Math.pow(1 - k, 4)));
          if (k < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.25 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [m.value]);
  return (
    <b ref={el} data-count className={className}>
      {formatMetric(m, v)}
    </b>
  );
}
