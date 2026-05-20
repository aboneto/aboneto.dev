## Why

The post detail page (`_layouts/post.html`) renders each category in the YAML-style frontmatter block as plain text. Readers see a category name and have no way to jump from a post to the listing of other posts in that category, which is friction for content discovery and a lost opportunity for internal linking (relevant for SEO and dwell time). The category archive pages already exist at `/categoria/<name>/` — they are simply not reachable from the post detail view.

## What Changes

- Wrap each category name inside `.reader-frontmatter` (post detail layout) in an `<a>` element pointing to the corresponding category archive URL (`/categoria/<slug>/`, where `<slug>` is the category name passed through Jekyll's `slugify` filter), respecting Jekyll's `relative_url` filter.
- Preserve the existing visual styling of the rendered category string (the `<span class="str">"…"</span>` quote-wrapped look stays identical at rest).
- Add a single hover affordance to the new link (color shift + underline) using existing palette tokens — no layout change, no new typography, no new colors.
- Keep keyboard focus styles consistent with the rest of the reader (visible outline).

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `blog-content`: the post detail frontmatter block becomes an interactive navigation surface — each category SHALL link to its archive page.

## Impact

- Affected files:
  - `_layouts/post.html` — replace the static `<span class="str">"{{ cat }}"</span>` with an anchor wrapping the same span.
  - `_sass/_frontmatter.scss` — add hover/focus styles for the new anchor scoped to `.reader-frontmatter`.
- No new dependencies, no config changes, no data file changes.
- URL contract relied upon: `/categoria/:name/` from `jekyll-archives` config in `_config.yml`, where `:name` is the slugified category. If that contract changes, this link must change with it.
- SEO: adds internal links from every post to its category archive (positive).
- A11y: anchors must be keyboard-focusable and visually distinguishable on hover/focus.
