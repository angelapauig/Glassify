document.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll(".filters input[type='checkbox']");
  const activeFiltersContainer = document.querySelector(".active-filters");

  function updateActiveFilters() {
    activeFiltersContainer.innerHTML = "<h4>Active Filters:</h4>";

    let hasFilter = false;

    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        hasFilter = true;
        const tag = document.createElement("span");
        tag.className = "filter-tag";
        tag.textContent = checkbox.parentNode.textContent.trim();

        // Add remove functionality for each tag
        tag.addEventListener("click", () => {
          checkbox.checked = false;
          updateActiveFilters();
        });

        activeFiltersContainer.appendChild(tag);
      }
    });

    // Add "Clear All" if at least one filter is active
    if (hasFilter) {
      const clearAll = document.createElement("span");
      clearAll.className = "clear";
      clearAll.textContent = "Clear All";

      clearAll.addEventListener("click", () => {
        checkboxes.forEach(cb => (cb.checked = false));
        updateActiveFilters();
      });

      activeFiltersContainer.appendChild(clearAll);
    }
  }

  // Initial load
  updateActiveFilters();

  // Listen for changes
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", updateActiveFilters);
  });
});