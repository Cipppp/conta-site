// Main JavaScript for Accounting Business Expert Website

// Configuration - IMPORTANT: Update these with your actual contact details
const CONTACT_CONFIG = {
    phone: '+40722123456',  // Replace with actual phone number
    email: 'office@accountingexpert.ro',  // Replace with actual email
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

// Handle Contact Form Submission
function handleContactForm(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Here you would typically send the data to your backend
    // For now, we'll create a mailto link with the form data
    const subject = encodeURIComponent('Contact din site - ' + data.name || 'Vizitator');
    const body = encodeURIComponent(
        `Nume: ${data.name || 'N/A'}\n` +
        `Email: ${data.email || 'N/A'}\n` +
        `Telefon: ${data.phone || 'N/A'}\n\n` +
        `Mesaj:\n${data.message || 'N/A'}`
    );

    // Show success message
    alert('Mulțumim pentru mesaj! Vă vom contacta în cel mai scurt timp posibil.');

    // Open email client
    window.location.href = `mailto:${CONTACT_CONFIG.email}?subject=${subject}&body=${body}`;

    // Reset form
    e.target.reset();
}

// Load latest news for homepage
function loadLatestNews() {
    // Articles inline - aceleași ca în articles.js
    const articles = [
        {
            "id": 1,
            "title": "Modificări legislative în domeniul fiscal pentru 2025",
            "category": "Fiscal",
            "date": "2025-11-07",
            "excerpt": "Aflați despre cele mai recente modificări ale Codului Fiscal care afectează afacerea dumneavoastră începând cu anul 2025. Aceste schimbări aduc noi oportunități, dar și responsabilități pentru contribuabili."
        },
        {
            "id": 2,
            "title": "Noi obligații de raportare pentru 2025",
            "category": "Contabilitate",
            "date": "2025-11-05",
            "excerpt": "Informații esențiale despre noile cerințe de raportare fiscală ce intră în vigoare în noul an. Aflați ce declarații suplimentare trebuie depuse și care sunt termenele."
        },
        {
            "id": 3,
            "title": "Ghid complet TVA pentru comerțul electronic",
            "category": "TVA",
            "date": "2025-11-01",
            "excerpt": "Tot ce trebuie să știți despre aplicarea TVA în comerțul online și vânzările transfrontaliere. Reguli actualizate pentru platformele de e-commerce și marketplace-uri."
        }
    ];

    // Sort by date and get latest 3
    const latestArticles = articles
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);

    displayLatestNews(latestArticles);
}

// Display latest news on homepage
function displayLatestNews(articles) {
    const container = document.getElementById('latestNews');
    if (!container) return;

    container.innerHTML = articles.map(article => `
        <div class="news-card">
            <div class="news-date">${formatDate(article.date)}</div>
            <h3>${article.title}</h3>
            <p>${article.excerpt.substring(0, 120)}...</p>
            <a href="legislatie.html" class="news-link">Citește mai mult →</a>
        </div>
    `).join('');
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

// Print function for articles (optional feature)
function printArticle(articleId) {
    window.print();
}

// Share article on social media (optional feature)
function shareArticle(platform, articleTitle, articleUrl) {
    let shareUrl = '';

    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(articleTitle)}`;
            break;
    }

    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Console message
console.log('%c🚀 Accounting Business Expert Website', 'color: #1e40af; font-size: 16px; font-weight: bold;');
console.log('%cDeveloped with ❤️ for professional accounting services', 'color: #6b7280; font-size: 12px;');
