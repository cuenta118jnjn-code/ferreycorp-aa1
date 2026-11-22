// PORTADA 3D — AA2 Ferreycorp
// Three.js r147 UMD vendida en local. La escena ES la ciudad de noche:
// torre de cristal construida por código, título extruido en 3D,
// paneles de datos flotando en el espacio. El scroll ES la cámara.
(function () {
  'use strict';

  window.__errors = [];
  window.addEventListener('error', function (e) {
    window.__errors.push(String(e.message || e.error));
  });

  if (!window.THREE) {
    document.getElementById('fallback').style.display = 'flex';
    return;
  }
  if (!window.ALUMNI_BLACK) {
    document.getElementById('fallback').style.display = 'flex';
    return;
  }

  var canvas = document.getElementById('scene');
  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  } catch (err) {
    document.getElementById('fallback').style.display = 'flex';
    window.__errors.push('WebGL: ' + err.message);
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0x04060d);
  scene.fog = new THREE.FogExp2(0x04060d, 0.0042);

  var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1500);

  // ---------- Luces ----------
  scene.add(new THREE.AmbientLight(0x334466, 0.55));
  var moon = new THREE.DirectionalLight(0xbfd4ff, 0.7);
  moon.position.set(-40, 80, 30);
  scene.add(moon);
  var warmLight = new THREE.PointLight(0xffb45e, 0.9, 140);
  warmLight.position.set(0, 30, 46);
  scene.add(warmLight);
  var greenLight = new THREE.PointLight(0x2dff8f, 4, 80);
  greenLight.position.set(0, 14, 38);
  scene.add(greenLight);

  // ---------- Texturas canvas ----------
  function windowStripTexture(litRatio, seed) {
    var c = document.createElement('canvas');
    c.width = 512; c.height = 72;
    var g = c.getContext('2d');
    g.fillStyle = '#0a1220';
    g.fillRect(0, 0, 512, 72);
    var rnd = (function (s) { return function () { s = (s * 16807) % 2147483647; return s / 2147483647; }; })(seed);
    var cols = 11, ww = 34, gap = 11, x0 = 8;
    for (var i = 0; i < cols; i++) {
      var x = x0 + i * (ww + gap);
      var lit = rnd() < litRatio;
      if (lit) {
        var warm = ['#ffcf8a', '#ffb45e', '#ff9e3d', '#ffd9a0'][Math.floor(rnd() * 4)];
        g.fillStyle = warm;
      } else {
        g.fillStyle = '#0e1828';
      }
      g.fillRect(x, 12, ww, 48);
    }
    var tex = new THREE.CanvasTexture(c);
    tex.encoding = THREE.sRGBEncoding;
    return tex;
  }

  function cityTexture(litRatio, seed) {
    var c = document.createElement('canvas');
    c.width = 256; c.height = 256;
    var g = c.getContext('2d');
    g.fillStyle = '#070b16';
    g.fillRect(0, 0, 256, 256);
    var rnd = (function (s) { return function () { s = (s * 16807) % 2147483647; return s / 2147483647; }; })(seed);
    for (var r = 0; r < 14; r++) {
      for (var col = 0; col < 8; col++) {
        if (rnd() < litRatio) {
          g.fillStyle = ['#ffcf8a', '#ffb45e', '#ff9e3d'][Math.floor(rnd() * 3)];
          g.globalAlpha = 0.55 + rnd() * 0.45;
          g.fillRect(8 + col * 31, 8 + r * 18, 18, 11);
          g.globalAlpha = 1;
        }
      }
    }
    var tex = new THREE.CanvasTexture(c);
    tex.encoding = THREE.sRGBEncoding;
    return tex;
  }

  // ---------- Suelo ----------
  var ground = new THREE.Mesh(
    new THREE.PlaneGeometry(1400, 1400),
    new THREE.MeshStandardMaterial({ color: 0x04060c, roughness: 1, metalness: 0 })
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  // Plaza bajo la torre + marco verde tenue
  var plaza = new THREE.Mesh(
    new THREE.BoxGeometry(48, 0.6, 48),
    new THREE.MeshStandardMaterial({ color: 0x070b14, roughness: 0.9, metalness: 0.1 })
  );
  plaza.position.y = 0.3;
  scene.add(plaza);
  var plazaEdge = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(48.4, 0.7, 48.4)),
    new THREE.LineBasicMaterial({ color: 0x2dff8f, transparent: true, opacity: 0.35 })
  );
  plazaEdge.position.y = 0.3;
  scene.add(plazaEdge);

  // ---------- Ciudad lejana ----------
  var cityMats = [0, 1, 2].map(function (i) {
    var t = cityTexture(0.22, 11 + i * 7);
    return new THREE.MeshStandardMaterial({
      color: 0x0a0f1c, roughness: 0.9, metalness: 0.1,
      map: t, emissiveMap: t, emissive: 0xffffff, emissiveIntensity: 0.55
    });
  });
  var cityRand = (function (s) { return function () { s = (s * 16807) % 2147483647; return s / 2147483647; }; })(99);
  for (var bi = 0; bi < 70; bi++) {
    var ang = cityRand() * Math.PI * 2;
    var rad = 100 + cityRand() * 190;
    var bw = 8 + cityRand() * 12;
    var bh = 10 + cityRand() * 48;
    var bd = 8 + cityRand() * 12;
    var b = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, bd), cityMats[bi % 3]);
    b.position.set(Math.cos(ang) * rad, bh / 2, Math.sin(ang) * rad);
    scene.add(b);
  }

  // Textura de punto redondo y suave (el polvo y las estrellas no son cuadrados)
  var dotTex = (function () {
    var c = document.createElement('canvas');
    c.width = 64; c.height = 64;
    var g = c.getContext('2d');
    var grad = g.createRadialGradient(32, 32, 2, 32, 32, 30);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.4, 'rgba(255,255,255,0.55)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  })();

  // Luces de calle (puntos cálidos)
  function makePoints(count, placer, color, size, opacity) {
    var pos = new Float32Array(count * 3);
    for (var i = 0; i < count; i++) {
      var p = placer(i);
      pos[i * 3] = p[0]; pos[i * 3 + 1] = p[1]; pos[i * 3 + 2] = p[2];
    }
    var geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    var mat = new THREE.PointsMaterial({
      color: color, size: size, transparent: true, opacity: opacity,
      blending: THREE.AdditiveBlending, depthWrite: false,
      map: dotTex, alphaTest: 0.01
    });
    var pts = new THREE.Points(geo, mat);
    scene.add(pts);
    return pts;
  }
  var streetRand = (function (s) { return function () { s = (s * 16807) % 2147483647; return s / 2147483647; }; })(7);
  makePoints(300, function () {
    var a = streetRand() * Math.PI * 2, r = 45 + streetRand() * 180;
    return [Math.cos(a) * r, 0.4 + streetRand() * 1.2, Math.sin(a) * r];
  }, 0xffb45e, 2.2, 0.9);

  // Estrellas
  var starRand = (function (s) { return function () { s = (s * 16807) % 2147483647; return s / 2147483647; }; })(21);
  var stars = makePoints(500, function () {
    var a = starRand() * Math.PI * 2, e = 0.15 + starRand() * 1.2, r = 550;
    return [Math.cos(a) * Math.cos(e) * r, Math.sin(e) * r, Math.sin(a) * Math.cos(e) * r];
  }, 0xffffff, 1.6, 0.8);
  stars.material.sizeAttenuation = false;

  // Polvo flotando cerca de la torre
  var dustGeo = new THREE.BufferGeometry();
  var dustCount = 180;
  var dustPos = new Float32Array(dustCount * 3);
  var dustRand = (function (s) { return function () { s = (s * 16807) % 2147483647; return s / 2147483647; }; })(31);
  for (var di = 0; di < dustCount; di++) {
    var da = dustRand() * Math.PI * 2, dr = 6 + dustRand() * 42;
    dustPos[di * 3] = Math.cos(da) * dr;
    dustPos[di * 3 + 1] = 4 + dustRand() * 52;
    dustPos[di * 3 + 2] = Math.sin(da) * dr;
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  var dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({
    color: 0x8fd0ff, size: 1.1, transparent: true, opacity: 0.45,
    blending: THREE.AdditiveBlending, depthWrite: false,
    map: dotTex, alphaTest: 0.01
  }));
  scene.add(dust);

  // ---------- Torre protagonista ----------
  var tower = new THREE.Group();
  var floorTex = [windowStripTexture(0.55, 3), windowStripTexture(0.5, 13), windowStripTexture(0.6, 23)];
  var floorMats = floorTex.map(function (t) {
    return new THREE.MeshStandardMaterial({
      map: t, emissiveMap: t, emissive: 0xffffff, emissiveIntensity: 0.85,
      roughness: 0.38, metalness: 0.35
    });
  });
  var slabMat = new THREE.MeshStandardMaterial({ color: 0x0a0f1c, roughness: 0.6, metalness: 0.4 });
  var FLOORS = 26, FH = 2.2;
  for (var fi = 0; fi < FLOORS; fi++) {
    var t = fi / (FLOORS - 1);
    var w = 16 - 7 * t;
    var floor = new THREE.Mesh(new THREE.BoxGeometry(w, FH, w), floorMats[fi % 3]);
    floor.position.y = FH / 2 + fi * FH;
    tower.add(floor);
    var slab = new THREE.Mesh(new THREE.BoxGeometry(w + 0.3, 0.14, w + 0.3), slabMat);
    slab.position.y = (fi + 1) * FH;
    tower.add(slab);
  }
  // Corona + aguja + baliza
  var crown = new THREE.Mesh(new THREE.BoxGeometry(8, 2.2, 8), floorMats[0]);
  crown.position.y = FLOORS * FH + 1.1;
  tower.add(crown);
  var crown2 = new THREE.Mesh(new THREE.BoxGeometry(5, 1.5, 5), slabMat);
  crown2.position.y = FLOORS * FH + 2.2 + 0.75;
  tower.add(crown2);
  var spire = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.2, 7, 8),
    new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.5, metalness: 0.7 })
  );
  spire.position.y = FLOORS * FH + 2.2 + 1.5 + 3.5;
  tower.add(spire);
  var beacon = new THREE.Mesh(
    new THREE.SphereGeometry(0.42, 12, 12),
    new THREE.MeshBasicMaterial({ color: 0xff3b30 })
  );
  beacon.position.y = FLOORS * FH + 2.2 + 1.5 + 7.2;
  tower.add(beacon);
  scene.add(tower);

  // ---------- Título FERREYCORP en 3D ----------
  var font = new THREE.Font(window.ALUMNI_BLACK);
  var titleGeo = new THREE.TextGeometry('FERREYCORP', {
    font: font, size: 10.5, height: 1.8, curveSegments: 6,
    bevelEnabled: true, bevelThickness: 0.2, bevelSize: 0.14, bevelSegments: 2
  });
  titleGeo.center();
  var titleGroup = new THREE.Group();
  var titleDarkMat = new THREE.MeshStandardMaterial({
    color: 0x0b1220, roughness: 0.32, metalness: 0.65,
    emissive: 0x0d2b1d, emissiveIntensity: 0.55
  });
  var titleDark = new THREE.Mesh(titleGeo, titleDarkMat);
  titleGroup.add(titleDark);
  var titleHaloMat = new THREE.MeshBasicMaterial({ color: 0x2dff8f });
  var titleHalo = new THREE.Mesh(titleGeo, titleHaloMat);
  titleHalo.scale.set(1.09, 1.09, 1.09);
  titleHalo.position.z = -0.6;
  titleGroup.add(titleHalo);
  // Resplandor suave detrás del título
  (function () {
    var c = document.createElement('canvas');
    c.width = 256; c.height = 128;
    var g = c.getContext('2d');
    var grad = g.createRadialGradient(128, 64, 4, 128, 64, 120);
    grad.addColorStop(0, 'rgba(45,255,143,0.55)');
    grad.addColorStop(1, 'rgba(45,255,143,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, 256, 128);
    var tex = new THREE.CanvasTexture(c);
    var glowMat = new THREE.SpriteMaterial({
      map: tex, transparent: true, opacity: 0.5, depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    var spr = new THREE.Sprite(glowMat);
    spr.scale.set(70, 26, 1);
    spr.position.z = -2;
    titleGroup.add(spr);
  })();
  titleGroup.position.set(0, 15, 30);
  scene.add(titleGroup);

  // ---------- Paneles de datos en el espacio 3D ----------
  var panels = [];
  function makePanelTexture(num, label) {
    var c = document.createElement('canvas');
    c.width = 1024; c.height = 512;
    var g = c.getContext('2d');
    // Cristal translúcido: la ciudad se insinúa detrás del panel
    var bg = g.createLinearGradient(0, 0, 0, 512);
    bg.addColorStop(0, 'rgba(14,26,44,0.55)');
    bg.addColorStop(1, 'rgba(6,12,24,0.42)');
    g.fillStyle = bg;
    g.fillRect(0, 0, 1024, 512);
    // Brillo superior de cristal
    g.fillStyle = 'rgba(255,255,255,0.10)';
    g.fillRect(0, 0, 1024, 26);
    g.strokeStyle = 'rgba(45,255,143,0.95)';
    g.lineWidth = 6;
    g.strokeRect(10, 10, 1004, 492);
    // Número con ajuste de ancho
    var size = 170;
    g.font = '900 ' + size + 'px "Alumni Sans", "Arial Black", sans-serif';
    while (g.measureText(num).width > 900 && size > 60) {
      size -= 10;
      g.font = '900 ' + size + 'px "Alumni Sans", "Arial Black", sans-serif';
    }
    g.fillStyle = '#2dff8f';
    g.textBaseline = 'middle';
    g.fillText(num, 56, 205);
    // Etiqueta
    g.fillStyle = '#ffffff';
    g.font = '500 46px "Albert Sans", sans-serif';
    g.fillText(label, 58, 405);
    var tex = new THREE.CanvasTexture(c);
    tex.encoding = THREE.sRGBEncoding;
    tex.anisotropy = 4;
    return tex;
  }
  function makePanel(num, label, w, h, x, y, z, rotY, phase) {
    var tex = makePanelTexture(num, label);
    // Plano de cristal: una sola cara translúcida para que la ciudad
    // se vea a través del panel (una caja opaca taparía la escena).
    var geo = new THREE.PlaneGeometry(w, h);
    var mat = new THREE.MeshStandardMaterial({
      map: tex, emissiveMap: tex, emissive: 0xffffff, emissiveIntensity: 0.35,
      roughness: 0.15, metalness: 0.1,
      transparent: true, depthWrite: false, side: THREE.DoubleSide
    });
    var mesh = new THREE.Mesh(geo, mat);
    var edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(geo),
      new THREE.LineBasicMaterial({ color: 0x2dff8f, transparent: true, opacity: 0.9 })
    );
    var grp = new THREE.Group();
    grp.add(mesh);
    grp.add(edges);
    grp.position.set(x, y, z);
    grp.rotation.y = rotY;
    grp.userData = { baseY: y, baseRotY: rotY, phase: phase };
    scene.add(grp);
    panels.push(grp);
    return grp;
  }
  function buildPanels() {
    makePanel('S/ 7 590 M', 'ventas 2024', 12, 6, -24, 19, 44, 0.12, 0.0);
    // C2: «102» y «7 978» se recortaban por los bordes en p=0,33–0,40.
    // Estaban demasiado separados (x=±16–20) y demasiado cerca de la
    // trayectoria de la cámara (z=26–32): el frustum no los cubría a la
    // vez. Se acercan al centro y a la torre (más profundidad desde la
    // cámara) para que queden enteros en todo p=0,25–0,40.
    makePanel('102', 'años', 9, 4.5, 10, 27, 24, -0.14, 1.3);
    makePanel('7 978', 'colaboradores', 10, 5, -8, 31, 18, 0.10, 2.1);
    makePanel('10', 'países', 8, 4, -16, 22, 12, -0.10, 2.9);
  }

  // ---------- Cámara que vuela con el scroll ----------
  // El vuelo bucea hacia la torre y luego SE RETIRA para el cierre:
  // el fotograma final es la torre entera con el título y los paneles,
  // nunca una pared de ventanas.
  var camCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 32, 95),
    new THREE.Vector3(-6, 27, 64),
    new THREE.Vector3(8, 30, 44),
    // C2: el waypoint 3 en x=16 empujaba la cámara a la derecha justo
    // en el tramo p=0,33–0,40 y sacaba los dos paneles por los bordes
    // a la vez. Deriva reducida a x=10.
    new THREE.Vector3(10, 34, 30),
    new THREE.Vector3(10, 30, 48),
    new THREE.Vector3(0, 32, 78)
  ]);
  var tgtCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 16, 0),
    new THREE.Vector3(0, 18, 0),
    new THREE.Vector3(0, 22, 0),
    new THREE.Vector3(0, 28, 0),
    new THREE.Vector3(0, 28, 0),
    new THREE.Vector3(0, 28, 0)
  ]);
  var targetP = 0, curP = 0;
  function readScroll() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    targetP = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
  }
  window.addEventListener('scroll', readScroll, { passive: true });
  readScroll();

  var progressBar = document.getElementById('progress-bar');
  var subtitleEl = document.getElementById('hud-subtitle');
  var clock = new THREE.Clock();
  var tmpCam = new THREE.Vector3();
  var tmpTgt = new THREE.Vector3();
  var firstFrame = true;

  // Suavizado de la cámara independiente del framerate:
  // a 60 fps se siente igual que antes; a 3 fps (SwiftShader) converge igual.
  function smoothstep(a, b, x) {
    var t = Math.min(1, Math.max(0, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
  }

  function animate() {
    requestAnimationFrame(animate);
    var rawDt = clock.getDelta();
    var dt = Math.min(rawDt, 0.05);
    var t = clock.elapsedTime;

    // El scroll manda; el seguimiento suavizado lo vuelve vuelo continuo
    // (tasa 5/s: en hardware real converge en ~0,2 s; en SwiftShader igual)
    var easeK = 1 - Math.exp(-Math.min(rawDt, 0.1) * 5.0);
    curP += (targetP - curP) * easeK;
    window.__scrollP = curP;

    camCurve.getPoint(curP, tmpCam);
    tgtCurve.getPoint(curP, tmpTgt);
    // Balanceo lento en reposo: nunca hay un fotograma quieto
    tmpCam.x += Math.sin(t * 0.30) * 0.55;
    tmpCam.y += Math.sin(t * 0.23) * 0.40;
    tmpTgt.x += Math.sin(t * 0.21) * 0.3;
    camera.position.copy(tmpCam);
    camera.lookAt(tmpTgt);

    // El título es la apertura y el cierre: visible al inicio, corte
    // seco en el vuelo (nunca translúcido: las letras siempre son
    // sólidas) y reaparece cuando la cámara se retira para el final.
    titleGroup.visible = curP < 0.45 || curP > 0.80;
    // El subtítulo del HUD se retira cuando el título ocupa la franja
    // inferior, para que la F nunca choque con él.
    if (subtitleEl) subtitleEl.style.opacity = (1 - smoothstep(0.15, 0.25, curP)).toFixed(2);

    // Paneles respirando
    for (var i = 0; i < panels.length; i++) {
      var p = panels[i];
      p.position.y = p.userData.baseY + Math.sin(t * 0.6 + p.userData.phase) * 0.45;
      p.rotation.y = p.userData.baseRotY + Math.sin(t * 0.4 + p.userData.phase) * 0.03;
    }
    // La torre respira (emissive) y la baliza parpadea
    var pulse = 0.85 + Math.sin(t * 0.8) * 0.05;
    for (var m = 0; m < floorMats.length; m++) floorMats[m].emissiveIntensity = pulse;
    beacon.visible = Math.sin(t * 2.2) > -0.2;
    greenLight.intensity = 1.15 + Math.sin(t * 0.9) * 0.15;

    // Polvo subiendo
    var dp = dust.geometry.attributes.position;
    for (var d = 0; d < dustCount; d++) {
      var y = dp.getY(d) + dt * 0.55;
      if (y > 56) y = 4;
      dp.setY(d, y);
    }
    dp.needsUpdate = true;

    if (progressBar) progressBar.style.width = (curP * 100).toFixed(1) + '%';

    renderer.render(scene, camera);
    if (firstFrame) {
      firstFrame = false;
      window.__sceneReady = true;
    }
  }

  window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    readScroll();
  });

  // Los paneles usan la fuente web: esperar a que cargue (con tope de 1,5 s)
  var fontsReady = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
  Promise.race([
    fontsReady,
    new Promise(function (res) { setTimeout(res, 1500); })
  ]).then(function () {
    buildPanels();
    animate();
  });
})();
