(function() {
  'use strict';

  const overlay = document.getElementById('menu-overlay');
  if (!overlay) return;

  const hamburger = document.querySelector('.hamburger');
  const closeBtn = overlay.querySelector('.overlay-close');
  const terminal = document.querySelector('.v-terminal');
  const FOCUSABLE = 'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])';

  function getFocusableElements() {
    return Array.from(overlay.querySelectorAll(FOCUSABLE));
  }

  function trapFocus(e) {
    if (e.key !== 'Tab') return;
    const focusable = getFocusableElements();
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function openMenu() {
    overlay.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('menu-open');
    if (terminal) {
      terminal.setAttribute('inert', '');
      terminal.setAttribute('aria-hidden', 'true');
    }
    overlay.addEventListener('keydown', trapFocus);
    closeBtn.focus();
  }

  function closeMenu() {
    overlay.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    document.body.classList.remove('menu-open');
    if (terminal) {
      terminal.removeAttribute('inert');
      terminal.removeAttribute('aria-hidden');
    }
    overlay.removeEventListener('keydown', trapFocus);
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
