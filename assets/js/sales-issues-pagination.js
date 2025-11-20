document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector("table tbody");
    const showingInfo = document.querySelector(".pagination > span");
    const paginationControls = document.querySelector(".pagination-controls");
    const popupOverlay = document.getElementById("popupOverlay");
    const closePopupTicketBtn = document.getElementById("closePopupTicket");
    
    // Get the popup action buttons
    const resolveBtn = document.querySelector(".submit-btn.resolved-btn");
    const cancelActionBtn = document.querySelector(".popup-actions .cancel-btn"); // Changed variable name to avoid conflict

    // --- Data Definition ---
    const categories = [
        "General Inquiry",
        "Installation Problems",
        "Product Defect/Damage",
        "Delivery Issues",
        "Measurement/Design Problems",
        "Billing/Payment Questions"
    ];

    const priorities = ["Low", "Medium", "High"];

    const domains = ["gmail.com", "yahoo.com", "outlook.com", "mail.com"];
    
    // Arrays for unique names and descriptions
    const firstNames = ["Juan", "Maria", "Jose", "Ana", "Luis"];
    const lastNames = ["Dela Cruz", "Santos", "Ramos", "Garcia", "Reyes"];
    const descriptions = [
        "Product arrived with a crack on the top left corner.",
        "Need help setting up the installation appointment. The schedule link is broken.",
        "Could you clarify the final dimensions of the order [ID]?",
        "I was incorrectly billed for a service I did not receive. Please review invoice.",
        "I need a quote for 10 tempered glass panels, 12mm thick, size 24x36."
    ];


    // Dummy ticket data (255 items)
    const tickets = Array.from({ length: 255 }, (_, index) => {
        const ticketId = `#TC-${String(index + 1).padStart(2, '0')}`;
        const category = categories[Math.floor(Math.random() * categories.length)];
        const priority = priorities[Math.floor(Math.random() * priorities.length)];
        const email = `user${Math.floor(Math.random() * 1000)}@${domains[Math.floor(Math.random() * domains.length)]}`;
        
        // --- UNIQUE DUMMY DATA FOR POPUP ---
        const orderIDNum = 1001 + index;
        const name = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
        const phone = `09${Math.floor(100000000 + Math.random() * 900000000)}`;
        const orderId = `#G${String(orderIDNum).padStart(4, '0')}`;
        const descriptionTemplate = descriptions[Math.floor(Math.random() * descriptions.length)];
        const description = descriptionTemplate.replace('[ID]', orderId); 
        
        const contactDetails = {
            name,
            phone,
            orderId,
            description,
            // A unique field to identify the currently open ticket in the popup
            ticketId
        };

        return {
            ticketId,
            category,
            priority,
            email,
            ...contactDetails
        };
    });

    let currentPage = 1;
    const rowsPerPage = 10;
    let currentViewingTicket = null; // Store the data of the ticket currently shown in the popup

    // --- Popup Action Handlers ---

    function closeViewPopup() {
        popupOverlay.style.display = "none";
        currentViewingTicket = null; // Clear the current ticket data
    }
    
    function handleResolvedClick() {
        if (currentViewingTicket) {
            console.log(`Ticket Resolved: ${currentViewingTicket.ticketId}`);
            alert(`Ticket ${currentViewingTicket.ticketId} marked as Resolved! (Check console for log)`);
            // In a real app, you would send an AJAX request here to update the status.
            closeViewPopup();
            renderTable(); // Re-render table to reflect status change if needed (not implemented here)
        }
    }

    function handleCancelClick() {
        console.log(`Action Cancelled for Ticket: ${currentViewingTicket ? currentViewingTicket.ticketId : 'N/A'}`);
        closeViewPopup();
    }

    // Attach handlers to the buttons
    closePopupTicketBtn.addEventListener('click', closeViewPopup);
    if (resolveBtn) {
        resolveBtn.addEventListener('click', handleResolvedClick);
    }
    if (cancelActionBtn) {
        cancelActionBtn.addEventListener('click', handleCancelClick);
    }

// --- Search Functionality ---
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");

function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    if (query) {
        // Filter tickets by category or email
        const filteredTickets = tickets.filter(ticket =>
            ticket.category.toLowerCase().includes(query) ||
            ticket.email.toLowerCase().includes(query)
        );
        // Temporarily replace tickets with filtered results for rendering
        const originalTickets = [...tickets]; // Copy original
        tickets.length = 0; // Clear array
        tickets.push(...filteredTickets); // Add filtered
        currentPage = 1; // Reset to page 1
        renderTable();
        // Restore original after rendering
        tickets.length = 0;
        tickets.push(...originalTickets);
    } else {
        // If no query, show all
        currentPage = 1; // Reset to page 1
        renderTable();
    }
}

searchButton.addEventListener("click", performSearch);

// Listen for Enter key in search input
searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        performSearch();
    }
});

// Listen for input changes to auto-restore when cleared
searchInput.addEventListener("input", () => {
    if (searchInput.value.trim() === "") {
        performSearch(); // Show all when input is cleared
    }
});

    // --- Popup Functions ---

    window.openViewPopup = function(btn) {
        const row = btn.closest("tr");
        
        // Find the index of the ticket based on the row in the table
        const rowIndexInPage = Array.from(tableBody.children).indexOf(row);
        const ticketIndex = (currentPage - 1) * rowsPerPage + rowIndexInPage;
        const ticket = tickets[ticketIndex];

        if (!ticket) return;

        // Store the current ticket object globally
        currentViewingTicket = ticket; 

        // --- Populate Popup Details ---

        // 1. Customer Contact Info
        document.querySelector("#popupOverlay .contact-name").textContent = ticket.name;
        document.querySelector("#popupOverlay .contact-email").textContent = ticket.email;
        document.querySelector("#popupOverlay .contact-phone").textContent = ticket.phone;
        document.querySelector("#popupOverlay .contact-order-id").textContent = ticket.orderId;

        // 2. Issue Category
        document.querySelector("#popupOverlay .category-input").value = ticket.category;

        // 3. Priority Tag (Dynamic styling)
        const priorityTag = document.querySelector("#popupOverlay .priority-tag");
        const priorityDot = document.querySelector("#popupOverlay .priority-dot");
        
        // Clear previous class and content
        priorityTag.className = 'priority-tag'; 
        priorityTag.textContent = ''; 
        
        // Re-add the dot and append text
        priorityTag.appendChild(priorityDot); 
        priorityTag.append(ticket.priority);

        // Add the appropriate color class
        const priorityClass = ticket.priority.toLowerCase(); 
        priorityTag.classList.add(priorityClass);


        // 4. Description
        document.querySelector("#popupOverlay .description-textarea").value = ticket.description;
        
        popupOverlay.style.display = "flex";
    };

    // --- Table Rendering and Pagination ---

    function renderTable() {
        tableBody.innerHTML = "";

        const start = (currentPage - 1) * rowsPerPage;
        const end = Math.min(start + rowsPerPage, tickets.length);
        const paginatedTickets = tickets.slice(start, end);

        paginatedTickets.forEach((ticket) => {
            const priorityClass = ticket.priority.toLowerCase();

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><input type="checkbox" class="row-checkbox"></td>
                <td>${ticket.ticketId}</td>
                <td>${ticket.category}</td>
                
                <td>
                    <span class="priority-tag-table ${priorityClass}">
                        <span class="priority-dot-table"></span> 
                        ${ticket.priority}
                    </span>
                </td>
                
                <td>${ticket.email}</td>
                <td>
                    <button class="kebab-btn" onclick="openViewPopup(this)"><i class="fas fa-ellipsis-v"></i></button>
                </td>
            `;
            tableBody.appendChild(tr);
        });

        updateShowingInfo(start, end);
        renderPaginationControls();
    }

    function updateShowingInfo(start, end) {
        const totalTickets = tickets.length;
        if (totalTickets === 0) {
            showingInfo.textContent = `Showing 0-0 of 0 items`;
        } else {
            showingInfo.textContent = `Showing ${start + 1}-${end} of ${totalTickets} items`;
        }
    }

    function renderPaginationControls() {
        paginationControls.innerHTML = "";
        const totalPages = Math.ceil(tickets.length / rowsPerPage);
        const maxVisible = 4;
        
        if (totalPages <= 1) return; // Hide controls if only one page

        const prevBtn = document.createElement("button");
        prevBtn.className = "page-btn prev";
        prevBtn.innerHTML = "&lt;";
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                renderTable();
            }
        });
        paginationControls.appendChild(prevBtn);

        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);
        if (endPage - startPage < maxVisible - 1) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = document.createElement("span");
            pageBtn.className = "page-number";
            pageBtn.textContent = i;
            if (i === currentPage) pageBtn.classList.add("active");
            pageBtn.addEventListener("click", () => {
                currentPage = i;
                renderTable();
            });
            paginationControls.appendChild(pageBtn);
        }

        const nextBtn = document.createElement("button");
        nextBtn.className = "page-btn next";
        nextBtn.innerHTML = "&gt;";
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener("click", () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderTable();
            }
        });
        paginationControls.appendChild(nextBtn);
    }



    
    // Initial render
    renderTable();
});