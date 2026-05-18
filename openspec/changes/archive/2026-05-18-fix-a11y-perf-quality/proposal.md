## Why

The blog has accumulated accessibility violations (missing `<main>`, broken keyboard navigation, untrapped focus), performance penalties (render-blocking font imports, missing preconnects), and code quality issues (dead files, duplicated keyframes, hardcoded colors). Fixing these now ensures the site is inclusive, fast, and maintainable before launch.

## What Changes

- Add `<main>` landmark and skip link to `default.html`
- Implement focus trap and `aria-modal` on the menu overlay
- Make filter chips keyboard-accessible (Enter/Space handlers)
- Move Google Fonts from SASS `@import` to `<link>` with preconnect
- Add `preconnect`/`dns-prefetch` for external domains in `head.html`
- Remove dead `main.js` or consolidate into it
- Extract duplicate `@keyframes blink` to shared partial
- Replace hardcoded syntax colors with SCSS variables
- Fix author photo path to absolute URL
- Make `robots.txt` a Jekyll template with `{{ site.url }}`
- Change `paginate_path` from Portuguese `artigos/` to Spanish `articulos/`
- Remove `!important` from `_post-list.scss`

## Capabilities

### New Capabilities

- `a11y-fixes`: Skip link, `<main>` landmark, overlay focus trap, keyboard-accessible filter chips, `aria-modal` and `inert` handling
- `perf-optimization`: Font loading optimization, preconnect hints, dead code removal
- `code-quality`: Shared animations partial, SCSS variables for syntax colors, path fixes, template improvements

### Modified Capabilities

- `terminal-theme`: Requirement changes for `<main>` wrapper, overlay behavior, and shared animation definitions
- `seo-infrastructure`: Requirement changes for `robots.txt` templating and canonical self-referencing

## Impact

- `_layouts/default.html` — structural change (add `<main>`, skip link)
- `_includes/menu-overlay.html` — add `aria-modal`, `inert`
- `assets/js/menu.js` — focus trap implementation
- `assets/js/filters.js` — keyboard event handlers
- `_includes/head.html` — preconnect links, font `<link>`
- `_sass/_typography.scss` — remove `@import` for fonts
- `_sass/_topbar.scss`, `_sass/_overlay.scss` — deduplicate `blink` keyframe
- `_sass/_syntax.scss` — use variables instead of hardcoded colors
- `_sass/_variables.scss` — add syntax color variables
- `_sass/_post-list.scss` — remove `!important`
- `_data/author.yml` — absolute photo path
- `robots.txt` — convert to Jekyll template
- `_config.yml` — fix `paginate_path` language
- `assets/js/main.js` — remove or consolidate
