// Static cart data
let cart = [
  { id: 1, name: "798 Series Sliding Window", price: 3000, qty: 3 },
  { id: 2, name: "Rounded Edge Frameless", price: 3700, qty: 1 },
  { id: 3, name: "Aluminum Kitchen Cabinet", price: 2500, qty: 1 }
];

const cartBody = document.getElementById("cart-body");
const summaryItems = document.getElementById("summary-items");
const summarySubtotal = document.getElementById("summary-subtotal");
const summaryShipping = document.getElementById("summary-shipping");
const summaryHandling = document.getElementById("summary-handling");
const summaryTotal = document.getElementById("summary-total");

function renderCart() {
  cartBody.innerHTML = "";

  let subtotal = 0;
  let totalItems = 0;

  cart.forEach(item => {
    const row = document.createElement("tr");

    const subtotalItem = item.price * item.qty;
    subtotal += subtotalItem;
    totalItems += item.qty;

    row.innerHTML = `
      <td>
        <button class="remove-btn" onclick="deleteItem(${item.id})">X</button>
      </td>
      <td>${item.name}</td>
      <td>₱${item.price.toFixed(2)}</td>
      <td>
        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
        ${item.qty}
        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
      </td>
      <td>₱${subtotalItem.toFixed(2)}</td>
    `;
    cartBody.appendChild(row);
  });

  // Fees (example)
  const shipping = subtotal > 0 ? 543 : 0;
  const handling = subtotal > 0 ? 100 : 0;
  const total = subtotal + shipping + handling;

  // Update summary
  summaryItems.textContent = totalItems;
  summarySubtotal.textContent = subtotal.toFixed(2);
  summaryShipping.textContent = shipping.toFixed(2);
  summaryHandling.textContent = handling.toFixed(2);
  summaryTotal.textContent = total.toFixed(2);
}

// UPDATE (quantity)
function updateQuantity(id, change) {
  cart = cart.map(item =>
    item.id === id ? { ...item, qty: Math.max(1, item.qty + change) } : item
  );
  renderCart();
}

// DELETE (one item)
function deleteItem(id) {
  cart = cart.filter(item => item.id !== id);
  renderCart();
}

// DELETE ALL
document.getElementById("clear-cart").addEventListener("click", () => {
  cart = [];
  renderCart();
});

// Initial render
renderCart();
