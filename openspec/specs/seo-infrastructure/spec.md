## ADDED Requirements

### Requirement: SEO meta tags
The system SHALL inject `<title>`, `<meta name="description">`, canonical URL, and Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`) on every page via `jekyll-seo-tag`.

#### Scenario: Post page has SEO tags
- **WHEN** viewing a post page
- **THEN** the `<head>` contains `<title>` with post title + site title, `meta description` from excerpt, and Open Graph tags with post image

#### Scenario: Home page has SEO tags
- **WHEN** viewing the home page
- **THEN** the `<head>` contains `<title>` with site title and `meta description` from site config

### Requirement: RSS feed
The system SHALL generate `feed.xml` via `jekyll-feed` with all published posts.

#### Scenario: Feed is accessible
- **WHEN** requesting `/feed.xml`
- **THEN** a valid Atom feed is returned with all posts

### Requirement: Sitemap
The system SHALL generate `sitemap.xml` via `jekyll-sitemap` with all published pages and posts.

#### Scenario: Sitemap is accessible
- **WHEN** requesting `/sitemap.xml`
- **THEN** a valid XML sitemap is returned with all pages and posts

### Requirement: Robots.txt
The system SHALL have a `robots.txt` that allows all crawlers and references the sitemap.

#### Scenario: Robots allows crawling
- **WHEN** requesting `/robots.txt`
- **THEN** it contains `User-agent: *`, `Allow: /`, and `Sitemap:` directive

### Requirement: HTML minification
The system SHALL minify all HTML output via `jekyll-minifier` to reduce file sizes.

#### Scenario: HTML is minified
- **WHEN** building the site
- **THEN** generated HTML files have unnecessary whitespace, comments, and newlines removed

### Requirement: Gzip precompression
The system SHALL generate `.gz` versions of all text assets (HTML, CSS, JS, JSON, XML) via `jekyll-gzip`.

#### Scenario: Gzip files exist
- **WHEN** building the site
- **THEN** `_site/index.html.gz`, `_site/assets/css/main.css.gz`, `_site/feed.xml.gz` exist alongside their uncompressed versions

### Requirement: Image lazy loading
All images below the fold SHALL use `loading="lazy"` attribute to defer loading until near viewport.

#### Scenario: Lazy loading on post images
- **WHEN** viewing a post list
- **THEN** thumbnail images have `loading="lazy"` attribute

#### Scenario: Eager loading on hero image
- **WHEN** viewing the home page
- **THEN** the hero featured image does NOT have `loading="lazy"` (above the fold)

### Requirement: No inline styles
The system SHALL NOT use inline `style=""` attributes on HTML elements. All styling MUST be applied via CSS classes defined in SASS files.

#### Scenario: No inline styles in output
- **WHEN** inspecting generated HTML
- **THEN** no elements have `style=""` attributes (except third-party plugin output)
