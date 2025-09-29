class MyHeader extends HTMLElement {
  connectedCallback() {
    fetch("/Glassify/components/header.html")
      .then(response => response.text())
      .then(data => {
        this.innerHTML = data;

        // --- Login state toggle ---
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

        const guestItems = this.querySelectorAll(".guest-only");
        const userItems = this.querySelectorAll(".user-only");
        const homeLink = this.querySelector("#home-link");

        if (isLoggedIn) {
          guestItems.forEach(el => el.classList.add("hidden"));
          userItems.forEach(el => el.classList.remove("hidden"));
          if (homeLink) homeLink.setAttribute("href", "/Glassify/html/home.html");
        } else {
          guestItems.forEach(el => el.classList.remove("hidden"));
          userItems.forEach(el => el.classList.add("hidden"));
          if (homeLink) homeLink.setAttribute("href", "/Glassify/index.html");
        }

        // --- Logout button ---
        const logoutBtn = this.querySelector("#logoutBtn");
        if (logoutBtn) {
          logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.setItem("isLoggedIn", "false");
            location.reload();
          });
        }

        // --- Active link highlighting ---
        const currentUrl = new URL(window.location.href);
        const currentPath = currentUrl.pathname;
        const currentMode = currentUrl.searchParams.get("mode");
        const links = this.querySelectorAll(".menu a, .icons a");

        links.forEach(link => {
          const linkUrl = new URL(link.href, window.location.origin);
          const linkPath = linkUrl.pathname;
          const linkMode = linkUrl.searchParams.get("mode");

          // Highlight menu items
          if (currentPath === linkPath && (!linkMode || currentMode === linkMode)) {
            link.classList.add("active");
          }

          // Auth special case
          if (
            link.id === "auth-link" &&
            (currentMode === "login" || currentMode === "register")
          ) {
            link.classList.add("active");
          }
        });
      })
      .catch(error => console.error("Error loading header:", error));
  }





}

customElements.define("my-header", MyHeader);

// Logout functionality
logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.setItem("isLoggedIn", "false");

  // re-render header without full reload
  const header = document.querySelector("my-header");
  if (header) header.connectedCallback();

  // also go back to guest home page
  history.pushState({}, "", "/Glassify/index.html");
  document.getElementById("content").innerHTML = "";
});

