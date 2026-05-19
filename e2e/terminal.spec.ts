import { test, expect } from '@playwright/test';

test.describe('Terminal command interface', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('activates terminal via cursor click', async ({ page }) => {
    const cursor = page.locator('[data-terminal-cursor]');
    const input = page.locator('[data-terminal-input]');

    await cursor.click();

    await expect(input).toBeVisible();
    await expect(input).toBeFocused();
  });

  test('cd archivo navigates to /archivo/', async ({ page }) => {
    await page.locator('[data-terminal-cursor]').click();
    await page.locator('[data-terminal-input]').fill('cd archivo');
    await page.keyboard.press('Enter');

    await expect(page).toHaveURL(/\/archivo\/$/);
  });

  test('ls navigates to /archivo/', async ({ page }) => {
    await page.locator('[data-terminal-cursor]').click();
    await page.locator('[data-terminal-input]').fill('ls');
    await page.keyboard.press('Enter');

    await expect(page).toHaveURL(/\/archivo\/$/);
  });

  test('find . navigates to /archivo/', async ({ page }) => {
    await page.locator('[data-terminal-cursor]').click();
    await page.locator('[data-terminal-input]').fill('find .');
    await page.keyboard.press('Enter');

    await expect(page).toHaveURL(/\/archivo\/$/);
  });

  test('cat navigates to a post', async ({ page }) => {
    await page.locator('[data-terminal-cursor]').click();
    await page.locator('[data-terminal-input]').fill('cat golden-signals-monitoreo-eficiente-para-un-desarrollo-de-software-exitoso');
    await page.keyboard.press('Enter');

    await expect(page).toHaveURL(/\/golden-signals-monitoreo-eficiente-para-un-desarrollo-de-software-exitoso\/$/);
  });

  test('unknown command shows error animation', async ({ page }) => {
    await page.locator('[data-terminal-cursor]').click();
    await page.locator('[data-terminal-input]').fill('rm -rf /');
    await page.keyboard.press('Enter');

    await expect(page.locator('[data-terminal-input]')).toHaveClass(/command-error/);
  });

  test('Escape deactivates terminal', async ({ page }) => {
    await page.locator('[data-terminal-cursor]').click();
    await expect(page.locator('[data-terminal-input]')).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(page.locator('[data-terminal-input]')).not.toBeVisible();
    await expect(page.locator('.wordmark-link')).toBeVisible();
  });
});
