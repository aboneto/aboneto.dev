## ADDED Requirements

### Requirement: Jekyll project initialization
The system SHALL have a fully functional Jekyll project at the repository root with standard directory structure (`_layouts/`, `_includes/`, `_sass/`, `_posts/`, `_data/`, `assets/`).

#### Scenario: Build succeeds
- **WHEN** running `bundle exec jekyll build`
- **THEN** the site builds without errors and generates `_site/` output

#### Scenario: Dev server starts
- **WHEN** running `bundle exec jekyll serve`
- **THEN** the site is accessible at `localhost:4000` and renders the home page

### Requirement: Gemfile with all required plugins
The system SHALL have a `Gemfile` that declares `jekyll` and all plugins: `jekyll-feed`, `jekyll-sitemap`, `jekyll-seo-tag`, `jekyll-paginate`, `jekyll-archives`, `jekyll-gzip`, `jekyll-minifier`.

#### Scenario: Bundle install succeeds
- **WHEN** running `bundle install`
- **THEN** all gems resolve without conflicts

#### Scenario: Plugins are loaded
- **WHEN** building the site
- **THEN** all plugins execute their respective generators/transformers (sitemap.xml exists, feed.xml exists, archives are generated, gzip files are created, HTML is minified)

### Requirement: Configuration file
The system SHALL have a `_config.yml` with site metadata (title, description, url, author), plugin configuration, SASS settings (`sass.style: compressed`), pagination config (`paginate: 12`, `paginate_path: "artigos/:num/"`), permalink structure (`permalink: /:title`), archive configuration (`jekyll-archives` enabled for categories only, layout `category`, permalink `/categoria/:name/`), and `exclude` list.

#### Scenario: Site metadata is accessible
- **WHEN** any template references `site.title` or `site.description`
- **THEN** the configured values are rendered

#### Scenario: Pagination is configured
- **WHEN** the home page uses `paginator.posts`
- **THEN** posts are paginated with 12 per page and pagination URLs follow `/artigos/:num/` pattern

#### Scenario: Permalink structure
- **WHEN** a post is published
- **THEN** its URL is `/:title/` (no date prefix)

#### Category archives configuration
- **WHEN** building the site
- **THEN** `jekyll-archives` generates pages at `/categoria/<name>/` using the `category` layout

### Requirement: SASS pipeline
The system SHALL compile SASS indented syntax from `_sass/` into a single CSS file at `assets/css/main.css`.

#### Scenario: SASS compiles
- **WHEN** the site builds
- **THEN** `_sass/` partials are compiled into `assets/css/main.css` without errors

### Requirement: Excluded directories
The system SHALL exclude `mockup/`, `.agents/`, `.claude/`, `.opencode/`, `.rtk/`, `openspec/`, and `scripts/` from the Jekyll build via `exclude` in `_config.yml`.

#### Scenario: Excluded files are not in output
- **WHEN** building the site
- **THEN** `_site/` does not contain any excluded directories

### Requirement: GitHub Actions CI/CD pipeline
The system SHALL have `.github/workflows/jekyll.yml` that builds and deploys the site to GitHub Pages using `bundle install` directly (NOT the `github-pages` gem), to support all plugins including `jekyll-archives`, `jekyll-gzip`, and `jekyll-minifier`.

#### Workflow triggers
The workflow SHALL trigger on push to `main` branch and allow manual dispatch.

#### Workflow steps
The workflow SHALL: checkout code, setup Ruby 3.2+, `bundle install`, `bundle exec jekyll build`, upload `_site/` as Pages artifact, deploy to GitHub Pages.

#### Required permissions
The workflow SHALL request `contents: read`, `pages: write`, and `id-token: write` permissions.

#### Scenario: Workflow file exists
- **WHEN** the repository is pushed to GitHub
- **THEN** `.github/workflows/jekyll.yml` is recognized as a valid workflow

#### Scenario: Build succeeds in CI
- **WHEN** the workflow runs
- **THEN** `bundle install` and `jekyll build` complete without errors

#### Scenario: Deploy succeeds
- **WHEN** the build completes
- **THEN** the site is deployed to GitHub Pages and accessible at the configured URL

### Requirement: 404 error page
The system SHALL have a `404.html` page at the repository root with `layout: default` that displays a terminal-styled error message.

#### Scenario: 404 page is generated
- **WHEN** building the site
- **THEN** `_site/404.html` exists and uses the default layout

#### Scenario: 404 page displays correctly
- **WHEN** navigating to a non-existent URL
- **THEN** the 404 page renders with terminal styling and a clear "not found" message

### Requirement: Styling conventions
All styling MUST be defined in SASS files and compiled to CSS. No inline `style=""` attributes on HTML elements. Tag-level selectors (e.g., `h1 { }`, `p { }`) are allowed in SASS — the rule is about WHERE styles are defined (CSS files), not WHICH selectors are used.

#### Scenario: No inline styles in templates
- **WHEN** inspecting any layout or include file
- **THEN** no HTML elements have inline `style=""` attributes

#### Scenario: Styles are in SASS files
- **WHEN** inspecting the codebase
- **THEN** all visual styling is defined in `_sass/` partials, not in HTML templates
