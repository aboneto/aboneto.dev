## 1. HTML — Modify topbar wordmark

- [x] 1.1 Move the `<a>` link to wrap only the text parts (`cd`, `~/aboneto.dev`), excluding `$` prompt and `.cursor` span
- [x] 1.2 Move the `.cursor` span outside the `<a>` tag but inside `.wordmark`, with `role="button"`, `tabindex="0"`, and `data-terminal-cursor` attribute as the activation trigger
- [x] 1.3 Add a hidden `<input>` element inside `.wordmark` after the cursor span, with `placeholder="cd ~/aboneto.dev"`, `autocomplete="off"`, `spellcheck="false"`, `data-terminal-input`
- [x] 1.4 Add `<span class="kbd">⌘.</span>` hint next to the cursor

## 2. SCSS — Style the terminal input

- [x] 2.1 Add `.wordmark-input` styles: hidden by default (`opacity: 0; width: 0; border: none; padding: 0`), with `font-family: $font-mono; color: $ink; background: transparent; caret-color: $accent`
- [x] 2.2 Add `.wordmark-input.active` styles: `opacity: 1; flex: 1; width: auto` — no border, looks like text
- [x] 2.3 Add `.wordmark-input::placeholder` styles: `color: $ink-mute`
- [x] 2.4 Add `.wordmark-input.command-error` styles: error flash animation on text color
- [x] 2.5 Add `.cursor` hover style: `cursor: pointer; opacity: 0.7`
- [x] 2.6 Add `.kbd` styles matching archive page: `font-size: 11px; font-weight: 400; border: 1px solid $rule-strong; border-radius: 2px; padding: 2px 6px`
- [x] 2.7 Add `.wordmark.terminal-active` styles: `flex: 1; margin-right: 24px` to expand input across header
- [x] 2.8 Hide `.cursor` and `.kbd` when `.terminal-active`

## 3. JS — Create terminal-command.js

- [x] 3.1 Create `assets/js/terminal-command.js` with IIFE pattern and `'use strict'`
- [x] 3.2 Implement activation logic: on cursor click or `⌘.` keydown, hide link/cursor/kbd, show input, focus it
- [x] 3.3 Implement deactivation logic: on `Esc` → restore wordmark, focus cursor; on blur empty → restore wordmark
- [x] 3.4 Implement command parser: on `Enter`, parse input (lowercased) with `split(' ')`
- [x] 3.5 Implement `cd` handler: `~/aboneto.dev` → `/`, `~/aboneto.dev/<path>` → `/<path>/`, otherwise `/` + path
- [x] 3.6 Implement `ls` / `ls -la` / `find .` handler: navigate to `/archivo/`
- [x] 3.7 Implement `ls <category>` handler: slugify args, navigate to `/categoria/<slug>/`
- [x] 3.8 Implement `cat <slug>` handler: navigate to `/<slug>/`
- [x] 3.9 Implement error feedback: `.command-error` class, removed after 600ms
- [x] 3.10 Handle empty `Enter`: do nothing
- [x] 3.11 Guard `⌘.` shortcut: only activate when no other input/textarea is focused
- [x] 3.12 On home page (`/`), clicking the logo link activates input instead of navigating
- [x] 3.13 `cd categoria` / `cd categorias` navigates to `/categoria/`

## 4. Categories page

- [x] 4.1 Create `_includes/category-list.html` with shared category list component
- [x] 4.2 Create `_layouts/category-list.html` layout using the include
- [x] 4.3 Create `categoria.html` with `layout: category-list`, `permalink: /categoria/`
- [x] 4.4 Create `categorias.html` with `layout: category-list`, `permalink: /categorias/`
- [x] 4.5 Update `_includes/menu-overlay.html` to use `{% include category-list.html %}`
- [x] 4.6 Update `_sass/_overlay.scss` to use `.category-list-*` classes

## 5. Integration — Wire up in layout

- [x] 5.1 Add `<script>` tag for `terminal-command.js` in `_layouts/default.html` with `defer`, before `menu.js`
- [x] 5.2 Verify asset fingerprinting works (`{% asset assets/js/terminal-command.js %}`)

## 6. Testing & polish

- [x] 6.1 Test all commands: `cd`, `cd ~/aboneto.dev/<path>`, `ls`, `ls -la`, `find .`, `ls <category>`, `cat <post>`, `cd categoria`, invalid commands
- [x] 6.2 Test activation/deactivation: click cursor, `⌘.`, `Esc`, blur empty, `⌘.` again after `Esc`
- [x] 6.3 Test case-insensitive: `CD`, `LS`, `CAT` all work
- [x] 6.4 Test on mobile viewport: input fits within wordmark area
- [x] 6.5 Test wordmark link navigates home when input is not active
- [x] 6.6 Test cursor activates input and does NOT navigate to home
- [x] 6.7 Test home page: clicking logo activates input
- [x] 6.8 Test `⌘.` does not interfere with `⌘K` search on archive page
- [x] 6.9 Test `⌘.` kbd hint matches archive's `⌘K` style
- [x] 6.10 Test `/categoria/` and `/categorias/` both render the same page
- [x] 6.11 Test categories page matches menu overlay style
