/* ─────────────────────────────────────────
   CUSTOM CURSOR
───────────────────────────────────────── */
const cursor     = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

if (window.matchMedia('(hover: hover)').matches && cursor && cursorRing) {
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  (function animateRing() {
    ringX += (mouseX - ringX) * 0.11;
    ringY += (mouseY - ringY) * 0.11;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  })();

  const hoverTargets = 'a, button, .team-card, .gallery-item, .gallery-full-item, .service-row, .faq-question, .book-option';
  document.addEventListener('mouseenter', e => {
    if (e.target.closest(hoverTargets)) {
      cursor.classList.add('hover');
      cursorRing.classList.add('hover');
    }
  }, true);
  document.addEventListener('mouseleave', e => {
    if (e.target.closest(hoverTargets)) {
      cursor.classList.remove('hover');
      cursorRing.classList.remove('hover');
    }
  }, true);
} else {
  if (cursor)     cursor.style.display = 'none';
  if (cursorRing) cursorRing.style.display = 'none';
  document.body.style.cursor = 'auto';
}

/* ─────────────────────────────────────────
   NAV SCROLL
───────────────────────────────────────── */
const mainNav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  mainNav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ─────────────────────────────────────────
   MOBILE MENU
───────────────────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ─────────────────────────────────────────
   PAGE ROUTING (SPA hash)
───────────────────────────────────────── */
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'instant' });
    updateActiveNav(pageId);
    setTimeout(observeAnimations, 80);
    setTimeout(observeAnimations, 400); // second pass for delayed elements
  }
}

function handleNavClick(e, pageId) {
  e.preventDefault();
  showPage(pageId);
  history.pushState({ page: pageId }, '', '#' + pageId);
}

document.querySelectorAll('[data-page]').forEach(el => {
  el.addEventListener('click', e => handleNavClick(e, el.dataset.page));
});

window.addEventListener('popstate', e => {
  showPage((e.state && e.state.page) || 'home');
});

function updateActiveNav(pageId) {
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === pageId);
  });
}

const initPage = location.hash.replace('#', '') || 'home';
showPage(initPage);

/* ─────────────────────────────────────────
   SCROLL ANIMATIONS
───────────────────────────────────────── */
let animationObserver;

function observeAnimations() {
  if (animationObserver) animationObserver.disconnect();

  animationObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        animationObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

  document.querySelectorAll('.fade-in:not(.visible), .slide-left:not(.visible), .slide-right:not(.visible)').forEach(el => {
    animationObserver.observe(el);
  });
}

/* ─────────────────────────────────────────
   FAQ ACCORDION
───────────────────────────────────────── */
document.addEventListener('click', e => {
  const q = e.target.closest('.faq-question');
  if (!q) return;
  const item = q.closest('.faq-item');
  const isOpen = item.classList.contains('open');

  // close all
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));

  // open clicked (unless it was already open)
  if (!isOpen) item.classList.add('open');
});

/* ─────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn  = contactForm.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = 'Message Sent ✓';
    btn.style.cssText = 'background:#0d2e18;border-color:#0d2e18;color:#6dba8a;cursor:default';
    setTimeout(() => {
      btn.innerHTML   = orig;
      btn.style.cssText = '';
      contactForm.reset();
    }, 3200);
  });
}
