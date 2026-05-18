## Requirements

### Requirement: Non-blocking font loading
The system SHALL load Google Fonts via `<link rel="stylesheet">` in the HTML `<head>` instead of `@import` within SASS, ensuring fonts are discovered during HTML parsing rather than after CSS parsing.

#### Scenario: Fonts load without render blocking
- **WHEN** the browser parses the HTML `<head>`
- **THEN** the font stylesheet request is initiated immediately, not deferred until CSS is parsed

### Requirement: Preconnect hints for external domains
The system SHALL include `<link rel="preconnect">` hints for external domains used by the site (fonts.googleapis.com, fonts.gstatic.com) in the HTML `<head>`.

#### Scenario: Early connection establishment
- **WHEN** the browser begins parsing the HTML
- **THEN** DNS lookup and TCP/TLS handshake for font domains start immediately via preconnect

### Requirement: No dead JavaScript files
The system SHALL NOT include JavaScript files that contain no executable code. Files with only Jekyll frontmatter and no actual JS logic SHALL be removed.

#### Scenario: main.js is either removed or contains code
- **WHEN** inspecting the `assets/js/` directory
- **THEN** `main.js` either does not exist or contains actual JavaScript logic
