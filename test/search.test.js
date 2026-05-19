/**
 * Tests for search.js
 *
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

const SOURCE = fs.readFileSync(
  path.resolve(__dirname, '../assets/js/search.js'),
  'utf8',
);

const mockPosts = [
  { title: 'Intro a JavaScript', excerpt: 'Aprende los basics', url: '/js-intro', date: '2024-01-01', reading_time: 5, categories: ['javascript'] },
  { title: 'Guía de CSS Grid', excerpt: 'Layout moderno con grid', url: '/css-grid', date: '2024-02-01', reading_time: 8, categories: ['css'] },
  { title: 'Node.js avanzado', excerpt: 'Streams y buffers', url: '/node-advanced', date: '2024-03-01', reading_time: 10, categories: ['node'] },
];

function setupDOM() {
  document.body.innerHTML = `
    <div class="search-wrapper">
      <input id="archive-search" type="text" placeholder="buscar...">
    </div>
    <div id="archive-list"></div>
  `;
}

function loadModule() {
  const fn = new Function(SOURCE);
  fn();
}

function flushPromises() {
  return new Promise(resolve => process.nextTick(resolve));
}

describe('search', () => {
  beforeEach(() => {
    setupDOM();
    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(mockPosts) })
    );
    loadModule();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('input resizing', () => {
    it('should resize input to match content on init', () => {
      const input = document.getElementById('archive-search');
      const wrapper = input.parentElement;
      Object.defineProperty(wrapper, 'offsetWidth', { value: 500, configurable: true });

      const mirror = document.body.lastElementChild;
      Object.defineProperty(mirror, 'offsetWidth', { value: 120, configurable: true });

      input.dispatchEvent(new Event('input'));

      expect(input.style.width).toBe('122px');
    });

    it('should cap width to parent offsetWidth minus 4', () => {
      const input = document.getElementById('archive-search');
      const wrapper = input.parentElement;
      Object.defineProperty(wrapper, 'offsetWidth', { value: 100, configurable: true });

      const mirror = document.body.lastElementChild;
      Object.defineProperty(mirror, 'offsetWidth', { value: 200, configurable: true });

      input.dispatchEvent(new Event('input'));

      expect(input.style.width).toBe('96px');
    });
  });

  describe('fetching posts', () => {
    it('should fetch posts from /search.json on init', () => {
      expect(global.fetch).toHaveBeenCalledWith('/search.json');
    });

    it('should populate posts after fetch resolves', async () => {
      await flushPromises();

      const input = document.getElementById('archive-search');
      input.value = '';
      input.dispatchEvent(new Event('input'));

      const rows = document.querySelectorAll('.archive-row');
      expect(rows.length).toBe(3);
    });
  });

  describe('filtering', () => {
    beforeEach(async () => {
      await flushPromises();
    });

    it('should filter posts by title match', () => {
      const input = document.getElementById('archive-search');
      input.value = 'JavaScript';
      input.dispatchEvent(new Event('input'));

      const rows = document.querySelectorAll('.archive-row');
      expect(rows.length).toBe(1);
      expect(rows[0].querySelector('h3').textContent).toBe('Intro a JavaScript');
    });

    it('should filter posts by excerpt match', () => {
      const input = document.getElementById('archive-search');
      input.value = 'grid';
      input.dispatchEvent(new Event('input'));

      const rows = document.querySelectorAll('.archive-row');
      expect(rows.length).toBe(1);
      expect(rows[0].querySelector('h3').textContent).toBe('Guía de CSS Grid');
    });

    it('should support OR filtering with pipe separator', () => {
      const input = document.getElementById('archive-search');
      input.value = 'JavaScript | Node';
      input.dispatchEvent(new Event('input'));

      const rows = document.querySelectorAll('.archive-row');
      expect(rows.length).toBe(2);
    });

    it('should render all posts when query is empty', () => {
      const input = document.getElementById('archive-search');
      input.value = '';
      input.dispatchEvent(new Event('input'));

      const rows = document.querySelectorAll('.archive-row');
      expect(rows.length).toBe(3);
    });

    it('should show "sin resultados" when no posts match', () => {
      const input = document.getElementById('archive-search');
      input.value = 'zzznoexiste';
      input.dispatchEvent(new Event('input'));

      const rows = document.querySelectorAll('.archive-row');
      expect(rows.length).toBe(1);
      expect(rows[0].querySelector('h3').textContent).toBe('sin resultados');
    });
  });

  describe('fetch failure', () => {
    it('should handle fetch failure gracefully', async () => {
      document.body.innerHTML = '';
      setupDOM();

      global.fetch = jest.fn(() => Promise.reject(new Error('fail')));

      loadModule();
      await flushPromises();

      const input = document.getElementById('archive-search');
      input.value = 'anything';
      input.dispatchEvent(new Event('input'));

      const rows = document.querySelectorAll('.archive-row');
      expect(rows.length).toBe(1);
      expect(rows[0].querySelector('h3').textContent).toBe('sin resultados');
    });
  });

  describe('no-op when elements missing', () => {
    it('should not throw when #archive-search is missing', () => {
      document.body.innerHTML = '<div id="archive-list"></div>';
      expect(() => loadModule()).not.toThrow();
    });

    it('should not throw when #archive-list is missing', () => {
      document.body.innerHTML = '<input id="archive-search">';
      expect(() => loadModule()).not.toThrow();
    });
  });
});
