## 1. Setup & Infrastructure

- [x] 1.1 Install `@playwright/test` as devDependency and add `test:e2e` npm script to `package.json`
- [x] 1.2 Create `playwright.config.js` at project root with base URL `http://localhost:4000`, test directory `e2e/`, and Chromium browser
- [x] 1.3 Add `e2e` and `playwright.config.js` to the `exclude` list in `_config.yml`
- [x] 1.4 Create `e2e/` directory structure

## 2. Unit Tests — menu.js

- [x] 2.1 Create `test/menu.test.js` with jsdom environment and DOM setup for hamburger, overlay, close button, and terminal elements
- [x] 2.2 Test menu open: hamburger click sets `aria-hidden="false"`, `aria-expanded="true"`, body `menu-open` class, close button focused
- [x] 2.3 Test menu close: close button click restores states, hamburger focused
- [x] 2.4 Test close on Escape key
- [x] 2.5 Test close on overlay background click
- [x] 2.6 Test focus trapping (Tab on last element wraps to first, Shift+Tab on first wraps to last)
- [x] 2.7 Test terminal inert state on menu open/close
- [x] 2.8 Test no-op when `#menu-overlay` missing

## 3. Unit Tests — filters.js

- [x] 3.1 Create `test/filters.test.js` with jsdom environment and DOM setup for filter row, chips, and archive rows
- [x] 3.2 Test chips sorted by `data-count` descending
- [x] 3.3 Test clicking category chip filters archive rows by `data-categories`
- [x] 3.4 Test clicking "all" chip shows all rows
- [x] 3.5 Test active class toggling between chips
- [x] 3.6 Test Enter and Space key activation on chips
- [x] 3.7 Test no-op when filter elements missing

## 4. Unit Tests — search.js

- [x] 4.1 Create `test/search.test.js` with jsdom environment, DOM setup, and `fetch` mock for `/search.json`
- [x] 4.2 Test input resizing on value change
- [x] 4.3 Test posts loaded from `/search.json` on init
- [x] 4.4 Test filtering by title match
- [x] 4.5 Test filtering by excerpt match
- [x] 4.6 Test OR filtering with pipe `|` separator
- [x] 4.7 Test empty query renders all posts
- [x] 4.8 Test no results shows "sin resultados"
- [x] 4.9 Test fetch failure graceful handling

## 5. Unit Tests — search-shortcut.js

- [x] 5.1 Create `test/search-shortcut.test.js` with jsdom environment and DOM setup with `#archive-search` input
- [x] 5.2 Test Cmd+K focuses search input
- [x] 5.3 Test Ctrl+K focuses search input
- [x] 5.4 Test no-op when `#archive-search` missing
- [x] 5.5 Test shortcut works regardless of active element

## 6. E2E Tests — Terminal Commands

- [x] 6.1 Create `e2e/terminal.spec.ts` with Playwright test setup navigating to home page
- [x] 6.2 Test terminal activation via cursor click
- [x] 6.3 Test `cd archivo` navigates to `/archivo/`
- [x] 6.4 Test `ls` navigates to `/archivo/`
- [x] 6.5 Test `find .` navigates to `/archivo/`
- [x] 6.6 Test unknown command shows error animation
- [x] 6.7 Test Escape deactivates terminal

## 7. E2E Tests — Menu Overlay

- [x] 7.1 Create `e2e/menu.spec.ts` with Playwright test setup
- [x] 7.2 Test menu opens via hamburger click
- [x] 7.3 Test menu closes via close button
- [x] 7.4 Test menu closes via Escape key
- [x] 7.5 Test navigation link click navigates to target page

## 8. E2E Tests — Archive Search

- [x] 8.1 Create `e2e/search.spec.ts` with Playwright test setup navigating to archive page
- [x] 8.2 Test search filters posts by title
- [x] 8.3 Test clear search shows all posts
- [x] 8.4 Test no results shows empty message

## 9. E2E Tests — Category Filters

- [x] 9.1 Create `e2e/filters.spec.ts` with Playwright test setup navigating to archive page
- [x] 9.2 Test clicking category chip filters posts
- [x] 9.3 Test clicking "all" chip shows all posts

## 10. Verification

- [x] 10.1 Run `npm test` and verify all unit tests pass
- [x] 10.2 Run `npm run test:e2e` and verify all E2E tests pass
- [x] 10.3 Run `bundle exec jekyll build` and verify `e2e/` is excluded from `_site/`
