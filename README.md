# Informe Proveedor Seguro — Antofagasta Minerals

Sitio HTML modular. Cada informe (María Elena / Sierra Gorda) es un archivo independiente y se navega desde `index.html`.

## Estructura

```
/informe-html (esta carpeta)
  index.html                     ← portada estática de una sola pantalla (cabecera + pregunta + tarjetas de informe)
  README.md
  /assets
    /css
      styles.css                 ← sistema de diseño base (colores, tipografía, componentes)
      presentation.css           ← estilos específicos del formato "presentación / deck"
    /js
      presentation.js            ← navegación de láminas (flechas, teclado, puntos)
    /img
      logo-amsa.png, isotipo-amsa.png       ← logo genérico AMSA (usado en index.html)
      logo-antucoya.png                     ← logo de Antucoya (usado en el informe de María Elena)
      logo-centinela.png                    ← logo de Centinela (usado en el informe de Sierra Gorda)
      logo-dosbarbas-icon.png               ← ícono Dos Barbas (crédito "elaborado por")
  /chapters
    01-diagnostico-maria-elena.html    ← Informe María Elena
    02-diagnostico-sierra-gorda.html   ← Informe Sierra Gorda
  /_insumos                       ← archivos fuente cargados (md, excel, pdf de marca). No se publica, es solo referencia de trabajo.
```

## Identidad visual

Colores y tipografías tomados del **Manual de normas gráficas de Antofagasta Minerals**:

| Color | Uso | Hex |
|---|---|---|
| Rojo (Pantone 1795 C) | acento / alertas | `#DB282E` |
| Dorado (Pantone 124 C) | acento secundario | `#EDAA20` |
| Teal (Pantone 3145 C) | color primario | `#00788C` |
| Turquesa (Pantone 325 C) | apoyo / éxito | `#68C8C7` |
| Gris (Cool Gray 8) | texto secundario | `#8C8C8F` |

Tipografías institucionales AauxPro OSF / Univers LT Std no son de licencia libre para web; se sustituyeron por **Poppins** (títulos) e **Inter** (cuerpo de texto), con espíritu visual similar.

Cada informe usa el logo del sitio que le corresponde en su cabecera (topbar) y en la portada: **Antucoya** para María Elena, **Centinela** para Sierra Gorda — junto al ícono de **Dos Barbas** como crédito de elaboración. No se usa la palabra "capítulo" en ninguna parte del sitio; cada archivo se llama "informe".

## Cómo editar `index.html`

`index.html` es una página estática de una sola pantalla (sin scroll de láminas), pensada para caber completa en un solo vistazo:

1. **Cabecera** (`.site-header`) — logo, separador y título "Informes Proveedor Seguro".
2. **Pregunta principal** (`.question-hero`) — eyebrow, descripción breve del programa y el título "¿Qué informe quieres revisar?".
3. **Tarjetas de informe** (`.report-cards`) — una `<a class="report-card">` por informe, con franja de color superior, título, descripción corta y "Ver informe →". Para agregar un informe nuevo, copia uno de los bloques `<a class="report-card">` dentro de `.report-cards`.

## Cómo editar el informe de María Elena

Abre `chapters/01-diagnostico-maria-elena.html` en un editor de texto o VS Code:

- Cada `<section class="slide ...">` es una lámina de la presentación.
- Los textos marcados con la clase `fill-placeholder` o `fill-block` (fondo amarillo punteado) son **datos pendientes de completar** — reemplázalos por el dato real y, si quieres, quita la clase para que se vea como texto normal.
- Las tablas (`<table class="data-table">`) se editan agregando/quitando filas `<tr>`.
- Los `<span class="tag done">` / `<span class="tag pending">` controlan el color de los indicadores de estado.

No es necesario tocar `styles.css` ni `presentation.js` para editar contenido — solo el HTML del informe.

La navegación entre láminas es **solo** con la barra flotante inferior ("‹ Anterior" / "Siguiente ›" + puntos), o el teclado (flechas) — la rueda del mouse no cambia de lámina, solo hace scroll dentro de la lámina activa si su contenido es más alto que la pantalla. Cada lámina se muestra/oculta por completo (`.slide.active`); no hay scroll continuo entre ellas.

### Cronograma tipo Gantt (sesiones realizadas / restantes)

La lámina "Sesiones restantes del ciclo" de cada informe usa el componente `.gantt` (definido en `styles.css`) para mostrar las 10 fechas del ciclo en una línea de tiempo, con la posición de cada punto calculada según los días reales entre fechas (no en intervalos iguales). Para actualizarlo cuando cambien las fechas del calendario:

1. Calcula el número de días entre la primera y la última fecha del ciclo (ese es el 100%).
2. Para cada sesión, calcula `(días desde la primera fecha / total de días) * 100` y úsalo como `style="left:X%"` en su `.gantt-point`.
3. Marca con la clase `done` los `.gantt-point` de las sesiones ya confirmadas (agrega también el ancho correspondiente en `.gantt-track__fill`).
4. Ajusta `.gantt-today` a la posición de la fecha actual.

**Importante — caché del navegador:** los `<link>`/`<script>` de `assets/` se cargan con un parámetro de versión (`?v=2`). Si vuelves a editar `styles.css`, `presentation.css` o `presentation.js` y los cambios no se reflejan al recargar, sube ese número (`?v=3`) en los archivos HTML que los usan — el navegador puede quedarse con la versión vieja en caché.

## Cómo agregar un informe nuevo

1. Duplica `chapters/01-diagnostico-maria-elena.html` como `chapters/03-nombre-informe.html`.
2. Si es un informe tipo "reporte" (no presentación de láminas), usa la estructura de `.chapter-topbar` / `.chapter-hero` / `.chapter-body` de `styles.css` en vez de `.deck`/`.slide` (ver comentarios en `styles.css`).
3. Agrega una tarjeta nueva en `index.html` (dentro de `.report-cards`), copiando el bloque `<a class="report-card">` existente.
4. Actualiza el logo del sitio en la cabecera del nuevo informe (`.logos img`) y el título en `.title-block h1` (ej. "Informe [Nombre del sitio]").
5. Actualiza los enlaces cruzados ("Informe [otro sitio]") en el `deck-topbar` y en la lámina de cierre de los informes vecinos, para mantener la navegación cruzada.

## Cómo abrir el informe

Abre `index.html` directamente en el navegador (doble clic). No requiere servidor.

## Archivos que no deberías modificar sin necesidad

- `assets/css/styles.css` y `assets/css/presentation.css`: cambian el diseño de **todos** los informes a la vez.
- `assets/js/presentation.js`: lógica de navegación de láminas, compartida por todas las presentaciones tipo deck.
- `assets/img/logo-amsa.png`, `logo-antucoya.png`, `logo-centinela.png`, `logo-dosbarbas-icon.png`: logos oficiales extraídos de los manuales de marca — no reemplazar salvo que cambie la identidad de marca.

## Pendientes conocidos (ambos informes)

- **⚠ Calendario de clases desactualizado**: las tablas de "capacitaciones realizadas" y "por ejecutar" de ambos informes todavía usan las fechas de la primera versión de `CALENDARIO INTERNO - PROVEEDOR SEGURO (1) (2).xlsx`. Falta cargar la versión actualizada de ese archivo para refrescar ambas tablas.
- Columna **"Estado de diagnóstico"** (tablas de empresas) y columna **"Asistencia"** (tablas de sesiones, para las fechas aún no confirmadas): quedaron como `[completar]` a la espera de que se entreguen esos datos.
- La cifra de visitas finalizadas/pendientes en ambos informes proviene de los Excel de seguimiento más recientes, pero hay antecedentes de versiones anteriores con cifras distintas (ver historial de la conversación) — vale la pena una validación final con el equipo de terreno antes de presentar.
- Relación entre sesiones dictadas y módulos temáticos: es una estimación (María Elena) o directamente no estimada (Sierra Gorda, por falta de sesiones confirmadas) — validar con el facilitador Maiker Droguett.
- Sierra Gorda — avance de plataforma del Grupo 2 (5 personas) pendiente: solo se obtuvo su asistencia, no su avance en la plataforma asincrónica.
- Las citas de fuente ("Fuente: archivo.xlsx") se quitaron de las láminas por pedido explícito — la trazabilidad de cada dato queda documentada solo en este README y en el historial de la conversación, no en el HTML.
