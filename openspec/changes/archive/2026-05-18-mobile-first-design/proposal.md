## Why

The blog's CSS uses a desktop-first approach with `$page-padding: 56px` as default and mobile as an afterthought. This causes poor mobile experiences: text overflow, small touch targets, and suboptimal performance on mobile devices (which represent a significant portion of blog traffic). Implementing mobile-first CSS ensures the base experience works on all devices and progressively enhances for larger screens.

## What Changes

- Refactor all SCSS partials to use `min-width` media queries instead of `max-width`
- Establish mobile base styles as the default (320px+)
- Add tablet breakpoint (768px) and desktop breakpoint (1024px) enhancements
- Ensure touch-friendly targets (min 48x48px) on interactive elements
- Optimize page weight and performance for mobile networks
- Update `_variables.scss` with mobile-first spacing tokens

## Capabilities

### New Capabilities

- `mobile-first-css`: Refactored CSS architecture using mobile-first progressive enhancement with min-width media queries

### Modified Capabilities

- `terminal-theme`: Update theme styles to use mobile-first approach (base styles for mobile, enhanced for desktop)

## Impact

- All SCSS files in `_sass/` need refactoring
- Layout files in `_layouts/` may need结构调整
- No backend/API changes
- No breaking changes to content structure
- Performance improvement on mobile devices
