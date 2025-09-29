let currentEditingRow = null;
let searchQuery = ""; // store the current search filter

// ----- EDIT USER POPUP -----
function openPopup(btn) {
  const popup = document.getElementById("popupOverlay");
  popup.style.display = "flex";

  currentEditingRow = btn.closest("tr");
  const cells = currentEditingRow.querySelectorAll("td");

  const fullName = cells[1].textContent.trim().split(" ");
  const email = cells[2].textContent.trim();

  const firstName = fullName[0] || "";
  const middleInitial = fullName.length === 3 ? fullName[1] : "";
  const surname = fullName.length >= 2 ? fullName[fullName.length - 1] : "";

  document.querySelector("#popupOverlay input[name='firstName']").value = firstName;
  document.querySelector("#popupOverlay input[name='middleInitial']").value = middleInitial;
  document.querySelector("#popupOverlay input[name='surname']").value = surname;
  document.querySelector("#popupOverlay input[name='email']").value = email;
  document.querySelector("#popupOverlay input[name='phone']").value =
    "+639" + Math.floor(100000000 + Math.random() * 900000000);
}

function closePopup() {
  document.getElementById("popupOverlay").style.display = "none";
  currentEditingRow = null;
}

// ----- MAIN TABLE LOGIC -----
document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("table tbody");
  const showingInfo = document.querySelector(".pagination span");
  const paginationControls = document.querySelector(".pagination-controls");

  // Sample users dataset (replace with your generator)
  const users = window.users || []; // assume your earlier script sets this
  let currentPage = 1;
  const rowsPerPage = 4;

  function getFilteredUsers() {
    if (!searchQuery) return users;
    return users.filter(user =>
      user.name.toLowerCase().includes(searchQuery) ||
      user.email.toLowerCase().includes(searchQuery)
    );
  }

  function renderTable() {
    tableBody.innerHTML = "";

    const filteredUsers = getFilteredUsers();
    const total = filteredUsers.length;
    const totalPages = Math.ceil(total / rowsPerPage);

    if (currentPage > totalPages) currentPage = totalPages || 1;

    const start = (currentPage - 1) * rowsPerPage;
    const end = Math.min(start + rowsPerPage, total);
    const paginatedUsers = filteredUsers.slice(start, end);

    paginatedUsers.forEach(user => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><input type="checkbox" class="row-checkbox"></td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.joined}</td>
        <td>${user.lastActive}</td>
        <td>
          <button class="edit-btn-main" onclick="openPopup(this)">
            <i class="fas fa-edit"></i> Edit
          </button>
          <button class="delete-btn-main" onclick="openDeletePopup(this)">
            <i class="fas fa-trash"></i> Delete
          </button>
        </td>
      `;
      tableBody.appendChild(tr);
    });

    showingInfo.textContent = `Showing ${start + 1}-${end} of ${total} items`;
    renderPaginationControls(totalPages);
  }

  function renderPaginationControls(totalPages) {
    paginationControls.innerHTML = "";

    const prevBtn = document.createElement("button");
    prevBtn.className = "page-btn prev";
    prevBtn.innerHTML = "&lt;";
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderTable();
      }
    });
    paginationControls.appendChild(prevBtn);

    const maxVisible = 4;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      const pageBtn = document.createElement("span");
      pageBtn.className = "page-number";
      pageBtn.textContent = i;
      if (i === currentPage) pageBtn.classList.add("active");
      pageBtn.addEventListener("click", () => {
        currentPage = i;
        renderTable();
      });
      paginationControls.appendChild(pageBtn);
    }

    const nextBtn = document.createElement("button");
    nextBtn.className = "page-btn next";
    nextBtn.innerHTML = "&gt;";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderTable();
      }
    });
    paginationControls.appendChild(nextBtn);
  }

  // ----- SEARCH FUNCTION -----
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      searchQuery = searchInput.value.toLowerCase();
      currentPage = 1; // reset to first page
      renderTable();
    });
  }

  renderTable();
});
