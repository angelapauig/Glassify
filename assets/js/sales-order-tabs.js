document.addEventListener('DOMContentLoaded', function() {
            // Select all tab links using the common class
            const tabLinks = document.querySelectorAll('.tab-link');
            // Select all content sections using the common class
            const sections = document.querySelectorAll('.order-section');

            tabLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault(); 

                    // 1. Deactivate all links
                    tabLinks.forEach(l => l.classList.remove('active'));

                    // 2. Activate the clicked link
                    this.classList.add('active');

                    // 3. Determine the target section ID from the data-tab attribute
                    const targetTab = this.getAttribute('data-tab'); // e.g., 'awaiting'
                    const targetSectionId = 'tab-' + targetTab;      // e.g., 'tab-awaiting'

                    // 4. Hide all content sections
                    sections.forEach(section => section.classList.remove('active'));

                    // 5. Show the target content section
                    const targetSection = document.getElementById(targetSectionId);
                    if (targetSection) {
                        targetSection.classList.add('active');
                    }
                });
            });
        });