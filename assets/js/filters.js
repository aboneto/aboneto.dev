(function() {
  'use strict';

  const chips = document.querySelectorAll('.chip[data-category]');
  const archiveRows = document.querySelectorAll('.archive-row[data-categories]');
  if (chips.length === 0 || archiveRows.length === 0) return;

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const category = chip.getAttribute('data-category');

      archiveRows.forEach(row => {
        if (category === 'all') {
          row.style.display = '';
        } else {
          const cats = row.getAttribute('data-categories') || '';
          row.style.display = cats.indexOf(category) !== -1 ? '' : 'none';
        }
      });
    });
  });
})();
