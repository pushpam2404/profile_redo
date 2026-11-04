'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/motion';
import styles from './Transition.module.css';

const EVT = 'chrome-transition';

/** Full-screen chrome panel that sweeps up before a route change and off after it. Mounted once in the layout. */
export function TransitionLayer() {
  const panel = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const covering = useRef(false);

  useEffect(() => {
    const onStart = (e: Event) => {
      const href = (e as CustomEvent<string>).detail;
      const el = panel.current;
      if (!el) return router.push(href);
      covering.current = true;
      el.dataset.state = 'covering';
      gsap.fromTo(el, { yPercent: 100 }, { yPercent: 0, duration: 0.45, ease: 'power3.inOut', onComplete: () => router.push(href) });
    };
    addEventListener(EVT, onStart);
    return () => removeEventListener(EVT, onStart);
  }, [router]);

  useEffect(() => {
    const el = panel.current;
    if (!el || !covering.current) return;
    covering.current = false;
    const lenis = (window as Window & { __lenis?: { scrollTo: (t: number | Element, o: object) => void; resize: () => void } }).__lenis;
    const hashTarget = location.hash ? document.querySelector(location.hash) : null;
    if (hashTarget) {
      // arriving on a section link (e.g. /#contact): land on the section, not the top
      // two frames: let the new page lay out, then re-measure Lenis (its scroll limit is cached from the old page)
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          lenis?.resize();
          if (lenis) lenis.scrollTo(hashTarget, { immediate: true, force: true });
          else hashTarget.scrollIntoView();
        }),
      );
    } else {
      window.scrollTo(0, 0);
      lenis?.scrollTo(0, { immediate: true });
    }
    gsap.to(el, {
      yPercent: -100,
      duration: 0.5,
      delay: 0.05,
      ease: 'power3.inOut',
      onComplete: () => {
        el.dataset.state = 'idle';
        gsap.set(el, { yPercent: 100 });
      },
    });
  }, [pathname]);

  return <div ref={panel} className={styles.panel} data-transition-panel data-state="idle" aria-hidden="true" />;
}

type Props = React.ComponentProps<typeof Link> & { href: string };

/** Drop-in for internal <Link>: plays the chrome sweep, plain navigation under reduced motion / modified clicks / same-page hashes. */
export function TransitionLink({ href, onClick, ...rest }: Props) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const target = href.split('#')[0] || pathname;
        if (target === pathname) return; // same page (e.g. hash link): let the browser scroll
        e.preventDefault();
        dispatchEvent(new CustomEvent(EVT, { detail: href }));
      }}
    />
  );
}
