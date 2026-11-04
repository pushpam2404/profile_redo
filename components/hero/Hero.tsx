import { site } from '@/content/content';
import { HeroStage } from './HeroStage';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.hero} id="top">
      <HeroStage />
      <p className={styles.note} data-hero-note>{site.heroNote}</p>
      <div className={styles.status} data-hero-status>
        <span className={styles.live}>
          <i className={styles.dot} aria-hidden="true" />
          <b>{site.status}</b>
        </span>
        <span>CSE @ GITAM · {site.cgpa}</span>
        <span>{site.location}</span>
      </div>
      <h1 className={styles.headline} data-hero-headline>
        <span className="sr-only">{site.name}: </span>BUILDS THINGS
      </h1>
    </section>
  );
}
