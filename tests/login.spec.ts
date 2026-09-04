import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
    await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
    await page.getByRole('button', { name: ' Login' }).click();

    await expect(page).toHaveURL('https://the-internet.herokuapp.com/secure');
  });

  test('should show error with invalid username', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Username' }).fill('invaliduser');
  await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
  await page.getByRole('button', { name: ' Login' }).click();

  await expect(page.getByText('Your username is invalid!')).toBeVisible();
});

test('should show error with invalid password', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
  await page.getByRole('textbox', { name: 'Password' }).fill('wrongpassword');
  await page.getByRole('button', { name: ' Login' }).click();

  await expect(page.getByText('Your password is invalid!')).toBeVisible();
});

});