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
function renderLogoButtons(hasImage) {
    const container = document.getElementById('logoButtonsContainer');
    if (!container) return;
    container.innerHTML = hasImage
        ? `<button class="btn-logo btn-logo-change" type="button" onclick="changeLogo()"><i class="bi bi-upload"></i> Change Logo</button>
           <button class="btn-logo btn-logo-remove" type="button" onclick="removeLogo()"><i class="bi bi-trash"></i> Remove</button>`
        : `<button class="btn-logo btn-logo-change" type="button" onclick="changeLogo()"><i class="bi bi-upload"></i> Upload Logo</button>`;
}

function renderSignatureButtons(hasImage) {
    const container = document.getElementById('signatureButtonsContainer');
    if (!container) return;
    container.innerHTML = hasImage
        ? `<button class="btn-logo btn-logo-change" type="button" onclick="document.getElementById('signatureFileInput').click()"><i class="bi bi-upload"></i> Change</button>
           <button class="btn-logo btn-logo-remove" type="button" onclick="removeSignature()"><i class="bi bi-trash"></i> Remove</button>`
        : `<button class="btn-logo btn-logo-change" type="button" onclick="document.getElementById('signatureFileInput').click()"><i class="bi bi-upload"></i> Upload</button>`;
}

function handleImgLoad(img, type) {
    if (img.dataset.fallback === 'true') return;
    if (type === 'logo') renderLogoButtons(true);
    if (type === 'signature') renderSignatureButtons(true);
}

function handleImgError(img, type) {
    img.dataset.fallback = 'true';
    if (type === 'logo') {
        img.src = 'https://ui-avatars.com/api/?name=ST+TYRE&background=2563eb&color=fff&size=300';
        renderLogoButtons(false);
    }
    if (type === 'signature') {
        img.style.display = 'none';
        renderSignatureButtons(false);
    }
}

function changeLogo() {
    document.getElementById('logoFileInput').click();
}

function handleLogoSelect(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = document.getElementById('companyLogoImg');
        img.dataset.fallback = 'false';
        img.src = e.target.result;
        renderLogoButtons(true);
        showToast('Success', 'Logo updated successfully!');
    };
    reader.readAsDataURL(file);
}

function removeLogo() {
    const img = document.getElementById('companyLogoImg');
    img.dataset.fallback = 'true';
    img.src = 'https://ui-avatars.com/api/?name=ST+TYRE&background=2563eb&color=fff&size=300';
    document.getElementById('logoFileInput').value = '';
    renderLogoButtons(false);
    showToast('Success', 'Logo removed successfully!');
}

function handleSignatureSelect(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = document.getElementById('signatureImg');
        img.dataset.fallback = 'false';
        img.src = e.target.result;
        img.style.display = 'block';
        renderSignatureButtons(true);
        showToast('Success', 'Signature updated successfully!');
    };
    reader.readAsDataURL(file);
}

function removeSignature() {
    const img = document.getElementById('signatureImg');
    img.dataset.fallback = 'true';
    img.removeAttribute('src');
    img.style.display = 'none';
    document.getElementById('signatureFileInput').value = '';
    renderSignatureButtons(false);
    showToast('Success', 'Signature removed successfully!');
}

function removeFile(element, event) {
    if (event) event.stopPropagation();
    if (confirm('Are you sure you want to delete this file?')) {
        const container = element.closest('.upload-container');
        const item = element.closest('.file-item');
        if (item.dataset.fileUrl) URL.revokeObjectURL(item.dataset.fileUrl);
        item.remove();
        if (container) {
            updateUploadCount(container.id);
            updateDocStatus(container.id);
        }
    }
}

function updateUploadCount(containerId) {
    const container = document.getElementById(containerId);
    const badge = document.getElementById(containerId.replace('Upload', 'Count'));
    if (!container || !badge) return;
    const count = container.querySelectorAll('.file-item').length;
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-flex' : 'none';
}

function formatFileSize(bytes) {
    return bytes >= 1048576 ? (bytes / 1048576).toFixed(1) + ' MB' : (bytes / 1024).toFixed(0) + ' KB';
}

function updateDocStatus(containerId) {
    const container = document.getElementById(containerId);
    const status = document.getElementById('status-' + containerId);
    if (!container || !status) return;
    const has = container.querySelectorAll('.file-item').length > 0;
    status.textContent = has ? 'Uploaded' : 'Pending';
    status.classList.toggle('doc-status-done', has);
}

function addFileItem(containerId, file) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const ext = file.name.split('.').pop().toLowerCase();
    const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext);
    const fileUrl = URL.createObjectURL(file);
    const thumbHtml = isImage
        ? `<img src="${fileUrl}" class="file-thumb" alt="${file.name}">`
        : `<div class="file-icon ${ext === 'pdf' ? 'file-icon-pdf' : 'file-icon-generic'}">
               <i class="bi ${ext === 'pdf' ? 'bi-file-earmark-pdf' : 'bi-file-earmark-text'}"></i>
           </div>`;

    const item = document.createElement('div');
    item.className = 'file-item';
    item.dataset.fileUrl = fileUrl;
    item.dataset.fileName = file.name;
    item.dataset.fileSize = formatFileSize(file.size);
    item.dataset.fileExt = ext;
    item.innerHTML = `
        ${thumbHtml}
        <div class="file-info">
            <div class="file-name">${file.name}</div>
            <div class="file-size">${formatFileSize(file.size)}</div>
        </div>
        <div class="file-actions">
            <button type="button" class="file-btn" title="Download"><i class="bi bi-download"></i></button>
            <button type="button" class="file-btn delete" title="Delete" onclick="removeFile(this, event)"><i class="bi bi-trash"></i></button>
        </div>`;
    item.addEventListener('click', (e) => {
        if (!e.target.closest('.file-actions')) openFilePreview(item);
    });
    container.insertBefore(item, container.querySelector('.upload-add-btn'));
    updateUploadCount(containerId);
    updateDocStatus(containerId);
}

function openFilePreview(item) {
    const { fileUrl, fileName, fileSize, fileExt } = item.dataset;
    if (!fileUrl) return;
    const body = document.getElementById('filePreviewBody');
    const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExt);
    const isPdf = fileExt === 'pdf';

    body.innerHTML = isImage
        ? `<img src="${fileUrl}" class="file-preview-image" alt="${fileName}">`
        : isPdf
            ? `<iframe src="${fileUrl}" class="file-preview-pdf" title="${fileName}"></iframe>`
            : `<div class="file-preview-unsupported">
                   <i class="bi bi-file-earmark-text"></i>
                   <p>Preview not available for this file type.</p>
               </div>`;

    document.getElementById('filePreviewName').textContent = fileName;
    document.getElementById('filePreviewSize').textContent = fileSize;
    document.getElementById('filePreviewDownload').href = fileUrl;
    document.getElementById('filePreviewDownload').setAttribute('download', fileName);

    bootstrap.Modal.getOrCreateInstance(document.getElementById('filePreviewModal')).show();
}

function handleFileSelect(event, containerId) {
    const files = event.target.files;
    if (files && files.length) {
        Array.from(files).forEach(file => addFileItem(containerId, file));
    }
    event.target.value = '';
}

function handleFileDrop(event, containerId) {
    event.preventDefault();
    const container = document.getElementById(containerId);
    if (container) container.classList.remove('dragover');
    const files = event.dataTransfer.files;
    if (files && files.length) addFileItem(containerId, files[0]);
}

function toggleOthersInput() {
    const checkbox = document.getElementById('othersCheckbox');
    const input = document.getElementById('othersInput');
    if (!checkbox || !input) return;
    input.style.display = checkbox.checked ? 'block' : 'none';
    if (checkbox.checked) input.focus();
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
    const btnBackTop = document.getElementById('btnBackTop');
    const btnNextTop = document.getElementById('btnNextTop');
    const btnFinishTop = document.getElementById('btnFinishTop');

    const backVisibility = currentStep === 1 ? 'hidden' : 'visible';
    if (btnBack) btnBack.style.visibility = backVisibility;
    if (btnBackTop) btnBackTop.style.visibility = backVisibility;

    const onLastStep = currentStep === totalSteps;
    if (btnNext) btnNext.style.display = onLastStep ? 'none' : 'inline-flex';
    if (btnFinish) btnFinish.style.display = onLastStep ? 'inline-flex' : 'none';
    if (btnNextTop) btnNextTop.style.display = onLastStep ? 'none' : 'inline-flex';
    if (btnFinishTop) btnFinishTop.style.display = onLastStep ? 'inline-flex' : 'none';

    const setupStepLabel = document.getElementById('setupStepLabel');
    if (setupStepLabel) setupStepLabel.textContent = `Step ${currentStep} of ${totalSteps}`;

    const headerProgress = document.getElementById('setupHeaderProgress');
    if (headerProgress) headerProgress.style.width = `${((currentStep - 1) / (totalSteps - 1)) * 100}%`;
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

let branchesData = [
    { id: 1, name: 'Head Office', location: 'Dhaka', status: 'Active' },
    { id: 2, name: 'Chattogram Branch', location: 'Chattogram', status: 'Active' },
    { id: 3, name: 'Sylhet Branch', location: 'Sylhet', status: 'Active' }
];
let contactsData = [
    { id: 1, name: 'MD. Shaokat Hossain', role: 'Managing Director', badge: 'Primary', badgeType: '', email: 'shoakat@sttyre.com', mobile: '+880 1711 123456', phone: '+880 2 55012345' },
    { id: 2, name: 'Sumaiya Akter', role: 'Head of Accounts', badge: 'Accounts Head', badgeType: 'accounts', email: 'sumaiya@sttyre.com', mobile: '+880 1722 654321', phone: '+880 2 55012346' },
    { id: 3, name: 'Abdullah Al Mamun', role: 'IT Manager', badge: 'IT Manager', badgeType: 'it', email: 'it@sttyre.com', mobile: '+880 1844 112233', phone: '+880 2 55012347' }
];

function renderBranches() {
    const tbody = document.getElementById('branchesTableBody');
    if (!tbody) return;
    tbody.innerHTML = branchesData.map((b, i) => `
        <tr>
            <td>${i + 1}</td>
            <td>${b.name}</td>
            <td>${b.location}</td>
            <td><span class="branch-status">${b.status}</span></td>
            <td><i class="bi bi-pencil branch-action" onclick="editBranch(${b.id})"></i></td>
        </tr>`).join('');
    document.querySelectorAll('.card-title-custom').forEach(el => {
        if (el.textContent.trim().startsWith('Branches')) el.textContent = `Branches (${branchesData.length})`;
    });
}

function openBranchModal(id) {
    const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('branchModal'));
    const branch = branchesData.find(b => b.id === id);
    document.getElementById('branchModalTitle').textContent = branch ? 'Edit Branch' : 'Add Branch';
    document.getElementById('branchEditId').value = branch ? branch.id : '';
    document.getElementById('branchNameInput').value = branch ? branch.name : '';
    document.getElementById('branchLocationInput').value = branch ? branch.location : '';
    document.getElementById('branchStatusInput').value = branch ? branch.status : 'Active';
    modal.show();
}

function editBranch(id) {
    openBranchModal(id);
}

function saveBranch() {
    const name = document.getElementById('branchNameInput').value.trim();
    const location = document.getElementById('branchLocationInput').value.trim();
    const status = document.getElementById('branchStatusInput').value;
    const editId = document.getElementById('branchEditId').value;
    if (!name || !location) {
        showToast('Error', 'Branch name and location are required');
        return;
    }
    if (editId) {
        const branch = branchesData.find(b => b.id === Number(editId));
        if (branch) { branch.name = name; branch.location = location; branch.status = status; }
        showToast('Success', 'Branch updated successfully!');
    } else {
        const newId = branchesData.length ? Math.max(...branchesData.map(b => b.id)) + 1 : 1;
        branchesData.push({ id: newId, name, location, status });
        showToast('Success', 'Branch added successfully!');
    }
    renderBranches();
    bootstrap.Modal.getInstance(document.getElementById('branchModal')).hide();
}

function renderContacts() {
    const list = document.getElementById('contactsList');
    if (!list) return;
    list.innerHTML = contactsData.map(c => `
        <div class="contact-item">
            <img src="images/profile.jpg" alt="${c.name}" class="contact-avatar"
                onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=2563eb&color=fff'">
            <div class="contact-info">
                <div class="contact-header">
                    <span class="contact-name">${c.name}</span>
                    ${c.badge ? `<span class="contact-badge ${c.badgeType}">${c.badge}</span>` : ''}
                </div>
                <div class="contact-role">${c.role || ''}</div>
                ${c.email ? `<a href="mailto:${c.email}" class="contact-email">${c.email}</a>` : ''}
                <div class="contact-phones">
                    ${c.mobile ? `<div class="contact-phone"><i class="bi bi-phone"></i>${c.mobile}</div>` : ''}
                    ${c.phone ? `<div class="contact-phone"><i class="bi bi-telephone"></i>${c.phone}</div>` : ''}
                </div>
            </div>
            <i class="bi bi-pencil contact-edit" onclick="editContact(${c.id})"></i>
        </div>`).join('');
}

function openContactModal(id) {
    const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('contactModal'));
    const contact = contactsData.find(c => c.id === id);
    document.getElementById('contactModalTitle').textContent = contact ? 'Edit Contact Person' : 'Add Contact Person';
    document.getElementById('contactEditId').value = contact ? contact.id : '';
    document.getElementById('contactNameInput').value = contact ? contact.name : '';
    document.getElementById('contactRoleInput').value = contact ? contact.role : '';
    document.getElementById('contactBadgeInput').value = contact ? contact.badge : '';
    document.getElementById('contactBadgeTypeInput').value = contact ? contact.badgeType : '';
    document.getElementById('contactEmailInput').value = contact ? contact.email : '';
    document.getElementById('contactMobileInput').value = contact ? contact.mobile : '';
    document.getElementById('contactPhoneInput').value = contact ? contact.phone : '';
    modal.show();
}

function addContact() {
    openContactModal();
}

function editContact(id) {
    openContactModal(id);
}

function saveContact() {
    const name = document.getElementById('contactNameInput').value.trim();
    if (!name) {
        showToast('Error', 'Contact name is required');
        return;
    }
    const data = {
        name,
        role: document.getElementById('contactRoleInput').value.trim(),
        badge: document.getElementById('contactBadgeInput').value.trim(),
        badgeType: document.getElementById('contactBadgeTypeInput').value,
        email: document.getElementById('contactEmailInput').value.trim(),
        mobile: document.getElementById('contactMobileInput').value.trim(),
        phone: document.getElementById('contactPhoneInput').value.trim()
    };
    const editId = document.getElementById('contactEditId').value;
    if (editId) {
        const contact = contactsData.find(c => c.id === Number(editId));
        if (contact) Object.assign(contact, data);
        showToast('Success', 'Contact updated successfully!');
    } else {
        const newId = contactsData.length ? Math.max(...contactsData.map(c => c.id)) + 1 : 1;
        contactsData.push({ id: newId, ...data });
        showToast('Success', 'Contact added successfully!');
    }
    renderContacts();
    bootstrap.Modal.getInstance(document.getElementById('contactModal')).hide();
}

function editTaxSettings() {
    bootstrap.Modal.getOrCreateInstance(document.getElementById('taxSettingsModal')).show();
}

function saveTaxSettings() {
    const vatReg = document.getElementById('taxVatRegInput').value.trim();
    const tin = document.getElementById('taxTinInput').value.trim();
    const bin = document.getElementById('taxBinInput').value.trim();
    const rate = document.getElementById('taxVatRateInput').value;
    const applicable = document.getElementById('taxApplicableToggle').classList.contains('active');
    document.querySelectorAll('.tax-list .tax-item').forEach(item => {
        const label = item.querySelector('.tax-label')?.textContent.trim();
        const valueEl = item.querySelector('.tax-value, .badge-success');
        if (!label || !valueEl) return;
        if (label.startsWith('VAT Registration')) valueEl.textContent = vatReg;
        if (label.startsWith('TIN')) valueEl.textContent = tin;
        if (label.startsWith('BIN')) valueEl.textContent = bin;
        if (label.startsWith('VAT Applicable')) valueEl.textContent = applicable ? 'Yes' : 'No';
        if (label.startsWith('Default VAT Rate')) valueEl.textContent = `${rate} %`;
    });
    showToast('Success', 'Tax & VAT settings updated!');
    bootstrap.Modal.getInstance(document.getElementById('taxSettingsModal')).hide();
}

function editOpeningBalance() {
    bootstrap.Modal.getOrCreateInstance(document.getElementById('openingBalanceModal')).show();
}

function saveOpeningBalance() {
    const required = document.getElementById('obRequiredToggle').classList.contains('active');
    const date = document.getElementById('obDateInput').value;
    const posting = document.getElementById('obPostingInput').value;
    const formattedDate = date ? new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '';
    document.querySelectorAll('.sidebar-card').forEach(card => {
        const title = card.querySelector('.card-title')?.textContent.trim();
        if (title !== 'Opening Balance Settings') return;
        card.querySelectorAll('.tax-item').forEach(item => {
            const label = item.querySelector('.tax-label')?.textContent.trim();
            const valueEl = item.querySelector('.tax-value, .badge-success');
            if (!label || !valueEl) return;
            if (label.startsWith('Opening Balance Required')) valueEl.textContent = required ? 'Yes' : 'No';
            if (label.startsWith('Opening Balance Date')) valueEl.textContent = formattedDate;
            if (label.startsWith('Opening Balance Posting')) valueEl.textContent = posting;
        });
    });
    showToast('Success', 'Opening balance settings updated!');
    bootstrap.Modal.getInstance(document.getElementById('openingBalanceModal')).hide();
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
    renderBranches();
    renderContacts();
    updateUploadCount('otherDocUpload');
    ['tradeLicenseUpload', 'tinCertUpload', 'vatRegUpload', 'vatReturnUpload', 'taxReturnUpload', 'regCertUpload']
        .forEach(updateDocStatus);
});