// Top-Selling Products (Bar)
new Chart(document.getElementById("topProductsChart"), {
  type: "bar",
  data: {
    labels: ["Product A", "Product B", "Product C", "Product D", "Product E"],
    datasets: [{
      label: "Sales",
      data: [500, 400, 300, 250, 220],
      backgroundColor: "#2ecc71"
    }]
  },
  options: { responsive: true, plugins: { legend: { display: false } } }
});

// Sales by Category (Pie)
new Chart(document.getElementById("categoryChart"), {
  type: "pie",
  data: {
    labels: ["Glass", "Hardware", "Accessories", "Aluminum", "Others"],
    datasets: [{
      data: [40, 25, 15, 10, 10],
      backgroundColor: ["#3b82f6", "#10b981", "#06b6d4", "#f59e0b", "#ef4444"]
    }]
  },
  options: { responsive: true }
});

// Sales by Payment Method (Doughnut)
new Chart(document.getElementById("paymentChart"), {
  type: "doughnut",
  data: {
    labels: ["Credit Card", "Bank Transfer", "PayPal", "Cash"],
    datasets: [{
      data: [55, 25, 10, 10],
      backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#06b6d4"]
    }]
  },
  options: { responsive: true }
});

// Repeat vs New Customers (Pie)
new Chart(document.getElementById("customersChart"), {
  type: "pie",
  data: {
    labels: ["Repeat Customers", "New Customers"],
    datasets: [{
      data: [70, 30],
      backgroundColor: ["#10b981", "#3b82f6"]
    }]
  },
  options: { responsive: true }
});
