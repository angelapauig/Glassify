 document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault(); // stop default form submit

    // TODO: replace with real validation
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email && password) {
      // ✅ simulate login success
      localStorage.setItem("isLoggedIn", "true");

      // ✅ redirect to logged-in Home
      window.location.href = "../html/home.html";
      console.log("Login form submitted ✅");

    } else {
      alert("Please enter email and password.");
    }
  });