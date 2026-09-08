import { test, expect } from '@playwright/test';

const URL = 'https://qa-sample-marty-sharma.up.railway.app/';

test.describe('Device Table Filters', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(URL);

    // Login
    await page.getByTestId('signin-email-input').fill('qa.tester@example.com');
    await page.getByTestId('signin-password-input').fill('Password123');
    await page.getByTestId('signin-submit-button').click();

    // Wait for dashboard to load by waiting for filter to be visible
    await page.getByTestId('filter-presence-status').waitFor();

    // Reset all filters to All before each test
    await page.getByTestId('filter-presence-status').selectOption('');
    await page.getByTestId('filter-core-services-status').selectOption('');
    await page.getByTestId('filter-orientation').selectOption('');
  });

  // NO FILTERS
  test('Status: No filter selected returns 100 devices', async ({ page }) => {
    // Verify that all devices displayed
    await expect(page.getByText('100 devices', { exact: false })).toBeVisible();
  });

  // STATUS FILTER
  test('Status: Online filter returns 34 devices', async ({ page }) => {
    await page.getByTestId('filter-presence-status').click();
    await page.waitForTimeout(500);
    await page.getByTestId('filter-presence-status').selectOption('online');
    await expect(page.getByText('34 devices', { exact: false })).toBeVisible({ timeout: 20000 });
  });

  test('Status: Offline filter returns 66 devices', async ({ page }) => {
    await page.getByTestId('filter-presence-status').click();
    await page.waitForTimeout(500);
    await page.getByTestId('filter-presence-status').selectOption('offline');
    await expect(page.getByText('66 devices', { exact: false })).toBeVisible({ timeout: 20000 });
  });

  // CORE SERVICES FILTER
  test('Core Services: Up to Date filter returns 32 devices', async ({ page }) => {
    await page.getByTestId('filter-core-services-status').click();
    await page.waitForTimeout(500);
    await page.getByTestId('filter-core-services-status').selectOption('up-to-date');
    await expect(page.getByText('32 devices', { exact: false })).toBeVisible({ timeout: 20000 });
  });
  test('Core Services: Outdated filter returns 68 devices', async ({ page }) => {
    await page.getByTestId('filter-core-services-status').click();
    await page.waitForTimeout(500);
    await page.getByTestId('filter-core-services-status').selectOption('outdated');
    await expect(page.getByText('68 devices', { exact: false })).toBeVisible({ timeout: 20000 });
  });

  // ORIENTATION FILTER
  test('Orientation: Portrait filter returns 62 devices', async ({ page }) => {
    await page.getByTestId('filter-orientation').click();
    await page.waitForTimeout(500);
    await page.getByTestId('filter-orientation').selectOption('portrait');
    await expect(page.getByText('62 devices', { exact: false })).toBeVisible({ timeout: 20000 });
  });
  test('Orientation: Landscape filter returns 29 devices', async ({ page }) => {
    await page.getByTestId('filter-orientation').click();
    await page.waitForTimeout(500);
    await page.getByTestId('filter-orientation').selectOption('landscape');
    await expect(page.getByText('29 devices', { exact: false })).toBeVisible({ timeout: 20000 });
  });

  // COMBINED FILTERS
  // Two filters with 0 results
  test('Combined: Offline + Up to Date returns 0 devices', async ({ page }) => {
    await page.getByTestId('filter-presence-status').click();
    await page.waitForTimeout(500);
    await page.getByTestId('filter-presence-status').selectOption('offline');
    await page.getByTestId('filter-core-services-status').click();
    await page.waitForTimeout(500);
    await page.getByTestId('filter-core-services-status').selectOption('up-to-date');
    await expect(page.getByText('0 devices', { exact: false })).toBeVisible({ timeout: 20000 });
  });

  // Two filters with few results
  test('Combined: Online + Landscape returns 8 devices', async ({ page }) => {
    await page.getByTestId('filter-presence-status').click();
    await page.waitForTimeout(500);
    await page.getByTestId('filter-presence-status').selectOption('online');
    await page.getByTestId('filter-orientation').click();
    await page.waitForTimeout(500);
    await page.getByTestId('filter-orientation').selectOption('landscape');
    await expect(page.getByText('8 devices', { exact: false })).toBeVisible({ timeout: 20000 });
  });

  // Two filters with many results
  test('Combined: Outdated + Portrait returns 45 devices', async ({ page }) => {
    await page.getByTestId('filter-core-services-status').click();
    await page.waitForTimeout(500);
    await page.getByTestId('filter-core-services-status').selectOption('outdated');
    await page.getByTestId('filter-orientation').click();
    await page.waitForTimeout(500);
    await page.getByTestId('filter-orientation').selectOption('portrait');
    await expect(page.getByText('45 devices', { exact: false })).toBeVisible({ timeout: 20000 });
  });

  // Two filters with most results
  test('Combined: Offline + Outdated returns 66 devices', async ({ page }) => {
    await page.getByTestId('filter-presence-status').click();
    await page.waitForTimeout(500);
    await page.getByTestId('filter-presence-status').selectOption('offline');
    await page.getByTestId('filter-core-services-status').click();
    await page.waitForTimeout(500);
    await page.getByTestId('filter-core-services-status').selectOption('outdated');
    await expect(page.getByText('66 devices', { exact: false })).toBeVisible({ timeout: 20000 });
  });

  // Three filters
  test('Combined: Offline + Outdated + Landscape returns 21 devices', async ({ page }) => {
    await page.getByTestId('filter-presence-status').click();
    await page.waitForTimeout(500);
    await page.getByTestId('filter-presence-status').selectOption('offline');
    await page.getByTestId('filter-core-services-status').click();
    await page.waitForTimeout(500);
    await page.getByTestId('filter-core-services-status').selectOption('outdated');
    await page.getByTestId('filter-orientation').click();
    await page.waitForTimeout(500);
    await page.getByTestId('filter-orientation').selectOption('landscape');
    await expect(page.getByText('21 devices', { exact: false })).toBeVisible({ timeout: 20000 });
  });
  

});