const { test, expect } = require('@playwright/test');

const { SELECTORS } = require('../../utils/selectots');
const { attachThumb } = require('../../utils/helpers');

const {
  UI_SERVER
} = process.env;

test.describe('Landing suite', () => {
  const baseUrl = `${UI_SERVER}`;

  test(`Navigate to: ${baseUrl}`, async ({ page }, testInfo) => {
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForURL(baseUrl);

    await expect(page).toHaveTitle(/React App/);
    await expect(page.locator(SELECTORS.landing)).toBeVisible();
    await attachThumb({ locator: page, testInfo, name: 'Landing' });

    await expect(page.locator(SELECTORS.redLight)).toBeVisible();
    await expect(page.locator(SELECTORS.blinkLight)).not.toBeVisible();
    await expect(page.locator(SELECTORS.yellowLight)).not.toBeVisible();
    await expect(page.locator(SELECTORS.greenLight)).not.toBeVisible();
    
    expect(page.locator(SELECTORS.counter).filter({ hasText: "Counter: 0" })).toBeTruthy();
    expect(page.locator('button').filter({ hasText: "Start" })).toBeTruthy();
    
    await page.close();
  });

  test(`Check start button behavior: Start/Clear`, async ({ page }, testInfo) => {
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForURL(baseUrl);

    await expect(page.getByRole('button', { name: /Start/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Clear/i })).not.toBeVisible();

    await page.getByRole('button', { name: /Start/i }).click();
    
    await expect(page.getByRole('button', { name: /Start/i })).not.toBeVisible();
    await expect(page.getByRole('button', { name: /Clear/i })).toBeVisible();

    await page.getByRole('button', { name: /Clear/i }).click();
    
    await expect(page.getByRole('button', { name: /Start/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Clear/i })).not.toBeVisible();

    await page.close();
  });
});
