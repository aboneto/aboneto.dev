## 1. Variables & Foundation

- [x] 1.1 Update `_variables.scss` with mobile-first spacing tokens (`$page-padding-mobile: 16px`, `$page-padding-desktop: 32px`)
- [x] 1.2 Add touch target variable `$touch-target: 48px` to `_variables.scss`
- [x] 1.3 Audit all breakpoint variable usage across `_sass/` partials

## 2. Reset & Base Styles

- [x] 2.1 Refactor `_reset.scss` to set mobile-first base font size (16px) and box-sizing
- [x] 2.2 Update `_typography.scss` to use rem units with mobile-first scale
- [x] 2.3 Ensure all interactive elements in `_reset.scss` have 48px minimum touch target

## 3. Component Refactoring (Mobile-First)

- [x] 3.1 Refactor `_topbar.scss` — base styles for mobile hamburger, enhance to horizontal nav at 768px
- [x] 3.2 Refactor `_hero.scss` — single-column mobile layout, grid enhancement at 768px
- [x] 3.3 Refactor `_post-list.scss` — stacked mobile layout, row format at 768px
- [x] 3.4 Refactor `_reader.scss` — full-width mobile, max-width constraint at 1024px
- [x] 3.5 Refactor `_author.scss` — single-column mobile, two-column at 768px
- [x] 3.6 Refactor `_archive.scss` — stacked mobile, grid at 768px
- [x] 3.7 Refactor `_category.scss` — mobile-first layout
- [x] 3.8 Refactor `_footer.scss` — stacked mobile, horizontal at 768px
- [x] 3.9 Refactor `_overlay.scss` — full-screen mobile, centered at 768px
- [x] 3.10 Refactor `_frontmatter.scss` — mobile-first code block styling
- [x] 3.11 Refactor `_error.scss` — mobile-first layout

## 4. Partial-Specific Media Queries

- [x] 4.1 Convert all `max-width` media queries in `_topbar.scss` to `min-width`
- [x] 4.2 Convert all `max-width` media queries in `_hero.scss` to `min-width`
- [x] 4.3 Convert all `max-width` media queries in `_post-list.scss` to `min-width`
- [x] 4.4 Convert all `max-width` media queries in `_reader.scss` to `min-width`
- [x] 4.5 Convert all `max-width` media queries in `_author.scss` to `min-width`
- [x] 4.6 Convert all `max-width` media queries in `_overlay.scss` to `min-width`

## 5. Responsive File Cleanup

- [x] 5.1 Refactor `_responsive.scss` — remove duplicate rules, use only `min-width` queries for container max-widths at `$bp-wide`

## 6. Touch Target Audit

- [x] 6.1 Verify all `<a>` links have minimum 48px tap area
- [x] 6.2 Verify all `<button>` elements have minimum 48px tap area
- [x] 6.3 Verify hamburger menu button meets touch target minimum
- [x] 6.4 Verify category chips in archive have adequate tap spacing

## 7. Testing & Verification

- [x] 7.1 Test home page at 320px, 768px, 1024px, 1440px viewports
- [x] 7.2 Test post page at all breakpoints
- [x] 7.3 Test archive page at all breakpoints
- [x] 7.4 Test category page at all breakpoints
- [x] 7.5 Test hamburger menu at mobile breakpoint
- [x] 7.6 Verify no visual regressions on desktop (1440px)
