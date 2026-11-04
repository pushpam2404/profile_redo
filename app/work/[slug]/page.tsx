import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TransitionLink as Link } from '@/components/Transition';
import { site } from '@/content/content';
import { getProject, nextProject } from '@/content/helpers';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { CountUp } from '@/components/CountUp';
import { ShaderBackdrop } from '@/components/case/ShaderBackdrop';
import styles from '@/components/case/Case.module.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return site.featured.map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return { title: `${p.title} — ${site.name}`, description: p.problem };
}

export default async function CaseStudyPage({ params }: Params) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const next = nextProject(p.slug);
  return (
    <>
      <Nav />
      <main>
        <section className={styles.hero}>
          <ShaderBackdrop backdrop={p.backdrop} />
          <div className={styles.heroText}>
            <span className={styles.kicker}>{p.kicker}</span>
            <h1 className={styles.title}>{p.title}</h1>
          </div>
        </section>

        <dl className={styles.meta}>
          <div><dt>Role</dt><dd>{p.role}</dd></div>
          <div><dt>Year</dt><dd>{p.year}</dd></div>
          <div><dt>Stack</dt><dd>{p.stack.join(' · ')}</dd></div>
          <div>
            <dt>Links</dt>
            <dd>
              {p.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">{l.label} ↗</a>
              ))}
            </dd>
          </div>
        </dl>

        <div className={styles.body}>
          <section className={styles.block}>
            <span className="label">Problem</span>
            <p className={styles.lead}>{p.problem}</p>
          </section>
          <section className={styles.block}>
            <span className="label">What I built</span>
            <ol className={styles.built}>
              {p.built.map((b) => <li key={b}>{b}</li>)}
            </ol>
          </section>
          <section className={styles.block}>
            <span className="label">How it works</span>
            <figure className={styles.how}>
              <figcaption>{p.howItWorks.caption}</figcaption>
              {p.howItWorks.code && <pre><code>{p.howItWorks.code}</code></pre>}
              {p.howItWorks.diagram && (
                <div className={styles.diagram}>
                  {p.howItWorks.diagram.split(' → ').map((step, i) => (
                    <span key={step + i}>{i > 0 && <i>→ </i>}{step}</span>
                  ))}
                </div>
              )}
            </figure>
          </section>
          <section className={styles.block}>
            <span className="label">Results</span>
            <div className={styles.metrics}>
              {p.metrics.map((m) => (
                <div key={m.label} className={styles.metric}>
                  <CountUp m={m} />
                  <span>{m.label}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <Link href={`/work/${next.slug}/`} className={styles.next} data-next-project>
          <span>Next project</span>
          <b>{next.title} →</b>
        </Link>
      </main>
      <Footer />
    </>
  );
}
