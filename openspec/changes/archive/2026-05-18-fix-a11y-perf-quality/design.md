## Context

The Jekyll blog at aboneto.dev has accessibility violations, performance penalties, and code quality debt accumulated during rapid mockup-to-site development. The site uses a terminal/dev aesthetic with IBM Plex fonts, a hamburger menu overlay, category filter chips, and SASS-based styling.

Current state:
- `_layouts/default.html` wraps content in `<div class="v-terminal">` with no `<main>` or skip link
- Menu overlay (`_includes/menu-overlay.html`) uses `aria-hidden` but lacks `aria-modal`, focus trap, and `inert`
- Filter chips in `filters.js` only handle `click`, not keyboard events
- Google Fonts loaded via `@import` in `_sass/_typography.scss` (render-blocking)
- No `preconnect` hints in `_includes/head.html`
- `assets/js/main.js` is empty (only frontmatter)
- `@keyframes blink` duplicated in `_topbar.scss` and `_overlay.scss`
- Hardcoded hex colors in `_syntax.scss` bypass design system variables
- Author photo path in `_data/author.yml` is relative (breaks on subdirectory pages)
- `robots.txt` hardcodes the site URL instead of using `{{ site.url }}`
- `paginate_path` uses Portuguese `artigos/` instead of Spanish `articulos/`
- `_post-list.scss` uses `!important` unnecessarily

## Goals / Non-Goals

**Goals:**
- Fix all identified accessibility violations (WCAG 2.1 AA compliance where applicable)
- Eliminate render-blocking font loading for better Core Web Vitals
- Clean up code quality issues for maintainability
- Preserve existing visual design and terminal aesthetic

**Non-Goals:**
- Redesigning the terminal theme or layout structure
- Adding new features beyond the identified fixes
- Changing the SASS architecture (still using `@use` and partials)
- Migrating away from Google Fonts

## Decisions

### D1: Font loading via `<link>` with preconnect

**Decision**: Move Google Fonts from SASS `@import` to `<link rel="stylesheet">` in `head.html`, adding `<link rel="preconnect">` for `fonts.googleapis.com` and `fonts.gstatic.com`.

**Rationale**: `@import` inside CSS blocks rendering — the browser must download, parse the CSS, discover the import, then fetch fonts. A `<link>` in HTML is discovered immediately during HTML parsing. `preconnect` establishes the connection early, saving ~100-300ms on cold loads.

**Alternatives considered**:
- Self-hosting fonts: Better for privacy/performance but adds maintenance burden for font updates. Defer to a future change.
- `font-display: optional`: Aggressive — avoids FOUT but may show fallback permanently on slow connections. `swap` is a better balance.

### D2: Focus trap implementation in vanilla JS

**Decision**: Implement focus trap in `menu.js` without a library — query all focusable elements within the overlay, cycle Tab/Shift+Tab between first and last.

**Rationale**: The overlay is simple (links + close button). A vanilla implementation adds ~15 lines and avoids a dependency. The pattern is well-established (WAI-ARIA dialog practices).

**Alternatives considered**:
- `inert` attribute on `<div class="v-terminal">`: Cleaner but requires a polyfill for older browsers. Will add `inert` with a fallback to `aria-hidden` on the main content wrapper.

### D3: Shared `_animations.scss` partial

**Decision**: Extract `@keyframes blink` to `_sass/_animations.scss` and `@use` it from both `_topbar.scss` and `_overlay.scss`.

**Rationale**: Eliminates duplication. SASS `@use` ensures the keyframe is only emitted once in the compiled CSS even if imported by multiple partials.

### D4: Syntax color variables in `_variables.scss`

**Decision**: Define `$syntax-keyword`, `$syntax-string`, `$syntax-function`, etc. in `_variables.scss` and reference them in `_syntax.scss`.

**Rationale**: Aligns syntax highlighting with the design system. If the palette changes, syntax colors update automatically.

### D5: `robots.txt` as Jekyll template

**Decision**: Rename `robots.txt` to `robots.txt` with frontmatter so Jekyll processes it, using `{{ site.url }}/sitemap.xml`.

**Rationale**: Single source of truth for the site URL. If `_config.yml` `url` changes, robots.txt updates automatically.

## Risks / Trade-offs

- **Focus trap complexity** → Simple vanilla implementation may miss edge cases (dynamically added focusable elements). Mitigation: overlay content is static, rendered by Jekyll.
- **Font loading flicker** → Moving to `<link>` with `swap` may cause a brief FOUT on first visit. Mitigation: `font-display: swap` is already set; the visual impact is minimal with system font fallbacks.
- **SCSS variable proliferation** → Adding ~10 syntax color variables increases `_variables.scss`. Mitigation: Grouped under a clear `// Syntax highlighting` section.
