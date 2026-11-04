import { site } from '@/content/content';
import { SectionLabel } from './SectionLabel';
import styles from './Home.module.css';

export function Leadership() {
  return (
    <section className={styles.lead}>
      <SectionLabel n={5}>Leadership &amp; wins</SectionLabel>
      <ol className={styles.leadList}>
        {site.leadership.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ol>
    </section>
  );
}
