## MODIFIED Requirements

### Requirement: Responsive design
The system SHALL be responsive from mobile (320px) to desktop (1440px+), using mobile-first CSS with `min-width` media queries. Base styles SHALL target 320px viewports with progressive enhancement at 768px (tablet) and 1024px (desktop).

#### Scenario: Mobile layout is the foundation
- **WHEN** viewport is below 768px
- **THEN** all content renders in a single-column layout with compact spacing, full-width elements, and 48px minimum touch targets

#### Scenario: Tablet layout enhances
- **WHEN** viewport reaches 768px
- **THEN** grid layouts expand to two columns where appropriate, spacing increases, and navigation may show more items

#### Scenario: Desktop layout maximizes
- **WHEN** viewport reaches 1024px
- **THEN** multi-column layouts are fully active, container max-widths apply, and hover states become available
