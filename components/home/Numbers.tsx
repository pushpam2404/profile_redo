import { site } from '@/content/content';
import { CountUp } from '@/components/CountUp';
import styles from './Home.module.css';

export function Numbers() {
  return (
    <section className={styles.numbers} aria-label="Numbers">
      {site.numbers.map((m) => (
        <div key={m.label} className={styles.stat}>
          <CountUp m={m} />
          <span>{m.label}</span>
        </div>
      ))}
    </section>
  );
}
