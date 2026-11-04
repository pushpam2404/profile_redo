'use client';
import { useEffect, useState } from 'react';
import { formatVizagTime } from '@/lib/time';

export function LocalClock() {
  const [t, setT] = useState('');
  useEffect(() => {
    const tick = () => setT(formatVizagTime(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>Visakhapatnam {t}</span>;
}
