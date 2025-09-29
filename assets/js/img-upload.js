const productImageInput = document.getElementById("productImageInput");
const previewImg = document.querySelector(".image-preview img");

productImageInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();

    reader.addEventListener("load", function () {
      previewImg.setAttribute("src", this.result);
    });

    reader.readAsDataURL(file);
  } else {
    // Reset back to placeholder if no file selected
    previewImg.setAttribute("src", "https://cdn-icons-png.flaticon.com/512/4211/4211763.png");
  }
});
