/**
 * Terminal command interface for the wordmark header.
 * Activates an inline input to simulate shell commands (cd, ls, find, cat).
 *
 * @module terminal-command
 */
(function () {
  'use strict';

  /** @type {HTMLElement | null} */
  const cursor = document.querySelector('[data-terminal-cursor]');
  /** @type {HTMLInputElement | null} */
  const input = document.querySelector('[data-terminal-input]');
  /** @type {HTMLAnchorElement | null} */
  const link = document.querySelector('.wordmark-link');
  /** @type {HTMLElement | null} */
  const wordmark = document.querySelector('.wordmark');
  /** @type {HTMLElement | null} */
  const kbd = wordmark?.querySelector('.kbd') ?? null;

  if (!cursor || !input || !link || !wordmark) return;

  /** @type {boolean} */
  let active = false;

  /** Transition duration for the error animation (ms). */
  const ERROR_DURATION = 600;

  /** Prefix used for home-path resolution. */
  const HOME_PREFIX = '~/aboneto.dev';

  /**
   * Route table mapping command arguments to destination paths.
   * Keys are slugified argument strings; values are URL paths.
   */
  const ROUTES = {
    'categoria': '/categoria/',
    'categorias': '/categoria/',
  };

  /**
   * Activate the terminal input, hiding static elements.
   */
  const activate = () => {
    if (active) return;
    active = true;
    link.style.display = 'none';
    cursor.style.display = 'none';
    if (kbd) kbd.style.display = 'none';
    input.classList.add('active');
    wordmark.classList.add('terminal-active');
    input.value = '';
    input.focus();
  };

  /**
   * Deactivate the terminal input, restoring static elements.
   */
  const deactivate = () => {
    if (!active) return;
    active = false;
    input.classList.remove('active', 'command-error');
    wordmark.classList.remove('terminal-active');
    input.value = '';
    link.style.display = '';
    cursor.style.display = '';
    if (kbd) kbd.style.display = '';
    cursor.focus();
  };

  /**
   * Convert a string to a URL-safe slug.
   * @param {string} str
   * @returns {string}
   */
  const slugify = (str) => str.toLowerCase().replace(/\s+/g, '-');

  /**
   * Flash the error animation on the input.
   */
  const showError = () => {
    input.classList.remove('command-error');
    void input.offsetWidth; // force reflow to restart animation
    input.classList.add('command-error');
    setTimeout(() => input.classList.remove('command-error'), ERROR_DURATION);
  };

  /**
   * Navigate to a path, normalising slashes.
   * @param {string} path
   */
  const navigate = (path) => {
    window.location.href = path;
  };

  /**
   * Resolve a `cd` target to a URL path.
   * @param {string} target
   * @returns {string | null}
   */
  const resolveCd = (target) => {
    if (target === '~' || target === HOME_PREFIX) return '/';

    if (target.startsWith(`${HOME_PREFIX}/`)) {
      const rest = target.slice(HOME_PREFIX.length + 1).replace(/\/+$/, '');
      return `/${rest}/`;
    }

    const known = ROUTES[target];
    if (known) return known;

    const normalised = target.replace(/^\/+/, '').replace(/\/+$/, '');
    return `/${normalised}/`;
  };

  /**
   * Execute a terminal command string.
   * @param {string} cmd
   */
  const execute = (cmd) => {
    const parts = cmd.trim().toLowerCase().split(/\s+/);
    const [bin, ...args] = parts;

    if (!bin) return;

    switch (bin) {
      case 'cd': {
        if (args.length === 0) return;
        const target = args.join(' ');
        const dest = resolveCd(target);
        if (dest) navigate(dest);
        break;
      }

      case 'ls': {
        const hasFlag = args[0] === '-la';
        const contentArgs = hasFlag ? args.slice(1) : args;

        if (contentArgs.length === 0) {
          navigate('/archivo/');
        } else {
          navigate(`/categoria/${slugify(contentArgs.join(' '))}/`);
        }
        break;
      }

      case 'find':
        navigate('/archivo/');
        break;

      case 'cat': {
        if (args.length === 0) return;
        navigate(`/${args.join('-')}/`);
        break;
      }

      default:
        showError();
    }
  };

  // --- Event listeners ---

  cursor.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    activate();
  });

  cursor.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      activate();
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      deactivate();
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      if (input.value.trim() === '') return;
      execute(input.value);
    }
  });

  input.addEventListener('blur', () => {
    if (input.value.trim() === '') deactivate();
  });

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === '.') {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      e.preventDefault();
      activate();
    }
  });

  if (window.location.pathname === '/') {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      activate();
    });
  }
})();
