import { test, expect } from '@playwright/test';

test('nav hash link from a case page lands on that section', async ({ page }) => {
  await page.goto('/work/orbitune/');
  await page.getByRole('link', { name: 'Contact', exact: true }).click();
  await expect(page).toHaveURL(/\/#contact$/);
  await page.waitForTimeout(1200);
  const top = await page.locator('#contact').evaluate((el) => el.getBoundingClientRect().top);
  expect(Math.abs(top)).toBeLessThan(120);
});

for (const [w, h] of [[844, 390], [667, 375]] as const) {
  test(`hero headline is above the fold at ${w}x${h}`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: h });
    await page.goto('/');
    const b = (await page.locator('h1').boundingBox())!;
    expect(b.y + b.height).toBeLessThanOrEqual(h);
  });
}
