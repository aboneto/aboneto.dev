(function() {
  'use strict';

  const searchInput = document.getElementById('archive-search');
  const archiveList = document.getElementById('archive-list');
  if (!searchInput || !archiveList) return;

  const mirror = document.createElement('span');
  mirror.style.cssText = 'position:absolute;visibility:hidden;white-space:pre;font-family:monospace;font-size:14px';
  document.body.appendChild(mirror);

  function resizeInput() {
    const text = searchInput.value || searchInput.placeholder;
    mirror.textContent = text;
    const max = searchInput.parentElement.offsetWidth - 4;
    searchInput.style.width = Math.min(mirror.offsetWidth + 2, max) + 'px';
  }

  searchInput.addEventListener('input', resizeInput);
  searchInput.parentElement.addEventListener('click', () => searchInput.focus());
  resizeInput();

  let posts = [];

  fetch('/search.json')
    .then(res => res.json())
    .then(data => { posts = data; })
    .catch(() => { posts = []; });

  function renderPosts(filtered) {
    archiveList.innerHTML = '';

    if (filtered.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'archive-row';
      empty.innerHTML = '<h3 style="color: var(--ink-mute)">sin resultados</h3>';
      archiveList.appendChild(empty);
      return;
    }

    filtered.forEach(post => {
      const row = document.createElement('a');
      row.href = post.url;
      row.className = 'archive-row';
      row.setAttribute('data-categories', (post.categories || []).join(','));
      row.innerHTML =
        '<span class="date">' + post.date + '</span>' +
        '<h3>' + post.title + '</h3>' +
        '<span class="rt">~' + post.reading_time + 'min</span>';
      archiveList.appendChild(row);
    });
  }

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();

    if (!query) {
      renderPosts(posts);
      return;
    }

    const filtered = posts.filter(post => {
      const title = (post.title || '').toLowerCase();
      const excerpt = (post.excerpt || '').toLowerCase();
      const terms = query.split('|');
      return terms.some(term => {
        term = term.trim();
        return title.indexOf(term) !== -1 || excerpt.indexOf(term) !== -1;
      });
    });

    renderPosts(filtered);
  });
})();
