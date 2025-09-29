  function openPopup() {
    document.getElementById("uploadPopup").style.display = "flex";
  }

  function closePopup() {
    document.getElementById("uploadPopup").style.display = "none";
  }

  // Show selected file name inside Uploaded Files placeholder
  document.getElementById("fileInput").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      document.getElementById("filePlaceholder").innerText = file.name + " (" + Math.round(file.size/1024) + " KB)";
    }
  });