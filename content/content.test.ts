import { describe, it, expect } from 'vitest';
import { site } from './content';

const all = JSON.stringify(site);

describe('site content', () => {
  it('featured slugs are exactly the five in order', () => {
    expect(site.featured.map((p) => p.slug)).toEqual(['threat-detection', 'orbitune', 'banking-etl', 'sluice', 'scrollo']);
  });

  it('no phone number anywhere', () => {
    expect(all).not.toMatch(/\+91|\b\d{5}\s?\d{5}\b/);
  });

  it('email is exact', () => {
    expect(site.email).toBe('prsatyarthi2404@gmail.com');
  });

  it('legallens stays one line', () => {
    const { experience, ...rest } = site;
    expect(JSON.stringify(rest)).not.toMatch(/LegalLens|Motherson/);
    expect(experience.summary).toBe('Backend for an AI legal-research platform: FastAPI, Azure Blob, React/TypeScript');
  });

  it('every link is https and every featured project has at least one metric', () => {
    const hrefs = [...all.matchAll(/"href":"([^"]+)"/g)].map((m) => m[1]);
    expect(hrefs.length).toBeGreaterThan(5);
    for (const h of hrefs) expect(h).toMatch(/^https:\/\//);
    for (const p of site.featured) expect(p.metrics.length).toBeGreaterThan(0);
  });

  it('no banned words', () => {
    expect(all).not.toMatch(/passionate|leverag|synerg/i);
  });
});

import { existsSync } from 'node:fs';
describe('assets', () => {
  it('every featured still exists on disk', () => {
    for (const p of site.featured) expect(existsSync('public' + p.still), p.still).toBe(true);
  });
});
