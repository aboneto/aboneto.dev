## ADDED Requirements

### Requirement: Wordmark text remains a home link
The wordmark text (`$ cd ~/aboneto.dev`) SHALL remain a clickable link to `/` at all times when the terminal input is not active. Only the cursor element is the activation trigger for the command input. The `$` prompt SHALL always remain visible, both when the input is active and inactive.

#### Scenario: Clicking wordmark text navigates home
- **WHEN** the user clicks on the `cd` or `~/aboneto.dev` text in the wordmark
- **THEN** the browser navigates to `/` (the wordmark link behavior is preserved)

#### Scenario: Cursor is visually distinct as interactive
- **WHEN** the user hovers over the blinking cursor element
- **THEN** the cursor shows a pointer cursor style and reduced opacity to indicate it is clickable

#### Scenario: Wordmark link and input coexist in DOM
- **WHEN** the terminal input is not active
- **THEN** the wordmark `<a>` link is fully functional and the hidden input has no effect on layout or click targets

### Requirement: Terminal command input activation
The system SHALL replace the wordmark text (excluding the `$` prompt) with a command input when the user clicks the blinking cursor, clicks the logo text on the home page, or presses `⌘.` (or `Ctrl+.` on non-Mac).

#### Scenario: Activate by clicking cursor
- **WHEN** the user clicks the blinking cursor element in the wordmark
- **THEN** the wordmark link content is hidden and a text input appears in its place with focus, styled as terminal text with the `$` prompt always visible

#### Scenario: Activate by clicking logo on home page
- **WHEN** the user is on the home page (`/`) and clicks the wordmark text (`cd ~/aboneto.dev`)
- **THEN** the wordmark link is hidden and the terminal input is activated instead of navigating to `/`

#### Scenario: Activate by keyboard shortcut
- **WHEN** the user presses `⌘.` (or `Ctrl+.` on non-Mac) and no other input is focused
- **THEN** the wordmark link is hidden and a text input appears in its place with focus, with `$` prompt visible

#### Scenario: Shortcut ignored when input is focused
- **WHEN** the user presses `⌘.` while another text input already has focus
- **THEN** the shortcut does not activate the terminal command input

### Requirement: Terminal command input deactivation
The system SHALL restore the original wordmark when the input is deactivated.

#### Scenario: Deactivate by pressing Escape
- **WHEN** the command input is active and the user presses `Esc`
- **THEN** the input is hidden, the original wordmark link is restored, and focus returns to the cursor element so `⌘.` can be pressed again immediately

#### Scenario: Deactivate by blurring empty input
- **WHEN** the command input is active, has no text, and loses focus (blur)
- **THEN** the input is hidden and the original wordmark link is restored

#### Scenario: Successful navigation does not need restore
- **WHEN** the user enters a valid command and presses `Enter`
- **THEN** the browser navigates to the target URL and the page reloads naturally

### Requirement: Command parsing — cd
The system SHALL parse `cd` commands and navigate to the corresponding path. Commands SHALL be case-insensitive.

#### Scenario: cd with relative path
- **WHEN** the user types `cd archivo` and presses `Enter`
- **THEN** the browser navigates to `/archivo/`

#### Scenario: cd with home alias
- **WHEN** the user types `cd ~/aboneto.dev` and presses `Enter`
- **THEN** the browser navigates to `/`

#### Scenario: cd with home prefix and subpath
- **WHEN** the user types `cd ~/aboneto.dev/archivo` and presses `Enter`
- **THEN** the browser navigates to `/archivo/` (strips the `~/aboneto.dev/` prefix)

#### Scenario: cd with category path
- **WHEN** the user types `cd categoria/vibe-coding` and presses `Enter`
- **THEN** the browser navigates to `/categoria/vibe-coding/`

#### Scenario: cd to categories listing
- **WHEN** the user types `cd categoria` or `cd categorias` and presses `Enter`
- **THEN** the browser navigates to `/categoria/` (categories listing page)

#### Scenario: cd is case-insensitive
- **WHEN** the user types `CD Archivo` and presses `Enter`
- **THEN** the browser navigates to `/archivo/`

### Requirement: Command parsing — ls and find
The system SHALL parse `ls` and `find` commands for archive navigation.

#### Scenario: ls without arguments
- **WHEN** the user types `ls` and presses `Enter`
- **THEN** the browser navigates to `/archivo/`

#### Scenario: ls with -la flag
- **WHEN** the user types `ls -la` and presses `Enter`
- **THEN** the browser navigates to `/archivo/`

#### Scenario: find dot command
- **WHEN** the user types `find .` and presses `Enter`
- **THEN** the browser navigates to `/archivo/`

### Requirement: Command parsing — ls category
The system SHALL parse `ls <category>` commands and navigate to the category page.

#### Scenario: ls with category name
- **WHEN** the user types `ls vibe coding` and presses `Enter`
- **THEN** the browser navigates to `/categoria/vibe-coding/`

#### Scenario: ls with hyphenated category
- **WHEN** the user types `ls vibe-coding` and presses `Enter`
- **THEN** the browser navigates to `/categoria/vibe-coding/`

#### Scenario: ls with multi-word category
- **WHEN** the user types `ls software engineering` and presses `Enter`
- **THEN** the browser navigates to `/categoria/software-engineering/`

### Requirement: Command parsing — cat post
The system SHALL parse `cat <slug>` commands and navigate to the post page.

#### Scenario: cat with post slug
- **WHEN** the user types `cat golden-signals-monitoreo-eficiente-para-un-desarrollo-de-software-exitoso` and presses `Enter`
- **THEN** the browser navigates to `/golden-signals-monitoreo-eficiente-para-un-desarrollo-de-software-exitoso/`

#### Scenario: cat with unknown slug
- **WHEN** the user types `cat non-existent-post` and presses `Enter`
- **THEN** the browser navigates to `/non-existent-post/` and Jekyll's 404 page handles the response

### Requirement: Invalid command error feedback
The system SHALL show a brief error flash when the user enters an unrecognized command.

#### Scenario: Unknown command
- **WHEN** the user types `rm -rf /` and presses `Enter`
- **THEN** the input border flashes red briefly (~600ms) and the input remains active for retry

#### Scenario: Empty command on Enter
- **WHEN** the input is empty and the user presses `Enter`
- **THEN** nothing happens (no navigation, no error)

### Requirement: Input visual styling
The command input SHALL match the existing terminal aesthetic of the wordmark. A `⌘.` keyboard hint SHALL be displayed next to the cursor when the input is not active.

#### Scenario: Input appearance
- **WHEN** the command input is active
- **THEN** it displays with `$font-mono` font, `$ink` text color, `$bg` background, no visible border, and a blinking cursor matching the existing `.cursor` style

#### Scenario: Placeholder text
- **WHEN** the command input is active and empty
- **THEN** it shows placeholder text "cd ~/aboneto.dev" in `$ink-mute` color

#### Scenario: Keyboard hint visible
- **WHEN** the terminal input is not active
- **THEN** a `⌘.` hint is displayed next to the cursor using the `.kbd` style (same as archive page's `⌘K`)

#### Scenario: Keyboard hint hidden when active
- **WHEN** the terminal input is active
- **THEN** the `⌘.` hint and cursor are both hidden

### Requirement: Categories listing page
The system SHALL have pages at `/categoria/` and `/categorias/` that list all categories sorted by post volume. Both pages SHALL use the same layout (`_layouts/category-list.html`) which includes the shared category list component (`_includes/category-list.html`). The same component SHALL be used in the menu overlay.

#### Scenario: Categories page displays all categories
- **WHEN** the user navigates to `/categoria/` or `/categorias/`
- **THEN** a page is displayed showing all categories sorted by number of posts (descending), with each category linking to its page

#### Scenario: Categories page uses shared layout
- **WHEN** the user views `/categoria/` and `/categorias/`
- **THEN** both pages render identical content using `_layouts/category-list.html`

#### Scenario: Categories page uses shared component with menu overlay
- **WHEN** the user views the categories page and the menu overlay
- **THEN** both display the same category list layout and styling via `_includes/category-list.html`
