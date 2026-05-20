import { test, expect } from '@playwright/test';

const POST_URL = '/claude-vibe-coding-y-la-falsa-promesa-de-la-autonomia-operativa/';

test.describe('Post detail — clickable categories', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(POST_URL);
  });

  test('each category in frontmatter is an anchor', async ({ page }) => {
    const links = page.locator('.reader-frontmatter .cat-link');
    await expect(links).not.toHaveCount(0);
  });

  test('category hrefs point to /categoria/<slug>/', async ({ page }) => {
    const links = page.locator('.reader-frontmatter .cat-link');
    const count = await links.count();

    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute('href');
      expect(href).toMatch(/^\/categoria\/[a-z0-9-]+\/$/);
    }
  });

  test('category visible text is quoted and non-empty', async ({ page }) => {
    const links = page.locator('.reader-frontmatter .cat-link');
    const count = await links.count();

    for (let i = 0; i < count; i++) {
      const text = await links.nth(i).innerText();
      expect(text).toMatch(/^"[^"]+"$/);
    }
  });

  test('clicking a category navigates to its archive', async ({ page }) => {
    const firstLink = page.locator('.reader-frontmatter .cat-link').first();
    const href = await firstLink.getAttribute('href');

    await firstLink.click();
    await expect(page).toHaveURL(new RegExp(href!.replace(/\//g, '\\/')));
  });
});
