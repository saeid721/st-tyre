// Toggle Functions
function toggleGST() {
    const toggle = document.getElementById('gstToggle');
    const label = document.getElementById('gstLabel');
    toggle.classList.toggle('active');
    label.textContent = toggle.classList.contains('active') ? 'Yes' : 'No';
    updateSummary();
}

function toggleExport() {
    const toggle = document.getElementById('exportToggle');
    const label = document.getElementById('exportLabel');
    toggle.classList.toggle('active');
    label.textContent = toggle.classList.contains('active') ? 'Yes' : 'No';
}

function toggleISO() {
    const toggle = document.getElementById('isoToggle');
    const label = document.getElementById('isoLabel');
    toggle.classList.toggle('active');
    label.textContent = toggle.classList.contains('active') ? 'Yes' : 'No';
    updateSummary();
}

function toggleOthersInput() {
    const checkbox = document.getElementById('othersCheckbox');
    const input = document.getElementById('othersInput');
    input.style.display = checkbox.checked ? 'block' : 'none';
}

// Tag Input Functions
function focusTagInput() {
    document.getElementById('tagInput').focus();
}

function handleTagInput(event) {
    if (event.key === 'Enter' || event.key === ',') {
        event.preventDefault();
        const input = document.getElementById('tagInput');
        const value = input.value.trim();
        if (value) {
            addTag(value);
            input.value = '';
        }
    }
}

function addTag(text) {
    const container = document.getElementById('tagContainer');
    const input = document.getElementById('tagInput');
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.innerHTML = `
                ${text}
                <span class="tag-remove" onclick="removeTag(this, event)">×</span>
            `;
    container.insertBefore(tag, input);
    updateProductsList();
}

function removeTag(element, event) {
    event.stopPropagation();
    element.parentElement.remove();
    updateProductsList();
}

// Update Products List in Summary
function updateProductsList() {
    const list = document.getElementById('productsList');
    const checkboxes = document.querySelectorAll('.checkbox-list input[type="checkbox"]:checked');
    const tags = document.querySelectorAll('.tag');

    // Clear existing
    list.innerHTML = '';

    // Add from tags
    tags.forEach(tag => {
        const text = tag.childNodes[0].textContent.trim();
        const item = document.createElement('div');
        item.className = 'product-item';
        item.innerHTML = `
                    <span class="product-bullet"></span>
                    <span>${text}</span>
                `;
        list.appendChild(item);
    });
}

// Update Summary
function updateSummary() {
    const industrySelect = document.getElementById('industryType');
    const natureSelect = document.getElementById('natureOfBusiness');
    const incorporationSelect = document.getElementById('incorporationType');
    const employeesSelect = document.getElementById('numEmployees');
    const yearInput = document.getElementById('yearEstablished');
    const gstToggle = document.getElementById('gstToggle');
    const isoToggle = document.getElementById('isoToggle');

    document.getElementById('summaryIndustry').textContent = industrySelect.options[industrySelect.selectedIndex].text;
    document.getElementById('summaryNature').textContent = natureSelect.options[natureSelect.selectedIndex].text;
    document.getElementById('summaryIncorporation').textContent = incorporationSelect.options[incorporationSelect.selectedIndex].text;
    document.getElementById('summaryEmployees').textContent = employeesSelect.options[employeesSelect.selectedIndex].text;
    document.getElementById('summaryYear').textContent = yearInput.value;

    const gstBadge = document.getElementById('summaryGST');
    gstBadge.textContent = gstToggle.classList.contains('active') ? 'Yes' : 'No';
    gstBadge.style.background = gstToggle.classList.contains('active') ? 'rgba(16, 185, 129, 0.1)' : 'rgba(100, 116, 139, 0.1)';
    gstBadge.style.color = gstToggle.classList.contains('active') ? 'var(--success)' : 'var(--text-muted)';

    const isoBadge = document.getElementById('summaryISO');
    isoBadge.textContent = isoToggle.classList.contains('active') ? 'Yes' : 'No';
    isoBadge.style.background = isoToggle.classList.contains('active') ? 'rgba(16, 185, 129, 0.1)' : 'rgba(100, 116, 139, 0.1)';
    isoBadge.style.color = isoToggle.classList.contains('active') ? 'var(--success)' : 'var(--text-muted)';
}

// File Upload
function removeFile(element) {
    if (confirm('Are you sure you want to delete this file?')) {
        element.closest('.file-item').remove();
    }
}

// Navigation
function goBack() {
    showToast('Navigation', 'Going back to previous step...');
    // Update stepper
    document.querySelectorAll('.stepper-item').forEach((item, index) => {
        if (index < 1) {
            item.classList.add('completed');
            item.classList.remove('active');
        } else if (index === 1) {
            item.classList.add('active');
            item.classList.remove('completed');
        } else {
            item.classList.remove('completed', 'active');
        }
    });
    document.getElementById('stepperProgress').style.width = '33.33%';
}

function nextStep() {
    if (validateForm()) {
        showToast('Success', 'Moving to Financial Settings...');
        // Update stepper
        document.querySelectorAll('.stepper-item').forEach((item, index) => {
            if (index < 3) {
                item.classList.add('completed');
                item.classList.remove('active');
            } else if (index === 3) {
                item.classList.add('active');
            }
        });
        document.getElementById('stepperProgress').style.width = '100%';
    }
}

function saveAndExit() {
    if (validateForm()) {
        showToast('Success', 'Business information saved successfully!');
    }
}

// Form Validation
function validateForm() {
    let isValid = true;
    const requiredFields = ['industryType', 'natureOfBusiness'];

    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value) {
            field.style.borderColor = 'var(--danger)';
            isValid = false;
        } else {
            field.style.borderColor = 'var(--border)';
        }
    });

    const tags = document.querySelectorAll('.tag');
    if (tags.length === 0) {
        document.getElementById('tagContainer').style.borderColor = 'var(--danger)';
        isValid = false;
    } else {
        document.getElementById('tagContainer').style.borderColor = 'var(--border)';
    }

    const desc = document.getElementById('businessDesc');
    if (!desc.value.trim()) {
        desc.style.borderColor = 'var(--danger)';
        isValid = false;
    } else {
        desc.style.borderColor = 'var(--border)';
    }

    if (!isValid) {
        showToast('Error', 'Please fill in all required fields');
    }

    return isValid;
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

// Scroll Reveal
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateSummary();
});