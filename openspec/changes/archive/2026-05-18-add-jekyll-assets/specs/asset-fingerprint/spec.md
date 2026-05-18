## ADDED Requirements

### Requirement: Asset fingerprinting
The system SHALL generate fingerprinted URLs for CSS and JS assets using MD5 hash digest via custom plugin `_plugins/asset_fingerprint.rb`.

#### Scenario: CSS asset has fingerprinted URL
- **WHEN** the site builds
- **THEN** `assets/css/main.css` is referenced as `/assets/css/main-<hash>.css` where `<hash>` is 8 characters of MD5 digest

#### Scenario: JS asset has fingerprinted URL
- **WHEN** the site builds
- **THEN** JavaScript files in `assets/js/` are referenced with fingerprinted URLs containing MD5 hash

### Requirement: Asset helper usage
All templates SHALL use `{% asset %}` Liquid tag to reference CSS and JS assets instead of direct URLs.

#### Scenario: CSS reference uses asset helper
- **WHEN** inspecting `_includes/head.html`
- **THEN** the CSS link tag uses `{% asset assets/css/main.css %}` instead of direct URL

#### Scenario: JS reference uses asset helper
- **WHEN** inspecting templates that include JavaScript
- **THEN** script tags use `{% asset assets/js/<filename>.js %}` instead of direct URLs

### Requirement: Asset fingerprint plugin
The system SHALL have a plugin at `_plugins/asset_fingerprint.rb` that provides `{% asset %}` Liquid tag.

#### Scenario: Plugin generates fingerprinted files
- **WHEN** the site builds
- **THEN** fingerprinted copies of CSS and JS files are created in `_site/assets/` only (not in source directory)

#### Scenario: Plugin works with SASS pipeline
- **WHEN** the site builds
- **THEN** plugin finds `.scss` source when `.css` is not yet compiled
