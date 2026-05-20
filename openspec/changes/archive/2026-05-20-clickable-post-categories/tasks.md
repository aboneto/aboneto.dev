## 1. Template

- [x] 1.1 Open `_layouts/post.html` and locate the `categories:` line inside `.reader-frontmatter`.
- [x] 1.2 Replace `<span class="str">"{{ cat }}"</span>` with an anchor wrapping the same span, using class `cat-link`. Build the href by first assigning `{% assign cat_slug = cat | slugify %}` and then using `{{ '/categoria/' | append: cat_slug | append: '/' | relative_url }}`. Keep the displayed `{{ cat }}` raw (unslugified) inside the `.str` span.
- [x] 1.3 Preserve the surrounding `[`, `]`, and `, ` separator markup byte-for-byte.

## 2. Styles

- [x] 2.1 Open `_sass/_frontmatter.scss` and add a `.cat-link` rule scoped under `.reader-frontmatter`.
- [x] 2.2 Set `text-decoration: none; color: inherit;` on `.cat-link` so at-rest visual is unchanged.
- [x] 2.3 On `&:hover .str, &:focus-visible .str` apply `color: $accent-bright; text-decoration: underline; text-underline-offset: 2px;`.
- [x] 2.4 On `&:focus-visible` apply `outline: 1px solid $accent; outline-offset: 2px; border-radius: 2px;`.

## 3. Verification — build & visual

- [x] 3.1 Run `bundle exec jekyll build` and confirm no Liquid or SCSS errors.
- [x] 3.2 Run `bundle exec jekyll serve` and open a post detail page (e.g. `/roi-microservicios/`).
- [x] 3.3 Confirm the categories line is visually identical to the previous version at rest (green quoted strings, same spacing).
- [x] 3.4 Hover each category and confirm the color brightens and an underline appears with no layout shift.
- [x] 3.5 Tab through the frontmatter block with the keyboard and confirm each category receives a visible focus outline.
- [x] 3.6 Click each category anchor and confirm it lands on `/categoria/<slug>/` and that page lists the expected posts. Verify with at least one multi-word category (e.g. `arquiteto-de-software`) to confirm slugify matches `jekyll-archives` output in `_site/categoria/`.

## 4. Verification — tests

- [x] 4.1 If E2E coverage for post detail exists in `e2e/`, add or extend a test asserting each category in the frontmatter is an `<a>` with `href` matching `/categoria/<slug>/` (slugified value), and that the visible link text equals the raw category value.
- [x] 4.2 Run `npx playwright test` (or the project's E2E script) and confirm all suites pass.
- [x] 4.3 If unit tests cover layout/template rendering, run them and confirm pass.

## 5. Cleanup

- [x] 5.1 Commit on a branch named `feat/clickable-post-categories` using a Conventional Commit message (`feat:` or `style:` as appropriate).
- [x] 5.2 Open a PR in English referencing the OpenSpec change folder.
