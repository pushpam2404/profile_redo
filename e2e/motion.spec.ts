import { test, expect } from '@playwright/test';

test('smooth scroll is on by default', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass(/\blenis\b/);
});

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });
  test('smooth scroll is off under reduced motion', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);
    await expect(page.locator('html')).not.toHaveClass(/\blenis\b/);
  });
});
