# Portfolio — Project Overview (agent reference)

Static personal site for **Rahul Chauhan** (Lucknow). No bundler, no backend, no `package.json`. Open `index.html` in a browser or any static host.

## Stack

- HTML5 + Bootstrap 5.3.3 (CDN) + Bootstrap Icons 1.11.3
- Vanilla JS (no modules; scripts are classic globals)
- Custom CSS in `css/style.css` (CSS variables, dark purple theme)
- AOS 2.3.4 for scroll animation
- Google Fonts: Inter + JetBrains Mono
- Content: one global object `PORTFOLIO_DATA` in `data/portfolio-data.js`

## Pages

| File | Role |
|------|------|
| `index.html` | Single-page home: empty shells with IDs; JS fills them |
| `project.html` | Project detail; reads `?id=` against `PORTFOLIO_DATA.projects.items` |

Scripts on home: `portfolio-data.js` then `js/main.js`.  
Scripts on detail: `portfolio-data.js` then `js/project-detail.js`.

## File map

```
index.html                 Home markup (section IDs: home, about, skills, certifications, projects, experience, contact)
project.html               Detail markup + loading / not-found states
css/style.css              All styles (~1550 lines)
js/main.js                 Render every home section + typing, particles, filters, mailto form
js/project-detail.js       Lookup project by id, fill detail, GitHub zip download URL
data/portfolio-data.js     ALL copy, links, projects, experience, certs
data/Rahul_Python_AI_ML.pdf  Resume (about button + hardcoded href in index.html)
images/profile.jpg         Hero photo (referenced; may be local-only)
images/project-placeholder.svg
images/projects/<project-id>/  Screenshots referenced in data
```

## Data → UI flow

1. `DOMContentLoaded` assigns `PORTFOLIO_DATA` to `portfolioData`.
2. `initSite()` sets `<title>` + meta, then `render*` for each section, then behavior inits (AOS, navbar scroll, typing, particles, back-to-top, counters, contact form, smooth scroll).
3. Project cards: `onclick="openProject(id)"` → `project.html?id=<id>`.
4. Detail page: `URLSearchParams` `id` → `find` on `projects.items` → `renderProjectDetail` or not-found.

## Branding / theme

- Accent: `#6c63ff`. Backgrounds: `#0a0a1e` / `#0f0f2e` / cards `#161640`.
- Brand markup: `<Rahul Chauhan />` with `.brand-accent` on the angle brackets.
- Navbar becomes `.scrolled` after 50px scroll.

## What is NOT in this repo

- No Node, Python server, tests, or CI
- Contact form is `mailto:` only (`js/main.js` `initContactForm`)
- `project.html` navbar/footer are **hardcoded**, not driven by `PORTFOLIO_DATA`
- `.gitignore` currently only ignores `.claude/`
