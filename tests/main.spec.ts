import { test, expect } from '@playwright/test';

test('main page looks correct', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.click('#excalibur-play');
  await page.waitForTimeout(1500);
  await expect(page).toHaveScreenshot();
});