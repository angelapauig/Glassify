// ----- EDIT USER POPUP -----
function openPopup(btn) {
  const popup = document.getElementById("popupOverlay");
  popup.style.display = "flex";

  // Get row of clicked button
  const row = btn.closest("tr");
  const cells = row.querySelectorAll("td");

  // Extract data
  const fullName = cells[1].textContent.trim().split(" ");
  const email = cells[2].textContent.trim();

  // Map name parts (basic split: First, [Middle], Last)
  const firstName = fullName[0] || "";
  const middleInitial = fullName.length === 3 ? fullName[1] : "";
  const surname = fullName.length >= 2 ? fullName[fullName.length - 1] : "";

  // Fill popup inputs
  document.querySelector("#popupOverlay input:nth-of-type(1)").value = firstName;
  document.querySelector("#popupOverlay input:nth-of-type(2)").value = middleInitial;
  document.querySelector("#popupOverlay input:nth-of-type(3)").value = surname;
  document.querySelector("#popupOverlay input:nth-of-type(4)").value = email;
  document.querySelector("#popupOverlay input:nth-of-type(5)").value =
    "+639" + Math.floor(100000000 + Math.random() * 900000000); // fake phone
}

function closePopup() {
  document.getElementById("popupOverlay").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("table tbody");
  const showingInfo = document.querySelector(".pagination span");
  const paginationControls = document.querySelector(".pagination-controls");

  // Filipino names
  const firstNames = [
    "Juan", "Jose", "Maria", "Ana", "Mark", "John", "Michael", "Angel", "Grace",
    "Paul", "Pedro", "Catherine", "Joshua", "Jayson", "Renz", "Kristine", "Jessa",
    "Erika", "Allan", "Dennis", "Rowena", "Lea", "Carlo", "Bong", "Ramon"
  ];
  const lastNames = [
    "Santos", "Reyes", "Cruz", "Bautista", "Ocampo", "Garcia", "Flores", "Villanueva",
    "Torres", "Mendoza", "Aquino", "Ramos", "Fernandez", "Domingo", "Castro", "Rivera",
    "Del Rosario", "De Guzman", "Navarro", "Salazar", "Marquez", "Abad", "Vergara"
  ];
  const domains = ["gmail.com", "yahoo.com", "outlook.com", "mail.com"];

  function randomDate(startYear = 2020, endYear = 2025) {
    const year = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
    const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Generate users
  const users = Array.from({ length: 255 }, () => {
    const first = firstNames[Math.floor(Math.random() * firstNames.length)];
    const last = lastNames[Math.floor(Math.random() * lastNames.length)];
    const email = `${first.toLowerCase()}.${last.toLowerCase().replace(/\s+/g, "")}${Math.floor(
      Math.random() * 100
    )}@${domains[Math.floor(Math.random() * domains.length)]}`;
    return {
      name: `${first} ${last}`,
      email: email,
      joined: randomDate(),
      lastActive: `${Math.floor(Math.random() * 30) + 1} days ago`,
    };
  });

  let currentPage = 1;
  const rowsPerPage = 4;

  function renderTable() {
    tableBody.innerHTML = "";

    const start = (currentPage - 1) * rowsPerPage;
    const end = Math.min(start + rowsPerPage, users.length);
    const paginatedUsers = users.slice(start, end);

    paginatedUsers.forEach((user) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><input type="checkbox" class="row-checkbox"></td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.joined}</td>
        <td>${user.lastActive}</td>
        <td>
          <button class="edit-btn-main" onclick="openPopup(this)"><i class="fas fa-edit"></i> Edit</button>
          <button class="delete-btn-main" onclick="openDeletePopup(this)"><i class="fas fa-trash"></i> Delete</button>
        </td>
      `;
      tableBody.appendChild(tr);
    });

    updateShowingInfo(start, end);
    renderPaginationControls();
  }

  function updateShowingInfo(start, end) {
    showingInfo.textContent = `Showing ${start + 1}-${end} of ${users.length} items`;
  }

  function renderPaginationControls() {
    paginationControls.innerHTML = "";
    const totalPages = Math.ceil(users.length / rowsPerPage);
    const maxVisible = 4;

    // Prev button
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

    // Page numbers
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

    // Next button
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

  renderTable();
});
