import { site } from '@/content/content';
import { SectionLabel } from './SectionLabel';
import styles from './Home.module.css';

export function Experience() {
  const e = site.experience;
  return (
    <section className={styles.exp}>
      <SectionLabel n={3}>Experience</SectionLabel>
      <div className={styles.expRow}>
        <span className={styles.expCo}>{e.company}</span>
        <span className={styles.expRole}>{e.role}</span>
        <span className={styles.expSum}>{e.summary}</span>
        <span className={styles.expDates}>{e.dates}</span>
      </div>
    </section>
  );
}
