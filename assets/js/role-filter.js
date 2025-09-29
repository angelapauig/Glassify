document.addEventListener("DOMContentLoaded", () => {
    const roleTabs = document.querySelectorAll(".filter-tabs .tab-button");
    const rows = document.querySelectorAll(".table-container table tbody tr");
    const searchInput = document.querySelector(".search-input");
    const searchButton = document.querySelector(".search-button");

    let currentFilter = "all"; // store the current tab filter

    function filterRows() {
        const searchTerm = searchInput.value.toLowerCase().trim();

        rows.forEach(row => {
            const name = row.cells[0].textContent.toLowerCase();
            const role = row.cells[1].textContent.trim();
            const email = row.cells[2].textContent.toLowerCase();

            const matchesTab = currentFilter === "all" || role === currentFilter;
            const matchesSearch = name.includes(searchTerm) || email.includes(searchTerm);

                row.style.visibility = (matchesTab && matchesSearch) ? "visible" : "collapse";
        });
    }

    // Tab click
    roleTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            // Remove active class from all
            roleTabs.forEach(btn => btn.classList.remove("active"));
            tab.classList.add("active");

            // Update current filter and reapply filtering
            currentFilter = tab.getAttribute("data-filter");
            filterRows();
        });
    });

    // Search button click
    searchButton.addEventListener("click", filterRows);

    // Search on Enter key
    searchInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter") filterRows();
    });
});
