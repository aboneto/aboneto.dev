## Context

El proyecto aboneto.dev tiene un mockup completo en `mockup/` con 5 pantallas (home, post, categoría, archivo, menú) usando React + Babel standalone. El diseño usa una estética terminal editorial con dark blue (`#0a1530`), tipografías IBM Plex Sans/Mono, y un vibe de IDE/dev con prompts `$`, frontmatter YAML visible, y breadcrumbs tipo path.

El sitio actual es solo un prototipo visual — no tiene build system, no es estático, no tiene SEO. Necesitamos un sitio Jekyll funcional que replique este diseño fielmente.

**Constraints:**
- Sin React — Jekyll puro con layouts Liquid
- JS vanilla si se necesita interactividad
- SEO y rendimiento son prioridad alta
- Posts en español
- Código en inglés (variables, funciones, archivos)
- Imágenes en WebP via `scripts/convert_to_webp.sh`
- **Sin estilos inline** — nunca usar `style=""` en HTML, todo via clases o selectores de tag en archivos SASS
- **Sin critical CSS inline** — CSS completo via `<link>`, no `<style>` en `<head>`
- **JSON-LD manejado por `jekyll-seo-tag`** — no crear structured data manual

## Goals / Non-Goals

**Goals:**
- Sitio Jekyll funcional que replique las 5 pantallas del mockup
- Rendimiento: carga rápida, imágenes optimizadas, CSS via `<link>` (no inline)
- SEO completo: meta tags, Open Graph, JSON-LD (via jekyll-seo-tag), sitemap, RSS
- Mantener la identidad visual terminal editorial intacta
- Deployment-ready para GitHub Pages u hosting estático

**Non-Goals:**
- CMS o panel de administración (posts se escriben en Markdown directo)
- Comentarios o sistema de usuarios
- JavaScript framework (React, Vue, etc.)
- Migración de contenido existente (solo estructura, contenido de ejemplo)
- Internacionalización (solo español por ahora)

## Decisions

### 1. Jekyll con SASS indented syntax

**Decisión:** Usar Jekyll con `jekyll-sass` y sintaxis SASS indented (no SCSS).

**Rationale:** El mockup ya tiene un CSS extenso y bien estructurado. SASS indented es más limpio para archivos grandes y el proyecto AGENTS.md ya menciona SASS como parte del stack. La sintaxis indented reduce ruido visual y es más fácil de mantener para un blog personal.

**Alternativas consideradas:**
- SCSS: Más popular pero más verboso para este volumen de CSS
- CSS puro con custom properties: Limitado para la complejidad del tema
- PostCSS: Overkill para un blog estático

### 2. Estructura de layouts anidados

**Decisión:** Usar layouts anidados de Jekyll: `default.html` → `home.html` / `post.html` / `category.html` / `archive.html`.

**Rationale:** Permite compartir el shell común (head, topbar, footer) y aislar la lógica de cada pantalla. Liquid permite herencia de layouts y el frontmatter controla qué layout usa cada página.

### 3. Datos del blog en `_data/` YAML

**Decisión:** Mover `blog-data.js` a archivos YAML en `_data/`: `author.yml`, `categories.yml`, y posts como archivos Markdown en `_posts/`.

**Rationale:** Jekyll tiene soporte nativo para datos YAML en `_data/`. Los posts usan frontmatter YAML estándar. Elimina la necesidad de un archivo JS de datos y aprovecha el sistema de colecciones de Jekyll.

### 4. JS vanilla para interacciones

**Decisión:** Un único archivo `assets/js/main.js` con módulos para: menú hamburguesa overlay, búsqueda client-side (filtro sobre JSON generado), y filtros de categoría.

**Rationale:** Las interacciones son simples (toggle de overlay, filtro de lista). JS vanilla evita dependencias y mantiene el bundle pequeño. Se puede usar `defer` para no bloquear render.

### 5. Búsqueda client-side con JSON generado

**Decisión:** Generar un `search.json` en el build de Jekyll que liste títulos, excerpts, categorías y URLs de posts. El JS hace fetch de este archivo y filtra client-side.

**Rationale:** Para un blog personal con <100 posts, no necesita un servicio de búsqueda externo. El JSON generado en build es estático y cacheable. Alternativas como Algolia o Lunr.js son overkill.

### 6. Plugins de Jekyll

**Decisión:** Configurar los siguientes plugins en el `Gemfile` y `_config.yml`:

| Plugin | Propósito |
|--------|-----------|
| `jekyll-paginate` | Paginación del listado principal (home y categoría) — genera `/page2/`, `/page3/`, etc. |
| `jekyll-archives` | Genera páginas automáticas por categoría (`/categoria/arquitectura/`) y por fecha (`/2026/`) — reemplaza la necesidad de crear páginas manuales por cada categoría. |
| `jekyll-gzip` | Genera archivos `.gz` precomprimidos en el build para servir con `Content-Encoding: gzip` — mejora tiempo de transferencia. |
| `jekyll-minifier` | Minifica HTML, CSS y JS en el build — reduce tamaño de salida sin runtime overhead. |
| `jekyll-feed` | Genera `feed.xml` para suscriptores RSS. |
| `jekyll-sitemap` | Genera `sitemap.xml` para crawlers. |
| `jekyll-seo-tag` | Inyecta meta tags de SEO en el `<head>`. |

**Rationale:** `jekyll-paginate` es esencial para el home que muestra un featured + lista de posts recientes con paginación. `jekyll-archives` genera automáticamente las páginas de categoría que el mockup muestra (cada slug de categoría con su listado de posts). `jekyll-gzip` y `jekyll-minifier` optimizan rendimiento sin runtime cost. Los tres de SEO (`feed`, `sitemap`, `seo-tag`) son estándar para blogs.

**Nota sobre `github-pages`:** La gem `github-pages` NO soporta `jekyll-archives`, `jekyll-gzip` ni `jekyll-minifier`. Por eso se usa GitHub Actions directo (ver decisión 7).

### 7. CI/CD con GitHub Actions (no `github-pages` gem)

**Decisión:** Usar un workflow de GitHub Actions en `.github/workflows/jekyll.yml` que haga `bundle install` + `jekyll build` + deploy a GitHub Pages, en vez de depender de la gem `github-pages`.

**Rationale:** La gem `github-pages` tiene un set limitado de plugins y versiones fijas. Nuestros plugins (`jekyll-archives`, `jekyll-gzip`, `jekyll-minifier`) no están soportados. Con GitHub Actions controlamos las versiones exactas de Ruby, Jekyll y todos los plugins.

**Pipeline:**
```yaml
# Trigger: push a main
# Steps:
#   1. actions/checkout
#   2. ruby/setup-ruby (3.2)
#   3. bundle install
#   4. jekyll build
#   5. actions/upload-pages-artifact
#   6. actions/deploy-pages
```

**Configuración en repo:**
- Settings → Pages → Source: "GitHub Actions" (no "Deploy from a branch")
- Permisos: `contents: read`, `pages: write`, `id-token: write`

### 8. Configuración base de Jekyll

**Decisión:** Establecer la siguiente configuración base en `_config.yml`:

```yaml
paginate: 12
paginate_path: "artigos/:num/"
permalink: /:title

sass:
  style: compressed

jekyll-archives:
  enabled:
    - categories
  layouts:
    category: category
  permalinks:
    category: /categoria/:name/
```

**Rationale:**
- `paginate: 12` — 12 posts por página, balance entre carga y navegación
- `paginate_path: "artigos/:num/"` — paginación en portugués (coherente con el path del blog)
- `permalink: /:title` — URLs limpias sin fecha, SEO-friendly
- `sass: style: compressed` — CSS minificado en producción
- `jekyll-archives` solo para categorías (no fechas) — permalink `/categoria/:name/` usando layout `category`

## Risks / Trade-offs

- **[Riesgo]** El CSS del mockup es extenso (414 líneas) y complejo → **Mitigación:** Modularizar en SASS parciales (`_variables`, `_topbar`, `_hero`, `_reader`, etc.)
- **[Riesgo]** Búsqueda client-side no escala para muchos posts → **Mitigación:** Para <100 posts es suficiente; se puede migrar a Algolia después
- **[Riesgo]** El mockup usa `postImageStyle()` con gradientes generados → **Mitigación:** Implementar como SASS mixin que genera gradientes determinísticos basados en slug
- **[Trade-off]** Sin JS framework = más trabajo manual para interactividad → Aceptable porque las interacciones son mínimas y el rendimiento es prioridad
- **[Trade-off]** Jekyll build time crece con posts → Mitigado con `incremental builds` y la escala de un blog personal

## Migration Plan

1. Inicializar Jekyll en la raíz del repo (no en subdirectorio)
2. Crear estructura de directorios y archivos de configuración
3. Implementar layouts y SASS paso a paso (home → post → category → archive → menu)
4. Agregar contenido de ejemplo basado en `blog-data.js`
5. Configurar plugins de SEO
6. Verificar con `bundle exec jekyll serve` y comparar visualmente con el mockup
7. Limpiar o marcar `mockup/` como referencia

## Open Questions

- ¿El sitio debe servir desde la raíz del repo o en un subdirectorio? (Asumido: raíz)
- ¿Mantener el directorio `mockup/` o archivarlo? (Asumido: mantener como referencia)
