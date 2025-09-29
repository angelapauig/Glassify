// ----- DELETE POPUP -----
let rowToDelete = null;

function openDeletePopup(button) {
  // Save the row reference to delete later
  rowToDelete = button.closest("tr");
  document.getElementById("popup-delete").style.display = "flex";
}

function closeDeletePopup() {
  document.getElementById("popup-delete").style.display = "none";
  rowToDelete = null; // reset
}

document.addEventListener("DOMContentLoaded", () => {
  const confirmBtn = document.querySelector(".popup-delete-confirm");

  // Confirm delete action
  confirmBtn.addEventListener("click", () => {
    if (rowToDelete) {
      rowToDelete.remove(); // remove row from table
      rowToDelete = null;
    }
    closeDeletePopup();
  });

  // ----- SEARCH FUNCTIONALITY -----
  const searchInput = document.querySelector(".search-input");
  const searchButton = document.querySelector(".search-button");
  const tableRows = document.querySelectorAll("table tbody tr");

  function searchUsers() {
    const query = searchInput.value.toLowerCase();
    tableRows.forEach(row => {
      const cells = row.querySelectorAll("td");
      const match = Array.from(cells).some(td =>
        td.textContent.toLowerCase().includes(query)
      );
      row.style.display = match ? "" : "none";
    });
  }

  // Trigger search on button click
  searchButton.addEventListener("click", searchUsers);

  // Also search on "Enter" key inside input
  searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") searchUsers();
  });
});
