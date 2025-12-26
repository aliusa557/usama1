// Admin Credentials (stored in memory)
const ADMIN_EMAIL = "rayusamajaat@gmail.com";
const ADMIN_PASSWORD = "DiaUsa786?";
let isLoggedIn = false;
let editMode = false;

// Content storage object
let contentData = {};

// Initialize on page load
document.addEventListener("DOMContentLoaded", function() {
    createParticles();
    initScrollEffects();
    loadStoredContent();
    
    // Typing animation
    typeWriter();
});

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Scroll effects
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    const scrollTop = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            scrollTop.style.display = 'block';
        } else {
            navbar.classList.remove('scrolled');
            scrollTop.style.display = 'none';
        }
        
        // Animate skill bars on scroll
        animateSkillBars();
    });
}

// Animate skill progress bars
function animateSkillBars() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            const progressBar = card.querySelector('.skill-progress-bar');
            if (progressBar && !progressBar.classList.contains('animated')) {
                progressBar.classList.add('animated');
            }
        }
    });
}

// Typing animation effect
let typingText = "Full Stack .NET Developer";
let typingIndex = 0;
let typingElement;

function typeWriter() {
    typingElement = document.querySelector('.typing-animation');
    if (!typingElement) return;
    
    const originalText = typingElement.textContent;
    typingText = originalText;
    typingElement.textContent = '';
    
    function type() {
        if (typingIndex < typingText.length) {
            typingElement.textContent += typingText.charAt(typingIndex);
            typingIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(() => {
                typingIndex = 0;
                typingElement.textContent = '';
                type();
            }, 3000);
        }
    }
    
    type();
}

// Toggle mobile menu
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
}

// Login Modal Functions
function openLoginModal() {
    document.getElementById('loginModal').classList.add('active');
}

function closeLoginModal() {
    document.getElementById('loginModal').classList.remove('active');
    document.getElementById('errorMessage').textContent = '';
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        isLoggedIn = true;
        closeLoginModal();
        showAdminPanel();
        showSuccessMessage('Login successful! You can now edit content.');
    } else {
        errorMessage.textContent = 'Invalid email or password!';
    }
}

// Show admin panel
function showAdminPanel() {
    const adminPanel = document.getElementById('adminPanel');
    const loginBtn = document.querySelector('.login-btn');
    
    adminPanel.classList.add('active');
    loginBtn.innerHTML = '<i class="fas fa-user-check"></i> Admin';
    loginBtn.style.background = 'linear-gradient(45deg, #27ae60, #2ecc71)';
}

// Logout
function logout() {
    isLoggedIn = false;
    editMode = false;
    
    const adminPanel = document.getElementById('adminPanel');
    const loginBtn = document.querySelector('.login-btn');
    
    adminPanel.classList.remove('active');
    loginBtn.innerHTML = '<i class="fas fa-user"></i> Login';
    loginBtn.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
    
    // Disable editing
    disableEdit();
    showSuccessMessage('Logged out successfully!');
}

// Enable edit mode
function enableEdit() {
    if (!isLoggedIn) {
        alert('Please login first!');
        return;
    }
    
    editMode = true;
    const editableElements = document.querySelectorAll('[data-field]');
    
    editableElements.forEach(element => {
        element.contentEditable = true;
        element.style.outline = '2px dashed #667eea';
    });
    
    document.querySelector('.edit-btn').style.display = 'none';
    document.querySelector('.save-btn').style.display = 'block';
    
    showSuccessMessage('Edit mode enabled! Click on any text to edit.');
}

// Disable edit mode
function disableEdit() {
    editMode = false;
    const editableElements = document.querySelectorAll('[data-field]');
    
    editableElements.forEach(element => {
        element.contentEditable = false;
        element.style.outline = 'none';
    });
    
    if (isLoggedIn) {
        document.querySelector('.edit-btn').style.display = 'block';
        document.querySelector('.save-btn').style.display = 'none';
    }
}

// Save changes
function saveChanges() {
    const editableElements = document.querySelectorAll('[data-field]');
    
    editableElements.forEach(element => {
        const fieldName = element.getAttribute('data-field');
        contentData[fieldName] = element.textContent || element.innerHTML;
    });
    
    // Store in localStorage
    localStorage.setItem('portfolioContent', JSON.stringify(contentData));
    
    disableEdit();
    showSuccessMessage('Changes saved successfully!');
}

// Load stored content
function loadStoredContent() {
    const stored = localStorage.getItem('portfolioContent');
    if (stored) {
        contentData = JSON.parse(stored);
        
        Object.keys(contentData).forEach(fieldName => {
            const element = document.querySelector(`[data-field="${fieldName}"]`);
            if (element) {
                element.textContent = contentData[fieldName];
            }
        });
    }
}

// Show success message
function showSuccessMessage(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(45deg, #27ae60, #2ecc71);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    notification.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Hire Me Action
function hireMeAction() {
    const email = "rayusamajaat@gmail.com";
    const subject = "Hiring Request";
    const body = "Hello Usama,%0D%0A%0D%0AI would like to hire you for a project.%0D%0A%0D%0ABest regards";
    
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
}

// Download CV
function downloadCV() {
    const cvUrl = "https://github.com/aliusa557/usama/raw/main/CV.UsamaMehboob.pdf";
    
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = "CV.UsamaMehboob.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Let's Chat Action
function letsChatAction() {
    const choice = confirm("Click OK for WhatsApp or Cancel for Email");
    
    if (choice) {
        // WhatsApp
        const whatsappNumber = "923184206938";
        const message = "Hello! I'd like to chat about a project.";
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    } else {
        // Email
        const email = "rayusamajaat@gmail.com";
        const subject = "Chat Request";
        const body = "Hello Usama,%0D%0A%0D%0AI'd like to discuss a project with you.%0D%0A%0D%0ABest regards";
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    }
}

// Close modal on outside click
window.addEventListener('click', function(event) {
    const modal = document.getElementById('loginModal');
    if (event.target === modal) {
        closeLoginModal();
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            const menu = document.getElementById('menu');
            if (menu.classList.contains('active')) {
                menu.classList.remove('active');
            }
        }
    });
});

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);
// Update current year and date/time in footer
function updateDateTime() {
    const now = new Date();
    
    // Update year
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = now.getFullYear();
    }
    
    // Update date and time
    const dateTimeElement = document.getElementById('currentDateTime');
    if (dateTimeElement) {
        const options = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        dateTimeElement.textContent = now.toLocaleString('en-US', options);
    }
}

// Call on page load
updateDateTime();

// Update every second
setInterval(updateDateTime, 1000);