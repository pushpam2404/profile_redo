'use client';
import { useEffect, useMemo, useRef } from 'react';
import { site } from '@/content/content';
import { SectionLabel } from './SectionLabel';
import styles from './Home.module.css';

/** Splits "*italic*" markup into words; italic words keep their emphasis. */
function words(text: string) {
  const out: { w: string; i: boolean }[] = [];
  text.split(/(\*[^*]+\*)/).forEach((part) => {
    const italic = part.startsWith('*') && part.endsWith('*');
    const clean = italic ? part.slice(1, -1) : part;
    clean.split(/\s+/).filter(Boolean).forEach((w) => out.push({ w, i: italic }));
  });
  return out;
}

export function About() {
  const p = useRef<HTMLParagraphElement>(null);
  const list = useMemo(() => words(site.about), []);

  useEffect(() => {
    const el = p.current;
    if (!el) return;
    const spans = [...el.querySelectorAll<HTMLSpanElement>('[data-w]')];
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      spans.forEach((s) => s.classList.add(styles.on));
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const k = Math.min(Math.max((innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.35), 0), 1);
      const lit = Math.round(k * spans.length);
      spans.forEach((s, i) => s.classList.toggle(styles.on, i < lit));
    };
    const onScroll = () => (raf ||= requestAnimationFrame(update));
    update();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className={styles.about} id="about">
      <SectionLabel n={1}>About</SectionLabel>
      <p ref={p} className={styles.aboutText}>
        {list.map(({ w, i }, k) => (
          <span key={k} data-w className={styles.word}>
            {i ? <em>{w}</em> : w}{' '}
          </span>
        ))}
      </p>
    </section>
  );
}
