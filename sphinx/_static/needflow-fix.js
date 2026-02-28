// Replace native HTML image maps with JS click handlers for needflow diagrams.
//
// sphinx-needs generates <map id="needflow"> for every needflow directive,
// but HTML requires unique IDs — browsers only match the first map on the
// page, leaving subsequent diagrams unclickable.  Additionally, when images
// are CSS-scaled to fit the container, some browsers fail to adjust the
// pixel-based area coordinates.
//
// This script removes the native usemap association and instead attaches
// click and mousemove handlers to each diagram image, computing the hit
// area from the original natural-pixel coordinates.
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('figure[id^="needflow-"]').forEach(function (fig) {
    var map = fig.querySelector('map');
    var img = fig.querySelector('img');
    if (!map || !img) return;

    // Extract area data before removing the map.
    var areas = [];
    map.querySelectorAll('area[shape="rect"]').forEach(function (a) {
      var c = a.getAttribute('coords').split(',').map(Number);
      areas.push({ x1: c[0], y1: c[1], x2: c[2], y2: c[3], href: a.getAttribute('href') });
    });

    // Remove native usemap to bypass browser caching of map associations.
    img.removeAttribute('usemap');
    map.remove();

    // Hit-test helper: convert a mouse event to natural-image coordinates
    // and return the first matching area, or null.
    function hitTest(e) {
      var rect = img.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return null;
      var scaleX = img.naturalWidth / rect.width;
      var scaleY = img.naturalHeight / rect.height;
      var x = (e.clientX - rect.left) * scaleX;
      var y = (e.clientY - rect.top) * scaleY;
      for (var i = 0; i < areas.length; i++) {
        var a = areas[i];
        if (x >= a.x1 && x <= a.x2 && y >= a.y1 && y <= a.y2) return a;
      }
      return null;
    }

    img.addEventListener('click', function (e) {
      var hit = hitTest(e);
      if (hit) window.location.href = hit.href;
    });

    img.addEventListener('mousemove', function (e) {
      img.style.cursor = hitTest(e) ? 'pointer' : '';
    });

    img.addEventListener('mouseleave', function () {
      img.style.cursor = '';
    });
  });
});
