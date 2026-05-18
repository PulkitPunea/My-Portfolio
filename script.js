/* ============================================================
   PULKIT KUMAR PORTFOLIO — script.js
   Shared across index.html + all project pages
   ============================================================ */

/* ── THEME TOGGLE ── */
let currentTheme = "light";
function toggleTheme() {
  currentTheme = currentTheme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
  const btn = document.getElementById("themeBtn");
  if (btn) btn.textContent = currentTheme === "dark" ? "☀️" : "🌙";
}

/* ── TYPEWRITER (index only) ── */
const roles = ["3D Games", "Blueprint Logic", "C++ Plugins", "UE4 Systems", "Game Mechanics"];
let ri = 0, ci = 0, deleting = false;
function typeLoop() {
  const tw = document.getElementById("typewriter");
  if (!tw) return;
  const word = roles[ri];
  if (!deleting) {
    tw.textContent = word.slice(0, ci + 1);
    ci++;
    if (ci === word.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
  } else {
    tw.textContent = word.slice(0, ci - 1);
    ci--;
    if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(typeLoop, deleting ? 60 : 110);
}
if (document.getElementById("typewriter")) typeLoop();

/* ── SKILL BAR ANIMATION (index only) ── */
function animateSkills() {
  document.querySelectorAll(".skill-fill").forEach(el => { el.style.width = el.dataset.w + "%"; });
}
const sg = document.getElementById("skillsGrid");
if (sg) {
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { animateSkills(); obs.disconnect(); }
  }, { threshold: .3 });
  obs.observe(sg);
}

/* ── NAV TAB SCROLL (index only) ── */
function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  document.querySelectorAll(".nav-tab").forEach(t => t.classList.remove("active"));
  event.target.classList.add("active");
}

/* ── PROJECT SEARCH FILTER (index only) ── */
function filterProjects(q) {
  const rows = document.querySelectorAll("#appsGrid .app-row");
  let any = false;
  rows.forEach(r => {
    const match = !q
      || r.dataset.tags.includes(q.toLowerCase())
      || r.querySelector(".app-name").textContent.toLowerCase().includes(q.toLowerCase());
    r.style.display = match ? "" : "none";
    if (match) any = true;
  });
  const nr = document.getElementById("noResults");
  if (nr) nr.style.display = any ? "none" : "block";
}

/* ── APP STORE GET BUTTON (index only) ── */
function handleGet(e, btnId, url) {
  e.stopPropagation();
  const btn = document.getElementById(btnId);
  if (!btn) return;
  if (btn.classList.contains("open")) { window.location.href = url; return; }
  if (btn.classList.contains("loading")) return;
  btn.classList.add("loading");
  setTimeout(() => {
    btn.classList.remove("loading");
    btn.classList.add("open");
    btn.textContent = "OPEN";
  }, 1200);
  setTimeout(() => { window.location.href = url; }, 2500);
}


/* ── SCREENSHOT SCROLL (project pages) ── */
function initScreenshots() {
  const wrap = document.querySelector('.screenshots-wrap');
  const scroll = document.querySelector('.screenshots-scroll');
  if (!wrap || !scroll) return;

  const layout = wrap.getAttribute('data-layout') || 'horizontal';
  if (layout !== 'horizontal') return; // vertical needs no JS

  const slotWidth = () => {
    const slot = scroll.querySelector('.screenshot-slot');
    return slot ? slot.offsetWidth + 12 : 0;
  };

  // arrow buttons
  const leftBtn = wrap.querySelector('.ss-arrow-left');
  const rightBtn = wrap.querySelector('.ss-arrow-right');
  if (leftBtn) leftBtn.addEventListener('click', () => scroll.scrollBy({ left: -slotWidth(), behavior: 'smooth' }));
  if (rightBtn) rightBtn.addEventListener('click', () => scroll.scrollBy({ left: slotWidth(), behavior: 'smooth' }));

  // drag to scroll
  let isDragging = false, startX = 0, startScrollLeft = 0;
  scroll.addEventListener('mousedown', e => { isDragging = true; startX = e.pageX - scroll.offsetLeft; startScrollLeft = scroll.scrollLeft; });
  scroll.addEventListener('mouseleave', () => isDragging = false);
  scroll.addEventListener('mouseup', () => isDragging = false);
  scroll.addEventListener('mousemove', e => {
    if (!isDragging) return;
    e.preventDefault();
    scroll.scrollLeft = startScrollLeft - (e.pageX - scroll.offsetLeft - startX);
  });

  // dot indicators
  const dotsWrap = wrap.nextElementSibling?.classList.contains('ss-dots')
    ? wrap.nextElementSibling
    : document.querySelector('.ss-dots');

  function updateDots() {
    if (!dotsWrap) return;
    const sw = slotWidth();
    const active = sw > 0 ? Math.round(scroll.scrollLeft / sw) : 0;
    dotsWrap.querySelectorAll('.ss-dot').forEach((d, i) => d.classList.toggle('active', i === active));
  }

  function buildDots() {
    if (!dotsWrap) return;
    const count = scroll.querySelectorAll('.screenshot-slot').length;
    dotsWrap.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const d = document.createElement('div');
      d.className = 'ss-dot' + (i === 0 ? ' active' : '');
      const idx = i;
      d.addEventListener('click', () => scroll.scrollTo({ left: slotWidth() * idx, behavior: 'smooth' }));
      dotsWrap.appendChild(d);
    }
  }

  scroll.addEventListener('scroll', updateDots);
  buildDots();
}
document.addEventListener('DOMContentLoaded', initScreenshots);
