## Why

The project has 5 JavaScript modules (`terminal-command`, `menu`, `filters`, `search`, `search-shortcut`) but only `terminal-command` has unit tests. There is no E2E test coverage at all. Adding comprehensive tests ensures regressions are caught early and main user flows (navigation, search, filtering, terminal commands) work end-to-end across builds.

## What Changes

- Add unit tests for `menu.js`, `filters.js`, `search.js`, and `search-shortcut.js` using Jest + jsdom (matching existing `terminal-command.test.js` pattern)
- Add Playwright E2E tests covering main site functionalities: terminal commands, menu overlay, archive search, category filters, navigation
- Create `e2e/` directory for Playwright tests, excluded from Jekyll compilation in `_config.yml`
- Add Playwright config (`playwright.config.js`) and npm scripts for E2E test execution
- All unit tests live in existing `test/` directory

## Capabilities

### New Capabilities

- `unit-test-coverage`: Jest unit tests for all JS modules (`menu`, `filters`, `search`, `search-shortcut`) in `test/` directory
- `e2e-test-suite`: Playwright E2E tests in `e2e/` directory covering terminal commands, menu, search, filters, and page navigation flows

### Modified Capabilities

- `code-quality`: Add E2E testing capability alongside existing unit tests; expand test coverage requirements

## Impact

- **Files added**: `test/menu.test.js`, `test/filters.test.js`, `test/search.test.js`, `test/search-shortcut.test.js`, `e2e/` directory with Playwright specs, `playwright.config.js`
- **Files modified**: `package.json` (add E2E scripts), `_config.yml` (add `e2e` to exclude list), `jest.config.js` (no changes needed)
- **Dependencies**: `@playwright/test` (add as devDependency), `jest` and `jest-environment-jsdom` (already present)
- **No breaking changes**: All additions are test-only; no production code modifications
