# Sudarshan Patil — Portfolio Website

A handcrafted, dependency-free portfolio site for Sudarshan Patil, Digital Marketing Consultant. Built with plain HTML5, CSS3 and vanilla JavaScript — no frameworks, no build step.

## Structure

```
portfolio/
├── index.html            Home — hero, live KPI ticker, services, clients, featured case studies
├── about.html             Story, toolkit, experience timeline, full client roster
├── projects.html          Case study grid + filterable creative gallery + lightbox
├── project-details.html   Single dynamic case-study template, driven by ?client= query param
├── contact.html           Contact details, WhatsApp, resume download, contact form
├── 404.html                Not-found page
├── robots.txt
├── sitemap.xml
├── manifest.json
├── css/
│   ├── variables.css      Design tokens: color, type scale, spacing, motion
│   ├── style.css          Base styles, layout, all components
│   ├── animations.css     Keyframes + scroll-reveal utility classes
│   └── responsive.css     Breakpoints: laptop / tablet / mobile
├── js/
│   ├── main.js            Active nav state, contact form handling, WhatsApp helper, smooth anchor scroll
│   ├── animations.js      Ambient motion: cursor-reactive glow, parallax, 3D tilt
│   ├── gallery.js         Gallery filtering + lightbox
│   ├── cursor.js           Custom targeting cursor (desktop only)
│   ├── counter.js          Animated number counters for KPI blocks
│   └── scroll.js           Scroll-reveal (IntersectionObserver), nav state, progress bar, loader
├── images/                 Optimised JPEGs (profile photo, campaign creatives, proof screenshots)
├── assets/                 Sudarshan-Patil-Resume.pdf
├── icons/                  (reserved for favicon/app icon variants)
└── fonts/                  (reserved — currently loading Space Grotesk & Inter from Google Fonts)
```

## How case studies work

`project-details.html` is a single template. All six case studies (Shro Systems, Stack Link, Superior Digital, Shavo Technologies, Highway Trotters, Hampi Green Hills) live in a `CASE_STUDIES` object at the bottom of the file and are rendered client-side based on the `client` URL parameter, e.g.:

```
project-details.html?client=stack-link
```

To add a new case study, add a new key to `CASE_STUDIES` with the same shape (name, tag, industry, metrics, overview, challenge, solution, tools, platforms, outcome, gallery) and link to it from `projects.html`.

## Design system

- **Palette:** deep navy `#0B0F19` / `#111827` base, blue `#2563EB` → purple `#7C3AED` → cyan `#22D3EE` signal gradient used for the one recurring "signature" element (the live KPI ticker) and accent text.
- **Type:** Space Grotesk for display/headings, Inter for body copy.
- **Signature element:** the scrolling KPI ticker under the hero — a nod to the ad-platform dashboards (Meta Ads Manager, Looker Studio) this work actually lives in.
- **Motion:** IntersectionObserver-based scroll reveal, animated counters, a lightweight custom cursor, subtle parallax — all respecting `prefers-reduced-motion`.

## Editing content

- **Resume:** replace `assets/Sudarshan-Patil-Resume.pdf` to update the downloadable resume.
- **Contact form:** `contact.html`'s form currently runs a front-end-only success/validation flow (see `main.js`). Wire the `#contact-form` submit handler to a real backend, form service (e.g. Formspree), or serverless function to receive real submissions.
- **Domain:** replace `https://sudarshanpatil.com/` in canonical tags, Open Graph tags, `sitemap.xml` and `robots.txt` once a real domain is live.

## Performance & accessibility notes

- Images are pre-compressed JPEGs with explicit `width`/`height` to prevent layout shift, and `loading="lazy"` on below-the-fold images.
- All interactive elements are keyboard-reachable with a visible focus style (`:focus-visible`).
- Motion is disabled site-wide for users with `prefers-reduced-motion: reduce`.
- No external JS frameworks are loaded — only Google Fonts (Space Grotesk, Inter) over a `preconnect`.

## Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari — last 2 versions). Uses `IntersectionObserver`, CSS custom properties, `backdrop-filter`, and `aspect-ratio`, all of which are broadly supported as of 2026.
