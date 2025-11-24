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

    // NEW: Add Item Popup and Button
    const addItemPopup = document.getElementById("addItemPopup"); 
    const addItemBtn = document.querySelector(".add-btn");

    const totalItemsElement = document.getElementById("totalItemsCount");
    const lowStockElement = document.getElementById("lowStockCount");

    // NEW FILTERING LOGIC: Identify both filter selects
    // Category Select is the first select element
    const categoryFilterSelect = document.querySelector(".filters select:first-of-type");
    // Status Select is the second select element
    const statusFilterSelect = document.querySelector(".filters select:nth-of-type(2)");
    
    // NEW FILTERING LOGIC: State to hold current filters
    let currentFilters = {
        category: 'all',
        status: '' // Use empty string for 'All' status
    };

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

    const LOW_STOCK_THRESHOLD = 30;

    // NEW FUNCTION: Calculate and update the stats cards
    function updateInventoryStats() {
        let totalItems = 0;
        let lowStockAlerts = 0;

        // Use the original products array for the total counts
        products.forEach(prod => {
            totalItems++; // Every product counts as one item

            // Check for low stock alerts (Stock > 0 AND Stock < 30)
            if (prod.stock > 0 && prod.stock < LOW_STOCK_THRESHOLD) {
                lowStockAlerts++;
            } 
            // We might also include Out-of-Stock (prod.stock === 0) in the alert count
            // depending on your definition of "Low Stocks Alerts". 
            // Based on typical inventory, "Low Stock" usually means it needs replenishment,
            // so we'll include Out-of-Stock (stock=0) for a comprehensive alert count.
            else if (prod.stock === 0) {
                lowStockAlerts++;
            }
        });

        // Update the DOM elements if they exist
        if (totalItemsElement) {
            totalItemsElement.textContent = totalItems;
        }
        if (lowStockElement) {
            lowStockElement.textContent = lowStockAlerts;
        }
    }
    
const categories = Object.keys(productCatalog);
  const products = Array.from({ length: 50 }, (_, i) => {
    const category = categories[i % categories.length];
    const names = productCatalog[category];
    const name = names[i % names.length];
    
    // NEW LOGIC START
    let status;
    // Stock is generated between 1 and 200 initially, 
    // but we can adjust to include 0 for Out-of-Stock testing.
    // Let's generate stock between 0 and 200.
    const stockValue = Math.floor(Math.random() * 201); // 0 to 200
    
    // Define thresholds:
    const LOW_STOCK_THRESHOLD = 30;

    if (stockValue === 0) {
        status = 'out-of-stock';
    } else if (stockValue < LOW_STOCK_THRESHOLD) {
        status = 'low-stock';
    } else {
        status = 'in-stock';
    }
    // NEW LOGIC END

    return {
      id: `PR-${String(i + 1).padStart(3, "0")}`,
      name,
      category,
      stock: stockValue, // Use the stockValue calculated above
      unit: ["sqm", "pcs", "sets", "meter"][i % 4],
      status: status // Added the determined status property
    };
  });
    
    // NEW FILTERING LOGIC: Variable to hold the array currently being displayed/paginated
    let filteredProducts = products; 

    // NEW FILTERING LOGIC: Unified function to filter data
    function applyFilters() {
        currentPage = 1; // Always reset page when filters change
        
        let tempProducts = products;

        // 1. Filter by Category
        if (currentFilters.category !== 'all') {
            tempProducts = tempProducts.filter(prod => {
                // Check if the product's full category name contains the filter value 
                // (e.g., 'Sliding Doors' contains 'door')
                return prod.category.toLowerCase().includes(currentFilters.category);
            });
        }
        
        // 2. Filter by Status
        if (currentFilters.status !== '') {
            tempProducts = tempProducts.filter(prod => prod.status === currentFilters.status);
        }
        
        filteredProducts = tempProducts;
        renderTable();
    }


    // --- Table Rendering ---
    function renderTable() {
        tableBody.innerHTML = "";

        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        // CHANGED: Use filteredProducts for slicing
        const paginatedItems = filteredProducts.slice(start, end);

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

        // CHANGED: Use filteredProducts.length for info and pagination
        updateShowingInfo(start, end);
        renderPaginationControls(Math.ceil(filteredProducts.length / rowsPerPage));
    }

    function updateShowingInfo(start, end) {
        // CHANGED: Use filteredProducts.length for total
        const total = filteredProducts.length; 
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

    // --- Event Listeners for Pagination and Filters ---
    
    rowsPerPageSelect.addEventListener("change", (e) => {
        rowsPerPage = parseInt(e.target.value, 10);
        currentPage = 1;
        renderTable();
    });
    
    // NEW FILTERING LOGIC: Category Filter Listener
    if (categoryFilterSelect) {
        categoryFilterSelect.addEventListener("change", (e) => {
            currentFilters.category = e.target.value.toLowerCase(); 
            applyFilters();
        });
    }

    // NEW FILTERING LOGIC: Status Filter Listener
    if (statusFilterSelect) {
        statusFilterSelect.addEventListener("change", (e) => {
            currentFilters.status = e.target.value; 
            applyFilters();
        });
    }

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
        const categorySelectEdit = editPopup.querySelector("select");
        categorySelectEdit.value = item.category;

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

    // Add New Item Button Listener
    addItemBtn.addEventListener("click", () => {
        openPopup(addItemPopup);
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

        const closeBtn = popup.querySelector(".close-btn");
        const cancelBtn = popup.querySelector(".cancel-btn");
        
        closeBtn.onclick = () => closePopup(popup);
        if (cancelBtn) {
            cancelBtn.onclick = () => closePopup(popup);
        }
    }

    function closePopup(popup) {
        popup.style.display = "none";
        popup.classList.add("hidden");
    }

    function hideMenu() {
        actionMenu.classList.add("hidden");
        actionMenu.style.display = "none";
    }

    // --- Init ---
    renderTable();
    updateInventoryStats();
});