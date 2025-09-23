// Enhanced JavaScript with Rich Interactions
document.addEventListener('DOMContentLoaded', function() {
    
    // Particles.js Configuration
    if (window.particlesJS) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#667eea'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.3,
                    random: false,
                    anim: {
                        enable: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#667eea',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
    
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        body.classList.toggle('dark-theme');
        
        if (body.classList.contains('light-theme')) {
            icon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
        }
        
        // Add ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '100px';
        ripple.style.height = '100px';
        ripple.style.marginLeft = '-50px';
        ripple.style.marginTop = '-50px';
        
        themeToggle.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Scroll Animation for Elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.8s ease-out forwards';
            }
        });
    }, observerOptions);
    
    // Observe all service cards and portfolio cards
    document.querySelectorAll('.service-card, .portfolio-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        observer.observe(card);
    });
    
    // Counter Animation for Stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
            const suffix = counter.textContent.replace(/[\d]/g, '');
            let current = 0;
            const increment = target / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + suffix;
                }
            }, 40);
        });
    }
    
    // Trigger counter animation when stats come into view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    });
    
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // Form Submission Handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            // Loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    this.reset();
                }, 2000);
            }, 2000);
        });
    }
    
    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.top-nav');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        // Add background blur when scrolling
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add CSS animation keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Preloader (optional)
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
    
});

// Mouse cursor trail effect (optional enhancement)
document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.style.position = 'fixed';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    trail.style.width = '4px';
    trail.style.height = '4px';
    trail.style.background = 'rgba(102, 126, 234, 0.6)';
    trail.style.borderRadius = '50%';
    trail.style.pointerEvents = 'none';
    trail.style.zIndex = '9999';
    trail.style.animation = 'trailFade 0.5s ease-out forwards';
    
    document.body.appendChild(trail);
    
    setTimeout(() => trail.remove(), 500);
});

// Add trail animation
const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes trailFade {
        to {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(trailStyle);

// Why Choose Us Timeline Scroll Animation
document.addEventListener('DOMContentLoaded', function () {
    const timeline = document.querySelector('.why-choose-timeline');
    const line = document.querySelector('.why-choose-line');
    const items = document.querySelectorAll('.features-grid .feature-item');

    function animateTimeline() {
        if (!timeline) return;
        const rect = timeline.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Calculate how much of the timeline is in view
        let percent = 0;
        if (rect.top < windowHeight && rect.bottom > 0) {
            percent = Math.min(1, Math.max(0, (windowHeight - rect.top) / (rect.height + windowHeight * 0.3)));
        }
        // Animate line height
        line.style.height = `${Math.max(20, percent * 100)}%`;

        // Reveal cards as the line passes them
        items.forEach((item, idx) => {
            const itemRect = item.getBoundingClientRect();
            if (itemRect.top < windowHeight - 100) {
                item.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', animateTimeline);
    window.addEventListener('resize', animateTimeline);
    animateTimeline();
});

// Logo scroll transition
document.addEventListener('DOMContentLoaded', function () {
    const logo = document.getElementById('mainLogo');
    const logoImg = logo.querySelector('.dn-logo-img');
    const logoText = logo.querySelector('.logo-text');
    const logoHighlight = logo.querySelector('.logo-highlight');

    function handleLogoTransition() {
        if (window.scrollY > 40) {
            logo.classList.add('logo-scrolled');
        } else {
            logo.classList.remove('logo-scrolled');
        }
    }

    window.addEventListener('scroll', handleLogoTransition);
    handleLogoTransition();
});
// Cinematic Intro Overlay Logic
document.addEventListener('DOMContentLoaded', function () {
    const intro = document.getElementById('cinematic-intro');
    const skipBtn = document.getElementById('skip-intro');
    if (!intro) return;

    // Hide after 3.5s or on skip
    function hideIntro() {
        intro.classList.add('hide');
        setTimeout(() => {
            intro.style.display = 'none';
        }, 900);
    }

    setTimeout(hideIntro, 5000);

    skipBtn.addEventListener('click', hideIntro);
});

// Testimonials Carousel Animation
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dot');
    let current = 0;

    function showCard(idx) {
        cards.forEach((card, i) => {
            card.classList.toggle('active', i === idx);
            dots[i].classList.toggle('active', i === idx);
        });
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            current = i;
            showCard(current);
        });
    });

    // Auto-slide every 6 seconds
    setInterval(() => {
        current = (current + 1) % cards.length;
        showCard(current);
    }, 6000);

    // Animate on scroll
    const testimonialsSection = document.querySelector('.testimonials-section');
    if (testimonialsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    showCard(0);
                }
            });
        }, { threshold: 0.2 });
        observer.observe(testimonialsSection);
    }
});

// Blog Modal Logic
document.querySelectorAll('.blog-readmore').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const 
modal = document.getElementById('blog-modal');

        const article = modal.querySelector('.blog-modal-article');
        const title = this.getAttribute('data-title');
        const img = this.getAttribute('data-img');
        const content = this.getAttribute('data-article');
        article.innerHTML = `
            <img src="${img}" alt="${title}">
            <h2>${title}</h2>
            <p>${content}</p>
        `;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
});
document.querySelector('.blog-modal-close').onclick = function() {
    document.getElementById('blog-modal').classList.remove('show');
    document.body.style.overflow = '';
};
window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.getElementById('blog-modal').classList.remove('show');
        document.body.style.overflow = '';
    }
});
