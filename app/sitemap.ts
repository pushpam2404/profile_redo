import type { MetadataRoute } from 'next';
import { site } from '@/content/content';

export const dynamic = 'force-static';
const BASE = 'https://profile-redo.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${BASE}/` }, ...site.featured.map((p) => ({ url: `${BASE}/work/${p.slug}/` }))];
}
