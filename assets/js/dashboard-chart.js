  const ctx = document.getElementById('salesChart').getContext('2d');

  const salesChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Weekly Sales',
          data: [120000, 180000, 150000, 200000], // sample values
          borderColor: '#007bff',
          backgroundColor: 'rgba(0, 123, 255, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.3,
        },
        {
          label: 'Monthly Sales',
          data: [100000, 140000, 130000, 160000], // sample values
          borderColor: '#ff9500',
          backgroundColor: 'rgba(255, 149, 0, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.3,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false // hide default legend (you already have custom)
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return '' + value.toLocaleString();
            }
          }
        }
      }
    }
  });