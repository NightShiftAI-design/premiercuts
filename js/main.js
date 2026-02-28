const cursor = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

if (window.matchMedia('(hover: hover)').matches) {
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .team-card, .gallery-item, .gallery-full-item, .service-row').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); cursorRing.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); cursorRing.classList.remove('hover'); });
  });
} else {
  cursor.style.display = 'none';
  cursorRing.style.display = 'none';
}

const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo(0, 0);
    setTimeout(observeAnimations, 100);
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
  const page = (e.state && e.state.page) || 'home';
  showPage(page);
});

const hash = location.hash.replace('#', '') || 'home';
showPage(hash);

function observeAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in, .slide-left, .slide-right').forEach(el => {
    observer.observe(el);
  });
}
observeAnimations();

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'Message Sent —';
    btn.style.background = '#1a4a2a';
    btn.style.borderColor = '#1a4a2a';
    btn.style.color = '#7dcc9a';
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.style.color = '';
      contactForm.reset();
    }, 3000);
  });
}
