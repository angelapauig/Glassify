document.addEventListener("DOMContentLoaded", () => {
  const filterTabs = document.querySelectorAll(".filter-tab");
  const rows = document.querySelectorAll(".payment-table tbody tr");

  filterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      // 1️⃣ Update active tab style
      filterTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      // 2️⃣ Determine filter value
      const filter = tab.textContent.trim().toLowerCase(); // all, paid, pending, etc.

      // 3️⃣ Loop rows and toggle visibility
      rows.forEach(row => {
        const status = row
          .querySelector(".status-badge")
          .textContent.trim().toLowerCase();

        if (filter === "all" || status === filter) {
          row.style.display = "";   // show
        } else {
          row.style.display = "none"; // hide
        }
      });
    });
  });
});