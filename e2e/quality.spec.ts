import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const path of ['/', '/work/threat-detection/']) {
  test(`axe: no serious/critical violations on ${path}`, async ({ page }) => {
    await page.goto(path);
    await page.waitForTimeout(800);
    // [data-w]: About words dimmed mid scroll-reveal (decorative state; fully lit in reading position, see About.tsx)
    const r = await new AxeBuilder({ page }).exclude('[data-w]').analyze();
    const bad = r.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(bad.map((v) => `${v.id}: ${v.nodes.length} — ${v.nodes[0]?.target}`)).toEqual([]);
  });
}

const sizes = [
  [375, 812],
  [844, 390],
  [1440, 900],
  [2560, 1080],
] as const;

for (const [w, h] of sizes) {
  test(`no horizontal overflow at ${w}x${h}`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: h });
    for (const path of ['/', '/work/orbitune/']) {
      await page.goto(path);
      const [sw, cw] = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
      expect(sw, path).toBeLessThanOrEqual(cw);
    }
  });
}

for (const [w, h] of [[844, 390], [2560, 1080], [375, 812]] as const) {
  test(`hero text does not overlap at ${w}x${h}`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: h });
    await page.goto('/');
    const box = async (sel: string) => (await page.locator(sel).boundingBox())!;
    const [a, b, c] = [await box('h1'), await box('[data-hero-note]'), await box('[data-hero-status]')];
    const hit = (p: typeof a, q: typeof a) => p.x < q.x + q.width && q.x < p.x + p.width && p.y < q.y + q.height && q.y < p.y + p.height;
    expect(hit(a, b), 'h1/note').toBe(false);
    expect(hit(a, c), 'h1/status').toBe(false);
    expect(hit(b, c), 'note/status').toBe(false);
  });
}
