document.addEventListener('DOMContentLoaded', function() {

function updateUnreadCount() {
            // Count all items marked as 'unread-item' anywhere in the notifications list
            const unreadItems = document.querySelectorAll('.notifications-list .unread-item');
            const count = unreadItems.length;

            // Update the text content of the counter span
            const unreadCountElement = document.getElementById('unread-count');
            
            if (unreadCountElement) {
                unreadCountElement.textContent = count;
            }
        }

        // Run the count update when the page loads
        updateUnreadCount();


        // =======================================================
        // 3. NOTIFICATION TAB SWITCHING LOGIC (All / Unread)
        // =======================================================
        const tabLinks = document.querySelectorAll('.tab-link');
        // Select all individual notification items
        const notificationItems = document.querySelectorAll('.notifications-list .notification-item');

        tabLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // 1. Manage Active Tab Class (for styling)
                tabLinks.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                // 2. Manage Content Visibility
                const filter = this.getAttribute('data-target'); // 'all' or 'unread'
                
                notificationItems.forEach(item => {
                    const isUnread = item.classList.contains('unread-item');
                    
                    if (filter === 'all') {
                        // Show all items
                        item.style.display = 'flex'; 
                    } else if (filter === 'unread') {
                        if (isUnread) {
                            // Show only unread items
                            item.style.display = 'flex';
                        } else {
                            // Hide read items
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    });