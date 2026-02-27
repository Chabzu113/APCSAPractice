'use strict';
// PhysicsRenderer — diagram lightbox & dark-mode invert for AP Physics 1
// Call PhysicsRenderer.upgradeDiagrams(container) after any question card
// is injected into the DOM to attach click-to-expand and dark-mode filter.

(function () {

  // ── Lightbox overlay (created once, reused across all diagrams) ─────────────
  var _overlay = null;

  function getOverlay() {
    if (_overlay) return _overlay;
    _overlay = document.createElement('div');
    _overlay.id = 'physics-lightbox';

    var img = document.createElement('img');
    img.id = 'physics-lightbox-img';
    img.alt = 'Diagram';
    _overlay.appendChild(img);

    // Click anywhere on the overlay to close
    _overlay.addEventListener('click', closeLightbox);
    document.body.appendChild(_overlay);
    return _overlay;
  }

  function openLightbox(src) {
    var overlay = getOverlay();
    overlay.querySelector('#physics-lightbox-img').src = src;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent scroll-behind
  }

  function closeLightbox() {
    if (_overlay) _overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Keyboard: Escape closes lightbox
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  // ── Helper: is dark mode active? ─────────────────────────────────────────────
  function isDark() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  // ── Main upgrade function ─────────────────────────────────────────────────────
  // Scans a container for [data-physics-diagram] elements and:
  //   1. Adds dark-mode invert class if dark mode is on
  //   2. Attaches click-to-expand lightbox handler
  function upgradeDiagrams(container) {
    if (!container) return;
    container.querySelectorAll('[data-physics-diagram]').forEach(function (img) {
      // Dark-mode invert
      img.classList.toggle('physics-diagram--dark', isDark());

      // Lightbox — guard against double-binding
      if (img.dataset.lightboxBound) return;
      img.dataset.lightboxBound = '1';
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function () {
        openLightbox(img.src);
      });
    });
  }

  // ── Theme observer: re-apply invert when user toggles dark mode ──────────────
  var themeObserver = new MutationObserver(function () {
    document.querySelectorAll('[data-physics-diagram]').forEach(function (img) {
      img.classList.toggle('physics-diagram--dark', isDark());
    });
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });

  // ── Public API ────────────────────────────────────────────────────────────────
  window.PhysicsRenderer = {
    upgradeDiagrams: upgradeDiagrams,
    openLightbox:   openLightbox,
    closeLightbox:  closeLightbox
  };

}());
