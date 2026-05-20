## Context

`_layouts/post.html` renders the post header as a mock YAML frontmatter block (terminal/dev aesthetic). The categories line is currently:

```liquid
<div><span class="k">categories:</span> [{% for cat in page.categories %}<span class="str">"{{ cat }}"</span>{% unless forloop.last %}, {% endunless %}{% endfor %}]</div>
```

Each category is plain text wrapped in a `.str` span (green quoted string look). The site already generates category archives via `jekyll-archives` with the permalink pattern `/categoria/:name/` (see `_config.yml`). The category layout (`_layouts/category.html`) reads `site.categories[page.title]` to render the listing.

Styles for the frontmatter block live in `_sass/_frontmatter.scss`, scoped under `.reader-frontmatter`. Palette tokens are in `_sass/_variables.scss` (`$accent`, `$green`, `$ink-soft`, `$ink-mute`, …).

This change is intentionally small: no new components, no new data, no config changes. Recording a design doc because (a) we want a single source of truth for the URL contract used, and (b) we want to be explicit about the at-rest visual being identical.

## Goals / Non-Goals

**Goals:**
- Each category rendered in the post frontmatter block is a working link to its archive page.
- At-rest appearance of the categories line is byte-equivalent to today (same quoted, green-string look).
- Provide a discoverable hover/focus affordance using existing palette tokens.
- Keep the change small enough to land in a single PR with no spec rewrite.

**Non-Goals:**
- No redesign of the frontmatter block.
- No change to the category archive page itself.
- No change to tags, dates, or other frontmatter fields (only `categories`).
- No JavaScript — anchors only.
- No change to the URL contract `/categoria/:name/`.

## Decisions

### D1. Build the URL with Liquid using a hardcoded prefix `/categoria/` and `slugify` the category

Use `'/categoria/' | append: cat | append: '/' | relative_url` with the category passed through `slugify` first, i.e.:

```liquid
{% assign cat_slug = cat | slugify %}
<a href="{{ '/categoria/' | append: cat_slug | append: '/' | relative_url }}">…</a>
```

**Alternatives considered:**
- Reading the prefix from `site.jekyll-archives.permalinks.category` and stripping `:name`. Rejected: significantly more Liquid, no benefit unless we plan to relocate the archive — and if we do, the category layout's own breadcrumb (which also hardcodes `categoria`) would need to change with it.
- Using `site.categories[cat].first.url | split: '/' | …` to derive the URL from an existing post. Rejected: fragile, depends on category having posts.
- Using the raw `cat` value without slugifying. Rejected: confirmed against the built site — category archives live at `/categoria/<slug>/` (lowercase, hyphenated, accent-stripped, e.g. `arquiteto-de-software/`). Raw category values with spaces, accents, or uppercase would produce 404s.

**Rationale:** The `/categoria/` segment is already hardcoded in `_layouts/category.html` (the breadcrumb). Centralising later is cheap. Premature abstraction now adds Liquid noise. `slugify` matches `jekyll-archives`' default slugging behaviour, which is what produced the existing archive URLs.

### D2. Wrap the existing `.str` span inside the anchor, not the other way around

Markup becomes:

```liquid
{% assign cat_slug = cat | slugify %}
<a class="cat-link"
   href="{{ '/categoria/' | append: cat_slug | append: '/' | relative_url }}">
  <span class="str">"{{ cat }}"</span>
</a>
```

The display text keeps the raw category value; only the URL uses the slug.

**Alternatives considered:**
- Apply `.str` directly on the anchor. Rejected: would require duplicating green-string color rules and risks drift if `.str` evolves.

**Rationale:** Keeps `.str` as the single source of truth for the quoted-string look. The anchor only adds interactivity.

### D3. Hover/focus styling — color lift + underline, no layout shift

```scss
.reader-frontmatter {
  .cat-link {
    text-decoration: none;
    color: inherit;
    border-radius: 2px;

    &:hover .str,
    &:focus-visible .str {
      color: $accent-bright; // existing token
      text-decoration: underline;
      text-underline-offset: 2px;
    }

    &:focus-visible {
      outline: 1px solid $accent;
      outline-offset: 2px;
    }
  }
}
```

**Alternatives considered:**
- Background highlight on hover. Rejected: too heavy for the minimalist frontmatter block.
- Brightness/opacity tweak only. Rejected: less accessible — needs a non-color cue too (underline covers that).

**Rationale:** Underline + slight color lift is the lightest possible affordance that still passes the "is this clickable?" sniff test. Uses only tokens already in the palette. No box-model change → no layout shift.

### D4. Encoding of the category in the URL

`jekyll-archives` slugifies category names when generating archive paths. Inspection of `_site/categoria/` confirms slugs are lowercase, hyphenated, accent-stripped (e.g. `arquiteto-de-software`, `documentación-de-software` → real archive dir `documentación-de-software/` shows accents may be preserved by the default slug mode, but multi-word values are hyphenated).

**Decision:** always pipe the category through `| slugify` when building the href. Keep the displayed text raw (so the at-rest visual is preserved exactly).

**Default slug mode:** Jekyll's default `slugify` mode is `default`, which lowercases and replaces non-alphanumeric runs with hyphens but preserves Unicode word characters. This matches the slugging used by `jekyll-archives` for our existing archive URLs. If a future archive URL mismatch surfaces, switch to `cat | slugify: 'pretty'` or whatever mode `jekyll-archives` ends up using.

## Risks / Trade-offs

- [URL drift if `_config.yml` archive permalink changes] → Mitigated by D1 rationale (same hardcode already exists in the category layout breadcrumb); a future refactor would touch both spots together.
- [Slugify mode mismatch with `jekyll-archives` for edge-case characters] → Mitigated by spot-checking representative categories (spaces, accents, uppercase) after build; if mismatch found, switch slugify mode to match.
- [Hover affordance too subtle] → Underline is conventional and unambiguous; can iterate after visual review without changing the contract.
- [Accessibility regression if focus-visible is dropped] → Spec includes a focus-visible scenario; E2E or manual keyboard test verifies before merge.
