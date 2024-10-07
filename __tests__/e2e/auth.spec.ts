import { test, expect, devices } from '@playwright/test';


test.use(devices['Desktop Chrome']);


test.describe('login page', () => { // 2

  test('[A001] Successful login', async ({ page, context }) => {
    await page.route('*/**/api/v1/login', async route => {
      const json = {store: {token: "707cfb4a-17b3-48c9-a8e6-fe1ed6ffa00f", user: {confirmation: true, email: "fathnakbar@gmail.com", id: 101, role: "INVESTOR"}}, message: "Login successful"};
      await route.fulfill({ json });
    });
    await page.goto('/login');
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('fathnakbar@gmail.com');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('1-Kemenangan');
    await page.getByRole('button', { name: 'Masuk', exact: true }).click();
    await page.waitForURL("/app/home")
    expect(new URL(page.url()).pathname).toBe("/app/home")
  });
});


test.describe("Sign up page", () => {
  test('[A002] Sign Up with email and password', async ({ page }) => {
    await page.route('*/**/api/v1/register', async route => {
      const json = {store: {token: "707cfb4a-17b3-48c9-a8e6-fe1ed6ffa00f", confirmation: {next: Date.now() + 1000 * 10, attempts: 1}, user: {confirmation: false, email: "fathnakbar@gmail.com"}}, message: "Register successful"};
      await route.fulfill({ json });
    });

    await page.route('*/**/api/v1/refresh-session', async route => {
      const json = {store: {token: "707cfb4a-17b3-48c9-a8e6-fe1ed6ffa00f", confirmation: {next: Date.now() + 1000 * 10, attempts: 1}, user: {confirmation: false, email: "fathnakbar@gmail.com"}}, message: "Register successful"};
      await route.fulfill({ json });
    });

    await page.goto('/signup');
    await page.getByPlaceholder('Alamat email cth: example@anywork.dev').fill('fathnakbar@gmail.com');
    await page.getByPlaceholder('Password', {exact: true}).fill('1-Kemenangan');
    await page.getByPlaceholder('Konfrimasi password').fill('1-Kemenangan');
    await page.getByRole('button', { name: 'Daftar akun', exact: true }).click();
    await page.waitForURL('/signup/confirm_required')
    expect(new URL(page.url()).pathname).toBe("/signup/confirm_required");
    await expect(page.getByText("Konfirmasi Alamat Email Diperlukan")).toBeVisible();
    await page.waitForTimeout(10000)
    // await expect(page.getByRole('button', {name: 'Kirim lagi dalam'})).toBeEnabled({timeout: 1000 * 60 * 5 + 30});
  });
})