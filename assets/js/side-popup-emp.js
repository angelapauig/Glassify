document.addEventListener("DOMContentLoaded", () => {
  const addUserBtn = document.querySelector(".add-user-button");
  const addUserPopup = document.getElementById("addUserPopupOverlay");
  const editPopup = document.getElementById("editPopupOverlay");
  const closeBtns = document.querySelectorAll(".close-btn");
  const cancelBtns = document.querySelectorAll(".cancel-btn"); // select all cancel buttons

  // Open Add User popup
  addUserBtn.addEventListener("click", () => {
    addUserPopup.style.display = "flex";
  });

  // Open Edit popup for edit icons
  document.querySelectorAll(".fa-edit").forEach(icon => {
    icon.addEventListener("click", () => {
      editPopup.style.display = "flex";
    });
  });

  // Close any popup when clicking the X
  closeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      addUserPopup.style.display = "none";
      editPopup.style.display = "none";
    });
  });

  // Close the popup when clicking Cancel
  cancelBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      addUserPopup.style.display = "none";
      editPopup.style.display = "none";
    });
  });
});
