import { test, expect } from '@playwright/test';

const pages = [
  ['threat-detection', 'Threat Detection Engine'],
  ['orbitune', 'Orbitune'],
  ['banking-etl', 'Global Banking ETL'],
  ['sluice', 'Sluice'],
  ['scrollo', 'Scrollo'],
] as const;

for (const [slug, title] of pages) {
  test(`case study ${slug} renders`, async ({ page }) => {
    const res = await page.goto(`/work/${slug}/`);
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveText(title);
    const ext = page.locator('a[target="_blank"]');
    expect(await ext.count()).toBeGreaterThan(0);
    for (const rel of await ext.evaluateAll((els) => els.map((e) => e.getAttribute('rel') ?? ''))) expect(rel).toContain('noopener');
    await expect(page).toHaveTitle(`${title} — Pushpam Raj Satyarthi`);
  });
}

test('next project link works', async ({ page }) => {
  await page.goto('/work/scrollo/');
  await page.locator('[data-next-project]').click();
  await expect(page).toHaveURL(/\/work\/threat-detection\/$/);
  await expect(page.locator('h1')).toHaveText('Threat Detection Engine');
});

test('unknown slug serves the 404 page', async ({ page }) => {
  const res = await page.goto('/work/nope/');
  expect(res?.status()).toBe(404);
});
