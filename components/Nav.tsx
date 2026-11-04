import Link from 'next/link';
import { site } from '@/content/content';
import styles from './Nav.module.css';

export function Nav() {
  return (
    <header className={styles.nav}>
      <Link href="/" className={styles.name}>
        {site.name}
      </Link>
      <nav aria-label="Primary" className={styles.links}>
        <Link href="/#work">Work</Link>
        <Link href="/#about">About</Link>
        <Link href="/#contact">Contact</Link>
      </nav>
    </header>
  );
}
