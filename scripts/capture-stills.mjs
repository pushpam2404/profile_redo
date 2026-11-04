// Captures /public/work/<slug>.png (1200x900) — live sites where they exist, rendered chrome stills otherwise.
// usage: node scripts/capture-stills.mjs <devBaseUrl>
import { chromium } from '@playwright/test';
const base = process.argv[2] ?? 'http://localhost:3005';
const live = { 'threat-detection': 'https://fake-acc.vercel.app', orbitune: 'https://orbitune-music.vercel.app' };
const slugs = ['threat-detection', 'orbitune', 'banking-etl', 'sluice', 'scrollo'];
const browser = await chromium.launch({ headless: true, args: ['--enable-unsafe-webgpu', '--use-angle=metal', '--ignore-gpu-blocklist'] });
for (const s of slugs) {
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
  const url = live[s] ?? `${base}/still-render/${s}/`;
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
  } catch (e) {
    console.log(s, 'load warning:', e.message.slice(0, 80));
  }
  await page.waitForTimeout(live[s] ? 6000 : 4000);
  await page.screenshot({ path: `reference/still-${s}.png` });
  console.log(s, '->', url, 'status ok');
  await page.close();
}
await browser.close();
