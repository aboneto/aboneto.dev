(function() {
  'use strict';

  const overlay = document.getElementById('menu-overlay');
  if (!overlay) return;

  const hamburger = document.querySelector('.hamburger');
  const closeBtn = overlay.querySelector('.overlay-close');

  function openMenu() {
    overlay.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('menu-open');
    closeBtn.focus();
  }

  function closeMenu() {
    overlay.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    document.body.classList.remove('menu-open');
    hamburger.focus();
  }

  hamburger.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && overlay.getAttribute('aria-hidden') === 'false') {
      closeMenu();
    }
  });

  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
      closeMenu();
    }
  });
})();
