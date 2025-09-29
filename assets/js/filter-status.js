document.addEventListener("DOMContentLoaded", () => {
    const applyBtn = document.querySelector(".apply-btn");

    applyBtn.addEventListener("click", () => {
        const dateFilter = document.querySelector(".filter-date").value; // yyyy-mm-dd
        const statusFilter = document.querySelector(".filter-status").value;
        const searchFilter = document.querySelector(".filter-search").value.toLowerCase();

        const rows = document.querySelectorAll(".table-container tbody tr");

        rows.forEach(row => {
            const clientText = row.querySelector(".client-cell")?.textContent.trim().toLowerCase();
            const statusText = row.querySelector(".status-cell")?.textContent.trim();
            const dateText = row.querySelector(".date-cell")?.textContent.trim();

            let showRow = true;

            // ✅ Date filter (convert row date to yyyy-mm-dd for comparison)
            if (dateFilter) {
                const rowDatePart = dateText.split("–")[0].trim(); // e.g. "5/30/2025"
                const rowDate = new Date(rowDatePart);
                const filterDate = new Date(dateFilter);

                // Compare only the yyyy-mm-dd
                if (
                    rowDate.getFullYear() !== filterDate.getFullYear() ||
                    rowDate.getMonth() !== filterDate.getMonth() ||
                    rowDate.getDate() !== filterDate.getDate()
                ) {
                    showRow = false;
                }
            }

            // ✅ Status filter
            if (statusFilter !== "All Statuses" && !statusText.includes(statusFilter)) {
                showRow = false;
            }

            // ✅ Search filter (client name)
            if (searchFilter && !clientText.includes(searchFilter)) {
                showRow = false;
            }

            // Apply result
            row.style.display = showRow ? "" : "none";
        });
    });
});
