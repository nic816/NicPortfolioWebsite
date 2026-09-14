const menuButton = document.getElementById('menuButton');
const siteNav = document.getElementById('siteNav');

menuButton.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  menuButton.textContent = isOpen ? '×' : '☰';
});

siteNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    menuButton.textContent = '☰';
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

// Reveal content as it enters the viewport.
document.body.classList.add('animations-ready');
const animatedItems = document.querySelectorAll('.section:not(.hero), .card, .achievement-groups > div, .photo-placeholder');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  animatedItems.forEach((item, index) => {
    item.style.transitionDelay = `${(index % 3) * 90}ms`;
    revealObserver.observe(item);
  });
} else {
  animatedItems.forEach((item) => item.classList.add('is-visible'));
}
