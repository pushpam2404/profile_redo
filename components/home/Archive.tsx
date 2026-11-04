import { site } from '@/content/content';
import { SectionLabel } from './SectionLabel';
import styles from './Home.module.css';

export function Archive() {
  return (
    <section className={styles.archive}>
      <div className={styles.sectionHead}>
        <h2 className={styles.midTitle}>Also built</h2>
        <SectionLabel n={4}>Also built · {site.archive.length}</SectionLabel>
      </div>
      <ul className={styles.archList}>
        {site.archive.map((a) => (
          <li key={a.name} className={styles.archItem}>
            <span className={styles.archName}>{a.name}</span>
            <span className={styles.archBlurb}>{a.blurb}</span>
            <span className={styles.archLang}>{a.lang}</span>
            <span className={styles.archLinks}>
              {a.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label} ↗
                </a>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
