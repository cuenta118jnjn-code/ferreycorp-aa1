#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Llena las 10 páginas de capítulo del edificio Ferreycorp con contenido del informe AA2."""
import os

BASE = os.path.expanduser("~/workspace/ferreycorp-aa1-site/portada-3d")

CSS = """
  @font-face {
    font-family: 'Alumni Sans';
    src: url('assets/AlumniSans.ttf') format('truetype');
    font-weight: 100 900;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Albert Sans';
    src: url('assets/AlbertSans.ttf') format('truetype');
    font-weight: 100 900;
    font-style: normal;
    font-display: swap;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { height: 100%; }
  body {
    font-family: 'Albert Sans', sans-serif;
    background: #EDF0EE;
    color: #111315;
    display: flex;
    flex-direction: column;
  }
  header { flex: 0 0 auto; padding: 16px 24px 0; }
  header a.back {
    display: inline-block;
    font-size: 14px;
    font-weight: 700;
    color: #111315;
    text-decoration: none;
    border: 1px solid #C9CDCF;
    background: #fff;
    border-radius: 999px;
    padding: 8px 16px;
  }
  header a.back:hover, header a.back:focus-visible { border-color: #E85A24; outline: none; }
  main {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 20px;
    padding: 24px;
    max-width: 980px;
    width: 100%;
    margin: 0 auto;
  }
  .kicker {
    font-family: 'Albert Sans', sans-serif;
    font-size: 15px;
    font-weight: 800;
    letter-spacing: 0.14em;
    color: #E85A24;
  }
  h1 {
    font-family: 'Alumni Sans', sans-serif;
    font-weight: 800;
    font-size: clamp(48px, 9vw, 110px);
    line-height: 0.95;
    letter-spacing: 0.01em;
  }
  h1 .num {
    display: block;
    font-size: clamp(20px, 3vw, 30px);
    font-weight: 800;
    color: #474D52;
    letter-spacing: 0.1em;
    margin-bottom: 8px;
  }
  .lead { font-size: clamp(19px, 2.6vw, 26px); line-height: 1.4; color: #2A2E31; max-width: 46em; }
  .lead b { color: #E85A24; }
  .points { list-style: none; display: flex; flex-direction: column; gap: 12px; width: 100%; }
  .points li {
    background: #fff;
    border: 1px solid #DCE0DE;
    border-left: 5px solid #E85A24;
    border-radius: 12px;
    padding: 14px 18px;
    font-size: clamp(16px, 2.2vw, 20px);
    line-height: 1.45;
    color: #2A2E31;
    box-shadow: 0 4px 14px rgba(17,19,21,.06);
  }
  .points li b { color: #111315; }
  .figures { display: flex; flex-wrap: wrap; gap: 14px; width: 100%; }
  .fig {
    flex: 1 1 180px;
    background: #111315;
    color: #EDF0EE;
    border-radius: 14px;
    padding: 16px 18px;
  }
  .fig .v { font-family: 'Alumni Sans', sans-serif; font-weight: 800; font-size: clamp(26px, 4vw, 40px); line-height: 1; color: #fff; }
  .fig .k { font-size: 14px; color: #B9BFC2; margin-top: 6px; line-height: 1.35; }
  footer {
    flex: 0 0 auto;
    padding: 0 24px 18px;
    font-size: 13px;
    color: #474D52;
    max-width: 980px;
    width: 100%;
    margin: 0 auto;
  }
"""

def page(num, title, lead, points, figures):
    pts = "\n".join(f"      <li>{p}</li>" for p in points)
    figs = ""
    if figures:
        items = "\n".join(
            f'      <div class="fig"><div class="v">{v}</div><div class="k">{k}</div></div>'
            for v, k in figures
        )
        figs = f'    <div class="figures">\n{items}\n    </div>'
    return f"""<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Capítulo {num} · {title} — FERREYCORP</title>
<style>{CSS}</style>
</head>
<body>
  <header>
    <a class="back" href="edificio.html">← Volver al edificio</a>
  </header>

  <main>
    <p class="kicker">FERREYCORP · ADMINISTRACIÓN DE NEGOCIOS · AA2</p>
    <h1><span class="num">CAPÍTULO {num}</span>{title}</h1>
    <p class="lead">{lead}</p>
    <ul class="points">
{pts}
    </ul>
{figs}
  </main>

  <footer>Piso {int(num)} de 10 · Vuelve al edificio para cambiar de capítulo.</footer>

</body>
</html>
"""

CHAPTERS = [
    ("01", "Apertura",
     "Actuamos como <b>consultores junior</b> y analizamos el proceso administrativo de <b>Ferreycorp S.A.A.</b>: cómo planea, cómo se organiza, cómo dirige y cómo controla. Su propósito declarado es <b>«Juntos creamos desarrollo»</b>.",
     [
         "<b>Empresa peruana fundada en 1922</b>, representante de <b>Caterpillar</b> en el Perú desde <b>1942</b>.",
         "Analizamos las <b>cuatro funciones</b> del proceso administrativo y proponemos <b>7 mejoras</b>.",
         "Todo el análisis se construyó con <b>fuentes públicas primarias</b>: la Memoria Anual 2024 y los estados financieros consolidados auditados.",
     ],
     [("1922", "Fundación"), ("1942", "Caterpillar en el Perú"),
      ("S/ 7 590 M", "Ventas 2024 (récord)"), ("7 978", "Colaboradores · 10 países")]),
    ("02", "Planeación",
     "La planeación fija el rumbo. En Ferreycorp es un <b>sistema real y medible</b>, no un formalismo.",
     [
         "<b>Direccionamiento definido:</b> propósito, misión, visión y valores.",
         "<b>Estrategia 2022-2026:</b> 3 pilares y 3 habilitadores, aprobada y supervisada por el Directorio.",
         "<b>Tres niveles:</b> planeación estratégica (corporación), táctica (subsidiarias) y operativa (día a día).",
         "Objetivos evaluados con el criterio <b>SMART</b>: específicos, medibles, alcanzables, relevantes y con plazo.",
         "Contribuye al direccionamiento: da <b>coherencia a la inversión</b> y alinea a toda la organización.",
     ],
     [("98,8 %", "Colaboradores con objetivos en cascada"),
      ("S/ 1 131 M", "EBITDA 2024"), ("S/ 489 M", "Utilidad neta 2024")]),
    ("03", "Organización",
     "La organización ordena los recursos y las funciones. El modelo es <b>«autonomía operativa con coherencia estratégica»</b>.",
     [
         "<b>Holding</b> con <b>estructura divisional</b> por productos-mercado.",
         "<b>Tres roles:</b> el holding fija el rumbo y asigna recursos; las subsidiarias operan con autonomía; el <b>Centro de Servicios Compartidos</b> estandariza el back office.",
         "<b>Cuatro niveles:</b> Junta de Accionistas → Directorio (9 miembros, 5 independientes) → Gerencia General y 9 gerencias corporativas → subsidiarias.",
         "La coordinación se logra por <b>directorios cruzados</b>, comités y servicios compartidos.",
     ],
     [("9", "Miembros del Directorio (5 independientes)"),
      ("9", "Gerencias corporativas"), ("6 997", "Accionistas (ninguno supera el 10 %)")]),
    ("04", "Dirección",
     "La dirección conduce a las personas para que el orden produzca resultados: <b>liderazgo, comunicación, motivación y toma de decisiones</b>.",
     [
         "<b>Liderazgo:</b> institucional y continuo — Gerencia General desde 2008 —, medido por sus resultados.",
         "<b>Comunicación:</b> encuesta de clima anual (99 % de respuesta), Innovation Week y Sistema de Cumplimiento.",
         "<b>Motivación:</b> propuesta de valor al empleado y formación masiva (ThinkBIG, DreamBIG, aprendizaje dual).",
         "<b>Decisiones:</b> colegiadas en la cúpula (comités) con autonomía acotada en las subsidiarias.",
     ],
     [("88 %", "Compromiso con la corporación"), ("83 %", "Clima laboral favorable"),
      ("286 913", "Horas de capacitación en 2024")]),
    ("05", "Control",
     "El control verifica si lo planeado se cumple y corrige el rumbo. En Ferreycorp es <b>integral, comparable y público</b>.",
     [
         "<b>16 indicadores</b> en 4 dimensiones: financiera, operativa, comercial y de personas.",
         "<b>Seguimiento:</b> Directorio y comités, Auditoría, Control de Gestión; evaluación de desempeño del 99,7 % de la planilla.",
         "<b>Acciones correctivas:</b> calce de monedas, negocio recurrente de repuestos y servicios, automatización del Centro de Distribución (65 % de extracciones).",
         "El control <b>detecta y corrige</b> en la dirección de la estrategia.",
     ],
     [("+18,9 %", "Crecimiento del EBITDA"), ("2,25 → 1,90", "Deuda neta / EBITDA"),
      ("59 → 52", "Días de cobranza")]),
    ("06", "Mejoras M1–M7",
     "Proponemos <b>7 mejoras</b> viables, pertinentes y sustentadas. Cada una fortalece <b>dos funciones</b> del proceso administrativo; juntas cubren las cuatro.",
     [
         "<b>M1</b> · Metas fechadas y medibles por pilar estratégico (planeación y control).",
         "<b>M2</b> · Tablero corporativo de venta cruzada <i>one stop shop</i> (planeación y organización).",
         "<b>M3</b> · Mapa de los canales cotidianos de comunicación interna (dirección y organización).",
         "<b>M4</b> · Liderazgo y clima medidos por subsidiaria (dirección y control).",
         "<b>M5</b> · Cantera técnica ampliada: ThinkBIG, DreamBIG, aprendizaje dual (dirección y organización).",
         "<b>M6</b> · Contratos de servicio recurrentes (CVA) con indicador propio (control y planeación).",
         "<b>M7</b> · Blindaje financiero permanente con cobertura extendida (control y planeación).",
     ],
     []),
    ("07", "Análisis crítico",
     "La mayor fortaleza y el mayor riesgo de Ferreycorp son <b>el mismo fenómeno</b> visto desde dos ángulos.",
     [
         "<b>Coherencia:</b> las cuatro funciones se refuerzan — la estrategia se convierte en objetivos en cascada hasta cada colaborador.",
         "<b>Fortalezas:</b> planeación real y medible; dirección que llega a toda la planilla; control integral y público.",
         "<b>Límites:</b> pilares menos SMART que las metas; comunicación cotidiana no documentada; control que detecta pero no siempre previene.",
         "<b>El reto central:</b> la doble concentración — 77 % Caterpillar y 58 % minería — es liderazgo y especialización, pero también vulnerabilidad.",
     ],
     [("77 %", "De las ventas = Caterpillar"), ("58 %", "De las ventas = minería"),
      ("−2,0 %", "Bloque complementario en 2024")]),
    ("08", "Conclusiones",
     "El proceso administrativo de Ferreycorp <b>funciona</b>, y su margen de mejora está identificado.",
     [
         "La <b>planeación</b> es un sistema real y medible, con resultados publicados favorables.",
         "<b>Organización y dirección</b> se refuerzan: casi 8 000 personas en diez países se coordinan sin fragmentarse.",
         "El <b>control</b> es integral, comparable y público, y corrige en la dirección de la estrategia.",
         "La <b>doble concentración</b> es a la vez la mayor fortaleza y el mayor riesgo.",
         "Las <b>7 mejoras</b> son viables y, en conjunto, integran las cuatro funciones: cuando trabajan sobre el mismo plan, las mejoras dejan de ser intenciones y se convierten en gestión.",
     ],
     []),
    ("09", "Reflexión individual",
     "Reflexión de <b>Jerzon Sergio Huamán Rivera</b> sobre la realización de esta actividad.",
     [
         "<b>El momento de frustración:</b> el análisis ya estaba hecho, pero convertirlo en una exposición clara costó varios intentos de prueba y error.",
         "<b>Cómo seguí adelante:</b> por partes y versión por versión, apoyado en mi equipo — el cuartel — en lugar de querer que saliera perfecto de una vez.",
         "<b>La calma volvió</b> al ver avances pequeños y recordar para qué era la presentación: mostrar el análisis ya realizado.",
         "<b>Lo que cambió:</b> un bloqueo ya no significa «algo está mal conmigo», sino «hay que cambiar de estrategia».",
     ],
     []),
    ("10", "Conducta resiliente",
     "Gestionar las dificultades <b>identificando oportunidades y fortalezas</b>: así se trabajó este informe y así propone el plan mejorar a Ferreycorp.",
     [
         "<b>Dividir el problema grande en partes</b> y avanzar una por una.",
         "<b>Guardar lo que sirve</b> y corregir solo lo que falla, en lugar de empezar de cero.",
         "<b>Apoyarse en el equipo</b> en vez de abandonar cuando algo se bloquea.",
         "<b>Avanzar versión por versión</b> hasta que funcione.",
         "La misma lógica del plan de mejoras: reducir la vulnerabilidad <b>usando las fortalezas que ya se tienen</b>.",
     ],
     []),
]

for num, title, lead, points, figures in CHAPTERS:
    html = page(num, title, lead, points, figures)
    path = os.path.join(BASE, f"capitulo-{num}.html")
    with open(path, "w", encoding="utf-8") as f:
        f.write(html)
    print("OK", path, len(html))
