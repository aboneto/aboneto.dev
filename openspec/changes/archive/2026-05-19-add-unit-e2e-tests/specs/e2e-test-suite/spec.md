## ADDED Requirements

### Requirement: Terminal command E2E tests
The system SHALL have Playwright E2E tests for the terminal command interface covering real browser navigation and command execution.

#### Scenario: Activate terminal via cursor click
- **WHEN** the user visits the home page and clicks the terminal cursor element
- **THEN** the terminal input becomes visible and receives focus

#### Scenario: Execute cd command navigates to archive
- **WHEN** the terminal is active and the user types `cd archivo` and presses Enter
- **THEN** the browser navigates to `/archivo/`

#### Scenario: Execute ls command navigates to archive
- **WHEN** the terminal is active and the user types `ls` and presses Enter
- **THEN** the browser navigates to `/archivo/`

#### Scenario: Execute find command navigates to archive
- **WHEN** the terminal is active and the user types `find .` and presses Enter
- **THEN** the browser navigates to `/archivo/`

#### Scenario: Unknown command shows error animation
- **WHEN** the terminal is active and the user types `rm -rf /` and presses Enter
- **THEN** the input shows the error animation class

#### Scenario: Deactivate terminal on Escape
- **WHEN** the terminal is active and the user presses Escape
- **THEN** the terminal input is hidden and the wordmark link is visible again

### Requirement: Menu overlay E2E tests
The system SHALL have Playwright E2E tests for the navigation menu overlay.

#### Scenario: Open menu via hamburger
- **WHEN** the user clicks the hamburger button
- **THEN** the menu overlay becomes visible with `aria-hidden="false"`

#### Scenario: Close menu via close button
- **WHEN** the menu is open and the user clicks the close button
- **THEN** the menu overlay becomes hidden with `aria-hidden="true"`

#### Scenario: Close menu via Escape key
- **WHEN** the menu is open and the user presses Escape
- **THEN** the menu closes

#### Scenario: Navigate to a section from menu
- **WHEN** the menu is open and the user clicks a navigation link
- **THEN** the browser navigates to the linked page

### Requirement: Archive search E2E tests
The system SHALL have Playwright E2E tests for the archive search functionality.

#### Scenario: Search filters posts by title
- **WHEN** the user visits the archive page and types a search query matching a post title
- **THEN** only matching posts are displayed in the archive list

#### Scenario: Clear search shows all posts
- **WHEN** the user clears the search input after filtering
- **THEN** all posts are displayed again

#### Scenario: No results shows empty message
- **WHEN** the user types a query that matches no posts
- **THEN** a "sin resultados" message is shown

### Requirement: Category filter E2E tests
The system SHALL have Playwright E2E tests for the archive category filtering.

#### Scenario: Filter by category
- **WHEN** the user clicks a category chip on the archive page
- **THEN** only posts belonging to that category are visible

#### Scenario: Show all categories
- **WHEN** the user clicks the "all" chip
- **THEN** all posts are visible regardless of category

### Requirement: E2E directory excluded from Jekyll
The `e2e/` directory SHALL be added to the `exclude` list in `_config.yml` so Playwright test files are not processed by Jekyll.

#### Scenario: Jekyll build excludes e2e directory
- **WHEN** running `bundle exec jekyll build`
- **THEN** the `_site/` output does not contain any `e2e/` directory or test files
