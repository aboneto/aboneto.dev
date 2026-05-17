(function() {
  'use strict';

  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      const searchInput = document.getElementById('archive-search');
      if (searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
    }
  });
})();
