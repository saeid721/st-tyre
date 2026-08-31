const navSections = [
    { title: 'Dashboard', icon: 'bi-house-door-fill', type: 'single', href: 'index.html', active: true },
    {
        title: 'Master Setup', icon: 'bi-building', type: 'group', expanded: false, items: [
            { label: 'Company Setup', icon: 'bi-building' },
            { label: 'Branch Setup', icon: 'bi-geo-alt' },
            { label: 'Financial Year', icon: 'bi-calendar' },
        ]
    },
    {
        title: 'Purchase', icon: 'bi-cart3', type: 'group', expanded: false, items: [
            { label: 'Purchase Order', icon: 'bi-cart-plus' },
            { label: 'Purchase Invoice', icon: 'bi-file-earmark-text' },
            { label: 'Purchase Return', icon: 'bi-arrow-return-left' },
        ]
    },
    {
        title: 'Import & LC', icon: 'bi-box-seam', type: 'group', expanded: false, items: [
            { label: 'LC Opening', icon: 'bi-bank' },
            { label: 'Shipment Tracking', icon: 'bi-truck' },
            { label: 'Container Management', icon: 'bi-boxes' },
        ]
    },
    {
        title: 'Inventory', icon: 'bi-archive', type: 'group', expanded: false, items: [
            { label: 'Tyre Products', icon: 'bi-box-seam' },
            { label: 'Stock Management', icon: 'bi-archive' },
            { label: 'Stock Transfer', icon: 'bi-arrow-left-right' },
        ]
    },
    {
        title: 'Sales', icon: 'bi-graph-up-arrow', type: 'group', expanded: false, items: [
            { label: 'Sales Invoice', icon: 'bi-file-earmark-text' },
            { label: 'Sales Order', icon: 'bi-cart-check' },
            { label: 'POS', icon: 'bi-cash-stack' },
        ]
    },
    {
        title: 'Accounts', icon: 'bi-calculator', type: 'group', expanded: false, items: [
            { label: 'Chart of Accounts', icon: 'bi-diagram-3' },
            { label: 'Journal Entry', icon: 'bi-journal-text' },
            { label: 'Cash Book', icon: 'bi-wallet2' },
        ]
    },
    {
        title: 'VAT & Mushak', icon: 'bi-receipt-cutoff', type: 'group', expanded: false, items: [
            { label: 'VAT Setup', icon: 'bi-percent' },
            { label: 'VAT Return', icon: 'bi-file-earmark-text' },
        ]
    },
    {
        title: 'HR & Payroll', icon: 'bi-people', type: 'group', expanded: false, items: [
            { label: 'Employee Setup', icon: 'bi-person-plus' },
            { label: 'Attendance', icon: 'bi-calendar-check' },
            { label: 'Payroll', icon: 'bi-cash' },
        ]
    },
    {
        title: 'Reports', icon: 'bi-file-earmark-bar-graph', type: 'group', expanded: false, items: [
            { label: 'Sales Report', icon: 'bi-graph-up' },
            { label: 'Purchase Report', icon: 'bi-graph-down' },
            { label: 'Inventory Report', icon: 'bi-box' },
        ]
    },
    {
        title: 'Approval', icon: 'bi-check2-circle', type: 'group', expanded: false, items: [
            { label: 'Purchase Approval', icon: 'bi-check-circle' },
            { label: 'Sales Approval', icon: 'bi-check2-circle' },
        ]
    },
    {
        title: 'Notification', icon: 'bi-bell', type: 'group', expanded: false, badge: 12, items: [
            { label: 'All Notifications', icon: 'bi-bell' },
            { label: 'Low Stock Alert', icon: 'bi-exclamation-triangle' },
        ]
    },
    {
        title: 'User Management', icon: 'bi-people-fill', type: 'group', expanded: false, items: [
            { label: 'Users', icon: 'bi-people' },
            { label: 'Roles & Permissions', icon: 'bi-shield-lock' },
        ]
    },
    {
        title: 'System Settings', icon: 'bi-gear', type: 'group', expanded: false, items: [
            { label: 'General Settings', icon: 'bi-gear' },
            { label: 'Backup & Restore', icon: 'bi-hdd' },
        ]
    },
];

function renderSidebar() {
    const sidebarNav = document.getElementById('sidebarNav');
    if (!sidebarNav) return;

    sidebarNav.innerHTML = '';

    navSections.forEach((section) => {
        const secDiv = document.createElement('div');
        secDiv.className = 'nav-section';

        // Single direct link (e.g. Dashboard) — no chevron, no children
        if (section.type === 'single') {
            const link = document.createElement('a');
            link.className = 'nav-section-header' + (section.active ? ' active' : '');
            link.href = section.href || '#';
            link.innerHTML = `
                <span class="nav-icon"><i class="bi ${section.icon}"></i></span>
                <span class="nav-section-title">${section.title}</span>
            `;
            secDiv.appendChild(link);
            sidebarNav.appendChild(secDiv);
            return;
        }

        // Collapsible group header (icon + label + chevron)
        const sectionHeader = document.createElement('div');
        sectionHeader.className = 'nav-section-header';

        const badgeHtml = section.badge ? `<span class="badge-notification">${section.badge}</span>` : '';
        const rotation = section.expanded ? '180deg' : '0deg';

        sectionHeader.innerHTML = `
            <span class="nav-icon"><i class="bi ${section.icon}"></i></span>
            <span class="nav-section-title">${section.title}</span>
            ${badgeHtml}
            <i class="bi bi-chevron-down" style="font-size:12px; transition: transform 0.2s; transform: rotate(${rotation});"></i>
        `;

        sectionHeader.addEventListener('click', (e) => {
            e.stopPropagation();
            section.expanded = !section.expanded;
            renderSidebar();
        });

        secDiv.appendChild(sectionHeader);

        if (section.expanded) {
            const itemsContainer = document.createElement('div');
            itemsContainer.className = 'nav-items-container';

            section.items.forEach((item) => {
                const link = document.createElement('a');
                link.className = 'nav-item-link';
                link.href = item.href || '#';

                link.innerHTML = `
                    <span class="nav-icon"><i class="bi ${item.icon}"></i></span>
                    <span class="nav-label">${item.label}</span>
                `;

                link.addEventListener('click', (e) => {
                    if (!item.href || item.href === '#') {
                        e.preventDefault();
                    }
                    document.querySelectorAll('.nav-item-link, .nav-section-header').forEach(el => el.classList.remove('active'));
                    link.classList.add('active');

                    if (window.innerWidth <= 767) {
                        document.getElementById('sidebar').classList.remove('show');
                        document.getElementById('mobileOverlay').classList.remove('show');
                    }
                });

                itemsContainer.appendChild(link);
            });

            secDiv.appendChild(itemsContainer);
        }

        sidebarNav.appendChild(secDiv);
    });
}

// --- Functional filter mock data (Sales/Purchase Overview period select) ---
const OVERVIEW_DATA = {
    sales: {
        thisMonth: { currentLabel: 'This Month (BDT)', prevLabel: 'Last Month (BDT)', current: '125,845,750', prev: '111,903,200', labels: ['01 May', '06 May', '11 May', '16 May', '21 May', '26 May', '31 May'], data: [12, 19, 15, 25, 22, 30, 28] },
        lastMonth: { currentLabel: 'Last Month (BDT)', prevLabel: 'Previous Month (BDT)', current: '111,903,200', prev: '104,220,100', labels: ['01 Apr', '06 Apr', '11 Apr', '16 Apr', '21 Apr', '26 Apr', '30 Apr'], data: [10, 16, 14, 21, 19, 26, 24] },
        last3Months: { currentLabel: 'Last 3 Months (BDT)', prevLabel: 'Previous 3 Months (BDT)', current: '341,969,050', prev: '298,540,200', labels: ['Mar', 'Apr', 'May'], data: [104, 111, 126] },
        thisYear: { currentLabel: 'This Year (BDT)', prevLabel: 'Last Year (BDT)', current: '1,285,420,600', prev: '1,102,760,400', labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'], data: [220, 235, 260, 111, 126] },
    },
    purchase: {
        thisMonth: { currentLabel: 'This Month (BDT)', prevLabel: 'Last Month (BDT)', current: '98,260,500', prev: '90,820,400', labels: ['01 May', '06 May', '11 May', '16 May', '21 May', '26 May', '31 May'], data: [10, 15, 12, 20, 18, 24, 22] },
        lastMonth: { currentLabel: 'Last Month (BDT)', prevLabel: 'Previous Month (BDT)', current: '90,820,400', prev: '85,140,300', labels: ['01 Apr', '06 Apr', '11 Apr', '16 Apr', '21 Apr', '26 Apr', '30 Apr'], data: [9, 13, 11, 18, 16, 21, 19] },
        last3Months: { currentLabel: 'Last 3 Months (BDT)', prevLabel: 'Previous 3 Months (BDT)', current: '274,221,200', prev: '241,880,900', labels: ['Mar', 'Apr', 'May'], data: [85, 91, 98] },
        thisYear: { currentLabel: 'This Year (BDT)', prevLabel: 'Last Year (BDT)', current: '982,450,300', prev: '861,220,700', labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'], data: [175, 188, 205, 91, 98] },
    },
};

let salesChartInstance, purchaseChartInstance;

function buildLineConfig(entry, borderColor, backgroundColor) {
    return {
        type: 'line',
        data: {
            labels: entry.labels,
            datasets: [{
                label: 'Value',
                data: entry.data,
                borderColor,
                backgroundColor,
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointBackgroundColor: borderColor,
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, ticks: { callback: (v) => v + 'M' }, grid: { color: 'rgba(0,0,0,0.05)' } },
                x: { grid: { display: false } }
            }
        }
    };
}

function initCharts() {
    const salesCtx = document.getElementById('salesChart');
    if (salesCtx) salesChartInstance = new Chart(salesCtx, buildLineConfig(OVERVIEW_DATA.sales.thisMonth, '#3b82f6', 'rgba(59, 130, 246, 0.1)'));

    const purchaseCtx = document.getElementById('purchaseChart');
    if (purchaseCtx) purchaseChartInstance = new Chart(purchaseCtx, buildLineConfig(OVERVIEW_DATA.purchase.thisMonth, '#10b981', 'rgba(16, 185, 129, 0.1)'));

    const inventoryCtx = document.getElementById('inventoryChart');
    if (inventoryCtx) {
        new Chart(inventoryCtx, {
            type: 'doughnut',
            data: {
                labels: ['Available', 'Reserved', 'In-Transit', 'Damage', 'Warranty'],
                datasets: [{ data: [34256, 5120, 3450, 1250, 2180], backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'], borderWidth: 0 }]
            },
            options: { responsive: true, maintainAspectRatio: false, cutout: '70%', plugins: { legend: { display: false } } }
        });
    }

    const agingCtx = document.getElementById('agingChart');
    if (agingCtx) {
        new Chart(agingCtx, {
            type: 'doughnut',
            data: {
                labels: ['0-90 Days', '91-180 Days', '181-365 Days', '1-2 Years', '2+ Years'],
                datasets: [{ data: [38, 26, 17, 11, 8], backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'], borderWidth: 0 }]
            },
            options: { responsive: true, maintainAspectRatio: false, cutout: '70%', plugins: { legend: { display: false } } }
        });
    }
}

function updateOverviewCard(type, period) {
    const entry = OVERVIEW_DATA[type] && OVERVIEW_DATA[type][period];
    if (!entry) return;

    document.getElementById(`${type}CurrentLabel`).textContent = entry.currentLabel;
    document.getElementById(`${type}PrevLabel`).textContent = entry.prevLabel;
    document.getElementById(`${type}CurrentValue`).textContent = entry.current;
    document.getElementById(`${type}PrevValue`).textContent = entry.prev;

    const chart = type === 'sales' ? salesChartInstance : purchaseChartInstance;
    if (chart) {
        chart.data.labels = entry.labels;
        chart.data.datasets[0].data = entry.data;
        chart.update();
    }
}

function initPeriodFilters() {
    document.querySelectorAll('.period-select').forEach((select) => {
        select.addEventListener('change', (e) => updateOverviewCard(e.target.dataset.target, e.target.value));
    });
}

function formatDate(isoDate) {
    const d = new Date(isoDate);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${String(d.getDate()).padStart(2, '0')} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function initTopbarFilters() {
    const applyBtn = document.getElementById('applyDateRange');
    if (applyBtn) {
        applyBtn.addEventListener('click', () => {
            const from = document.getElementById('dateFrom').value;
            const to = document.getElementById('dateTo').value;
            if (from && to) {
                document.getElementById('dateRangeText').textContent = `${formatDate(from)} - ${formatDate(to)}`;
            }
            const dropdownEl = document.getElementById('dateRangeBtn');
            bootstrap.Dropdown.getOrCreateInstance(dropdownEl).hide();
        });
    }

    document.querySelectorAll('.branch-option').forEach((opt) => {
        opt.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('branchText').textContent = opt.dataset.branch;
        });
    });
}

function initSidebarToggle() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const menuToggle = document.getElementById('menuToggle');
    const mobileOverlay = document.getElementById('mobileOverlay');

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            const isCollapsed = sidebar.classList.contains('collapsed');
            sidebarToggle.innerHTML = `<i class="bi bi-${isCollapsed ? 'chevron-right' : 'chevron-left'}"></i>`;
        });
    }

    if (menuToggle && mobileOverlay) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('show');
            mobileOverlay.classList.toggle('show');
        });
        mobileOverlay.addEventListener('click', () => {
            sidebar.classList.remove('show');
            mobileOverlay.classList.remove('show');
        });
    }
}

function initFullscreen() {
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (!fullscreenBtn) return;

    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => console.log(`Error attempting to enable fullscreen: ${err.message}`));
            fullscreenBtn.innerHTML = '<i class="bi bi-arrows-angle-contract"></i>';
        } else {
            document.exitFullscreen();
            fullscreenBtn.innerHTML = '<i class="bi bi-arrows-fullscreen"></i>';
        }
    });

    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) fullscreenBtn.innerHTML = '<i class="bi bi-arrows-fullscreen"></i>';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderSidebar();
    initCharts();
    initSidebarToggle();
    initFullscreen();
    initPeriodFilters();
    initTopbarFilters();
});