// Main JavaScript for Accounting Business Expert Website

// Configuration - IMPORTANT: Update these with your actual contact details
const CONTACT_CONFIG = {
    phone: '+40766333433',  // WhatsApp mobile number
    email: 'loredana@accountingbusiness.ro',  // Primary email
    whatsappMessage: 'Bună! Aș dori să aflu mai multe despre serviciile dumneavoastră de contabilitate.'
};

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);

            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add scroll effect to header
    let lastScroll = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        }

        lastScroll = currentScroll;
    });

    // Load latest news on homepage
    if (document.getElementById('latestNews')) {
        loadLatestNews();
    }
});

// WhatsApp Contact Function
function contactWhatsApp() {
    const message = encodeURIComponent(CONTACT_CONFIG.whatsappMessage);
    const whatsappURL = `https://wa.me/${CONTACT_CONFIG.phone.replace(/\+/g, '')}?text=${message}`;
    window.open(whatsappURL, '_blank');
}

// Email Contact Function
function contactEmail() {
    const subject = encodeURIComponent('Solicitare Informații Servicii Contabilitate');
    const body = encodeURIComponent('Bună ziua,\n\nAș dori să aflu mai multe informații despre serviciile dumneavoastră.\n\nVă mulțumesc!');
    const mailtoURL = `mailto:${CONTACT_CONFIG.email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoURL;
}



// Format date helper function
function formatDate(dateString) {
    const months = ['IAN', 'FEB', 'MAR', 'APR', 'MAI', 'IUN', 'IUL', 'AUG', 'SEP', 'OCT', 'NOI', 'DEC'];
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

// Scroll reveal animation (optional enhancement)
function revealOnScroll() {
    const reveals = document.querySelectorAll('.service-card, .news-card, .article-card');

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize scroll reveal
window.addEventListener('scroll', revealOnScroll);

// Intersection Observer for lazy loading (modern approach)
if ('IntersectionObserver' in window) {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        const elements = document.querySelectorAll('.service-card, .news-card');
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    });
}

// Add visible class styles
const style = document.createElement('style');
style.textContent = `
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Utility function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add animation classes on scroll
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.service-card, .news-card, .article-card');
    elements.forEach(element => {
        if (isInViewport(element)) {
            element.classList.add('animate-in');
        }
    });
});

