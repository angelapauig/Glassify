class MyFooter extends HTMLElement {
  connectedCallback() {
    fetch("/Glassify/components/footer.html") // adjust path as needed
      .then(response => response.text())
      .then(data => {
        this.innerHTML = data; // insert footer.html content
      })
      .catch(error => console.error("Error loading footer:", error));
  }
}

customElements.define("my-footer", MyFooter);