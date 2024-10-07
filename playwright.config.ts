import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();


export default defineConfig({
  projects: [
    {
      name: 'dev',
      testMatch: '__tests__/e2e/**/*.spec.ts',
      use: { baseURL: process.env.PUBLIC_URL || 'http://localhost:5173', ...devices['Desktop Chrome'] },
    }
  ],
  reporter: [['html', { outputFolder: 'e2e-test' }]],
});