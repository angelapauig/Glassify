document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("downloadBtn").addEventListener("click", () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Load logo (adjust path if different)
        const logo = new Image();
        logo.src = "../assets/img/logo-with-bg.png";

        logo.onload = function () {
            // Add logo
         doc.addImage(logo, "PNG", 160, 10, 25.4, 25.4);


            // Company Info
            doc.setFontSize(12);
            doc.text("GlassWorth Builders", 14, 20);
            doc.setFontSize(10);
            doc.text("Blk 5 Lot 33 Saranay Road,", 14, 26);
            doc.text("Malapitan Avenue, Bagumbong North Caloocan City, Caloocan, Philippines", 14, 32);
            doc.text("glassworthbuilders@gmail.com", 14, 38);
            doc.text("0927 519 3800", 14, 44);

            // Invoice Title
            doc.setFontSize(16);
            doc.text("INVOICE", 170, 50, { align: "right" });

            // Invoice Info
            doc.setFontSize(10);
            doc.text("Invoice Date: 06/02/2025", 150, 60);
            doc.text("Invoice No: #INV202598120311", 150, 66);
            doc.text("Due Date: 07/02/2025", 150, 72);

            // Bill To
            doc.setFontSize(12);
            doc.text("BILL TO", 14, 60);
            doc.setFontSize(10);
            doc.text("Ezekiel P. Banugug", 14, 66);
            doc.text("199 Regalado Ave,", 14, 72);
            doc.text("Novaliches, Quezon City, Metro Manila, Philippines 1118", 14, 78);
            doc.text("(+63) 1234567890", 14, 84);

            // Ship To
            doc.setFontSize(12);
            doc.text("SHIP TO", 110, 60);
            doc.setFontSize(10);
            doc.text("Ezekiel P. Banugug", 110, 66);
            doc.text("199 Regalado Ave,", 110, 72);
            doc.text("Novaliches, Quezon City, Metro Manila, Philippines 1118", 110, 78);
            doc.text("(+63) 1234567890", 110, 84);

            // Table
            doc.autoTable({
                startY: 100,
                head: [["DESCRIPTION", "QTY", "UNIT PRICE", "TOTAL"]],
                body: [
                    ["798 Series Sliding Window", "3", "Php 3,000.00", "Php 9,000.00"],
                    ["Rounded Edge Frameless", "1", "Php 3,700.00", "Php 3,700.00"],
                    ["Aluminum Kitchen Cabinet", "1", "Php 2,500.00", "Php 2,500.00"],
                    ["4 Panel Sliding Door", "2", "Php 4,500.00", "Php 9,000.00"],
                    ["Frameless Rectangle Mirror", "1", "Php 1,500.00", "Php 1,500.00"],
                    ["Black Framed Round Mirror", "1", "Php 700.00", "Php 700.00"],
                ],
                styles: { halign: "center" },
                headStyles: { fillColor: [0, 0, 0] }
            });

            // Totals
            let finalY = doc.lastAutoTable.finalY + 10;
            doc.setFontSize(10);
            doc.text("SUBTOTAL: Php 32,700.00", 150, finalY);
            doc.text("SHIPPING FEE: Php 543.00", 150, finalY + 6);
            doc.text("HANDLING FEE: Php 100.00", 150, finalY + 12);

            doc.setFontSize(12);
            doc.text("Total Due Php 33,343.00", 150, finalY + 22);

            // Footer
            doc.setFontSize(10);
            doc.text("Thank you for your business!", 14, finalY + 40);

            // Save PDF
            doc.save("invoice.pdf");
        };
    });
});
