import { test, expect } from '@playwright/test';

test.describe('without JS', () => {
  test.use({ javaScriptEnabled: false });
  test('poster and headline render without JS', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toHaveText(/BUILDS THINGS/);
    await expect(page.locator('[data-hero-poster]')).toBeVisible();
  });
});

test.describe('mobile', () => {
  test.use({ viewport: { width: 375, height: 812 } });
  test('no canvas on mobile', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1500);
    await expect(page.locator('canvas')).toHaveCount(0);
  });
});

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });
  test('no canvas under reduced motion', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1500);
    await expect(page.locator('canvas')).toHaveCount(0);
  });
});

test('no WebGPU: poster only, no console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(e.message));
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'gpu', { value: undefined, configurable: true });
    Object.defineProperty(navigator, 'hardwareConcurrency', { value: 8, configurable: true });
  });
  await page.goto('/');
  await page.waitForTimeout(1500);
  await expect(page.locator('canvas')).toHaveCount(0);
  await expect(page.locator('[data-hero-poster]')).toBeVisible();
  expect(errors).toEqual([]);
});

test('canvas failure keeps poster', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'hardwareConcurrency', { value: 8, configurable: true });
    // pretend WebGPU exists but every adapter request fails
    Object.defineProperty(navigator, 'gpu', { value: { requestAdapter: async () => null, getPreferredCanvasFormat: () => 'bgra8unorm' }, configurable: true });
  });
  await page.goto('/');
  await page.waitForTimeout(3000);
  await expect(page.locator('[data-hero-poster]')).toBeVisible();
  const opacity = await page.locator('[data-hero-poster]').evaluate((el) => getComputedStyle(el).opacity);
  expect(Number(opacity)).toBeGreaterThan(0.9);
});
