/* PhysioXtra — main.js */

// ── Nav ──────────────────────────────────────────────────────────────────
const nav = document.getElementById('nav');
if (nav) {
  if (!nav.classList.contains('transparent')) nav.classList.add('solid');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// ── Active nav link ──────────────────────────────────────────────────────
const currentFile = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .drawer-panel a:not(.drawer-book), .footer-links a').forEach(a => {
  const href = (a.getAttribute('href') || '').split('/').pop();
  if (href === currentFile || (currentFile === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

// ── Fade-up observer ─────────────────────────────────────────────────────
const fadeObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); fadeObs.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => fadeObs.observe(el));

// ── Back to top ──────────────────────────────────────────────────────────
const btt = document.getElementById('btt');
if (btt) {
  window.addEventListener('scroll', () => btt.classList.toggle('show', window.scrollY > 400), { passive: true });
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── Mobile drawer ────────────────────────────────────────────────────────
const drawer    = document.getElementById('mobile-drawer');
const hamburger = document.getElementById('hamburger');
if (drawer && hamburger) {
  const bars = hamburger.querySelectorAll('span');
  const openDrawer = () => {
    drawer.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    bars[0].style.cssText = 'transform:translateY(7px) rotate(45deg)';
    bars[1].style.cssText = 'opacity:0; transform:scaleX(0)';
    bars[2].style.cssText = 'transform:translateY(-7px) rotate(-45deg)';
  };
  window.closeDrawer = () => {
    drawer.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    bars[0].style.cssText = bars[1].style.cssText = bars[2].style.cssText = '';
  };
  window.toggleDrawer = () => drawer.classList.contains('open') ? closeDrawer() : openDrawer();
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });
}

// ── Mobile sticky bar hides near footer ──────────────────────────────────
const bookBar = document.getElementById('mobile-book-bar');
const footer  = document.getElementById('footer');
if (bookBar && footer) {
  new IntersectionObserver(([e]) => { bookBar.style.display = e.isIntersecting ? 'none' : ''; }, { threshold: 0.01 }).observe(footer);
}
