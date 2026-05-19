## ADDED Requirements

### Requirement: E2E test infrastructure
The system SHALL have a Playwright configuration file (`playwright.config.js`) at the project root, with an npm script `test:e2e` to run E2E tests.

#### Scenario: Playwright config exists
- **WHEN** running E2E tests
- **THEN** `playwright.config.js` provides base URL, test directory (`e2e/`), and browser configuration

#### Scenario: npm script runs E2E tests
- **WHEN** running `npm run test:e2e`
- **THEN** Playwright executes all test files in the `e2e/` directory

### Requirement: All JS modules have unit tests
Every JavaScript module in `assets/js/` SHALL have a corresponding test file in `test/` using Jest with jsdom environment.

#### Scenario: Test file exists for each module
- **WHEN** listing files in `test/`
- **THEN** there are test files for `menu`, `filters`, `search`, `search-shortcut`, and `terminal-command`

#### Scenario: All unit tests pass
- **WHEN** running `npm test`
- **THEN** all Jest tests pass with zero failures
