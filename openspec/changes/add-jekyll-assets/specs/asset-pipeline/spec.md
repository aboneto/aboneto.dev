## ADDED Requirements

### Requirement: Asset fingerprinting
The system SHALL generate fingerprinted URLs for all CSS, JS, and image assets using MD5 hash digest.

#### Scenario: CSS asset has fingerprinted URL
- **WHEN** the site builds
- **THEN** `assets/css/main.css` is referenced as `/assets/css/main-<hash>.css` where `<hash>` is the first 32 characters of the MD5 digest

#### Scenario: JS asset has fingerprinted URL
- **WHEN** the site builds
- **THEN** JavaScript files in `assets/js/` are referenced with fingerprinted URLs containing MD5 hash

#### Scenario: Image assets have fingerprinted URLs
- **WHEN** the site builds
- **THEN** image files referenced via `{% asset %}` helper include fingerprinted URLs

### Requirement: Asset pipeline configuration
The system SHALL have an `assets:` section in `_config.yml` that enables digest fingerprinting and defines asset sources.

#### Scenario: Configuration enables digest
- **WHEN** inspecting `_config.yml`
- **THEN** `assets.digest` is set to `true`

#### Scenario: Asset sources are defined
- **WHEN** inspecting `_config.yml`
- **THEN** `assets.sources` includes `_assets/css`, `_assets/js`, and `_assets/img`

#### Scenario: Caching is configured
- **WHEN** inspecting `_config.yml`
- **THEN** `assets.caching.path` is set to `.jekyll-cache/assets`

### Requirement: Asset helper usage
All templates SHALL use `{% asset %}` Liquid tag to reference CSS, JS, and image assets instead of direct URLs.

#### Scenario: CSS reference uses asset helper
- **WHEN** inspecting `_includes/head.html`
- **THEN** the CSS link tag uses `{% asset main.css %}` instead of direct URL

#### Scenario: JS reference uses asset helper
- **WHEN** inspecting templates that include JavaScript
- **THEN** script tags use `{% asset <filename>.js %}` instead of direct URLs

### Requirement: Asset compression
The system SHALL compress CSS and JS assets during build to reduce file size.

#### Scenario: CSS is compressed
- **WHEN** the site builds with `assets.compress.css: true`
- **THEN** generated CSS files are minified

#### Scenario: JS is compressed
- **WHEN** the site builds with `assets.compress.js: true`
- **THEN** generated JavaScript files are minified
