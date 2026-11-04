import { test, expect } from '@playwright/test';

const slugs = ['threat-detection', 'orbitune', 'banking-etl', 'sluice', 'scrollo'];

test('five work rows link to case studies', async ({ page }) => {
  await page.goto('/');
  const hrefs = await page.locator('[data-work-row]').evaluateAll((els) => els.map((e) => e.getAttribute('href')));
  expect(hrefs).toEqual(slugs.map((s) => `/work/${s}/`));
});

test('section labels in order', async ({ page }) => {
  await page.goto('/');
  const labels = await page.locator('[data-section-label]').allTextContents();
  expect(labels.map((l) => l.slice(0, 4))).toEqual(['(01)', '(02)', '(03)', '(04)', '(05)', '(06)']);
});

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });
  test('numbers show final values under reduced motion', async ({ page }) => {
    await page.goto('/');
    const nums = page.locator('[data-count]');
    await nums.first().scrollIntoViewIfNeeded();
    await expect(nums).toHaveText(['101,000+', '9.17', '+23']);
  });
});

test('email works without clipboard', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.addInitScript(() => Object.defineProperty(navigator, 'clipboard', { value: undefined, configurable: true }));
  await page.goto('/');
  const link = page.locator('[data-email]');
  await expect(link).toHaveAttribute('href', 'mailto:prsatyarthi2404@gmail.com');
  await expect(link).toContainText('prsatyarthi2404@gmail.com');
  await link.evaluate((el) => el.addEventListener('click', (e) => e.preventDefault()));
  await link.click();
  expect(errors).toEqual([]);
});

test.describe('touch device', () => {
  test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
  test('no peek card, rows tappable', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-peek]')).toHaveCount(0);
    const row = page.locator('[data-work-row]').first();
    await row.scrollIntoViewIfNeeded();
    await row.tap();
    await expect(page).toHaveURL(/\/work\/threat-detection\/?$/);
  });
});

test('no phone number rendered', async ({ page }) => {
  await page.goto('/');
  expect(await page.locator('body').innerText()).not.toMatch(/\+91|\b\d{5}\s?\d{5}\b/);
});
