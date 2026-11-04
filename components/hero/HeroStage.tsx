'use client';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { useCapabilities } from '@/lib/capabilities';
import { gsap } from '@/lib/motion';
import styles from './Hero.module.css';

const ChromeCanvas = dynamic(() => import('./ChromeCanvas'), { ssr: false });

/** Poster first; live chrome fades in over it when the device can run it. */
export function HeroStage() {
  const { live3D, reducedMotion, ready } = useCapabilities();
  const stage = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [failed, setFailed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = stage.current?.parentElement;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: '20% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!ready || reducedMotion || !stage.current) return;
    const section = stage.current.parentElement!;
    const ctx = gsap.context(() => {
      gsap.to(stage.current, {
        scale: 0.65,
        yPercent: -30,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('[data-hero-headline]', {
        xPercent: -25,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, section);
    return () => ctx.revert();
  }, [ready, reducedMotion]);

  const mount = live3D && !failed && inView;

  return (
    <div ref={stage} className={styles.stage} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        data-hero-poster
        className={`${styles.poster} ${live3D ? '' : styles.float}`}
        src="/hero-poster.webp"
        alt=""
        fetchPriority="high"
        decoding="async"
      />
      {mount && (
        <div className={styles.canvas} style={{ opacity: shown ? 1 : 0 }}>
          <ChromeCanvas onReady={() => setShown(true)} onUnavailable={() => setFailed(true)} />
        </div>
      )}
    </div>
  );
}
