// ========================================
// REQUISITION MANAGEMENT SYSTEM
// ========================================

// Rich Dummy Data (20 Records)
(function () {
    const REQUISITION_DATA = [
        { id: 1, no: 'REQ-0003', wing: 'Ifat Tayer', warehouse: 'Dhaka Dhanmondi Warehouse', type: 'local', qty: 11.00, date: '2026-08-01', place: '-', status: 'created', remarks: '' },
        { id: 2, no: 'REQ-0002', wing: 'Ifat Tayer', warehouse: 'Dhaka Dhanmondi Warehouse', type: 'local', qty: 57.00, date: '2026-09-03', place: 'Dhanmondi', status: 'created', remarks: '' },
        { id: 3, no: 'REQ-0001', wing: 'Ifat Tayer', warehouse: 'Dhaka Dhanmondi Warehouse', type: 'local', qty: 4.00, date: '2026-09-03', place: 'Dhanmondi', status: 'created', remarks: '' },
        { id: 4, no: 'REQ-0004', wing: 'ST Tyre', warehouse: 'Chattogram Warehouse', type: 'import', qty: 120.50, date: '2026-09-01', place: 'Chattogram Port', status: 'pending', remarks: 'Urgent delivery' },
        { id: 5, no: 'REQ-0005', wing: 'Bearing Div', warehouse: 'Sylhet Warehouse', type: 'transfer', qty: 85.00, date: '2026-08-28', place: 'Sylhet', status: 'approved', remarks: '' },
        { id: 6, no: 'REQ-0006', wing: 'ST Tyre', warehouse: 'Dhaka Dhanmondi Warehouse', type: 'local', qty: 200.00, date: '2026-08-25', place: 'Mirpur', status: 'completed', remarks: 'Completed successfully' },
        { id: 7, no: 'REQ-0007', wing: 'Ifat Tayer', warehouse: 'Chattogram Warehouse', type: 'import', qty: 45.75, date: '2026-08-20', place: 'Chattogram', status: 'rejected', remarks: 'Quality issue' },
        { id: 8, no: 'REQ-0008', wing: 'Bearing Div', warehouse: 'Dhaka Dhanmondi Warehouse', type: 'local', qty: 32.00, date: '2026-08-15', place: 'Gulshan', status: 'created', remarks: '' },
        { id: 9, no: 'REQ-0009', wing: 'ST Tyre', warehouse: 'Sylhet Warehouse', type: 'transfer', qty: 150.00, date: '2026-08-10', place: 'Sylhet City', status: 'pending', remarks: '' },
        { id: 10, no: 'REQ-0010', wing: 'Ifat Tayer', warehouse: 'Dhaka Dhanmondi Warehouse', type: 'local', qty: 78.25, date: '2026-08-05', place: 'Uttara', status: 'approved', remarks: '' },
        { id: 11, no: 'REQ-0011', wing: 'ST Tyre', warehouse: 'Chattogram Warehouse', type: 'import', qty: 310.00, date: '2026-07-28', place: 'Chattogram Port', status: 'completed', remarks: 'Delivered on time' },
        { id: 12, no: 'REQ-0012', wing: 'Bearing Div', warehouse: 'Sylhet Warehouse', type: 'local', qty: 18.50, date: '2026-07-22', place: 'Sylhet', status: 'created', remarks: '' },
        { id: 13, no: 'REQ-0013', wing: 'Ifat Tayer', warehouse: 'Dhaka Dhanmondi Warehouse', type: 'transfer', qty: 95.00, date: '2026-07-18', place: 'Banani', status: 'approved', remarks: '' },
        { id: 14, no: 'REQ-0014', wing: 'ST Tyre', warehouse: 'Chattogram Warehouse', type: 'local', qty: 62.00, date: '2026-07-15', place: 'Agrabad', status: 'pending', remarks: '' },
        { id: 15, no: 'REQ-0015', wing: 'Bearing Div', warehouse: 'Dhaka Dhanmondi Warehouse', type: 'import', qty: 420.00, date: '2026-07-10', place: 'Dhaka Port', status: 'rejected', remarks: 'Documentation incomplete' },
        { id: 16, no: 'REQ-0016', wing: 'Ifat Tayer', warehouse: 'Sylhet Warehouse', type: 'local', qty: 14.25, date: '2026-07-05', place: 'Sylhet', status: 'completed', remarks: '' },
        { id: 17, no: 'REQ-0017', wing: 'ST Tyre', warehouse: 'Dhaka Dhanmondi Warehouse', type: 'transfer', qty: 88.00, date: '2026-06-28', place: 'Motijheel', status: 'created', remarks: '' },
        { id: 18, no: 'REQ-0018', wing: 'Bearing Div', warehouse: 'Chattogram Warehouse', type: 'import', qty: 250.00, date: '2026-06-20', place: 'Chattogram Port', status: 'approved', remarks: '' },
        { id: 19, no: 'REQ-0019', wing: 'Ifat Tayer', warehouse: 'Dhaka Dhanmondi Warehouse', type: 'local', qty: 36.50, date: '2026-06-15', place: 'Dhanmondi', status: 'pending', remarks: '' },
        { id: 20, no: 'REQ-0020', wing: 'ST Tyre', warehouse: 'Sylhet Warehouse', type: 'local', qty: 112.00, date: '2026-06-10', place: 'Sylhet City', status: 'completed', remarks: 'Successfully completed' },
    ];

    // State Management
    const state = {
        data: [...REQUISITION_DATA],
        filtered: [...REQUISITION_DATA],
        currentPage: 1,
        perPage: 10,
        sortKey: null,
        sortDir: 'asc',
        search: '',
        deleteId: null,
        activeFilters: {
            wing: '',
            warehouse: '',
            type: '',
            dateFrom: '',
            dateTo: ''
        }
    };

    // Utility Functions
    const $ = (id) => document.getElementById(id);
    const $$ = (selector) => document.querySelectorAll(selector);

    const formatDate = (iso) => {
        if (!iso) return '-';
        const [y, m, d] = iso.split('-');
        return `${d}-${m}-${y}`;
    };

    const escapeHtml = (str) => String(str ?? '').replace(/[&<>"']/g, m => (
        { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]
    ));

    const formatQty = (n) => Number(n).toFixed(2);

    const STATUS_MAP = {
        created: { label: 'Created', cls: 'status-created' },
        pending: { label: 'Pending Approval', cls: 'status-pending' },
        approved: { label: 'Approved', cls: 'status-approved' },
        rejected: { label: 'Rejected', cls: 'status-rejected' },
        completed: { label: 'Completed', cls: 'status-completed' },
    };

    const TYPE_MAP = {
        local: { label: 'Local', cls: 'type-local' },
        import: { label: 'Import', cls: 'type-import' },
        transfer: { label: 'Transfer', cls: 'type-transfer' },
    };

    // ========================================
    // KPI UPDATE FUNCTION
    // ========================================
    function updateKPIStats() {
        const total = state.data.length;
        const pending = state.data.filter(r => r.status === 'pending').length;
        const approved = state.data.filter(r => r.status === 'approved').length;
        const completed = state.data.filter(r => r.status === 'completed').length;
        const totalQty = state.data.reduce((sum, r) => sum + Number(r.qty || 0), 0);

        $('kpiTotal').textContent = total;
        $('kpiPending').textContent = pending;
        $('kpiApproved').textContent = approved;
        $('kpiCompleted').textContent = completed;
        $('kpiQty').textContent = totalQty.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    // Loading Overlay
    function showLoading() {
        $('loadingOverlay').classList.add('active');
    }

    function hideLoading() {
        setTimeout(() => {
            $('loadingOverlay').classList.remove('active');
        }, 300);
    }

    // Toast Notification
    function showToast(title, message, type = 'success') {
        const container = $('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast-modern ${type}`;

        const icons = {
            success: 'check-circle-fill',
            error: 'x-circle-fill',
            warning: 'exclamation-triangle-fill',
            info: 'info-circle-fill'
        };

        toast.innerHTML = `
            <div class="toast-icon">
                <i class="bi bi-${icons[type]}"></i>
            </div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-msg">${message}</div>
            </div>
        `;

        container.appendChild(toast);

        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 10);

        setTimeout(() => {
            toast.classList.add('hiding');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    // ========================================
    // ACTIVE FILTER CHIPS
    // ========================================
    function updateActiveFilterChips() {
        const chipsContainer = $('filterChips');
        const activeFiltersDiv = $('activeFilters');
        const filters = state.activeFilters;

        let chips = [];

        if (filters.wing) {
            chips.push({ label: `Wing: ${filters.wing}`, key: 'wing', value: filters.wing });
        }
        if (filters.warehouse) {
            chips.push({ label: `Warehouse: ${filters.warehouse}`, key: 'warehouse', value: filters.warehouse });
        }
        if (filters.type) {
            const typeLabel = TYPE_MAP[filters.type]?.label || filters.type;
            chips.push({ label: `Type: ${typeLabel}`, key: 'type', value: filters.type });
        }
        if (filters.dateFrom) {
            chips.push({ label: `From: ${formatDate(filters.dateFrom)}`, key: 'dateFrom', value: filters.dateFrom });
        }
        if (filters.dateTo) {
            chips.push({ label: `To: ${formatDate(filters.dateTo)}`, key: 'dateTo', value: filters.dateTo });
        }

        if (chips.length === 0) {
            activeFiltersDiv.classList.remove('show');
            chipsContainer.innerHTML = '';
        } else {
            activeFiltersDiv.classList.add('show');
            chipsContainer.innerHTML = chips.map(chip => `
                <span class="filter-chip" data-key="${chip.key}">
                    ${chip.label}
                    <span class="filter-chip-remove" data-key="${chip.key}">
                        <i class="bi bi-x"></i>
                    </span>
                </span>
            `).join('');

            // Bind remove events
            chipsContainer.querySelectorAll('.filter-chip-remove').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const key = btn.dataset.key;
                    removeFilter(key);
                });
            });
        }
    }

    function removeFilter(key) {
        state.activeFilters[key] = '';

        // Update UI
        if (key === 'wing') $('filterWing').value = '';
        if (key === 'warehouse') $('filterWarehouse').value = '';
        if (key === 'type') $('filterType').value = '';
        if (key === 'dateFrom') $('filterDateFrom').value = '';
        if (key === 'dateTo') $('filterDateTo').value = '';

        applyFilters();
    }

    // ========================================
    // RENDER TABLE
    // ========================================
    function renderTable() {
        const tbody = $('reqTableBody');
        let data = [...state.filtered];

        // Search
        if (state.search) {
            const q = state.search.toLowerCase();
            data = data.filter(r =>
                r.no.toLowerCase().includes(q) ||
                r.wing.toLowerCase().includes(q) ||
                r.warehouse.toLowerCase().includes(q) ||
                r.type.toLowerCase().includes(q) ||
                (r.place && r.place.toLowerCase().includes(q)) ||
                STATUS_MAP[r.status]?.label.toLowerCase().includes(q)
            );
        }

        // Sort
        if (state.sortKey) {
            data.sort((a, b) => {
                let va = a[state.sortKey], vb = b[state.sortKey];
                if (typeof va === 'string') va = va.toLowerCase();
                if (typeof vb === 'string') vb = vb.toLowerCase();
                if (va < vb) return state.sortDir === 'asc' ? -1 : 1;
                if (va > vb) return state.sortDir === 'asc' ? 1 : -1;
                return 0;
            });
        }

        // Pagination
        const total = data.length;
        const totalPages = Math.max(1, Math.ceil(total / state.perPage));
        if (state.currentPage > totalPages) state.currentPage = totalPages;
        const start = (state.currentPage - 1) * state.perPage;
        const pageData = data.slice(start, start + state.perPage);

        // Render
        if (pageData.length === 0) {
            const hasActiveFilters = Object.values(state.activeFilters).some(v => v !== '') || state.search !== '';
            tbody.innerHTML = `
                <tr>
                    <td colspan="10">
                        <div class="empty-state">
                            <i class="bi bi-inbox"></i>
                            <h4>No requisitions found</h4>
                            <p>There are no requisitions matching your current filters.</p>
                            ${hasActiveFilters ? '<button class="btn-clear-filters" id="clearFiltersBtn"><i class="bi bi-x-circle"></i> Clear Filters</button>' : ''}
                        </div>
                    </td>
                </tr>`;

            if (hasActiveFilters) {
                $('clearFiltersBtn')?.addEventListener('click', resetFilters);
            }
        } else {
            tbody.innerHTML = pageData.map((r, i) => {
                const status = STATUS_MAP[r.status] || STATUS_MAP.created;
                const type = TYPE_MAP[r.type] || TYPE_MAP.local;
                return `
                    <tr class="animate-fade-in" style="animation-delay: ${i * 0.05}s">
                        <td class="text-center"><span class="req-row-num">${start + i + 1}</span></td>
                        <td><span class="req-no">${r.no}</span></td>
                        <td><span class="req-wing">${escapeHtml(r.wing)}</span></td>
                        <td><span class="req-warehouse">${escapeHtml(r.warehouse)}</span></td>
                        <td class="text-center"><span class="req-type ${type.cls}">${type.label}</span></td>
                        <td class="text-end"><span class="req-qty">${formatQty(r.qty)}</span></td>
                        <td class="text-center"><span class="req-date">${formatDate(r.date)}</span></td>
                        <td><span class="req-place">${escapeHtml(r.place) || '-'}</span></td>
                        <td class="text-center"><span class="status-badge ${status.cls}">${status.label}</span></td>
                        <td class="text-center">
                            <div class="action-btns">
                                <button class="action-btn view" title="View" data-id="${r.id}" aria-label="View requisition">
                                    <i class="bi bi-eye"></i>
                                </button>
                                <button class="action-btn print" title="Print" data-id="${r.id}" aria-label="Print requisition">
                                    <i class="bi bi-printer"></i>
                                </button>
                                <button class="action-btn doc" title="Document" data-id="${r.id}" aria-label="View document">
                                    <i class="bi bi-file-earmark-text"></i>
                                </button>
                                <button class="action-btn edit" title="Edit" data-id="${r.id}" aria-label="Edit requisition">
                                    <i class="bi bi-pencil"></i>
                                </button>
                                <button class="action-btn delete" title="Delete" data-id="${r.id}" aria-label="Delete requisition">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>`;
            }).join('');
        }

        // Update info
        const showing = pageData.length > 0 ? `${start + 1}–${Math.min(start + state.perPage, total)}` : '0';
        $('tableInfo').textContent = `Showing ${showing} of ${total} requisitions`;

        // Render pagination
        renderPagination(totalPages);

        // Bind events
        bindTableEvents();
    }

    function renderPagination(totalPages) {
        const container = $('pagination');
        let html = `
            <button class="page-btn" ${state.currentPage === 1 ? 'disabled' : ''} data-page="prev" aria-label="Previous page">
                <i class="bi bi-chevron-left"></i>
            </button>`;

        // Smart pagination - show limited pages
        let startPage = Math.max(1, state.currentPage - 2);
        let endPage = Math.min(totalPages, state.currentPage + 2);

        if (startPage > 1) {
            html += `<button class="page-btn" data-page="1">1</button>`;
            if (startPage > 2) {
                html += `<button class="page-btn" disabled>...</button>`;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            html += `<button class="page-btn ${i === state.currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                html += `<button class="page-btn" disabled>...</button>`;
            }
            html += `<button class="page-btn" data-page="${totalPages}">${totalPages}</button>`;
        }

        html += `
            <button class="page-btn" ${state.currentPage === totalPages ? 'disabled' : ''} data-page="next" aria-label="Next page">
                <i class="bi bi-chevron-right"></i>
            </button>`;

        container.innerHTML = html;

        container.querySelectorAll('.page-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const p = btn.dataset.page;
                if (p === 'prev') state.currentPage--;
                else if (p === 'next') state.currentPage++;
                else state.currentPage = parseInt(p);
                renderTable();
            });
        });
    }

    function bindTableEvents() {
        // View
        $$('.action-btn.view').forEach(btn => {
            btn.addEventListener('click', () => openViewModal(parseInt(btn.dataset.id)));
        });

        // Edit
        $$('.action-btn.edit').forEach(btn => {
            btn.addEventListener('click', () => openEditModal(parseInt(btn.dataset.id)));
        });

        // Delete
        $$('.action-btn.delete').forEach(btn => {
            btn.addEventListener('click', () => confirmDelete(parseInt(btn.dataset.id)));
        });

        // Print
        $$('.action-btn.print').forEach(btn => {
            btn.addEventListener('click', () => {
                showToast('Print', 'Preparing print document...', 'info');
                setTimeout(() => window.print(), 500);
            });
        });

        // Document
        $$('.action-btn.doc').forEach(btn => {
            btn.addEventListener('click', () => {
                showToast('Document', 'Document viewer coming soon', 'info');
            });
        });
    }

    // ========================================
    // FILTER FUNCTIONS
    // ========================================
    function applyFilters() {
        showLoading();

        const wing = $('filterWing').value;
        const warehouse = $('filterWarehouse').value;
        const type = $('filterType').value;
        const dateFrom = $('filterDateFrom').value;
        const dateTo = $('filterDateTo').value;

        // Update active filters state
        state.activeFilters = { wing, warehouse, type, dateFrom, dateTo };

        state.filtered = state.data.filter(r => {
            if (wing && r.wing !== wing) return false;
            if (warehouse && r.warehouse !== warehouse) return false;
            if (type && r.type !== type) return false;
            if (dateFrom && r.date < dateFrom) return false;
            if (dateTo && r.date > dateTo) return false;
            return true;
        });

        state.currentPage = 1;

        setTimeout(() => {
            renderTable();
            updateActiveFilterChips();
            hideLoading();
            if (wing || warehouse || type || dateFrom || dateTo) {
                showToast('Filter Applied', 'Showing filtered results', 'success');
            }
        }, 300);
    }

    function resetFilters() {
        $('filterWing').value = '';
        $('filterWarehouse').value = '';
        $('filterType').value = '';
        $('filterDateFrom').value = '';
        $('filterDateTo').value = '';
        $('tableSearch').value = '';
        state.search = '';
        state.activeFilters = { wing: '', warehouse: '', type: '', dateFrom: '', dateTo: '' };
        state.filtered = [...state.data];
        state.currentPage = 1;
        renderTable();
        updateActiveFilterChips();
        showToast('Filters Reset', 'Showing all requisitions', 'info');
    }

    // ========================================
    // SORT FUNCTION
    // ========================================
    function handleSort(key) {
        if (state.sortKey === key) {
            state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
        } else {
            state.sortKey = key;
            state.sortDir = 'asc';
        }
        renderTable();
    }


    function updateSortIcons() {
        $$('.req-table th.sortable i').forEach(i => i.className = 'bi bi-chevron-expand');
        if (state.sortKey) {
            const th = document.querySelector(`.req-table th[data-sort="${state.sortKey}"] i`);
            if (th) th.className = state.sortDir === 'asc' ? 'bi bi-chevron-up' : 'bi bi-chevron-down';
        }
    }

    // ========================================
    // MODAL FUNCTIONS
    // ========================================
    function openViewModal(id) {
        const r = state.data.find(x => x.id === id);
        if (!r) return;

        const status = STATUS_MAP[r.status];
        $('vNo').textContent = r.no;
        $('vWing').textContent = r.wing;
        $('vWarehouse').textContent = r.warehouse;
        $('vType').textContent = TYPE_MAP[r.type].label;
        $('vQty').textContent = formatQty(r.qty);
        $('vDate').textContent = formatDate(r.date);
        $('vPlace').textContent = r.place || '-';
        $('vStatus').innerHTML = `<span class="status-badge ${status.cls}">${status.label}</span>`;
        $('viewReqNo').textContent = r.no;

        new bootstrap.Modal($('viewReqModal')).show();
    }

    function openEditModal(id) {
        const r = state.data.find(x => x.id === id);
        if (!r) return;

        $('editId').value = r.id;
        $('editWing').value = r.wing;
        $('editWarehouse').value = r.warehouse;
        $('editType').value = r.type;
        $('editDate').value = r.date;
        $('editPlace').value = r.place || '';
        $('editQty').value = r.qty;
        $('editRemarks').value = r.remarks || '';
        $('editReqNo').textContent = r.no;

        new bootstrap.Modal($('editRequisitionModal')).show();
    }

    function confirmDelete(id) {
        const r = state.data.find(x => x.id === id);
        if (!r) return;

        state.deleteId = id;
        $('deleteReqNo').textContent = r.no;
        new bootstrap.Modal($('deleteConfirmModal')).show();
    }

    function deleteRequisition() {
        if (!state.deleteId) return;

        showLoading();
        const r = state.data.find(x => x.id === state.deleteId);

        setTimeout(() => {
            const idx = state.data.findIndex(x => x.id === state.deleteId);
            if (idx > -1) {
                state.data.splice(idx, 1);
                applyFilters();
                updateKPIStats();
                showToast('Deleted', `${r.no} has been deleted successfully`, 'success');
            }
            hideLoading();
            bootstrap.Modal.getInstance($('deleteConfirmModal')).hide();
            state.deleteId = null;
        }, 500);
    }

    // ========================================
    // SAVE NEW REQUISITION
    // ========================================
    function saveRequisition() {
        const form = $('addReqForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            showToast('Validation Error', 'Please fill all required fields', 'error');
            return;
        }

        showLoading();

        setTimeout(() => {
            const formData = new FormData(form);
            const newId = Math.max(...state.data.map(r => r.id)) + 1;

            const newReq = {
                id: newId,
                no: `REQ-${String(newId).padStart(4, '0')}`,
                wing: formData.get('wing'),
                warehouse: formData.get('warehouse'),
                type: formData.get('type'),
                qty: parseFloat(formData.get('qty')) || 0,
                date: formData.get('date'),
                place: formData.get('place') || '-',
                status: 'created',
                remarks: formData.get('remarks') || ''
            };

            state.data.unshift(newReq);
            applyFilters();
            updateKPIStats();

            bootstrap.Modal.getInstance($('addRequisitionModal')).hide();
            form.reset();

            hideLoading();
            showToast('Success', `${newReq.no} has been created successfully`, 'success');
        }, 600);
    }

    // ========================================
    // UPDATE REQUISITION
    // ========================================
    function updateRequisition() {
        const form = $('editReqForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            showToast('Validation Error', 'Please fill all required fields', 'error');
            return;
        }

        showLoading();

        setTimeout(() => {
            const formData = new FormData(form);
            const id = parseInt(formData.get('id'));
            const idx = state.data.findIndex(x => x.id === id);

            if (idx > -1) {
                state.data[idx] = {
                    ...state.data[idx],
                    wing: formData.get('wing'),
                    warehouse: formData.get('warehouse'),
                    type: formData.get('type'),
                    qty: parseFloat(formData.get('qty')) || 0,
                    date: formData.get('date'),
                    place: formData.get('place') || '-',
                    remarks: formData.get('remarks') || ''
                };

                applyFilters();
                updateKPIStats();
                bootstrap.Modal.getInstance($('editRequisitionModal')).hide();

                hideLoading();
                showToast('Updated', `${state.data[idx].no} has been updated successfully`, 'success');
            }
        }, 600);
    }

    // ========================================
    // EXPORT TO EXCEL (CSV)
    // ========================================
    function exportExcel() {
        showLoading();

        setTimeout(() => {
            const headers = ['#', 'Requisition No', 'Wing', 'Warehouse', 'Type', 'Total Qty', 'Date', 'Place of Supply', 'Status'];
            const rows = state.filtered.map((r, i) => [
                i + 1, r.no, r.wing, r.warehouse, TYPE_MAP[r.type].label, r.qty, r.date, r.place, STATUS_MAP[r.status].label
            ]);

            const csv = [headers, ...rows].map(row => row.map(v => `"${v}"`).join(',')).join('\n');
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `requisitions_${new Date().toISOString().slice(0, 10)}.csv`;
            a.click();
            URL.revokeObjectURL(url);

            hideLoading();
            showToast('Exported', 'Requisition list exported as CSV', 'success');
        }, 500);
    }

    // ========================================
    // INITIALIZATION
    // ========================================
    document.addEventListener('DOMContentLoaded', () => {
        // Initial render
        updateSortIcons();
        renderTable();
        updateKPIStats();
        updateActiveFilterChips();

        // Event Listeners
        $('applyFilter').addEventListener('click', applyFilters);
        $('resetFilter').addEventListener('click', resetFilters);

        $('tableSearch').addEventListener('input', (e) => {
            state.search = e.target.value;
            state.currentPage = 1;
            renderTable();
        });

        $('entryCount').addEventListener('change', (e) => {
            state.perPage = parseInt(e.target.value);
            state.currentPage = 1;
            renderTable();
        });

        // Sort headers
        $$('.req-table th.sortable').forEach(th => {
            th.addEventListener('click', () => handleSort(th.dataset.sort));
        });

        // Export and Print
        $('exportExcel').addEventListener('click', exportExcel);
        $('printList').addEventListener('click', () => {
            showToast('Print', 'Preparing document...', 'info');
            setTimeout(() => window.print(), 500);
        });

        // Save buttons
        $('saveReqBtn').addEventListener('click', saveRequisition);
        $('updateReqBtn').addEventListener('click', updateRequisition);
        $('confirmDeleteBtn').addEventListener('click', deleteRequisition);

        // Clear form on modal close
        $('addRequisitionModal').addEventListener('hidden.bs.modal', () => {
            $('addReqForm').reset();
        });

        $('clearAllFilters')?.addEventListener('click', resetFilters);
    });
})();