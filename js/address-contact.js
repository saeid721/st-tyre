// Toggle Same as Registered Address
function toggleSameAsAddress() {
    const toggle = document.getElementById('sameAsToggle');
    const grid = document.getElementById('communicationAddressGrid');
    const inputs = grid.querySelectorAll('input, select');

    toggle.classList.toggle('active');
    const isSame = toggle.classList.contains('active');

    inputs.forEach(input => {
        input.disabled = isSame;
    });

    if (isSame) {
        // Copy values from registered address
        document.getElementById('commHouseNo').value = document.getElementById('houseNo').value;
        document.getElementById('commRoadStreet').value = document.getElementById('roadStreet').value;
        document.getElementById('commAreaThana').value = document.getElementById('areaThana').value;
        document.getElementById('commDistrict').value = document.getElementById('district').value;
        document.getElementById('commState').value = document.getElementById('state').value;
        document.getElementById('commCountry').value = document.getElementById('country').value;
        document.getElementById('commPostCode').value = document.getElementById('postCode').value;
    } else {
        // Clear values
        inputs.forEach(input => {
            if (input.tagName === 'SELECT') {
                input.value = '';
            } else {
                input.value = '';
            }
        });
    }
}

// Update Preview
function updatePreview() {
    const house = document.getElementById('houseNo').value;
    const road = document.getElementById('roadStreet').value;
    const area = document.getElementById('areaThana').value;
    const district = document.getElementById('district').value;
    const state = document.getElementById('state').value;
    const country = document.getElementById('country').value;
    const postCode = document.getElementById('postCode').value;
    const phone = document.getElementById('landline').value;
    const mobile = document.getElementById('mobile1').value;
    const email = document.getElementById('email1').value;
    const website = document.getElementById('website').value;

    document.getElementById('previewAddress').innerHTML =
        `${house}, ${road}<br>${area}, ${district} - ${postCode}<br>${state}, ${country}`;
    document.getElementById('previewPhone').textContent = phone;
    document.getElementById('previewMobile').textContent = mobile;
    document.getElementById('previewEmail').textContent = email;
    document.getElementById('previewWebsite').textContent = website;
}

// Form Validation
function validateForm() {
    let isValid = true;
    const requiredFields = [
        { id: 'houseNo', message: 'House / Building No. is required' },
        { id: 'roadStreet', message: 'Road / Street is required' },
        { id: 'areaThana', message: 'Area / Thana is required' },
        { id: 'district', message: 'District is required' },
        { id: 'country', message: 'Country is required' },
        { id: 'mobile1', message: 'Mobile 1 is required' },
        { id: 'email1', message: 'Email 1 is required' }
    ];

    requiredFields.forEach(field => {
        const element = document.getElementById(field.id);
        const errorDiv = element.parentElement.querySelector('.error-message');

        if (!element.value.trim()) {
            element.classList.add('error');
            errorDiv.classList.add('show');
            isValid = false;
        } else {
            element.classList.remove('error');
            errorDiv.classList.remove('show');
        }
    });

    return isValid;
}

// Navigation Functions
function goBack() {
    showToast('Navigation', 'Going back to previous step...');
}

function nextStep() {
    if (validateForm()) {
        showToast('Success', 'Moving to next step...');
        // Update stepper
        document.querySelectorAll('.stepper-item').forEach((item, index) => {
            if (index < 2) {
                item.classList.add('completed');
                item.classList.remove('active');
            } else if (index === 2) {
                item.classList.add('active');
            } else {
                item.classList.remove('completed', 'active');
            }
        });
        document.getElementById('stepperProgress').style.width = '66.66%';
    } else {
        showToast('Error', 'Please fill in all required fields');
    }
}

function saveAndExit() {
    if (validateForm()) {
        showToast('Success', 'Company information saved successfully!');
    } else {
        showToast('Error', 'Please fill in all required fields before saving');
    }
}

// Contact Functions
function addContact() {
    showToast('Add Contact', 'Add new contact form will open here');
}

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

// Real-time preview update
document.querySelectorAll('#houseNo, #roadStreet, #areaThana, #district, #state, #country, #postCode, #landline, #mobile1, #email1, #website').forEach(input => {
    input.addEventListener('input', updatePreview);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updatePreview();
});