document.addEventListener("DOMContentLoaded", () => {
  const rowsPerPageSelect = document.getElementById("rowsPerPageSelect");
  const paginationControls = document.querySelector(".pagination-controls");
  const tableBody = document.querySelector("table tbody");
  const showingInfo = document.querySelector(".pagination span");

  // Categories list with sample product names
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

  // Flatten categories into a dataset of 50 items
  const categories = Object.keys(productCatalog);
  const products = Array.from({ length: 50 }, (_, i) => {
    const category = categories[i % categories.length];
    const names = productCatalog[category];
    const name = names[i % names.length]; // cycle through names in category
    return {
      id: `PR-${String(i + 1).padStart(3, "0")}`,
      name,
      category,
      stock: Math.floor(Math.random() * 200) + 1,
      unit: ["sqm", "pcs", "sets", "meter"][i % 4],
    };
  });

  let currentPage = 1;
  let rowsPerPage = 5; // default

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
          <button class="action-menu-trigger" aria-label="Actions">
            <img src="/Assets/img_admin/dots.png" alt="Actions" />
          </button>
        </td>
      `;
      tableBody.appendChild(tr);
    });

    updateShowingInfo(start, end);
    renderPaginationControls(Math.ceil(products.length / rowsPerPage));
  }

  function updateShowingInfo(start, end) {
    const total = products.length;
    showingInfo.textContent = `Showing ${start + 1}-${Math.min(
      end,
      total
    )} of ${total} items`;
  }

  function renderPaginationControls(totalPages) {
    paginationControls.innerHTML = "";

    // Prev button
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

    // Active page number
    const pageBtn = document.createElement("button");
    pageBtn.textContent = currentPage;
    pageBtn.classList.add("active");
    paginationControls.appendChild(pageBtn);

    // Next button
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

  // Handle rows per page change
  rowsPerPageSelect.addEventListener("change", (e) => {
    rowsPerPage = parseInt(e.target.value, 10);
    currentPage = 1; // reset to first page
    renderTable();
  });

  // Initial render
  renderTable();
});
