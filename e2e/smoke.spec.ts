import { test, expect } from '@playwright/test';

test('home renders with title', async ({ page, request }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Pushpam Raj Satyarthi/);
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(bg).toBe('rgb(233, 231, 226)');
  const pdf = await request.get('/Pushpam-Raj-Satyarthi-Resume.pdf');
  expect(pdf.status()).toBe(200);
  expect(pdf.headers()['content-type']).toContain('pdf');
});
