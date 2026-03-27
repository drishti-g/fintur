// ══════════════════════════════════════════
//  FINTUR — Script.js
//  Ambient particles, scroll effects, counters, theme toggle
// ══════════════════════════════════════════

// ── THEME TOGGLE ──
const themeToggle = document.getElementById('theme-toggle');
function getTheme() {
  return document.documentElement.getAttribute('data-theme') || 'dark';
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('fintur-theme', theme);
  // Update particle colors for theme
  updateParticleColors(theme);
}

function updateParticleColors(theme) {
  if (!particles.length) return;
  particles.forEach(p => {
    p.color = theme === 'light'
      ? (Math.random() > 0.5 ? '5,150,105' : '13,148,136')
      : (Math.random() > 0.5 ? '52,211,153' : '45,212,191');
    p.opacity = theme === 'light'
      ? Math.random() * 0.35 + 0.1
      : Math.random() * 0.5 + 0.1;
  });
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = getTheme();
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
}

// ── AMBIENT PARTICLE SYSTEM ──
const canvas = document.getElementById('ambient-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let particles = [];
let mouseX = 0, mouseY = 0;

function getParticleColor() {
  const theme = getTheme();
  if (theme === 'light') {
    return Math.random() > 0.5 ? '5,150,105' : '13,148,136';
  }
  return Math.random() > 0.5 ? '52,211,153' : '45,212,191';
}

function getParticleOpacity() {
  return getTheme() === 'light'
    ? Math.random() * 0.35 + 0.1
    : Math.random() * 0.5 + 0.1;
}

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * (canvas ? canvas.width : 1920);
    this.y = Math.random() * (canvas ? canvas.height : 1080);
    this.size = Math.random() * 1.8 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = getParticleOpacity();
    this.color = getParticleColor();
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 150) {
      const force = (150 - dist) / 150;
      this.x += (dx / dist) * force * 2;
      this.y += (dy / dist) * force * 2;
    }
    if (canvas) {
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
  }
  draw() {
    if (!ctx) return;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
    ctx.fill();
  }
}

if (canvas && ctx) {
  for (let i = 0; i < 80; i++) particles.push(new Particle());

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const connColor = getTheme() === 'light' ? '5,150,105' : '52,211,153';
          ctx.strokeStyle = `rgba(${connColor},${0.08 * (1 - dist / 160)})`;
          ctx.lineWidth = 0.4;
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
}

// ── CURSOR GLOW ──
const cursorGlow = document.querySelector('.cursor-glow');
let glowX = 0, glowY = 0, targetGlowX = 0, targetGlowY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  targetGlowX = e.clientX;
  targetGlowY = e.clientY;
});

function updateGlow() {
  glowX += (targetGlowX - glowX) * 0.12;
  glowY += (targetGlowY - glowY) * 0.12;
  if (cursorGlow) {
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
  }
  requestAnimationFrame(updateGlow);
}
updateGlow();

// ── NAVBAR SCROLL ──
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => revealObserver.observe(el));

// ── ANIMATED COUNTERS ──
function animateCounter(el, target, suffix = '', prefix = '', duration = 2000) {
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = prefix + current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      animateCounter(el, target, suffix, prefix);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.trust-num').forEach(el => counterObserver.observe(el));

// ── TYPEWRITER EFFECT ──
const typewriterEl = document.getElementById('typewriter-text');
if (typewriterEl) {
  const phrases = ['Digital', 'Smart', 'Intelligent', 'Decisive'];
  let phraseIdx = 0, charIdx = 0, isDeleting = false;

  function typewrite() {
    const current = phrases[phraseIdx];
    if (isDeleting) {
      typewriterEl.textContent = current.substring(0, charIdx--);
      if (charIdx < 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(typewrite, 500);
        return;
      }
      setTimeout(typewrite, 40);
    } else {
      typewriterEl.textContent = current.substring(0, charIdx++);
      if (charIdx > current.length) {
        isDeleting = true;
        setTimeout(typewrite, 2500);
        return;
      }
      setTimeout(typewrite, 90);
    }
  }
  setTimeout(typewrite, 1800);
}

// ── SMOOTH PARALLAX ──
window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  const g1 = document.querySelector('.hero-glow-1');
  const g2 = document.querySelector('.hero-glow-2');
  if (g1) g1.style.transform = `translate(0, ${scrollY * 0.12}px)`;
  if (g2) g2.style.transform = `translate(0, ${scrollY * -0.08}px)`;
});

// ── MAGNETIC BUTTONS ──
document.querySelectorAll('.btn-primary, .nav-cta, .dc-actions button').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ── FEATURE CARD TILT ──
document.querySelectorAll('.feature-card, .float-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    card.style.transform = '';
    setTimeout(() => { card.style.transition = ''; }, 400);
  });
});

// ── MOBILE MENU ──
const mobileBtn = document.getElementById('mobile-menu-btn');
if (mobileBtn) {
  mobileBtn.addEventListener('click', () => {
    mobileBtn.classList.toggle('active');
  });
}
