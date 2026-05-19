## MODIFIED Requirements

### Requirement: Keyboard shortcut for search
The system SHALL focus the search input when the user presses `⌘K` (or `Ctrl+K` on non-Mac) while on the archive page, AND SHALL activate the terminal command input when the user presses `⌘.` (or `Ctrl+.` on non-Mac) on any page.

#### Scenario: Keyboard shortcut activates search
- **WHEN** the user presses `⌘K` on the archive page
- **THEN** the search input receives focus

#### Scenario: Keyboard shortcut activates terminal command
- **WHEN** the user presses `⌘.` on any page
- **THEN** the terminal command input in the topbar is activated (wordmark replaced by input with focus)
