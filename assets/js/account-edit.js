document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("editPopup");
  const closeBtn = document.getElementById("closePopup");
  const cancelBtn = document.getElementById("cancelPopup");
  const popupLabel = document.getElementById("popupLabel");
  const popupTitle = document.getElementById("popupTitle");
  const popupInput = document.getElementById("popupInput");
  const editForm = document.getElementById("editForm");

  let activeInput = null; // store the input being edited

  // Attach click to all edit icons
// Attach click to all edit icons
document.querySelectorAll(".form-group .fa-pen").forEach(icon => {
  icon.addEventListener("click", () => {
    const input = icon.previousElementSibling; // the <input> before the icon
    const label = icon.closest(".form-group").querySelector("label").textContent;

    activeInput = input;

    popupLabel.textContent = label;
    popupTitle.textContent = `Edit ${label}`;
    popupInput.value = input.value;

    // 🔑 If the field is Password → use password type, else text
    if (label.toLowerCase().includes("password")) {
      popupInput.type = "password";
    } else {
      popupInput.type = "text";
    }

    popup.style.display = "flex";
  });
});


  // Close popup
  [closeBtn, cancelBtn].forEach(btn => {
    btn.addEventListener("click", () => {
      popup.style.display = "none";
    });
  });

  // Save changes
  editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (activeInput) {
      activeInput.value = popupInput.value;
    }
    popup.style.display = "none";
  });

  // Close if clicked outside
  window.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });
});
