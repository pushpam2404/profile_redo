import { site } from '@/content/content';
import { SectionLabel } from './SectionLabel';
import { CopyEmail } from './CopyEmail';
import { ChromeDrop } from './ChromeDrop';
import styles from './Home.module.css';

export function Contact() {
  return (
    <section className={styles.contact} id="contact">
      <ChromeDrop />
      <SectionLabel n={6}>Contact</SectionLabel>
      <h2 className={styles.contactTitle}>
        Let&rsquo;s build
        <br />
        <em>something</em> good.
      </h2>
      <CopyEmail />
      <div className={styles.contactLinks}>
        <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
        <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        <a href={site.resume} target="_blank" rel="noopener">Resume (PDF) ↗</a>
      </div>
    </section>
  );
}
