// usage: node scripts/shot.mjs <url> <out.png> [width] [height] [waitMs]
import { chromium } from '@playwright/test';
const [url, out, w = '1440', h = '900', wait = '4000'] = process.argv.slice(2);
const browser = await chromium.launch({
  headless: true,
  args: ['--enable-unsafe-webgpu', '--enable-features=Vulkan,WebGPU', '--use-angle=metal', '--ignore-gpu-blocklist'],
});
const page = await browser.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1 });
page.on('console', (m) => { if (/SHADER|error/i.test(m.text())) console.log('console:', m.type(), m.text().slice(0, 200)); });
page.on('pageerror', (e) => console.log('pageerror:', e.message.slice(0, 200)));
await page.goto(url, { waitUntil: 'networkidle' });
await page.mouse.move(+w * 0.6, +h * 0.45);
await page.waitForTimeout(+wait);
console.log('gpu:', await page.evaluate(async () => !!(navigator.gpu && (await navigator.gpu.requestAdapter()))));
await page.screenshot({ path: out });
await browser.close();
