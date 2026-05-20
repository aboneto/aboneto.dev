## ADDED Requirements

### Requirement: Author data file
The system SHALL have `_data/author.yml` containing: name, role, bio, location, and links (label + href pairs for LinkedIn, GitHub, Medium archive, RSS).

#### Scenario: Author data is accessible in templates
- **WHEN** a template references `site.data.author.name`
- **THEN** the author's name from YAML is rendered

### Requirement: Categories data file
The system SHALL have `_data/categories.yml` with entries for each category: slug, name, and display order.

#### Scenario: Categories are accessible in templates
- **WHEN** a template iterates `site.data.categories`
- **THEN** all categories with slug, name are available

### Requirement: Post frontmatter schema
Each post in `_posts/` SHALL include frontmatter with: `title`, `date`, `categories` (array), `tags` (array), `excerpt`, `image` (path to WebP cover), and optionally `featured: true`. Reading time is auto-calculated from word count (~200 words/min).

#### Scenario: Post with all frontmatter fields
- **WHEN** a post file has all required frontmatter fields
- **THEN** the post renders correctly in all layouts (home, category, archive, reader)

#### Scenario: Featured post
- **WHEN** a post has `featured: true`
- **THEN** it appears in the hero section on the home page and is excluded from the recent posts list

### Requirement: Post content with sample posts
The system SHALL include at least 3 sample posts in `_posts/` based on the mockup data (e.g., `2026-05-14-roi-microservicios.md`, `2026-05-02-observabilidad-distribuida.md`, `2026-04-24-impacto-llm-produccion.md`) with real Spanish content matching the mockup excerpts and body.

#### Scenario: Sample posts build
- **WHEN** building the site
- **THEN** all sample posts are generated as individual pages with correct URLs

### Requirement: Post URLs with clean permalinks
Posts SHALL use the permalink structure `/:title/` as configured in `_config.yml` (`permalink: /:title`).

#### Scenario: Post URL format
- **WHEN** a post is published at `2026-05-14-roi-microservicios.md`
- **THEN** its URL is `/roi-microservicios/`

### Requirement: Image references use WebP
Posts SHALL reference cover images as `.webp` files in `assets/img/` following the project's image workflow (raw images in `assets/images/`, converted via script, referenced from `assets/img/`).

#### Scenario: Cover image renders
- **WHEN** a post specifies `image: /img/roi-microservicios.webp` in frontmatter
- **THEN** the image is rendered with `loading="lazy"` and correct `alt` text

### Requirement: Category pages generated automatically
The system SHALL use `jekyll-archives` to generate pages at `/categoria/<name>/` for each category, using the `category` layout.

#### Scenario: Category page exists
- **WHEN** a category `arquitectura` exists with 14 posts
- **THEN** a page at `/categoria/arquitectura/` lists all 14 posts

#### Scenario: Category page has correct layout
- **WHEN** navigating to a category archive page
- **THEN** the page uses the category layout with breadcrumb, title, stats, and post list

### Requirement: Post detail categories link to category archive
On the post detail page, each category listed in the rendered YAML-style frontmatter block SHALL be an anchor (`<a>`) whose `href` points to the corresponding category archive page at `/categoria/<slug>/`, where `<slug>` is the category name passed through Jekyll's `slugify` filter and the full path through `relative_url`. The displayed text inside the anchor SHALL remain the raw, unslugified category value. The anchor SHALL wrap the existing `<span class="str">"…"</span>` element so the at-rest visual is unchanged.

#### Scenario: Single-word category renders as a link
- **WHEN** a post has `categories: [arquitectura]` in its frontmatter
- **THEN** the rendered frontmatter block contains an anchor with `href` resolving to `/categoria/arquitectura/`
- **AND** the anchor's text content matches the previous static text exactly (the quoted category name in the green string style)

#### Scenario: Multi-word category is slugified in the URL only
- **WHEN** a post has `categories: ["Arquiteto de Software"]`
- **THEN** the anchor's `href` resolves to `/categoria/arquiteto-de-software/`
- **AND** the anchor's visible text remains `"Arquiteto de Software"` (raw value, unchanged)

#### Scenario: Multiple categories each render as their own link
- **WHEN** a post has `categories: [arquitectura, observabilidad]`
- **THEN** the frontmatter block contains two anchors, one per category, each pointing to its respective `/categoria/<slug>/` URL
- **AND** the comma-and-bracket layout between/around them is unchanged

#### Scenario: Anchor navigates to the category archive
- **WHEN** a reader clicks one of the rendered category anchors
- **THEN** the browser navigates to the category archive page that lists all posts in that category

### Requirement: Post detail category link hover and focus affordance
The category anchors in the post detail frontmatter block SHALL provide a visible hover and keyboard-focus affordance using existing palette tokens, without changing the at-rest visual or causing any layout shift.

#### Scenario: Hover affordance is visible
- **WHEN** a pointer hovers over a category anchor
- **THEN** the anchor's visible text color shifts to a brighter accent tone AND an underline appears
- **AND** no surrounding text reflows (no width/height change in the frontmatter block)

#### Scenario: Keyboard focus affordance is visible
- **WHEN** a category anchor receives keyboard focus (`:focus-visible`)
- **THEN** a visible focus outline is rendered around the anchor using the accent color
- **AND** the underline/color hover treatment is also applied

#### Scenario: At-rest visual is unchanged
- **WHEN** the post detail page is rendered with no pointer or focus on the category anchors
- **THEN** the categories line is visually indistinguishable from the previous static (non-link) version (same green quoted string, same spacing, same font)
