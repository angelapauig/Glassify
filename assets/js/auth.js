document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get("mode");

  let pageToLoad = "";
  if (mode === "login") {
    pageToLoad = "login.html";
  } else if (mode === "register") {
    pageToLoad = "register.html";
  }

  if (pageToLoad) {
    fetch(`/Glassify/html/${pageToLoad}`)
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const section =
          doc.querySelector(".login-section") ||
          doc.querySelector(".register-section");

        if (section) {
          document.getElementById("auth-container").appendChild(section);

          // ✅ Attach login behavior
          const loginForm = document.getElementById("loginForm");
          if (loginForm) {
            loginForm.addEventListener("submit", function (e) {
              e.preventDefault();
              console.log("Login submitted ✅");

              // simulate success
              localStorage.setItem("isLoggedIn", "true");
              window.location.href = "/Glassify/html/home.html";
            });
          }

          // ✅ Attach register behavior
          const registerForm = document.getElementById("registerForm");
          if (registerForm) {
            registerForm.addEventListener("submit", function (e) {
              e.preventDefault();
              console.log("Register submitted ✅");

              // simulate account creation
              localStorage.setItem("isLoggedIn", "true");
              window.location.href = "/Glassify/html/home.html";
            });
          }
        }
      })
      .catch(err => console.error("Error loading auth page:", err));
  }
});
