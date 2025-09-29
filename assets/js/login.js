document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault(); // stop default form submit

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (email && password) {
    if (email === "admin@gmail.com" && password === "admin") {
      // ✅ Admin login
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "admin");
      window.location.href = "/Glassify/html_admin/admin_dashboard.html";
      console.log("Admin logged in ✅");
    } else {
      // ✅ Any other user login
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "user");
      window.location.href = "/Glassify/html/home.html";
      console.log("User logged in ✅");
    }

  } else {
    alert("Please enter email and password.");
  }
});
