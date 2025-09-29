document.addEventListener("DOMContentLoaded", () => {
    const searchBox = document.querySelector(".search-box");
    const searchBtn = document.querySelector(".search-btn");
    const categoryFilter = document.querySelector(".filter-category");
    const productCards = document.querySelectorAll(".product-card");

    function filterProducts() {
        const searchTerm = searchBox.value.toLowerCase();
        const selectedCategory = categoryFilter.value.toLowerCase();

        productCards.forEach(card => {
            const productName = card.querySelector(".product-name").textContent.toLowerCase();
            const productCategory = card.dataset.category.toLowerCase();

            // Check if the search term matches the product name
            const matchesSearch = productName.includes(searchTerm);

            // Check if the card matches the selected category exactly or if "All Category" is selected
            const matchesCategory = selectedCategory === "" || productCategory === selectedCategory;

            if (matchesSearch && matchesCategory) {
                card.style.display = ""; // restore original CSS
            } else {
                card.style.display = "none"; // hide unmatched
            }
        });
    }

    // Filter when clicking the search button
    searchBtn.addEventListener("click", filterProducts);

    // Filter when pressing Enter in the search box
    searchBox.addEventListener("keyup", (e) => {
        if (e.key === "Enter") filterProducts();
    });

    // Filter when changing category
    categoryFilter.addEventListener("change", filterProducts);
});