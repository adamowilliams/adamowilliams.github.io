// Portfolio JavaScript - Enhanced functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initializeNavigation();
    initializeScrollAnimations();
    initializeProjectAnimations();
    initializeProfileImage();
    initializeContactForm();
    initializeTheme();
});

// Smooth scrolling navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
            
            // Add active state
            navLinks.forEach(nl => nl.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = ['home', 'projects', 'skills', 'contact'];
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
                current = section;
            }
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Animate projects on scroll
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all projects
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        observer.observe(project);
    });
    
    // Observe skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        category.style.animationDelay = `${index * 0.1}s`;
        observer.observe(category);
    });
}

// Enhanced project interactions
function initializeProjectAnimations() {
    const projects = document.querySelectorAll('.project');
    
    projects.forEach(project => {
        // Add click to expand functionality
        const title = project.querySelector('h3');
        const description = project.querySelector('.project-description');
        
        title.addEventListener('click', function() {
            const isExpanded = project.classList.contains('expanded');
            
            // Close all other expanded projects
            projects.forEach(p => p.classList.remove('expanded'));
            
            if (!isExpanded) {
                project.classList.add('expanded');
                description.style.maxHeight = description.scrollHeight + 'px';
            } else {
                project.classList.remove('expanded');
                description.style.maxHeight = '4rem';
            }
        });
        
        // Tech tag click events
        const techTags = project.querySelectorAll('.tech-tag');
        techTags.forEach(tag => {
            tag.addEventListener('click', function() {
                const tech = this.textContent;
                showTechInfo(tech);
            });
        });
    });
}

// Show tech information modal (simplified)
function showTechInfo(tech) {
    const techInfo = {
        'React': 'A JavaScript library for building user interfaces',
        'Node.js': 'JavaScript runtime built on Chrome\'s V8 JavaScript engine',
        'Python': 'High-level programming language for backend development',
        'Vue.js': 'Progressive JavaScript framework for building UIs',
        'TypeScript': 'Typed superset of JavaScript',
        'MongoDB': 'NoSQL document database',
        'PostgreSQL': 'Advanced open source relational database',
        'Express': 'Fast, unopinionated web framework for Node.js',
        'Django': 'High-level Python web framework',
        'Next.js': 'React framework for production applications',
        'Tailwind CSS': 'Utility-first CSS framework'
    };
    
    const info = techInfo[tech] || 'Technology used in development';
    
    // Create simple tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'tech-tooltip';
    tooltip.textContent = info;
    tooltip.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #2c3e50;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 1000;
        max-width: 300px;
        text-align: center;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        animation: fadeIn 0.3s ease;
    `;
    
    document.body.appendChild(tooltip);
    
    // Remove tooltip after 3 seconds
    setTimeout(() => {
        tooltip.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(tooltip);
        }, 300);
    }, 3000);
    
    // Add CSS for animations if not present
    if (!document.getElementById('tooltip-styles')) {
        const style = document.createElement('style');
        style.id = 'tooltip-styles';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            }
            @keyframes fadeOut {
                from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                to { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Profile image interactions
function initializeProfileImage() {
    const profileImage = document.querySelector('.profile-image');
    
    profileImage.addEventListener('click', function() {
        this.style.animation = 'bounce 0.6s ease';
        setTimeout(() => {
            this.style.animation = '';
        }, 600);
    });
    
    // Add bounce animation CSS
    if (!document.getElementById('bounce-styles')) {
        const style = document.createElement('style');
        style.id = 'bounce-styles';
        style.textContent = `
            @keyframes bounce {
                0%, 20%, 60%, 100% { transform: translateY(0) scale(1); }
                40% { transform: translateY(-10px) scale(1.05); }
                80% { transform: translateY(-5px) scale(1.02); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize contact functionality
function initializeContactForm() {
    // Add click tracking for contact buttons
    const contactButtons = document.querySelectorAll('.profile-btn, .project-link');
    
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Track clicks (you can extend this for analytics)
            const buttonText = this.textContent;
            console.log(`Button clicked: ${buttonText}`);
        });
    });
    
    // Email button special handling
    const emailButtons = document.querySelectorAll('a[href^="mailto:"]');
    emailButtons.forEach(button => {
        button.addEventListener('click', function() {
            showNotification('Opening email client...');
        });
    });
}

// Initialize theme switching (optional feature)
function initializeTheme() {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    
    // Create theme toggle button (optional)
    createThemeToggle();
    
    // Apply theme
    applyTheme(savedTheme);
}

// Create theme toggle button
function createThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '🌓';
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Toggle theme');
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: #20b2aa;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    themeToggle.addEventListener('click', toggleTheme);
    themeToggle.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
    });
    themeToggle.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    });
    
    document.body.appendChild(themeToggle);
}

// Toggle between light and dark themes
function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    applyTheme(newTheme);
    
    showNotification(`Switched to ${newTheme} theme`);
}

// Apply theme styles
function applyTheme(theme) {
    if (!document.getElementById('theme-styles')) {
        const style = document.createElement('style');
        style.id = 'theme-styles';
        style.textContent = `
            [data-theme="dark"] {
                --bg-color: #1a1a1a;
                --card-bg: #2d2d2d;
                --text-color: #e0e0e0;
                --text-secondary: #b0b0b0;
                --border-color: #404040;
            }
            
            [data-theme="dark"] body {
                background: var(--bg-color);
                color: var(--text-color);
            }
            
            [data-theme="dark"] .profile-section,
            [data-theme="dark"] .content-section {
                background: var(--card-bg);
                color: var(--text-color);
            }
            
            [data-theme="dark"] .project {
                border-bottom-color: var(--border-color);
            }
            
            [data-theme="dark"] .current-role {
                border-bottom-color: var(--border-color);
            }
            
            [data-theme="dark"] .skill-category {
                background: #363636;
            }
            
            [data-theme="dark"] .profile-btn {
                background: #404040;
                border-color: #606060;
                color: var(--text-color);
            }
        `;
        document.head.appendChild(style);
    }
}

// Show notification messages
function showNotification(message) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: #20b2aa;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
    
    // Add slide animations if not present
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Typing animation for intro text
function initializeTypingAnimation() {
    const introElements = document.querySelectorAll('.intro-text p');
    
    introElements.forEach((element, index) => {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';
        
        setTimeout(() => {
            typeText(element, text, 50);
        }, index * 1000);
    });
}

// Type text animation
function typeText(element, text, speed) {
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

// Scroll progress indicator
function initializeScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: #20b2aa;
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Easter egg - Konami code
function initializeEasterEgg() {
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    let userInput = [];
    
    document.addEventListener('keydown', function(e) {
        userInput.push(e.keyCode);
        
        if (userInput.length > konamiCode.length) {
            userInput.shift();
        }
        
        if (JSON.stringify(userInput) === JSON.stringify(konamiCode)) {
            activateEasterEgg();
            userInput = [];
        }
    });
}

// Activate easter egg
function activateEasterEgg() {
    showNotification('🎉 Easter egg activated! You found the secret!');
    
    // Add rainbow animation to profile image
    const profileImage = document.querySelector('.profile-image');
    profileImage.style.animation = 'rainbow 2s infinite';
    
    // Add rainbow animation CSS
    if (!document.getElementById('rainbow-styles')) {
        const style = document.createElement('style');
        style.id = 'rainbow-styles';
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Remove after 5 seconds
    setTimeout(() => {
        profileImage.style.animation = '';
    }, 5000);
}

// Initialize all optional features
function initializeAdvancedFeatures() {
    initializeScrollProgress();
    initializeEasterEgg();
    
    // Optional: Initialize typing animation (uncomment if desired)
    // initializeTypingAnimation();
}

// Call advanced features
initializeAdvancedFeatures();