// ========================================
// REGULATORY AFFAIRS PORTFOLIO - JAVASCRIPT
// Interactive Features & Animations
// ========================================

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Hide loader after page load
    setTimeout(() => {
        document.querySelector('.loader').classList.add('hidden');
    }, 1000);

    // Initialize all features
    initNavigation();
    initScrollAnimations();
    initSkillBars();
    initProjectFilters();
    initProjectModals();
    initTestimonials();
    initContactForm();
    initBackToTop();
});

// ========================================
// NAVIGATION
// ========================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    const navbarLinks = document.querySelectorAll('.navbar-link');

    // Sticky navbar with transparency effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navbarToggle.addEventListener('click', () => {
        navbarToggle.classList.toggle('active');
        navbarMenu.classList.toggle('active');
    });

    // Smooth scroll and active link highlighting
    navbarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu
                navbarToggle.classList.remove('active');
                navbarMenu.classList.remove('active');

                // Update active link
                navbarLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navbarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.card, .project-card, .blog-card, .timeline-item, .skill-category, .contact-item'
    );

    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// ========================================
// SKILL BARS ANIMATION
// ========================================
function initSkillBars() {
    const skillsSection = document.getElementById('skills');
    const skillBars = document.querySelectorAll('.skill-progress');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    setTimeout(() => {
                        bar.classList.add('animate');
                    }, 200);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }
}

// ========================================
// PROJECT FILTERING
// ========================================
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ========================================
// PROJECT MODALS
// ========================================
function initProjectModals() {
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');

    // Project details data
    const projectDetails = {
        '1': {
            title: 'IND Submission for Novel Oncology Drug',
            category: 'Regulatory Submissions',
            description: 'Led the preparation and submission of an Investigational New Drug application for a breakthrough oncology therapy.',
            details: `
                <h3>Project Overview</h3>
                <p>This project involved the comprehensive preparation and submission of an IND application for a novel oncology drug targeting advanced solid tumors. The submission required coordination across multiple departments and strict adherence to FDA regulations.</p>
                
                <h4>Key Responsibilities</h4>
                <ul>
                    <li>Coordinated cross-functional teams including clinical, CMC, and nonclinical groups</li>
                    <li>Prepared regulatory strategy and submission timeline</li>
                    <li>Authored key sections of the IND application</li>
                    <li>Managed FDA pre-IND meeting and responses to agency questions</li>
                    <li>Ensured compliance with 21 CFR Part 312 requirements</li>
                </ul>
                
                <h4>Outcomes</h4>
                <ul>
                    <li>Successfully submitted IND within planned timeline</li>
                    <li>Received FDA clearance to proceed with Phase I clinical trial</li>
                    <li>Established strong foundation for ongoing regulatory interactions</li>
                </ul>
                
                <h4>Regulatory Areas</h4>
                <p><strong>FDA Regulations:</strong> 21 CFR Part 312, ICH M4, ICH E6</p>
            `
        },
        '2': {
            title: 'Manufacturing Facility Compliance Audit',
            category: 'GMP Compliance',
            description: 'Conducted comprehensive GMP compliance audit for pharmaceutical manufacturing facility.',
            details: `
                <h3>Project Overview</h3>
                <p>Performed a thorough GMP compliance audit of a pharmaceutical manufacturing facility to identify gaps and ensure readiness for FDA inspection.</p>
                
                <h4>Key Responsibilities</h4>
                <ul>
                    <li>Conducted on-site audit of manufacturing operations</li>
                    <li>Reviewed batch records, SOPs, and quality systems</li>
                    <li>Identified compliance gaps and areas for improvement</li>
                    <li>Developed corrective action and preventive action (CAPA) plans</li>
                    <li>Provided training to facility personnel on GMP requirements</li>
                </ul>
                
                <h4>Outcomes</h4>
                <ul>
                    <li>Identified and addressed 15 critical compliance gaps</li>
                    <li>Implemented robust quality management system improvements</li>
                    <li>Facility successfully passed subsequent FDA inspection</li>
                </ul>
                
                <h4>Regulatory Areas</h4>
                <p><strong>Standards:</strong> 21 CFR Part 210/211, ICH Q7, EU GMP Guidelines</p>
            `
        },
        '3': {
            title: 'Global Regulatory Strategy Development',
            category: 'Global Strategy',
            description: 'Developed comprehensive global regulatory strategy for medical device launch across multiple markets.',
            details: `
                <h3>Project Overview</h3>
                <p>Created a harmonized global regulatory strategy for a Class III medical device, enabling simultaneous market entry across US, EU, and Asian markets.</p>
                
                <h4>Key Responsibilities</h4>
                <ul>
                    <li>Analyzed regulatory requirements across multiple jurisdictions</li>
                    <li>Developed integrated submission strategy and timeline</li>
                    <li>Coordinated with local regulatory consultants</li>
                    <li>Identified opportunities for regulatory harmonization</li>
                    <li>Managed regulatory intelligence and landscape monitoring</li>
                </ul>
                
                <h4>Outcomes</h4>
                <ul>
                    <li>Achieved market authorization in 5 countries within 18 months</li>
                    <li>Reduced regulatory costs by 30% through strategic planning</li>
                    <li>Established framework for future global product launches</li>
                </ul>
                
                <h4>Regulatory Areas</h4>
                <p><strong>Regions:</strong> FDA (US), MDR (EU), PMDA (Japan), NMPA (China), TGA (Australia)</p>
            `
        },
        '4': {
            title: 'Phase III Clinical Trial Protocol Review',
            category: 'Clinical Trials',
            description: 'Reviewed and optimized Phase III clinical trial protocol for cardiovascular drug.',
            details: `
                <h3>Project Overview</h3>
                <p>Conducted comprehensive regulatory review of a Phase III clinical trial protocol for a novel cardiovascular therapy, ensuring compliance with ICH-GCP guidelines and regulatory requirements.</p>
                
                <h4>Key Responsibilities</h4>
                <ul>
                    <li>Reviewed protocol design and endpoints for regulatory acceptability</li>
                    <li>Ensured compliance with ICH-GCP and local regulations</li>
                    <li>Provided input on informed consent documents</li>
                    <li>Coordinated with clinical operations and biostatistics teams</li>
                    <li>Prepared regulatory submissions for trial initiation</li>
                </ul>
                
                <h4>Outcomes</h4>
                <ul>
                    <li>Protocol approved by regulatory authorities in all planned countries</li>
                    <li>Trial initiated on schedule with no regulatory delays</li>
                    <li>Established efficient processes for protocol amendments</li>
                </ul>
                
                <h4>Regulatory Areas</h4>
                <p><strong>Guidelines:</strong> ICH E6 (GCP), ICH E8, ICH E9, 21 CFR Part 50/56</p>
            `
        },
        '5': {
            title: 'New Drug Application for Rare Disease',
            category: 'NDA Submission',
            description: 'Managed NDA submission for orphan drug designation with breakthrough therapy status.',
            details: `
                <h3>Project Overview</h3>
                <p>Led the preparation and submission of a New Drug Application for a rare disease therapy, including orphan drug designation and breakthrough therapy designation requests.</p>
                
                <h4>Key Responsibilities</h4>
                <ul>
                    <li>Developed comprehensive NDA submission strategy</li>
                    <li>Coordinated preparation of all NDA modules (eCTD format)</li>
                    <li>Managed orphan drug and breakthrough therapy designation applications</li>
                    <li>Prepared for FDA advisory committee meeting</li>
                    <li>Coordinated responses to FDA information requests</li>
                </ul>
                
                <h4>Outcomes</h4>
                <ul>
                    <li>Successfully submitted NDA with priority review designation</li>
                    <li>Granted orphan drug and breakthrough therapy status</li>
                    <li>Received FDA approval within 8 months of submission</li>
                </ul>
                
                <h4>Regulatory Areas</h4>
                <p><strong>Programs:</strong> Orphan Drug Act, Breakthrough Therapy, Priority Review, Accelerated Approval</p>
            `
        },
        '6': {
            title: 'Pharmacovigilance System Implementation',
            category: 'Post-Market Surveillance',
            description: 'Implemented robust pharmacovigilance system for post-market safety monitoring.',
            details: `
                <h3>Project Overview</h3>
                <p>Designed and implemented a comprehensive pharmacovigilance system for post-market safety monitoring of multiple marketed products.</p>
                
                <h4>Key Responsibilities</h4>
                <ul>
                    <li>Developed pharmacovigilance system master file</li>
                    <li>Established adverse event reporting procedures</li>
                    <li>Implemented signal detection and risk management processes</li>
                    <li>Trained personnel on pharmacovigilance requirements</li>
                    <li>Managed regulatory reporting obligations (periodic safety reports)</li>
                </ul>
                
                <h4>Outcomes</h4>
                <ul>
                    <li>Established compliant pharmacovigilance system meeting global requirements</li>
                    <li>Achieved 100% on-time regulatory safety reporting</li>
                    <li>Successfully managed product safety profile and risk mitigation</li>
                </ul>
                
                <h4>Regulatory Areas</h4>
                <p><strong>Requirements:</strong> 21 CFR Part 314.80, ICH E2A-E2F, EU Pharmacovigilance Directive</p>
            `
        }
    };

    // Open modal on project card click
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            const project = projectDetails[projectId];

            if (project) {
                modalBody.innerHTML = `
                    <span class="project-category">${project.category}</span>
                    <h2>${project.title}</h2>
                    ${project.details}
                `;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ========================================
// TESTIMONIALS CAROUSEL
// ========================================
function initTestimonials() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    const dotsContainer = document.getElementById('testimonialDots');
    let currentSlide = 0;
    let autoPlayInterval;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.carousel-dot');

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        currentSlide = (n + slides.length) % slides.length;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function goToSlide(n) {
        showSlide(n);
        resetAutoPlay();
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });

    // Start auto-play
    startAutoPlay();

    // Pause on hover
    const carousel = document.querySelector('.testimonials-carousel');
    carousel.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    carousel.addEventListener('mouseleave', startAutoPlay);
}

// ========================================
// CONTACT FORM
// ========================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    const formGroups = form.querySelectorAll('.form-group');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;

        // Validate each field
        formGroups.forEach(group => {
            const input = group.querySelector('.form-input, .form-textarea');
            const value = input.value.trim();

            // Remove previous error state
            group.classList.remove('error');

            // Validate
            if (value === '') {
                group.classList.add('error');
                isValid = false;
            } else if (input.type === 'email' && !isValidEmail(value)) {
                group.classList.add('error');
                isValid = false;
            }
        });

        if (isValid) {
            // Form is valid - show success message
            alert('Thank you for your message! I will get back to you soon.');
            form.reset();
        }
    });

    // Real-time validation
    formGroups.forEach(group => {
        const input = group.querySelector('.form-input, .form-textarea');
        input.addEventListener('blur', () => {
            const value = input.value.trim();
            group.classList.remove('error');

            if (value === '') {
                group.classList.add('error');
            } else if (input.type === 'email' && !isValidEmail(value)) {
                group.classList.add('error');
            }
        });

        input.addEventListener('input', () => {
            if (group.classList.contains('error')) {
                const value = input.value.trim();
                if (value !== '' && (input.type !== 'email' || isValidEmail(value))) {
                    group.classList.remove('error');
                }
            }
        });
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// ========================================
// BACK TO TOP BUTTON
// ========================================
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js';
    document.head.appendChild(script);
}

// Performance optimization: Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScroll = debounce(() => {
    // Any scroll-heavy operations can be placed here
}, 100);

window.addEventListener('scroll', optimizedScroll);
