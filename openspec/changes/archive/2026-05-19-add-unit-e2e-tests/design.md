## Context

The project is a Jekyll-based personal blog with 5 JavaScript modules handling interactive features: terminal command interface (`terminal-command.js`), navigation menu overlay (`menu.js`), archive category filters (`filters.js`), archive search with fetch (`search.js`), and keyboard search shortcut (`search-shortcut.js`). Currently only `terminal-command.js` has Jest unit tests. There are no E2E tests. The project already has Jest configured (`jest.config.js`, `jest-environment-jsdom`) and Playwright installed as a dependency.

## Goals / Non-Goals

**Goals:**
- Unit test coverage for all 5 JS modules using Jest + jsdom (matching existing pattern in `test/terminal-command.test.js`)
- E2E test suite using Playwright covering main user flows: terminal commands, menu navigation, search, category filtering
- E2E tests excluded from Jekyll build via `_config.yml`
- All tests pass and run via `npm test` (unit) and `npm run test:e2e` (E2E)

**Non-Goals:**
- Modifying production JavaScript code
- Visual regression testing
- Performance/load testing
- CI/CD pipeline configuration
- Testing third-party Jekyll plugins

## Decisions

### 1. Jest + jsdom for unit tests
**Decision**: Use Jest with jsdom environment, matching existing `terminal-command.test.js` pattern.
**Why**: Already configured in the project. The IIFE module pattern used by all JS files works well with `new Function(SOURCE)` loading approach. jsdom provides sufficient DOM API coverage for these modules.
**Alternative**: Vitest — rejected because Jest is already configured and working.

### 2. Playwright for E2E tests
**Decision**: Use Playwright (already in `package.json` dependencies) with `@playwright/test` framework.
**Why**: Already installed. Provides real browser testing, auto-waiting, and good debugging. Covers the gap that unit tests with jsdom cannot (actual navigation, fetch requests, CSS transitions).
**Alternative**: Cypress — rejected because Playwright is already a dependency and is faster.

### 3. Module loading via source reading (unit tests)
**Decision**: Read JS source files with `fs.readFileSync` and execute via `new Function()`, matching existing pattern.
**Why**: All modules are IIFEs that self-execute on load. This pattern allows re-execution in each test's fresh jsdom context. No module export needed.
**Alternative**: Transform to ES modules — rejected as it would require production code changes.

### 4. E2E directory structure
**Decision**: Create `e2e/` at project root with `playwright.config.js`. Add `e2e` to `_config.yml` exclude list.
**Why**: Clean separation from unit tests. Jekyll exclude prevents build interference.
**Alternative**: `test/e2e/` — rejected to keep unit and E2E tests clearly separated.

### 5. Subagent delegation for parallel work
**Decision**: Use Task tool subagents to parallelize unit test creation and E2E test creation.
**Why**: 4 unit test files and E2E specs are independent. Subagents keep main context lightweight.
**Alternative**: Sequential inline work — slower and consumes more main context.

## Risks / Trade-offs

- **jsdom limitations**: Some DOM behaviors (CSS transitions, layout calculations) are not fully simulated in jsdom. Mitigation: E2E tests cover real browser behavior.
- **Fetch mocking in search.js**: jsdom doesn't have native fetch; need to mock `window.fetch` or inject posts data. Mitigation: Use `jest.fn()` to mock fetch responses.
- **Playwright browser download**: First `npx playwright install` may be needed. Mitigation: Document in tasks.
- **Test maintenance**: Adding tests for 4 new modules increases maintenance surface. Mitigation: Keep tests focused on behavior, not implementation details.
