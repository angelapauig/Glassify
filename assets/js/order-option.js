        document.addEventListener('DOMContentLoaded', () => {
            const customBtn = document.getElementById('custom-build-btn');
            const standardBtn = document.getElementById('standard-btn');
            const customContent = document.getElementById('custom-build-content');
            const standardContent = document.getElementById('standard-content');

            // Function to switch content
            function switchContent(showContent, hideContent, activeBtn, inactiveBtn) {
                hideContent.classList.remove('active');
                showContent.classList.add('active');
                inactiveBtn.classList.remove('active');
                activeBtn.classList.add('active');
            }

            // Event listener for Custom Build button
            customBtn.addEventListener('click', () => {
                switchContent(customContent, standardContent, customBtn, standardBtn);
            });

            // Event listener for Standard button
            standardBtn.addEventListener('click', () => {
                switchContent(standardContent, customContent, standardBtn, customBtn);
            });

            // Add event listeners for all option buttons
            const optionGroups = document.querySelectorAll('.shape-buttons, .size-buttons');

            optionGroups.forEach(group => {
                const optionButtons = group.querySelectorAll('.option-btn');
                optionButtons.forEach(btn => {
                    btn.addEventListener('click', () => {
                        // Remove 'active' class from all buttons in the same group
                        optionButtons.forEach(innerBtn => {
                            innerBtn.classList.remove('active');
                        });
                        // Add 'active' class to the clicked button
                        btn.classList.add('active');
                    });
                });
            });
        });