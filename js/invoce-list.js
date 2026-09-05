// ==========================================
// STATE & MOCK DATA
// ==========================================
const AppState = {
    invoices: [],
    filtered: [],
    currentPage: 1,
    perPage: 10,
    selectedIds: new Set(),
    filters: { dateFrom: '', dateTo: '', customer: '', branch: '', paymentStatus: '', invoiceStatus: '', salesType: '' },
    search: '',
    deleteId: null
};

const MOCK_DATA = [
    { id: 1, invoiceNo: 'INV-000001', date: '2026-09-03', dueDate: '2026-09-18', customer: 'ABC Trading Ltd.', phone: '01712345678', address: '123 Business Park, Dhaka', branch: 'Dhaka Branch', salesType: 'Corporate', subtotal: 85000, discount: 2000, vat: 12450, shipping: 0, grandTotal: 95450, paid: 70000, due: 25450, paymentStatus: 'Partial', invoiceStatus: 'Confirmed', items: [{ product: 'ST Tyre 12R22.5', qty: 2, unit: 'Pcs', unitPrice: 25000, discount: 0, vat: 15, total: 50000 }, { product: 'ST Tyre 11R22.5', qty: 1, unit: 'Pcs', unitPrice: 35000, discount: 2000, vat: 15, total: 35000 }], notes: 'Deliver before 5 PM' },
    { id: 2, invoiceNo: 'INV-000002', date: '2026-09-02', dueDate: '2026-09-17', customer: 'XYZ Motors', phone: '01812345678', address: '456 Road, Chattogram', branch: 'Chattogram Branch', salesType: 'Wholesale', subtotal: 150000, discount: 0, vat: 22500, shipping: 500, grandTotal: 173000, paid: 173000, due: 0, paymentStatus: 'Paid', invoiceStatus: 'Confirmed', items: [{ product: 'Tube 12R', qty: 10, unit: 'Pcs', unitPrice: 15000, discount: 0, vat: 15, total: 150000 }], notes: '' },
    { id: 3, invoiceNo: 'INV-000003', date: '2026-09-01', dueDate: '2026-09-16', customer: 'Rahim Enterprise', phone: '01912345678', address: '789 Street, Sylhet', branch: 'Sylhet Branch', salesType: 'Retail', subtotal: 45000, discount: 1000, vat: 6600, shipping: 0, grandTotal: 50600, paid: 0, due: 50600, paymentStatus: 'Due', invoiceStatus: 'Draft', items: [{ product: 'ST Tyre 10R', qty: 3, unit: 'Pcs', unitPrice: 15000, discount: 1000, vat: 15, total: 45000 }], notes: '' },
    { id: 4, invoiceNo: 'INV-000004', date: '2026-08-28', dueDate: '2026-09-12', customer: 'ABC Trading Ltd.', phone: '01712345678', address: '123 Business Park, Dhaka', branch: 'Dhaka Branch', salesType: 'Corporate', subtotal: 200000, discount: 5000, vat: 29250, shipping: 1000, grandTotal: 225250, paid: 100000, due: 125250, paymentStatus: 'Partial', invoiceStatus: 'Confirmed', items: [{ product: 'ST Tyre 12R22.5', qty: 8, unit: 'Pcs', unitPrice: 25000, discount: 5000, vat: 15, total: 200000 }], notes: '' },
    { id: 5, invoiceNo: 'INV-000005', date: '2026-08-25', dueDate: '2026-09-09', customer: 'XYZ Motors', phone: '01812345678', address: '456 Road, Chattogram', branch: 'Chattogram Branch', salesType: 'Wholesale', subtotal: 75000, discount: 0, vat: 11250, shipping: 0, grandTotal: 86250, paid: 86250, due: 0, paymentStatus: 'Paid', invoiceStatus: 'Confirmed', items: [{ product: 'Tube 11R', qty: 5, unit: 'Pcs', unitPrice: 15000, discount: 0, vat: 15, total: 75000 }], notes: '' },
    { id: 6, invoiceNo: 'INV-000006', date: '2026-08-20', dueDate: '2026-09-04', customer: 'Rahim Enterprise', phone: '01912345678', address: '789 Street, Sylhet', branch: 'Sylhet Branch', salesType: 'Retail', subtotal: 30000, discount: 0, vat: 4500, shipping: 0, grandTotal: 34500, paid: 0, due: 34500, paymentStatus: 'Due', invoiceStatus: 'Cancelled', items: [{ product: 'ST Tyre 9R', qty: 2, unit: 'Pcs', unitPrice: 15000, discount: 0, vat: 15, total: 30000 }], notes: 'Cancelled by customer' }
];

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    AppState.invoices = [...MOCK_DATA];
    AppState.filtered = [...MOCK_DATA];

    document.getElementById('payDate').valueAsDate = new Date();

    renderTable();
    updateKPIs();
    bindEvents();
});

function bindEvents() {
    // Sidebar toggle
    document.getElementById('topbarSidebarToggle').addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('show');
        document.getElementById('mobileOverlay').classList.toggle('show');
    });
    document.getElementById('mobileOverlay').addEventListener('click', () => {
        document.getElementById('sidebar').classList.remove('show');
        document.getElementById('mobileOverlay').classList.remove('show');
    });

    // Header buttons
    document.getElementById('btnCreateInvoice').addEventListener('click', openCreateInvoice);
    document.getElementById('btnExport').addEventListener('click', exportToExcel);
    document.getElementById('btnPrintList').addEventListener('click', () => window.print());
    document.getElementById('btnToggleFilters').addEventListener('click', () => {
        document.getElementById('filterBar').classList.toggle('show');
    });

    // Filter buttons
    document.getElementById('btnApplyFilters').addEventListener('click', applyFilters);
    document.getElementById('btnResetFilters').addEventListener('click', resetFilters);

    // Search & Pagination
    document.getElementById('searchInput').addEventListener('input', (e) => {
        AppState.search = e.target.value;
        AppState.currentPage = 1;
        renderTable();
    });
    document.getElementById('perPageSelect').addEventListener('change', (e) => {
        AppState.perPage = parseInt(e.target.value);
        AppState.currentPage = 1;
        renderTable();
    });

    // Selection
    document.getElementById('selectAll').addEventListener('change', (e) => toggleSelectAll(e.target));

    // Bulk actions
    document.getElementById('btnBulkExport').addEventListener('click', () => bulkAction('export'));
    document.getElementById('btnBulkConfirm').addEventListener('click', () => bulkAction('confirm'));
    document.getElementById('btnBulkCancel').addEventListener('click', () => bulkAction('cancel'));

    // Offcanvas form
    document.getElementById('btnAddItem').addEventListener('click', () => addInvoiceItem());
    document.getElementById('invPaid').addEventListener('input', calculateInvoice);
    document.getElementById('invShipping').addEventListener('input', calculateInvoice);
    document.getElementById('invCustomer').addEventListener('change', (e) => fillCustomerDetails(e.target.value));

    // Delegate events for dynamic item rows
    document.getElementById('itemsBody').addEventListener('input', (e) => {
        if (e.target.classList.contains('item-qty') || e.target.classList.contains('item-price') ||
            e.target.classList.contains('item-discount') || e.target.classList.contains('item-vat')) {
            calculateInvoice();
        }
    });
    document.getElementById('itemsBody').addEventListener('click', (e) => {
        if (e.target.closest('.btn-remove-row')) {
            e.target.closest('tr').remove();
            calculateInvoice();
        }
    });

    // Save buttons
    document.getElementById('btnSaveDraft').addEventListener('click', () => saveInvoice('Draft'));
    document.getElementById('btnSaveInvoice').addEventListener('click', () => saveInvoice('Confirmed'));

    // Payment modal
    document.getElementById('btnSubmitPayment').addEventListener('click', submitPayment);

    // Delete modal
    document.getElementById('confirmDeleteBtn').addEventListener('click', confirmDeleteAction);

    // Print invoice from modal
    document.getElementById('btnPrintInvoice').addEventListener('click', () => window.print());
}

// ==========================================
// RENDER & LOGIC
// ==========================================
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-BD', { style: 'currency', currency: 'BDT' }).format(amount);
}

function formatDate(dateStr) {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB');
}

function updateKPIs() {
    const total = AppState.invoices.length;
    const currentMonth = new Date().getMonth();
    const now = new Date();
    const monthCount = AppState.invoices.filter(inv => {
        const d = new Date(inv.date);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;
    const paid = AppState.invoices.filter(inv => inv.paymentStatus === 'Paid').reduce((sum, inv) => sum + inv.grandTotal, 0);
    const due = AppState.invoices.filter(inv => inv.paymentStatus !== 'Paid').reduce((sum, inv) => sum + inv.due, 0);
    const sales = AppState.invoices.filter(inv => inv.invoiceStatus !== 'Cancelled').reduce((sum, inv) => sum + inv.grandTotal, 0);

    document.getElementById('kpiTotal').textContent = total;
    document.getElementById('kpiMonth').textContent = monthCount;
    document.getElementById('kpiPaid').textContent = formatCurrency(paid);
    document.getElementById('kpiDue').textContent = formatCurrency(due);
    document.getElementById('kpiSales').textContent = formatCurrency(sales);
}

function renderTable() {
    const tbody = document.getElementById('tableBody');
    let data = [...AppState.filtered];

    if (AppState.search) {
        const q = AppState.search.toLowerCase();
        data = data.filter(inv =>
            inv.invoiceNo.toLowerCase().includes(q) ||
            inv.customer.toLowerCase().includes(q) ||
            inv.phone.includes(q)
        );
    }

    const total = data.length;
    const totalPages = Math.max(1, Math.ceil(total / AppState.perPage));
    if (AppState.currentPage > totalPages) AppState.currentPage = totalPages;
    const start = (AppState.currentPage - 1) * AppState.perPage;
    const pageData = data.slice(start, start + AppState.perPage);

    if (pageData.length === 0) {
        tbody.innerHTML = `<tr><td colspan="12" class="text-center py-5 text-muted">No invoices found matching your criteria.</td></tr>`;
    } else {
        tbody.innerHTML = pageData.map(inv => `
            <tr>
                <td><input type="checkbox" class="form-check-input row-checkbox" value="${inv.id}" ${AppState.selectedIds.has(inv.id) ? 'checked' : ''}></td>
                <td><span class="req-no" data-id="${inv.id}">${inv.invoiceNo}</span></td>
                <td>${formatDate(inv.date)}</td>
                <td><strong>${inv.customer}</strong></td>
                <td>${inv.phone}</td>
                <td><span class="badge bg-light text-dark border">${inv.salesType}</span></td>
                <td class="text-end fw-bold">${formatCurrency(inv.grandTotal)}</td>
                <td class="text-end text-success">${formatCurrency(inv.paid)}</td>
                <td class="text-end text-danger">${formatCurrency(inv.due)}</td>
                <td class="text-center"><span class="status-badge status-${inv.paymentStatus.toLowerCase()}">${inv.paymentStatus}</span></td>
                <td class="text-center"><span class="status-badge status-${inv.invoiceStatus.toLowerCase()}">${inv.invoiceStatus}</span></td>
                <td class="text-center">
                    <div class="action-btns">
                        <button class="action-btn view" title="View" data-action="view" data-id="${inv.id}"><i class="bi bi-eye"></i></button>
                        <button class="action-btn edit" title="Edit" data-action="edit" data-id="${inv.id}"><i class="bi bi-pencil"></i></button>
                        <button class="action-btn pay" title="Payment" data-action="pay" data-id="${inv.id}"><i class="bi bi-cash-coin"></i></button>
                        <button class="action-btn print" title="Print" data-action="print" data-id="${inv.id}"><i class="bi bi-printer"></i></button>
                        <button class="action-btn delete" title="Delete" data-action="delete" data-id="${inv.id}"><i class="bi bi-trash"></i></button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    // Update info & pagination
    const showing = pageData.length > 0 ? `${start + 1}–${Math.min(start + AppState.perPage, total)}` : '0';
    document.getElementById('tableInfo').textContent = `Showing ${showing} of ${total} invoices`;

    const pagContainer = document.getElementById('pagination');
    let pagHtml = `<button class="page-btn" ${AppState.currentPage === 1 ? 'disabled' : ''} data-page="prev"><i class="bi bi-chevron-left"></i></button>`;
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= AppState.currentPage - 1 && i <= AppState.currentPage + 1)) {
            pagHtml += `<button class="page-btn ${i === AppState.currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
        } else if (i === AppState.currentPage - 2 || i === AppState.currentPage + 2) {
            pagHtml += `<button class="page-btn" disabled>...</button>`;
        }
    }
    pagHtml += `<button class="page-btn" ${AppState.currentPage === totalPages ? 'disabled' : ''} data-page="next"><i class="bi bi-chevron-right"></i></button>`;
    pagContainer.innerHTML = pagHtml;

    // Bind table events
    tbody.querySelectorAll('.row-checkbox').forEach(cb => {
        cb.addEventListener('change', (e) => {
            const id = parseInt(e.target.value);
            if (e.target.checked) AppState.selectedIds.add(id);
            else AppState.selectedIds.delete(id);
            updateBulkActions();
        });
    });

    tbody.querySelectorAll('[data-action]').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            const action = btn.dataset.action;
            if (action === 'view') openViewInvoice(id);
            else if (action === 'edit') openEditInvoice(id);
            else if (action === 'pay') openPaymentModal(id);
            else if (action === 'print') { openViewInvoice(id); setTimeout(() => window.print(), 300); }
            else if (action === 'delete') confirmDelete(id);
        });
    });

    pagContainer.querySelectorAll('.page-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const page = btn.dataset.page;
            if (page === 'prev') AppState.currentPage--;
            else if (page === 'next') AppState.currentPage++;
            else AppState.currentPage = parseInt(page);
            renderTable();
        });
    });

    updateBulkActions();
}

// ==========================================
// FILTERS & SEARCH
// ==========================================
function applyFilters() {
    AppState.filters = {
        dateFrom: document.getElementById('filterDateFrom').value,
        dateTo: document.getElementById('filterDateTo').value,
        customer: document.getElementById('filterCustomer').value.toLowerCase(),
        branch: document.getElementById('filterBranch').value,
        paymentStatus: document.getElementById('filterPaymentStatus').value,
        invoiceStatus: document.getElementById('filterInvoiceStatus').value,
        salesType: document.getElementById('filterSalesType').value
    };

    AppState.filtered = AppState.invoices.filter(inv => {
        if (AppState.filters.dateFrom && inv.date < AppState.filters.dateFrom) return false;
        if (AppState.filters.dateTo && inv.date > AppState.filters.dateTo) return false;
        if (AppState.filters.customer && !inv.customer.toLowerCase().includes(AppState.filters.customer)) return false;
        if (AppState.filters.branch && inv.branch !== AppState.filters.branch) return false;
        if (AppState.filters.paymentStatus && inv.paymentStatus !== AppState.filters.paymentStatus) return false;
        if (AppState.filters.invoiceStatus && inv.invoiceStatus !== AppState.filters.invoiceStatus) return false;
        if (AppState.filters.salesType && inv.salesType !== AppState.filters.salesType) return false;
        return true;
    });
    AppState.currentPage = 1;
    renderTable();
    showToast('Success', 'Filters applied successfully', 'success');
}

function resetFilters() {
    document.getElementById('filterDateFrom').value = '';
    document.getElementById('filterDateTo').value = '';
    document.getElementById('filterCustomer').value = '';
    document.getElementById('filterBranch').value = '';
    document.getElementById('filterPaymentStatus').value = '';
    document.getElementById('filterInvoiceStatus').value = '';
    document.getElementById('filterSalesType').value = '';
    document.getElementById('searchInput').value = '';
    AppState.filters = { dateFrom: '', dateTo: '', customer: '', branch: '', paymentStatus: '', invoiceStatus: '', salesType: '' };
    AppState.search = '';
    AppState.filtered = [...AppState.invoices];
    AppState.currentPage = 1;
    renderTable();
}

// ==========================================
// SELECTION & BULK ACTIONS
// ==========================================
function toggleSelectAll(checkbox) {
    const checkboxes = document.querySelectorAll('.row-checkbox');
    checkboxes.forEach(cb => {
        cb.checked = checkbox.checked;
        const id = parseInt(cb.value);
        if (checkbox.checked) AppState.selectedIds.add(id);
        else AppState.selectedIds.delete(id);
    });
    updateBulkActions();
}

function updateBulkActions() {
    const bar = document.getElementById('bulkActions');
    const count = AppState.selectedIds.size;
    document.getElementById('selectedCount').textContent = count;
    if (count > 0) bar.classList.add('show');
    else bar.classList.remove('show');

    const visibleCheckboxes = document.querySelectorAll('.row-checkbox');
    const allChecked = visibleCheckboxes.length > 0 && Array.from(visibleCheckboxes).every(cb => cb.checked);
    document.getElementById('selectAll').checked = allChecked;
}

function bulkAction(action) {
    if (action === 'confirm') {
        AppState.invoices.forEach(inv => {
            if (AppState.selectedIds.has(inv.id)) inv.invoiceStatus = 'Confirmed';
        });
        showToast('Success', 'Selected invoices marked as confirmed', 'success');
    } else if (action === 'cancel') {
        if (!confirm('Are you sure you want to cancel selected invoices?')) return;
        AppState.invoices.forEach(inv => {
            if (AppState.selectedIds.has(inv.id)) inv.invoiceStatus = 'Cancelled';
        });
        showToast('Success', 'Selected invoices cancelled', 'success');
    } else if (action === 'export') {
        exportToExcel();
    }
    AppState.selectedIds.clear();
    applyFilters();
}

// ==========================================
// INVOICE CRUD
// ==========================================
function openCreateInvoice() {
    document.getElementById('invoiceForm').reset();
    document.getElementById('editInvoiceId').value = '';
    document.getElementById('offcanvasTitle').textContent = 'Create Sales Invoice';
    document.getElementById('offcanvasSubtitle').textContent = 'Create a new customer sales invoice';

    const nextId = Math.max(...AppState.invoices.map(i => i.id)) + 1;
    document.getElementById('invNo').value = `INV-${String(nextId).padStart(6, '0')}`;
    document.getElementById('invDate').valueAsDate = new Date();

    document.getElementById('itemsBody').innerHTML = '';
    addInvoiceItem();
    calculateInvoice();

    new bootstrap.Offcanvas(document.getElementById('invoiceOffcanvas')).show();
}

function openEditInvoice(id) {
    const inv = AppState.invoices.find(i => i.id === id);
    if (!inv) return;

    document.getElementById('editInvoiceId').value = inv.id;
    document.getElementById('offcanvasTitle').textContent = 'Edit Sales Invoice';
    document.getElementById('offcanvasSubtitle').textContent = `Editing ${inv.invoiceNo}`;

    document.getElementById('invNo').value = inv.invoiceNo;
    document.getElementById('invDate').value = inv.date;
    document.getElementById('invDueDate').value = inv.dueDate;
    document.getElementById('invBranch').value = inv.branch;
    document.getElementById('invSalesType').value = inv.salesType;
    document.getElementById('invCustomer').value = inv.customer;
    document.getElementById('invPhone').value = inv.phone;
    document.getElementById('invAddress').value = inv.address;
    document.getElementById('invPayMethod').value = inv.paymentMethod || 'Cash';
    document.getElementById('invPaid').value = inv.paid;
    document.getElementById('invShipping').value = inv.shipping || 0;
    document.getElementById('invNotes').value = inv.notes || '';

    const tbody = document.getElementById('itemsBody');
    tbody.innerHTML = '';
    inv.items.forEach(item => addInvoiceItem(item));
    calculateInvoice();

    new bootstrap.Offcanvas(document.getElementById('invoiceOffcanvas')).show();
}

function addInvoiceItem(data = null) {
    const tbody = document.getElementById('itemsBody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="text" class="item-product" value="${data ? data.product : ''}" placeholder="Product name" required></td>
        <td><input type="number" class="item-qty" value="${data ? data.qty : 1}" min="1" required></td>
        <td>
            <select class="item-unit">
                <option value="Pcs" ${data && data.unit === 'Pcs' ? 'selected' : ''}>Pcs</option>
                <option value="Box" ${data && data.unit === 'Box' ? 'selected' : ''}>Box</option>
            </select>
        </td>
        <td><input type="number" class="item-price" value="${data ? data.unitPrice : 0}" min="0" step="0.01" required></td>
        <td><input type="number" class="item-discount" value="${data ? data.discount : 0}" min="0" step="0.01"></td>
        <td><input type="number" class="item-vat" value="${data ? data.vat : 15}" min="0" max="100"></td>
        <td class="text-end fw-bold item-total">৳ 0.00</td>
        <td class="text-center"><button type="button" class="btn-remove-row"><i class="bi bi-x-lg"></i></button></td>
    `;
    tbody.appendChild(row);
    calculateInvoice();
}

function calculateInvoice() {
    let subtotal = 0;
    let totalDiscount = 0;
    let totalVat = 0;

    document.querySelectorAll('#itemsBody tr').forEach(row => {
        const qty = parseFloat(row.querySelector('.item-qty').value) || 0;
        const price = parseFloat(row.querySelector('.item-price').value) || 0;
        const discount = parseFloat(row.querySelector('.item-discount').value) || 0;
        const vatPercent = parseFloat(row.querySelector('.item-vat').value) || 0;

        const lineSubtotal = qty * price;
        const taxable = Math.max(0, lineSubtotal - discount);
        const lineVat = taxable * (vatPercent / 100);
        const lineTotal = taxable + lineVat;

        row.querySelector('.item-total').textContent = formatCurrency(lineTotal);

        subtotal += lineSubtotal;
        totalDiscount += discount;
        totalVat += lineVat;
    });

    const shipping = parseFloat(document.getElementById('invShipping').value) || 0;
    const grandTotal = subtotal - totalDiscount + totalVat + shipping;
    const paid = parseFloat(document.getElementById('invPaid').value) || 0;
    const due = Math.max(0, grandTotal - paid);

    document.getElementById('sumSubtotal').textContent = formatCurrency(subtotal);
    document.getElementById('sumDiscount').textContent = `- ${formatCurrency(totalDiscount)}`;
    document.getElementById('sumVat').textContent = formatCurrency(totalVat);
    document.getElementById('sumGrandTotal').textContent = formatCurrency(grandTotal);
    document.getElementById('sumPaid').textContent = formatCurrency(paid);
    document.getElementById('sumDue').textContent = formatCurrency(due);
}

function saveInvoice(status) {
    const form = document.getElementById('invoiceForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const editId = document.getElementById('editInvoiceId').value;
    const items = [];
    document.querySelectorAll('#itemsBody tr').forEach(row => {
        items.push({
            product: row.querySelector('.item-product').value,
            qty: parseFloat(row.querySelector('.item-qty').value) || 0,
            unit: row.querySelector('.item-unit').value,
            unitPrice: parseFloat(row.querySelector('.item-price').value) || 0,
            discount: parseFloat(row.querySelector('.item-discount').value) || 0,
            vat: parseFloat(row.querySelector('.item-vat').value) || 0,
            total: 0
        });
    });

    let subtotal = 0, totalDiscount = 0, totalVat = 0;
    items.forEach(item => {
        const lineSub = item.qty * item.unitPrice;
        const taxable = Math.max(0, lineSub - item.discount);
        item.total = taxable + (taxable * (item.vat / 100));
        subtotal += lineSub;
        totalDiscount += item.discount;
        totalVat += (taxable * (item.vat / 100));
    });

    const shipping = parseFloat(document.getElementById('invShipping').value) || 0;
    const grandTotal = subtotal - totalDiscount + totalVat + shipping;
    const paid = parseFloat(document.getElementById('invPaid').value) || 0;
    const due = Math.max(0, grandTotal - paid);

    let payStatus = 'Due';
    if (paid >= grandTotal) payStatus = 'Paid';
    else if (paid > 0) payStatus = 'Partial';

    const invoiceData = {
        id: editId ? parseInt(editId) : Math.max(...AppState.invoices.map(i => i.id)) + 1,
        invoiceNo: document.getElementById('invNo').value,
        date: document.getElementById('invDate').value,
        dueDate: document.getElementById('invDueDate').value,
        customer: document.getElementById('invCustomer').value,
        phone: document.getElementById('invPhone').value,
        address: document.getElementById('invAddress').value,
        branch: document.getElementById('invBranch').value,
        salesType: document.getElementById('invSalesType').value,
        paymentMethod: document.getElementById('invPayMethod').value,
        subtotal, discount: totalDiscount, vat: totalVat, shipping, grandTotal, paid, due,
        paymentStatus: payStatus,
        invoiceStatus: status,
        items,
        notes: document.getElementById('invNotes').value
    };

    if (editId) {
        const idx = AppState.invoices.findIndex(i => i.id === parseInt(editId));
        AppState.invoices[idx] = invoiceData;
        showToast('Success', `${invoiceData.invoiceNo} updated successfully`, 'success');
    } else {
        AppState.invoices.unshift(invoiceData);
        showToast('Success', `${invoiceData.invoiceNo} created successfully`, 'success');
    }

    bootstrap.Offcanvas.getInstance(document.getElementById('invoiceOffcanvas')).hide();
    applyFilters();
    updateKPIs();
}

// ==========================================
// VIEW & PAYMENT
// ==========================================
function openViewInvoice(id) {
    const inv = AppState.invoices.find(i => i.id === id);
    if (!inv) return;

    document.getElementById('viewInvNo').textContent = inv.invoiceNo;
    document.getElementById('viewInvDate').textContent = formatDate(inv.date);
    document.getElementById('viewInvDue').textContent = formatDate(inv.dueDate);
    document.getElementById('viewCustomer').textContent = inv.customer;
    document.getElementById('viewAddress').textContent = inv.address || '-';
    document.getElementById('viewPhone').textContent = inv.phone || '-';
    document.getElementById('viewNotes').textContent = inv.notes || 'Thank you for your business.';

    const tbody = document.getElementById('viewItemsBody');
    tbody.innerHTML = inv.items.map((item, idx) => `
        <tr>
            <td>${idx + 1}</td>
            <td>${item.product}</td>
            <td class="text-center">${item.qty} ${item.unit}</td>
            <td class="text-end">${formatCurrency(item.unitPrice)}</td>
            <td class="text-end">${formatCurrency(item.discount)}</td>
            <td class="text-end">${item.vat}%</td>
            <td class="text-end fw-bold">${formatCurrency(item.total)}</td>
        </tr>
    `).join('');

    document.getElementById('viewSubtotal').textContent = formatCurrency(inv.subtotal);
    document.getElementById('viewDiscount').textContent = `- ${formatCurrency(inv.discount)}`;
    document.getElementById('viewVat').textContent = formatCurrency(inv.vat);
    document.getElementById('viewShipping').textContent = formatCurrency(inv.shipping);
    document.getElementById('viewGrandTotal').textContent = formatCurrency(inv.grandTotal);

    new bootstrap.Modal(document.getElementById('viewInvoiceModal')).show();
}

function openPaymentModal(id) {
    const inv = AppState.invoices.find(i => i.id === id);
    if (!inv) return;

    document.getElementById('payInvoiceId').value = id;
    document.getElementById('payInvNo').textContent = inv.invoiceNo;
    document.getElementById('payCustomer').textContent = inv.customer;
    document.getElementById('payDue').textContent = formatCurrency(inv.due);
    document.getElementById('payAmount').value = inv.due;
    document.getElementById('payAmount').max = inv.due;

    new bootstrap.Modal(document.getElementById('paymentModal')).show();
}

function submitPayment() {
    const id = parseInt(document.getElementById('payInvoiceId').value);
    const amount = parseFloat(document.getElementById('payAmount').value) || 0;
    const inv = AppState.invoices.find(i => i.id === id);

    if (amount <= 0 || amount > inv.due) {
        showToast('Error', 'Invalid payment amount', 'error');
        return;
    }

    inv.paid += amount;
    inv.due = Math.max(0, inv.grandTotal - inv.paid);
    inv.paymentStatus = inv.due === 0 ? 'Paid' : 'Partial';

    bootstrap.Modal.getInstance(document.getElementById('paymentModal')).hide();
    applyFilters();
    updateKPIs();
    showToast('Success', 'Payment recorded successfully', 'success');
}

// ==========================================
// DELETE
// ==========================================
function confirmDelete(id) {
    const inv = AppState.invoices.find(i => i.id === id);
    AppState.deleteId = id;
    document.getElementById('deleteInvNo').textContent = inv.invoiceNo;
    new bootstrap.Modal(document.getElementById('deleteModal')).show();
}

function confirmDeleteAction() {
    if (AppState.deleteId) {
        AppState.invoices = AppState.invoices.filter(i => i.id !== AppState.deleteId);
        bootstrap.Modal.getInstance(document.getElementById('deleteModal')).hide();
        applyFilters();
        updateKPIs();
        showToast('Success', 'Invoice deleted successfully', 'success');
        AppState.deleteId = null;
    }
}

// ==========================================
// UTILS
// ==========================================
function showToast(title, message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast-modern ${type}`;
    const icon = type === 'success' ? 'check-circle-fill' : type === 'error' ? 'x-circle-fill' : 'info-circle-fill';
    toast.innerHTML = `
        <div class="toast-icon"><i class="bi bi-${icon}"></i></div>
        <div>
            <div class="toast-title">${title}</div>
            <div class="toast-msg">${message}</div>
        </div>
    `;
    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function exportToExcel() {
    showToast('Info', 'Preparing CSV export...', 'info');
    setTimeout(() => {
        const headers = ['Invoice No', 'Date', 'Customer', 'Branch', 'Sales Type', 'Grand Total', 'Paid', 'Due', 'Status'];
        const rows = AppState.filtered.map(inv => [
            inv.invoiceNo, inv.date, inv.customer, inv.branch, inv.salesType,
            inv.grandTotal, inv.paid, inv.due, inv.invoiceStatus
        ]);
        const csv = [headers, ...rows].map(row => row.map(v => `"${v}"`).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `invoices_${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        showToast('Success', 'Export downloaded successfully', 'success');
    }, 500);
}

function fillCustomerDetails(val) {
    if (val === 'ABC Trading Ltd.') {
        document.getElementById('invPhone').value = '01712345678';
        document.getElementById('invAddress').value = '123 Business Park, Dhaka';
    } else if (val === 'XYZ Motors') {
        document.getElementById('invPhone').value = '01812345678';
        document.getElementById('invAddress').value = '456 Road, Chattogram';
    } else {
        document.getElementById('invPhone').value = '';
        document.getElementById('invAddress').value = '';
    }
}