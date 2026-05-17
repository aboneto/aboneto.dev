# aboneto.dev

Blog personal de tecnología de Antonio Barbosa — Software Engineer con más de 19 años de experiencia en arquitectura de software, infraestructura, IA aplicada y liderazgo técnico.

**URL:** [https://aboneto.dev](https://aboneto.dev)

## Tech Stack

- **Framework:** [Jekyll 4.3](https://jekyllrb.com/)
- **Estilos:** SCSS (Sass compressed)
- **Despliegue:** GitHub Pages + GitHub Actions
- **Plugins:**
  - `jekyll-feed` — Generación de RSS/Atom
  - `jekyll-sitemap` — Sitemap XML automático
  - `jekyll-seo-tag` — Meta tags SEO
  - `jekyll-paginate` — Paginación de posts
  - `jekyll-archives` — Archivos por categoría
  - `jekyll-gzip` — Compresión Gzip
  - `jekyll-minifier` — Minificación de HTML/CSS/JS

## Prerrequisitos

- [Ruby](https://www.ruby-lang.org/) >= 3.2
- [Bundler](https://bundler.io/) (`gem install bundler`)
- [Jekyll](https://jekyllrb.com/) (`gem install jekyll`)

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/aboneto/aboneto.dev.git
cd aboneto.dev

# Instalar dependencias
bundle install
```

## Desarrollo Local

```bash
# Iniciar servidor de desarrollo
bundle exec jekyll serve

# Abrir en el navegador
open http://localhost:4000
```

Jekyll detecta cambios automáticamente y regenera el sitio.

## Estructura del Proyecto

```
aboneto.dev/
├── _config.yml          # Configuración principal de Jekyll
├── _data/               # Datos globales (autor, etc.)
├── _includes/           # Componentes reutilizables
├── _layouts/            # Plantillas de página
├── _posts/              # Artículos del blog (Markdown)
├── _sass/               # Estilos SCSS
├── assets/              # Recursos estáticos
│   ├── css/             # CSS compilado
│   ├── images/          # Imágenes raw (input)
│   ├── img/             # Imágenes WebP (output, referenciar aquí)
│   └── js/              # JavaScript
├── scripts/             # Scripts de automatización
└── .github/workflows/   # CI/CD (GitHub Actions)
```

## Imágenes

Las imágenes siguen un flujo obligatorio:

1. Depositar imágenes raw (PNG, JPG) en `assets/images/`
2. Ejecutar el script de conversión:
   ```bash
   ./scripts/convert_to_webp.sh
   ```
3. Referenciar siempre la versión `.webp` en `assets/img/`

> **NUNCA** referenciar imágenes raw directamente en el código.

## Despliegue

El despliegue es automático via **GitHub Actions** al hacer push a `master`:

1. GitHub Actions instala Ruby y las dependencias
2. Jekyll genera el sitio estático con `JEKYLL_ENV=production`
3. El artefacto se sube a GitHub Pages
4. El sitio está disponible en [https://aboneto.dev](https://aboneto.dev)

## Comandos Útiles

```bash
# Servidor de desarrollo
bundle exec jekyll serve

# Build de producción local
JEKYLL_ENV=production bundle exec jekyll build

# Convertir imágenes a WebP
./scripts/convert_to_webp.sh
```

## Licencia

Este proyecto está bajo la Licencia MIT — ver el archivo [LICENSE](LICENSE) para más detalles.
