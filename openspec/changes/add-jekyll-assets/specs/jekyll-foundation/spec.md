## MODIFIED Requirements

### Requirement: Gemfile with all required plugins
The system SHALL have a `Gemfile` that declares `jekyll` and all plugins: `jekyll-feed`, `jekyll-sitemap`, `jekyll-seo-tag`, `jekyll-paginate`, `jekyll-archives`, `jekyll-gzip`, `jekyll-minifier`, `jekyll-assets`.

#### Scenario: Bundle install succeeds
- **WHEN** running `bundle install`
- **THEN** all gems resolve without conflicts

#### Scenario: Plugins are loaded
- **WHEN** building the site
- **THEN** all plugins execute their respective generators/transformers (sitemap.xml exists, feed.xml exists, archives are generated, gzip files are created, HTML is minified, assets are fingerprinted)

### Requirement: Configuration file
The system SHALL have a `_config.yml` with site metadata (title, description, url, author), plugin configuration, SASS settings (`sass.style: compressed`), pagination config (`paginate: 12`, `paginate_path: "articulos/:num/"`), permalink structure (`permalink: /:title`), archive configuration (`jekyll-archives` enabled for categories only, layout `category`, permalink `/categoria/:name/`), `exclude` list, and assets configuration (`assets:` with `digest: true`, `sources`, `caching`, and `compress` settings).

#### Scenario: Site metadata is accessible
- **WHEN** any template references `site.title` or `site.description`
- **THEN** the configured values are rendered

#### Scenario: Pagination is configured
- **WHEN** the home page uses `paginator.posts`
- **THEN** posts are paginated with 12 per page and pagination URLs follow `/articulos/:num/` pattern

#### Scenario: Permalink structure
- **WHEN** a post is published
- **THEN** its URL is `/:title/` (no date prefix)

#### Category archives configuration
- **WHEN** building the site
- **THEN** `jekyll-archives` generates pages at `/categoria/<name>/` using the `category` layout

#### Scenario: Assets are configured
- **WHEN** inspecting `_config.yml`
- **THEN** `assets.digest` is `true`, `assets.sources` includes `_assets/css`, `_assets/js`, `_assets/img`, and `assets.compress` has `css: true` and `js: true`

### Requirement: SASS pipeline
The system SHALL compile SASS from `_assets/css/` into fingerprinted CSS files via `jekyll-assets` pipeline.

#### Scenario: SASS compiles with fingerprinting
- **WHEN** the site builds
- **THEN** SASS partials are compiled into fingerprinted CSS files in `_site/assets/css/` with MD5 hash in filename

#### Scenario: CSS is referenced via asset helper
- **WHEN** templates include CSS
- **THEN** `{% asset main.css %}` generates a fingerprinted URL
