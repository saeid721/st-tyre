// ========================================
// REQUISITION - Dummy data + status/type labels & classes
// ========================================
window.REQUISITION_CONFIG = {
    DATA: [
        { id: 1, no: 'REQ-0003', wing: 'Lubrication', size: '1L', warehouse: 'Dhaka Dhanmondi Warehouse', type: 'local', qty: 11.00, date: '2026-08-01', place: '-', status: 'created', remarks: '' },
        { id: 2, no: 'REQ-0002', wing: 'Lubrication', size: '5L', warehouse: 'Dhaka Dhanmondi Warehouse', type: 'local', qty: 57.00, date: '2026-09-03', place: 'Dhanmondi', status: 'created', remarks: '' },
        { id: 3, no: 'REQ-0001', wing: 'Lubrication', size: '1L', warehouse: 'Dhaka Dhanmondi Warehouse', type: 'local', qty: 4.00, date: '2026-09-03', place: 'Dhanmondi', status: 'created', remarks: '' },
        { id: 4, no: 'REQ-0004', wing: 'Tyre', size: '185/65R15', warehouse: 'Chattogram Warehouse', type: 'import', qty: 120.50, date: '2026-09-01', place: 'Chattogram Port', status: 'pending', remarks: 'Urgent delivery' },
        { id: 5, no: 'REQ-0005', wing: 'Bearing', size: '6205ZZ', warehouse: 'Sylhet Warehouse', type: 'transfer', qty: 85.00, date: '2026-08-28', place: 'Sylhet', status: 'approved', remarks: '' },
        { id: 6, no: 'REQ-0006', wing: 'Tyre', size: '195/65R15', warehouse: 'Dhaka Dhanmondi Warehouse', type: 'local', qty: 200.00, date: '2026-08-25', place: 'Mirpur', status: 'completed', remarks: 'Completed successfully' },
        { id: 7, no: 'REQ-0007', wing: 'Lubrication', size: '4L', warehouse: 'Chattogram Warehouse', type: 'import', qty: 45.75, date: '2026-08-20', place: 'Chattogram', status: 'rejected', remarks: 'Quality issue' },
        { id: 8, no: 'REQ-0008', wing: 'Bearing', size: '6004ZZ', warehouse: 'Dhaka Dhanmondi Warehouse', type: 'local', qty: 32.00, date: '2026-08-15', place: 'Gulshan', status: 'created', remarks: '' },
        { id: 9, no: 'REQ-0009', wing: 'Tyre', size: '175/70R13', warehouse: 'Sylhet Warehouse', type: 'transfer', qty: 150.00, date: '2026-08-10', place: 'Sylhet City', status: 'pending', remarks: '' },
        { id: 10, no: 'REQ-0010', wing: 'Lubrication', size: '1L', warehouse: 'Dhaka Dhanmondi Warehouse', type: 'local', qty: 78.25, date: '2026-08-05', place: 'Uttara', status: 'approved', remarks: '' },
        { id: 11, no: 'REQ-0011', wing: 'Tyre', size: '205/55R16', warehouse: 'Chattogram Warehouse', type: 'import', qty: 310.00, date: '2026-07-28', place: 'Chattogram Port', status: 'completed', remarks: 'Delivered on time' },
        { id: 12, no: 'REQ-0012', wing: 'Bearing', size: '6202ZZ', warehouse: 'Sylhet Warehouse', type: 'local', qty: 18.50, date: '2026-07-22', place: 'Sylhet', status: 'created', remarks: '' },
        { id: 13, no: 'REQ-0013', wing: 'Lubrication', size: '5L', warehouse: 'Dhaka Dhanmondi Warehouse', type: 'transfer', qty: 95.00, date: '2026-07-18', place: 'Banani', status: 'approved', remarks: '' },
        { id: 14, no: 'REQ-0014', wing: 'Tyre', size: '155/65R13', warehouse: 'Chattogram Warehouse', type: 'local', qty: 62.00, date: '2026-07-15', place: 'Agrabad', status: 'pending', remarks: '' },
        { id: 15, no: 'REQ-0015', wing: 'Bearing', size: '6301ZZ', warehouse: 'Dhaka Dhanmondi Warehouse', type: 'import', qty: 420.00, date: '2026-07-10', place: 'Dhaka Port', status: 'rejected', remarks: 'Documentation incomplete' },
        { id: 16, no: 'REQ-0016', wing: 'Lubrication', size: '1L', warehouse: 'Sylhet Warehouse', type: 'local', qty: 14.25, date: '2026-07-05', place: 'Sylhet', status: 'completed', remarks: '' },
        { id: 17, no: 'REQ-0017', wing: 'Tyre', size: '215/60R16', warehouse: 'Dhaka Dhanmondi Warehouse', type: 'transfer', qty: 88.00, date: '2026-06-28', place: 'Motijheel', status: 'created', remarks: '' },
        { id: 18, no: 'REQ-0018', wing: 'Bearing', size: '6206ZZ', warehouse: 'Chattogram Warehouse', type: 'import', qty: 250.00, date: '2026-06-20', place: 'Chattogram Port', status: 'approved', remarks: '' },
        { id: 19, no: 'REQ-0019', wing: 'Lubrication', size: '4L', warehouse: 'Dhaka Dhanmondi Warehouse', type: 'local', qty: 36.50, date: '2026-06-15', place: 'Dhanmondi', status: 'pending', remarks: '' },
        { id: 20, no: 'REQ-0020', wing: 'Tyre', size: '185/70R14', warehouse: 'Sylhet Warehouse', type: 'local', qty: 112.00, date: '2026-06-10', place: 'Sylhet City', status: 'completed', remarks: 'Successfully completed' },
    ],

    STATUS_MAP: {
        created: { label: 'Created', cls: 'status-created' },
        pending: { label: 'Pending', cls: 'status-pending' },
        approved: { label: 'Approved', cls: 'status-approved' },
        rejected: { label: 'Rejected', cls: 'status-rejected' },
        completed: { label: 'Completed', cls: 'status-completed' },
    },

    TYPE_MAP: {
        local: { label: 'Local', cls: 'type-local' },
        import: { label: 'Import', cls: 'type-import' },
        transfer: { label: 'Transfer', cls: 'type-transfer' },
    }
};