// Tab Switching
document.querySelectorAll('.settings-tab').forEach(tab => {
    tab.addEventListener('click', function () {
        document.querySelectorAll('.settings-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});

// Save Changes
function saveChanges() {
    showToast('Success', 'Company information saved successfully!');
}

// Show Help
function showHelp() {
    showToast('Help', 'Help documentation will open here');
}

// Change Logo
function changeLogo() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png,image/jpeg';
    input.onchange = function (e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function (event) {
                document.querySelector('.logo-preview img').src = event.target.result;
                showToast('Success', 'Logo updated successfully!');
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    input.click();
}

// Remove Logo
function removeLogo() {
    if (confirm('Are you sure you want to remove the company logo?')) {
        document.querySelector('.logo-preview img').src = 'https://ui-avatars.com/api/?name=ST+TYRE&background=2563eb&color=fff&size=300';
        showToast('Success', 'Logo removed successfully!');
    }
}

// Show Map
function showMap() {
    showToast('Map', 'Opening location on map...');
    // Implement map opening logic here
}

// Edit Branch
function editBranch(id) {
    showToast('Edit', `Editing branch ${id}...`);
}

// Add Contact
function addContact() {
    showToast('Add Contact', 'Add new contact form will open here');
}

// Edit Contact
function editContact(id) {
    showToast('Edit', `Editing contact ${id}...`);
}

// Toast Notification
function showToast(title, message) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast-custom';
    toast.innerHTML = `
                <div class="toast-icon">
                    <i class="bi bi-check-lg"></i>
                </div>
                <div class="toast-content">
                    <div class="toast-title">${title}</div>
                    <div class="toast-message">${message}</div>
                </div>
            `;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// Form Input Animations
document.querySelectorAll('.form-control-custom').forEach(input => {
    input.addEventListener('focus', function () {
        this.parentElement.style.transform = 'translateY(-2px)';
    });
    input.addEventListener('blur', function () {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// Prevent form submission on Enter key for better UX
document.getElementById('companyInfoForm').addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const inputs = Array.from(this.querySelectorAll('.form-control-custom'));
        const currentIndex = inputs.indexOf(e.target);
        if (currentIndex < inputs.length - 1) {
            inputs[currentIndex + 1].focus();
        }
    }
});