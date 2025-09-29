document.addEventListener("DOMContentLoaded", () => {
  // Add Appointment button
  const addAppointmentBtn = document.querySelector(".add-appointment-button");
  if (addAppointmentBtn) {
    addAppointmentBtn.addEventListener("click", () => {
      openPopup("addAppointmentPopupOverlay"); // ID of Add Appointment popup
    });
  }

  // Edit Progress button
  const editProgressBtns = document.querySelectorAll(".edit-progress-btn");
  editProgressBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      openPopup("editProgressPopupOverlay"); // ID of Edit Progress popup
    });
  });

  // Close buttons for all popups
  document.querySelectorAll(".close-btn, .cancel-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      // Get the closest overlay and hide it
      const overlay = btn.closest(".overlay");
      if (overlay) overlay.style.display = "none";
    });
  });
});

// Flexible functions
function openPopup(popupId) {
  const popup = document.getElementById(popupId);
  if (popup) popup.style.display = "flex";
}

function closePopup(popupId) {
  const popup = document.getElementById(popupId);
  if (popup) popup.style.display = "none";
}
