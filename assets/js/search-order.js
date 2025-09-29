  document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-container input');
    const searchButton = document.querySelector('.search-button');
    const table = document.querySelector('.table-container table');
    const tbody = table ? table.tBodies[0] : null;
    const statusText = document.querySelector('.found-text');

    if (!searchInput || !searchButton || !tbody) {
      console.warn('Search elements or table body not found.');
      return;
    }

    function performSearch() {
      const query = searchInput.value.trim().toLowerCase();

      const rows = Array.from(tbody.rows);
      let matchCount = 0;

      rows.forEach(row => {
        const productNameCell = row.cells[2];  // adjust index if needed
        const cellText = productNameCell ? productNameCell.textContent.toLowerCase() : '';
        
        if (cellText.includes(query)) {
          row.style.display = '';
          matchCount++;
        } else {
          row.style.display = 'none';
        }
      });

      if (statusText) {
        statusText.textContent = `${matchCount} Orders found`;
      }
    }

    searchButton.addEventListener('click', (e) => {
      e.preventDefault();
      performSearch();
    });

    searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
  });