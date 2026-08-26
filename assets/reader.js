(() => {
  const key = 'pixels-of-clarity:last-chapter';
  const continueLink = document.querySelector('[data-continue-reading]');
  const chapterLinks = [...document.querySelectorAll('[data-chapter]')];

  let saved = null;
  try { saved = JSON.parse(localStorage.getItem(key)); } catch (_) {}

  if (saved && saved.href && continueLink) {
    continueLink.href = saved.href;
    continueLink.textContent = `Continue · Chapter ${saved.number}`;
    continueLink.hidden = false;
    const current = chapterLinks.find(link => link.dataset.chapter === String(saved.number));
    if (current) current.dataset.current = 'true';
  }

  chapterLinks.forEach(link => {
    link.addEventListener('click', () => {
      try {
        localStorage.setItem(key, JSON.stringify({
          number: link.dataset.chapter,
          href: link.href,
          title: link.dataset.title || ''
        }));
      } catch (_) {}
    });
  });
})();
