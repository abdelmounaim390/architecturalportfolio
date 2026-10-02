/* Dedicated case-study renderer */
(() => {
  'use strict';

  const projects = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];
  if (!projects.length) return;

  const params = new URLSearchParams(window.location.search);
  const requestedId = params.get('project');
  const project = projects.find((item) => item.id === requestedId) || projects[0];
  if (!project) return;

  const escapeHtml = (value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const atWidth = (url, width) => url.replace(/([?&])w=\d+/, `$1w=${width}`);
  const responsiveSources = (url) => {
    if (!/[?&]w=\d+/.test(url)) return '';
    return [800, 1400, 2000].map((width) => `${atWidth(url, width)} ${width}w`).join(', ');
  };

  const setText = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  };

  document.title = `${project.title} — Abdelmounaim Chekroun`;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute('content', `${project.title} — ${project.type} architectural visualization case study by Abdelmounaim Chekroun.`);

  setText('caseIndex', `Project / ${project.num}`);
  setText('caseTitle', project.title);
  setText('caseType', project.type);
  setText('caseLocation', project.location);
  setText('caseProjectType', project.type);
  setText('caseScope', project.scope || 'Architectural visualization');
  setText('caseYear', project.year);
  setText('caseText', project.text);
  setText('caseConcept', project.concept);
  setText('caseObjective', project.objective);
  setText('caseHeroCaption', `${project.title} / Selected view 01`);

  const heroImage = document.getElementById('caseHeroImage');
  if (heroImage) {
    heroImage.src = project.image;
    heroImage.alt = `${project.title} — ${project.type} architectural visualization`;
  }

  const services = document.getElementById('caseServices');
  if (services) {
    services.innerHTML = (project.services || []).map((service) => `<span>${escapeHtml(service)}</span>`).join('');
  }

  const software = document.getElementById('caseSoftware');
  if (software) {
    software.innerHTML = (project.software || []).map((tool) => `<span>${escapeHtml(tool)}</span>`).join('');
  }

  const gallery = document.getElementById('caseGallery');
  if (gallery) {
    const frames = project.gallery?.length ? project.gallery : [project.image];
    gallery.innerHTML = frames.map((image, index) => {
      const sources = escapeHtml(responsiveSources(image));
      const sourceAttributes = sources ? ` srcset="${sources}" sizes="(max-width: 640px) calc(100vw - 2.3rem), (max-width: 980px) 50vw, 58vw"` : '';
      return `
      <figure class="case-gallery-item case-gallery-item-${index + 1} reveal">
        <img src="${escapeHtml(image)}"${sourceAttributes} alt="${escapeHtml(project.title)} — frame ${String(index + 1).padStart(2, '0')}" loading="lazy" decoding="async" />
        <figcaption><span>Frame ${String(index + 1).padStart(2, '0')}</span><span>${escapeHtml(project.type)}</span></figcaption>
      </figure>`;
    }).join('');
  }

  const animationFrame = document.getElementById('animationFrame');
  const caseVideo = document.getElementById('caseVideo');
  const animationPlay = document.getElementById('animationPlay');
  const animationLabel = document.getElementById('animationLabel');
  const animationDuration = document.getElementById('animationDuration');
  const animationDescription = document.getElementById('animationDescription');

  if (animationFrame) {
    animationFrame.style.backgroundImage = `url("${project.gallery?.[0] || project.image}")`;

    if (project.video && caseVideo) {
      animationFrame.classList.add('has-video');
      caseVideo.src = project.video;
      caseVideo.poster = project.poster || project.gallery?.[0] || project.image;
      if (animationPlay) {
        animationPlay.disabled = false;
        animationPlay.setAttribute('aria-hidden', 'false');
        animationPlay.setAttribute('aria-label', 'Play project animation');
        animationPlay.addEventListener('click', () => {
          if (caseVideo.paused) {
            const playRequest = caseVideo.play();
            if (playRequest) playRequest.catch(() => {});
          } else caseVideo.pause();
        });
      }
      if (animationLabel) animationLabel.textContent = 'Project animation';
      if (animationDuration) animationDuration.textContent = 'Play film';
      if (animationDescription) animationDescription.textContent = 'Move through the project with the supplied architectural animation, from the first approach to the final atmosphere.';

      const formatDuration = (seconds) => {
        if (!Number.isFinite(seconds)) return 'Play film';
        const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
        const remainder = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${minutes}:${remainder}`;
      };
      caseVideo.addEventListener('loadedmetadata', () => {
        if (animationDuration) animationDuration.textContent = formatDuration(caseVideo.duration);
      });
      const syncPlayButton = () => {
        if (!animationPlay) return;
        const playing = !caseVideo.paused;
        animationPlay.textContent = playing ? 'Ⅱ' : '▶';
        animationPlay.setAttribute('aria-label', playing ? 'Pause project animation' : 'Play project animation');
      };
      caseVideo.addEventListener('play', syncPlayButton);
      caseVideo.addEventListener('pause', syncPlayButton);
      syncPlayButton();
    } else {
      if (animationPlay) {
        animationPlay.disabled = true;
        animationPlay.setAttribute('aria-hidden', 'true');
        animationPlay.setAttribute('aria-label', 'Animation placeholder');
      }
      if (animationLabel) animationLabel.textContent = 'Animation placeholder';
      if (animationDuration) animationDuration.textContent = 'Add film';
      if (animationDescription) animationDescription.textContent = 'Camera movement, atmosphere, and pace turn a sequence of frames into a story. Add a project film to bring this section to life.';
    }
  }
})();
