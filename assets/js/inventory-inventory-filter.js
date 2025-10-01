document.addEventListener("DOMContentLoaded", () => {
  const rowsPerPageSelect = document.getElementById("rowsPerPageSelect");
  const paginationControls = document.querySelector(".pagination-controls");
  const tableBody = document.getElementById("tableBody");
  const showingInfo = document.querySelector(".pagination span");

  const actionMenu = document.getElementById("actionMenu");

  // Popups
  const managePopup = document.getElementById("managePopup");
  const editPopup = document.getElementById("editPopup");
  const deletePopup = document.getElementById("deletePopup");

  let activeRow = null;
  let currentPage = 1;
  let rowsPerPage = 5;

  // --- Categories & Sample Data ---
  const productCatalog = {
    "Balcony": ["Balcony Glass Railing", "Aluminum Balcony Frame", "Balcony Sliding Window"],
    "Board": ["Tempered Glass Board", "Frosted Glass Board", "Acrylic Display Board"],
    "Cabinet": ["Glass Cabinet Door", "Cabinet Mirror Panel", "Sliding Cabinet Glass"],
    "Doors": ["French Glass Door", "Aluminum Hinged Door", "Tempered Sliding Door"],
    "Mirrors": ["Round Mirror", "Square Vanity Mirror", "Wall Mounted Mirror"],
    "Partition": ["Office Glass Partition", "Frosted Partition Panel", "Aluminum Partition Frame"],
    "Shower Enclosure": ["Frameless Shower Door", "Sliding Shower Enclosure", "Frosted Shower Glass"],
    "Sliding Doors": ["2-Panel Sliding Door", "Glass Sliding Door", "Aluminum Sliding Door"],
    "Sliding Windows": ["Horizontal Sliding Window", "Double Track Sliding Window", "Tempered Sliding Window"],
    "Stair Railings": ["Glass Stair Railing", "Aluminum Stair Frame", "Handrail with Glass Inserts"],
    "Storefront": ["Storefront Display Glass", "Frameless Storefront", "Aluminum Storefront Frame"],
    "Windows": ["Casement Window", "Awning Window", "Fixed Glass Window"]
  };

  const categories = Object.keys(productCatalog);
  const products = Array.from({ length: 50 }, (_, i) => {
    const category = categories[i % categories.length];
    const names = productCatalog[category];
    const name = names[i % names.length];
    return {
      id: `PR-${String(i + 1).padStart(3, "0")}`,
      name,
      category,
      stock: Math.floor(Math.random() * 200) + 1,
      unit: ["sqm", "pcs", "sets", "meter"][i % 4],
    };
  });

  // --- Table Rendering ---
  function renderTable() {
    tableBody.innerHTML = "";

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedItems = products.slice(start, end);

    paginatedItems.forEach((prod, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${start + index + 1}</td>
        <td>${prod.id}</td>
        <td>${prod.name}</td>
        <td>${prod.category}</td>
        <td>${prod.stock}</td>
        <td>${prod.unit}</td>
        <td class="action-cell">
          <button class="action-btn" data-id="${prod.id}">⋮</button>
        </td>
      `;
      tableBody.appendChild(tr);
    });

    updateShowingInfo(start, end);
    renderPaginationControls(Math.ceil(products.length / rowsPerPage));
  }

  function updateShowingInfo(start, end) {
    const total = products.length;
    showingInfo.textContent = `Showing ${start + 1}-${Math.min(end, total)} of ${total} items`;
  }

  function renderPaginationControls(totalPages) {
    paginationControls.innerHTML = "";

    const prevBtn = document.createElement("button");
    prevBtn.innerHTML = `<i class="fas fa-chevron-left"></i>`;
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderTable();
      }
    });
    paginationControls.appendChild(prevBtn);

    const pageBtn = document.createElement("button");
    pageBtn.textContent = currentPage;
    pageBtn.classList.add("active");
    paginationControls.appendChild(pageBtn);

    const nextBtn = document.createElement("button");
    nextBtn.innerHTML = `<i class="fas fa-chevron-right"></i>`;
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderTable();
      }
    });
    paginationControls.appendChild(nextBtn);
  }

  rowsPerPageSelect.addEventListener("change", (e) => {
    rowsPerPage = parseInt(e.target.value, 10);
    currentPage = 1;
    renderTable();
  });

  // --- Action Menu ---
  const MENU_OFFSET_X = -120;
  const MENU_OFFSET_Y = 0;

  tableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("action-btn")) {
      e.stopPropagation();
      activeRow = e.target.closest("tr");

      const rect = e.target.getBoundingClientRect();
      actionMenu.style.top = `${window.scrollY + rect.bottom + MENU_OFFSET_Y}px`;
      actionMenu.style.left = `${window.scrollX + rect.left + MENU_OFFSET_X}px`;

      actionMenu.classList.remove("hidden");
      actionMenu.style.display = "block";
    }
  });

  document.addEventListener("click", (e) => {
    if (!actionMenu.contains(e.target)) hideMenu();
  });

  const menuLinks = actionMenu.querySelectorAll("a");

  // Manage Stock
  menuLinks[0].addEventListener("click", (e) => {
    e.preventDefault();
    if (!activeRow) return;
    const item = getItemFromRow(activeRow);

    managePopup.querySelector("h3").textContent = `Manage Stock – ${item.name}`;
    managePopup.querySelector("input[readonly]").value = `${item.stock} ${item.unit}`;

    openPopup(managePopup);
    hideMenu();
  });

  // Edit Item
  menuLinks[1].addEventListener("click", (e) => {
    e.preventDefault();
    if (!activeRow) return;
    const item = getItemFromRow(activeRow);

    editPopup.querySelector("h3").textContent = `Edit Item – ${item.name}`;
    editPopup.querySelector("input[readonly]").value = item.id;
    editPopup.querySelector("select").value = item.category;

    openPopup(editPopup);
    hideMenu();
  });

  // Delete Item
  menuLinks[2].addEventListener("click", (e) => {
    e.preventDefault();
    if (!activeRow) return;
    const item = getItemFromRow(activeRow);

    deletePopup.querySelector("p:nth-of-type(1)").innerHTML = `<strong>Item ID:</strong> ${item.id}`;
    deletePopup.querySelector("p:nth-of-type(2)").innerHTML = `<strong>Item Name:</strong> ${item.name}`;

    openPopup(deletePopup);
    hideMenu();
  });

  // --- Helpers ---
  function getItemFromRow(row) {
    return {
      id: row.cells[1].textContent,
      name: row.cells[2].textContent,
      category: row.cells[3]?.textContent || "",
      stock: row.cells[4]?.textContent || "",
      unit: row.cells[5]?.textContent || "",
    };
  }

  function openPopup(popup) {
    popup.style.display = "flex";
    popup.classList.remove("hidden");

    // Close buttons
    popup.querySelector(".close-btn").addEventListener("click", () => closePopup(popup));
    popup.querySelector(".cancel-btn")?.addEventListener("click", () => closePopup(popup));
  }

  function closePopup(popup) {
    popup.style.display = "none";
    popup.classList.add("hidden");
  }

  function hideMenu() {
    actionMenu.classList.add("hidden");
    actionMenu.style.display = "none";
  }

  // Allow clicking outside to close
  [managePopup, editPopup, deletePopup].forEach((popup) => {
    popup.addEventListener("click", (e) => {
      if (e.target.classList.contains("popup-overlay")) {
        closePopup(popup);
      }
    });
  });

  // --- Init ---
  renderTable();
});
