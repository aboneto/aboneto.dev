/**
 * Tests for terminal-command.js
 *
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

const SOURCE = fs.readFileSync(
  path.resolve(__dirname, '../assets/js/terminal-command.js'),
  'utf8',
);

function setupDOM() {
  document.body.innerHTML = `
    <div class="wordmark">
      <span class="prompt">$</span>
      <a href="/" class="wordmark-link">
        <span>cd</span>
        <span class="path">~/aboneto.dev</span>
      </a>
      <span class="cursor" data-terminal-cursor></span>
      <span class="kbd">⌘.</span>
      <input class="wordmark-input" type="text" data-terminal-input placeholder="cd ~/aboneto.dev">
    </div>
  `;
}

function loadModule() {
  const fn = new Function(SOURCE);
  fn();
}

function getElements() {
  return {
    cursor: document.querySelector('[data-terminal-cursor]'),
    input: document.querySelector('[data-terminal-input]'),
    link: document.querySelector('.wordmark-link'),
    wordmark: document.querySelector('.wordmark'),
    kbd: document.querySelector('.kbd'),
  };
}

describe('terminal-command', () => {
  beforeEach(() => {
    setupDOM();
    loadModule();
  });

  describe('activation', () => {
    it('should activate on cursor click', () => {
      const { cursor, input, link, wordmark, kbd } = getElements();
      cursor.click();

      expect(link.style.display).toBe('none');
      expect(cursor.style.display).toBe('none');
      expect(kbd.style.display).toBe('none');
      expect(input.classList.contains('active')).toBe(true);
      expect(wordmark.classList.contains('terminal-active')).toBe(true);
      expect(input.value).toBe('');
    });

    it('should activate on ⌘. keydown', () => {
      const { input, wordmark } = getElements();
      document.dispatchEvent(new KeyboardEvent('keydown', {
        key: '.', metaKey: true,
      }));

      expect(input.classList.contains('active')).toBe(true);
      expect(wordmark.classList.contains('terminal-active')).toBe(true);
    });

    it('should activate on Ctrl+. keydown', () => {
      const { input } = getElements();
      document.dispatchEvent(new KeyboardEvent('keydown', {
        key: '.', ctrlKey: true,
      }));

      expect(input.classList.contains('active')).toBe(true);
    });

    it('should not activate when another input is focused', () => {
      const otherInput = document.createElement('input');
      document.body.appendChild(otherInput);
      otherInput.focus();

      document.dispatchEvent(new KeyboardEvent('keydown', {
        key: '.', metaKey: true,
      }));

      const { input } = getElements();
      expect(input.classList.contains('active')).toBe(false);
    });

    it('should activate on Enter key on cursor', () => {
      const { cursor, input } = getElements();
      cursor.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      expect(input.classList.contains('active')).toBe(true);
    });

    it('should activate on Space key on cursor', () => {
      const { cursor, input } = getElements();
      cursor.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
      expect(input.classList.contains('active')).toBe(true);
    });

    it('should not activate twice', () => {
      const { cursor, input } = getElements();
      cursor.click();
      cursor.click();
      expect(input.classList.contains('active')).toBe(true);
    });
  });

  describe('deactivation', () => {
    it('should deactivate on Escape key', () => {
      const { cursor, input, link, wordmark, kbd } = getElements();
      cursor.click();

      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

      expect(input.classList.contains('active')).toBe(false);
      expect(wordmark.classList.contains('terminal-active')).toBe(false);
      expect(link.style.display).toBe('');
      expect(cursor.style.display).toBe('');
      expect(kbd.style.display).toBe('');
    });

    it('should deactivate on blur with empty input', () => {
      const { cursor, input, wordmark } = getElements();
      cursor.click();

      input.value = '';
      input.dispatchEvent(new Event('blur'));

      expect(input.classList.contains('active')).toBe(false);
      expect(wordmark.classList.contains('terminal-active')).toBe(false);
    });

    it('should not deactivate on blur with non-empty input', () => {
      const { cursor, input } = getElements();
      cursor.click();

      input.value = 'ls';
      input.dispatchEvent(new Event('blur'));

      expect(input.classList.contains('active')).toBe(true);
    });

    it('should focus cursor after deactivation', () => {
      const { cursor, input } = getElements();
      cursor.click();
      const focusSpy = jest.spyOn(cursor, 'focus');

      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      expect(focusSpy).toHaveBeenCalled();
    });
  });

  describe('command execution', () => {
    let locationSpy;

    beforeEach(() => {
      // Suppress jsdom navigation errors
      locationSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      locationSpy.mockRestore();
    });

    it('should execute "cd archivo" without throwing', () => {
      const { cursor, input } = getElements();
      cursor.click();
      input.value = 'cd archivo';

      expect(() => {
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      }).not.toThrow();
    });

    it('should execute "cd ~/aboneto.dev" without throwing', () => {
      const { cursor, input } = getElements();
      cursor.click();
      input.value = 'cd ~/aboneto.dev';

      expect(() => {
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      }).not.toThrow();
    });

    it('should execute "ls" without throwing', () => {
      const { cursor, input } = getElements();
      cursor.click();
      input.value = 'ls';

      expect(() => {
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      }).not.toThrow();
    });

    it('should execute "ls -la" without throwing', () => {
      const { cursor, input } = getElements();
      cursor.click();
      input.value = 'ls -la';

      expect(() => {
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      }).not.toThrow();
    });

    it('should execute "find ." without throwing', () => {
      const { cursor, input } = getElements();
      cursor.click();
      input.value = 'find .';

      expect(() => {
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      }).not.toThrow();
    });

    it('should execute "cat my-post" without throwing', () => {
      const { cursor, input } = getElements();
      cursor.click();
      input.value = 'cat my-post';

      expect(() => {
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      }).not.toThrow();
    });

    it('should show error for unknown command', () => {
      const { cursor, input } = getElements();
      cursor.click();
      input.value = 'rm -rf /';
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      expect(input.classList.contains('command-error')).toBe(true);
    });

    it('should do nothing on empty Enter', () => {
      const { cursor, input } = getElements();
      cursor.click();
      input.value = '';
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      expect(input.classList.contains('command-error')).toBe(false);
    });

    it('should be case-insensitive', () => {
      const { cursor, input } = getElements();
      cursor.click();
      input.value = 'CD Archivo';

      expect(() => {
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      }).not.toThrow();
    });

    it('should handle "cd categoria" without throwing', () => {
      const { cursor, input } = getElements();
      cursor.click();
      input.value = 'cd categoria';

      expect(() => {
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      }).not.toThrow();
    });

    it('should handle "cd categorias" without throwing', () => {
      const { cursor, input } = getElements();
      cursor.click();
      input.value = 'cd categorias';

      expect(() => {
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      }).not.toThrow();
    });
  });

  describe('home page behavior', () => {
    it('should activate on logo click when on home page', () => {
      // The testURL is set to http://localhost:4000 which has pathname '/'
      // So the module will detect we're on the home page
      document.body.innerHTML = '';
      setupDOM();
      loadModule();

      const link = document.querySelector('.wordmark-link');
      const input = document.querySelector('[data-terminal-input]');
      link.click();

      expect(input.classList.contains('active')).toBe(true);
    });
  });
});
