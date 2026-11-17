// Elemen
const header = document.getElementById('header');
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
const overlay = document.getElementById('overlay');

// Menu mobile (slide-out)
function toggleMenu(open) {
  burger.classList.toggle('open', open);
  navLinks.classList.toggle('open', open);
  overlay.classList.toggle('show', open);
  document.body.style.overflow = open ? 'hidden' : '';
}
burger.addEventListener('click', () => toggleMenu(!navLinks.classList.contains('open')));
overlay.addEventListener('click', () => toggleMenu(false));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

// Garis bawah header saat di-scroll
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// Filter portofolio
const tabs = document.querySelectorAll('#tabs button');
const items = document.querySelectorAll('#grid .item');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.filter;
    items.forEach(item => {
      item.classList.toggle('hide', filter !== 'all' && item.dataset.cat !== filter);
    });
  });
});

// Animasi fade-in saat di-scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Angka statistik menghitung naik
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function countUp(el) {
  const target = +el.dataset.count;
  const suffix = el.dataset.suffix || '';
  if (reduceMotion) { el.textContent = target + suffix; return; }
  const duration = 1600;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      countUp(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });
document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));

// Tombol harga otomatis memilih paket di form
document.querySelectorAll('[data-pkg]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('package').value = btn.dataset.pkg;
  });
});

// Form kontak (demo: belum terhubung ke backend)
const form = document.getElementById('form');
const note = document.getElementById('note');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  note.textContent = 'Terima kasih! Pesanmu sudah kami terima, kami akan membalas dalam 24 jam.';
  form.reset();
});

// Tahun di footer
document.getElementById('year').textContent = new Date().getFullYear();