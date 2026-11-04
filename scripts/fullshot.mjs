// usage: node scripts/fullshot.mjs <url> <out.png> [width] [height]
import { chromium } from '@playwright/test';
const [url, out, w = '1440', h = '900'] = process.argv.slice(2);
const browser = await chromium.launch({ headless: true, args: ['--enable-unsafe-webgpu', '--use-angle=metal', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: +w, height: +h } });
page.on('pageerror', (e) => console.log('pageerror:', e.message.slice(0, 200)));
await page.goto(url, { waitUntil: 'networkidle' });
const total = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < total; y += 400) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(120); }
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(1500);
await page.screenshot({ path: out, fullPage: true });
await browser.close();
