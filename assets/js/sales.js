document.addEventListener("DOMContentLoaded", () => {

  // ===== Sidebar Navigation =====
  document.querySelectorAll(".sidebar .menu a").forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();

      // Remove active states
      document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
      document.querySelectorAll(".sidebar .menu a").forEach(l => l.classList.remove("active"));

      // Show selected page
      const target = this.getAttribute("href");
      document.querySelector(target).classList.add("active");
      this.classList.add("active");

      // Update page title
      document.getElementById("page-title").textContent = this.textContent.trim();
    });
  });

  // ===== Modal Handling =====
  const modal = document.getElementById("approvalModal");
  const closeBtn = document.querySelector(".close");
  const cancelBtn = document.querySelector(".btn-cancel");

  // Open modal
  document.querySelectorAll(".btn-approve").forEach(btn => {
    btn.addEventListener("click", function() {
      let row = this.closest("tr");

      // Extract row data
      let orderId = row.cells[1].innerText;
      let product = row.cells[2].innerText;
      let address = row.cells[3].innerText;
      let date = row.cells[4].innerText;
      let quotation = row.cells[5].innerText.replace("₱","");

      // Fill modal
      document.getElementById("orderId").innerText = orderId;
      document.getElementById("product").innerText = product;
      document.getElementById("address").innerText = address;
      document.getElementById("date").innerText = date;
      document.getElementById("quotation").innerText = quotation;

      // File link
      document.getElementById("fileLink").href = `files/${orderId}.pdf`;

      // Barcode
      JsBarcode("#barcode", orderId, {
        format: "CODE128",
        displayValue: false,
        lineColor: "#000",
        width: 2,
        height: 50
      });
      document.getElementById("barcodeText").innerText = orderId;

      modal.style.display = "block";
    });
  });

  // Close modal
  closeBtn.onclick = () => modal.style.display = "none";
  cancelBtn.onclick = () => modal.style.display = "none";
  window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; }

  // ===== Order Tabs Switching =====
  const tabs = document.querySelectorAll(".order-tabs a");
  const sections = document.querySelectorAll(".order-section");

  tabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();

      // Remove active from all
      tabs.forEach(t => t.classList.remove("active"));
      sections.forEach(sec => sec.classList.remove("active"));

      // Activate clicked
      tab.classList.add("active");
      const target = tab.getAttribute("data-tab");
      document.querySelector(`#tab-${target}`).classList.add("active");
    });
  });

// ===== Sidebar Navigation =====
document.querySelectorAll(".sidebar .menu a").forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();

    // Remove active states
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.querySelectorAll(".sidebar .menu a").forEach(l => l.classList.remove("active"));

    // Show selected page
    const target = this.getAttribute("href");
    document.querySelector(target).classList.add("active");
    this.classList.add("active");

    // Update page title
    document.getElementById("page-title").textContent = this.textContent.trim();
  });
});



const actionButtons = document.querySelectorAll("#issue-support .action-btn");

  actionButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeAllDropdowns();
      const dropdown = btn.nextElementSibling;
      dropdown.style.display = "block";
    });
  });

  document.addEventListener("click", () => {
    closeAllDropdowns();
  });

  function closeAllDropdowns() {
    document.querySelectorAll("#issue-support .dropdown").forEach(menu => {
      menu.style.display = "none";
    });
  }



const invActionBtns = document.querySelectorAll("#inventory .action-btn");

  invActionBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeInvDropdowns();
      const dropdown = btn.nextElementSibling;
      dropdown.style.display = "block";
    });
  });

  document.addEventListener("click", () => {
    closeInvDropdowns();
  });

  function closeInvDropdowns() {
    document.querySelectorAll("#inventory .dropdown").forEach(menu => {
      menu.style.display = "none";
    });
  }






 const searchInput = document.querySelector("#products .search-box");
  const productCards = document.querySelectorAll("#products .product-card");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    productCards.forEach(card => {
      const name = card.querySelector(".product-name").textContent.toLowerCase();
      card.style.display = name.includes(query) ? "block" : "none";
    });
  });


// ===== Action Menu Handling =====
  const actionCells = document.querySelectorAll("#payments .action-cell");
  const actionMenu = document.querySelector("#payments #actionMenu");

  actionCells.forEach(cell => {
    cell.addEventListener("click", (e) => {
      e.stopPropagation();

      // Move menu under clicked cell
      const rect = cell.getBoundingClientRect();
      actionMenu.style.top = `${rect.bottom + window.scrollY}px`;
      actionMenu.style.left = `${rect.left + rect.width / 2}px`;
      actionMenu.classList.remove("hidden");
    });
  });

  // Close action menu when clicking outside
  document.addEventListener("click", () => {
    actionMenu.classList.add("hidden");
  });

  // ===== Popup Handling =====
  const popup = document.querySelector("#payments #productPopup");
  const closePopupBtn = document.querySelector("#payments #closePopup");
  const receiptBtns = document.querySelectorAll("#payments .receipt-btn");

  receiptBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const row = btn.closest("tr");
      document.querySelector("#payments #popupOrderId").textContent = row.cells[1].innerText;
      document.querySelector("#payments #popupCustomer").textContent = row.cells[2].innerText;
      document.querySelector("#payments #popupPrice").value = "2000"; // Example
      popup.style.display = "flex";
    });
  });

  closePopupBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // Close popup if clicking outside
  popup.addEventListener("click", (e) => {
    if (e.target === popup) popup.style.display = "none";
  });

  // ===== Filters (Basic Toggle) =====
  const filterTabs = document.querySelectorAll("#payments .filter-tab");
  filterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      filterTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      // filtering logic can be added here
    });
  });



});
