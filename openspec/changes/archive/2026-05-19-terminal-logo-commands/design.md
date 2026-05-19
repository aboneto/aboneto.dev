## Context

The blog's topbar wordmark (`$ cd ~/aboneto.dev` with a blinking cursor) is purely decorative. The site already has a strong terminal aesthetic — scanline grids, `$` prompts, `//` comments, YAML frontmatter visible — but the logo doesn't do anything. The user wants to turn it into a functional command input that navigates the blog using terminal-like commands.

Current state:
- `_includes/topbar.html` contains the wordmark as an `<a>` link wrapping `<span>` elements
- `_sass/_topbar.scss` styles it with mono font, green prompt, accent path, blinking cursor
- Existing JS modules use vanilla IIFE pattern with `defer`
- Category URLs follow `/categoria/<slugified-name>/` (jekyll-archives with `slugify` filter)
- Post URLs follow `/<title-slug>/` (permalink: `/:title`)
- The archive page is at `/archivo/`
- Existing keyboard shortcut: `⌘K` focuses search input on archive page (`search-shortcut.js`)

## Goals / Non-Goals

**Goals:**
- Replace wordmark with a command input on activation (click cursor, click logo on home, or `⌘.`)
- `$` prompt always visible; input styled as text (no borders, no form appearance)
- Support navigation commands: `cd`, `ls`, `ls <category>`, `cat <post>`, `find .`
- Commands are case-insensitive
- `cd ~/aboneto.dev/<path>` strips prefix and navigates to `/<path>/`
- Visual consistency with existing terminal theme
- Graceful deactivation: blur empty, `Esc` (focus returns to cursor for re-activation)
- Brief error flash for invalid commands
- `⌘.` kbd hint next to cursor (same style as archive's `⌘K`)

**Non-Goals:**
- Command history (up/down arrow recall)
- Tab autocompletion
- Actual shell execution or file system access
- Multiple simultaneous command inputs
- Commands beyond navigation (no `grep`, `curl`, etc.)

## Decisions

### D1: Hidden input with cursor as isolated activation trigger

The wordmark HTML structure changes so that the `<a>` link wraps only `cd ~/aboneto.dev`, while `$` stays outside as a standalone `<span>`. The `.cursor` moves outside the `<a>` but stays inside `.wordmark`. A hidden `<input>` and a `⌘.` kbd hint are added after the cursor. This ensures:
- `$` prompt is always visible (both active and inactive states)
- Clicking `cd ~/aboneto.dev` navigates to `/` (except on home page where it activates input)
- Only clicking the cursor activates the terminal input
- The input stays in the DOM (visually hidden) for `⌘.` activation

**Why not keep cursor inside the link?** If the cursor is inside `<a>`, clicking it would also trigger navigation. Moving it outside avoids needing `e.stopPropagation()` hacks and keeps the markup semantic.

**Why a hidden input vs. dynamic creation?** Keeping it in the DOM avoids layout shifts and simplifies the `⌘.` shortcut (element always exists to focus).

### D2: Command parsing with simple regex/string matching

Parse commands using `split()` and pattern matching:
- `cd <path>` → `window.location.href = '/' + path`
- `ls` / `ls -la` / `find .` → `/archivo/`
- `ls <category>` → `/categoria/<slugify(category)>/`
- `cat <post-slug>` → `/<post-slug>/`

**Why not a more robust parser?** The command set is small and fixed. Regex/switch-case is sufficient and avoids unnecessary complexity.

### D3: Category matching via slugified input

When the user types `ls vibe coding` or `ls vibe-coding`, the system slugifies the input and navigates to `/categoria/vibe-coding/`. This matches how jekyll-archives generates URLs using Liquid's `slugify` filter.

**Alternative considered:** Fetching `search.json` to fuzzy-match category names. Rejected because it adds network latency and complexity for a simple lookup.

### D4: Post matching via exact slug

`cat <slug>` navigates to `/<slug>/` directly. If the post doesn't exist, Jekyll's 404 page handles it.

**Alternative considered:** Fuzzy matching against `search.json` to find partial titles. Rejected for v1 — can be added later if needed.

### D5: Error feedback via CSS class toggle

On invalid command, add a `.command-error` class to the input that briefly flashes the border/text red (using the existing `$accent` or a derived error color), then resets after ~600ms. No modal or toast — stays inline with terminal aesthetic.

### D6: Deactivation rules

- `Esc` key → restore wordmark, focus cursor (so `⌘.` works immediately)
- Blur with empty input → restore wordmark
- Successful navigation → page changes naturally (no explicit restore needed)
- Invalid command → error flash, then keep input active for retry

## Risks / Trade-offs

**[Risk] Input styling breaks on mobile**
→ Mitigation: The wordmark area is narrower on mobile. The input will use `min-width: 0` and `flex: 1` to expand within available space, with a max-width cap. Test on mobile viewports.

**[Trade-off] No autocomplete vs. discoverability**
→ Keeping it simple for v1. The commands are documented in the hero/footer area or can be hinted via placeholder text. Autocomplete can be added as a follow-up.

**[Trade-off] Exact slug matching for `cat` vs. fuzzy search**
→ Exact match is simpler and faster. Users who don't know the exact slug can use `ls` to go to the archive and browse. Fuzzy matching can be added later by fetching `search.json`.

## Migration Plan

1. Create `assets/js/terminal-command.js` (new file, deferred)
2. Modify `_includes/topbar.html` to add the hidden input element
3. Add input styles to `_sass/_topbar.scss`
4. Add `defer` script tag to `_layouts/default.html`
5. Test all commands on dev server
6. No rollback needed — feature is additive, existing wordmark link is preserved as fallback

## Open Questions

- Should `cd ~/aboneto.dev` (the base path) navigate to home `/`? → Yes, makes sense as identity.
- Should `cd ~/aboneto.dev/<path>` strip the prefix? → Yes, navigates to `/<path>/`.
- Should `cd ..` navigate up one level? → Could be useful but ambiguous. Skip for v1.
- Should the input show a placeholder hint? → Yes, `cd ~/aboneto.dev` in `$ink-mute` color.
- Should commands be case-insensitive? → Yes, input is lowercased before parsing.
- What keyboard shortcut to use? → `⌘.` (avoids browser conflicts with `⌘T`).
- Should the logo text activate input on home page? → Yes, clicking logo on `/` activates input.
