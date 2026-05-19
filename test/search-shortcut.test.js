/**
 * Tests for search-shortcut.js
 *
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

const SOURCE = fs.readFileSync(
  path.resolve(__dirname, '../assets/js/search-shortcut.js'),
  'utf8',
);

function setupDOM(withSearch) {
  if (withSearch) {
    document.body.innerHTML = `
      <input id="archive-search" type="text" placeholder="Search...">
    `;
  } else {
    document.body.innerHTML = '';
  }
}

function loadModule() {
  const fn = new Function(SOURCE);
  fn();
}

describe('search-shortcut', () => {
  beforeAll(() => {
    loadModule();
  });

  describe('Cmd+K / Ctrl+K shortcut', () => {
    beforeEach(() => {
      setupDOM(true);
    });

    it('should focus #archive-search on Cmd+K', () => {
      const input = document.getElementById('archive-search');
      const focusSpy = jest.spyOn(input, 'focus');

      document.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'k',
        metaKey: true,
      }));

      expect(focusSpy).toHaveBeenCalledTimes(1);
    });

    it('should call preventDefault on Cmd+K', () => {
      const input = document.getElementById('archive-search');
      const event = new KeyboardEvent('keydown', {
        key: 'k',
        metaKey: true,
      });
      const preventSpy = jest.spyOn(event, 'preventDefault');
      jest.spyOn(input, 'focus');

      document.dispatchEvent(event);

      expect(preventSpy).toHaveBeenCalled();
    });

    it('should focus #archive-search on Ctrl+K', () => {
      const input = document.getElementById('archive-search');
      const focusSpy = jest.spyOn(input, 'focus');

      document.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'k',
        ctrlKey: true,
      }));

      expect(focusSpy).toHaveBeenCalledTimes(1);
    });

    it('should call preventDefault on Ctrl+K', () => {
      const input = document.getElementById('archive-search');
      const event = new KeyboardEvent('keydown', {
        key: 'k',
        ctrlKey: true,
      });
      const preventSpy = jest.spyOn(event, 'preventDefault');
      jest.spyOn(input, 'focus');

      document.dispatchEvent(event);

      expect(preventSpy).toHaveBeenCalled();
    });
  });

  describe('when #archive-search is missing', () => {
    beforeEach(() => {
      setupDOM(false);
    });

    it('should not throw on Cmd+K when search input is absent', () => {
      expect(() => {
        document.dispatchEvent(new KeyboardEvent('keydown', {
          key: 'k',
          metaKey: true,
        }));
      }).not.toThrow();
    });

    it('should not throw on Ctrl+K when search input is absent', () => {
      expect(() => {
        document.dispatchEvent(new KeyboardEvent('keydown', {
          key: 'k',
          ctrlKey: true,
        }));
      }).not.toThrow();
    });
  });

  describe('regardless of active element', () => {
    beforeEach(() => {
      setupDOM(true);
    });

    it('should focus search input when a button is focused', () => {
      const button = document.createElement('button');
      document.body.appendChild(button);
      button.focus();

      const input = document.getElementById('archive-search');
      const focusSpy = jest.spyOn(input, 'focus');

      document.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'k',
        metaKey: true,
      }));

      expect(focusSpy).toHaveBeenCalledTimes(1);
    });

    it('should focus search input when another input is focused', () => {
      const otherInput = document.createElement('input');
      document.body.appendChild(otherInput);
      otherInput.focus();

      const input = document.getElementById('archive-search');
      const focusSpy = jest.spyOn(input, 'focus');

      document.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'k',
        ctrlKey: true,
      }));

      expect(focusSpy).toHaveBeenCalledTimes(1);
    });
  });
});
