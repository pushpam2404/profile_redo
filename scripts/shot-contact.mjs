// Screenshot the contact section with WebGPU on (to see the Spline drop).
import { chromium } from '@playwright/test';
const b = await chromium.launch({ headless: true, args: ['--enable-unsafe-webgpu', '--use-angle=metal', '--ignore-gpu-blocklist'] });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
p.on('pageerror', (e) => console.log('pageerror', e.message.slice(0, 160)));
p.on('console', (m) => m.type() === 'error' && console.log('console.error', m.text().slice(0, 160)));
await p.goto('http://localhost:4180/', { waitUntil: 'networkidle' });
await p.evaluate(() => document.querySelector('#contact').scrollIntoView());
await p.waitForTimeout(9000);
console.log('canvases', await p.evaluate(() => document.querySelectorAll('canvas').length));
await p.screenshot({ path: 'reference/contact-live.png' });
await b.close();
