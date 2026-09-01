// Toggle Functions
function toggleBudget() {
    const toggle = document.getElementById('maintainBudget');
    const label = document.getElementById('budgetLabel');
    toggle.classList.toggle('active');
    label.textContent = toggle.classList.contains('active') ? 'Yes' : 'No';
}

function toggleAccounts() {
    const toggle = document.getElementById('maintainAccounts');
    const label = document.getElementById('accountsLabel');
    toggle.classList.toggle('active');
    label.textContent = toggle.classList.contains('active') ? 'Yes' : 'No';
    updateSummary();
}

function toggleBudgetsPref() {
    const toggle = document.getElementById('maintainBudgetsPref');
    const label = document.getElementById('budgetsLabel');
    toggle.classList.toggle('active');
    label.textContent = toggle.classList.contains('active') ? 'Yes' : 'No';
}

function toggleCostCenter() {
    const toggle = document.getElementById('maintainCostCenter');
    const label = document.getElementById('costCenterLabel');
    toggle.classList.toggle('active');
    label.textContent = toggle.classList.contains('active') ? 'Yes' : 'No';
    updateSummary();
}

function toggleMultiBranch() {
    const toggle = document.getElementById('multiBranch');
    const label = document.getElementById('multiBranchLabel');
    toggle.classList.toggle('active');
    label.textContent = toggle.classList.contains('active') ? 'Yes' : 'No';
}

function toggleMultiCurrency() {
    const toggle = document.getElementById('multiCurrency');
    const label = document.getElementById('multiCurrencyLabel');
    toggle.classList.toggle('active');
    label.textContent = toggle.classList.contains('active') ? 'Yes' : 'No';
    updateSummary();
}

function toggleInterest() {
    const toggle = document.getElementById('interestCalc');
    const label = document.getElementById('interestLabel');
    toggle.classList.toggle('active');
    label.textContent = toggle.classList.contains('active') ? 'Yes' : 'No';
}

function toggleCheque() {
    const toggle = document.getElementById('chequeMgmt');
    const label = document.getElementById('chequeLabel');
    toggle.classList.toggle('active');
    label.textContent = toggle.classList.contains('active') ? 'Yes' : 'No';
}

function toggleAutoBackup() {
    const toggle = document.getElementById('autoBackup');
    const label = document.getElementById('autoBackupLabel');
    toggle.classList.toggle('active');
    label.textContent = toggle.classList.contains('active') ? 'Yes' : 'No';
}

// Update Summary
function updateSummary() {
    const currencySelect = document.getElementById('baseCurrency');
    const precisionSelect = document.getElementById('currencyPrecision');
    const fyStart = document.getElementById('fyStart').value;
    const fyEnd = document.getElementById('fyEnd').value;
    const fiscalYear = document.getElementById('defaultFiscalYear');
    const paymentTerms = document.getElementById('paymentTerms');
    const accountsToggle = document.getElementById('maintainAccounts');
    const multiCurrencyToggle = document.getElementById('multiCurrency');
    const costCenterToggle = document.getElementById('maintainCostCenter');

    // Update currency
    document.getElementById('summaryCurrency').textContent = currencySelect.options[currencySelect.selectedIndex].text;

    // Update precision
    const precision = precisionSelect.value;
    let precisionExample = '';
    switch (precision) {
        case '0': precisionExample = '100'; break;
        case '1': precisionExample = '100.0'; break;
        case '2': precisionExample = '100.00'; break;
        case '3': precisionExample = '100.000'; break;
        case '4': precisionExample = '100.0000'; break;
    }
    document.getElementById('summaryPrecision').textContent = `${precision} (${precisionExample})`;

    // Update financial year
    document.getElementById('summaryFY').textContent = `${fyStart} - ${fyEnd}`;

    // Update fiscal year
    document.getElementById('summaryFiscalYear').textContent = fiscalYear.options[fiscalYear.selectedIndex].text;

    // Update payment terms
    const terms = paymentTerms.value;
    const termsText = terms === '0' ? 'Immediate' : `${terms} Days`;
    document.getElementById('summaryPayment').textContent = termsText;

    // Update toggles
    const accountsBadge = document.getElementById('summaryAccounts');
    accountsBadge.textContent = accountsToggle.classList.contains('active') ? 'Yes' : 'No';
    accountsBadge.style.background = accountsToggle.classList.contains('active') ? 'rgba(16, 185, 129, 0.1)' : 'rgba(100, 116, 139, 0.1)';
    accountsBadge.style.color = accountsToggle.classList.contains('active') ? 'var(--success)' : 'var(--text-muted)';

    const multiCurrencyBadge = document.getElementById('summaryMultiCurrency');
    multiCurrencyBadge.textContent = multiCurrencyToggle.classList.contains('active') ? 'Yes' : 'No';
    multiCurrencyBadge.style.background = multiCurrencyToggle.classList.contains('active') ? 'rgba(16, 185, 129, 0.1)' : 'rgba(100, 116, 139, 0.1)';
    multiCurrencyBadge.style.color = multiCurrencyToggle.classList.contains('active') ? 'var(--success)' : 'var(--text-muted)';

    const costCenterBadge = document.getElementById('summaryCostCenter');
    costCenterBadge.textContent = costCenterToggle.classList.contains('active') ? 'Yes' : 'No';
    costCenterBadge.style.background = costCenterToggle.classList.contains('active') ? 'rgba(16, 185, 129, 0.1)' : 'rgba(100, 116, 139, 0.1)';
    costCenterBadge.style.color = costCenterToggle.classList.contains('active') ? 'var(--success)' : 'var(--text-muted)';
}

// Navigation Functions
function goBack() {
    showToast('Navigation', 'Going back to Business Information...');
    // In a real app, this would navigate to Step 3
}

function saveDraft() {
    if (validateForm()) {
        showToast('Success', 'Financial settings saved as draft successfully!');
    }
}

function saveAndFinish() {
    if (validateForm()) {
        showToast('Success', 'Company setup completed successfully! Redirecting to dashboard...');
        // In a real app, this would complete the setup and redirect
        setTimeout(() => {
            // window.location.href = 'dashboard.html';
        }, 2000);
    }
}

function editTaxSettings() {
    showToast('Edit', 'Opening Tax & VAT settings editor...');
}

function editOpeningBalance() {
    showToast('Edit', 'Opening Opening Balance settings editor...');
}

// Form Validation
function validateForm() {
    let isValid = true;
    const requiredFields = ['baseCurrency', 'currencyPrecision', 'fyStart', 'fyEnd'];

    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });

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