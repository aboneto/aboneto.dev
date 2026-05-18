## Context

El proyecto Jekyll actual usa URLs estáticas para assets (`/assets/css/main.css`, `/assets/js/menu.js`). Los assets se compilan con SASS y se minifican con `jekyll-minifier`, pero no tienen fingerprinting. Los usuarios experimentan problemas de caché cuando se despliegan cambios de CSS/JS.

## Goals / Non-Goals

**Goals:**
- Agregar fingerprinting automático (hash MD5) a URLs de CSS y JS
- Mantener la estructura de directorios existente (`assets/`)
- No interferir con `jekyll-minifier` (minificación existente)
- Helper simple `{% asset %}` para templates

**Non-Goals:**
- Bundling de múltiples archivos (ya lo hace el pipeline existente)
- Migrar a Webpack, Vite u otro bundler externo
- Cambiar la estructura de directorios de SASS
- Soporte para CDN o externalización de assets

## Decisions

### 1. Plugin personalizado en `_plugins/`

**Alternativas consideradas:**
- `jekyll-assets`: No compatible con Jekyll 4.x (v3.x soporta < 4.0, v1.x tiene conflictos con jekyll-gzip)
- `jekyll-minibundle`: Más complejo, requiere configurar minificador externo (redundante con jekyll-minifier)

**Decisión:** Plugin personalizado porque:
- Sin dependencias externas
- Compatible con Jekyll 4.x
- No conflictos con `jekyll-minifier`
- Simple y mantenible (~60 líneas)

### 2. Implementación del plugin

El plugin `_plugins/asset_fingerprint.rb`:
1. Registra un Liquid tag `{% asset %}`
2. Al renderizar, calcula MD5 del archivo fuente
3. Copia el archivo con hash al directorio de destino
4. Retorna la URL con hash

```ruby
module Jekyll
  class AssetFingerprint < Liquid::Tag
    def render(context)
      site = context.registers[:site]
      source = File.join(site.source, @asset_path)
      digest = Digest::MD5.hexdigest(File.read(source))[0..7]
      ext = File.extname(@asset_path)
      base = File.basename(@asset_path, ext)
      dir = File.dirname(@asset_path)
      "#{dir}/#{base}-#{digest}#{ext}"
    end
  end
end
Liquid::Template.register_tag('asset', Jekyll::AssetFingerprint)
```

### 3. Mantener estructura existente

No mover archivos. El plugin trabaja con la estructura actual:
- `assets/css/main.css` → generado por SASS
- `assets/js/*.js` → archivos estáticos

El plugin copia estos archivos con hash a `_site/assets/`.

## Risks / Trade-offs

- **[Riesgo]** Plugin no copia archivos si no existe directorio destino → **Mitigación:** Crear directorios con `FileUtils.mkdir_p`
- **[Riesgo]** Build lento si hay muchos archivos → **Mitigación:** Solo procesar CSS/JS, no imágenes
- **[Trade-off]** No soporta bundling → Aceptable, no es necesario actualmente
- **[Trade-off]** Hash corto (8 chars) vs MD5 completo → Suficiente para cache-busting
