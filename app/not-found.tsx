import { Nav } from '@/components/Nav';
import { TransitionLink } from '@/components/Transition';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className={styles.wrap}>
        <div className={styles.blob} aria-hidden="true" />
        <span className="label">(404) Page not found</span>
        <h1 className={styles.title}>Melted.</h1>
        <p className={styles.copy}>This page dripped off the edge of the site.</p>
        <TransitionLink href="/" className={styles.home} data-home-link>
          Back to the start →
        </TransitionLink>
      </main>
    </>
  );
}
