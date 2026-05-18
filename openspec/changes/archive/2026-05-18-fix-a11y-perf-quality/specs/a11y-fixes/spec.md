## ADDED Requirements

### Requirement: Skip link for keyboard navigation
The system SHALL include a skip link as the first focusable element in the page that allows keyboard users to bypass the topbar and jump directly to the main content area.

#### Scenario: Skip link is focusable
- **WHEN** a user presses Tab on page load
- **THEN** a "Saltar al contenido" link becomes visible and focused

#### Scenario: Skip link navigates to main content
- **WHEN** a user activates the skip link (Enter or click)
- **THEN** focus moves to the `<main id="main-content">` element

### Requirement: Main landmark element
The system SHALL wrap the primary page content (excluding topbar, footer, and overlay) in a `<main>` HTML element with an `id` attribute for skip link targeting.

#### Scenario: Screen readers identify main content
- **WHEN** a screen reader user navigates by landmarks
- **THEN** the main content area is announced as the "main" landmark

### Requirement: Overlay focus trap
The system SHALL trap keyboard focus within the menu overlay when it is open, cycling Tab and Shift+Tab between the first and last focusable elements inside the overlay.

#### Scenario: Tab does not escape overlay
- **WHEN** the overlay is open and the user presses Tab on the last focusable element
- **THEN** focus moves to the first focusable element in the overlay

#### Scenario: Shift+Tab does not escape overlay
- **WHEN** the overlay is open and the user presses Shift+Tab on the first focusable element
- **THEN** focus moves to the last focusable element in the overlay

### Requirement: Overlay aria-modal behavior
The system SHALL mark the overlay with `aria-modal="true"` and hide the main content from assistive technologies when the overlay is open.

#### Scenario: Overlay announces as modal
- **WHEN** the overlay is open
- **THEN** assistive technologies treat it as a modal dialog and do not read background content

#### Scenario: Background is inert when overlay is open
- **WHEN** the overlay is open
- **THEN** the main content wrapper has `inert` attribute (or `aria-hidden="true"` as fallback)

### Requirement: Keyboard-accessible filter chips
The system SHALL respond to Enter and Space keypresses on filter chip elements, in addition to click events.

#### Scenario: Enter activates filter chip
- **WHEN** a filter chip is focused and the user presses Enter
- **THEN** the filter is applied as if the chip were clicked

#### Scenario: Space activates filter chip
- **WHEN** a filter chip is focused and the user presses Space
- **THEN** the filter is applied as if the chip were clicked
