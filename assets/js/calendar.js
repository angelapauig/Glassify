const events = []; // The array to store all event objects
let currentDate = new Date(); // Stores the currently displayed month/year
let selectedDate = null; // Variable for future use, currently unused

const overlay = document.getElementById("popupOverlay"); // Reference to your pop-up overlay element

// --- Function to Handle Event Data Submission (Simulated Pop-up) ---
/**
 * Simulates receiving event data from a pop-up and updates the calendar.
 * @param {string} dateString - The date of the event (YYYY-MM-DD).
 * @param {string} eventLabel - The title/label of the event.
 * @param {string} eventColor - The color class for the event (e.g., 'blue', 'green').
 */
function addEventFromPopup(dateString, eventLabel, eventColor = 'blue') {
    if (eventLabel && dateString) {
        // 1. Add the new event to the global array
        events.push({
            date: dateString,
            label: eventLabel,
            color: eventColor
        });
        
        // 2. Re-render the calendar to display the new event
        renderCalendar(currentDate);
        console.log(`Event added for ${dateString}: ${eventLabel}`);
    } else {
        console.log("Error: Event label or date missing.");
    }
}
// -------------------------------------------------------------------


function renderCalendar(date) {
    const monthYear = document.getElementById("calendar-month-year");
    const calendarBody = document.getElementById("calendar-body");
    const year = date.getFullYear();
    const month = date.getMonth();

    // Month title
    const options = { year: "numeric", month: "long" };
    monthYear.textContent = date.toLocaleDateString("en-US", options);

    calendarBody.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    let dayCounter = 1;
    let nextMonthDay = 1;

    // Loop through a maximum of 6 rows (weeks)
    for (let i = 0; i < 6; i++) {
        const row = document.createElement("tr");

        // Loop through 7 days (columns)
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement("td");
            let cellDate;

            // --- Logic to determine which day to display ---
            if (i === 0 && j < firstDay) { // Previous month's days
                const prevDay = prevMonthDays - firstDay + j + 1;
                cell.textContent = prevDay;
                cell.classList.add("other-month");
                cellDate = new Date(year, month - 1, prevDay);
            } 
            else if (dayCounter <= daysInMonth) { // Current month's days
                cell.textContent = dayCounter;
                cellDate = new Date(year, month, dayCounter);

                const fullDate = `${year}-${String(month + 1).padStart(2,"0")}-${String(dayCounter).padStart(2,"0")}`;

                // Render events for this day (Read-Only)
                events.filter(ev => ev.date === fullDate).forEach(ev => {
                    const eventDiv = document.createElement("div");
                    eventDiv.className = `event ${ev.color}`;
                    eventDiv.textContent = ev.label;
                    cell.appendChild(eventDiv);
                });

                const today = new Date();
                if (
                    cellDate.getDate() === today.getDate() &&
                    cellDate.getMonth() === today.getMonth() &&
                    cellDate.getFullYear() === today.getFullYear()
                ) {
                    cell.classList.add("today");
                }
                dayCounter++;
            } 
            else { // Next month's days
                cell.textContent = nextMonthDay;
                cell.classList.add("other-month");
                cellDate = new Date(year, month + 1, nextMonthDay);
                nextMonthDay++;
            }
            // --- END Logic ---

            // NO CLICK LISTENERS ARE ATTACHED TO THE CELLS, ensuring they are not clickable.
            
            row.appendChild(cell);
        }

        // Only append the row if it contains current month days (prevents extra empty row at the end)
        if (dayCounter <= daysInMonth + 1 || i < 5) {
             calendarBody.appendChild(row);
        }
        
        // Stop the loop if the current month has ended and we are in a new row
        if (dayCounter > daysInMonth && i >= 5) break; 
    }
}


// Navigation functions (these are the only interactive parts of the calendar)
function prevMonth() { currentDate.setMonth(currentDate.getMonth() - 1); renderCalendar(currentDate); }
function nextMonth() { currentDate.setMonth(currentDate.getMonth() + 1); renderCalendar(currentDate); }
function goToToday() { 
    currentDate = new Date(); 
    currentDate.setDate(1); // Set to the 1st of the month for clean view
    renderCalendar(currentDate); 
}

// Initial render: start on the current month
goToToday();

// EXAMPLE USAGE (You would call this function from your actual pop-up's submit button)
// To test this functionality, open the browser console and paste this line:
// addEventFromPopup('2025-09-29', 'Team Meeting', 'orange');