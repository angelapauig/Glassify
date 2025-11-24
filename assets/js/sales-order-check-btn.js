// Use querySelectorAll to handle all .btn-check buttons
document.querySelectorAll('.btn-check').forEach(button => {
    button.addEventListener('click', function() {
        // Find the status in the same table row as the clicked button
        const row = this.closest('tr'); // Get the parent <tr>
        const statusSpan = row.querySelector('.status'); // Find the <span class="status">
        const status = statusSpan ? statusSpan.textContent.trim() : 'Pending'; // Read the text (e.g., "Approved" or "Disapproved")

        // Determine if approved or disapproved
        const isApproved = status === 'Approved'; // Matches the HTML text exactly

        if (isApproved) {
            document.getElementById('approvedPopup').style.display = 'flex'; // Changed to 'flex' for centering
        } else {
            document.getElementById('disapprovedPopup').style.display = 'flex'; // Changed to 'flex' for centering
        }
    });
});

// Close buttons (X) - unchanged
document.getElementById('closeApprovedPopup').addEventListener('click', function() {
    document.getElementById('approvedPopup').style.display = 'none';
});
document.getElementById('closeDisapprovedPopup').addEventListener('click', function() {
    document.getElementById('disapprovedPopup').style.display = 'none';
});

// Cancel buttons - unchanged
const cancelApprovedButton = document.getElementById('approvedPopup').querySelector('.cancel-btn');
if (cancelApprovedButton) {
    cancelApprovedButton.addEventListener('click', function() {
        document.getElementById('approvedPopup').style.display = 'none';
    });
}
const cancelDisapprovedButton = document.getElementById('disapprovedPopup').querySelector('.cancel-btn');
if (cancelDisapprovedButton) {
    cancelDisapprovedButton.addEventListener('click', function() {
        document.getElementById('disapprovedPopup').style.display = 'none';
    });
}

// Close popups when clicking outside - unchanged
document.getElementById('approvedPopup').addEventListener('click', function(e) {
    if (e.target === this) {
        this.style.display = 'none';
    }
});
document.getElementById('disapprovedPopup').addEventListener('click', function(e) {
    if (e.target === this) {
        this.style.display = 'none';
    }
});