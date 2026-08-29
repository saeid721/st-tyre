(function () {
  'use strict';

  /* ---------- Navigation Data ---------- */
  const navSections = [
    { title: 'Dashboard', items: [{ label: 'Dashboard', icon: 'bi-house-door-fill', active: true, href: 'index.html' }] },
    {
      title: 'Activities', items: [
        { label: 'Expense', icon: 'bi-receipt' },
        { label: 'Purchases', icon: 'bi-cart' },
        { label: 'Purchase Return', icon: 'bi-arrow-return-left' },
        { label: 'Sales', icon: 'bi-graph-up' },
        { label: 'Sales Return', icon: 'bi-graph-down-arrow' },
      ]
    },
    {
      title: 'Accounting', items: [
        { label: 'Cash Book', icon: 'bi-journal-text' },
        { label: 'Bank Accounts', icon: 'bi-bank2' },
        { label: 'Payments', icon: 'bi-credit-card' },
        { label: 'Loan Management', icon: 'bi-piggy-bank' },
        { label: 'Asset Management', icon: 'bi-building' },
        { label: 'Payroll', icon: 'bi-people' },
      ]
    },
    {
      title: 'Import & Shipping', items: [
        { label: 'Shipment Tracking', icon: 'bi-truck-flatbed' },
        { label: 'Container Tracking', icon: 'bi-boxes' },
        { label: 'LC Management', icon: 'bi-bank' },
        { label: 'Customs & Duty', icon: 'bi-file-earmark-ruled' },
      ]
    },
    {
      title: 'People', items: [
        { label: 'Dealers / Clients', icon: 'bi-person-badge' },
        { label: 'Suppliers', icon: 'bi-truck' },
        { label: 'Employees', icon: 'bi-person-workspace' },
      ]
    },
    {
      title: 'Inventory', items: [
        { label: 'Tyre Products', icon: 'bi-box-seam' },
        { label: 'Warehouse Stock', icon: 'bi-archive' },
      ]
    },
    {
      title: 'Reports', items: [
        { label: 'Balance Sheet', icon: 'bi-file-earmark-bar-graph' },
        { label: 'Profit & Loss', icon: 'bi-graph-up-arrow' },
        { label: 'Summary Report', icon: 'bi-file-earmark-text' },
        { label: 'Sales Report', icon: 'bi-file-earmark-spreadsheet' },
        { label: 'Purchase Report', icon: 'bi-file-earmark-spreadsheet' },
        { label: 'Dealer Ledger', icon: 'bi-journal-check' },
        { label: 'Supplier Ledger', icon: 'bi-journal-check' },
        { label: 'Expense Report', icon: 'bi-file-earmark-minus' },
        { label: 'Inventory Report', icon: 'bi-file-earmark-check' },
      ]
    },
    {
      title: 'Account', items: [
        { label: 'Users', icon: 'bi-person-gear' },
        { label: 'Setup', icon: 'bi-gear' },
      ]
    },
    {
      title: 'Other', items: [
        { label: 'Transactions', icon: 'bi-arrow-left-right' },
        { label: 'Subscription', icon: 'bi-stars' },
      ]
    },
    {
      title: 'App', items: [
        { label: 'Form', icon: 'bi-file-earmark-plus-fill', href: 'from.html' },
        { label: 'Table', icon: 'bi-table', href: 'table.html' },
        { label: 'Model', icon: 'bi-columns', href: 'model.html' },
      ]
    },
  ];

  /* ---------- Render Sidebar ---------- */
  function renderSidebarNav(container) {
    container.innerHTML = '';
    navSections.forEach((section) => {
      const sec = document.createElement('div');
      sec.className = 'nav-section';
      const title = document.createElement('div');
      title.className = 'nav-section-title';
      title.textContent = section.title;
      sec.appendChild(title);
      section.items.forEach((item) => {
        const a = document.createElement('a');
        a.className = 'nav-item-link' + (item.active ? ' active' : '');
        a.href = item.href || '#';
        a.setAttribute('role', 'menuitem');
        a.setAttribute('data-title', item.label);
        a.innerHTML = `
          <span class="nav-icon"><i class="bi ${item.icon}"></i></span>
          <span class="nav-label">${item.label}</span>
        `;
        a.addEventListener('click', (e) => {
          const href = a.getAttribute('href');
          if (href && href !== '#' && (href.includes('index.html') || href.includes('from.html') || href.includes('table.html') || href.includes('model.html'))) {
            return;
          }
          e.preventDefault();
          container.querySelectorAll('.nav-item-link').forEach(el => el.classList.remove('active'));
          a.classList.add('active');
        });
        sec.appendChild(a);
      });
      container.appendChild(sec);
    });
  }

  const sidebarNav = document.getElementById('sidebarNav');
  const mobileSidebarBody = document.getElementById('mobileSidebarBody');
  if (sidebarNav) renderSidebarNav(sidebarNav);
  if (mobileSidebarBody) renderSidebarNav(mobileSidebarBody);

  /* ---------- Sidebar Toggle (Desktop) ---------- */
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const topbarSidebarToggle = document.getElementById('topbarSidebarToggle');

  function toggleSidebar() {
    if (sidebar.classList.contains('pos-hidden')) {
      sidebar.classList.remove('pos-hidden');
      document.body.classList.remove('pos-mode');
      const posBtn = document.getElementById('posBtn');
      if (posBtn) {
        posBtn.classList.remove('active-pos');
        posMode = false;
      }
      handleResponsiveSidebar();
      return;
    }

    sidebar.classList.toggle('collapsed');
    const isCollapsed = sidebar.classList.contains('collapsed');
    document.body.classList.toggle('sidebar-collapsed', isCollapsed);
    if (sidebarToggle) sidebarToggle.setAttribute('aria-expanded', String(!isCollapsed));
    if (topbarSidebarToggle) topbarSidebarToggle.setAttribute('aria-expanded', String(!isCollapsed));
  }

  if (sidebarToggle) sidebarToggle.addEventListener('click', toggleSidebar);
  if (topbarSidebarToggle) topbarSidebarToggle.addEventListener('click', toggleSidebar);

  /* ---------- Mobile Menu ---------- */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileSidebarEl = document.getElementById('mobileSidebar');
  let mobileSidebarInstance = null;

  function openMobileSidebar() {
    if (!mobileSidebarInstance) {
      mobileSidebarInstance = new bootstrap.Offcanvas(mobileSidebarEl);
    }
    mobileSidebarInstance.show();
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openMobileSidebar);
  }

  /* ---------- Fullscreen Button ---------- */
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen?.().catch(() => { });
      } else {
        document.exitFullscreen?.();
      }
    });
  }

  /* ---------- POS Button ---------- */
  const posBtn = document.getElementById('posBtn');
  let posMode = false;

  if (posBtn) {
    posBtn.addEventListener('click', (e) => {
      e.preventDefault();
      posMode = !posMode;
      posBtn.classList.toggle('active-pos', posMode);

      if (posMode) {
        sidebar.classList.add('pos-hidden');
        document.body.classList.add('pos-mode');
        sidebar.classList.remove('collapsed');
        document.body.classList.remove('sidebar-collapsed');
      } else {
        sidebar.classList.remove('pos-hidden');
        document.body.classList.remove('pos-mode');
        handleResponsiveSidebar();
      }
    });
  }

  /* ---------- Responsive Sidebar State ---------- */
  function handleResponsiveSidebar() {
    const w = window.innerWidth;
    if (posMode) return;

    if (w >= 992) {
      sidebar.classList.remove('collapsed');
      document.body.classList.remove('sidebar-collapsed');
    } else {
      sidebar.classList.remove('show');
    }
  }

  window.addEventListener('resize', handleResponsiveSidebar);
  handleResponsiveSidebar();

  /* ---------- Date Filter ---------- */
  document.querySelectorAll('[data-filter]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('[data-filter]').forEach(x => x.classList.remove('active'));
      el.classList.add('active');
      const label = document.getElementById('dateFilterLabel');
      if (label) label.textContent = el.textContent.trim();
    });
  });

  /* ---------- Chart.js Defaults ---------- */
  if (window.Chart) {
    Chart.defaults.font.family = "'Inter', system-ui, sans-serif";
    Chart.defaults.color = '#64748b';
    Chart.defaults.plugins.legend.labels.usePointStyle = true;
    Chart.defaults.plugins.legend.labels.pointStyleWidth = 10;
    Chart.defaults.plugins.legend.labels.padding = 16;
    Chart.defaults.plugins.tooltip.backgroundColor = '#0f172a';
    Chart.defaults.plugins.tooltip.padding = 10;
    Chart.defaults.plugins.tooltip.cornerRadius = 8;
    Chart.defaults.plugins.tooltip.titleFont = { size: 12, weight: '600' };
    Chart.defaults.plugins.tooltip.bodyFont = { size: 12 };
  }

  /* ---------- Top Selling Donut (Tyre Specific) ---------- */
  const topSellingData = [
    { name: 'Michelin 205/55R16', value: 35.5, color: '#4f46e5' },
    { name: 'Bridgestone 215/60R16', value: 25.0, color: '#10b981' },
    { name: 'Continental 195/65R15', value: 18.5, color: '#f59e0b' },
    { name: 'Yokohama 185/70R14', value: 12.0, color: '#ef4444' },
    { name: 'Dunlop 195/60R15', value: 9.0, color: '#06b6d4' },
  ];

  const topSellingCtx = document.getElementById('topSellingChart');
  if (topSellingCtx) {
    new Chart(topSellingCtx, {
      type: 'doughnut',
      data: {
        labels: topSellingData.map(d => d.name),
        datasets: [{
          data: topSellingData.map(d => d.value),
          backgroundColor: topSellingData.map(d => d.color),
          borderWidth: 2, borderColor: '#ffffff',
          hoverOffset: 6,
        }],
      },
      options: {
        responsive: true, maintainAspectRatio: false, cutout: '72%',
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (ctx) => ` ${ctx.label}: ${ctx.parsed}%` } },
        },
        animation: { animateRotate: true, duration: 900 },
      },
    });
    const legendEl = document.getElementById('topSellingLegend');
    if (legendEl) {
      legendEl.innerHTML = topSellingData.map(d => `
        <div class="legend-item">
          <span class="legend-dot" style="background:${d.color}"></span>
          <span class="legend-name">${d.name}</span>
          <span class="legend-value">${d.value}%</span>
        </div>
      `).join('');
    }
  }

  /* ---------- Payment Line Chart ---------- */
  const paymentCtx = document.getElementById('paymentChart');
  if (paymentCtx) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    new Chart(paymentCtx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Payment Sent',
            data: [580, 160, 200, 150, 120, 100, 90, 80, 70, 60, 50, 40], // in thousands (e.g., 580 = 5,80,000)
            borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.08)',
            borderWidth: 2.5, tension: 0.35, fill: true,
            pointRadius: 3, pointHoverRadius: 6,
            pointBackgroundColor: '#fff', pointBorderColor: '#ef4444', pointBorderWidth: 2,
          },
          {
            label: 'Payment Received',
            data: [400, 170, 200, 100, 80, 60, 50, 40, 30, 25, 20, 15],
            borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.08)',
            borderWidth: 2.5, tension: 0.35, fill: true,
            pointRadius: 3, pointHoverRadius: 6,
            pointBackgroundColor: '#fff', pointBorderColor: '#10b981', pointBorderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: { legend: { position: 'top', align: 'end' } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 11 } } },
          y: {
            beginAtZero: true, max: 600,
            ticks: { font: { size: 11 }, callback: v => '৳' + v + 'k' },
            grid: { color: '#f1f3f6' },
          },
        },
        animation: { duration: 1000 },
      },
    });
  }

  /* ---------- Sales vs Purchases Bar Chart ---------- */
  const salesPurchasesCtx = document.getElementById('salesPurchasesChart');
  if (salesPurchasesCtx) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    new Chart(salesPurchasesCtx, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Sales',
            data: [480, 1450, 1050, 300, 200, 150, 120, 100, 90, 80, 70, 60],
            backgroundColor: '#3b82f6', borderRadius: 4,
            borderSkipped: false, barPercentage: 0.7, categoryPercentage: 0.75,
          },
          {
            label: 'Purchases',
            data: [1420, 2180, 400, 250, 180, 140, 110, 90, 80, 70, 60, 120],
            backgroundColor: '#10b981', borderRadius: 4,
            borderSkipped: false, barPercentage: 0.7, categoryPercentage: 0.75,
          },
        ],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'top', align: 'end' } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 11 } } },
          y: {
            beginAtZero: true, max: 2200,
            ticks: { font: { size: 11 }, callback: v => '৳' + v + 'k' },
            grid: { color: '#f1f3f6' },
          },
        },
        animation: { duration: 900 },
      },
    });
  }

  /* ---------- Top Clients (Tyre Dealers Specific) ---------- */
  const clients = [
    { name: 'Rahim Tyre House', amount: 1463000, sales: 230, img: 'images/dealers/01.jpg' },
    { name: 'Karim Auto Parts', amount: 685000, sales: 120, img: 'images/dealers/02.jpg' },
    { name: 'Dhaka Tyre Center', amount: 652000, sales: 115, img: 'images/dealers/03.jpg' },
    { name: 'Chittagong Rubber House', amount: 401000, sales: 85, img: 'images/dealers/04.jpg' },
    { name: 'Sylhet Wheel Care', amount: 320000, sales: 70, img: 'images/dealers/05.jpg' },
  ];

  const maxAmount = Math.max(...clients.map(c => c.amount));
  const clientListEl = document.getElementById('clientList');
  if (clientListEl) {
    clientListEl.innerHTML = clients.map((c, i) => `
      <div class="client-item">
        <div class="client-rank ${i === 0 ? 'top' : ''}">${i + 1}</div>
        <img src="${c.img}" alt="${c.name}" class="client-avatar object-fit-cover">
        <div class="client-info">
          <div class="client-name">${c.name}</div>
          <div class="client-progress">
            <div class="client-progress-bar" style="width:0%" data-width="${(c.amount / maxAmount) * 100}%"></div>
          </div>
        </div>
        <div class="client-stats">
          <div class="client-amount">৳${c.amount.toLocaleString()}.00</div>
          <div class="client-sales">${c.sales} sales</div>
        </div>
      </div>
    `).join('');
    setTimeout(() => {
      clientListEl.querySelectorAll('.client-progress-bar').forEach(bar => {
        bar.style.width = bar.dataset.width;
      });
    }, 200);
  }

})();



/* ---------- Bottom Nav Active State ---------- */
const bottomNavItems = document.querySelectorAll('.bottom-nav-item[href]');
bottomNavItems.forEach((item) => {
  item.addEventListener('click', () => {
    bottomNavItems.forEach((el) => el.classList.remove('active'));
    item.classList.add('active');
  });
});

/* ---------- Bottom Nav "More" — reuse mobile sidebar ---------- */
const bottomNavMoreBtn = document.getElementById('bottomNavMoreBtn');
if (bottomNavMoreBtn) {
  bottomNavMoreBtn.addEventListener('click', () => {
    if (typeof openMobileSidebar === 'function') {
      openMobileSidebar();
    }
  });
}

/* ---------- Logout Handler ---------- */
document.querySelectorAll('.js-logout-btn').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const confirmLogout = window.confirm('আপনি কি সত্যিই লগআউট করতে চান?');
    if (confirmLogout) {
      window.location.href = 'login.html';
    }
  });
});


/* ---------- Collapsed Sidebar Tooltip ---------- */
const sidebarTooltip = document.createElement('div');
sidebarTooltip.className = 'sidebar-tooltip';
document.body.appendChild(sidebarTooltip);

function isSidebarCollapsedView() {
  return window.innerWidth >= 992 &&
    (document.getElementById('sidebar').classList.contains('collapsed') || window.innerWidth < 1200);
}

document.querySelectorAll('#sidebarNav .nav-item-link[data-title]').forEach((link) => {
  link.addEventListener('mouseenter', () => {
    if (!isSidebarCollapsedView()) return;
    const rect = link.getBoundingClientRect();
    sidebarTooltip.textContent = link.getAttribute('data-title');
    sidebarTooltip.style.top = `${rect.top + rect.height / 2}px`;
    sidebarTooltip.style.left = `${rect.right + 14}px`;
    sidebarTooltip.classList.add('show');
  });
  link.addEventListener('mouseleave', () => {
    sidebarTooltip.classList.remove('show');
  });
});


/* ---------- NEW: Revenue & Profit Analytics Chart ---------- */
const revenueProfitCtx = document.getElementById('revenueProfitChart');
if (revenueProfitCtx) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  new Chart(revenueProfitCtx, {
    type: 'bar',
    data: {
      labels: months,
      datasets: [
        {
          label: 'Revenue',
          data: [4200, 4500, 4100, 4800, 5100, 4900, 5300, 5600, 5400, 5800, 6100, 6400],
          backgroundColor: 'rgba(79, 70, 229, 0.8)',
          borderRadius: 4,
          barPercentage: 0.6,
          order: 2
        },
        {
          label: 'Gross Profit',
          data: [1100, 1200, 1050, 1300, 1400, 1350, 1450, 1500, 1480, 1600, 1700, 1800],
          backgroundColor: 'rgba(16, 185, 129, 0.8)',
          borderRadius: 4,
          barPercentage: 0.6,
          order: 3
        },
        {
          label: 'Net Profit',
          type: 'line',
          data: [750, 820, 710, 890, 950, 920, 1000, 1050, 1020, 1100, 1180, 1250],
          borderColor: '#f59e0b',
          backgroundColor: 'transparent',
          borderWidth: 2.5,
          tension: 0.4,
          pointRadius: 3,
          pointHoverRadius: 6,
          order: 1
        }
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { position: 'top', align: 'end', labels: { usePointStyle: true, pointStyleWidth: 10, padding: 16 } },
        tooltip: {
          backgroundColor: '#0f172a',
          padding: 10,
          cornerRadius: 8,
          callbacks: { label: (ctx) => ` ${ctx.dataset.label}: ৳${ctx.parsed.y.toLocaleString()}` }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 11 } } },
        y: {
          beginAtZero: true,
          ticks: { font: { size: 11 }, callback: v => '৳' + (v / 1000) + 'k' },
          grid: { color: '#f1f3f6' }
        }
      },
      animation: { duration: 1000 }
    }
  });
}

/* ---------- NEW: Sales by Channel Donut Chart ---------- */
const salesChannelData = [
  { name: 'Retail POS', value: 35, color: '#10b981', amount: '৳18.2L' },
  { name: 'Dealer', value: 40, color: '#3b82f6', amount: '৳20.8L' },
  { name: 'Ecommerce', value: 15, color: '#8b5cf6', amount: '৳7.8L' },
  { name: 'B2B', value: 8, color: '#f59e0b', amount: '৳4.1L' },
  { name: 'Other', value: 2, color: '#94a3b8', amount: '৳1.0L' }
];
const salesChannelCtx = document.getElementById('salesChannelChart');
if (salesChannelCtx) {
  new Chart(salesChannelCtx, {
    type: 'doughnut',
    data: {
      labels: salesChannelData.map(d => d.name),
      datasets: [{
        data: salesChannelData.map(d => d.value),
        backgroundColor: salesChannelData.map(d => d.color),
        borderWidth: 2,
        borderColor: '#ffffff',
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.label}: ${ctx.parsed}% (${salesChannelData[ctx.dataIndex].amount})`
          }
        }
      },
      animation: { animateRotate: true, duration: 900 }
    }
  });
  const channelLegendEl = document.getElementById('salesChannelLegend');
  if (channelLegendEl) {
    channelLegendEl.innerHTML = salesChannelData.map(d => `
            <div class="legend-item">
                <span class="legend-dot" style="background:${d.color}"></span>
                <span class="legend-name">${d.name}</span>
                <span class="legend-value">${d.value}%</span>
            </div>
        `).join('');
  }
}

/* ---------- NEW: Expense Breakdown Chart ---------- */
const expenseBreakdownCtx = document.getElementById('expenseBreakdownChart');
if (expenseBreakdownCtx) {
  new Chart(expenseBreakdownCtx, {
    type: 'doughnut',
    data: {
      labels: ['Import Duty', 'Salary', 'Warehouse', 'Transport', 'Marketing', 'Other'],
      datasets: [{
        data: [45, 25, 12, 8, 6, 4],
        backgroundColor: ['#ef4444', '#3b82f6', '#f59e0b', '#10b981', '#8b5cf6', '#94a3b8'],
        borderWidth: 2,
        borderColor: '#ffffff',
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '60%',
      plugins: {
        legend: { position: 'right', labels: { usePointStyle: true, pointStyleWidth: 10, padding: 12, font: { size: 11 } } },
        tooltip: {
          callbacks: { label: (ctx) => ` ${ctx.label}: ${ctx.parsed}%` }
        }
      },
      animation: { animateRotate: true, duration: 900 }
    }
  });
}