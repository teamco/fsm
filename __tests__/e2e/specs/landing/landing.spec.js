const { test, expect } = require('@playwright/test');

const { SELECTORS } = require('../../utils/selectots');
const { attachThumb } = require('../../utils/helpers');

const { UI_SERVER } = process.env;

test.describe('Landing suite', () => {
    const baseUrl = `${UI_SERVER}`;

    test(`Navigate to: ${baseUrl}`, async ({ page }, testInfo) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForURL(baseUrl);

        await expect(page).toHaveTitle(/React App/);
        await expect(page.locator(SELECTORS.landing)).toBeVisible();
        await attachThumb({ locator: page, testInfo, name: 'Landing' });

        await expect(page.locator(SELECTORS.cancel)).toBeVisible();
        await expect(page.locator(SELECTORS.pending)).toBeVisible();
        await expect(page.locator(SELECTORS.processing)).not.toBeVisible();
        await expect(page.locator(SELECTORS.shipped)).not.toBeVisible();
        await expect(page.locator(SELECTORS.delivered)).not.toBeVisible();

        expect(page.locator(SELECTORS.counter).filter({ hasText: 'Counter: 0' })).toBeTruthy();
        expect(page.locator('button').filter({ hasText: 'Auto' })).toBeTruthy();
        expect(page.locator('button').filter({ hasText: 'Next' })).toBeTruthy();
        expect(page.locator('button').filter({ hasText: 'Cancel' })).toBeTruthy();
        expect(page.locator('button').filter({ hasText: 'Reset' })).toBeTruthy();

        await page.close();
    });

    test(`Check start button behavior: Auto Start/Stop`, async ({ page }, testInfo) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForURL(baseUrl);

        const autoBtn = page.getByRole('button', { name: /Auto/i });
        const stopBtn = page.getByRole('button', { name: /Stop/i });

        await expect(autoBtn).toBeVisible();
        await expect(stopBtn).not.toBeVisible();

        autoBtn.click();

        await expect(autoBtn).not.toBeVisible();
        await expect(stopBtn).toBeVisible();

        stopBtn.click();

        await expect(autoBtn).toBeVisible();
        await expect(stopBtn).not.toBeVisible();

        await page.close();
    });

    test(`Check next button behavior`, async ({ page }, testInfo) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForURL(baseUrl);

        const nextBtn = page.getByRole('button', { name: /Next/i });
        const cancelBtn = page.getByRole('button', { name: /Cancel/i });

        await expect(nextBtn).toBeVisible();
        await expect(cancelBtn).toBeVisible();

        await expect(page.locator(SELECTORS.cancel)).toBeVisible();
        await expect(page.locator(SELECTORS.pending)).toBeVisible();
        await expect(page.locator(SELECTORS.processing)).not.toBeVisible();
        await expect(page.locator(SELECTORS.shipped)).not.toBeVisible();
        await expect(page.locator(SELECTORS.delivered)).not.toBeVisible();

        // Processing
        nextBtn.click();

        await expect(page.locator(SELECTORS.cancel)).toBeVisible();
        await expect(page.locator(SELECTORS.pending)).not.toBeVisible();
        await expect(page.locator(SELECTORS.processing)).toBeVisible();
        await expect(page.locator(SELECTORS.shipped)).not.toBeVisible();
        await expect(page.locator(SELECTORS.delivered)).not.toBeVisible();

        // Shipping
        nextBtn.click();

        await expect(page.locator(SELECTORS.cancel)).not.toBeVisible();
        await expect(page.locator(SELECTORS.pending)).not.toBeVisible();
        await expect(page.locator(SELECTORS.processing)).not.toBeVisible();
        await expect(page.locator(SELECTORS.shipped)).toBeVisible();
        await expect(page.locator(SELECTORS.delivered)).not.toBeVisible();      
        await expect(cancelBtn).toBeDisabled();      

        // Delivered
        nextBtn.click();

        await expect(page.locator(SELECTORS.cancel)).not.toBeVisible();
        await expect(page.locator(SELECTORS.pending)).not.toBeVisible();
        await expect(page.locator(SELECTORS.processing)).not.toBeVisible();
        await expect(page.locator(SELECTORS.shipped)).not.toBeVisible();
        await expect(page.locator(SELECTORS.delivered)).toBeVisible();
        await expect(cancelBtn).toBeDisabled();

        await page.close();
    });

    test(`Check cancel button behavior`, async ({ page }, testInfo) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForURL(baseUrl);

        const nextBtn = page.getByRole('button', { name: /Next/i });
        const cancelBtn = page.getByRole('button', { name: /Cancel/i });

        await expect(nextBtn).toBeVisible();
        await expect(cancelBtn).toBeVisible();

        await expect(page.locator(SELECTORS.cancel)).toBeVisible();
        await expect(page.locator(SELECTORS.pending)).toBeVisible();
        await expect(page.locator(SELECTORS.processing)).not.toBeVisible();
        await expect(page.locator(SELECTORS.shipped)).not.toBeVisible();
        await expect(page.locator(SELECTORS.delivered)).not.toBeVisible();

        // Processing
        nextBtn.click();

        await expect(page.locator(SELECTORS.cancel)).toBeVisible();
        await expect(page.locator(SELECTORS.pending)).not.toBeVisible();
        await expect(page.locator(SELECTORS.processing)).toBeVisible();
        await expect(page.locator(SELECTORS.shipped)).not.toBeVisible();
        await expect(page.locator(SELECTORS.delivered)).not.toBeVisible();

        // Cancel
        cancelBtn.click();
        
        await expect(page.locator(SELECTORS.cancel)).toBeVisible();
        await expect(page.locator(SELECTORS.pending)).toBeVisible();
        await expect(page.locator(SELECTORS.processing)).not.toBeVisible();
        await expect(page.locator(SELECTORS.shipped)).not.toBeVisible();
        await expect(page.locator(SELECTORS.delivered)).not.toBeVisible();

        await page.close();
    });
});
