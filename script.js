const header = document.getElementById('header');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
  });
});

document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const btn = this.querySelector('.btn');
  const original = btn.textContent;
  btn.textContent = 'Sending...';
  btn.disabled = true;
  try {
    const res = await fetch(this.action, {
      method: this.method,
      body: new FormData(this),
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      btn.textContent = 'Message Sent!';
      btn.style.background = '#25d366';
      this.reset();
    } else {
      btn.textContent = 'Failed to send. Try again.';
      btn.style.background = '#D61F26';
    }
  } catch {
    btn.textContent = 'Failed to send. Try again.';
    btn.style.background = '#D61F26';
  }
  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = '';
    btn.disabled = false;
  }, 3000);
});

let lastScroll = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > 80) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  lastScroll = y;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = el.dataset.delay || 0;
      setTimeout(() => el.classList.add('visible'), delay);
      observer.unobserve(el);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach((el, i) => {
  const parent = el.closest('.grid-3, .testimonials-grid, .values-grid, .process-steps');
  if (parent) {
    const index = Array.from(parent.children).indexOf(el);
    el.dataset.delay = index * 80;
  }
  observer.observe(el);
});
