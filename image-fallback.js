(function () {
  function fallbackSvg(label) {
    var safeLabel = (label || 'Baum des Jahres')
      .replace(/^Foto von\s+/i, '')
      .replace(/[&<>'"]/g, function (char) {
        return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char];
      });

    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img" aria-label="Ersatzbild für ' + safeLabel + '">' +
        '<defs>' +
          '<linearGradient id="sky" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#d8ead0"/><stop offset="1" stop-color="#f6f1df"/></linearGradient>' +
          '<linearGradient id="leaf" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#2f8f5b"/><stop offset="1" stop-color="#123b2b"/></linearGradient>' +
        '</defs>' +
        '<rect width="1200" height="800" fill="url(#sky)"/>' +
        '<circle cx="210" cy="155" r="90" fill="#f2c94c" opacity=".85"/>' +
        '<path d="M0 610 C170 540 310 610 470 565 C650 515 790 595 960 545 C1070 512 1145 535 1200 515 L1200 800 L0 800 Z" fill="#cfe3c5"/>' +
        '<path d="M530 630 L600 310 L670 630 Z" fill="#8a5b34"/>' +
        '<circle cx="600" cy="275" r="185" fill="url(#leaf)"/>' +
        '<circle cx="455" cy="370" r="130" fill="#2f8f5b"/>' +
        '<circle cx="745" cy="370" r="130" fill="#1f6f4a"/>' +
        '<text x="600" y="720" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="54" font-weight="800" fill="#123b2b">' + safeLabel + '</text>' +
      '</svg>'
    );
  }

  document.addEventListener('error', function (event) {
    var image = event.target;
    if (!image || image.tagName !== 'IMG' || image.dataset.fallbackApplied) return;
    image.dataset.fallbackApplied = 'true';
    image.src = fallbackSvg(image.alt);
  }, true);
}());
