// Get all the filter buttons and the table rows
const filterButtons = document.querySelectorAll('.order-tabs .tab-button');
const orderRows = document.querySelectorAll('.table-container tbody tr');

// A mapping of button text to table status text
const statusMap = {
    'completed': 'confirmed',
    'pending': 'pending',
    'cancel': 'canceled'
};

// Add a click event listener to each button
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove 'active' class from all buttons and add it to the clicked one
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Get the status to filter by from the button's text
        const filterText = button.textContent.trim().toLowerCase();
        // Use the mapping to get the correct status to look for in the table
        const filterStatus = statusMap[filterText] || '';

        // Loop through all table rows and show/hide them based on the filter status
        orderRows.forEach(row => {
            const statusBadge = row.querySelector('.status-badge');
            const rowStatus = statusBadge ? statusBadge.textContent.trim().toLowerCase() : '';

            // If the filter is 'all orders', show all rows
            if (filterText === 'all orders') {
                row.style.display = '';
            } 
            // Otherwise, show the row only if its status matches the mapped filter
            else if (rowStatus === filterStatus) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
});