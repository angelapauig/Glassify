class MyHeader extends HTMLElement {
  connectedCallback() {
    fetch("../components/header.html") // load the external file
      .then(response => response.text())
      .then(data => {
        this.innerHTML = data; // insert header.html content
      })
      .catch(error => console.error("Error loading header:", error));
  }
}

customElements.define("my-header", MyHeader);
