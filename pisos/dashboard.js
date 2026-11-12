/* Dashboard de piso — contador animado: los números de las tarjetas suben desde cero. */
(function () {
  function parseNum(text) {
    var m = text.match(/^([^0-9]*)([0-9][0-9 \u00a0]*([,\.][0-9]+)?)(.*)$/);
    if (!m) return null;
    var raw = m[2], dec = 0, dm = raw.match(/[,\.](\d+)$/);
    if (dm) dec = dm[1].length;
    var val = parseFloat(raw.replace(/[\s\u00a0]/g, '').replace(',', '.'));
    if (isNaN(val)) return null;
    return { prefix: m[1], val: val, suffix: m[4], dec: dec };
  }
  function fmt(v, dec) {
    var s = v.toFixed(dec), parts = s.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0');
    return dec ? parts.join(',') : parts[0];
  }
  document.querySelectorAll('.card b').forEach(function (el) {
    var p = parseNum(el.textContent.trim());
    if (!p || p.val === 0) return;
    var dur = 1100, t0 = null;
    function tick(t) {
      if (!t0) t0 = t;
      var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      el.textContent = p.prefix + fmt(p.val * e, p.dec) + p.suffix;
      if (k < 1) requestAnimationFrame(tick);
      else el.textContent = p.prefix + fmt(p.val, p.dec) + p.suffix;
    }
    requestAnimationFrame(tick);
  });
})();
