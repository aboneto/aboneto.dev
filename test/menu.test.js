/**
 * Tests for menu.js
 *
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

const SOURCE = fs.readFileSync(
  path.resolve(__dirname, '../assets/js/menu.js'),
  'utf8',
);

function setupDOM(opts = {}) {
  const { includeTerminal = true, includeOverlay = true } = opts;
  let html = '';
  if (includeOverlay) {
    html += `
      <div id="menu-overlay" aria-hidden="true">
        <button class="overlay-close">Close</button>
        <a href="/about">About</a>
        <a href="/blog">Blog</a>
      </div>
    `;
  }
  html += `<button class="hamburger" aria-expanded="false">Menu</button>`;
  if (includeTerminal) {
    html += `<div class="v-terminal">terminal</div>`;
  }
  document.body.innerHTML = html;
}

function loadModule() {
  const fn = new Function(SOURCE);
  fn();
}

function getElements() {
  return {
    overlay: document.getElementById('menu-overlay'),
    hamburger: document.querySelector('.hamburger'),
    closeBtn: document.querySelector('.overlay-close'),
    terminal: document.querySelector('.v-terminal'),
  };
}

describe('menu', () => {
  describe('open on hamburger click', () => {
    beforeEach(() => {
      setupDOM();
      loadModule();
    });

    it('should set overlay aria-hidden to false', () => {
      const { hamburger, overlay } = getElements();
      hamburger.click();
      expect(overlay.getAttribute('aria-hidden')).toBe('false');
    });

    it('should set hamburger aria-expanded to true', () => {
      const { hamburger } = getElements();
      hamburger.click();
      expect(hamburger.getAttribute('aria-expanded')).toBe('true');
    });

    it('should add menu-open class to body', () => {
      const { hamburger } = getElements();
      hamburger.click();
      expect(document.body.classList.contains('menu-open')).toBe(true);
    });

    it('should focus the close button', () => {
      const { hamburger, closeBtn } = getElements();
      const focusSpy = jest.spyOn(closeBtn, 'focus');
      hamburger.click();
      expect(focusSpy).toHaveBeenCalled();
    });
  });

  describe('close on close button click', () => {
    beforeEach(() => {
      setupDOM();
      loadModule();
    });

    it('should set overlay aria-hidden to true', () => {
      const { hamburger, closeBtn, overlay } = getElements();
      hamburger.click();
      closeBtn.click();
      expect(overlay.getAttribute('aria-hidden')).toBe('true');
    });

    it('should set hamburger aria-expanded to false', () => {
      const { hamburger, closeBtn } = getElements();
      hamburger.click();
      closeBtn.click();
      expect(hamburger.getAttribute('aria-expanded')).toBe('false');
    });

    it('should remove menu-open class from body', () => {
      const { hamburger, closeBtn } = getElements();
      hamburger.click();
      closeBtn.click();
      expect(document.body.classList.contains('menu-open')).toBe(false);
    });

    it('should focus the hamburger', () => {
      const { hamburger, closeBtn } = getElements();
      const focusSpy = jest.spyOn(hamburger, 'focus');
      hamburger.click();
      closeBtn.click();
      expect(focusSpy).toHaveBeenCalled();
    });
  });

  describe('close on Escape key', () => {
    beforeEach(() => {
      setupDOM();
      loadModule();
    });

    it('should close menu when Escape is pressed and menu is open', () => {
      const { hamburger, overlay } = getElements();
      hamburger.click();
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      expect(overlay.getAttribute('aria-hidden')).toBe('true');
      expect(hamburger.getAttribute('aria-expanded')).toBe('false');
    });

    it('should not close when Escape is pressed and menu is already closed', () => {
      const { overlay } = getElements();
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      expect(overlay.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('close on overlay background click', () => {
    beforeEach(() => {
      setupDOM();
      loadModule();
    });

    it('should close menu when clicking the overlay background', () => {
      const { hamburger, overlay } = getElements();
      hamburger.click();
      overlay.click();
      expect(overlay.getAttribute('aria-hidden')).toBe('true');
      expect(hamburger.getAttribute('aria-expanded')).toBe('false');
    });

    it('should not close when clicking a child element inside overlay', () => {
      const { hamburger, closeBtn, overlay } = getElements();
      hamburger.click();
      closeBtn.click(); // this triggers close via its own handler
      // Reopen to test child click specifically
      hamburger.click();
      const link = overlay.querySelector('a');
      link.click();
      // Should still be open because click was on child, not overlay itself
      // Note: link click doesn't call closeMenu since e.target !== overlay
      expect(overlay.getAttribute('aria-hidden')).toBe('false');
    });
  });

  describe('focus trapping', () => {
    beforeEach(() => {
      setupDOM();
      loadModule();
    });

    it('should wrap Tab from last focusable to first', () => {
      const { hamburger, overlay, closeBtn } = getElements();
      hamburger.click();

      const focusable = Array.from(overlay.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const firstFocusSpy = jest.spyOn(first, 'focus');

      last.focus();
      Object.defineProperty(document, 'activeElement', { value: last, configurable: true });
      overlay.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));

      expect(firstFocusSpy).toHaveBeenCalled();
    });

    it('should wrap Shift+Tab from first focusable to last', () => {
      const { hamburger, overlay, closeBtn } = getElements();
      hamburger.click();

      const focusable = Array.from(overlay.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const lastFocusSpy = jest.spyOn(last, 'focus');

      first.focus();
      Object.defineProperty(document, 'activeElement', { value: first, configurable: true });
      overlay.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true }));

      expect(lastFocusSpy).toHaveBeenCalled();
    });
  });

  describe('terminal inert behavior', () => {
    beforeEach(() => {
      setupDOM({ includeTerminal: true });
      loadModule();
    });

    it('should set inert and aria-hidden on terminal when menu opens', () => {
      const { hamburger, terminal } = getElements();
      hamburger.click();
      expect(terminal.hasAttribute('inert')).toBe(true);
      expect(terminal.getAttribute('aria-hidden')).toBe('true');
    });

    it('should remove inert and aria-hidden from terminal when menu closes', () => {
      const { hamburger, closeBtn, terminal } = getElements();
      hamburger.click();
      closeBtn.click();
      expect(terminal.hasAttribute('inert')).toBe(false);
      expect(terminal.hasAttribute('aria-hidden')).toBe(false);
    });
  });

  describe('no-op when overlay is missing', () => {
    it('should not throw when #menu-overlay is not in DOM', () => {
      setupDOM({ includeOverlay: false });
      expect(() => loadModule()).not.toThrow();
    });
  });
});
