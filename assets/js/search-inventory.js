// Inventory Search Functionality
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".search-input");
    const searchButton = document.querySelector(".search-button");
    const paginationInfo = document.querySelector(".pagination span");

    let showingRecentOnly = false;
    const recentItems = ['HD-007']; // IDs considered recent

    function filterRows() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;

        // Always query the current rows (since table is dynamic)
        const rows = document.querySelectorAll(".table-container table tbody tr");

        rows.forEach(row => {
            const itemId = row.cells[1].textContent.trim();
            const name = row.cells[2].textContent.toLowerCase().replace(/\s+/g, ' ').trim();
            const category = row.cells[3].textContent.toLowerCase().trim();

            const matchesSearch = name.includes(searchTerm) || category.includes(searchTerm);
            const isRecent = recentItems.includes(itemId);
            const matchesFilter = !showingRecentOnly || isRecent;

            if (matchesSearch && matchesFilter) {
                row.style.display = "";
                visibleCount++;
            } else {
                row.style.display = "none";
            }
        });

        updatePaginationInfo(visibleCount);
    }

    function updatePaginationInfo(visibleCount) {
        if (showingRecentOnly) {
            paginationInfo.textContent = `Showing ${visibleCount} recent request${visibleCount !== 1 ? 's' : ''}`;
        } else {
            paginationInfo.textContent = `Showing ${visibleCount} item${visibleCount !== 1 ? 's' : ''}`;
        }
    }

    searchButton.addEventListener("click", (e) => {
        e.preventDefault();
        filterRows();
    });

    searchInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            filterRows();
        }
    });

    // Listen for input changes to auto-restore when cleared
    searchInput.addEventListener("input", () => {
        if (searchInput.value.trim() === "") {
            filterRows(); // Show all when input is cleared
        }
    });

    // Initialize with current row count
    filterRows();

    console.log("Inventory search initialized ✅");
});
