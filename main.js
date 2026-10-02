/* 3D Architectural Visualizer — site interactions */
(() => {
  'use strict';

  /* ---------- Scroll progress ---------- */
  const progressBar = document.getElementById('progressBar');
  const updateProgress = () => {
    if (!progressBar) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
  };

  /* ---------- Header state ---------- */
  const header = document.getElementById('siteHeader');
  const updateHeader = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 40);
  };

  const onScroll = () => {
    updateHeader();
    updateProgress();
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });

  /* ---------- Mobile menu ---------- */
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.getElementById('mobileMenu');

  const setMenu = (open) => {
    document.body.classList.toggle('menu-open', open);
    if (mobileMenu) mobileMenu.setAttribute('aria-hidden', String(!open));
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
  };

  menuToggle?.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  window.addEventListener('resize', () => {
    if (window.innerWidth > 960) setMenu(false);
  });

  /* ---------- Reveal on scroll ---------- */
  const reveals = [...document.querySelectorAll('.reveal')];

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px' });

    reveals.forEach((el) => observer.observe(el));

    window.addEventListener('load', () => {
      reveals.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-visible');
      });
    });
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Active nav link ---------- */
  const navLinks = [...document.querySelectorAll('.nav-desktop a')];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* ---------- Portfolio filter ---------- */
  const gallery = document.getElementById('gallery');
  const filterButtons = [...document.querySelectorAll('.filter-btn')];
  const items = [...document.querySelectorAll('.gallery-item')];
  const emptyState = document.getElementById('galleryEmpty');
  let activeFilter = 'all';

  const visibleItems = () => items.filter((item) => !item.classList.contains('is-hidden'));

  const applyLayout = () => {
    if (!gallery) return;
    const visible = visibleItems();
    const focus = activeFilter !== 'all' && visible.length === 1;
    const uniform = activeFilter !== 'all' && visible.length > 1;
    gallery.classList.toggle('is-focus', focus);
    gallery.classList.toggle('is-uniform', uniform);
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter || 'all';
      filterButtons.forEach((b) => b.classList.toggle('is-active', b === button));

      let count = 0;
      items.forEach((item) => {
        const match = activeFilter === 'all' || item.dataset.category === activeFilter;
        item.classList.toggle('is-hidden', !match);
        if (match) {
          count += 1;
          item.classList.add('is-visible');
        }
      });

      applyLayout();
      if (emptyState) emptyState.hidden = count > 0;
    });
  });

  /* ---------- Lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const stage = document.getElementById('lightboxStage');
  const caption = document.getElementById('lightboxCaption');
  const countLabel = document.getElementById('lightboxCount');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  const entries = items.map((item) => {
    const img = item.querySelector('img');
    const captionSpans = item.querySelectorAll('figcaption span');
    return {
      item,
      src: img ? img.src : '',
      alt: img ? img.alt : '',
      video: item.querySelector('.gallery-open')?.dataset.video || '',
      title: captionSpans[0] ? captionSpans[0].textContent : '',
      category: captionSpans[1] ? captionSpans[1].textContent : ''
    };
  });

  let current = 0;
  let lastFocused = null;

  const render = (index) => {
    const visible = visibleItems();
    const visibleIndices = entries
      .map((entry, i) => (visible.includes(entry.item) ? i : -1))
      .filter((i) => i >= 0);

    if (!visibleIndices.length) return;

    // Wrap around within the filtered set.
    let position = visibleIndices.indexOf(index);
    if (position === -1) position = 0;
    const safeIndex = visibleIndices[position];
    current = safeIndex;

    const entry = entries[safeIndex];
    stage.innerHTML = '';

    if (entry.video) {
      const video = document.createElement('video');
      video.src = entry.video;
      video.poster = entry.src;
      video.controls = true;
      video.playsInline = true;
      video.autoplay = true;
      video.setAttribute('aria-label', entry.alt);
      stage.appendChild(video);
      video.play().catch(() => {});
    } else {
      const img = document.createElement('img');
      img.alt = entry.alt;
      // Reveal only once fully decoded so a large render never appears as a partial band.
      const reveal = () => img.classList.add('is-ready');
      img.addEventListener('load', reveal);
      img.addEventListener('error', reveal);
      img.src = entry.src;
      stage.appendChild(img);
      if (img.complete) reveal();
      else img.decode?.().then(reveal).catch(() => {});
    }

    caption.innerHTML = `<b>${entry.title}</b><i>${entry.category}</i>`;
    countLabel.textContent = `${String(position + 1).padStart(2, '0')} / ${String(visibleIndices.length).padStart(2, '0')}`;
  };

  const openLightbox = (index) => {
    if (!lightbox) return;
    lastFocused = document.activeElement;
    render(index);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    closeBtn?.focus();
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    if (stage) stage.innerHTML = '';
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  };

  const step = (direction) => {
    const visible = visibleItems();
    const visibleIndices = entries
      .map((entry, i) => (visible.includes(entry.item) ? i : -1))
      .filter((i) => i >= 0);
    if (!visibleIndices.length) return;
    const position = visibleIndices.indexOf(current);
    const next = (position + direction + visibleIndices.length) % visibleIndices.length;
    render(visibleIndices[next]);
  };

  items.forEach((item, index) => {
    item.querySelector('.gallery-open')?.addEventListener('click', () => openLightbox(index));
  });

  closeBtn?.addEventListener('click', closeLightbox);
  prevBtn?.addEventListener('click', () => step(-1));
  nextBtn?.addEventListener('click', () => step(1));

  lightbox?.addEventListener('click', (event) => {
    if (event.target === lightbox || event.target.classList.contains('lightbox-stage')) closeLightbox();
  });

  window.addEventListener('keydown', (event) => {
    if (document.body.classList.contains('menu-open') && event.key === 'Escape') {
      setMenu(false);
      return;
    }
    if (!lightbox?.classList.contains('is-open')) return;

    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') step(-1);
    if (event.key === 'ArrowRight') step(1);
    if (event.key === 'Tab') {
      const focusables = [closeBtn, prevBtn, nextBtn].filter(Boolean);
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  /* ---------- Contact form ---------- */
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  const setError = (field, hasError) => {
    field.closest('.field')?.classList.toggle('has-error', hasError);
  };

  form?.querySelectorAll('input, textarea').forEach((input) => {
    input.addEventListener('input', () => setError(input, false));
  });

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!formStatus) return;

    let firstInvalid = null;
    form.querySelectorAll('[required]').forEach((input) => {
      const invalid = !input.checkValidity();
      setError(input, invalid);
      if (invalid && !firstInvalid) firstInvalid = input;
    });

    if (firstInvalid) {
      formStatus.textContent = 'Please fill in your name, a valid email and the project details.';
      formStatus.classList.add('is-error');
      firstInvalid.focus();
      return;
    }

    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();

    const subject = `Project inquiry — ${name}`;
    const body = [`Name: ${name}`, `Email: ${email}`, '', 'Project details:', message].join('\n');
    const mailto = `mailto:abdelmounaimchekroun@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    formStatus.classList.remove('is-error');
    formStatus.textContent = 'Opening your email app with the project details…';
    window.location.href = mailto;
  });

  /* ---------- Current year ---------- */
  const year = document.getElementById('currentYear');
  if (year) year.textContent = String(new Date().getFullYear());
})();
