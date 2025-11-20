document.addEventListener('DOMContentLoaded', function() {
            // Select all 'Request Approval' buttons
            const approveButtons = document.querySelectorAll('.btn-approve');
            // Select the popup overlay (using the ID from the modified HTML: id="approvalPopup")
            const popupOverlay = document.getElementById('approvalPopup');
            // Select the close button
            const closeButton = document.getElementById('closePopup');
            // Select the Cancel button inside the popup
            const cancelButton = popupOverlay ? popupOverlay.querySelector('.cancel-btn') : null;

            // Function to show the popup
            function showPopup() {
                if (popupOverlay) {
                    popupOverlay.style.display = 'flex'; // Use 'flex' to center it
                }
            }

            // Function to hide the popup
            function hidePopup() {
                if (popupOverlay) {
                    popupOverlay.style.display = 'none';
                }
            }

            // 1. Attach click listener to all 'Request Approval' buttons
            approveButtons.forEach(button => {
                button.addEventListener('click', showPopup);
            });

            // 2. Attach click listener to the close (X) button
            if (closeButton) {
                closeButton.addEventListener('click', hidePopup);
            }
            
            // 3. Attach click listener to the 'Cancel' button
            if (cancelButton) {
                cancelButton.addEventListener('click', hidePopup);
            }
            
            // 4. Close popup when clicking outside the main popup box
            if (popupOverlay) {
                popupOverlay.addEventListener('click', function(e) {
                    // Check if the click occurred directly on the overlay, not its children
                    if (e.target === popupOverlay) {
                        hidePopup();
                    }
                });
            }
        });
