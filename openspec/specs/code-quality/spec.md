## Requirements

### Requirement: Single shared animation definitions
The system SHALL define `@keyframes blink` in exactly one SASS partial (`_animations.scss`) and import it via `@use` where needed, eliminating duplication across `_topbar.scss` and `_overlay.scss`.

#### Scenario: No duplicate keyframes in compiled CSS
- **WHEN** building the site
- **THEN** the compiled CSS contains exactly one `@keyframes blink` definition

### Requirement: Syntax colors use design system variables
The system SHALL define syntax highlighting colors as SCSS variables in `_variables.scss` and reference them in `_syntax.scss`, instead of using hardcoded hex values.

#### Scenario: Syntax colors are maintainable
- **WHEN** a syntax color variable is changed in `_variables.scss`
- **THEN** all syntax highlighting using that variable updates accordingly

### Requirement: Absolute author photo path
The system SHALL use a leading-slash absolute path (`/assets/img/antonio-barbosa.webp`) for the author photo in `_data/author.yml`, ensuring the image resolves correctly from any URL depth.

#### Scenario: Author photo loads on subdirectory pages
- **WHEN** viewing a page at `/categoria/example/`
- **THEN** the author photo loads from `/assets/img/antonio-barbosa.webp` (not relative to the subdirectory)

### Requirement: No !important in stylesheets
The system SHALL NOT use `!important` declarations in custom SASS files. Specificity SHALL be increased through selector nesting or specificity instead.

#### Scenario: Overrides work without !important
- **WHEN** a style needs to override another
- **THEN** the override is achieved through higher-specificity selectors

### Requirement: Spanish paginate path
The system SHALL use a Spanish-language path for pagination (`articulos/:num/`) instead of Portuguese (`artigos/:num/`).

#### Scenario: Pagination URLs are in Spanish
- **WHEN** navigating to page 2 of the blog
- **THEN** the URL is `/articulos/2/` (not `/artigos/2/`)

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
