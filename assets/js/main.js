class ProfessionalSalonWebsite {
    constructor() {
        this.header = document.getElementById('header');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section');
        this.bookingButtons = document.querySelectorAll('[data-service]');
        this.modal = document.getElementById('bookingModal');
        this.mobileToggle = document.getElementById('mobileToggle');
        this.currentSection = 'home';
        this.scrollToTopBtn = document.getElementById('scrollToTop');

        this.init();
    }

    init() {
        this.bindEvents();
        this.handleScroll();
        this.animateOnScroll();
        this.setupSmoothScroll();
    }

    bindEvents() {
        // Navigation
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.handleNavigation(e);
                this.closeMobileMenu(); // Close mobile menu when clicking nav links
            });
        });

        // Mobile menu toggle
        this.mobileToggle.addEventListener('click', () => this.toggleMobileMenu());

        // Booking buttons
        document.getElementById('bookAppointment').addEventListener('click', (e) => {
            e.preventDefault();
            this.showBookingModal();
        });

        this.bookingButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const service = e.target.getAttribute('data-service');
                this.showBookingModal(service);
            });
        });

        // Modal events
        document.getElementById('callNow').addEventListener('click', () => this.handleCall());
        document.getElementById('whatsappNow').addEventListener('click', () => this.handleWhatsApp());
        document.getElementById('closeModal').addEventListener('click', () => this.hideBookingModal());
        ;

        // Scroll events
        window.addEventListener('scroll', () => this.handleScroll());

        // Close mobile menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMobileMenu();
            }
        });

        // Close modal on outside click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hideBookingModal();
            }
        });

        // Escape key to close modal or mobile menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.modal.classList.contains('active')) {
                    this.hideBookingModal();
                }
                const navMenu = document.getElementById('navMenu');
                if (navMenu.classList.contains('active')) {
                    this.closeMobileMenu();
                }
            }
        });

        // Scroll to top button
        this.scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Show/hide scroll to top button based on scroll position
        window.addEventListener('scroll', () => {
            this.toggleScrollToTopButton();
        });
    }

    toggleScrollToTopButton() {
        if (window.scrollY > 300) {
            this.scrollToTopBtn.classList.add('visible');
        } else {
            this.scrollToTopBtn.classList.remove('visible');
        }
    }

    // Mobile menu methods
    toggleMobileMenu() {
        const navMenu = document.getElementById('navMenu');
        const isActive = navMenu.classList.contains('active');

        if (isActive) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        const navMenu = document.getElementById('navMenu');
        navMenu.classList.add('active');
        this.mobileToggle.classList.add('active');
        this.header.classList.add('mobile-open');
        document.body.classList.add('mobile-menu-open');
        document.body.style.overflow = 'hidden';

        // Add aria attributes for accessibility
        this.mobileToggle.setAttribute('aria-expanded', 'true');
        navMenu.setAttribute('aria-hidden', 'false');
    }

    closeMobileMenu() {
        const navMenu = document.getElementById('navMenu');
        navMenu.classList.remove('active');
        this.mobileToggle.classList.remove('active');
        this.header.classList.remove('mobile-open');
        document.body.classList.remove('mobile-menu-open');
        document.body.style.overflow = '';

        // Update aria attributes
        this.mobileToggle.setAttribute('aria-expanded', 'false');
        navMenu.setAttribute('aria-hidden', 'true');
    }
    handleNavigation(e) {
        e.preventDefault();
        const targetSection = e.target.getAttribute('href').substring(1);

        // Update active nav link
        this.navLinks.forEach(link => link.classList.remove('active'));
        e.target.classList.add('active');

        // Scroll to section
        this.scrollToSection(targetSection);
        this.currentSection = targetSection;
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const headerHeight = this.header.offsetHeight;
            const sectionTop = section.offsetTop - headerHeight;

            window.scrollTo({
                top: sectionTop,
                behavior: 'smooth'
            });
        }
    }

    handleScroll() {
        const scrolled = window.scrollY > 50;
        this.header.classList.toggle('scrolled', scrolled);

        // Update active section based on scroll position
        this.updateActiveSection();

        // Toggle scroll to top button
        this.toggleScrollToTopButton();
    }

    updateActiveSection() {
        const scrollPosition = window.scrollY + this.header.offsetHeight + 100;

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
                this.currentSection = sectionId;
            }
        });
    }

    showBookingModal(service = null) {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        if (service) {
            const modalContent = this.modal.querySelector('.modal-content p');
            modalContent.textContent = `Ready to book your ${service}? Choose your preferred way to get in touch with us.`;
        }
    }

    hideBookingModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    handleCall() {
        const phoneNumber = '+94703584172';
        this.showNotification('📞 Opening phone dialer...', 'success');

        setTimeout(() => {
            window.location.href = `tel:${phoneNumber}`;
        }, 500);

        this.hideBookingModal();
    }

    handleWhatsApp() {
        const phoneNumber = '+94703584172';
        const message = "Hi! I'm interested in booking an appointment at Salon Navodaa. Could you please help me with the available slots?";
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        this.showNotification('💬 Opening WhatsApp...', 'success');

        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
        }, 500);

        this.hideBookingModal();
    }

    setupSmoothScroll() {
        // Enhanced smooth scrolling for all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href !== '#' && href.length > 1) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    this.scrollToSection(targetId);
                }
            });
        });
    }

    animateOnScroll() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.service-card, .contact-item, .about-content, .hero-content');
        animatedElements.forEach((el, index) => {
            el.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s both paused`;
            observer.observe(el);
        });
    }

    showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: ${type === 'success' ? 'var(--primary-gold)' : 'var(--primary-rose)'};
                    color: var(--warm-white);
                    padding: 1rem 1.5rem;
                    border-radius: var(--border-radius-md);
                    box-shadow: var(--shadow-medium);
                    z-index: 10001;
                    font-weight: 600;
                    max-width: 350px;
                    animation: slideInRight 0.3s ease;
                    font-size: 14px;
                `;

        notification.textContent = message;
        document.body.appendChild(notification);

        // Auto remove after 4 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideInRight 0.3s ease reverse';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 4000);
    }
}

// Set current year dynamically
document.getElementById('current-year').textContent = new Date().getFullYear();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ProfessionalSalonWebsite();

    // Add loading animation
    document.body.classList.add('loaded');
    const footerText = document.getElementById('footer-text');
    footerText.classList.add('visible');
});

// Add slideInRight animation
const style = document.createElement('style');
style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            .animate {
                animation-play-state: running !important;
            }
            
            body.loaded {
                overflow-x: hidden;
            }
        `;
document.head.appendChild(style);