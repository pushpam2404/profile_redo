import { LocalClock } from './LocalClock';
import styles from './home/Home.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <LocalClock />
      <span>Designed &amp; built by Pushpam</span>
      <span>© {new Date().getFullYear()}</span>
    </footer>
  );
}
