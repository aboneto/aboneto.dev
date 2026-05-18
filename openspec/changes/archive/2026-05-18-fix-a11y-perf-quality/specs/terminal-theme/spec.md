## MODIFIED Requirements

### Requirement: Typography with IBM Plex fonts
The system SHALL load IBM Plex Sans (body) and IBM Plex Mono (terminal/meta elements) from Google Fonts via `<link rel="stylesheet">` in the HTML `<head>` with `font-display: swap`. The system SHALL NOT use `@import` in SASS files to load external fonts.

#### Scenario: Fonts load without render blocking
- **WHEN** the page loads
- **THEN** the browser discovers the font stylesheet during HTML parsing (not after CSS parsing), text renders immediately with a fallback font and swaps to IBM Plex when loaded

### Requirement: Hamburger menu overlay
The system SHALL render a full-screen overlay when the hamburger button is clicked, showing: close button (`[esc]`), terminal prompt (`$ ls -la categories/`), category navigation with post counts, and recent posts sidebar. The overlay SHALL trap keyboard focus within it and mark the background content as inert when open.

#### Scenario: Menu opens on click
- **WHEN** the hamburger button is clicked
- **THEN** the overlay appears with backdrop blur, category list, and recent posts, with `aria-modal="true"` and focus trapped inside

#### Scenario: Menu closes on escape
- **WHEN** the overlay is open and the user presses Escape
- **THEN** the overlay closes and the hamburger button regains focus

#### Scenario: Tab is trapped within overlay
- **WHEN** the overlay is open and the user presses Tab on the last focusable element
- **THEN** focus cycles to the first focusable element within the overlay
