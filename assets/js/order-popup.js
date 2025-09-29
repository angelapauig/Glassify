    const popup = document.getElementById('orderPopup');
    const closeBtn = document.getElementById('closePopup');
    const reviewBtns = document.querySelectorAll('.btn-review');

    reviewBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        popup.style.display = 'flex';
      });
    });

    closeBtn.addEventListener('click', () => {
      popup.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.style.display = 'none';
      }
    });