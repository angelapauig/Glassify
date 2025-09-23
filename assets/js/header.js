class MyHeader extends HTMLElement {
  connectedCallback() {
    fetch("/Glassify/components/header.html")
      .then(response => response.text())
      .then(data => {
        this.innerHTML = data;

        // highlight active link
        const currentPath = window.location.pathname.split("/").pop(); 
        const links = this.querySelectorAll(".menu a");

        links.forEach(link => {
          if (link.getAttribute("href").includes(currentPath)) {
            link.classList.add("active");
          }
        });
      })
      .catch(error => console.error("Error loading header:", error));
  }
}

customElements.define("my-header", MyHeader);
