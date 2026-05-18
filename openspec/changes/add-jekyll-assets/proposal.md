## Why

Actualmente los assets (CSS, JS) se referencian con URLs estáticas como `/assets/css/main.css`. Esto causa problemas de caché del navegador: cuando se actualizan los archivos, los usuarios pueden seguir viendo versiones anteriores hasta que limpien la caché manualmente. Agregar fingerprinting (hash) a las URLs de assets resuelve esto automáticamente — el navegador descarga la nueva versión cuando el hash cambia.

## What Changes

- Crear plugin personalizado `_plugins/asset_fingerprint.rb` para cache-busting con MD5
- Proveer helper `{% asset %}` para generar URLs con hash
- Actualizar templates para usar el nuevo helper
- No cambiar estructura de directorios existente (`assets/` se mantiene)

## Capabilities

### New Capabilities
- `asset-fingerprint`: Cache-busting automático para CSS/JS mediante plugin personalizado con hash MD5

### Modified Capabilities
- `jekyll-foundation`: Se modifica la forma en que se referencian los assets en templates (de URLs estáticas a helper `{% asset %}`)

## Impact

- **_plugins/**: Nuevo archivo `asset_fingerprint.rb` (~60 líneas)
- **_includes/head.html**: Cambiar `<link>` para usar `{% asset %}`
- **_layouts/default.html**: Cambiar `<script>` tags para usar `{% asset %}`
- **Build time**: Incremento mínimo por cálculo de MD5
- **Sin cambios en**: Gemfile, estructura de directorios, configuración de `jekyll-minifier`
