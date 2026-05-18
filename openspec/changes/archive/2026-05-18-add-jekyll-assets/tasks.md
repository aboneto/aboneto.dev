## 1. Plugin de fingerprinting

- [x] 1.1 Crear directorio `_plugins/`
- [x] 1.2 Crear `_plugins/asset_fingerprint.rb` con Liquid tag `{% asset %}`
- [x] 1.3 Verificar que el plugin carga correctamente con `jekyll build`

## 2. Actualización de templates

- [x] 2.1 Actualizar `_includes/head.html` para usar `{% asset main.css %}`
- [x] 2.2 Actualizar `_layouts/default.html` para usar `{% asset %}` en scripts JS
- [x] 2.3 Verificar que no queden referencias directas a `assets/css/` o `assets/js/`

## 3. Verificación

- [x] 3.1 Ejecutar `bundle exec jekyll build` sin errores
- [x] 3.2 Verificar que `_site/assets/` contiene archivos con hash en el nombre
- [x] 3.3 Verificar que el HTML generado usa URLs con hash
- [x] 3.4 Ejecutar `bundle exec jekyll serve` y verificar que el sitio funciona
