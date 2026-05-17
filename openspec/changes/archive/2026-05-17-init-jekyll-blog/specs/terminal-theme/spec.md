## ADDED Requirements

### Requirement: Design system variables
The system SHALL define all design tokens as SASS variables matching the mockup: `--bg: #0a1530`, `--bg-elev: #0d1a3a`, `--ink: #d8e1f5`, `--ink-soft: #9aa6c4`, `--ink-mute: #5c6890`, `--accent: #7aa2ff`, `--accent-bright: #b8d0ff`, `--green: #7ad6a3`, `--rule`, `--rule-strong`.

#### Scenario: Variables are available in all components
- **WHEN** any SASS partial references a design token
- **THEN** the compiled CSS uses the correct color value

### Requirement: Typography with IBM Plex fonts
The system SHALL load IBM Plex Sans (body) and IBM Plex Mono (terminal/meta elements) from Google Fonts with `font-display: swap`.

#### Scenario: Fonts load without render blocking
- **WHEN** the page loads
- **THEN** text renders immediately with a fallback font and swaps to IBM Plex when loaded

### Requirement: Scanline grid background
The system SHALL render a subtle scanline-grid background on the `.v-terminal` container using CSS pseudo-element, matching the mockup pattern (56px grid, `rgba(255,255,255,0.012)` lines).

#### Scenario: Background renders
- **WHEN** viewing any page with the terminal theme
- **THEN** a subtle grid overlay is visible behind the content

### Requirement: Topbar with terminal prompt
The system SHALL render a topbar with wordmark showing `$ cd ~/aboneto.dev` with blinking cursor, navigation links (`/archivo`, `/feed.xml`), and hamburger button.

#### Scenario: Wordmark displays correctly
- **WHEN** any page loads
- **THEN** the topbar shows `$` in green, `cd` in default ink, `~/aboneto.dev` in accent blue, and a blinking cursor

#### Scenario: Hamburger button is visible on mobile
- **WHEN** viewport is below 768px
- **THEN** the hamburger button is visible and the navigation links are hidden

### Requirement: Home layout with hero and post list
The system SHALL render a home page with: featured post hero section (title with `>_` prefix, excerpt, metadata), followed by a numbered list of recent posts with thumbnails, dates, reading times.

#### Scenario: Featured post renders in hero
- **WHEN** a post has `featured: true` in frontmatter
- **THEN** it renders in the hero section with image, title, excerpt, and metadata

#### Scenario: Recent posts list renders
- **WHEN** the home page loads
- **THEN** up to 7 non-featured posts display in a numbered row format with `[01]`, date, thumbnail, title, excerpt, and reading time

### Requirement: Post layout with visible frontmatter
The system SHALL render individual posts with a visible YAML frontmatter block (styled as a terminal code block with `---` delimiters, colored keys/values), followed by title, cover image, and body content.

#### Scenario: Frontmatter block renders
- **WHEN** viewing a post page
- **THEN** the frontmatter (title, date, reading_time, categories, tags, image) is displayed in a styled code block with syntax-highlighted keys and values

#### Scenario: Post body renders with terminal styling
- **WHEN** the post body contains headings, blockquotes, code blocks, and lists
- **THEN** headings use `## ` prefix with green color, blockquotes use `> ` prefix with accent-blue background, code blocks have dark background with language label, and lists use `→` markers

### Requirement: Category page layout
The system SHALL render category pages with breadcrumb path (`~/aboneto.dev/categoria/<name>`), category title with `#` prefix, stats (post count, last update, avg read time), and filtered post list.

#### Scenario: Category page shows filtered posts
- **WHEN** navigating to a category archive page
- **THEN** only posts belonging to that category are listed with the same row format as the home page

### Requirement: Archive page with search and filters
The system SHALL render an archive page with breadcrumb, stats, search bar (styled as terminal prompt with `/` prefix and `⌘K` kbd), category filter chips, and chronological post list.

#### Scenario: Search bar renders
- **WHEN** viewing the archive page
- **THEN** a search bar with `>` prompt, input field, and `⌘K` indicator is visible

#### Scenario: Category chips render
- **WHEN** viewing the archive page
- **THEN** a "todos" chip and one chip per category with post count are displayed

### Requirement: Author section
The system SHALL render an author section with photo placeholder (initials in gradient), `// whoami` tag, name, role, bio, and metadata sidebar (location, writes_about, contact links).

#### Scenario: Author data renders from YAML
- **WHEN** the author section is visible
- **THEN** all fields from `_data/author.yml` are rendered in the correct layout

### Requirement: Footer
The system SHALL render a footer with terminal-style copyright (`$ echo "© 2026 a.boneto · build: ..."`) and links to rss, json, sitemap.

#### Scenario: Footer renders on all pages
- **WHEN** any page loads
- **THEN** the footer is visible at the bottom with copyright and link list

### Requirement: Hamburger menu overlay
The system SHALL render a full-screen overlay when the hamburger button is clicked, showing: close button (`[esc]`), terminal prompt (`$ ls -la categories/`), category navigation with post counts, and recent posts sidebar.

#### Scenario: Menu opens on click
- **WHEN** the hamburger button is clicked
- **THEN** the overlay appears with backdrop blur, category list, and recent posts

#### Scenario: Menu closes on escape
- **WHEN** the overlay is open and the user presses Escape
- **THEN** the overlay closes and the hamburger button regains focus

### Requirement: Responsive design
The system SHALL be responsive from mobile (320px) to desktop (1440px+), with the grid layouts collapsing appropriately on smaller screens.

#### Scenario: Mobile layout adapts
- **WHEN** viewport is below 768px
- **THEN** the hero grid becomes single-column, post rows stack vertically, and the author section becomes single-column
