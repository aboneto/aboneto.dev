## Why

El blog personal de aboneto.dev tiene un mockup visual completo (estilo terminal editorial, dark blue, IBM Plex) pero está construido en React con Babel standalone — inutilizable en producción. Necesitamos inicializar un sitio Jekyll estático que replique fielmente el diseño del mockup, optimizado para SEO y rendimiento, sin dependencias JavaScript innecesarias.

## What Changes

- Inicializar proyecto Jekyll desde cero con estructura de directorios estándar
- Implementar layouts y includes que reproduzcan el diseño terminal editorial del mockup (topbar con prompt `$`, hero con featured post, listado de posts, author section, footer, menú overlay, categoría, archivo/búsqueda, lector de post)
- Migrar la paleta de colores y tipografías (IBM Plex Sans + Mono) del CSS del mockup a SASS
- Crear el sistema de posts con frontmatter YAML visible en el diseño (estilo IDE/dev)
- Implementar las 5 pantallas del mockup como layouts de Jekyll: home, post, categoría, archivo, menú
- JS vanilla para interacciones (menú hamburguesa, búsqueda client-side, filtros de categoría)
- Configurar SEO completo: meta tags, Open Graph, structured data (JSON-LD), sitemap, robots.txt, RSS feed
- Imágenes en formato WebP con lazy loading

## Capabilities

### New Capabilities
- `jekyll-foundation`: Inicialización del proyecto Jekyll — Gemfile, config, estructura de directorios, SASS pipeline
- `terminal-theme`: Tema visual terminal editorial — layouts, includes, SASS con paleta del mockup, tipografías IBM Plex
- `blog-content`: Sistema de contenido — colecciones de posts, categorías, frontmatter, datos del autor
- `client-interactions`: Interactividad con JS vanilla — menú hamburguesa overlay, búsqueda client-side, filtros de categoría
- `seo-infrastructure`: SEO técnico — meta tags, Open Graph, JSON-LD, sitemap, RSS, robots.txt

### Modified Capabilities

## Impact

- **Nuevo**: Estructura completa de proyecto Jekyll (`_config.yml`, `Gemfile`, `_layouts/`, `_includes/`, `_sass/`, `_posts/`, `assets/`), pipeline CI/CD con GitHub Actions (`.github/workflows/jekyll.yml`)
- **Dependencias**: Jekyll + plugins (jekyll-feed, jekyll-sitemap, jekyll-seo-tag, jekyll-paginate, jekyll-archives, jekyll-gzip, jekyll-minifier), SASS
- **CI/CD**: GitHub Actions workflow con `bundle install` directo (no gem `github-pages`) para soportar todos los plugins
- **Archivos mockup**: El directorio `mockup/` se mantiene como referencia; el sitio Jekyll es independiente
- **SEO**: URLs limpias, sitemap XML, RSS feed, structured data para artículos de blog
