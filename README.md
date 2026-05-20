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

## Notificaciones Push (OneSignal)

El sitio envía notificaciones push a suscriptores cuando se publica un nuevo post via GitHub Actions.

### Setup inicial (una sola vez)

1. Crear una app en [onesignal.com](https://onesignal.com) (plataforma: Web Push, origin: `https://aboneto.dev`).
2. Copiar el **App ID** y pegarlo en `_config.yml` bajo `onesignal.app_id`.
3. Generar una **REST API Key** en OneSignal → Settings → Keys & IDs.
4. Añadir `ONESIGNAL_REST_API_KEY` como **Actions secret** en GitHub (Settings → Secrets and variables → Actions).
5. Añadir `ONESIGNAL_APP_ID` como **Actions variable** (no secret — es público).
6. Cambiar `onesignal.enabled: true` en `_config.yml` y hacer push.

### Rotación de la REST API Key

1. Generar nueva key en OneSignal dashboard.
2. Actualizar el secret `ONESIGNAL_REST_API_KEY` en GitHub Actions.
3. Revocar la key anterior en OneSignal.

### Opt-out por post

Añadir `notify: false` al front matter del post para que el workflow salte la notificación:

```yaml
---
title: "Mi artículo"
notify: false
---
```

### Re-trigger manual

Si el workflow falla por un error transitorio de OneSignal, se puede re-ejecutar desde la pestaña **Actions** en GitHub usando `workflow_dispatch`. El campo `before_sha` debe ser el SHA anterior al commit del post.

El script usa `external_id` basado en el permalink del post, por lo que OneSignal descarta duplicados automáticamente si el primer envío llegó a completarse.

### Troubleshooting

| Síntoma | Causa probable | Acción |
|---|---|---|
| El prompt de suscripción no aparece | `onesignal.enabled: false` o `app_id` vacío | Verificar `_config.yml` |
| El prompt aparece pero no se suscribe | Service worker no servido en `/OneSignalSDKWorker.js` | Verificar que el archivo esté en el build (`_site/`) |
| Workflow en rojo con `401 Unauthorized` | `ONESIGNAL_REST_API_KEY` mal configurado | Verificar el secret en GitHub |
| Workflow en rojo con `400 Bad Request` | `app_id` incorrecto o post sin `title` | Revisar los logs del step "Dispatch notifications" |
| Notificación no llega tras dispatch exitoso | Sin suscriptores aún, o navegador bloqueó permisos | Verificar suscriptores en el dashboard de OneSignal |

## Licencia

Este proyecto está bajo la Licencia MIT — ver el archivo [LICENSE](LICENSE) para más detalles.
