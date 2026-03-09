/* ===================== MAIN JAVASCRIPT ===================== */

let portfolioData = null;

document.addEventListener('DOMContentLoaded', () => {
    portfolioData = PORTFOLIO_DATA;
    initSite();
});

/* ===================== INIT ALL SECTIONS ===================== */
function initSite() {
    const data = portfolioData;

    // Set meta
    document.title = data.meta.title;
    document.querySelector('meta[name="description"]').content = data.meta.description;
    document.querySelector('meta[name="keywords"]').content = data.meta.keywords;
    document.querySelector('meta[name="author"]').content = data.meta.author;

    renderNavbar(data.navbar);
    renderHero(data.hero, data.socialLinks);
    renderAbout(data.about);
    renderSkills(data.skills);
    renderCertifications(data.certifications);
    renderProjects(data.projects);
    renderExperience(data.experience);
    renderContact(data.contact, data.socialLinks);
    renderFooter(data.navbar.brand, data.footer, data.socialLinks);

    // Init behaviors
    initAOS();
    initNavbar();
    initTypingEffect(data.hero.typingTexts);
    initParticles();
    initBackToTop();
    initCounters();
    initContactForm(data.socialLinks.email);
    initSmoothScroll();
}

/* ===================== RENDER NAVBAR ===================== */
function renderNavbar(navbar) {
    const brand = document.getElementById('navBrand');
    brand.innerHTML = `<span class="brand-accent">&lt;</span>${navbar.brand}<span class="brand-accent"> /&gt;</span>`;

    const navLinks = document.getElementById('navLinks');
    navLinks.innerHTML = navbar.links.map(link =>
        `<li class="nav-item"><a class="nav-link" href="${link.href}">${link.label}</a></li>`
    ).join('');
}

/* ===================== RENDER HERO ===================== */
function renderHero(hero, social) {
    document.getElementById('heroGreeting').textContent = hero.greeting + ' ';
    document.getElementById('heroName').textContent = hero.name;
    document.getElementById('heroTypingPrefix').textContent = hero.typingPrefix + ' ';
    document.getElementById('heroDescription').textContent = hero.description;

    // Buttons
    const buttonsEl = document.getElementById('heroButtons');
    buttonsEl.innerHTML = hero.buttons.map((btn, i) =>
        `<a href="${btn.href}" class="btn ${btn.class}${i === 0 ? ' me-3' : ''}">
            <i class="bi ${btn.icon} me-2"></i>${btn.label}
        </a>`
    ).join('');

    // Socials
    const socialsEl = document.getElementById('heroSocials');
    socialsEl.innerHTML = buildSocialIcons(social);

    // Profile pic
    const profileEl = document.getElementById('heroProfilePic');
    profileEl.innerHTML = `<img src="${hero.profileImage}" alt="${hero.profileAlt}">`;

    // Code window
    const cw = hero.codeWindow;
    const codeEl = document.getElementById('codeWindow');
    codeEl.innerHTML = `
        <div class="code-header">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
            <span class="code-filename">${cw.filename}</span>
        </div>
        <pre class="code-body"><code><span class="code-keyword">class</span> <span class="code-class">Developer</span>:
    <span class="code-keyword">def</span> <span class="code-func">__init__</span>(self):
        self.name = <span class="code-str">"${cw.name}"</span>
        self.role = <span class="code-str">"${cw.role}"</span>
        self.skills = [
            ${cw.skills.map(s => `<span class="code-str">"${s}"</span>`).join(', ')}
        ]

    <span class="code-keyword">def</span> <span class="code-func">build</span>(self):
        <span class="code-keyword">return</span> <span class="code-str">"Amazing Software"</span></code></pre>`;
}

/* ===================== RENDER ABOUT ===================== */
function renderAbout(about) {
    document.getElementById('aboutTitle').textContent = about.sectionTitle;
    document.getElementById('aboutSubtitle').textContent = about.subtitle;

    // Stats
    const statsEl = document.getElementById('aboutStats');
    statsEl.innerHTML = about.stats.map(stat => `
        <div class="stat-card">
            <div class="stat-icon"><i class="bi ${stat.icon}"></i></div>
            <h3 class="stat-number" data-count="${stat.count}">0</h3>
            <p class="stat-label">${stat.label}</p>
        </div>
    `).join('');

    // Paragraphs
    const paraEl = document.getElementById('aboutParagraphs');
    paraEl.innerHTML = about.paragraphs.map(p => `<p class="about-text">${p}</p>`).join('');

    // Highlights
    const hlEl = document.getElementById('aboutHighlights');
    hlEl.innerHTML = about.highlights.map(h =>
        `<div class="highlight-item"><i class="bi bi-check-circle-fill"></i> ${h}</div>`
    ).join('');

    // Resume link
    document.getElementById('resumeBtn').href = about.resumeLink;
}

/* ===================== RENDER SKILLS ===================== */
function renderSkills(skills) {
    document.getElementById('skillsTitle').textContent = skills.sectionTitle;
    document.getElementById('skillsSubtitle').textContent = skills.sectionSubtitle;

    // Skill categories
    const catEl = document.getElementById('skillCategories');
    catEl.innerHTML = skills.categories.map((cat, i) => `
        <div class="col-lg-3 col-md-6 mb-4" data-aos="fade-up" data-aos-delay="${(i + 1) * 100}">
            <div class="skill-category-card">
                <div class="skill-category-icon"><i class="bi ${cat.icon}"></i></div>
                <h4 class="skill-category-title">${cat.title}</h4>
                <div class="skill-tags">
                    ${cat.tags.map(t => `<span class="skill-tag">${t}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');

    // Progress bars - split into two columns
    const pbEl = document.getElementById('skillProgressBars');
    const half = Math.ceil(skills.progressBars.length / 2);
    const leftBars = skills.progressBars.slice(0, half);
    const rightBars = skills.progressBars.slice(half);

    pbEl.innerHTML = `
        <div class="col-lg-6" data-aos="fade-right">
            ${leftBars.map(bar => buildProgressBar(bar)).join('')}
        </div>
        <div class="col-lg-6" data-aos="fade-left">
            ${rightBars.map(bar => buildProgressBar(bar)).join('')}
        </div>
    `;
}

function buildProgressBar(bar) {
    return `
        <div class="skill-progress-item">
            <div class="skill-progress-header">
                <span>${bar.label}</span><span>${bar.percent}%</span>
            </div>
            <div class="progress"><div class="progress-bar" style="width: ${bar.percent}%"></div></div>
        </div>
    `;
}

/* ===================== RENDER CERTIFICATIONS ===================== */
function renderCertifications(certs) {
    document.getElementById('certsTitle').textContent = certs.sectionTitle;
    document.getElementById('certsSubtitle').textContent = certs.sectionSubtitle;

    const gridEl = document.getElementById('certsGrid');
    gridEl.innerHTML = certs.items.map((cert, i) => `
        <div class="col-lg-6 mb-4" data-aos="fade-up" data-aos-delay="${(i + 1) * 100}">
            ${cert.link ? `<a href="${cert.link}" target="_blank" class="cert-card-link">` : ''}
            <div class="cert-card">
                ${cert.image ? `<img src="${cert.image}" alt="${cert.title}" class="cert-image">` : `<div class="cert-icon"><i class="bi ${cert.icon}"></i></div>`}
                <div class="cert-info">
                    <h5>${cert.title}</h5>
                    <p class="cert-issuer">${cert.issuer}</p>
                    <p class="cert-date"><i class="bi bi-calendar3 me-1"></i> ${cert.date}</p>
                    <p class="cert-id">Credential ID: ${cert.credentialId}</p>
                </div>
            </div>
            ${cert.link ? '</a>' : ''}
        </div>
    `).join('');
}

/* ===================== RENDER PROJECTS ===================== */
function renderProjects(projectsData) {
    document.getElementById('projectsTitle').textContent = projectsData.sectionTitle;
    document.getElementById('projectsSubtitle').textContent = projectsData.sectionSubtitle;

    // Filter buttons
    const filtersEl = document.getElementById('projectFilters');
    filtersEl.innerHTML = projectsData.filters.map((f, i) =>
        `<button class="filter-btn${i === 0 ? ' active' : ''}" data-filter="${f.value}">${f.label}</button>`
    ).join('');

    // Render project cards
    const grid = document.getElementById('projectsGrid');
    renderProjectCards(projectsData.items, grid);
    initFilterButtons(projectsData.items, grid);
}

function renderProjectCards(projects, grid) {
    grid.innerHTML = '';
    projects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'col-lg-4 col-md-6 mb-4';
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', (index % 3) * 100);
        card.setAttribute('data-category', project.category);

        const images = project.screenshots && project.screenshots.length > 0
            ? project.screenshots
            : [];
        const hasImages = images.length > 0;
        const hasMultiple = images.length > 1;

        let imageHTML;
        if (hasImages) {
            imageHTML = `
                <div class="project-slideshow" data-slide-index="0">
                    ${images.map((src, i) => `<img src="${src}" alt="${project.title} - ${i + 1}" class="slide-img${i === 0 ? ' active' : ''}" loading="lazy">`).join('')}
                    ${hasMultiple ? `<div class="slide-dots">${images.map((_, i) => `<span class="slide-dot${i === 0 ? ' active' : ''}" data-dot="${i}"></span>`).join('')}</div>` : ''}
                </div>`;
        } else {
            imageHTML = `<div class="placeholder-icon"><i class="bi bi-${getCategoryIcon(project.category)}"></i></div>`;
        }

        card.innerHTML = `
            <div class="project-card" onclick="openProject('${project.id}')">
                <div class="project-card-image">
                    ${imageHTML}
                    <div class="project-card-overlay">
                        <span><i class="bi bi-arrow-right me-2"></i>View Details</span>
                    </div>
                </div>
                ${project.videoLink ? `<a href="${project.videoLink}" target="_blank" class="project-video-badge" onclick="event.stopPropagation();" title="Watch Video"><i class="bi bi-play-circle-fill"></i></a>` : ''}
                <div class="project-card-body">
                    <span class="project-card-category">${project.category}</span>
                    <h5 class="project-card-title">${project.title}</h5>
                    <p class="project-card-desc">${project.shortDescription}</p>
                    <div class="project-card-tech">
                        ${project.techStack.slice(0, 4).map(t => `<span class="project-tech-tag">${t}</span>`).join('')}
                        ${project.techStack.length > 4 ? `<span class="project-tech-tag">+${project.techStack.length - 4}</span>` : ''}
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    initSlideshows();
    AOS.refresh();
}

/* ===================== PROJECT CARD SLIDESHOW ===================== */
function initSlideshows() {
    document.querySelectorAll('.project-slideshow').forEach(slideshow => {
        const imgs = slideshow.querySelectorAll('.slide-img');
        if (imgs.length <= 1) return;

        const dots = slideshow.querySelectorAll('.slide-dot');
        let current = 0;
        let interval;

        function goTo(idx) {
            imgs[current].classList.remove('active');
            if (dots.length) dots[current].classList.remove('active');
            current = idx % imgs.length;
            imgs[current].classList.add('active');
            if (dots.length) dots[current].classList.add('active');
        }

        function startAuto() {
            interval = setInterval(() => goTo(current + 1), 3000);
        }

        // Dot clicks
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                clearInterval(interval);
                goTo(parseInt(dot.dataset.dot));
                startAuto();
            });
        });

        // Pause on hover
        slideshow.closest('.project-card').addEventListener('mouseenter', () => clearInterval(interval));
        slideshow.closest('.project-card').addEventListener('mouseleave', () => startAuto());

        startAuto();
    });
}

function getCategoryIcon(category) {
    const icons = {
        'AI / Generative AI': 'robot',
        'NLP': 'chat-dots',
        'Machine Learning': 'cpu',
        'Deep Learning': 'gpu-card',
        'Backend Development': 'server',
        'Cloud & DevOps': 'cloud'
    };
    return icons[category] || 'code-slash';
}

function openProject(projectId) {
    window.location.href = `project.html?id=${projectId}`;
}

/* ===================== RENDER EXPERIENCE ===================== */
function renderExperience(exp) {
    document.getElementById('expTitle').textContent = exp.sectionTitle;

    const timelineEl = document.getElementById('experienceTimeline');
    timelineEl.innerHTML = exp.items.map((item, i) => {
        const aosDir = i % 2 === 0 ? 'fade-right' : 'fade-left';
        const yearMatch = item.date.match(/(\d{4})/);
        const year = yearMatch ? yearMatch[1] : '';
        return `
        <div class="timeline-item" data-aos="${aosDir}"${i > 0 ? ` data-aos-delay="${i * 150}"` : ''}>
            <div class="timeline-dot"></div>
            ${year ? `<span class="timeline-year-badge">${year}</span>` : ''}
            <div class="timeline-content">
                <div class="timeline-header">
                    <h4 class="timeline-title">${item.title}</h4>
                    <span class="timeline-company">${item.company}</span>
                </div>
                <span class="timeline-date"><i class="bi bi-calendar3 me-2"></i>${item.date}</span>
                <p class="timeline-description">${item.description}</p>
                <div class="timeline-tech">
                    ${item.techBadges.map(t => `<span class="tech-badge">${t}</span>`).join('')}
                </div>
                <ul class="timeline-achievements">
                    ${item.achievements.map(a => `<li>${a}</li>`).join('')}
                </ul>
            </div>
        </div>`;
    }).join('');
}

/* ===================== RENDER CONTACT ===================== */
function renderContact(contact, social) {
    document.getElementById('contactTitle').textContent = contact.sectionTitle;
    document.getElementById('contactSubtitle').textContent = contact.sectionSubtitle;

    const infoCard = document.getElementById('contactInfoCard');
    infoCard.innerHTML = `
        <h4 class="contact-info-title">${contact.infoTitle}</h4>
        <p class="contact-info-text">${contact.infoText}</p>
        <div class="contact-details">
            ${contact.details.map(d => `
                <div class="contact-detail-item">
                    <div class="contact-icon"><i class="bi ${d.icon}"></i></div>
                    <div>
                        <h6>${d.label}</h6>
                        ${d.href
                            ? `<a href="${d.href}"${d.external ? ' target="_blank"' : ''}>${d.value}</a>`
                            : `<p>${d.value}</p>`
                        }
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

/* ===================== RENDER FOOTER ===================== */
function renderFooter(brandName, footer, socialLinks) {
    const footerBrand = document.getElementById('footerBrand');
    footerBrand.innerHTML = `<span class="brand-accent">&lt;</span>${brandName}<span class="brand-accent"> /&gt;</span>`;

    document.getElementById('footerCopyright').textContent = footer.copyright;

    const footerSocials = document.getElementById('footerSocials');
    footerSocials.innerHTML = buildSocialIcons(socialLinks);
}

/* ===================== SOCIAL ICONS HELPER ===================== */
function buildSocialIcons(social) {
    let html = '';
    if (social.github) {
        html += `<a href="${social.github}" target="_blank" class="social-icon" aria-label="GitHub"><i class="bi bi-github"></i></a>`;
    }
    if (social.linkedin) {
        html += `<a href="${social.linkedin}" target="_blank" class="social-icon" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>`;
    }
    if (social.email) {
        html += `<a href="mailto:${social.email}" class="social-icon" aria-label="Email"><i class="bi bi-envelope-fill"></i></a>`;
    }
    return html;
}

/* ===================== AOS INIT ===================== */
function initAOS() {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80
    });
}

/* ===================== NAVBAR SCROLL ===================== */
function initNavbar() {
    const navbar = document.getElementById('mainNav');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Close mobile nav on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const navCollapse = document.getElementById('navbarNav');
            if (navCollapse.classList.contains('show')) {
                new bootstrap.Collapse(navCollapse).hide();
            }
        });
    });
}

/* ===================== TYPING EFFECT ===================== */
function initTypingEffect(texts) {
    const element = document.getElementById('typingText');
    if (!element || !texts || texts.length === 0) return;

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let speed = 100;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            speed = 50;
        } else {
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            speed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            speed = 300;
        }

        setTimeout(type, speed);
    }

    type();
}

/* ===================== PARTICLES ===================== */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particle.style.animationDelay = (Math.random() * 10) + 's';
        particle.style.width = (Math.random() * 4 + 2) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}

/* ===================== BACK TO TOP ===================== */
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
}

/* ===================== FILTER BUTTONS ===================== */
function initFilterButtons(projects, grid) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            let filtered = projects;

            if (filter !== 'all') {
                filtered = projects.filter(p => p.category === filter);
            }

            renderProjectCards(filtered, grid);
        });
    });
}

/* ===================== STAT COUNTERS ===================== */
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'));
                animateCounter(el, target);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 40;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 40);
}

/* ===================== CONTACT FORM ===================== */
function initContactForm(emailAddr) {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const status = document.getElementById('formStatus');
        const formData = new FormData(form);

        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        const mailtoLink = `mailto:${emailAddr}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;

        status.style.display = 'block';
        status.className = 'mt-3 text-center text-success';
        status.innerHTML = '<i class="bi bi-check-circle me-2"></i>Opening your email client...';

        window.location.href = mailtoLink;

        setTimeout(() => {
            form.reset();
            status.style.display = 'none';
        }, 3000);
    });
}

/* ===================== SMOOTH SCROLL ===================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}
