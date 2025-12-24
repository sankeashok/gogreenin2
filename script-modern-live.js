// Modern Live JavaScript for GoGreenIn
class GoGreenInLive {
    constructor() {
        this.init();
        this.setupLiveFeatures();
        this.setupAnimations();
        this.setupInteractions();
    }

    init() {
        // Initialize theme
        this.loadTheme();
        
        // Setup smooth scrolling
        this.setupSmoothScrolling();
        
        // Setup intersection observer
        this.setupIntersectionObserver();
        
        // Setup live counters
        this.setupLiveCounters();
        
        // Setup navigation
        this.setupNavigation();
    }

    setupLiveFeatures() {
        // Live status updates
        this.updateLiveStats();
        setInterval(() => this.updateLiveStats(), 30000); // Update every 30 seconds
        
        // Live typing effect
        this.setupTypingEffect();
        
        // Live particles
        this.animateParticles();
    }

    updateLiveStats() {
        const cyclists = document.getElementById('live-cyclists');
        const impact = document.getElementById('live-impact');
        
        if (cyclists && impact) {
            // Simulate live data updates
            const currentCyclists = parseInt(cyclists.textContent);
            const currentImpact = parseInt(impact.textContent.replace('+', ''));
            
            // Random fluctuation to simulate live activity
            const newCyclists = currentCyclists + Math.floor(Math.random() * 10) - 5;
            const newImpact = currentImpact + Math.floor(Math.random() * 3);
            
            cyclists.textContent = Math.max(200, newCyclists);
            impact.textContent = `+${Math.max(0, newImpact)}`;
        }
    }

    setupTypingEffect() {
        const cursor = document.querySelector('.live-cursor');
        if (cursor) {
            setInterval(() => {
                cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
            }, 500);
        }
    }

    animateParticles() {
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            const animateParticle = () => {
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDuration = (15 + Math.random() * 10) + 's';
                particle.style.animationDelay = Math.random() * 5 + 's';
            };
            
            animateParticle();
            setInterval(animateParticle, 20000 + index * 2000);
        });
    }

    setupAnimations() {
        // Animate counters when in view
        this.animateCounters();
        
        // Setup scroll animations
        this.setupScrollAnimations();
        
        // Setup hover effects
        this.setupHoverEffects();
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-number, .impact-number');
        
        const animateCounter = (element) => {
            const target = parseInt(element.dataset.target);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    element.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target.toLocaleString();
                }
            };
            
            updateCounter();
        };
        
        // Intersection observer for counters
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => counterObserver.observe(counter));
    }

    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.stat-card, .milestone-card, .event-card, .impact-card, .feature-card');
        
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            scrollObserver.observe(element);
        });
    }

    setupHoverEffects() {
        // Glow effect for buttons
        const buttons = document.querySelectorAll('.btn-primary-live, .cta-btn-live');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.boxShadow = '0 0 40px rgba(0, 255, 136, 0.5)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.boxShadow = '0 10px 40px rgba(0, 255, 136, 0.2)';
            });
        });
        
        // Ripple effect for CTA button
        const ctaBtn = document.querySelector('.cta-btn-live');
        if (ctaBtn) {
            ctaBtn.addEventListener('click', (e) => {
                const ripple = ctaBtn.querySelector('.btn-ripple');
                if (ripple) {
                    ripple.style.width = '300px';
                    ripple.style.height = '300px';
                    setTimeout(() => {
                        ripple.style.width = '0';
                        ripple.style.height = '0';
                    }, 600);
                }
            });
        }
    }

    setupInteractions() {
        // Event filtering
        this.setupEventFiltering();
        
        // Milestone interactions
        this.setupMilestoneInteractions();
        
        // Video interactions
        this.setupVideoInteractions();
    }

    setupEventFiltering() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const eventCards = document.querySelectorAll('.event-card');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.dataset.filter;
                
                // Filter events with animation
                eventCards.forEach((card, index) => {
                    const category = card.dataset.category;
                    const shouldShow = filter === 'all' || category === filter;
                    
                    setTimeout(() => {
                        if (shouldShow) {
                            card.style.display = 'block';
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(20px)';
                            
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 50);
                        } else {
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(-20px)';
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 300);
                        }
                    }, index * 100);
                });
            });
        });
    }

    setupMilestoneInteractions() {
        const milestoneCards = document.querySelectorAll('.milestone-card');
        
        milestoneCards.forEach(card => {
            card.addEventListener('click', () => {
                const year = card.dataset.year;
                this.showMilestoneDetails(year);
            });
            
            card.addEventListener('mouseenter', () => {
                const glow = card.querySelector('.milestone-glow');
                if (glow) {
                    glow.style.opacity = '0.2';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                const glow = card.querySelector('.milestone-glow');
                if (glow && !glow.classList.contains('active')) {
                    glow.style.opacity = '0';
                }
            });
        });
    }

// Load event data from JSON files
const eventData = {
    2025: {
        title: "17 Years Legacy",
        keyEvents: [
            { name: "17th Anniversary Celebration", url: "https://drive.google.com/drive/folders/1G30nMM-8f7A0kyYcdw6-KDJsxLUGGiHv", date: "Dec 2025" },
            { name: "Sunday's Ride", url: "https://youtube.com/shorts/gFjqLyykyn8", date: "Dec 14, 2025" },
            { name: "Tour-De-Mysore 2025", url: "https://www.facebook.com/reel/1532990601217812", date: "Sep 2025" }
        ]
    },
    2024: {
        title: "Continued Impact",
        keyEvents: [
            { name: "16th Anniversary Ride", url: "", date: "Dec 2024" }
        ]
    },
    2023: {
        title: "15 Years Strong",
        keyEvents: [
            { name: "15th Anniversary Mega Ride", url: "", date: "Dec 2023" }
        ]
    }
};

    showMilestoneDetails(year) {
        const data = eventData[year];
        if (!data) return;
        
        const modal = document.createElement('div');
        modal.className = 'milestone-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${year} - ${data.title}</h2>
                    <button class="modal-close" onclick="this.closest('.milestone-modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="modal-events">
                        ${data.keyEvents.map(event => `
                            <div class="modal-event-item">
                                ${event.url ? `<a href="${event.url}" target="_blank" style="color: var(--primary-live); text-decoration: none;">${event.name}</a>` : event.name}
                                <span class="event-date">${event.date}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="modal-actions">
                        <button class="btn-primary-live" onclick="this.closest('.milestone-modal').remove()">
                            <span class="btn-icon">📖</span>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.8);
            animation: fadeIn 0.3s ease;
        `;
        
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.cssText = `
            background: var(--bg-glass);
            backdrop-filter: blur(20px);
            border: 1px solid var(--primary-live);
            border-radius: 20px;
            padding: 30px;
            max-width: 500px;
            width: 90%;
            color: var(--text-primary);
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        modal.querySelector('.modal-overlay').addEventListener('click', () => {
            document.body.style.overflow = 'auto';
            modal.remove();
        });
    }

    setupVideoInteractions() {
        const videoFloats = document.querySelectorAll('.video-float');
        
        videoFloats.forEach(video => {
            video.addEventListener('mouseenter', () => {
                video.style.transform = 'translateY(-10px) scale(1.05)';
                video.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
            });
            
            video.addEventListener('mouseleave', () => {
                video.style.transform = 'translateY(0) scale(1)';
                video.style.boxShadow = 'none';
            });
        });
    }

    setupSmoothScrolling() {
        // Smooth scrolling for navigation links
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
    }

    setupIntersectionObserver() {
        // Update active navigation based on scroll position
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { threshold: 0.3 });
        
        sections.forEach(section => sectionObserver.observe(section));
    }

    setupLiveCounters() {
        // Real-time counter updates
        const liveCounters = document.querySelectorAll('[data-live-counter]');
        
        liveCounters.forEach(counter => {
            const updateInterval = parseInt(counter.dataset.liveCounter) || 5000;
            const baseValue = parseInt(counter.textContent);
            
            setInterval(() => {
                const variation = Math.floor(Math.random() * 10) - 5;
                const newValue = Math.max(0, baseValue + variation);
                counter.textContent = newValue.toLocaleString();
            }, updateInterval);
        });
    }

    setupNavigation() {
        // Mobile navigation toggle
        const navToggle = document.createElement('button');
        navToggle.className = 'nav-toggle';
        navToggle.innerHTML = '☰';
        navToggle.style.cssText = `
            display: none;
            background: var(--bg-glass);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            color: var(--text-primary);
            padding: 8px 12px;
            cursor: pointer;
            font-size: 18px;
        `;
        
        const navActions = document.querySelector('.nav-actions');
        if (navActions) {
            navActions.insertBefore(navToggle, navActions.firstChild);
        }
        
        // Show/hide mobile toggle based on screen size
        const checkScreenSize = () => {
            if (window.innerWidth <= 768) {
                navToggle.style.display = 'block';
            } else {
                navToggle.style.display = 'none';
            }
        };
        
        window.addEventListener('resize', checkScreenSize);
        checkScreenSize();
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('gogreen-theme');
        const themeIcon = document.querySelector('.theme-icon');
        
        if (savedTheme === 'light') {
            document.body.setAttribute('data-theme', 'light');
            if (themeIcon) themeIcon.textContent = '☀️';
        } else {
            if (themeIcon) themeIcon.textContent = '🌙';
        }
    }
}

// Theme toggle function
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon');
    
    if (body.getAttribute('data-theme') === 'light') {
        body.removeAttribute('data-theme');
        themeIcon.textContent = '🌙';
        localStorage.setItem('gogreen-theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        themeIcon.textContent = '☀️';
        localStorage.setItem('gogreen-theme', 'light');
    }
}

// Live notification system
class LiveNotifications {
    constructor() {
        this.notifications = [];
        this.container = this.createContainer();
    }
    
    createContainer() {
        const container = document.createElement('div');
        container.className = 'live-notifications';
        container.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            z-index: 1500;
            display: flex;
            flex-direction: column;
            gap: 10px;
            pointer-events: none;
        `;
        document.body.appendChild(container);
        return container;
    }
    
    show(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `live-notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            background: var(--bg-glass);
            backdrop-filter: blur(20px);
            border: 1px solid var(--primary-live);
            border-radius: 12px;
            padding: 12px 20px;
            color: var(--text-primary);
            font-size: 14px;
            font-weight: 500;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            pointer-events: auto;
            cursor: pointer;
        `;
        
        this.container.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, duration);
        
        // Click to dismiss
        notification.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main app
    const app = new GoGreenInLive();
    
    // Initialize notifications
    const notifications = new LiveNotifications();
    
    // Show welcome notification
    setTimeout(() => {
        notifications.show('🚴 Welcome to GoGreenIn Live!', 'success', 4000);
    }, 2000);
    
    // Simulate live activity notifications
    const activityMessages = [
        '🌱 New tree planted in Cubbon Park!',
        '🚴 Sunday ride starting in 30 minutes',
        '💧 Lake cleaning drive completed',
        '🎉 New member joined the community',
        '🌍 CO2 reduction milestone achieved'
    ];
    
    setInterval(() => {
        const randomMessage = activityMessages[Math.floor(Math.random() * activityMessages.length)];
        notifications.show(randomMessage, 'info', 3000);
    }, 45000); // Show every 45 seconds
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Performance optimization
window.addEventListener('load', () => {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources
    const criticalImages = [
        'GGI_logo.png',
        'GGI_Campaign2023.png',
        'data/2025/17th Anniversary-2025 Year.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Export for global access
window.GoGreenInLive = GoGreenInLive;
window.toggleTheme = toggleTheme;