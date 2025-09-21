// Navbar scroll effect with enhanced transitions
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    const scrollY = window.scrollY;

    if (scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Add parallax effect to hero background
    const hero = document.querySelector('.hero');
    if (hero && scrollY < window.innerHeight) {
        const parallaxSpeed = scrollY * 0.5;
        hero.style.transform = `translateY(${parallaxSpeed}px)`;
    }
});

// Optimized smooth scrolling for immediate response
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // Use cached target lookup to eliminate delay
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (!target) return;

        const offsetTop = target.offsetTop - 80;
        const startY = window.scrollY;
        const distance = offsetTop - startY;

        // Immediate response with shorter duration
        const startTime = performance.now();
        const duration = 600; // Reduced from 1000ms

        // Optimized easing function
        function easeOutQuart(t) {
            return 1 - (--t) * t * t * t;
        }

        function scrollAnimation(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = easeOutQuart(progress);

            window.scrollTo(0, startY + distance * ease);

            if (progress < 1) {
                requestAnimationFrame(scrollAnimation);
            }
        }

        // Start immediately
        requestAnimationFrame(scrollAnimation);
    });
});

// Intersection Observer for scroll-triggered animations
const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Add staggered animation for cards
            if (entry.target.classList.contains('transfer-grid') ||
                entry.target.classList.contains('contact-grid')) {
                const cards = entry.target.querySelectorAll('.transfer-card, .contact-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes to elements
    const elementsToAnimate = [
        '.section-title',
        '.ceremony-content',
        '.transfer-grid',
        '.contact-grid',
        '.rsvp-content',
        '.gifts-content'
    ];

    elementsToAnimate.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.classList.add('animate-on-scroll');
            observer.observe(element);
        });
    });

    // Initialize card animations
    const cards = document.querySelectorAll('.transfer-card, .contact-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)';
    });

    // Add hover ripple effect to cards
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const ripple = document.createElement('div');
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(168, 196, 154, 0.1);
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 0;
            `;

            card.style.position = 'relative';
            card.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Enhanced button interactions
    const buttons = document.querySelectorAll('.rsvp-button, .gifts-link');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.05)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });

        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });

        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-4px) scale(1.05)';
        });
    });

    // Add floating animation to organic shapes
    const organicShapes = document.querySelectorAll('.organic-shape');
    organicShapes.forEach((shape, index) => {
        const delay = index * 1000;
        const duration = 8000 + (index * 1000);

        shape.style.animationDelay = `${delay}ms`;
        shape.style.animationDuration = `${duration}ms`;
    });

    // Add subtle mouse follow effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', function(e) {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            const xPercent = (clientX / innerWidth - 0.5) * 2;
            const yPercent = (clientY / innerHeight - 0.5) * 2;

            const heroContent = hero.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.transform = `translate(${xPercent * 10}px, ${yPercent * 10}px)`;
            }
        });

        hero.addEventListener('mouseleave', function() {
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.transform = 'translate(0, 0)';
                heroContent.style.transition = 'transform 0.3s ease';
            }
        });
    }
});