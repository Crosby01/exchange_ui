// ExChange Platform - Main JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navbar scroll effect
    initNavbarScroll();
    
    // Initialize 3D card effects
    init3DCardEffects();
    
    // Initialize parallax effects
    initParallaxEffects();
    
    // Initialize floating elements animation
    initFloatingElements();
    
    // Initialize custom cursor effects for interactive elements
    initCustomCursorEffects();
    
    // Initialize FAQ accordion behavior
    initFaqAccordion();
    
    // Add animation classes to elements on page load
    animateOnScroll();
    
    // Ensure dark mode is always on (removed toggle functionality)
    ensureDarkMode();
    
    // Add smooth scrolling for anchor links
    setupSmoothScrolling();
    
    // Initialize tooltips if using Bootstrap's tooltip component
    initTooltips();
    
    // 3D Card Effect on mouse move
    setupCardTilt();
    
    // Add parallax effect to hero section
    setupParallaxEffect();
    
    // Add glowing effect to primary elements
    setupGlowingEffects();
});

// Navbar changes on scroll
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.backgroundColor = 'rgba(31, 41, 55, 0.95)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        } else { 
            navbar.style.padding = '15px 0';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.backgroundColor = 'rgba(31, 41, 55, 0.9)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// 3D Card Effects
function init3DCardEffects() {
    const cards = document.querySelectorAll('.card, .support-card, .exchanger-card, .login-card, .contact-form');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            // Get position of mouse cursor over card
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation values based on cursor position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Adjust these values to control the tilt intensity
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            // Apply 3D rotation
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            // Add shine effect on hover
            const shine = card.querySelector('.card-shine');
            if (shine) {
                // Position the shine based on cursor
                const percentX = (x / rect.width) * 100;
                const percentY = (y / rect.height) * 100;
                shine.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)`;
            }
        });
        
        // Add shine element to card
        const shine = document.createElement('div');
        shine.classList.add('card-shine');
        shine.style.position = 'absolute';
        shine.style.top = '0';
        shine.style.left = '0';
        shine.style.width = '100%';
        shine.style.height = '100%';
        shine.style.pointerEvents = 'none';
        shine.style.zIndex = '9';
        
        // Only add if it doesn't already have one
        if (!card.querySelector('.card-shine')) {
            card.style.position = 'relative';
            card.style.overflow = 'hidden';
            card.appendChild(shine);
        }
        
        // Reset on mouse leave
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            if (shine) {
                shine.style.background = 'none';
            }
        });
    });
}

// Parallax Effects
function initParallaxEffects() {
    // Parallax for header section
    const headers = document.querySelectorAll('.support-header, .search-header, .login-container, .profile-header');
    
    headers.forEach(header => {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const translateY = scrollPosition * 0.3; // Adjust the factor for more/less effect
            
            if (header.querySelector('.floating-element')) {
                const elements = header.querySelectorAll('.floating-element');
                elements.forEach((el, index) => {
                    // Create different parallax speeds for each element
                    const factor = 0.1 + (index * 0.05);
                    el.style.transform = `translateY(${translateY * factor}px)`;
                });
            }
        });
    });
    
    // Parallax for background gradient in header sections
    window.addEventListener('mousemove', (e) => {
        headers.forEach(header => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            // Apply subtle movement to the gradient background
            header.style.backgroundPosition = `${mouseX * 10}% ${mouseY * 10}%`;
        });
    });
}

// Initialize floating elements with random movement
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.animate-float');
    
    floatingElements.forEach(element => {
        // Add a small random delay to each element for more natural look
        const delay = Math.random() * 2;
        const duration = 5 + Math.random() * 5; // Between 5-10s
        
        element.style.animationDelay = `${delay}s`;
        element.style.animationDuration = `${duration}s`;
    });
}

// Custom cursor effects for interactive elements
function initCustomCursorEffects() {
    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;
    
    // Create cursor element only if it doesn't exist
    let cursor = document.querySelector('.custom-cursor');
    
    if (!cursor) {
        cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        cursor.style.position = 'fixed';
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.borderRadius = '50%';
        cursor.style.border = '2px solid var(--primary-color)';
        cursor.style.transform = 'translate(-50%, -50%)';
        cursor.style.pointerEvents = 'none';
        cursor.style.zIndex = '9999';
        cursor.style.transition = 'width 0.2s, height 0.2s, background-color 0.2s, opacity 0.2s';
        cursor.style.opacity = '0';
        document.body.appendChild(cursor);
    }
    
    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = '1';
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    });
    
    // Hide cursor when it leaves the window
    document.addEventListener('mouseout', () => {
        cursor.style.opacity = '0';
    });
    
    // Interactive elements that will change cursor style
    const interactiveElements = document.querySelectorAll('a, button, .faq-header, .card, .support-card, .exchanger-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.backgroundColor = 'rgba(94, 114, 235, 0.1)';
            cursor.style.border = '2px solid var(--primary-color)';
            cursor.style.mixBlendMode = 'difference';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = 'transparent';
            cursor.style.border = '2px solid var(--primary-color)';
            cursor.style.mixBlendMode = 'normal';
        });
    });
}

// Initialize FAQ accordion custom behavior
function initFaqAccordion() {
    const faqHeaders = document.querySelectorAll('.faq-header');
    
    faqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Toggle aria-expanded attribute
            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            header.setAttribute('aria-expanded', !isExpanded);
            
            // Animate the icon
            const icon = header.querySelector('i');
            if (icon) {
                if (isExpanded) {
                    icon.style.transform = 'rotate(0deg)';
                } else {
                    icon.style.transform = 'rotate(180deg)';
                }
            }
        });
    });
}

// Add event listeners for specific page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize any page-specific functionality
    
    // Exchanger page filters
    const filterDropdowns = document.querySelectorAll('.filter-dropdown');
    filterDropdowns.forEach(dropdown => {
        dropdown.addEventListener('change', () => {
            // This would typically filter the results
            // For demo purposes, we'll just add a visual effect
            const exchangerCards = document.querySelectorAll('.exchanger-card');
            exchangerCards.forEach(card => {
                card.style.opacity = '0.7';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 500);
            });
        });
    });
    
    // Contact form validation (simplified)
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Animation to indicate submission
            const btn = contactForm.querySelector('button[type="submit"]');
            btn.innerHTML = '<i class="fas fa-check me-2"></i> Message Sent';
            btn.classList.add('btn-success');
            btn.disabled = true;
            
            // In a real implementation, you would send the form data to a server here
            
            // Reset form after delay
            setTimeout(() => {
                contactForm.reset();
                btn.innerHTML = '<i class="fas fa-paper-plane me-2"></i> Send Message';
                btn.classList.remove('btn-success');
                btn.disabled = false;
            }, 3000);
        });
    }
});

// Create a global function to add shine effect to elements
function addShineEffect(element) {
    element.addEventListener('mousemove', (e) => {
        const x = e.offsetX;
        const y = e.offsetY;
        
        // Create shine effect
        const shine = document.createElement('div');
        shine.classList.add('shine-effect');
        shine.style.position = 'absolute';
        shine.style.top = `${y}px`;
        shine.style.left = `${x}px`;
        shine.style.width = '10px';
        shine.style.height = '10px';
        shine.style.borderRadius = '50%';
        shine.style.background = 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)';
        shine.style.pointerEvents = 'none';
        shine.style.zIndex = '10';
        shine.style.transform = 'translate(-50%, -50%)';
        shine.style.animation = 'shine-fade 1s forwards';
        
        element.appendChild(shine);
        
        // Remove shine effect after animation
        setTimeout(() => {
            shine.remove();
        }, 1000);
    });
}

// Add a CSS animation for the shine effect
const style = document.createElement('style');
style.textContent = `
    @keyframes shine-fade {
        0% { width: 10px; height: 10px; opacity: 1; }
        100% { width: 100px; height: 100px; opacity: 0; }
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
    }
    
    @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
        100% { transform: translateY(0px); }
    }
    
    @keyframes fadeIn {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Apply shine effect to buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn-primary, .btn-success, .submit-btn, .contact-btn, .view-profile-btn, .search-btn');
    buttons.forEach(button => {
        addShineEffect(button);
    });
});

// Function to handle animations on scroll
function animateOnScroll() {
    const sections = document.querySelectorAll('section, header');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                
                // Add floating animation to cards inside the section
                const cards = entry.target.querySelectorAll('.card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate-float');
                    }, index * 100); // Stagger the animation
                });
                
                // Only observe once
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Ensure dark mode is always enabled
function ensureDarkMode() {
    // Set dark mode as default and only theme
    document.documentElement.classList.add('dark-mode');
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    
    // Remove any theme toggle buttons that might exist
    const themeToggles = document.querySelectorAll('.theme-toggle');
    themeToggles.forEach(toggle => {
        toggle.style.display = 'none';
    });
}

// Function for smooth scrolling on anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize Bootstrap tooltips
function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Setup 3D tilt effect on cards
function setupCardTilt() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', cardTiltEffect);
        card.addEventListener('mouseleave', function(e) {
            this.style.transform = `translateY(0) rotate3d(0, 0, 0, 0deg)`;
            this.style.transition = 'all 0.5s ease';
        });
    });
    
    function cardTiltEffect(e) {
        const card = this;
        const cardRect = card.getBoundingClientRect();
        const cardWidth = cardRect.width;
        const cardHeight = cardRect.height;
        
        // Calculate mouse position relative to card center
        const centerX = cardRect.left + cardWidth / 2;
        const centerY = cardRect.top + cardHeight / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        // Calculate rotation angle (limited to max 10 degrees)
        const rotateY = (mouseX / (cardWidth / 2)) * 5; // Max 5 degrees
        const rotateX = -(mouseY / (cardHeight / 2)) * 5; // Max 5 degrees
        
        // Apply transformation
        card.style.transition = 'transform 0.1s ease';
        card.style.transform = `translateY(-5px) rotate3d(${rotateX}, ${rotateY}, 0, ${Math.sqrt(rotateX*rotateX + rotateY*rotateY)}deg)`;
    }
}

// Add parallax effect to hero section
function setupParallaxEffect() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        // Move background slightly as user scrolls
        heroSection.style.backgroundPosition = `50% ${scrollPosition * 0.4}px`;
        
        // Add parallax to hero content
        const heroContent = heroSection.querySelector('.row');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrollPosition * 0.1}px)`;
        }
    });
    
    // Add subtle mouse move effect to hero section
    document.addEventListener('mousemove', function(e) {
        if (!isElementInViewport(heroSection)) return;
        
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        heroSection.style.transform = `perspective(1000px) rotateX(${mouseY * 2}deg) rotateY(${mouseX * 2}deg)`;
    });
}

// Helper function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= -rect.height &&
        rect.left >= -rect.width &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + rect.height &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) + rect.width
    );
}

// Add glowing effects to primary elements
function setupGlowingEffects() {
    // Add glowing effect to primary buttons
    const primaryButtons = document.querySelectorAll('.btn-primary');
    primaryButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.background = `radial-gradient(circle at ${x}px ${y}px, var(--secondary-color), var(--primary-color))`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.background = '';
        });
    });
    
    // Add subtle pulse to icon wrappers
    const iconWrappers = document.querySelectorAll('.icon-wrapper');
    iconWrappers.forEach(icon => {
        icon.style.animation = 'pulse 2s infinite';
    });
}

// Add theme toggle button to the navbar
function addThemeToggleButton() {
    // This function is now disabled to maintain dark mode only
    // Left here for backward compatibility
    return;
}

// Call this function after DOM is loaded
window.addEventListener('load', addThemeToggleButton);

// Add noise texture to background for more depth
function addNoiseTexture() {
    const noise = document.createElement('div');
    noise.className = 'noise-overlay';
    
    const style = document.createElement('style');
    style.textContent = `
        .noise-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QkEBgIlCUh+9QAAAhtJREFUaN7tmU12wiAQx8cMtAuXXKbUE7T3ad0XOj1B9QQtJ8CcpO0NimfoUhd2oZiUgFAS/ABa+y+EZN7M/GYekARCSH0C+AEs6LoA+GaMVcl+bxZ02ePpFCmlYIxZDwb0LiICILpUQRAEIAmCJEnuQoUQOBQiTVO8Wi1tDcIYWxFC1Ifm83msZ57JJEnCjxgxojLTNIXr9WprTGwCMVkmMMaurYrneXcjQhg5Q4wQItq2R4jjGBZFAYIgAFVVYZqm7nfOOYzjOE/TlF4ul+N2u31Fij4jAcvlEler1aP5DlZYaxXP85AQAhDR+Q1UjZfZ2+K4aBWg9iyGc3AcDGrPeZCE9mqK2uu6DsMwhGmaQNd1jzWPXKCCIM6TlhACpS+02Wxcj6PN64Tv+0j5lZfrOm+HLzwUjsE9x+Px3SJiSoHiOIb7/R6naXq7g6qqQNM06LruI0NZtpUAOA6YYcuybMbhcDBOp9ObMQf6QbZtw+12e/8UvU2gJEm4bG5ZFk5ufkzTFM7n850QBkP4vt/IELkBc85bmxz7kJVlCcMwFOsbNwJRi2CdUmrxePhzEb0LZBgGapomvBk/2NvbORCqqu5GoKoqqq1N13U4e2X1fR/JJmx1QNd1f5L1D8fjEc1w2SWI5qOzC07lZqwUHtflIcTY9fHZ1rVDCKJNr06L11I8oX2/J9AHYIFGvgB8CyF+AeauhuDZ6t8EAAAAAElFTkSuQmCC');
            opacity: 0.03;
            z-index: 9999;
            pointer-events: none;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(noise);
}

// Add this to enhance the dark theme feel
window.addEventListener('load', addNoiseTexture); 