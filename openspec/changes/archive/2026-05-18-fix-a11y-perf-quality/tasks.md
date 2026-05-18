## 1. Accessibility — Layout & Landmarks

- [x] 1.1 Add `<a href="#main-content" class="skip-link">Saltar al contenido</a>` as first child of `<body>` in `_layouts/default.html`
- [x] 1.2 Wrap `{{ content }}` in `<main id="main-content">` inside `_layouts/default.html`, replacing the current bare output
- [x] 1.3 Add skip link styles in `_sass/_topbar.scss` (visually hidden by default, visible on focus)

## 2. Accessibility — Menu Overlay Focus Trap

- [x] 2.1 Add `aria-modal="true"` to `_includes/menu-overlay.html` overlay div
- [x] 2.2 Implement focus trap in `assets/js/menu.js` — query focusable elements, cycle Tab/Shift+Tab between first and last
- [x] 2.3 Add `inert` attribute to `<div class="v-terminal">` when overlay is open (with `aria-hidden="true"` fallback)
- [x] 2.4 Remove `inert` and restore `aria-hidden` when overlay closes

## 3. Accessibility — Filter Chips Keyboard Support

- [x] 3.1 Add `keydown` listener for Enter and Space on `.chip[data-category]` elements in `assets/js/filters.js`
- [x] 3.2 Call `e.preventDefault()` on Space to prevent page scroll

## 4. Performance — Font Loading

- [x] 4.1 Add `<link rel="preconnect">` for `fonts.googleapis.com` and `fonts.gstatic.com` (with `crossorigin`) in `_includes/head.html`
- [x] 4.2 Add `<link rel="stylesheet">` with Google Fonts URL in `_includes/head.html` (before `main.css`)
- [x] 4.3 Remove `@import url(...)` line from `_sass/_typography.scss`

## 5. Performance — Dead Code Removal

- [x] 5.1 Delete `assets/js/main.js` (empty file with only frontmatter)

## 6. Code Quality — Shared Animations

- [x] 6.1 Create `_sass/_animations.scss` with single `@keyframes blink` definition
- [x] 6.2 Remove `@keyframes blink` from `_sass/_topbar.scss` and add `@use 'animations'`
- [x] 6.3 Remove `@keyframes blink` from `_sass/_overlay.scss` and add `@use 'animations'`

## 7. Code Quality — Syntax Color Variables

- [x] 7.1 Add syntax color variables (`$syntax-keyword`, `$syntax-string`, `$syntax-function`, etc.) to `_sass/_variables.scss`
- [x] 7.2 Replace hardcoded hex values in `_sass/_syntax.scss` with the new variables

## 8. Code Quality — Path & Config Fixes

- [x] 8.1 Change `photo` in `_data/author.yml` from `"assets/img/antonio-barbosa.webp"` to `"/assets/img/antonio-barbosa.webp"`
- [x] 8.2 Rename `robots.txt` to `robots.txt` with Jekyll frontmatter, replace hardcoded URL with `{{ site.url }}`
- [x] 8.3 Change `paginate_path` in `_config.yml` from `"artigos/:num/"` to `"articulos/:num/"`
- [x] 8.4 Remove `!important` from `_sass/_post-list.scss` by increasing selector specificity

## 9. Mobile — Post List Thumbnail

- [x] 9.1 Restore thumbnail in mobile post list layout, restructure grid to `72px 1fr auto` with image aligned to title, date above, and invisible num spacer
