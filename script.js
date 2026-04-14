// ========== HEADER SCROLL EFFECT ==========
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ========== FORM SUBMISSION ==========
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone') || 'Not provided',
            company: formData.get('company') || 'Not provided',
            subject: formData.get('subject'),
            service: formData.get('service') || 'General inquiry',
            message: formData.get('message')
        };

        // Validate email
        if (!validateEmail(data.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Log form data (in production, send to server)
        console.log('Form submitted:', data);

        // Show success message
        showNotification('Thank you for your message! We will get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

// ========== EMAIL VALIDATION FUNCTION ==========
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ========== NOTIFICATION FUNCTION ==========
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles dynamically
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 2000;
        animation: slideInRight 0.3s ease;
        font-weight: 600;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== ANIMATION ON SCROLL ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards, team members, and other elements
document.querySelectorAll(
    '.service-card, .team-member, .stat-item, .blog-card, .portfolio-card, .testimonial-card, .stat-highlight'
).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ========== PORTFOLIO FILTERING ==========
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

if (filterBtns.length > 0 && portfolioCards.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = e.target.dataset.filter;
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            // Filter cards with animation
            portfolioCards.forEach(card => {
                const category = card.dataset.category;
                
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

// ========== ACTIVE NAV LINK HIGHLIGHTING ==========
function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.style.color = 'var(--accent-cyan)';
        } else {
            link.style.color = 'var(--text-secondary)';
        }
    });
}

document.addEventListener('DOMContentLoaded', updateActiveNavLink);

// ========== ADD ANIMATION KEYFRAMES ==========
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes scaleUp {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// ========== SMOOTH PAGE TRANSITIONS ==========
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to page
    document.body.style.animation = 'fadeIn 0.5s ease';
});

// ========== FORM FIELD VALIDATION ==========
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateField(input);
    });

    input.addEventListener('focus', () => {
        input.style.borderColor = 'var(--accent-cyan)';
    });
});

function validateField(field) {
    const value = field.value.trim();
    const type = field.type;

    let isValid = true;

    // Required field validation
    if (field.required && !value) {
        isValid = false;
    }

    // Email validation
    if (type === 'email' && value) {
        isValid = validateEmail(value);
    }

    // Phone validation
    if (type === 'tel' && value) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        isValid = phoneRegex.test(value) && value.replace(/\D/g, '').length >= 10;
    }

    // Update field styling
    if (isValid) {
        field.style.borderColor = 'var(--accent-cyan)';
    } else if (value) {
        field.style.borderColor = 'var(--error)';
    }

    return isValid;
}

// ========== SCROLL TO TOP BUTTON ==========
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-purple) 100%);
    color: var(--primary-dark);
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: bold;
    display: none;
    z-index: 999;
    transition: all 0.3s ease;
    box-shadow: 0 10px 30px rgba(6, 182, 212, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseover', () => {
    scrollToTopBtn.style.transform = 'translateY(-5px)';
    scrollToTopBtn.style.boxShadow = '0 15px 40px rgba(6, 182, 212, 0.5)';
});

scrollToTopBtn.addEventListener('mouseout', () => {
    scrollToTopBtn.style.transform = 'translateY(0)';
    scrollToTopBtn.style.boxShadow = '0 10px 30px rgba(6, 182, 212, 0.3)';
});

// ========== DEBOUNCE FUNCTION ==========
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

// ========== THROTTLE FUNCTION ==========
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========== LAZY LOAD IMAGES ==========
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ========== PERFORMANCE MONITORING ==========
window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`Page load time: ${pageLoadTime}ms`);
});

// ========== KEYBOARD SHORTCUTS ==========
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search (if search exists)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="search"]');
        if (searchInput) {
            searchInput.focus();
        }
    }

    // Escape to close any modals (if modals exist)
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => modal.classList.remove('active'));
    }
});

// ========== UTILITY: GET ELEMENT BY ID ==========
function getById(id) {
    return document.getElementById(id);
}

// ========== UTILITY: GET ELEMENTS BY CLASS ==========
function getByClass(className) {
    return document.querySelectorAll(`.${className}`);
}

// ========== UTILITY: ADD CLASS TO ELEMENT ==========
function addClass(element, className) {
    if (element) {
        element.classList.add(className);
    }
}

// ========== UTILITY: REMOVE CLASS FROM ELEMENT ==========
function removeClass(element, className) {
    if (element) {
        element.classList.remove(className);
    }
}

// ========== UTILITY: TOGGLE CLASS ==========
function toggleClass(element, className) {
    if (element) {
        element.classList.toggle(className);
    }
}

// ========== CONSOLE WELCOME MESSAGE ==========
console.log('%cWelcome to Unisonix LLC', 'font-size: 20px; font-weight: bold; color: #06b6d4;');
console.log('%cModern IT Consulting Solutions', 'font-size: 14px; color: #8b5cf6;');
console.log('%cBuilt with modern web standards and best practices', 'font-size: 12px; color: #cbd5e1;');
