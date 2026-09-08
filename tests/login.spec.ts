import { test, expect } from '@playwright/test';

const URL = 'https://qa-sample-marty-sharma.up.railway.app';

test.describe('Login', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });

  // QA TESTER ACCOUNT
  test('QA tester: valid credentials redirects to dashboard', async ({ page }) => {
    await page.getByTestId('signin-email-input').fill('qa.tester@example.com');
    await page.getByTestId('signin-password-input').fill('Password123');
    await page.getByTestId('signin-submit-button').click();
    await page.getByTestId('filter-presence-status').waitFor();
    await expect(page.getByTestId('filter-presence-status')).toBeVisible();
  });

  // TO DO: check actual error message in codegen
  test('QA tester: invalid password shows error', async ({ page }) => {
    await page.getByTestId('signin-email-input').fill('qa.tester@example.com');
    await page.getByTestId('signin-password-input').fill('wrongpassword');
    await page.getByTestId('signin-submit-button').click();
    await expect(page.getByTestId('signin-error-banner')).toBeVisible();
  });

  test('QA tester: invalid email shows error', async ({ page }) => {
    await page.getByTestId('signin-email-input').fill('invalid@example.com');
    await page.getByTestId('signin-password-input').fill('Password123');
    await page.getByTestId('signin-submit-button').click();
    await expect(page.getByTestId('signin-error-banner')).toBeVisible();
  });

  test('QA tester: empty fields shows error', async ({ page }) => {
    await page.getByTestId('signin-submit-button').click();
    await expect(page.getByTestId('signin-error-banner')).toBeVisible();
  });

  // ADMIN ACCOUNT
  test('Admin: valid credentials redirects to dashboard', async ({ page }) => {
    await page.getByTestId('signin-email-input').fill('admin@example.com');
    await page.getByTestId('signin-password-input').fill('Admin1234');
    await page.getByTestId('signin-submit-button').click();
    await page.getByTestId('filter-presence-status').waitFor();
    await expect(page.getByTestId('filter-presence-status')).toBeVisible();
  });

  test('Admin: invalid password shows error', async ({ page }) => {
    await page.getByTestId('signin-email-input').fill('admin@example.com');
    await page.getByTestId('signin-password-input').fill('wrongpassword');
    await page.getByTestId('signin-submit-button').click();
    await expect(page.getByTestId('signin-error-banner')).toBeVisible();
  });

});