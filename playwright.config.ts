import { defineConfig, devices } from '@playwright/test';

const remote = process.env.BASE_URL;

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  fullyParallel: true,
  reporter: 'line',
  use: { baseURL: remote ?? 'http://localhost:4173', viewport: { width: 1440, height: 900 } },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } }],
  webServer: remote ? undefined : { command: 'npx serve out -l 4173 --no-clipboard', port: 4173, reuseExistingServer: true },
});
