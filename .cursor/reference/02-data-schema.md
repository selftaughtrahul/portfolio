# PORTFOLIO_DATA schema (agent reference)

Source of truth: `data/portfolio-data.js` — `const PORTFOLIO_DATA = { ... }`.

Edit this file for almost all content. Do not invent new top-level keys without wiring them in `js/main.js` / HTML IDs.

## Top-level keys

`meta` · `navbar` · `hero` · `socialLinks` · `about` · `skills` · `certifications` · `projects` · `experience` · `contact` · `footer`

## meta

`title`, `description`, `keywords`, `author` → document title and meta tags on home.

## navbar

- `brand` (string) — wrapped in `< ... />` in JS
- `links[]`: `{ label, href }` — home uses hash links (`#about`, etc.)

## hero

- `greeting`, `name`, `typingPrefix`, `typingTexts[]`, `description`
- `buttons[]`: `{ label, href, icon, class }` — Bootstrap Icons class without extra `bi` prefix in data (JS adds `bi `)
- `profileImage`, `profileAlt`
- `codeWindow`: `{ filename, name, role, skills[] }` — rendered as fake Python in hero

## socialLinks

`github`, `linkedin`, `email` — used on hero, footer, contact form mailto.

## about

- `sectionTitle`, `subtitle`
- `stats[]`: `{ icon, count, label }` — `count` animates to `N+`
- `paragraphs[]`, `highlights[]`
- `resumeLink` — also duplicated on `#resumeBtn` in `index.html`

## skills

- `sectionTitle`, `sectionSubtitle`
- `categories[]`: `{ icon, title, tags[] }` — four cards
- `progressBars[]`: `{ label, percent }` — split into two columns in JS

## certifications.items[]

`{ icon, title, issuer, date, credentialId, image, link }`

If `link` is set, the whole card is wrapped in `<a target="_blank">`. If `image` is empty, icon is shown.

**Known data bug:** item “Math and Statistics For AI, Data Science” uses credentialId `CB-63-517401` but `link` points at `CB-69-517401` (same URL as the ML cert).

## projects

- `filters[]`: `{ label, value }` — `value` must **exactly** match `item.category` (or `"all"`)
- Current filter values: `all`, `NLP`, `AI / Generative AI`, `Machine Learning`, `Deep Learning`
- Home filter row has no “Backend / Cloud” even if those categories exist in `getCategoryIcon`

### projects.items[] (required for cards + detail)

| Field | Used on |
|--------|---------|
| `id` | URL `project.html?id=` — unique kebab-case |
| `title`, `shortDescription` | Card + detail header |
| `fullDescription` | Detail “About” |
| `architecture` | Detail architecture paragraph |
| `techStack[]` | Card shows first 4 + overflow; detail lists all |
| `category` | Filter + badge + placeholder icon map |
| `image` | Detail hero; if missing or path contains `placeholder`, gradient placeholder |
| `screenshots[]` | Card slideshow (3s) + detail gallery; empty → category icon on card |
| `githubLink` | GitHub + `.../archive/refs/heads/main.zip` download |
| `liveLink`, `videoLink` | Shown only if truthy |
| `featured` | Present in data; **not read by JS** |

### Current project ids

- `ai-customer-support-chatbot`
- `sentiment-analysis-system`
- `qa-bot-rag`
- `fake-news-detection`
- `spam-fraud-detection`
- `resume-parser-job-matcher` (placeholder image, no screenshots)
- `multi-agent-customer-support`

Screenshot paths follow `images/projects/<id>/...`.

`getCategoryIcon` (duplicated in `main.js` and `project-detail.js`):

- `AI / Generative AI` → robot
- `NLP` → chat-dots
- `Machine Learning` → cpu
- `Deep Learning` → gpu-card
- `Backend Development` → server
- `Cloud & DevOps` → cloud
- default → code-slash

## experience.items[]

`{ title, company, date, description, techBadges[], achievements[] }`

Timeline year badge is first `\d{4}` in `date`. Even/odd items alternate AOS direction.

## contact

- `sectionTitle`, `sectionSubtitle`, `infoTitle`, `infoText`
- `details[]`: `{ icon, label, value, href?, external? }`
- Form fields are **not** in data (hardcoded in `index.html`)

## footer

`copyright` string only (home). Detail page copyright is hardcoded in `project.html`.
