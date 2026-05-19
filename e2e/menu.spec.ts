import { test, expect } from '@playwright/test';

test.describe('Menu overlay', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('opens via hamburger click', async ({ page }) => {
    const overlay = page.locator('#menu-overlay');
    await expect(overlay).toHaveAttribute('aria-hidden', 'true');

    await page.locator('.hamburger').click();

    await expect(overlay).toHaveAttribute('aria-hidden', 'false');
  });

  test('closes via close button', async ({ page }) => {
    const overlay = page.locator('#menu-overlay');
    await page.locator('.hamburger').click();
    await expect(overlay).toHaveAttribute('aria-hidden', 'false');

    await page.locator('.overlay-close').click();

    await expect(overlay).toHaveAttribute('aria-hidden', 'true');
  });

  test('closes via Escape key', async ({ page }) => {
    const overlay = page.locator('#menu-overlay');
    await page.locator('.hamburger').click();
    await expect(overlay).toHaveAttribute('aria-hidden', 'false');

    await page.keyboard.press('Escape');

    await expect(overlay).toHaveAttribute('aria-hidden', 'true');
  });

  test('navigates to target page on link click', async ({ page }) => {
    await page.locator('.hamburger').click();
    const overlay = page.locator('#menu-overlay');
    await expect(overlay).toHaveAttribute('aria-hidden', 'false');

    const link = overlay.locator('a').first();
    const href = await link.getAttribute('href');
    await link.click();

    await expect(page).toHaveURL(new RegExp(href!));
  });

  test('closes on overlay background click', async ({ page }) => {
    const overlay = page.locator('#menu-overlay');
    await page.locator('.hamburger').click();
    await expect(overlay).toHaveAttribute('aria-hidden', 'false');

    await overlay.click({ position: { x: 5, y: 5 } });

    await expect(overlay).toHaveAttribute('aria-hidden', 'true');
  });
});
