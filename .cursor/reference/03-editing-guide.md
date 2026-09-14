# Editing guide (agent reference)

Prefer changing existing files. Content first: `data/portfolio-data.js`. Markup IDs in `index.html` / `project.html` must stay in sync with `js/main.js` / `js/project-detail.js`.

## How to add a project

1. Add screenshots under `images/projects/<id>/`.
2. Append an object to `PORTFOLIO_DATA.projects.items` with a unique `id`.
3. Set `category` to an existing filter `value`, or add a matching `{ label, value }` to `projects.filters`.
4. Optional: extend `getCategoryIcon` in **both** JS files if you add a new category string.
5. No HTML change needed; cards and `project.html?id=` are data-driven.

## How to change copy / SEO / social

- Home title/meta: `meta`
- Nav labels: `navbar.links`
- Hero typing loop: `hero.typingTexts`
- Resume PDF: replace `data/Rahul_Python_AI_ML.pdf` and keep `about.resumeLink` (and the `href` on `#resumeBtn` in `index.html`) the same
- Social: `socialLinks` (home). Also update hardcoded GitHub/LinkedIn/email in `project.html` footer if they change

## Styling

- Tokens live in `:root` at top of `css/style.css`
- Section order in CSS: navbar, hero, common, about, skills, projects, certs, experience, contact, footer, project detail, responsive, animations
- Custom buttons: `.btn-primary-custom`, `.btn-outline-custom`, `.btn-success-custom`, `.btn-video-custom`
- Cards: `.project-card`, `.cert-card`, `.skill-category-card`, `.timeline-*`
- Do not introduce a CSS preprocessor unless the user asks

## JS conventions already in the repo

- Global functions, no ES modules, no TypeScript
- Render via `innerHTML` / `createElement`; no sanitization (trusted static data only)
- Project card click uses inline `openProject('id')`
- Slideshow: 3000ms, pause on card hover, dots stopPropagation
- Contact: `preventDefault` then `mailto:email?subject=&body=`
- AOS: `once: true`, duration 800

## HTML ID checklist (home)

Navbar: `mainNav`, `navBrand`, `navLinks`  
Hero: `home`, `particles`, `heroGreeting`, `heroName`, `heroTypingPrefix`, `typingText`, `heroDescription`, `heroButtons`, `heroSocials`, `heroProfilePic`, `codeWindow`  
About: `aboutTitle`, `aboutStats`, `aboutSubtitle`, `aboutParagraphs`, `aboutHighlights`, `resumeBtn`  
Skills: `skillsTitle`, `skillsSubtitle`, `skillCategories`, `skillProgressBars`  
Certs: `certsTitle`, `certsSubtitle`, `certsGrid`  
Projects: `projectsTitle`, `projectsSubtitle`, `projectFilters`, `projectsGrid`  
Experience: `expTitle`, `experienceTimeline`  
Contact: `contactTitle`, `contactSubtitle`, `contactInfoCard`, `contactForm`, `name`, `email`, `subject`, `message`, `formStatus`  
Footer: `footerBrand`, `footerCopyright`, `footerSocials`, `backToTop`

Detail: `projectLoading`, `projectContent`, `projectNotFound`, `breadcrumbTitle`, `projectCategory`, `projectTitle`, `projectShort`, `githubBtn`, `liveBtn`, `downloadBtn`, `videoBtn`, `projectImage`, `projectDescription`, `projectArchitecture`, `screenshotsSection`, `screenshotsGrid`, `projectTechStack`, `sideGithub`, `sideLive`, `sideVideo`

## When changing UI behavior

If you change how state is written (filters, nav active, form), check:

- Home: all hash sections, mobile nav collapse, project filter + slideshow, contact submit
- Detail: valid id, missing id, unknown id, project with/without github/live/video/screenshots/placeholder image
- Desktop and a narrow viewport (CSS has a responsive block ~line 1373)

There is no in-repo test suite. Verify in the browser.

## Known inconsistencies (do not “fix” unless asked)

- `featured` on projects is unused
- Math cert link likely wrong (see data schema)
- `project.html` brand, back button, footer year/socials are hardcoded vs data-driven home
- Resume href duplicated: HTML default + JS overwrite from `about.resumeLink`
- `getCategoryIcon` duplicated in two JS files
- Index meta tags start empty and are filled at runtime (bad for crawlers that do not run JS)
- Git status often shows binary PDF changes independently of HTML/JS
