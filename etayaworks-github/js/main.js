/* ── ETAYAWORKS — MAIN JS ── */

/* ─────────────────────────────────────────
   ADMIN DATA INJECTOR
   Reads content saved in admin panel and
   applies it to every element on the page.
───────────────────────────────────────── */
(function applyAdminData() {

  function load(key) {
    // Prefer baked-in data (from export), then localStorage
    if (window.__EW_BAKED__) return window.__EW_BAKED__[key] || null;
    try { return JSON.parse(localStorage.getItem('ew_' + key)); } catch { return null; }
  }

  /* ── BRANDING ── */
  const br = load('branding');
  if (br) {
    document.querySelectorAll('.logo-mark').forEach(el => el.textContent = br.logoMark || el.textContent);
    document.querySelectorAll('.logo-text').forEach(el => el.textContent = br.logoText  || el.textContent);
    if (br.tagline) {
      document.querySelectorAll('.hero-eyebrow').forEach(el => el.textContent = br.tagline);
    }
    if (br.footerTagline) {
      const fp = document.querySelector('.footer-brand p');
      if (fp) fp.textContent = br.footerTagline;
    }
    if (br.accentColor) {
      const style = document.createElement('style');
      style.textContent = `
        :root { --accent: ${br.accentColor}; }
        .btn-primary, .nav-cta, .save-all-btn { background: ${br.accentColor} !important; }
        .logo-mark { background: ${br.accentColor} !important; }
        .accent-line, .section-eyebrow, .pillar-icon, .service-num,
        .step-dot span, .t-author strong, .footer-bottom { color: ${br.accentColor} !important; }
        .hero-scroll-hint .scroll-line { background: ${br.accentColor} !important; }
        .filter-btn.active, .back-top { background: ${br.accentColor} !important; color:#000 !important; }
        .whatsapp-btn { background: ${br.accentColor} !important; color:#000 !important; }
      `;
      document.head.appendChild(style);
    }
  }

  /* ── COMPANY ── */
  const co = load('company');
  if (co) {
    // Phone links
    if (co.phone) {
      document.querySelectorAll('a[href^="tel:"]').forEach(el => {
        el.textContent = co.phone;
        el.href = 'tel:+' + co.phone.replace(/\D/g,'');
      });
    }
    // Email links
    if (co.email) {
      document.querySelectorAll('a[href^="mailto:"]').forEach(el => {
        el.textContent = co.email;
        el.href = 'mailto:' + co.email;
      });
    }
    // WhatsApp links
    if (co.whatsapp) {
      document.querySelectorAll('a[href*="wa.me/"]').forEach(el => {
        el.href = 'https://wa.me/' + co.whatsapp.replace(/\D/g,'');
      });
    }
    // Address
    if (co.address) {
      document.querySelectorAll('.contact-item span, .footer-contact p:not(a)').forEach(el => {
        if (el.textContent.trim().toLowerCase().includes('nairobi') ||
            el.textContent.trim().toLowerCase().includes('kenya')) {
          el.textContent = co.address;
        }
      });
    }
    // Hours
    if (co.hours) {
      document.querySelectorAll('.contact-item').forEach(item => {
        if (item.querySelector('strong')?.textContent?.includes('Hours')) {
          const span = item.querySelector('span');
          if (span) span.textContent = co.hours;
        }
      });
    }
    // Social links
    const socials = [
      { sel: 'a[aria-label="Facebook"]',  val: co.facebook },
      { sel: 'a[aria-label="Instagram"]', val: co.instagram },
      { sel: 'a[aria-label="LinkedIn"]',  val: co.linkedin }
    ];
    socials.forEach(({ sel, val }) => {
      if (val) document.querySelectorAll(sel).forEach(el => { el.href = val; });
    });
    // Map
    if (co.mapUrl) {
      const mapIframe = document.querySelector('.map-section iframe');
      if (mapIframe) mapIframe.src = co.mapUrl;
    }
  }

  /* ── HERO ── */
  const hero = load('hero');
  if (hero) {
    const lines = document.querySelectorAll('.hero-title .line');
    if (lines[0] && hero.line1) lines[0].textContent = hero.line1;
    if (lines[1] && hero.line2) lines[1].textContent = hero.line2;
    const sub = document.querySelector('.hero-sub');
    if (sub && hero.sub) sub.textContent = hero.sub;

    // Stats
    const stats = document.querySelectorAll('.hero-stats .stat');
    if (hero.stats) {
      hero.stats.forEach((s, i) => {
        if (stats[i]) {
          stats[i].querySelector('strong').textContent = s.value;
          stats[i].querySelector('span').textContent   = s.label;
        }
      });
    }

    // Marquee
    if (hero.marquee) {
      const items = hero.marquee.split(',').map(s => s.trim()).filter(Boolean);
      const track = document.querySelector('.marquee-track');
      if (track && items.length) {
        const doubled = [...items, ...items];
        track.innerHTML = doubled.map((t, i) =>
          `<span>${t}</span>${i < doubled.length - 1 ? '<span class="dot">◆</span>' : ''}`
        ).join('');
      }
    }
  }

  /* ── TEAM ── */
  const team = load('team');
  if (team && team.length) {
    const grid = document.querySelector('.team-grid');
    if (grid) {
      grid.innerHTML = team.map((m, i) => `
        <div class="team-card reveal${i === 1 ? ' delay-1' : i === 2 ? ' delay-2' : ''}">
          <div class="team-img-wrap">
            <img src="${m.photo}" alt="${m.name}"/>
          </div>
          <div class="team-info">
            <h3>${m.name}</h3>
            <span>${m.role}</span>
            <p>${m.bio}</p>
          </div>
        </div>
      `).join('');
    }
  }

  /* ── ABOUT ── */
  const ab = load('about');
  if (ab) {
    const aboutCopy = document.querySelector('.about-copy');
    if (aboutCopy) {
      if (ab.heading) {
        const h = aboutCopy.querySelector('.section-title');
        if (h) h.textContent = ab.heading;
      }
      const paras = aboutCopy.querySelectorAll('p.reveal:not(.section-eyebrow)');
      if (paras[0] && ab.para1) paras[0].textContent = ab.para1;
      if (paras[1] && ab.para2) paras[1].textContent = ab.para2;
      const vision = aboutCopy.querySelector('.vision-text');
      if (vision && ab.vision) vision.textContent = ab.vision;
    }
    // About images
    const imgs = document.querySelectorAll('.about-img');
    if (imgs[0] && ab.img1) imgs[0].src = ab.img1;
    if (imgs[1] && ab.img2) imgs[1].src = ab.img2;
    // Years badge
    if (ab.years) {
      const badge = document.querySelector('.about-badge strong');
      if (badge) badge.textContent = ab.years;
    }
    // Pillars
    if (ab.pillars) {
      const pillars = document.querySelectorAll('.pillar');
      ab.pillars.forEach((p, i) => {
        if (pillars[i]) {
          pillars[i].querySelector('.pillar-icon').textContent = p.icon;
          pillars[i].querySelector('strong').textContent = p.title;
          pillars[i].querySelector('p').textContent = p.text;
        }
      });
    }
  }

  /* ── CONTACT SECTION ── */
  const ct = load('contact');
  if (ct) {
    if (ct.heading) {
      const h = document.querySelector('.contact-info .section-title');
      if (h) h.textContent = ct.heading;
    }
    if (ct.subtext) {
      const p = document.querySelector('.contact-info > p.reveal');
      if (p) p.textContent = ct.subtext;
    }
    if (ct.formspree) {
      const form = document.getElementById('contactForm');
      if (form) form.action = ct.formspree;
    }
  }

  /* ── ADMIN LINK in footer ── */
  const footerBottom = document.querySelector('.footer-bottom p');
  if (footerBottom && !document.getElementById('adminLink')) {
    footerBottom.innerHTML += ' · <a id="adminLink" href="admin.html" style="color:var(--gold);text-decoration:none;opacity:0.6;font-size:0.75em;">Admin</a>';
  }

})();

/* ─────────────────────────────────────────
   PAGE INTERACTIVITY
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  /* ── NAV SCROLL ── */
  const navbar = document.getElementById('navbar');
  const backTop = document.getElementById('backTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
      backTop.classList.add('visible');
    } else {
      navbar.classList.remove('scrolled');
      backTop.classList.remove('visible');
    }
  });

  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── MOBILE MENU ── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  /* ── REVEAL ON SCROLL ── */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => revealObserver.observe(el));

  /* ── PROJECT FILTER ── */
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ── CONTACT FORM — Formspree ── */
  const form        = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const formError   = document.getElementById('formError');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Sending…';
      btn.disabled = true;
      if (formError) formError.style.display = 'none';

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          form.reset();
          if (formSuccess) {
            formSuccess.style.display = 'block';
            setTimeout(() => { formSuccess.style.display = 'none'; }, 6000);
          }
        } else { throw new Error(); }
      } catch {
        if (formError) formError.style.display = 'block';
      } finally {
        btn.textContent = 'Send Message';
        btn.disabled = false;
      }
    });
  }

  /* ── ACTIVE NAV LINK ON SCROLL ── */
  const sections = document.querySelectorAll('section[id]');
  const navItems  = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(a => {
          a.style.color = '';
          if (a.getAttribute('href') === `#${id}` && !a.classList.contains('nav-cta')) {
            a.style.color = '#E8A020';
          }
        });
      }
    });
  }, { threshold: 0.35, rootMargin: '-80px 0px 0px 0px' });

  sections.forEach(s => sectionObserver.observe(s));

  /* ── HERO ANIMATION ── */
  const heroLines = document.querySelectorAll('.hero-title .line');
  heroLines.forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transform = 'translateY(40px)';
    line.style.transition = `opacity 0.8s ease ${i * 0.18}s, transform 0.8s ease ${i * 0.18}s`;
    setTimeout(() => {
      line.style.opacity = '1';
      line.style.transform = 'translateY(0)';
    }, 200);
  });

  const heroParts = document.querySelectorAll('.hero-eyebrow, .hero-sub, .hero-actions');
  heroParts.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.7s ease ${0.5 + i * 0.15}s, transform 0.7s ease ${0.5 + i * 0.15}s`;
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 200);
  });

});
