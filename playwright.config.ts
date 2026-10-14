import { defineConfig, devices } from "@playwright/test";

/**
 * Browser smoke tests against the built site, served by `astro preview`.
 *
 * Build first (`pnpm build`); the preview server serves dist/ as-is, so the
 * tests see exactly what ships, including the Pagefind index and the
 * trailing-slash URLs. Browsers are installed separately
 * (`pnpm exec playwright install --with-deps chromium`); see
 * docs/DEVELOPMENT.md.
 */
const PORT = Number(process.env.PREVIEW_PORT ?? 4321);
const BASE_URL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: "tests",
  testMatch: "**/*.spec.ts",
  outputDir: "test-results",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["list"]] : "list",
  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: `pnpm exec astro preview --host 127.0.0.1 --port ${PORT}`,
    url: `${BASE_URL}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
