document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("productPopup");
  const closeBtn = document.getElementById("closePopup");
  const cancelBtn = popup.querySelector(".cancel-btn");
  const actionMenu = document.getElementById("actionMenu");

  let activeRow = null;

  // When clicking the action cell (⋮), mark the row as active
  document.querySelectorAll(".action-cell").forEach(cell => {
    cell.addEventListener("click", (e) => {
      const row = e.target.closest("tr");

      // Remove previous active-row
      document.querySelectorAll(".payment-table tbody tr").forEach(r => {
        r.classList.remove("active-row");
      });

      // Set this row as active
      row.classList.add("active-row");
      activeRow = row;

      // Position the action menu (optional, adjust as needed)
      actionMenu.classList.remove("hidden");
      actionMenu.style.top = `${cell.getBoundingClientRect().bottom + window.scrollY}px`;
      actionMenu.style.left = `${cell.getBoundingClientRect().left}px`;
    });
  });

  // Handle View Receipt click
  document.querySelectorAll("#actionMenu a").forEach(link => {
    if (link.textContent.trim() === "View Receipt") {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        if (!activeRow) return;

      // Extract data from active row
      const orderId = activeRow.cells[1].textContent;
      const customer = activeRow.cells[2].textContent;
      const method   = activeRow.cells[3].textContent;
      const status   = activeRow.cells[4].textContent;
      const price    = activeRow.cells[5].textContent;
      const date     = activeRow.cells[6].textContent;

      // Fill popup fields
      popup.querySelector("h3").textContent = `Order ID: ${orderId}`;
      popup.querySelector(".form-group label").textContent = `Customer: ${customer}`;
      popup.querySelector(".price-input input").value = price.replace(/[₱]/g, ""); 
      popup.querySelector(".method-field").innerHTML = `Method: <a href="#">${method}</a>`;

        // Show popup
        popup.style.display = "flex";
      });
    }
  });

  // Close popup
  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });
  cancelBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });
  window.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });
});
