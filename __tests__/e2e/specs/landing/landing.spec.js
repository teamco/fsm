const { test, expect } = require('@playwright/test');

const { SELECTORS } = require('../../utils/selectots');
const { attachThumb } = require('../../utils/helpers');

test.describe('Landing suite', () => {
  const baseUrl = `http://localhost:3000`;

  test(`Navigate to: ${baseUrl}`, async ({ page }) => {
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForURL(baseUrl);

    await expect(page).toHaveTitle(/React App/);
    await expect(page.locator(SELECTORS.landing)).toBeVisible();
  });

  // test(`Handle 404: ${_404}`, async ({ page }, testInfo) => {
  //   await page.goto(`${_404}`, { waitUntil: 'domcontentloaded' });
  //   await page.waitForURL(`${_404}`);

  //   await expect(page.locator(SELECTORS.page404)).toBeVisible();
  //   await attachThumb({ locator: page, testInfo, name: 'page404' });
  // });
});
