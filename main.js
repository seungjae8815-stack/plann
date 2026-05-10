// Header scroll shadow
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
});

// Mobile hamburger
const hamBtn = document.getElementById('hamBtn');
const mobileMenu = document.getElementById('mobileMenu');
hamBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// Smooth scroll offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  });
});

// Scroll reveal
const revealEls = document.querySelectorAll(
  '.svc-card, .promise-card, .str-card, .guide-card, .sec-hd, .guide-left, .strengths-top'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

// Stagger cards within each grid
['.svc-grid', '.promise-grid', '.strengths-grid'].forEach(sel => {
  const grid = document.querySelector(sel);
  if (!grid) return;
  const cards = grid.querySelectorAll('.reveal');
  const gridObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        cards.forEach((card, i) => {
          setTimeout(() => card.classList.add('visible'), i * 90);
        });
        gridObserver.disconnect();
      }
    });
  }, { threshold: 0.05 });
  if (cards.length) gridObserver.observe(grid);
});
