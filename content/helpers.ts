import { site } from './content';
import type { CaseStudy } from './types';

export function getProject(slug: string): CaseStudy | undefined {
  return site.featured.find((p) => p.slug === slug);
}

export function nextProject(slug: string): CaseStudy {
  const i = site.featured.findIndex((p) => p.slug === slug);
  return site.featured[(i + 1) % site.featured.length];
}
