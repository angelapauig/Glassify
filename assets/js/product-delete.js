// ----- DELETE POPUP -----
let cardToDelete = null; // stores which product card we want to delete

const deletePopup = document.getElementById("popup-delete");
const deleteCloseBtn = document.querySelector(".popup-delete-close");
const deleteCancelBtn = document.querySelector(".popup-delete-cancel");
const deleteConfirmBtn = document.querySelector(".popup-delete-confirm");
const deleteMessage = document.getElementById("delete-message");

// Step 1: When clicking "Remove", show popup (do NOT delete yet)
document.addEventListener("click", (e) => {
    if (e.target.closest(".remove-btn")) {
        
        // 🔥 FIX: Stop any default action (e.g., form submission) immediately.
        e.preventDefault(); 
        
        cardToDelete = e.target.closest(".product-card"); // save which card
        
        // Safety check
        if (!cardToDelete) return; 
        
        const productName = cardToDelete.querySelector(".product-name").textContent;
        deleteMessage.textContent = `Are you sure you want to delete "${productName}"?`;
        deletePopup.style.display = "flex"; // show popup
    }
});

// Step 2: Close popup helpers
function closeDeletePopup() {
    deletePopup.style.display = "none";
    cardToDelete = null;
}

deleteCloseBtn.addEventListener("click", closeDeletePopup);
deleteCancelBtn.addEventListener("click", closeDeletePopup);

// Step 3: Only delete when clicking "Delete" inside popup (This part is correct)
deleteConfirmBtn.addEventListener("click", () => {
    if (cardToDelete) {
        cardToDelete.remove(); // delete card
        cardToDelete = null;
    }
    closeDeletePopup();
});

// Step 4: Close when clicking outside popup (This part is correct)
window.addEventListener("click", (e) => {
    if (e.target === deletePopup) {
        closeDeletePopup();
    }
});