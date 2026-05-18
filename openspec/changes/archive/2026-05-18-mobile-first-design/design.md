## Context

The Jekyll blog currently uses a desktop-first CSS approach. The base styles in `_sass/` assume desktop viewports and use `max-width` media queries to adapt for mobile. This leads to:
- Mobile styles being overrides rather than the foundation
- Larger CSS payload on mobile (desktop defaults + mobile overrides)
- Inconsistent breakpoint usage across partials
- Touch targets not prioritized in base styles

The project already defines breakpoints in `_variables.scss` (`$bp-mobile: 320px`, `$bp-tablet: 768px`, `$bp-desktop: 1024px`, `$bp-wide: 1440px`) but uses them inconsistently.

## Goals / Non-Goals

**Goals:**
- Establish mobile (320px) as the default styling base
- Use `min-width` media queries exclusively for progressive enhancement
- Ensure all interactive elements have minimum 48x48px touch targets
- Maintain visual parity with the terminal/dev aesthetic on all screen sizes
- Reduce CSS specificity conflicts by simplifying media query logic

**Non-Goals:**
- Changing the visual design or aesthetic
- Adding new JavaScript functionality
- Modifying Jekyll build configuration
- Changing content structure or layouts

## Decisions

### Decision 1: Min-width media queries exclusively

**Choice**: Replace all `max-width` queries with `min-width` queries.

**Rationale**: Mobile-first CSS writes base styles for mobile and adds complexity for larger screens. This ensures mobile devices parse fewer CSS rules and larger screens get progressive enhancement.

**Alternative considered**: Mixed approach (some max-width, some min-width) — rejected because it creates confusion and makes maintenance harder.

### Decision 2: Three-tier breakpoint system

**Choice**: Use three tiers: mobile (base), tablet (`min-width: 768px`), desktop (`min-width: 1024px`).

**Rationale**: The existing `$bp-wide: 1440px` breakpoint can use `max-width` for container max-widths only. Three tiers simplify the mental model and reduce CSS complexity.

### Decision 3: Touch-first interactive elements

**Choice**: All buttons, links, and interactive elements MUST have `min-height: 48px` and `min-width: 48px` in base styles.

**Rationale**: Google's Material Design recommends 48dp touch targets. This is critical for mobile usability.

### Decision 4: Relative units for spacing

**Choice**: Use `rem` for font sizes, `vw`/`%` for container widths, `rem` for padding/margins.

**Rationale**: Relative units scale better across devices and respect user font-size preferences.

## Risks / Trade-offs

- **Visual regression risk**: Refactoring all SCSS partials may introduce visual differences → Mitigation: Visual regression testing on key pages before/after
- **Specificity conflicts**: Changing media query direction may affect CSS specificity → Mitigation: Audit specificity during refactoring
- **Time investment**: Touching all SCSS files is significant work → Mitigation: Prioritize high-traffic pages first (home, post, archive)
