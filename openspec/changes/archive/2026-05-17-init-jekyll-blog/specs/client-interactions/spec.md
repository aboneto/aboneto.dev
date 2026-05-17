## ADDED Requirements

### Requirement: Hamburger menu toggle
The system SHALL have a JS vanilla module that toggles the hamburger menu overlay open/closed on button click, and closes on Escape key press.

#### Scenario: Menu opens on button click
- **WHEN** the user clicks the hamburger button
- **THEN** the overlay receives `aria-hidden="false"` and becomes visible with backdrop blur

#### Scenario: Menu closes on Escape
- **WHEN** the overlay is open and the user presses Escape
- **THEN** the overlay receives `aria-hidden="true"` and focus returns to the hamburger button

#### Scenario: Menu closes on backdrop click
- **WHEN** the overlay is open and the user clicks outside the menu content
- **THEN** the overlay closes

### Requirement: Client-side search
The system SHALL have a JS module that fetches a generated `search.json` at runtime, filters posts by title and excerpt matching the user's query, and renders results in the archive list.

#### Scenario: Search filters posts
- **WHEN** the user types "microservicios" in the search input
- **THEN** only posts whose title or excerpt contain "microservicios" are displayed

#### Scenario: Empty query shows all posts
- **WHEN** the search input is empty
- **THEN** all posts are displayed in chronological order

#### Scenario: No results message
- **WHEN** the query matches no posts
- **THEN** a "sin resultados" message is displayed

### Requirement: Category filter chips
The system SHALL have a JS module that filters the archive post list by category when a chip is clicked, toggling the active state.

#### Scenario: Filter by category
- **WHEN** the user clicks the `#arquitectura` chip
- **THEN** only posts in the `arquitectura` category are displayed and the chip has `active` class

#### Scenario: Show all posts
- **WHEN** the user clicks the "todos" chip
- **THEN** all posts are displayed and "todos" chip has `active` class

### Requirement: Search index generation
The system SHALL generate a `search.json` file at the site root containing an array of objects with `title`, `url`, `excerpt`, `categories`, `date`, and `reading_time` for every published post.

#### Scenario: Search index contains all posts
- **WHEN** building the site
- **THEN** `search.json` contains one entry per published post with correct data

### Requirement: Keyboard shortcut for search
The system SHALL focus the search input when the user presses `⌘K` (or `Ctrl+K` on non-Mac) while on the archive page.

#### Scenario: Keyboard shortcut activates search
- **WHEN** the user presses `⌘K` on the archive page
- **THEN** the search input receives focus

### Requirement: JavaScript deferred loading
All JavaScript files SHALL use the `defer` attribute to avoid blocking page render.

#### Scenario: JS does not block render
- **WHEN** the page loads
- **THEN** HTML renders before JavaScript executes
