## Workflow: Orquestación con Subagentes

Cada grupo de tareas se delega a un subagente de tipo `general`. El hilo principal orquesta, valida visualmente con Playwright, y decide si iterar o avanzar.

**Flujo por grupo:**
1. Delegar tareas al subagente con contexto completo (specs, design, archivos existentes)
2. Subagente implementa y reporta
3. Ejecutar Playwright para tomar screenshots
4. Comparar con mockup — si hay diferencias significativas, delegar fixes
5. Avanzar al siguiente grupo

---

## 1. Foundation — Jekyll + Data + SASS Base

> **Delegar a subagente** — Contexto: proposal.md, design.md, specs/jekyll-foundation, specs/blog-content (data files only)

- [x] 1.1 Create `Gemfile` with `jekyll`, `jekyll-feed`, `jekyll-sitemap`, `jekyll-seo-tag`, `jekyll-paginate`, `jekyll-archives`, `jekyll-gzip`, `jekyll-minifier`
- [x] 1.2 Create `_config.yml` with site metadata, plugin configs, `paginate: 12`, `paginate_path: "artigos/:num/"`, `permalink: /:title`, `sass.style: compressed`, `jekyll-archives` (categories only, layout `category`, permalink `/categoria/:name/`), and `exclude` list
- [x] 1.3 Create directory structure: `_layouts/`, `_includes/`, `_sass/`, `_posts/`, `_data/`, `assets/css/`, `assets/js/`, `assets/img/`, `assets/images/`
- [x] 1.4 Create `robots.txt`
- [x] 1.5 Create `404.html` with `layout: default` and terminal-styled error message
- [x] 1.5 Create `_data/author.yml` from mockup `BLOG_AUTHOR`
- [x] 1.6 Create `_data/categories.yml` from mockup `BLOG_CATEGORIES`
- [x] 1.7 Create `search.json` template at root
- [x] 1.8 Create `_sass/_variables.sass` with all design tokens from mockup CSS
- [x] 1.9 Create `_sass/_reset.sass` with base reset
- [x] 1.10 Create `_sass/_scanline.sass` with grid background
- [x] 1.11 Create `_sass/_typography.sass` with IBM Plex font loading
- [x] 1.12 Create `assets/css/main.sass` importing all partials
- [x] 1.13 Create `.github/workflows/jekyll.yml` — GitHub Actions pipeline with `bundle install`, `jekyll build`, deploy to GitHub Pages (no `github-pages` gem, direct plugin install)
- [x] 1.14 Run `bundle install` and `bundle exec jekyll build` — verify no errors

### Visual Checkpoint 1

- [x] V1.1 Run Playwright: screenshot `_site/index.html` (shell only, no real layout yet)
- [x] V1.2 Verify SASS compiles, fonts load, design tokens render correct colors

---

## 2. Shared Includes + Home Layout

> **Delegar a subagente** — Contexto: specs/terminal-theme (topbar, hero, post-list, author, footer), specs/blog-content (post schema), mockup CSS como referencia

- [x] 2.1 Create `_includes/head.html` with meta, SEO tag, stylesheet link (no inline styles, no critical CSS)
- [x] 2.2 Create `_includes/topbar.html` with terminal wordmark, nav links, hamburger button
- [x] 2.3 Create `_includes/footer.html` with terminal copyright and links
- [x] 2.4 Create `_includes/author.html` with author grid
- [x] 2.5 Create `_includes/post-image.html` with gradient placeholder + WebP
- [x] 2.6 Create `_layouts/default.html` shell
- [x] 2.7 Create `_sass/_hero.sass` with hero grid and featured post styles
- [x] 2.8 Create `_sass/_post-list.sass` with post row grid
- [x] 2.9 Create `_layouts/home.html` with hero + paginated post list
- [x] 2.10 Create `index.html` with `layout: home`
- [x] 2.11 Create at least 2 sample posts in `_posts/` for visual testing

### Visual Checkpoint 2

- [x] V2.1 Run Playwright: full-page screenshot of home (`localhost:4000`)
- [x] V2.2 Compare with mockup `TerminalHome` artboard — check: topbar prompt, hero layout, post row grid, author section, footer
- [x] V2.3 If differences detected → delegate fixes to subagent and re-screenshot

---

## 3. Post + Category + Archive Layouts

> **Delegar a subagente** — Contexto: specs/terminal-theme (reader, category, archive), specs/blog-content (frontmatter schema, category pages), mockup CSS

- [x] 3.1 Create `_sass/_reader.sass` with reader body styles (headings, blockquotes, code, lists)
- [x] 3.2 Create `_sass/_frontmatter.sass` with YAML block styling
- [x] 3.3 Create `_layouts/post.html` with frontmatter block, title, cover, body
- [x] 3.4 Create `_sass/_category.sass` with category header styles
- [x] 3.5 Create `_sass/_archive.sass` with search bar, chips, archive list
- [x] 3.6 Create `_layouts/category.html` with breadcrumb, title, stats, filtered posts
- [x] 3.7 Create `_layouts/archive.html` with search bar, chips, chronological list
- [x] 3.8 Create `archivo.md` with `layout: archive`
- [x] 3.9 Create remaining sample posts (total ≥ 7) for pagination and category testing

### Visual Checkpoint 3

- [x] V3.1 Run Playwright: screenshots of post page, category page, archive page
- [x] V3.2 Compare post page with mockup `TerminalPost` — check: frontmatter block, title, image, body styling
- [x] V3.3 Compare category page with mockup `TerminalCategory` — check: breadcrumb, #title, stats, post list
- [x] V3.4 Compare archive page with mockup `TerminalArchive` — check: search bar, chips, archive rows
- [x] V3.5 If differences detected → delegate fixes and re-screenshot

---

## 4. Menu Overlay + JS Interactions

> **Delegar a subagente** — Contexto: specs/client-interactions, specs/terminal-theme (overlay), mockup `TerminalMenu`

- [x] 4.1 Create `_sass/_overlay.sass` with overlay styles
- [x] 4.2 Create `_includes/menu-overlay.html` with overlay content
- [x] 4.3 Add overlay include to `default.html`
- [x] 4.4 Create `assets/js/menu.js` — toggle, Escape, backdrop click, aria, focus
- [x] 4.5 Create `assets/js/search.js` — fetch, filter, render, empty states
- [x] 4.6 Create `assets/js/filters.js` — chip toggle, active state, filter list
- [x] 4.7 Create `assets/js/search-shortcut.js` — ⌘K shortcut
- [x] 4.8 Create `assets/js/main.js` — init all modules, all scripts `defer`

### Visual Checkpoint 4

- [x] V4.1 Run Playwright: screenshot of menu overlay (trigger click, capture overlay state)
- [x] V4.2 Compare with mockup `TerminalMenu` — check: overlay layout, categories nav, recent posts
- [x] V4.3 Test search: type query, screenshot filtered results
- [x] V4.4 Test category filters: click chip, screenshot filtered list
- [x] V4.5 If differences detected → delegate fixes and re-test

---

## 5. Responsive + SEO + Performance

> **Delegar a subagente** — Contexto: specs/seo-infrastructure, specs/terminal-theme (responsive), design.md (plugins)

- [x] 5.1 Create `_sass/_responsive.sass` with media queries (320px, 768px, 1024px)
- [x] 5.2 Verify `jekyll-seo-tag` injects correct meta tags and JSON-LD (built-in)
- [x] 5.3 Verify `jekyll-feed` generates valid `feed.xml`
- [x] 5.4 Verify `jekyll-sitemap` generates valid `sitemap.xml`
- [x] 5.5 Verify `jekyll-archives` generates category pages
- [x] 5.6 Verify `jekyll-minifier` minifies HTML
- [x] 5.7 Verify `jekyll-gzip` generates `.gz` files
- [x] 5.8 Add `loading="lazy"` to below-the-fold images
- [x] 5.9 Verify no inline `style=""` attributes in templates — all styling via SASS files
- [x] 5.10 Verify all styles defined in `_sass/` partials, not in HTML

### Visual Checkpoint 5

- [x] V5.1 Run Playwright at 320px: screenshot home, post, archive
- [x] V5.2 Run Playwright at 768px: screenshot home, post, archive
- [x] V5.3 Run Playwright at 1024px: screenshot home, post, archive
- [x] V5.4 Compare mobile layouts with mockup expectations — check: single-column hero, stacked rows, overlay adaptation
- [x] V5.5 If responsive issues → delegate fixes and re-screenshot

---

## 6. Final Integration Verification

> **Hilo principal** — validación completa

- [x] 6.1 Run `bundle exec jekyll build` — verify zero errors
- [x] 6.2 Playwright: full-page screenshots of all 5 screens at 1280px
- [x] 6.3 Playwright: side-by-side comparison with mockup artboards
- [x] 6.4 Verify all plugin outputs: feed.xml, sitemap.xml, category archives, gzip, minified HTML
- [x] 6.5 Verify search, filters, menu overlay work end-to-end
- [x] 6.6 Verify no console errors in Playwright browser
- [x] 6.7 Final sign-off or delegate remaining fixes
