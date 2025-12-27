// Admin Credentials (stored in memory)
const ADMIN_EMAIL = "rayusamajaat@gmail.com";
const ADMIN_PASSWORD = "DiaUsa786?";
let isLoggedIn = false;
let editMode = false;

// Content storage object
let contentData = {};
let projects = [];
let currentEditProjectId = null;
let cvFileData = null;

// Initialize on page load
document.addEventListener("DOMContentLoaded", function() {
    createParticles();
    initScrollEffects();
    loadStoredContent();
    loadProjects();
    typeWriter();
    updateDateTime();
    setInterval(updateDateTime, 1000);
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

// Update date and time
function updateDateTime() {
    const now = new Date();
    
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = now.getFullYear();
    }
    
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
    const addProjectBtn = document.getElementById('addProjectBtn');
    
    adminPanel.classList.add('active');
    loginBtn.innerHTML = '<i class="fas fa-user-check"></i> Admin';
    loginBtn.style.background = 'linear-gradient(45deg, #27ae60, #2ecc71)';
    
    if (addProjectBtn) {
        addProjectBtn.classList.add('show');
    }
}

// Logout
function logout() {
    isLoggedIn = false;
    editMode = false;
    
    const adminPanel = document.getElementById('adminPanel');
    const loginBtn = document.querySelector('.login-btn');
    const addProjectBtn = document.getElementById('addProjectBtn');
    
    adminPanel.classList.remove('active');
    loginBtn.innerHTML = '<i class="fas fa-user"></i> Login';
    loginBtn.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
    
    if (addProjectBtn) {
        addProjectBtn.classList.remove('show');
    }
    
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
    
    // Show image upload buttons
    document.getElementById('profileImageContainer').classList.add('edit-mode');
    document.getElementById('aboutImageContainer').classList.add('edit-mode');
    
    // Show CV upload section
    document.getElementById('cvUploadSection').classList.add('show');
    
    // Show project action buttons
    document.querySelectorAll('.project-actions').forEach(el => el.style.display = 'flex');
    
    document.querySelector('.edit-btn').style.display = 'none';
    document.querySelector('.save-btn').style.display = 'block';
    
    showSuccessMessage('Edit mode enabled! Click on any text to edit or upload images.');
}

// Disable edit mode
function disableEdit() {
    editMode = false;
    const editableElements = document.querySelectorAll('[data-field]');
    
    editableElements.forEach(element => {
        element.contentEditable = false;
        element.style.outline = 'none';
    });
    
    // Hide image upload buttons
    document.getElementById('profileImageContainer').classList.remove('edit-mode');
    document.getElementById('aboutImageContainer').classList.remove('edit-mode');
    
    // Hide CV upload section
    document.getElementById('cvUploadSection').classList.remove('show');
    
    // Hide project action buttons
    document.querySelectorAll('.project-actions').forEach(el => el.style.display = 'none');
    
    if (isLoggedIn) {
        document.querySelector('.edit-btn').style.display = 'block';
        document.querySelector('.save-btn').style.display = 'none';
    }
}

// Save changes to PHP backend
async function saveChanges() {
    const editableElements = document.querySelectorAll('[data-field]');
    
    editableElements.forEach(element => {
        const fieldName = element.getAttribute('data-field');
        contentData[fieldName] = element.textContent || element.innerHTML;
    });
    
    // Store images
    contentData.profileImage = document.getElementById('profileImg').src;
    contentData.aboutImage = document.getElementById('aboutImg').src;
    
    try {
        const response = await fetch('save_data.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `action=save_content&content=${encodeURIComponent(JSON.stringify(contentData))}`
        });
        
        const result = await response.json();
        if (result.success) {
            disableEdit();
            showSuccessMessage('Changes saved successfully!');
        } else {
            showSuccessMessage('Error saving changes. Please try again.');
        }
    } catch (error) {
        console.error('Error saving content:', error);
        showSuccessMessage('Error saving changes. Please try again.');
    }
}

// Load stored content from PHP backend
async function loadStoredContent() {
    try {
        const response = await fetch('save_data.php?action=load_content');
        const data = await response.json();
        
        if (data && Object.keys(data).length > 0) {
            contentData = data;
            
            Object.keys(contentData).forEach(fieldName => {
                const element = document.querySelector(`[data-field="${fieldName}"]`);
                if (element) {
                    element.textContent = contentData[fieldName];
                }
            });
            
            // Load images
            if (contentData.profileImage) {
                document.getElementById('profileImg').src = contentData.profileImage;
            }
            if (contentData.aboutImage) {
                document.getElementById('aboutImg').src = contentData.aboutImage;
            }
        }
    } catch (error) {
        console.log('No stored content found, using defaults');
    }
}

// Handle image upload
function handleImageUpload(event, imgId) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById(imgId).src = e.target.result;
            showSuccessMessage('Image uploaded! Click "Save Changes" to keep it.');
        };
        reader.readAsDataURL(file);
    }
}

// Handle CV file upload
document.getElementById('cvFileInput').addEventListener('change', async function(event) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = async function(e) {
            cvFileData = e.target.result;
            try {
                const response = await fetch('save_data.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `action=save_cv&cvData=${encodeURIComponent(cvFileData)}`
                });
                
                const result = await response.json();
                if (result.success) {
                    showSuccessMessage('CV uploaded successfully!');
                } else {
                    showSuccessMessage('Error uploading CV. Please try again.');
                }
            } catch (error) {
                console.error('Error uploading CV:', error);
                showSuccessMessage('Error uploading CV. Please try again.');
            }
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please upload a PDF file');
    }
});

// Download CV
async function downloadCV() {
    try {
        const response = await fetch('save_data.php?action=load_cv');
        const data = await response.json();
        
        if (data.cv) {
            // Download uploaded CV
            const link = document.createElement('a');
            link.href = data.cv;
            link.download = "CV.UsamaMehboob.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            // Download default CV
            const cvUrl = "https://github.com/aliusa557/usama1/raw/main/CV.UsamaMehboob.pdf";
            const link = document.createElement('a');
            link.href = cvUrl;
            link.download = "CV.UsamaMehboob.pdf";
            link.target = "_blank";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    } catch (error) {
        // Download default CV if error
        const cvUrl = "https://github.com/aliusa557/usama1/raw/main/CV.UsamaMehboob.pdf";
        const link = document.createElement('a');
        link.href = cvUrl;
        link.download = "CV.UsamaMehboob.pdf";
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// PROJECT MANAGEMENT FUNCTIONS

// Load projects from PHP backend
async function loadProjects() {
    try {
        const response = await fetch('save_data.php?action=load_projects');
        const data = await response.json();
        projects = Array.isArray(data) ? data : [];
    } catch (error) {
        console.log('No projects found, starting fresh');
        projects = [];
    }
    renderProjects();
}

// Save all projects to PHP backend
async function saveProjects() {
    try {
        const response = await fetch('save_data.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `action=save_projects&projects=${encodeURIComponent(JSON.stringify(projects))}`
        });
        
        const result = await response.json();
        return result.success;
    } catch (error) {
        console.error('Error saving projects:', error);
        showSuccessMessage('Error saving projects. Please try again.');
        return false;
    }
}

// Render projects
function renderProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.innerHTML = '';
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a href="${project.link}" target="_blank" class="project-link">
                    <i class="fas fa-external-link-alt"></i> View Project
                </a>
                <div class="project-actions" style="display: ${editMode ? 'flex' : 'none'};">
                    <button class="edit-project-btn" onclick="editProject(${project.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="delete-project-btn" onclick="deleteProject(${project.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });
}

// Open project modal
function openProjectModal() {
    if (!isLoggedIn) {
        alert('Please login first!');
        return;
    }
    
    currentEditProjectId = null;
    document.getElementById('projectModalTitle').textContent = 'Add Project';
    document.getElementById('projectForm').reset();
    document.getElementById('projectModal').classList.add('active');
}

// Close project modal
function closeProjectModal() {
    document.getElementById('projectModal').classList.remove('active');
    document.getElementById('projectForm').reset();
    currentEditProjectId = null;
}

// Handle project image upload
function handleProjectImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('projectImage').value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Handle project form submit
async function handleProjectSubmit(event) {
    event.preventDefault();
    
    const title = document.getElementById('projectTitle').value;
    const description = document.getElementById('projectDescription').value;
    const link = document.getElementById('projectLink').value;
    const image = document.getElementById('projectImage').value || 'https://via.placeholder.com/400x250/667eea/ffffff?text=' + encodeURIComponent(title);
    
    if (currentEditProjectId) {
        // Update existing project
        const index = projects.findIndex(p => p.id === currentEditProjectId);
        if (index !== -1) {
            projects[index] = {
                ...projects[index],
                title,
                description,
                link,
                image
            };
        }
    } else {
        // Add new project
        const newProject = {
            id: Date.now(),
            title,
            description,
            link,
            image
        };
        projects.push(newProject);
    }
    
    const saved = await saveProjects();
    if (saved) {
        showSuccessMessage(currentEditProjectId ? 'Project updated successfully!' : 'Project added successfully!');
        renderProjects();
        closeProjectModal();
    }
}

// Edit project
function editProject(id) {
    const project = projects.find(p => p.id === id);
    if (!project) return;
    
    currentEditProjectId = id;
    document.getElementById('projectModalTitle').textContent = 'Edit Project';
    document.getElementById('projectTitle').value = project.title;
    document.getElementById('projectDescription').value = project.description;
    document.getElementById('projectLink').value = project.link;
    document.getElementById('projectImage').value = project.image;
    document.getElementById('projectModal').classList.add('active');
}

// Delete project
async function deleteProject(id) {
    if (confirm('Are you sure you want to delete this project?')) {
        projects = projects.filter(p => p.id !== id);
        const saved = await saveProjects();
        if (saved) {
            renderProjects();
            showSuccessMessage('Project deleted successfully!');
        }
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

// Let's Chat Action
function letsChatAction() {
    const choice = confirm("Click OK for WhatsApp or Cancel for Email");
    
    if (choice) {
        const whatsappNumber = "923184206938";
        const message = "Hello! I'd like to chat about a project.";
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    } else {
        const email = "rayusamajaat@gmail.com";
        const subject = "Chat Request";
        const body = "Hello Usama,%0D%0A%0D%0AI'd like to discuss a project with you.%0D%0A%0D%0ABest regards";
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    }
}

// Close modal on outside click
window.addEventListener('click', function(event) {
    const loginModal = document.getElementById('loginModal');
    const projectModal = document.getElementById('projectModal');
    
    if (event.target === loginModal) {
        closeLoginModal();
    }
    if (event.target === projectModal) {
        closeProjectModal();
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