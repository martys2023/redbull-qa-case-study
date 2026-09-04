import { test, expect } from '@playwright/test';

test.describe('Tables Page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/tables');
  });

  test('should display valid email addresses in Email column', async ({ page }) => {
    const emailCells = page.locator('#table1 td:nth-child(3)');
    const count = await emailCells.count();

    for (let i = 0; i < count; i++) {
      const email = await emailCells.nth(i).innerText();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      expect(email).toMatch(emailRegex);
    }
  });

  test('should display valid values in Due column', async ({ page }) => {
    const dueCells = page.locator('#table1 td:nth-child(4)');
    const count = await dueCells.count();

    for (let i = 0; i < count; i++) {
      const due = await dueCells.nth(i).innerText();
      const dueRegex = /^\$\d+\.\d{2}$/;
      expect(due).toMatch(dueRegex);
    }
  });

});