## Why

The blog's wordmark (`$ cd ~/aboneto.dev`) already mimics a terminal prompt, but it's purely decorative. Making it interactive turns the logo into a functional command palette — a discoverable, terminal-native navigation mechanism that reinforces the dev aesthetic while providing fast keyboard-driven navigation across the site.

## What Changes

- The wordmark in the topbar becomes interactive: clicking the blinking cursor (or pressing `⌘T`) replaces the static text with a text input styled as a terminal command line. The wordmark text (`$ cd ~/aboneto.dev`) remains a clickable link to home — only the cursor triggers the input.
- The input accepts typed commands that navigate to different sections of the blog:
  - `cd <path>` — navigate to a URL relative to `~/aboneto.dev` (e.g., `cd archivo` → `/archivo/`)
  - `ls` or `ls -la` — navigate to `/archivo/`
  - `ls <category>` — navigate to `/categoria/<category>/`
  - `cat <post-slug>` — navigate to `/<post-slug>/`
  - `find .` — navigate to `/archivo/`
- Leaving the input empty and blurring, or pressing `Esc`, restores the original wordmark.
- Visual feedback: invalid commands show a brief "command not found" flash before resetting.
- A new JS module (`terminal-command.js`) handles all logic; SCSS additions style the input to match the existing terminal theme.

## Capabilities

### New Capabilities
- `terminal-command`: Interactive command input in the topbar wordmark that accepts terminal-like commands for site navigation. Covers activation (click cursor / `⌘T`), command parsing, navigation routing, error feedback, and deactivation (blur empty / `Esc`).

### Modified Capabilities
- `client-interactions`: Adds a new keyboard shortcut (`⌘T`) alongside the existing `⌘K` search shortcut. No changes to existing requirements.

## Impact

- **Files modified**: `_includes/topbar.html` (add hidden input), `_sass/_topbar.scss` (input styles), `assets/js/terminal-command.js` (new file)
- **Files potentially modified**: `_includes/menu-overlay.html` (if wordmark duplication needs sync)
- **No dependencies added**: Vanilla JS only, consistent with existing codebase
- **No breaking changes**: The wordmark link remains functional; the input overlays it only when activated
- **SEO/Performance**: Minimal — one small JS file (~100 lines), deferred loading, no external libraries
