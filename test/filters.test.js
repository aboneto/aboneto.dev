/**
 * Tests for filters.js
 *
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

const SOURCE = fs.readFileSync(
  path.resolve(__dirname, '../assets/js/filters.js'),
  'utf8',
);

function setupDOM(options = {}) {
  const {
    includeFilterRow = true,
    includeChips = true,
    includeRows = true,
  } = options;

  let html = '';

  if (includeFilterRow) {
    html += '<div id="filter-row">';
    if (includeChips) {
      html += `
        <button class="chip" data-category="all" data-count="5">All</button>
        <button class="chip" data-category="javascript" data-count="3">JavaScript</button>
        <button class="chip" data-category="rust" data-count="1">Rust</button>
        <button class="chip" data-category="devops" data-count="4">DevOps</button>
      `;
    }
    html += '</div>';
  }

  if (includeRows) {
    html += `
      <div class="archive-row" data-categories="javascript,react">Post A</div>
      <div class="archive-row" data-categories="rust,wasm">Post B</div>
      <div class="archive-row" data-categories="devops,docker">Post C</div>
      <div class="archive-row" data-categories="javascript,node">Post D</div>
    `;
  }

  document.body.innerHTML = html;
}

function loadModule() {
  const fn = new Function(SOURCE);
  fn();
}

function getChips() {
  return Array.from(document.querySelectorAll('.chip[data-category]'));
}

function getRows() {
  return Array.from(document.querySelectorAll('.archive-row[data-categories]'));
}

function getFilterRowChips() {
  return Array.from(document.querySelectorAll('#filter-row .chip[data-count]'));
}

describe('filters', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('chip sorting', () => {
    it('should sort chips by data-count descending', () => {
      setupDOM({ includeChips: true, includeRows: true });
      loadModule();

      const chips = getFilterRowChips();
      const counts = chips.map(c => parseInt(c.getAttribute('data-count'), 10));

      expect(counts).toEqual([5, 4, 3, 1]);
    });

    it('should reorder DOM children by count', () => {
      setupDOM({ includeChips: true, includeRows: true });
      loadModule();

      const chips = getFilterRowChips();
      expect(chips[0].textContent.trim()).toBe('All');
      expect(chips[1].textContent.trim()).toBe('DevOps');
      expect(chips[2].textContent.trim()).toBe('JavaScript');
      expect(chips[3].textContent.trim()).toBe('Rust');
    });
  });

  describe('category filtering', () => {
    beforeEach(() => {
      setupDOM({ includeChips: true, includeRows: true });
      loadModule();
    });

    it('should filter rows by clicked category', () => {
      const chips = getChips();
      const jsChip = chips.find(c => c.getAttribute('data-category') === 'javascript');
      jsChip.click();

      const rows = getRows();
      expect(rows[0].style.display).toBe('');
      expect(rows[1].style.display).toBe('none');
      expect(rows[2].style.display).toBe('none');
      expect(rows[3].style.display).toBe('');
    });

    it('should hide rows not matching category', () => {
      const chips = getChips();
      const rustChip = chips.find(c => c.getAttribute('data-category') === 'rust');
      rustChip.click();

      const rows = getRows();
      expect(rows[0].style.display).toBe('none');
      expect(rows[1].style.display).toBe('');
      expect(rows[2].style.display).toBe('none');
      expect(rows[3].style.display).toBe('none');
    });

    it('should show all rows when "all" chip is clicked', () => {
      const chips = getChips();
      const allChip = chips.find(c => c.getAttribute('data-category') === 'all');

      const jsChip = chips.find(c => c.getAttribute('data-category') === 'javascript');
      jsChip.click();

      allChip.click();

      const rows = getRows();
      rows.forEach(row => {
        expect(row.style.display).toBe('');
      });
    });

    it('should match categories using indexOf', () => {
      const chips = getChips();
      const devopsChip = chips.find(c => c.getAttribute('data-category') === 'devops');
      devopsChip.click();

      const rows = getRows();
      expect(rows[0].style.display).toBe('none');
      expect(rows[1].style.display).toBe('none');
      expect(rows[2].style.display).toBe('');
      expect(rows[3].style.display).toBe('none');
    });
  });

  describe('active class toggling', () => {
    beforeEach(() => {
      setupDOM({ includeChips: true, includeRows: true });
      loadModule();
    });

    it('should set clicked chip as active', () => {
      const chips = getChips();
      const jsChip = chips.find(c => c.getAttribute('data-category') === 'javascript');
      jsChip.click();

      expect(jsChip.classList.contains('active')).toBe(true);
    });

    it('should remove active from other chips', () => {
      const chips = getChips();
      const allChip = chips.find(c => c.getAttribute('data-category') === 'all');
      const jsChip = chips.find(c => c.getAttribute('data-category') === 'javascript');

      allChip.click();
      expect(allChip.classList.contains('active')).toBe(true);

      jsChip.click();
      expect(allChip.classList.contains('active')).toBe(false);
      expect(jsChip.classList.contains('active')).toBe(true);
    });

    it('should only have one active chip at a time', () => {
      const chips = getChips();
      const rustChip = chips.find(c => c.getAttribute('data-category') === 'rust');
      const devopsChip = chips.find(c => c.getAttribute('data-category') === 'devops');

      rustChip.click();
      devopsChip.click();

      const activeChips = chips.filter(c => c.classList.contains('active'));
      expect(activeChips).toHaveLength(1);
      expect(activeChips[0]).toBe(devopsChip);
    });
  });

  describe('keyboard activation', () => {
    beforeEach(() => {
      setupDOM({ includeChips: true, includeRows: true });
      loadModule();
    });

    it('should activate chip on Enter key', () => {
      const chips = getChips();
      const jsChip = chips.find(c => c.getAttribute('data-category') === 'javascript');

      jsChip.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      expect(jsChip.classList.contains('active')).toBe(true);
      const rows = getRows();
      expect(rows[0].style.display).toBe('');
      expect(rows[1].style.display).toBe('none');
    });

    it('should activate chip on Space key', () => {
      const chips = getChips();
      const rustChip = chips.find(c => c.getAttribute('data-category') === 'rust');

      rustChip.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));

      expect(rustChip.classList.contains('active')).toBe(true);
      const rows = getRows();
      expect(rows[1].style.display).toBe('');
    });

    it('should prevent default on Space key', () => {
      const chips = getChips();
      const rustChip = chips.find(c => c.getAttribute('data-category') === 'rust');

      const event = new KeyboardEvent('keydown', { key: ' ' });
      const preventSpy = jest.spyOn(event, 'preventDefault');

      rustChip.dispatchEvent(event);

      expect(preventSpy).toHaveBeenCalled();
    });

    it('should not activate on other keys', () => {
      const chips = getChips();
      const jsChip = chips.find(c => c.getAttribute('data-category') === 'javascript');

      jsChip.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));

      expect(jsChip.classList.contains('active')).toBe(false);
    });
  });

  describe('no-op when elements missing', () => {
    it('should not throw when filter-row is missing', () => {
      setupDOM({ includeFilterRow: false, includeRows: true });

      expect(() => loadModule()).not.toThrow();
    });

    it('should not throw when archive rows are missing', () => {
      setupDOM({ includeChips: true, includeRows: false });

      expect(() => loadModule()).not.toThrow();
    });

    it('should not throw when both chips and rows are missing', () => {
      document.body.innerHTML = '';

      expect(() => loadModule()).not.toThrow();
    });

    it('should not throw when filter-row has no chips', () => {
      setupDOM({ includeFilterRow: true, includeChips: false, includeRows: true });

      expect(() => loadModule()).not.toThrow();
    });
  });
});
