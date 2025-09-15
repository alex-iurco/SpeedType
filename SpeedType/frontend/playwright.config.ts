import { PlaywrightTestConfig, devices } from '@playwright/test';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
// @ts-ignore - process is available in Node.js environment
const isProduction = process.env.PLAYWRIGHT_ENV === 'production';

// Define URLs directly to avoid ESM/CommonJS issues
const URLS = {
  development: {
    frontend: 'http://localhost:3000',
    backend: 'http://localhost:3001'
  },
  test: {
    frontend: 'http://localhost:3000',
    backend: 'http://localhost:3001'
  },
  production: {
    frontend: 'https://speedtype.robocat.ai',
    backend: 'https://speedtype-backend-production.up.railway.app'
  }
};

const config: PlaywrightTestConfig = {
  testDir: './e2e',
  timeout: 60000,
  // @ts-ignore - process is available in Node.js environment
  forbidOnly: !!process.env.CI,
  // @ts-ignore - process is available in Node.js environment
  retries: process.env.CI ? 2 : 1,
  // @ts-ignore - process is available in Node.js environment
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['list']
  ],
  use: {
    headless: true,
    // For production tests, use the actual production URL
    baseURL: isProduction ? URLS.production.frontend : URLS.test.frontend,
    trace: 'retain-on-failure',
    screenshot: 'on',
    video: 'on',
    navigationTimeout: 30000,
    actionTimeout: 15000,
  },
  // Skip starting local server since it's already running
  // ...(isProduction ? {} : {
  //   webServer: {
  //     command: 'npm run dev -- --mode test --force',
  //     url: URLS.test.frontend,
  //     // @ts-ignore - process is available in Node.js environment
  //     reuseExistingServer: true,
  //     timeout: 120000,
  //   },
  // }),
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
        launchOptions: {
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
      },
    },
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        viewport: { width: 1280, height: 720 }
      },
    }
  ],
};

export default config; 