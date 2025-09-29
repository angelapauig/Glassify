// /Assets/js/product-popup.js
document.addEventListener("DOMContentLoaded", () => {
  // ---------- Selectors & safety ----------
  const addPopup = document.getElementById("productPopup");
  const addBtn = document.querySelector(".add-product-btn");
  const addCloseBtn = document.getElementById("closePopup");
  const addCancelBtn = addPopup ? addPopup.querySelector(".cancel-btn") : null;
  const addSaveBtn = addPopup ? addPopup.querySelector(".save-btn") : null;
  const addImageInput = document.getElementById("productImageInput");
  const addImagePreview = addPopup ? addPopup.querySelector(".image-preview img") : null;
  const addNameInput = document.getElementById("productName");
  const addPriceInput = document.getElementById("productPrice");

  const editPopup = document.getElementById("editPopup");
  const editCloseBtn = document.getElementById("closeEditPopup");
  const editCancelBtn = document.getElementById("cancelEdit");
  const editSaveBtn = document.getElementById("editSaveBtn"); // Save button in edit popup
  const editImageInput = document.getElementById("editProductImageInput");
  const editImagePreview = editPopup ? editPopup.querySelector(".image-preview img") : null;
  const editNameInput = document.getElementById("editProductName");
  const editPriceInput = document.getElementById("editProductPrice");

  const productGrid = document.querySelector(".product-grid");
  if (!productGrid) return; // nothing else to do if grid missing

  let productBeingEdited = null; // reference to the .product-card being edited

  // ---------- Helpers ----------
  const formatPrice = (raw) => {
    const num = parseFloat(raw);
    if (Number.isNaN(num)) return "₱0.00";
    return `₱${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const normalizePriceInputValue = (priceText) => {
    // remove currency and commas and whitespace
    return priceText.replace(/[₱,\s]/g, "");
  };

  // ---------- ADD popup behavior ----------
  if (addBtn && addPopup) {
    addBtn.addEventListener("click", () => {
      addPopup.style.display = "flex";
    });
  }

  // close add popup (X & Cancel)
  [addCloseBtn, addCancelBtn].forEach(btn => {
    if (!btn) return;
    btn.addEventListener("click", () => {
      if (addPopup) addPopup.style.display = "none";
      // reset fields
      if (addNameInput) addNameInput.value = "";
      if (addPriceInput) addPriceInput.value = "";
      if (addImageInput) addImageInput.value = "";
      if (addImagePreview) addImagePreview.src = "https://cdn-icons-png.flaticon.com/512/4211/4211763.png";
    });
  });

  // add image preview (Add)
  if (addImageInput && addImagePreview) {
    addImageInput.addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (r) => {
        addImagePreview.src = r.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  // Add Save -> create DOM card
  if (addSaveBtn) {
    addSaveBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const name = addNameInput ? addNameInput.value.trim() : "";
      const priceRaw = addPriceInput ? addPriceInput.value : "";
      if (!name || !priceRaw) {
        alert("Please enter product name and price.");
        return;
      }
      const priceFormatted = formatPrice(priceRaw);
      const imgSrc = addImagePreview ? addImagePreview.src : "https://cdn-icons-png.flaticon.com/512/4211/4211763.png";

      // create product card
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <div class="product-image"><img src="${imgSrc}" alt="${name}"></div>
        <p class="product-name">${name}</p>
        <p class="product-price">${priceFormatted}</p>
        <div class="product-actions">
          <button class="edit-btn"><i class="fas fa-pen"></i> Edit</button>
          <button class="remove-btn"><i class="fas fa-trash"></i> Remove</button>
        </div>
      `;

      productGrid.appendChild(card);

      // reset and close
      if (addNameInput) addNameInput.value = "";
      if (addPriceInput) addPriceInput.value = "";
      if (addImageInput) addImageInput.value = "";
      if (addImagePreview) addImagePreview.src = "https://cdn-icons-png.flaticon.com/512/4211/4211763.png";
      if (addPopup) addPopup.style.display = "none";
    });
  }

  // ---------- Delegated handlers for Edit & Remove (works for existing + new cards) ----------
  productGrid.addEventListener("click", (e) => {
    const editBtn = e.target.closest(".edit-btn");
    if (editBtn) {
      const card = editBtn.closest(".product-card");
      if (!card || !editPopup) return;

      // populate edit popup with card values
      productBeingEdited = card;
      const nameNode = card.querySelector(".product-name");
      const priceNode = card.querySelector(".product-price");
      const imgNode = card.querySelector(".product-image img");

      const nameText = nameNode ? nameNode.textContent.trim() : "";
      const priceText = priceNode ? normalizePriceInputValue(priceNode.textContent) : "";
      const imgSrc = imgNode ? imgNode.src : "https://cdn-icons-png.flaticon.com/512/4211/4211763.png";

      if (editNameInput) editNameInput.value = nameText;
      if (editPriceInput) editPriceInput.value = priceText;
      if (editImagePreview) editImagePreview.src = imgSrc;
      if (editImageInput) editImageInput.value = ""; // clear file input

      editPopup.style.display = "flex";
      return; // stop here
    }

    const removeBtn = e.target.closest(".remove-btn");
    if (removeBtn) {
      const card = removeBtn.closest(".product-card");
      if (!card) return;
      // immediate remove (no DB). If you want a confirmation popup, we can add it.
      card.remove();
      return;
    }
  });

  // ---------- Edit popup close (X & Cancel) ----------
  [editCloseBtn, editCancelBtn].forEach(btn => {
    if (!btn) return;
    btn.addEventListener("click", () => {
      if (editPopup) editPopup.style.display = "none";
      productBeingEdited = null;
      if (editImageInput) editImageInput.value = "";
    });
  });

  // ---------- Edit image preview ----------
  if (editImageInput && editImagePreview) {
    editImageInput.addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (r) => {
        editImagePreview.src = r.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  // ---------- Save edits ----------
  if (editSaveBtn) {
    editSaveBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (!productBeingEdited) return;

      const newName = editNameInput ? editNameInput.value.trim() : "";
      const newPriceRaw = editPriceInput ? editPriceInput.value : "";
      if (!newName || !newPriceRaw) {
        alert("Please enter product name and price.");
        return;
      }
      const newPriceFormatted = formatPrice(newPriceRaw);

      const cardNameNode = productBeingEdited.querySelector(".product-name");
      const cardPriceNode = productBeingEdited.querySelector(".product-price");
      const cardImgNode = productBeingEdited.querySelector(".product-image img");

      // If a file was chosen, read and update image asynchronously, otherwise use preview src:
      if (editImageInput && editImageInput.files && editImageInput.files[0]) {
        const file = editImageInput.files[0];
        const reader = new FileReader();
        reader.onload = (r) => {
          if (cardImgNode) cardImgNode.src = r.target.result;
          if (cardNameNode && newName) cardNameNode.textContent = newName;
          if (cardPriceNode) cardPriceNode.textContent = newPriceFormatted;
          // close
          if (editPopup) editPopup.style.display = "none";
          productBeingEdited = null;
          if (editImageInput) editImageInput.value = "";
        };
        reader.readAsDataURL(file);
      } else {
        // no file chosen — use current preview
        if (cardImgNode && editImagePreview) cardImgNode.src = editImagePreview.src;
        if (cardNameNode && newName) cardNameNode.textContent = newName;
        if (cardPriceNode) cardPriceNode.textContent = newPriceFormatted;
        if (editPopup) editPopup.style.display = "none";
        productBeingEdited = null;
      }
    });
  }

  // ---------- Global close on outside click & Escape ----------
  window.addEventListener("click", (e) => {
    if (addPopup && e.target === addPopup) {
      addPopup.style.display = "none";
      if (addImageInput) addImageInput.value = "";
    }
    if (editPopup && e.target === editPopup) {
      editPopup.style.display = "none";
      productBeingEdited = null;
      if (editImageInput) editImageInput.value = "";
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (addPopup && addPopup.style.display === "flex") {
        addPopup.style.display = "none";
      }
      if (editPopup && editPopup.style.display === "flex") {
        editPopup.style.display = "none";
        productBeingEdited = null;
      }
    }
  });
});
