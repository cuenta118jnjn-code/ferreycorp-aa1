# Maquinaria — planta baja (Ferreycorp AA1)

Dos piezas teardown navegables, integradas en la planta baja de la página
(`#maquinaria` en `index.html`). Son **copias intactas, sin modificar**; los
originales viven en su sitio y no se tocan.

## Archivos

| Copia (despliegue) | Original | md5 |
|---|---|---|
| `v8.html` (825 413 B) | `~/workspace/your_files/teardown_ejemplos_originales/V8_original_de_Elvar.html` | `3fdcef3dfdea1b0c42484781423965c6` |
| `cargador.html` (2 543 537 B) | `~/workspace/sala_de_jefes/jefe-2/entregas/ferreycorp-web/CARGADOR-v2-ENSAMBLAJE-R2.html` (commit `68aa3b8`) | `2cd2871c4b54d8c55d1c01db6f19cdcf` |

## Cada pieza, ya montada en su escenario

- **V8 (Elvar, ejemplo de la skill teardown, MIT):** estudio gris claro,
  sombra suave en el suelo, simulación en marcha a 700 RPM, orden de
  encendido 1-8-4-3-6-5-7-2, 5.8 L, 90° cross-plane. Controles propios:
  tour automático, orbitar, vistas HERO/FRONT/SIDE/VALLEY/CYL, corte
  GLASS/SECTION/SOLID, H oculta los datos.
- **Cargador WL-2 (JEFE-2, ensamblaje R2):** piso circular crema, niebla,
  luz cálida, entorno PBR, sombra de contacto; 1 792 componentes en 8
  grupos; articulación ±35°, levante 0–45°, inclinación −10°…+40°,
  despiece 0–9; botones DEMO, CINE, CÁMARA AUTO. Auditoría del cazador:
  0 errores, cinemática cerrada (`CAZADOR-R2-MEDIDAS.json` en el cuartel).

Ninguna flota en blanco: ambas traen piso, sombra y luz de estudio en su
propio archivo. Por eso no se inyectó escenario: modificarlas habría
alterado piezas aprobadas (el Cargador tiene el «Ok pasa bro» del dueño).

## Tratamiento ref. 8 (@francobeltramella)

El tratamiento cinematográfico vive en el envoltorio y en la excavadora
de la torre, no dentro de los archivos:

- Marco de visor oscuro + velo dorado + etiqueta técnica corta
  («MOTOR V8 · FOUR-STROKE» / «CARGADOR · 1 792 PIEZAS») sobre cada iframe.
- Excavadora de la torre: luz de cine dorada que sube solo en planta baja,
  cámara macro cuando está armada (14 u) que retrocede al desarmar (20 u),
  etiqueta «DESPIECE · 12 PIEZAS» que sigue al cucharón.

## Despliegue

Subir con el resto de la web (GitHub Pages, repo `cuenta118jnjn-code/ferreycorp-aa1`):
`index.html`, `hero.mp4`, `musica.mp3`, `poster.jpg`, `cover-first.jpg`,
`LICENSE_MUSICA.md` y esta carpeta `maquinaria/` completa. Los iframes son
rutas relativas (`maquinaria/v8.html`, `maquinaria/cargador.html`) y se
cargan con `loading="lazy"`.
