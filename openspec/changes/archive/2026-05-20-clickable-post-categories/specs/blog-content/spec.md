## ADDED Requirements

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
