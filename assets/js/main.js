// Enhanced Salon Website Class
class SalonWebsite {
    constructor() {
        this.mobileToggle = document.getElementById('mobileToggle');
        this.mobileMenu = document.getElementById('mobileMenu');
        this.navItems = document.querySelectorAll('.nav-item');
        this.sections = document.querySelectorAll('.section');
        this.ctaButton = document.getElementById('bookNow');
        this.serviceCards = document.querySelectorAll('.service-card');
        this.currentSection = 'home';
        this.isMenuOpen = false;

        this.init();
    }

    init() {
        this.bindEvents();
        this.handleResize();
        this.animateOnScroll();
        this.loadAnimations();

        // Set initial ARIA attributes
        this.mobileToggle.setAttribute('aria-expanded', 'false');
    }

    bindEvents() {
        // Mobile menu toggle
        this.mobileToggle.addEventListener('click', () => this.toggleMobileMenu());

        // Navigation items
        this.navItems.forEach(item => {
            item.addEventListener('click', (e) => this.handleNavigation(e));
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    this.handleNavigation(e);
                }
            });
        });

        // CTA button
        this.ctaButton.addEventListener('click', () => this.handleBooking());
        this.ctaButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                this.handleBooking();
            }
        });

        // Service cards
        this.serviceCards.forEach(card => {
            card.addEventListener('click', () => this.handleServiceClick(card));
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    this.handleServiceClick(card);
                }
            });
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
        });

        // Window resize with debounce
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.handleResize();
            }, 250);
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMobileMenu();
                this.mobileToggle.focus();
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !e.target.closest('.mobile-menu') && !e.target.closest('.mobile-toggle')) {
                this.closeMobileMenu();
            }
        });

        // Social media links
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleSocialClick(e));
        });
    }

    toggleMobileMenu() {
        if (this.isMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        this.mobileMenu.classList.add('active');
        this.mobileToggle.classList.add('active');
        this.isMenuOpen = true;
        document.body.style.overflow = 'hidden';
        this.mobileToggle.setAttribute('aria-expanded', 'true');

        // Force header transparency
        const header = document.querySelector('.header');
        header.style.background = 'transparent';
        header.style.backgroundImage = 'none';
        header.style.boxShadow = 'none';

        // Focus first menu item when opened
        setTimeout(() => {
            const firstMenuItem = this.mobileMenu.querySelector('.nav-item');
            if (firstMenuItem) firstMenuItem.focus();
        }, 100);
    }

    closeMobileMenu() {
        this.mobileMenu.classList.remove('active');
        this.mobileToggle.classList.remove('active');
        this.isMenuOpen = false;
        document.body.style.overflow = '';
        this.mobileToggle.setAttribute('aria-expanded', 'false');

        // Restore original header styles
        const header = document.querySelector('.header');
        header.style.background = '';
        header.style.backgroundImage = '';
        header.style.boxShadow = '';
    }

    handleNavigation(e) {
        const section = e.target.getAttribute('data-section');

        // Close mobile menu if open
        if (this.isMenuOpen) {
            this.closeMobileMenu();
        }

        // Update active states
        this.navItems.forEach(item => item.classList.remove('active'));
        e.target.classList.add('active');

        // Show selected section
        this.showSection(section);

        // Add click animation
        this.addClickAnimation(e.target);
    }

    showSection(sectionId) {
        // Hide all sections
        this.sections.forEach(section => {
            section.classList.remove('active');
        });

        // Show selected section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionId;

            // Scroll to top of section
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            // Animate elements in the new section
            this.animateSection(targetSection);
        }
    }

    animateSection(section) {
        const elements = section.querySelectorAll('.loading:not(.loaded)');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('loaded');
            }, index * 100);
        });
    }

    addClickAnimation(element) {
        element.style.transform = 'scale(0.95)';
        setTimeout(() => {
            element.style.transform = '';
        }, 150);
    }

    handleServiceClick(card) {
        // Add service selection animation
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);

        const serviceName = card.querySelector('.service-title').textContent;
        this.showNotification(`${serviceName} selected! Contact us to book this service.`);
    }

    handleSocialClick(e) {
        // Show animation or notification without stopping navigation
        const socialName = e.currentTarget.querySelector('.social-name').textContent;
        this.addClickAnimation(e.currentTarget);
        this.showNotification(`Opening ${socialName}...`);
    }

    handleBooking() {
        // Add button animation
        this.ctaButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.ctaButton.style.transform = '';
        }, 150);

        // Show booking modal or notification
        this.showBookingModal();
    }

    showBookingModal() {
        // Create booking modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
            `;
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'modalTitle');

        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 12px;
            max-width: 500px;
            width: 90%;
            text-align: center;
            animation: slideInUp 0.3s ease;
            `;

        modalContent.innerHTML = `
            <h2 id="modalTitle" style="color: #2d3748; margin-bottom: 20px; font-size: 28px;">Book Your Appointment</h2>
            <p style="color: #718096; margin-bottom: 30px; line-height: 1.6;">
                Ready to transform your look? Contact us to schedule your appointment with our expert stylists.
            </p>
            <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <button id="callBtn" style="background: linear-gradient(135deg, #FF007B 0%, #C321AB 50%, #FF2F33 100%); color: white; padding: 12px 24px; border: none; border-radius: 25px; font-weight: 600; cursor: pointer;"><i class="fa-solid fa-phone"></i> Call Now</button>
                <button id="whatsappBtn" style="background: #25d366; color: white; padding: 12px 24px; border: none; border-radius: 25px; font-weight: 600; cursor: pointer;"><i class="fa-brands fa-whatsapp"></i> WhatsApp</button>
                <button id="closeModal" style="background: #e2e8f0; color: #4a5568; padding: 12px 24px; border: none; border-radius: 25px; font-weight: 600; cursor: pointer;">Close</button>
            </div>
            `;

        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Add modal animations
        if (!document.querySelector('#modal-styles')) {
            const style = document.createElement('style');
            style.id = 'modal-styles';
            style.textContent = `
                @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
                }
                @keyframes slideInUp {
                from { transform: translateY(50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }

        // Modal event listeners
        const closeModal = () => {
            modal.style.animation = 'fadeIn 0.3s ease reverse';
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
                this.ctaButton.focus();
            }, 300);
        };

        const callBtn = modal.querySelector('#callBtn');
        const whatsappBtn = modal.querySelector('#whatsappBtn');
        const closeModalBtn = modal.querySelector('#closeModal');

        closeModalBtn.addEventListener('click', closeModal);
        callBtn.addEventListener('click', () => {
            const phoneNumber = '+94703584172';
            const formattedNumber = formatPhoneNumber(phoneNumber); // Add formatting if needed

            this.showNotification('📞 Opening phone dialer...');

            try {
                window.location.href = `tel:${phoneNumber}`;

                // Fallback if dialer doesn't open
                setTimeout(() => {
                    if (!document.hidden) {
                        this.showNotification(`📞 Couldn't launch dialer. Please call: ${formattedNumber}`);
                    }
                }, 1200);
            } catch (e) {
                this.showNotification(`📞 Please manually call: ${formattedNumber}`);
            }
            closeModal();
        });

        whatsappBtn.addEventListener('click', () => {
            const phoneNumber = '+94703584172';
            const defaultMessage = "Hi there! I'm reaching out from your website. Could you help me with...";

            this.showNotification('💬 Launching WhatsApp...');

            try {
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
                const newWindow = window.open(whatsappUrl, '_blank');

                // Improved detection if WhatsApp didn't open
                setTimeout(() => {
                    if (newWindow && newWindow.closed || !document.hidden) {
                        this.showNotification({
                            title: "WhatsApp Not Detected",
                            message: `💬 Let's chat! Save our number: ${formatPhoneNumber(phoneNumber)}`,
                            duration: 5000
                        });
                    }
                }, 1500);
            } catch (e) {
                this.showNotification(`💬 Please message us on WhatsApp: ${formatPhoneNumber(phoneNumber)}`);
            }
            closeModal();
        });

        // Optional helper function to format phone numbers
        function formatPhoneNumber(num) {
            return num.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        }

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Focus trap for modal
        const focusableElements = [callBtn, whatsappBtn, closeModalBtn];
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];

        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });

        // Focus first button when modal opens
        setTimeout(() => {
            firstFocusableElement.focus();
        }, 100);
    }

    showNotification(message) {
        // Remove existing notification if present
        const existingNotification = document.querySelector('.custom-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'custom-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #FF007B 0%, #C321AB 50%, #FF2F33 100%);
            color: white;
            padding: 15px 25px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            font-weight: 600;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
            font-size: 14px;
            `;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'polite');
        notification.textContent = message;

        // Add animation keyframes if not exists
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
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
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    animateOnScroll() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loaded');
                }
            });
        }, { threshold: 0.1 });

        // Observe elements for scroll animations
        const animatedElements = document.querySelectorAll('.service-card, .about-card, .social-link');
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    loadAnimations() {
        // Add staggered loading animation to service cards
        setTimeout(() => {
            this.serviceCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('loaded');
                }, index * 100);
            });
        }, 500);
    }

    handleResize() {
        // Close mobile menu on desktop
        if (window.innerWidth >= 768 && this.isMenuOpen) {
            this.closeMobileMenu();
        }
    }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const salonApp = new SalonWebsite();

    // Add page load animations
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('loaded');
        }, index * 50);
    });

    // Preload hover states for better mobile experience
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
});

// Function to update copyright year automatically
function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('currentYear');

    if (yearElement) {
        yearElement.textContent = currentYear;
    }
}

// Update year when page loads
document.addEventListener('DOMContentLoaded', updateCopyrightYear);

// Optional: Update year every minute (in case page stays open past midnight on New Year's Eve)
setInterval(updateCopyrightYear, 60000);

// Footer link click handlers (if needed)
document.querySelectorAll('.footer-links a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);

        // Trigger section logic through nav item
        const navItem = document.querySelector(`.nav-item[data-section="${targetId}"]`);
        if (navItem) {
            navItem.click();

            // Delay scrolling until section is visible
            setTimeout(() => {
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 300); // Allow some time for the section to be activated
        }
    });
});
