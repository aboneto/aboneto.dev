import { test, expect } from '@playwright/test';

test.describe('Archive Search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/archivo/');
    await page.waitForSelector('#archive-list .archive-row');
  });

  test('filters posts by title', async ({ page }) => {
    const rows = page.locator('#archive-list .archive-row');
    const totalCount = await rows.count();
    expect(totalCount).toBeGreaterThan(0);

    const firstTitle = await rows.first().locator('h3').textContent();
    const query = firstTitle!.trim().slice(0, 4);

    await page.fill('#archive-search', query);

    const filteredCount = await rows.count();
    expect(filteredCount).toBeLessThanOrEqual(totalCount);
    expect(filteredCount).toBeGreaterThan(0);

    const titles = await rows.locator('h3').allTextContents();
    for (const title of titles) {
      expect(title.toLowerCase()).toContain(query.toLowerCase());
    }
  });

  test('clear search shows all posts', async ({ page }) => {
    const rows = page.locator('#archive-list .archive-row');
    const totalCount = await rows.count();
    expect(totalCount).toBeGreaterThan(0);

    await page.fill('#archive-search', 'xyznonexistent');
    await expect(rows).toHaveCount(1);
    await expect(rows.first().locator('h3')).toHaveText('sin resultados');

    await page.fill('#archive-search', '');
    await expect(rows).toHaveCount(totalCount);
  });

  test('no results shows empty message', async ({ page }) => {
    await page.fill('#archive-search', 'zzz_no_match_query_12345');

    const rows = page.locator('#archive-list .archive-row');
    await expect(rows).toHaveCount(1);
    await expect(rows.first().locator('h3')).toHaveText('sin resultados');
  });
});
