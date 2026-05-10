/* ── 헤더 스크롤 효과 ── */
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('on', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });

/* ── 모바일 메뉴 ── */
const hamBtn   = document.getElementById('hamBtn');
const mobileNav = document.getElementById('mobileNav');
hamBtn.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  hamBtn.setAttribute('aria-expanded', open);
});
mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileNav.classList.remove('open'));
});

/* ── 앵커 스무스 스크롤 (헤더 높이 보정) ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 112;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── 스크롤 페이드 인 ── */
const fadeTargets = document.querySelectorAll(
  '.svc-card, .promise-card, .str-card, .guide-card, .sec-head, .guide-left, .str-top'
);
fadeTargets.forEach(el => el.classList.add('fade'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeTargets.forEach(el => io.observe(el));

/* ── 카드 그룹 순차 등장 ── */
['.svc-grid', '.promise-grid', '.str-grid'].forEach(sel => {
  const grid = document.querySelector(sel);
  if (!grid) return;
  const cards = Array.from(grid.querySelectorAll('.fade'));
  const gio = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      cards.forEach((card, i) => setTimeout(() => card.classList.add('in'), i * 80));
      gio.disconnect();
    }
  }, { threshold: 0.05 });
  if (cards.length) gio.observe(grid);
});
