let currentStep = 1;
const totalSteps = 4;

// =========================================
// TOGGLE FUNCTIONS
// =========================================
function toggleSameAsAddress() {
    const toggle = document.getElementById('sameAsToggle');
    const grid = document.getElementById('communicationAddressGrid');
    if (!toggle || !grid) return;

    const inputs = grid.querySelectorAll('input, select');
    toggle.classList.toggle('active');
    const isSame = toggle.classList.contains('active');

    inputs.forEach(input => {
        input.disabled = isSame;
        if (isSame) {
            const map = {
                'commHouseNo': 'houseNo',
                'commRoadStreet': 'roadStreet',
                'commAreaThana': 'areaThana',
                'commDistrict': 'district',
                'commState': 'state',
                'commCountry': 'country',
                'commPostCode': 'postCode'
            };
            for (let commId in map) {
                const commEl = document.getElementById(commId);
                const regEl = document.getElementById(map[commId]);
                if (commEl && regEl) commEl.value = regEl.value;
            }
        } else {
            if (input.tagName === 'SELECT') input.selectedIndex = 0;
            else input.value = '';
        }
    });
}

function toggleGST() {
    const toggle = document.getElementById('gstToggle');
    const label = document.getElementById('gstLabel');
    if (!toggle) return;
    toggle.classList.toggle('active');
    if (label) label.textContent = toggle.classList.contains('active') ? 'Yes' : 'No';
}

function toggleExport() {
    const toggle = document.getElementById('exportToggle');
    const label = document.getElementById('exportLabel');
    if (!toggle) return;
    toggle.classList.toggle('active');
    if (label) label.textContent = toggle.classList.contains('active') ? 'Yes' : 'No';
}

function toggleISO() {
    const toggle = document.getElementById('isoToggle');
    const label = document.getElementById('isoLabel');
    if (!toggle) return;
    toggle.classList.toggle('active');
    if (label) label.textContent = toggle.classList.contains('active') ? 'Yes' : 'No';
}

function toggleBudget() {
    const toggle = document.getElementById('maintainBudget');
    const label = document.getElementById('budgetLabel');
    if (!toggle) return;
    toggle.classList.toggle('active');
    if (label) label.textContent = toggle.classList.contains('active') ? 'Yes' : 'No';
}

function toggleAccounts() {
    const toggle = document.getElementById('maintainAccounts');
    const label = document.getElementById('accountsLabel');
    if (!toggle) return;
    toggle.classList.toggle('active');
    if (label) label.textContent = toggle.classList.contains('active') ? 'Yes' : 'No';
    updateSummary();
}

function toggleBudgetsPref() {
    const toggle = document.getElementById('maintainBudgetsPref');
    const label = document.getElementById('budgetsLabel');
    if (!toggle) return;
    toggle.classList.toggle('active');
    if (label) label.textContent = toggle.classList.contains('active') ? 'Yes' : 'No';
}

function toggleCostCenter() {
    const toggle = document.getElementById('maintainCostCenter');
    const label = document.getElementById('costCenterLabel');
    if (!toggle) return;
    toggle.classList.toggle('active');
    if (label) label.textContent = toggle.classList.contains('active') ? 'Yes' : 'No';
}

function toggleMultiBranch() {
    const toggle = document.getElementById('multiBranch');
    const label = document.getElementById('multiBranchLabel');
    if (!toggle) return;
    toggle.classList.toggle('active');
    if (label) label.textContent = toggle.classList.contains('active') ? 'Yes' : 'No';
}

function toggleMultiCurrency() {
    const toggle = document.getElementById('multiCurrency');
    const label = document.getElementById('multiCurrencyLabel');
    if (!toggle) return;
    toggle.classList.toggle('active');
    if (label) label.textContent = toggle.classList.contains('active') ? 'Yes' : 'No';
    updateSummary();
}

function toggleInterest() {
    const toggle = document.getElementById('interestCalc');
    const label = document.getElementById('interestLabel');
    if (!toggle) return;
    toggle.classList.toggle('active');
    if (label) label.textContent = toggle.classList.contains('active') ? 'Yes' : 'No';
}

function toggleCheque() {
    const toggle = document.getElementById('chequeMgmt');
    const label = document.getElementById('chequeLabel');
    if (!toggle) return;
    toggle.classList.toggle('active');
    if (label) label.textContent = toggle.classList.contains('active') ? 'Yes' : 'No';
}

function toggleAutoBackup() {
    const toggle = document.getElementById('autoBackup');
    const label = document.getElementById('autoBackupLabel');
    if (!toggle) return;
    toggle.classList.toggle('active');
    if (label) label.textContent = toggle.classList.contains('active') ? 'Yes' : 'No';
}

// =========================================
// TAG INPUT FUNCTIONS
// =========================================
function focusTagInput() {
    const input = document.getElementById('tagInput');
    if (input) input.focus();
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
    const container = document.querySelector('.tag-input-container');
    const input = document.getElementById('tagInput');
    if (!container || !input) return;
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.innerHTML = `${text} <span class="tag-remove" onclick="removeTag(this, event)">×</span>`;
    container.insertBefore(tag, input);
    updateProductsList();
}

function removeTag(element, event) {
    event.stopPropagation();
    element.parentElement.remove();
    updateProductsList();
}

function updateProductsList() {
    const list = document.getElementById('productsList');
    if (!list) return;
    const tags = document.querySelectorAll('.tag-input-container .tag');
    list.innerHTML = '';
    tags.forEach(tag => {
        const text = tag.childNodes[0].textContent.trim();
        const item = document.createElement('div');
        item.className = 'product-item';
        item.innerHTML = `<span class="product-bullet"></span><span>${text}</span>`;
        list.appendChild(item);
    });
}

// =========================================
// UPDATE SUMMARY
// =========================================
function updateSummary() {
    // Step 3 Summary
    const industrySelect = document.getElementById('industryType');
    const natureSelect = document.getElementById('natureOfBusiness');
    const incorporationSelect = document.getElementById('incorporationType');
    const employeesSelect = document.getElementById('numEmployees');
    const yearInput = document.getElementById('yearEstablished');
    const gstToggle = document.getElementById('gstToggle');
    const isoToggle = document.getElementById('isoToggle');

    if (industrySelect && document.getElementById('summaryIndustry')) {
        document.getElementById('summaryIndustry').textContent = industrySelect.options[industrySelect.selectedIndex].text;
    }
    if (natureSelect && document.getElementById('summaryNature')) {
        document.getElementById('summaryNature').textContent = natureSelect.options[natureSelect.selectedIndex].text;
    }
    if (incorporationSelect && document.getElementById('summaryIncorporation')) {
        document.getElementById('summaryIncorporation').textContent = incorporationSelect.options[incorporationSelect.selectedIndex].text;
    }
    if (employeesSelect && document.getElementById('summaryEmployees')) {
        document.getElementById('summaryEmployees').textContent = employeesSelect.options[employeesSelect.selectedIndex].text;
    }
    if (yearInput && document.getElementById('summaryYear')) {
        document.getElementById('summaryYear').textContent = yearInput.value;
    }

    const gstBadge = document.getElementById('summaryGST');
    if (gstBadge && gstToggle) {
        gstBadge.textContent = gstToggle.classList.contains('active') ? 'Yes' : 'No';
    }
    const isoBadge = document.getElementById('summaryISO');
    if (isoBadge && isoToggle) {
        isoBadge.textContent = isoToggle.classList.contains('active') ? 'Yes' : 'No';
    }

    // Step 4 Summary
    const currencySelect = document.getElementById('baseCurrency');
    if (currencySelect && document.getElementById('summaryCurrency')) {
        document.getElementById('summaryCurrency').textContent = currencySelect.options[currencySelect.selectedIndex].text;
    }

    const precisionSelect = document.getElementById('currencyPrecision');
    if (precisionSelect && document.getElementById('summaryPrecision')) {
        document.getElementById('summaryPrecision').textContent = `${precisionSelect.value} (100.${'0'.repeat(precisionSelect.value)})`;
    }

    const fyStart = document.getElementById('fyStart');
    const fyEnd = document.getElementById('fyEnd');
    if (fyStart && fyEnd && document.getElementById('summaryFY')) {
        document.getElementById('summaryFY').textContent = `${fyStart.value} - ${fyEnd.value}`;
    }

    const fiscalYear = document.getElementById('defaultFiscalYear');
    if (fiscalYear && document.getElementById('summaryFiscalYear')) {
        document.getElementById('summaryFiscalYear').textContent = fiscalYear.value;
    }

    const paymentTerms = document.getElementById('paymentTerms');
    if (paymentTerms && document.getElementById('summaryPayment')) {
        document.getElementById('summaryPayment').textContent = paymentTerms.options[paymentTerms.selectedIndex].text;
    }

    const accountsToggle = document.getElementById('maintainAccounts');
    const accountsBadge = document.getElementById('summaryAccounts');
    if (accountsBadge && accountsToggle) {
        accountsBadge.textContent = accountsToggle.classList.contains('active') ? 'Yes' : 'No';
    }

    const multiCurrencyToggle = document.getElementById('multiCurrency');
    const multiCurrencyBadge = document.getElementById('summaryMultiCurrency');
    if (multiCurrencyBadge && multiCurrencyToggle) {
        multiCurrencyBadge.textContent = multiCurrencyToggle.classList.contains('active') ? 'Yes' : 'No';
    }

    const costCenterToggle = document.getElementById('maintainCostCenter');
    const costCenterBadge = document.getElementById('summaryCostCenter');
    if (costCenterBadge && costCenterToggle) {
        costCenterBadge.textContent = costCenterToggle.classList.contains('active') ? 'Yes' : 'No';
    }

    // Global Summary
    const companyNameInput = document.querySelector('#step1 input[placeholder="Enter company name"]');
    if (companyNameInput && document.getElementById('summaryCompanyName')) {
        document.getElementById('summaryCompanyName').textContent = companyNameInput.value;
    }
}

// =========================================
// FILE UPLOAD & LOGO
// =========================================
function changeLogo() {
    showToast('Info', 'Logo upload dialog would open here.');
}

function removeLogo() {
    showToast('Success', 'Logo removed successfully!');
}

function removeFile(element) {
    if (confirm('Are you sure you want to delete this file?')) {
        element.closest('.file-item').remove();
    }
}

// =========================================
// NAVIGATION
// =========================================
function nextStep() {
    if (validateCurrentStep()) {
        if (currentStep < totalSteps) {
            document.getElementById(`step${currentStep}`).classList.remove('active');
            const currentItem = document.querySelector(`.stepper-item[data-step="${currentStep}"]`);
            currentItem.classList.remove('active');
            currentItem.classList.add('completed');
            const circle = currentItem.querySelector('.stepper-circle');
            circle.querySelector('.stepper-step-num').style.display = 'none';
            circle.querySelector('.bi-check-lg').style.display = 'block';

            currentStep++;

            document.getElementById(`step${currentStep}`).classList.add('active');
            document.querySelector(`.stepper-item[data-step="${currentStep}"]`).classList.add('active');

            const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
            document.getElementById('stepperProgress').style.width = `${progress}%`;

            updateButtons();
            updateSummary();
            showToast('Success', `Step ${currentStep - 1} completed! Moving to step ${currentStep}...`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
}

function previousStep() {
    if (currentStep > 1) {
        document.getElementById(`step${currentStep}`).classList.remove('active');
        const currentItem = document.querySelector(`.stepper-item[data-step="${currentStep}"]`);
        currentItem.classList.remove('active');

        currentStep--;

        const prevItem = document.querySelector(`.stepper-item[data-step="${currentStep}"]`);
        prevItem.classList.add('active');
        prevItem.classList.remove('completed');
        const circle = prevItem.querySelector('.stepper-circle');
        circle.querySelector('.stepper-step-num').style.display = 'block';
        circle.querySelector('.bi-check-lg').style.display = 'none';

        document.getElementById(`step${currentStep}`).classList.add('active');

        const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
        document.getElementById('stepperProgress').style.width = `${progress}%`;

        updateButtons();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function updateButtons() {
    const btnBack = document.getElementById('btnBack');
    const btnNext = document.getElementById('btnNext');
    const btnFinish = document.getElementById('btnFinish');

    if (btnBack) btnBack.style.visibility = currentStep === 1 ? 'hidden' : 'visible';

    if (currentStep === totalSteps) {
        if (btnNext) btnNext.style.display = 'none';
        if (btnFinish) btnFinish.style.display = 'inline-flex';
    } else {
        if (btnNext) btnNext.style.display = 'inline-flex';
        if (btnFinish) btnFinish.style.display = 'none';
    }
}

function saveAndExit() {
    if (validateCurrentStep()) {
        showToast('Success', 'Data saved successfully! You can continue later.');
    }
}

function finishSetup() {
    if (validateCurrentStep()) {
        showToast('Success', 'Company setup completed successfully! Redirecting to dashboard...');
        setTimeout(() => {
            // window.location.href = 'dashboard.html';
        }, 2000);
    }
}

// =========================================
// VALIDATION
// =========================================
function validateCurrentStep() {
    let isValid = true;
    const currentStepEl = document.getElementById(`step${currentStep}`);
    if (!currentStepEl) return true;

    const labels = currentStepEl.querySelectorAll('.form-label');
    labels.forEach(label => {
        if (label.querySelector('.required')) {
            const group = label.closest('.form-group');
            if (group) {
                const input = group.querySelector('input, select, textarea');
                if (input && !input.value.trim()) {
                    input.classList.add('error');
                    isValid = false;
                } else if (input) {
                    input.classList.remove('error');
                }
            }
        }
    });

    if (!isValid) {
        showToast('Error', 'Please fill in all required fields');
    }
    return isValid;
}

// =========================================
// TOAST NOTIFICATION
// =========================================
function showToast(title, message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast-custom';
    toast.innerHTML = `
        <div class="toast-icon"> <i class="bi bi-check-lg"></i> </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// =========================================
// MAP / BRANCH / CONTACT ACTIONS
// =========================================
function showMap() {
    showToast('Map', 'Opening map location...');
}
function editBranch(id) {
    showToast('Edit', `Editing branch ${id}...`);
}
function addContact() {
    showToast('Add Contact', 'Add new contact form will open here');
}
function editContact(id) {
    showToast('Edit', `Editing contact ${id}...`);
}
function editTaxSettings() {
    showToast('Edit', 'Opening tax settings...');
}
function editOpeningBalance() {
    showToast('Edit', 'Opening balance settings...');
}

// =========================================
// SCROLL REVEAL
// =========================================
function initReveal() {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
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
}

// =========================================
// REAL-TIME PREVIEW UPDATE (STEP 2)
// =========================================
function initPreviewUpdates() {
    const fields = ['houseNo', 'roadStreet', 'areaThana', 'district', 'state', 'country', 'postCode', 'landline', 'mobile1', 'email1', 'website'];
    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', updateAddressPreview);
        }
    });
}

function updateAddressPreview() {
    const house = document.getElementById('houseNo')?.value || '';
    const road = document.getElementById('roadStreet')?.value || '';
    const area = document.getElementById('areaThana')?.value || '';
    const districtEl = document.getElementById('district');
    const district = districtEl ? districtEl.options[districtEl.selectedIndex].text : '';
    const stateEl = document.getElementById('state');
    const state = stateEl ? stateEl.options[stateEl.selectedIndex].text : '';
    const countryEl = document.getElementById('country');
    const country = countryEl ? countryEl.options[countryEl.selectedIndex].text : '';
    const postCode = document.getElementById('postCode')?.value || '';

    const previewAddress = document.getElementById('previewAddress');
    if (previewAddress) {
        previewAddress.innerHTML = `${house}, ${road}<br>${area}, ${district} - ${postCode}<br>${state}, ${country}`;
    }

    const previewPhone = document.getElementById('previewPhone');
    if (previewPhone) previewPhone.textContent = document.getElementById('landline')?.value || '';

    const previewMobile = document.getElementById('previewMobile');
    if (previewMobile) previewMobile.textContent = document.getElementById('mobile1')?.value || '';

    const previewEmail = document.getElementById('previewEmail');
    if (previewEmail) previewEmail.textContent = document.getElementById('email1')?.value || '';

    const previewWebsite = document.getElementById('previewWebsite');
    if (previewWebsite) previewWebsite.textContent = document.getElementById('website')?.value || '';
}

// =========================================
// REAL-TIME VALIDATION
// =========================================
function initRealTimeValidation() {
    document.querySelectorAll('.form-control-custom, .form-control, .textarea-custom').forEach(input => {
        input.addEventListener('input', function () {
            if (this.value.trim()) {
                this.classList.remove('error');
            }
        });
    });
}

// =========================================
// INITIALIZE
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    updateButtons();
    updateSummary();
    updateAddressPreview();
    initReveal();
    initPreviewUpdates();
    initRealTimeValidation();
});