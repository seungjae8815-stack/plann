// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
mobileMenuBtn.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});
mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileNav.classList.remove('open'));
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Fade-up animation on scroll
const fadeEls = document.querySelectorAll(
  '.about-card, .service-card, .promise-card, .strength-item, .strengths-logo-row, .section-header, .section-header-white'
);
fadeEls.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

// Staggered card animation
const cardGroups = [
  document.querySelectorAll('.about-card'),
  document.querySelectorAll('.service-card'),
  document.querySelectorAll('.promise-card'),
  document.querySelectorAll('.strength-item'),
];
cardGroups.forEach(group => {
  const groupObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        group.forEach((card, i) => {
          setTimeout(() => card.classList.add('visible'), i * 100);
        });
        groupObserver.disconnect();
      }
    });
  }, { threshold: 0.08 });
  if (group.length > 0) groupObserver.observe(group[0]);
});
