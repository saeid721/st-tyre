(function () {
    'use strict';
    let itemRowCount = 0;

    function formatCurrency(v) {
        return '৳ ' + Number(v || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    function nextInvoiceNo(data) {
        const maxId = data.reduce((m, r) => Math.max(m, r.id), 0);
        return 'INV-' + String(maxId + 1).padStart(6, '0');
    }
    function addItemRow() {
        itemRowCount++;
        const rowId = 'itemRow' + itemRowCount;
        const tr = document.createElement('tr');
        tr.id = rowId;
        tr.innerHTML = `
            <td><input type="text" class="form-control-sm item-product" list="productList" placeholder="Product name"></td>
            <td><input type="number" class="form-control-sm item-qty" min="1" value="1"></td>
            <td><select class="form-select-sm item-unit"><option>Pcs</option><option>Set</option><option>Box</option></select></td>
            <td><input type="number" class="form-control-sm item-price" min="0" step="0.01" value="0"></td>
            <td><input type="number" class="form-control-sm item-discount" min="0" step="0.01" value="0"></td>
            <td><input type="number" class="form-control-sm item-vat" min="0" step="0.01" value="15"></td>
            <td class="item-total fw-semibold">৳ 0.00</td>
            <td><button type="button" class="action-btn delete" onclick="document.getElementById('${rowId}').remove(); recalcSummary();"><i class="bi bi-x"></i></button></td>`;
        document.getElementById('itemsBody').appendChild(tr);
        tr.querySelectorAll('input, select').forEach(inp => inp.addEventListener('input', recalcSummary));
        recalcSummary();
    }

    function recalcSummary() {
        let subtotal = 0, discountTotal = 0, vatTotal = 0;
        document.querySelectorAll('#itemsBody tr').forEach(tr => {
            const qty = Number(tr.querySelector('.item-qty').value) || 0;
            const price = Number(tr.querySelector('.item-price').value) || 0;
            const disc = Number(tr.querySelector('.item-discount').value) || 0;
            const vatPct = Number(tr.querySelector('.item-vat').value) || 0;
            const lineBase = qty * price - disc;
            const lineVat = lineBase * (vatPct / 100);
            tr.querySelector('.item-total').textContent = formatCurrency(lineBase + lineVat);
            subtotal += qty * price; discountTotal += disc; vatTotal += lineVat;
        });
        const shipping = Number(document.getElementById('invShipping').value) || 0;
        const grandTotal = subtotal - discountTotal + vatTotal + shipping;
        const paid = Number(document.getElementById('invPaid').value) || 0;
        const due = Math.max(0, grandTotal - paid);
        document.getElementById('sumSubtotal').textContent = formatCurrency(subtotal);
        document.getElementById('sumDiscount').textContent = '- ' + formatCurrency(discountTotal);
        document.getElementById('sumVat').textContent = formatCurrency(vatTotal);
        document.getElementById('sumGrandTotal').textContent = formatCurrency(grandTotal);
        document.getElementById('sumPaid').textContent = formatCurrency(paid);
        document.getElementById('sumDue').textContent = formatCurrency(due);
    }

    function collectForm() {
        const items = [...document.querySelectorAll('#itemsBody tr')].map(tr => {
            const qty = Number(tr.querySelector('.item-qty').value) || 0;
            const unitPrice = Number(tr.querySelector('.item-price').value) || 0;
            const discount = Number(tr.querySelector('.item-discount').value) || 0;
            const vat = Number(tr.querySelector('.item-vat').value) || 0;
            const total = (qty * unitPrice - discount) * (1 + vat / 100);
            return { product: tr.querySelector('.item-product').value, qty, unit: tr.querySelector('.item-unit').value, unitPrice, discount, vat, total };
        });
        const subtotal = items.reduce((s, it) => s + it.qty * it.unitPrice, 0);
        const discount = items.reduce((s, it) => s + it.discount, 0);
        const vat = items.reduce((s, it) => s + (it.qty * it.unitPrice - it.discount) * (it.vat / 100), 0);
        const shipping = Number(document.getElementById('invShipping').value) || 0;
        const grandTotal = subtotal - discount + vat + shipping;
        const paid = Number(document.getElementById('invPaid').value) || 0;
        const due = Math.max(0, grandTotal - paid);
        const paymentStatus = due <= 0 ? 'Paid' : (paid > 0 ? 'Partial' : 'Due');
        return {
            invoiceNo: document.getElementById('invNo').value,
            date: document.getElementById('invDate').value,
            dueDate: document.getElementById('invDueDate').value,
            customer: document.getElementById('invCustomer').value,
            phone: document.getElementById('invPhone').value,
            address: document.getElementById('invAddress').value,
            branch: document.getElementById('invBranch').value,
            salesType: document.getElementById('invSalesType').value,
            subtotal, discount, vat, shipping, grandTotal, paid, due, paymentStatus,
            items, notes: document.getElementById('invNotes').value,
        };
    }

    function save(asDraft) {
        if (!document.getElementById('invoiceForm').reportValidity()) return;
        const data = window.INVOICE_CONFIG.load();
        const invoice = collectForm();
        invoice.invoiceStatus = asDraft ? 'Draft' : 'Confirmed';
        const maxId = data.reduce((m, r) => Math.max(m, r.id), 0);
        data.unshift({ id: maxId + 1, ...invoice });
        window.INVOICE_CONFIG.save(data);
        window.location.href = 'invoice-list.html';
    }

    document.addEventListener('DOMContentLoaded', () => {
        const data = window.INVOICE_CONFIG.load();
        document.getElementById('invNo').value = nextInvoiceNo(data);
        document.getElementById('invDate').value = new Date().toISOString().slice(0, 10);
        addItemRow();
        document.getElementById('btnAddItem').addEventListener('click', addItemRow);
        document.getElementById('invShipping').addEventListener('input', recalcSummary);
        document.getElementById('invPaid').addEventListener('input', recalcSummary);
        document.getElementById('btnSaveInvoice').addEventListener('click', () => save(false));
        document.getElementById('btnSaveDraft').addEventListener('click', () => save(true));
        window.recalcSummary = recalcSummary;
    });
})();