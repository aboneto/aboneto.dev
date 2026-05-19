## ADDED Requirements

### Requirement: Menu module unit tests
The system SHALL have Jest unit tests for `assets/js/menu.js` covering open/close behavior, focus trapping, keyboard navigation, and aria state management.

#### Scenario: Menu opens on hamburger click
- **WHEN** the hamburger button is clicked
- **THEN** the overlay `aria-hidden` is set to `"false"`, hamburger `aria-expanded` is `"true"`, body has class `menu-open`, and close button receives focus

#### Scenario: Menu closes on close button click
- **WHEN** the close button is clicked
- **THEN** the overlay `aria-hidden` is set to `"true"`, hamburger `aria-expanded` is `"false"`, body class `menu-open` is removed, and hamburger receives focus

#### Scenario: Menu closes on Escape key
- **WHEN** the Escape key is pressed while menu is open
- **THEN** the menu closes and focus returns to hamburger

#### Scenario: Menu closes on overlay background click
- **WHEN** clicking the overlay background (not a child element)
- **THEN** the menu closes

#### Scenario: Focus is trapped within overlay
- **WHEN** pressing Tab on the last focusable element in the overlay
- **THEN** focus moves to the first focusable element

#### Scenario: Terminal is made inert when menu opens
- **WHEN** the menu opens and a `.v-terminal` element exists
- **THEN** the terminal element has `inert` and `aria-hidden="true"` attributes

#### Scenario: No-op when overlay element missing
- **WHEN** the `#menu-overlay` element does not exist in the DOM
- **THEN** the module initializes without errors

### Requirement: Filters module unit tests
The system SHALL have Jest unit tests for `assets/js/filters.js` covering chip sorting, category filtering, and keyboard activation.

#### Scenario: Chips are sorted by count descending
- **WHEN** the filter row contains chips with `data-count` attributes
- **THEN** chips are reordered in the DOM from highest to lowest count

#### Scenario: Clicking a category chip filters archive rows
- **WHEN** a chip with `data-category="ai"` is clicked
- **THEN** only archive rows whose `data-categories` attribute contains `"ai"` are visible, others are hidden

#### Scenario: Clicking "all" chip shows all rows
- **WHEN** the chip with `data-category="all"` is clicked
- **THEN** all archive rows are visible

#### Scenario: Active chip gets active class
- **WHEN** a chip is clicked
- **THEN** it receives the `active` class and previously active chip loses it

#### Scenario: Enter key activates chip
- **WHEN** pressing Enter on a focused chip
- **THEN** the chip's category filter is applied

#### Scenario: Space key activates chip
- **WHEN** pressing Space on a focused chip
- **THEN** the chip's category filter is applied and the default action is prevented

#### Scenario: No-op when filter elements missing
- **WHEN** `#filter-row` and `.chip[data-category]` elements do not exist
- **THEN** the module initializes without errors

### Requirement: Search module unit tests
The system SHALL have Jest unit tests for `assets/js/search.js` covering input resizing, fetch loading, query filtering, and empty state rendering.

#### Scenario: Search input resizes to match content
- **WHEN** text is typed into the search input
- **THEN** the input width adjusts to fit the text content

#### Scenario: Posts are loaded from search.json on init
- **WHEN** the module initializes
- **THEN** it fetches `/search.json` and stores the result

#### Scenario: Filtering by title match
- **WHEN** a user types a query that matches a post title
- **THEN** only matching posts are rendered in the archive list

#### Scenario: Filtering by excerpt match
- **WHEN** a user types a query that matches a post excerpt
- **THEN** only matching posts are rendered

#### Scenario: OR filtering with pipe separator
- **WHEN** a user types `"react|vue"` as query
- **THEN** posts matching either term are shown

#### Scenario: Empty query shows all posts
- **WHEN** the search input is cleared
- **THEN** all loaded posts are rendered

#### Scenario: No results shows empty state
- **WHEN** no posts match the query
- **THEN** a "sin resultados" message is displayed

#### Scenario: Fetch failure handles gracefully
- **WHEN** the fetch to `/search.json` fails
- **THEN** the posts array is set to empty and no errors are thrown

### Requirement: Search shortcut module unit tests
The system SHALL have Jest unit tests for `assets/js/search-shortcut.js` covering keyboard shortcut activation.

#### Scenario: Cmd+K focuses search input
- **WHEN** pressing Cmd+K (metaKey + 'k')
- **THEN** the `#archive-search` input receives focus

#### Scenario: Ctrl+K focuses search input
- **WHEN** pressing Ctrl+K (ctrlKey + 'k')
- **THEN** the `#archive-search` input receives focus

#### Scenario: No-op when search input missing
- **WHEN** `#archive-search` does not exist in the DOM
- **THEN** pressing Cmd+K does not throw errors

#### Scenario: Shortcut works regardless of active element
- **WHEN** pressing Cmd+K while a button is focused
- **THEN** the search input still receives focus
