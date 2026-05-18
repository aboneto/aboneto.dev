# Asset Fingerprint Plugin

Plugin personalizado para cache-busting de assets CSS y JS mediante hash MD5.

## Uso

En templates Liquid, usar el tag `{% asset %}` en lugar de URLs directas:

```html
<!-- CSS -->
<link rel="stylesheet" href="/{% asset assets/css/main.css %}">

<!-- JS -->
<script src="/{% asset assets/js/menu.js %}" defer></script>
```

## Output

El plugin genera URLs con hash de 8 caracteres:

```
/assets/css/main-e1cf83ff.css
/assets/js/menu-ceb04a1f.js
```

Los archivos fingerprinted se copian solo a `_site/`, no al directorio fuente.

## Cómo funciona

1. Al renderizar `{% asset path %}`, calcula MD5 del archivo fuente
2. Para CSS, busca el `.scss` correspondiente si el `.css` no existe aún
3. Usa hook `post_write` para copiar el archivo compilado con hash a `_site/`
4. Retorna la URL con hash al template

## Compatibilidad

- Compatible con `jekyll-minifier` (no interfiere con minificación)
- Compatible con pipeline SASS existente (`_sass/` → `assets/css/main.css`)
- No requiere cambios en Gemfile ni en `_config.yml`
