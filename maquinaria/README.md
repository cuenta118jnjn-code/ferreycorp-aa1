# Maquinaria — planta baja (Ferreycorp AA1)

Dos piezas teardown navegables, integradas en la planta baja de la página
(`#maquinaria` en `index.html`). Son **copias de despliegue**: los originales
viven en su sitio y no se tocan jamás; la única diferencia entre copia y
original es la flecha para plegar el panel (ver § «Panel plegable»).

## Archivos

| Copia (despliegue) | Original | md5 |
|---|---|---|
| `v8.html` (825 413 B) | `~/workspace/your_files/teardown_ejemplos_originales/V8_original_de_Elvar.html` | `3fdcef3dfdea1b0c42484781423965c6` |
| `cargador.html` (2 543 537 B) | `~/workspace/sala_de_jefes/jefe-2/entregas/ferreycorp-web/CARGADOR-v2-ENSAMBLAJE-R2.html` (commit `68aa3b8`) | `2cd2871c4b54d8c55d1c01db6f19cdcf` |

md5 de las copias tras el cambio del panel (2026-11-11): `v8.html`
`b70c4af9f8af9eb3cfe3424f6739655c`, `cargador.html`
`3eeac4355c4973dc980e87fd03cbcd96`. Los originales conservan los md5 de la
tabla (verificados 2026-11-11).

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

## Panel plegable con flechita (orden de Jerzon, 2026-11-11 18:10)

Los paneles de control tapaban la máquina. Cada visor lleva ahora una
flechita en el borde del panel que lo pliega y lo abre; el panel arranca
CERRADO (máquina completa y visible) y un clic lo abre con TODOS sus
controles y funciones intactos. Otro clic lo vuelve a cerrar. No se quitó
ninguna función: ni un botón, ni un deslizador, ni un diagrama.

- **V8 (`v8.html`):** botón `#maqFoldTabV8` fijo en el borde derecho,
  centrado vertical (34×64 px, borde dorado #D99835). Dispara un
  `KeyboardEvent` sintético `keydown` con tecla `h`: es la vía propia de la
  app (su bucle reescribe el display del overlay cada fotograma, así que
  tocar el display directo no serviría). Sondea cada 200 ms hasta que
  aparece «DRAG TO ORBIT» y pulsa H una vez para dejar el overlay oculto
  por defecto; escucha teclas H reales para sincronizar la flecha. Flecha
  «‹» = panel oculto (clic lo muestra), «›» = panel visible (clic lo
  oculta). La flecha apunta en la dirección en que viaja el panel.
- **Cargador (`cargador.html`):** botón `#maqFoldTab` circular (38 px,
  borde dorado) que pliega `#panel` (380 px) con
  `transform:translateX(calc(-100% - 16px))` (clase `maq-folded`); plegado
  por defecto; al abrir, la pestaña se desliza al borde derecho del panel
  (left:406px). Flecha «›» = abre, «‹» = cierra.
- **Limpieza decorativa:** la etiqueta del V8 (`.viewer-tag` en
  `index.html`) subió de `bottom:16px` a `bottom:30px`: con 16 px rozaba el
  texto «DRAG TO ORBIT» del overlay (solape medido de 2 px en página); con
  30 px el hueco medido en página es de 12 px y no tapa los botones PAUSE.
- **Retiro del botón móvil viejo:** el IIFE de `index.html` que inyectaba
  «☰ Controles» solo en <720 px se retiró (competía con la flecha única);
  el pliegue es ahora un solo mecanismo en ambos visores. Textos de
  `.viewer-src` y de las fichas actualizados en consecuencia.
- **Dónde vive el cambio:** solo en las copias de `web/maquinaria/` y en
  `index.html` (CSS y textos). Los originales no se tocaron: sus md5 siguen
  siendo los de la tabla.

Verificación (Playwright + SwiftShader, escritorio 1280×720; capturas en
`web/verificacion_maquinaria/`):

- V8: panel cerrado por defecto (overlay sin «DRAG TO ORBIT», flecha «‹»,
  «Mostrar panel»); clic real abre (overlay visible, flecha «›»,
  «Ocultar panel»); clic real cierra (overlay sin «DRAG TO ORBIT»,
  flecha «‹»). Verificado también dentro de `index.html` (el iframe
  real). Visual a ojo: las 4 capturas 1280 están completas y revisadas
  (cerrado: motor completo, panel oculto, flecha «‹» en el borde derecho;
  abierto: overlay entero con todos sus controles — tour, vistas,
  corte, diagramas, PAUSE — y flecha «›»).
- Cargador: panel plegado por defecto (`maq-folded`, panelX −414, flecha
  «›», «Mostrar controles»); clic abre (`maq-folded` fuera, flecha «‹»,
  12/12 controles visibles: 4 deslizadores + 8 botones); deslizador
  Articulación responde (valor 20, la cabecera pasa a «Articulación 20°»);
  clic cierra (`maq-folded` de vuelta, flecha «›»). Visual a ojo: ambas
  capturas 1280 (cerrado: máquina completa, sin panel; abierto: panel
  entero con sus 4 deslizadores y 8 botones, máquina a la derecha).
  Nota de medida: el `panelX` leído por `getBoundingClientRect` justo
  tras el clic sigue en −414 porque la transición de 0,3 s aún no se ha
  compuesto bajo SwiftShader (el renderizador va a ~3 s por fotograma);
  la captura del abierto demuestra que el panel sí queda visible.
- 0 errores de consola en ambos visores.
- Nota de entorno: en esta VM las capturas 1280×720 de escenas WebGL
  pesadas tardan varios minutos cada una (SwiftShader, ~2,9 s por
  fotograma a 640×360); el original sin tocar tarda lo mismo, no es
  efecto del cambio. El navegador de pruebas se cayó dos veces a mitad
  de la captura larga del V8 (se reintentó con navegador fresco y
  `--disable-dev-shm-usage` hasta completarla).

## Aviso: `index.html` está en reconstrucción (2026-11-12 01:09)

Los tres retoques del envoltorio en `index.html` se aplicaron dos veces
y las dos veces los sobrescribió la reconstrucción en curso de la página
(la versión actual trae el IIFE móvil «☰ Controles» de vuelta, la
etiqueta del V8 en `bottom:16px` y los textos «archivo intacto, sin
modificar»). El mecanismo del pliegue vive en las copias y NO depende
de esos retoques, así que el cambio sigue funcionando; pero antes de
desplegar hay que re-aplicarlos (o fundirlos) sobre la versión final de
`index.html`:

1. Retirar el IIFE que inyecta «☰ Controles» en <720 px (compite con la
   flecha única de cada visor).
2. `.viewer-tag`: `bottom:16px` → `bottom:30px` (con 16 px roza «DRAG TO
   ORBIT» 2 px; con 30 px el hueco medido en página es de 12 px).
3. Textos `.viewer-src` y de las fichas: la copia añade solo la flecha;
   el original sigue intacto (ya no «archivo intacto, sin modificar»),
   y la vía principal para ocultar el panel del V8 es la flecha (H sigue
   valiendo dentro del visor).

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
