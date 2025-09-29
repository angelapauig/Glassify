document.addEventListener('DOMContentLoaded', function () {
    const actionMenu = document.getElementById('actionMenu');
    const actionCells = document.querySelectorAll('.action-cell');
    const popup = document.getElementById('productPopup');
    const closePopup = document.getElementById('closePopup');
    const receiptButtons = document.querySelectorAll('.receipt-btn');
    const viewReceiptLink = document.querySelector('#actionMenu li:first-child a'); // "View Receipt"

    let activeRow = null; // keep track of the selected row

    // Action menu logic
    actionCells.forEach(cell => {
        cell.addEventListener('click', function (e) {
            e.stopPropagation();
            activeRow = cell.closest('tr'); // save the clicked row

            const rect = cell.getBoundingClientRect();
            actionMenu.style.top  = `${window.scrollY + rect.bottom}px`;
            actionMenu.style.left = `${window.scrollX + rect.left}px`;

            actionMenu.style.display = 'block';
        });
    });

    // Hide action menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!actionMenu.contains(e.target)) {
            actionMenu.style.display = 'none';
        }
    });

    // 👉 Shared function: open popup with row data
    function openReceiptPopup(row) {
        if (!row) return;

        const orderId  = row.cells[1].textContent;
        const customer = row.cells[2].textContent;
        const method   = row.cells[3].textContent;
        const status   = row.cells[4].textContent;
        const date     = row.cells[6].textContent;

        // fill popup fields
        document.getElementById("popupOrderId").textContent = orderId;
        document.getElementById("popupCustomer").textContent = customer;
        document.getElementById("popupPrice").value = "900.00"; // TODO: replace with real price if available
        document.querySelector(".method-field").innerHTML = `<label>Method: <span id="popupMethod">${method}</span></label>`;

        popup.style.display = 'flex';
        actionMenu.style.display = 'none'; // hide menu
    }

    // Receipt button → open popup with row data
    receiptButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const row = btn.closest('tr');
            openReceiptPopup(row);
        });
    });

    // "View Receipt" option → open popup with active row
    viewReceiptLink.addEventListener('click', function (e) {
        e.preventDefault();
        if (activeRow) {
            openReceiptPopup(activeRow);
        }
    });

    // Close popup (X)
    closePopup.addEventListener('click', function () {
        popup.style.display = 'none';
    });

    // Close popup if background clicked
    popup.addEventListener('click', function (e) {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });
});
