/* ===================== PROJECT DETAIL PAGE JS ===================== */

document.addEventListener('DOMContentLoaded', () => {
    AOS.init({ duration: 800, once: true, offset: 60 });
    loadProjectDetail();
});

function loadProjectDetail() {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');

    if (!projectId) {
        showNotFound();
        return;
    }

    const project = PORTFOLIO_DATA.projects.items.find(p => p.id === projectId);
    if (project) {
        renderProjectDetail(project);
    } else {
        showNotFound();
    }
}

function renderProjectDetail(project) {
    // Update page title
    document.title = `${project.title} | Rahul - Portfolio`;

    // Hide loading, show content
    document.getElementById('projectLoading').style.display = 'none';
    document.getElementById('projectContent').style.display = 'block';

    // Populate content
    document.getElementById('breadcrumbTitle').textContent = project.title;
    document.getElementById('projectCategory').textContent = project.category;
    document.getElementById('projectTitle').textContent = project.title;
    document.getElementById('projectShort').textContent = project.shortDescription;
    document.getElementById('projectDescription').textContent = project.fullDescription;
    document.getElementById('projectArchitecture').textContent = project.architecture;

    // Project image
    const img = document.getElementById('projectImage');
    if (project.image && !project.image.includes('placeholder')) {
        img.src = project.image;
        img.alt = project.title;
    } else {
        // Use a gradient placeholder
        img.parentElement.innerHTML = `
            <div class="project-placeholder-hero rounded-3">
                <i class="bi bi-${getCategoryIcon(project.category)}"></i>
                <span>${project.title}</span>
            </div>
        `;
        addPlaceholderStyles();
    }

    // Action buttons
    if (project.githubLink) {
        const githubBtn = document.getElementById('githubBtn');
        githubBtn.href = project.githubLink;
        githubBtn.style.display = 'inline-flex';

        const downloadBtn = document.getElementById('downloadBtn');
        downloadBtn.href = project.githubLink + '/archive/refs/heads/main.zip';
        downloadBtn.style.display = 'inline-flex';

        const sideGithub = document.getElementById('sideGithub');
        sideGithub.href = project.githubLink;
        sideGithub.style.display = 'flex';
    }

    if (project.liveLink) {
        const liveBtn = document.getElementById('liveBtn');
        liveBtn.href = project.liveLink;
        liveBtn.style.display = 'inline-flex';

        const sideLive = document.getElementById('sideLive');
        sideLive.href = project.liveLink;
        sideLive.style.display = 'flex';
    }

    if (project.videoLink) {
        const videoBtn = document.getElementById('videoBtn');
        videoBtn.href = project.videoLink;
        videoBtn.style.display = 'inline-flex';

        const sideVideo = document.getElementById('sideVideo');
        sideVideo.href = project.videoLink;
        sideVideo.style.display = 'flex';
    }

    // Tech stack
    const techContainer = document.getElementById('projectTechStack');
    techContainer.innerHTML = project.techStack.map(tech => `
        <div class="tech-item">
            <i class="bi bi-check2-circle"></i>
            ${tech}
        </div>
    `).join('');

    // Screenshots
    if (project.screenshots && project.screenshots.length > 0) {
        document.getElementById('screenshotsSection').style.display = 'block';
        const screenshotsGrid = document.getElementById('screenshotsGrid');
        screenshotsGrid.innerHTML = project.screenshots.map(src => `
            <div class="col-md-6 mb-3">
                <img src="${src}" alt="Screenshot" class="img-fluid rounded-3" style="border: 1px solid var(--border-color);">
            </div>
        `).join('');
    }

    // Refresh AOS
    AOS.refresh();
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

function addPlaceholderStyles() {
    if (document.getElementById('placeholderStyles')) return;
    const style = document.createElement('style');
    style.id = 'placeholderStyles';
    style.textContent = `
        .project-placeholder-hero {
            background: linear-gradient(135deg, var(--bg-card) 0%, rgba(108, 99, 255, 0.15) 100%);
            border: 1px solid var(--border-color);
            padding: 80px 40px;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
        }
        .project-placeholder-hero i {
            font-size: 4rem;
            color: var(--accent-color);
            opacity: 0.6;
        }
        .project-placeholder-hero span {
            color: var(--text-muted);
            font-size: 1.2rem;
            font-weight: 500;
        }
    `;
    document.head.appendChild(style);
}

function showNotFound() {
    document.getElementById('projectLoading').style.display = 'none';
    document.getElementById('projectNotFound').style.display = 'block';
}
