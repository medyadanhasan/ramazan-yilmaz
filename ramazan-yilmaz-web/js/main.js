// Mobil menü (statik, sayfa yüklenir yüklenmez çalışır)
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
if (menuBtn) {
  menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// Dinamik içerik JSON'dan render edildikten sonra render.js tarafından çağrılır:
// scroll ile beliren öğeler + sayaç animasyonu.
window.initEffects = function initEffects() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observer.observe(el));

  document.querySelectorAll('.num[data-target]').forEach((el) => {
    if (el.dataset.animated) return;
    el.dataset.animated = 'true';
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      let cur = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const tick = () => {
        cur = Math.min(target, cur + step);
        el.textContent = cur + suffix;
        if (cur < target) requestAnimationFrame(tick);
      };
      tick();
    });
    io.observe(el);
  });
};
