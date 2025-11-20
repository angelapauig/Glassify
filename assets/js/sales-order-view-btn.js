// NOTE: This function assumes the JsBarcode library has been loaded in your HTML.
function generateBarcode(imgId, orderId) {
    const barcodeImg = document.getElementById(imgId);
    if (barcodeImg && orderId && typeof JsBarcode === 'function') {
        // Find the barcode image element inside the awaitingPopup
        const awaitingPopupBarcodeImg = document.querySelector('#awaitingPopup .barcode-container img');
        
        if (awaitingPopupBarcodeImg) {
            try {
                const cleanOrderId = orderId.replace('#', '');
                JsBarcode(awaitingPopupBarcodeImg, cleanOrderId, {
                    format: "CODE128", 
                    width: 2,
                    height: 40,
                    displayValue: true,
                    fontSize: 12,
                    margin: 10
                });
            } catch (error) {
                console.error('Barcode generation failed:', error);
            }
        }
    }
}


document.addEventListener('DOMContentLoaded', function() {
    
    // --- Selectors for Awaiting Admin Logic ---
    // Select all 'View' buttons in the 'Awaiting Admin' section
    const viewButtons = document.querySelectorAll('#tab-awaiting .btn-view'); 
    
    // Select the popup overlay (id="awaitingPopup")
    const popupOverlay = document.getElementById('awaitingPopup');
    
    // Select the close button (the X icon, assuming a specific ID or class within the popup)
    // The ID 'closePopup' is reused in your HTML for both popups, so we must scope it.
    const closeButton = popupOverlay ? popupOverlay.querySelector('#closePopup') : null;
    
    // Select the Cancel button inside the popup
    const cancelButton = popupOverlay ? popupOverlay.querySelector('.cancel-btn') : null;

    // Select all the detail rows inside the popup once for efficient population
    const detailRows = popupOverlay ? popupOverlay.querySelectorAll(".order-details .detail-row") : [];

    
    // --- Helper Functions ---

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

    // Function to populate the popup details
    function populatePopup(button) {
        const row = button.closest('tr');
        if (!row) return;

        const cells = row.querySelectorAll("td");
        
        // Data extraction from the AWAITING ADMIN table (6 visible columns + 1 action)
        // Table structure is: # (0), Order ID (1), Product Name (2), Address (3), Date (4), Price (5), Action (6)
        
        const orderID = cells[1] ? cells[1].textContent.trim() : 'N/A'; 
        const product = cells[2] ? cells[2].textContent.trim() : 'N/A';
        const address = cells[3] ? cells[3].textContent.trim() : 'N/A';
        const date = cells[4] ? cells[4].textContent.trim() : 'N/A';
        const total = cells[5] ? cells[5].textContent.trim() : 'N/A';

        // NOTE: The Awaiting Admin table data is incomplete for the full detail panel.
        // The remaining detail values (Status, Shape, Dimension, Type, Thickness, Edge Work, Engraving, File) 
        // are hardcoded in the HTML structure. For a real application, you would need to store this data 
        // in a data attribute (e.g., data-shape) on the table row or fetch it via an API.
        
        // Since the data is not in the table, we'll only update what's available (ID, Product, Address, Date, Price).
        // The popup content has 12 detail rows + 1 total row (index 0 to 12).
        
        // Helper to set the value in the Nth detail-row
        function setDetailValue(detailRowIndex, cellData) {
            if (detailRows[detailRowIndex]) {
                const valueSpan = detailRows[detailRowIndex].querySelector(".detail-value");
                if (valueSpan) {
                    valueSpan.textContent = cellData;
                }
            }
        }
        
        // --- Map Extracted Table Data to Detail Rows ---
        setDetailValue(0, orderID);     // Order ID (Detail Row 0)
        setDetailValue(1, product);     // Product (Detail Row 1)
        setDetailValue(2, address);     // Address (Detail Row 2)
        setDetailValue(3, date);        // Date (Detail Row 3)

        // Update Total Price (Separate Selector)
        const totalSpan = popupOverlay.querySelector(".order-details .total-price");
        if (totalSpan) {
            totalSpan.textContent = total;
        }

        // Generate Barcode
        generateBarcode('barcodeImageAwaiting', orderID); // Assuming a unique ID for the awaiting popup barcode: barcodeImageAwaiting
    }


    // --- Event Listeners ---

    // 1. Attach click listener to all 'View' buttons
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            populatePopup(this); // Populate data before showing
            showPopup();         // Show the popup
        });
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