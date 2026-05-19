import { test, expect } from '@playwright/test';

test.describe('Archive category filters', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/archivo/');
    await page.waitForSelector('.archive-row[data-categories]');
  });

  test('clicking category chip filters posts', async ({ page }) => {
    const chips = page.locator('.chip[data-category]');
    const chipCount = await chips.count();
    expect(chipCount).toBeGreaterThan(0);

    const nonAllChip = page.locator('.chip[data-category]:not([data-category="all"])').first();
    const category = await nonAllChip.getAttribute('data-category');
    expect(category).toBeTruthy();

    await nonAllChip.click();

    await expect(nonAllChip).toHaveClass(/active/);

    const rows = page.locator('.archive-row[data-categories]');
    const rowCount = await rows.count();

    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);
      const isVisible = await row.isVisible();
      const categories = await row.getAttribute('data-categories');

      if (categories && categories.includes(category!)) {
        expect(isVisible).toBe(true);
      } else {
        expect(isVisible).toBe(false);
      }
    }
  });

  test('clicking "all" chip shows all posts', async ({ page }) => {
    const nonAllChip = page.locator('.chip[data-category]:not([data-category="all"])').first();
    await nonAllChip.click();

    const allChip = page.locator('.chip[data-category="all"]');
    await allChip.click();

    await expect(allChip).toHaveClass(/active/);

    const rows = page.locator('.archive-row[data-categories]');
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);

    for (let i = 0; i < rowCount; i++) {
      await expect(rows.nth(i)).toBeVisible();
    }
  });
});
