'use client';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { site } from '@/content/content';
import { useCapabilities } from '@/lib/capabilities';
import styles from './Home.module.css';

const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false });

/** Small chrome drop beside the contact headline: Spline scene when published + allowed, CSS chrome otherwise. */
export function ChromeDrop() {
  const { live3D } = useCapabilities();
  const box = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setNear(e.isIntersecting), { rootMargin: '30% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const live = live3D && near && !!site.splineScene;
  return (
    <div ref={box} className={styles.drop} aria-hidden="true">
      <div className={styles.dropCss} style={{ opacity: live && loaded ? 0 : 1 }} />
      {live && <Spline scene={site.splineScene} onLoad={() => setLoaded(true)} className={styles.dropSpline} />}
    </div>
  );
}
