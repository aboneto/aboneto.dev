(function() {
  'use strict';

  const filterRow = document.getElementById('filter-row');
  if (filterRow) {
    const chips = Array.from(filterRow.querySelectorAll('.chip[data-count]'));
    chips.sort((a, b) => {
      const countA = parseInt(a.getAttribute('data-count') || '0', 10);
      const countB = parseInt(b.getAttribute('data-count') || '0', 10);
      return countB - countA;
    });
    chips.forEach(chip => filterRow.appendChild(chip));
  }

  const allChips = document.querySelectorAll('.chip[data-category]');
  const archiveRows = document.querySelectorAll('.archive-row[data-categories]');
  if (allChips.length === 0 || archiveRows.length === 0) return;

  function activateChip(chip) {
    allChips.forEach(c => c.classList.remove('active'));
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
  }

  allChips.forEach(chip => {
    chip.addEventListener('click', () => {
      activateChip(chip);
    });

    chip.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        activateChip(chip);
      } else if (e.key === ' ') {
        e.preventDefault();
        activateChip(chip);
      }
    });
  });
})();
