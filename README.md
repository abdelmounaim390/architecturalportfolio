# 3D Architectural Visualizer — Portfolio Site

A one-page portfolio site for a freelance 3D Architectural Visualizer. Minimal black-and-white design, image-led, fully responsive. Static HTML/CSS/JS with no build step and no dependencies.

Open `index.html` directly, or serve the folder with any static server (`npx serve .`).

## Sections

| Section | Contents |
| --- | --- |
| Hero | Full-screen render, title, subtitle, short intro, `CONTACT ME` + `VIEW WORK` buttons, meta bar |
| Marquee | Scrolling strip of services |
| Services | Three image-led cards: Architectural Rendering, Interior Visualization, 3D Architectural Animation |
| Portfolio | Filterable gallery (All / Exterior / Interior / Animation) with hover states and a full-screen lightbox viewer — prev/next, keyboard navigation, video playback for the animation project |
| About | Short introduction, portrait image, tool tags |
| Contact | `HAVE A PROJECT?` block, email / WhatsApp / Instagram, and a validated inquiry form |
| Footer | Brand, menu, contact links, copyright |

Navigation: **Home | Services | Portfolio | Contact** (full-screen menu on mobile).

No fake testimonials, awards, statistics or client names.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | All page content, gallery markup, lightbox and form structure |
| `style.css` | Design tokens, layout, components, responsive rules, reduced-motion support |
| `main.js` | Scroll progress, header state, mobile menu, scroll reveals, portfolio filter, lightbox, form validation, active nav |
| `images/projects/` | Renders (`.jpg`) and the animation (`.mp4` + poster) |

## Editing

- **Text & contact details** — everything is in `index.html`. Search for `mailto:` and `wa.me/` to update the contact links.
- **Add a project** — copy a `<figure class="gallery-item …">` block. Set `data-category` to `exterior`, `interior` or `animation`; add `gallery-item--wide` to span the full row. For video, add `data-video="path/to/file.mp4"` to the inner `<button class="gallery-open">` and use the poster frame as the image.
- **Tools list** — the tag pills in the About section.

## Behaviour & accessibility

- Semantic sections with labelled headings, skip link, visible focus states
- Lightbox: `Esc` to close, arrow keys to navigate, focus is moved in and restored on close
- Form validates required fields, then opens the visitor's email app with the brief pre-filled (connect a real endpoint in `main.js` for server-side delivery)
- `prefers-reduced-motion` disables animations; content is readable without JavaScript
