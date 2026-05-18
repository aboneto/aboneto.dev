## MODIFIED Requirements

### Requirement: Robots.txt
The system SHALL have a `robots.txt` generated as a Jekyll template that uses `{{ site.url }}` for the sitemap reference, allowing all crawlers and referencing the sitemap dynamically.

#### Scenario: Robots allows crawling
- **WHEN** requesting `/robots.txt`
- **THEN** it contains `User-agent: *`, `Allow: /`, and `Sitemap: {{ site.url }}/sitemap.xml`

#### Scenario: Robots uses site URL from config
- **WHEN** the `url` value in `_config.yml` changes
- **THEN** the `robots.txt` sitemap reference updates automatically on next build
