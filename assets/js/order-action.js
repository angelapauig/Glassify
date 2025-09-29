document.addEventListener('DOMContentLoaded', function () {
    const actionMenu = document.getElementById('actionMenu');
    const actionCells = document.querySelectorAll('.action-cell');

    actionCells.forEach(cell => {
        cell.addEventListener('click', function (e) {
            e.stopPropagation();
            const rect = cell.getBoundingClientRect();

            // 👉 Position at the bottom-left of the cell
            actionMenu.style.top  = `${window.scrollY + rect.bottom}px`;
            actionMenu.style.left = `${window.scrollX + rect.left}px`;

            actionMenu.style.display = 'block';
        });
    });

    // Hide when clicking outside
    document.addEventListener('click', function (e) {
        if (!actionMenu.contains(e.target)) {
            actionMenu.style.display = 'none';
        }
    });
});
