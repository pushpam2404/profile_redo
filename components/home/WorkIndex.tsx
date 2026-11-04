'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { site } from '@/content/content';
import { useCapabilities } from '@/lib/capabilities';
import { SectionLabel } from './SectionLabel';
import styles from './Home.module.css';

export function WorkIndex() {
  const { hover } = useCapabilities();
  const list = useRef<HTMLDivElement>(null);
  const peek = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const rows = [...(list.current?.querySelectorAll<HTMLElement>('[data-work-row]') ?? [])];
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add(styles.in), io.unobserve(e.target))),
      { threshold: 0.2 },
    );
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!hover) return;
    let x = 0, y = 0, cx = 0, cy = 0, raf = 0;
    const move = (e: PointerEvent) => ((x = e.clientX), (y = e.clientY));
    const loop = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      if (peek.current) peek.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    addEventListener('pointermove', move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => (removeEventListener('pointermove', move), cancelAnimationFrame(raf));
  }, [hover]);

  return (
    <section className={styles.work} id="work">
      <div className={styles.workHead}>
        <h2 className={styles.bigTitle}>Selected Work</h2>
        <SectionLabel n={2}>Selected work · {String(site.featured.length).padStart(2, '0')}</SectionLabel>
      </div>
      <div ref={list} onPointerLeave={() => setActive(null)}>
        {site.featured.map((p, i) => (
          <Link
            key={p.slug}
            href={`/work/${p.slug}/`}
            data-work-row
            className={styles.row}
            style={{ transitionDelay: `${i * 0.08}s` }}
            onPointerEnter={() => setActive(i)}
          >
            <span className={styles.rowN}>{String(i + 1).padStart(2, '0')}</span>
            <span className={styles.rowT}>{p.title}</span>
            <span className={styles.rowS}>{p.stack.slice(0, 3).join(' · ')}</span>
            <span className={styles.rowR}>{p.result}</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={styles.rowStill} src={p.still} alt="" loading="lazy" />
          </Link>
        ))}
      </div>
      {hover && (
        <div ref={peek} data-peek className={`${styles.peek} ${active !== null ? styles.peekOn : ''}`} aria-hidden="true">
          {site.featured.map((p, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={p.slug} src={p.still} alt="" style={{ opacity: active === i ? 1 : 0 }} />
          ))}
          <span>{active !== null ? site.featured[active].kicker : ''}</span>
        </div>
      )}
    </section>
  );
}
