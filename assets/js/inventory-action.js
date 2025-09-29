document.addEventListener('DOMContentLoaded', () => {
  const menu = document.getElementById('globalActionMenu');
  let activeTrigger = null;

    function positionMenu(trigger) {
    const rect = trigger.getBoundingClientRect();
    menu.style.top = `${rect.bottom + 4}px`;  // position relative to viewport
    menu.style.left = `${rect.right - menu.offsetWidth}px`;
    }


  document.querySelectorAll('.action-menu-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent bubbling
      e.preventDefault();

      if (menu.style.display === 'block' && activeTrigger === trigger) {
        menu.style.display = 'none';
        activeTrigger = null;
        return;
      }

      positionMenu(trigger);
      menu.style.display = 'block';
      activeTrigger = trigger;
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.action-menu')) {
      menu.style.display = 'none';
      activeTrigger = null;
    }
  });

  window.addEventListener('scroll', () => {
    if (activeTrigger) {
      positionMenu(activeTrigger);
    }
  });

  window.addEventListener('resize', () => {
    if (activeTrigger) {
      positionMenu(activeTrigger);
    }
  });
});