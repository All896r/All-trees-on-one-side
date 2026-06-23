(function () {
  var genericPhotoFallbacks = [
    'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80'
  ];

  function treeNameFromAlt(altText) {
    return (altText || 'Baum')
      .replace(/^Foto von\s+/i, '')
      .trim();
  }

  function photoFallbacksFor(image) {
    var treeName = encodeURIComponent(treeNameFromAlt(image.alt));
    var searchPhoto = 'https://loremflickr.com/1200/800/' + treeName + ',tree,forest';

    return [searchPhoto].concat(genericPhotoFallbacks);
  }

  document.addEventListener('error', function (event) {
    var image = event.target;
    if (!image || image.tagName !== 'IMG') return;

    var fallbacks = image.dataset.photoFallbacks
      ? image.dataset.photoFallbacks.split('|')
      : photoFallbacksFor(image);
    var fallbackIndex = Number(image.dataset.fallbackIndex || 0);

    if (fallbackIndex >= fallbacks.length) return;

    image.dataset.photoFallbacks = fallbacks.join('|');
    image.dataset.fallbackIndex = String(fallbackIndex + 1);
    image.src = fallbacks[fallbackIndex];
  }, true);
}());
